from flask import Blueprint

email_blueprint = Blueprint('email', __name__)

# Import the routes after creating the Blueprint to avoid circular imports
from . import routes
