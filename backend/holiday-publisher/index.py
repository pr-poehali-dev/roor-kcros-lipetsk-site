"""Backend-функция для автоматической публикации праздников в новости"""
import json
import os
from datetime import datetime
import psycopg2
import uuid
from holidays import get_today_holiday


def handler(event: dict, context) -> dict:
    """Проверяет текущую дату и публикует праздник, если он есть в календаре"""
    
    method = event.get('httpMethod', 'GET')
    
    # CORS для всех запросов
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }
    
    try:
        # Получаем текущую дату или дату из параметров (для тестирования)
        query_params = event.get('queryStringParameters', {}) or {}
        test_date = query_params.get('date')  # формат: MM-DD
        
        if test_date:
            date_str = test_date
        else:
            now = datetime.now()
            date_str = now.strftime('%m-%d')
        
        # Проверяем, есть ли праздник на эту дату
        holiday = get_today_holiday(date_str)
        
        if not holiday:
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'message': 'Нет праздника на эту дату',
                    'date': date_str
                })
            }
        
        # Подключаемся к БД
        db_url = os.environ.get('DATABASE_URL')
        schema = os.environ.get('MAIN_DB_SCHEMA')
        
        conn = psycopg2.connect(db_url)
        cur = conn.cursor()
        
        # Проверяем, не опубликован ли уже этот праздник сегодня
        cur.execute(f"""
            SELECT id FROM {schema}.news 
            WHERE title = '{holiday['title']}' 
            AND DATE(published_at) = CURRENT_DATE
            LIMIT 1
        """)
        
        existing = cur.fetchone()
        
        if existing:
            cur.close()
            conn.close()
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'message': 'Праздник уже опубликован сегодня',
                    'holiday': holiday
                })
            }
        
        # Создаем новость о празднике
        news_id = str(uuid.uuid4())
        
        cur.execute(f"""
            INSERT INTO {schema}.news (id, title, content, category, is_holiday)
            VALUES ('{news_id}', '{holiday['title']}', '{holiday['content']}', '{holiday['category']}', true)
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
            'body': json.dumps({
                'message': 'Праздник успешно опубликован',
                'id': news_id,
                'holiday': holiday
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'error': str(e)
            })
        }
