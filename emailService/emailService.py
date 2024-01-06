# emailService.py

from flask import Flask, url_for
from .db.db import init_app
from .routes import email_blueprint
from flask_cors import CORS  # Import CORS
from flask_wtf.csrf import CSRFProtect
from .utilities.key_generator import generate_random_secret_key
import secrets
from flask_bootstrap import Bootstrap5
from werkzeug.utils import secure_filename
import jinja2

from flask_wtf.csrf import CSRFProtect


def create_app():
    app = Flask(__name__)
    CORS(app)  # Enable CORS for all routes
    app.secret_key = secrets.token_urlsafe(16)
    bootstrap = Bootstrap5(app)
    csrf = CSRFProtect(app)

    # Initialize and configure the database
    db = init_app(app)
    app.config['CKEDITOR_ENABLE_CSRF'] = True
    app.config['CKEDITOR_SERVE_LOCAL'] = True
    # upload_path = 'http://127.0.0.1:5001/emailService/upload'
    UPLOAD_FOLDER = './uploads'

    # Register the email blueprint
    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

    app.register_blueprint(email_blueprint)

    # Custom Jinja filter for word-based truncation
    @app.template_filter('word_truncate')
    def word_truncate(s, max_length, suffix='...'):
        words = s.split()
        truncated_words = words[:max_length]
        truncated_string = ' '.join(truncated_words)
        return f'{truncated_string} {suffix}' if len(words) > max_length else s

    return app


if __name__ == '__main__':
    # Run the application with debug mode
    create_app().run(port=5001, debug=True)
