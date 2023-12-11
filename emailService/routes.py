from datetime import datetime, timedelta
from apscheduler.schedulers.background import BackgroundScheduler
from flask import render_template
from enum import Enum
from .utilities.get_data import get_data
from .utilities.time_utilities import get_time_range_str
from .utilities.filterBody import filter_field
from flask import jsonify
from .db import db
from flask_migrate import Migrate
from flask import Flask
from .models.models import EmailsSent, EmailTemplates, User
from flask import Blueprint

# migrate = Migrate(app, db)

email_blueprint = Blueprint('emailService', __name__, url_prefix='/emailService', template_folder='templates',
                            static_folder='static')


class Order(Enum):
    ASC = "asc"
    DESC = "desc"


@email_blueprint.route("/")
def emails():
    emailTemplates = EmailTemplates.query.all()
    emailsSent = EmailsSent.query.all()
    return render_template("emails.html", emailTemplates=emailTemplates, emailsSent=emailsSent)


from .api.api import *
