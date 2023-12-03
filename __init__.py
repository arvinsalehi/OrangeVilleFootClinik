from flask import Flask
from .emailService import email_blueprint

def create_app():
    app = Flask(__name__)

    # Register Blueprints
    app.register_blueprint(email_blueprint)

    # Other configuration and initialization code...
    return app

if __name__ == "__main__":
    create_app().run(debug=True)