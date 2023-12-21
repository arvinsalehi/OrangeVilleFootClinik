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
from .models.models import Emails, EmailTemplates, User, Bookings
from flask import Blueprint
from .forms.forms import NewTemplate

# migrate = Migrate(app, db)

email_blueprint = Blueprint('emailService', __name__, url_prefix='/emailService', template_folder='templates',
                            static_folder='static')


@email_blueprint.route("/")
def index():
    today_date = datetime.now().strftime('%Y-%m-%d')
    bookings = Bookings.query.filter(
        func.DATE(func.STR_TO_DATE(Bookings.ends_at, '%Y-%m-%dT%H:%i:%SZ')) == today_date
    ).all()
    patient_list = []
    for booking in bookings:
        user = User.query.filter_by(ciliniko_id=booking.user_id)
        patient_list.append(user)

    emailTemplates = EmailTemplates.query.all()
    emailsSent = Emails.query.filter_by(isSent=True)
    scheduledEmails = Emails.query.filter_by(isSent=False)

    # scheduled_emails = E
    newTemplateForm = NewTemplate()
    return render_template("emails.html", emailTemplates=emailTemplates, emailsSent=emailsSent, form=newTemplateForm,
                           scheduledEmails=scheduledEmails)


@email_blueprint.route("/Sent-Emails")
def sent_emails():
    page = request.args.get('page', 1, type=int)
    items_per_page = 9
    sentEmails = Emails.query.filter_by(isSent=True).paginate(page=page, per_page=items_per_page, error_out=False)
    return render_template('emailsSent.html', sentEmails=sentEmails)


@email_blueprint.route("/Scheduled-Emails")
def scheduled_emails():
    page = request.args.get('page', 1, type=int)
    items_per_page = 9
    sentEmails = Emails.query.filter_by(isSent=False).paginate(page=page, per_page=items_per_page, error_out=False)
    return render_template('emailsSent.html', sentEmails=sentEmails)


from .api.api import *
