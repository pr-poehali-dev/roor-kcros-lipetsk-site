import json
import os
import base64
import uuid
from datetime import datetime
import boto3

def handler(event: dict, context) -> dict:
    '''API для управления документами организации - загрузка, получение списка, скачивание PDF файлов'''
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    s3 = boto3.client('s3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
    )
    
    if method == 'POST':
        try:
            body = json.loads(event.get('body', '{}'))
            title = body.get('title')
            category = body.get('category')
            file_data = body.get('file')
            
            if not all([title, category, file_data]):
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Missing required fields'}),
                    'isBase64Encoded': False
                }
            
            file_content = base64.b64decode(file_data)
            file_id = str(uuid.uuid4())
            file_key = f'documents/{file_id}.pdf'
            
            s3.put_object(
                Bucket='files',
                Key=file_key,
                Body=file_content,
                ContentType='application/pdf'
            )
            
            cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{file_key}"
            
            document = {
                'id': file_id,
                'title': title,
                'category': category,
                'size': f"{len(file_content) / 1024:.1f} КБ" if len(file_content) < 1024 * 1024 else f"{len(file_content) / (1024 * 1024):.1f} МБ",
                'date': datetime.now().strftime('%d.%m.%Y'),
                'url': cdn_url,
                'icon': get_icon_for_category(category)
            }
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(document),
                'isBase64Encoded': False
            }
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': str(e)}),
                'isBase64Encoded': False
            }
    
    if method == 'GET':
        try:
            response = s3.list_objects_v2(Bucket='files', Prefix='documents/')
            documents = []
            
            for obj in response.get('Contents', []):
                if obj['Key'].endswith('.pdf'):
                    file_id = obj['Key'].split('/')[-1].replace('.pdf', '')
                    cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{obj['Key']}"
                    
                    documents.append({
                        'id': file_id,
                        'url': cdn_url,
                        'size': f"{obj['Size'] / 1024:.1f} КБ" if obj['Size'] < 1024 * 1024 else f"{obj['Size'] / (1024 * 1024):.1f} МБ",
                        'date': obj['LastModified'].strftime('%d.%m.%Y')
                    })
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(documents),
                'isBase64Encoded': False
            }
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': str(e)}),
                'isBase64Encoded': False
            }
    
    if method == 'DELETE':
        try:
            query_params = event.get('queryStringParameters', {})
            file_id = query_params.get('id')
            
            if not file_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Missing document id'}),
                    'isBase64Encoded': False
                }
            
            s3.delete_object(Bucket='files', Key=f'documents/{file_id}.pdf')
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'success': True}),
                'isBase64Encoded': False
            }
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': str(e)}),
                'isBase64Encoded': False
            }
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }

def get_icon_for_category(category: str) -> str:
    if 'Учредительные' in category:
        return 'FileText'
    elif 'Договоры' in category:
        return 'FileCheck'
    elif 'Лицензионные' in category:
        return 'Shield'
    elif 'Регламенты' in category:
        return 'BookOpen'
    return 'FileText'
