"""Backend-функция для отправки сообщений с контактной формы"""
import json
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os


def handler(event: dict, context) -> dict:
    """Отправка сообщений с контактной формы на email"""
    
    method = event.get('httpMethod', 'POST')
    
    # CORS
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Только POST запросы'})
        }
    
    try:
        body = json.loads(event.get('body', '{}'))
        
        name = body.get('name', '').strip()
        email = body.get('email', '').strip()
        phone = body.get('phone', '').strip()
        message = body.get('message', '').strip()
        
        if not name or not email or not message:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Заполните все обязательные поля'})
            }
        
        # Формируем письмо
        recipient_email = 'roorktsros@yandex.ru'
        
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f'Сообщение с сайта от {name}'
        msg['From'] = os.environ.get('SMTP_FROM', 'noreply@roor-lipetsk.ru')
        msg['To'] = recipient_email
        
        # HTML версия письма
        html_content = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
                <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
                    Новое сообщение с сайта РООР КЦРОС
                </h2>
                
                <div style="background-color: white; padding: 20px; border-radius: 5px; margin-top: 20px;">
                    <p style="margin: 10px 0;">
                        <strong style="color: #2c3e50;">Имя:</strong> {name}
                    </p>
                    <p style="margin: 10px 0;">
                        <strong style="color: #2c3e50;">Email:</strong> 
                        <a href="mailto:{email}" style="color: #3498db;">{email}</a>
                    </p>
                    <p style="margin: 10px 0;">
                        <strong style="color: #2c3e50;">Телефон:</strong> {phone if phone else 'Не указан'}
                    </p>
                    
                    <div style="margin-top: 20px; padding: 15px; background-color: #f0f0f0; border-left: 4px solid #3498db; border-radius: 3px;">
                        <strong style="color: #2c3e50;">Сообщение:</strong>
                        <p style="margin: 10px 0; white-space: pre-wrap;">{message}</p>
                    </div>
                </div>
                
                <div style="margin-top: 20px; padding: 15px; background-color: #e8f4f8; border-radius: 5px;">
                    <p style="margin: 0; font-size: 12px; color: #7f8c8d;">
                        Это письмо отправлено автоматически с сайта РООР КЦРОС Липецкой области
                    </p>
                </div>
            </div>
        </body>
        </html>
        """
        
        # Текстовая версия письма (fallback)
        text_content = f"""
        Новое сообщение с сайта РООР КЦРОС
        
        Имя: {name}
        Email: {email}
        Телефон: {phone if phone else 'Не указан'}
        
        Сообщение:
        {message}
        
        ---
        Это письмо отправлено автоматически с сайта РООР КЦРОС Липецкой области
        """
        
        part1 = MIMEText(text_content, 'plain', 'utf-8')
        part2 = MIMEText(html_content, 'html', 'utf-8')
        
        msg.attach(part1)
        msg.attach(part2)
        
        # Отправка через SMTP
        smtp_host = os.environ.get('SMTP_HOST', 'smtp.yandex.ru')
        smtp_port = int(os.environ.get('SMTP_PORT', '465'))
        smtp_user = os.environ.get('SMTP_USER')
        smtp_password = os.environ.get('SMTP_PASSWORD')
        
        if not smtp_user or not smtp_password:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'SMTP не настроен. Обратитесь к администратору.'})
            }
        
        with smtplib.SMTP_SSL(smtp_host, smtp_port) as server:
            server.login(smtp_user, smtp_password)
            server.send_message(msg)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'message': 'Сообщение успешно отправлено'
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': f'Ошибка отправки: {str(e)}'})
        }
