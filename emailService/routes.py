from datetime import datetime, timedelta

from apscheduler.schedulers.background import BackgroundScheduler
from flask import render_template
from . import email_blueprint
from enum import Enum
from .utilities.get_data import get_data
from .utilities.time_utilities import get_time_range_str


class Order(Enum):
    ASC = "asc"
    DESC = "desc"


@email_blueprint.route("/")
def emails():
    return render_template("emails.html")


# Define a route that sends a request to an external API
@email_blueprint.route('/external-api', methods=['GET'])
def get_patients():
    external_api_url = "https://api.ca1.cliniko.com/v1/patients"
    api_key = "MS0xMjc3NzQ5ODY0MzYwMzE1NDAyLVdiRVNvOVdBblZlcmtWZGk3T3IxdHJpY3FHUEVnRVdt"
    query = {
        "order": Order.ASC,
        "sort": "created_at:desc"
    }

    response = get_data(external_api=external_api_url, api_key=api_key, query=query)
    return response


@email_blueprint.route('/get-attendees', methods=['GET'])
def get_bookings():
    external_api_url = "https://api.ca1.cliniko.com/v1/bookings"
    api_key = "MS0xMjc3NzQ5ODY0MzYwMzE1NDAyLVdiRVNvOVdBblZlcmtWZGk3T3IxdHJpY3FHUEVnRVdt"

    # Convert datetime objects to string format expected by Cliniko API
    # Calculate the time range for the last 10 hours
    start_time_str, end_time_str = get_time_range_str(time_range=12)
    # Construct the query parameters

    query = {
        "q[]": [f"ends_at:<{end_time_str}", f"starts_at:>{start_time_str}", "did_not_arrive:=false"],
        # "q[]": [f"did_not_arrive:=true"],
        "page": 1,
        "sort": "starts_at:desc",
    }

    response = get_data(external_api=external_api_url, api_key=api_key, query=query)
    # patient_res = get_data(external_api=response['attendees'][0]['patient']['links']['self'], api_key=api_key)

    return response


scheduler = BackgroundScheduler()
# Schedule the job to run every 20 minutes
scheduler.add_job(get_patients, 'interval', minutes=20)
