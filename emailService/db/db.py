# db.py

from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

# Create a SQLAlchemy instance without binding to an app
db = SQLAlchemy()


# Define a function to initialize the app and configure the database
def init_app(app):
    # Configure the database URI and other settings
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://admin:123@localhost/emailService'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Bind the database to the app
    db.init_app(app)

    # Use the app context to create the necessary tables
    with app.app_context():
        db.create_all()

    # Initialize the Flask-Migrate extension
    migrate = Migrate(app, db)

    return db
