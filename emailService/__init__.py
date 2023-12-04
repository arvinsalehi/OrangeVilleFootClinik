from flask import Blueprint

email_blueprint = Blueprint('emailService', __name__, url_prefix='/emailService', template_folder='templates', static_folder='static')

# Import the routes after creating the Blueprint to avoid circular imports
from . import routes
