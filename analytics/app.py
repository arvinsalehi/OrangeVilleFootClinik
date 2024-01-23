# emailService.py

from flask import Flask
from flask_cors import CORS  # Import CORS
from flask_wtf.csrf import CSRFProtect
import secrets
from routes import analytics_blueprint
from flask_bootstrap import Bootstrap5

import jinja2
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
app.secret_key = secrets.token_urlsafe(16)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Set to a reasonable size in bytes

csrf = CSRFProtect(app)
bootstrap = Bootstrap5(app)


# Register the email blueprint
app.register_blueprint(analytics_blueprint)
app.config['UPLOADED_IMAGES_DEST'] = 'emailService/static/uploads/img'  # Destination folder for uploaded images
# Create the destination folder if it doesn't exist

# images = UploadSet('images', IMAGES)
# configure_uploads(app, images)


# csrf.exempt(email_blueprint)

# Custom Jinja filter for word-based truncation
@app.template_filter('word_truncate')
def word_truncate(s, max_length, suffix='...'):
    words = s.split()
    truncated_words = words[:max_length]
    truncated_string = ' '.join(truncated_words)
    return f'{truncated_string} {suffix}' if len(words) > max_length else s
