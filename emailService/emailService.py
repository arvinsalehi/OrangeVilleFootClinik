# emailService.py

from flask import Flask
from .db.db import init_app
from .routes import email_blueprint
from flask_cors import CORS  # Import CORS
from flask_wtf.csrf import CSRFProtect
from .utilities.key_generator import generate_random_secret_key
import secrets
from flask_bootstrap import Bootstrap5


def create_app():
    app = Flask(__name__)
    CORS(app)  # Enable CORS for all routes
    app.secret_key = secrets.token_urlsafe(16)
    bootstrap = Bootstrap5(app)
    csrf = CSRFProtect(app)

    # Initialize and configure the database
    db = init_app(app)

    # Register the email blueprint
    app.register_blueprint(email_blueprint)

    return app


if __name__ == '__main__':
    # Run the application with debug mode
    create_app().run(port=5001, debug=True)
