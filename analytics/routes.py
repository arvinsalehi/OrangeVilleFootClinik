from datetime import datetime
from flask import render_template
from flask import Blueprint

analytics_blueprint = Blueprint('analytics', __name__, url_prefix='/analytics', template_folder='templates',
                                static_folder='static')


@analytics_blueprint.route("/")
def index():
    return render_template("analytics.html")
