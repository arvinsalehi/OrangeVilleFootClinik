from datetime import datetime, timedelta

from apscheduler.schedulers.background import BackgroundScheduler
from flask import render_template
from . import email_blueprint
from enum import Enum
from .utilities.get_data import get_data
from .utilities.time_utilities import get_time_range_str
from .utilities.filterBody import filter_field
from flask import jsonify


class Order(Enum):
    ASC = "asc"
    DESC = "desc"


@email_blueprint.route("/")
def emails():
    return render_template("emails.html")


from .api.api import *
