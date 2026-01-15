"""Backend-функция для управления организациями в реестре"""
import json
import os
from datetime import datetime
import psycopg2
import uuid


def handler(event: dict, context) -> dict:
    """API для работы с организациями: получение списка, добавление, редактирование, удаление"""
    
    method = event.get('httpMethod', 'GET')
    
    # CORS
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Key'
            },
            'body': ''
        }
    
    try:
        db_url = os.environ.get('DATABASE_URL')
        schema = os.environ.get('MAIN_DB_SCHEMA')
        
        conn = psycopg2.connect(db_url)
        cur = conn.cursor()
        
        # GET - получить список организаций
        if method == 'GET':
            cur.execute(f"""
                SELECT id, name, inn, status, category, registration_date, created_at, updated_at
                FROM {schema}.organizations
                ORDER BY created_at DESC
            """)
            
            rows = cur.fetchall()
            organizations = []
            
            for row in rows:
                organizations.append({
                    'id': row[0],
                    'name': row[1],
                    'inn': row[2],
                    'status': row[3],
                    'category': row[4],
                    'registration_date': row[5].isoformat() if row[5] else None,
                    'created_at': row[6].isoformat() if row[6] else None,
                    'updated_at': row[7].isoformat() if row[7] else None
                })
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'organizations': organizations})
            }
        
        # Проверка админ-ключа для изменяющих операций
        headers = event.get('headers', {}) or {}
        admin_key = headers.get('X-Admin-Key') or headers.get('x-admin-key')
        
        if not admin_key or admin_key != os.environ.get('ADMIN_KEY', 'admin123'):
            cur.close()
            conn.close()
            return {
                'statusCode': 403,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Доступ запрещён'})
            }
        
        # POST - создать новую организацию
        if method == 'POST':
            body = json.loads(event.get('body', '{}'))
            
            org_id = str(uuid.uuid4())
            name = body.get('name', '').replace("'", "''")
            inn = body.get('inn', '').replace("'", "''")
            status = body.get('status', 'Активно').replace("'", "''")
            category = body.get('category', '').replace("'", "''")
            registration_date = body.get('registration_date', datetime.now().strftime('%Y-%m-%d'))
            
            cur.execute(f"""
                INSERT INTO {schema}.organizations 
                (id, name, inn, status, category, registration_date)
                VALUES ('{org_id}', '{name}', '{inn}', '{status}', '{category}', '{registration_date}')
            """)
            
            conn.commit()
            cur.close()
            conn.close()
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'message': 'Организация создана',
                    'id': org_id
                })
            }
        
        # PUT - обновить организацию
        if method == 'PUT':
            body = json.loads(event.get('body', '{}'))
            org_id = body.get('id', '').replace("'", "''")
            
            if not org_id:
                cur.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'ID организации обязателен'})
                }
            
            name = body.get('name', '').replace("'", "''")
            inn = body.get('inn', '').replace("'", "''")
            status = body.get('status', '').replace("'", "''")
            category = body.get('category', '').replace("'", "''")
            registration_date = body.get('registration_date', '')
            
            cur.execute(f"""
                UPDATE {schema}.organizations
                SET name = '{name}',
                    inn = '{inn}',
                    status = '{status}',
                    category = '{category}',
                    registration_date = '{registration_date}',
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = '{org_id}'
            """)
            
            conn.commit()
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'message': 'Организация обновлена'})
            }
        
        # DELETE - удалить организацию
        if method == 'DELETE':
            query_params = event.get('queryStringParameters', {}) or {}
            org_id = query_params.get('id', '').replace("'", "''")
            
            if not org_id:
                cur.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'ID организации обязателен'})
                }
            
            cur.execute(f"""
                DELETE FROM {schema}.organizations
                WHERE id = '{org_id}'
            """)
            
            conn.commit()
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'message': 'Организация удалена'})
            }
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Метод не поддерживается'})
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)})
        }
