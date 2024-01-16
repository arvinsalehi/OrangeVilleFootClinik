# emailService.py

from flask import Flask
from .db.db import init_app
from .routes import email_blueprint
from flask_cors import CORS  # Import CORS
from flask_wtf.csrf import CSRFProtect
from .utilities.key_generator import generate_random_secret_key
import secrets
from flask_bootstrap import Bootstrap5
import jinja2
from flask_uploads import configure_uploads, IMAGES, UploadSet

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
app.secret_key = secrets.token_urlsafe(16)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Set to a reasonable size in bytes

bootstrap = Bootstrap5(app)
csrf = CSRFProtect(app)

# Initialize and configure the database
db = init_app(app)

# Register the email blueprint
app.register_blueprint(email_blueprint)
app.config['UPLOADED_IMAGES_DEST'] = './uploads/img'  # Destination folder for uploaded images
images = UploadSet('images', IMAGES)
configure_uploads(app, images)


# csrf.exempt(email_blueprint)

# Custom Jinja filter for word-based truncation
@app.template_filter('word_truncate')
def word_truncate(s, max_length, suffix='...'):
    words = s.split()
    truncated_words = words[:max_length]
    truncated_string = ' '.join(truncated_words)
    return f'{truncated_string} {suffix}' if len(words) > max_length else s
