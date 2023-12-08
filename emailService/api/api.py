from datetime import datetime, timedelta

from apscheduler.schedulers.background import BackgroundScheduler
from flask import render_template
from .. import email_blueprint
from enum import Enum
from ..utilities.get_data import get_data
from ..utilities.time_utilities import get_time_range_str
from ..utilities.filterBody import filter_field
from flask import jsonify

ACCEPTED_APPOINTMENT_TYPE = [
    "Advanced Foot care",
    "Emergency Appointment",
    "Home Visit",
    "Initial Appointment",
    "Initial Appointment",
    "Initial Appointment for Orthotics",
    "Needling",
    "Orthotics Adjustment",
    "Steroid Injection",
    "Surgery",
    "Surgery/Needling Follow up",
    "SWIFT",
    "Topical Wart Treatment",
    "Routine Footcare",
    "ToeFx Fungal Therapy"
]

ACCEPTED_APPOINTMENT_TYPE_ID = ["344266062230980820",
                                "430463859740903699",
                                "430464145767270676",
                                "436844012444322144",
                                "478790695339952137",
                                "484748320468633714",
                                "495006031982627073",
                                "502702747267631441",
                                "680518487298279432",
                                "799174092715461561",
                                "1161675927311091818",
                                "1161697725008316524",
                                "1161727627837311088",
                                "1161821441214122106"]


# Define a route that sends a request to an external API
@email_blueprint.route('/get_patients', methods=['GET'])
def get_patients():
    external_api_url = "https://api.ca1.cliniko.com/v1/patients"
    api_key = "MS0xMjc3NzQ5ODY0MzYwMzE1NDAyLVdiRVNvOVdBblZlcmtWZGk3T3IxdHJpY3FHUEVnRVdt"
    query = {
        "order": Order.ASC,
        "sort": "created_at:desc"
    }

    response = get_data(external_api=external_api_url, api_key=api_key, query=query)
    return response


@email_blueprint.route('/get-today-attendees-names', methods=['GET'])
def get_today_attendees_names():
    external_api_url = "https://api.ca1.cliniko.com/v1/bookings"
    api_key = "MS0xMjc3NzQ5ODY0MzYwMzE1NDAyLVdiRVNvOVdBblZlcmtWZGk3T3IxdHJpY3FHUEVnRVdt"

    # Convert datetime objects to string format expected by Cliniko API
    # Calculate the time range for the last 10 hours
    start_time_str, end_time_str = get_time_range_str(time_range=12)
    # Construct the query parameters
    appointment_query_str = "appointment_type_id:=" + ",".join([item for item in ACCEPTED_APPOINTMENT_TYPE_ID])
    query = {
        "q[]": [f"ends_at:<{end_time_str}", f"starts_at:>{start_time_str}", "did_not_arrive:=false",
                appointment_query_str],
        "page": 1,
        "sort": "starts_at:desc",
    }

    response = get_data(external_api=external_api_url, api_key=api_key, query=query)
    if response.status_code == 200:
        data = response.json()

        filtered_data = filter_field(data['bookings'], 'patient_name', ret_json=True)

        if filtered_data.status_code == 200:
            return filtered_data

        return filtered_data

    else:
        return response.json()


@email_blueprint.route('/get-today-attendees', methods=['GET'])
def get_today_attendees():
    external_api_url = "https://api.ca1.cliniko.com/v1/bookings"
    api_key = "MS0xMjc3NzQ5ODY0MzYwMzE1NDAyLVdiRVNvOVdBblZlcmtWZGk3T3IxdHJpY3FHUEVnRVdt"

    # Convert datetime objects to string format expected by Cliniko API
    # Calculate the time range for the last 10 hours
    start_time_str, end_time_str = get_time_range_str(time_range=12)
    # Construct the query parameters
    appointment_query_str = "appointment_type_id:=" + ",".join([item for item in ACCEPTED_APPOINTMENT_TYPE_ID])
    query = {
        "q[]": [f"ends_at:<{end_time_str}", f"starts_at:>{start_time_str}", "did_not_arrive:=false",
                appointment_query_str],
        "page": 1,
        "sort": "starts_at:desc",
    }

    response = get_data(external_api=external_api_url, api_key=api_key, query=query)
    return response.json()


@email_blueprint.route('/get-bookings', methods=['GET'])
def get_bookings():
    external_api_url = "https://api.ca1.cliniko.com/v1/bookings"
    api_key = "MS0xMjc3NzQ5ODY0MzYwMzE1NDAyLVdiRVNvOVdBblZlcmtWZGk3T3IxdHJpY3FHUEVnRVdt"

    # Convert datetime objects to string format expected by Cliniko API
    # Calculate the time range for the last 10 hours
    start_time_str, end_time_str = get_time_range_str(time_range=15)
    # Construct the query parameters
    appointment_query_str = "appointment_type_id:=" + ",".join([item for item in ACCEPTED_APPOINTMENT_TYPE_ID])
    query = {
        "q[]": [f"ends_at:<{end_time_str}", f"starts_at:>{start_time_str}", "did_not_arrive:=false",
                appointment_query_str],
        "page": 1,
        "sort": "starts_at:desc",
    }

    response = get_data(external_api=external_api_url, api_key=api_key, query=query)
    return response.json()


@email_blueprint.route('/get-appointment_types', methods=['GET'])
def get_appointment_types():
    external_api_url = "https://api.ca1.cliniko.com/v1/appointment_types"
    api_key = "MS0xMjc3NzQ5ODY0MzYwMzE1NDAyLVdiRVNvOVdBblZlcmtWZGk3T3IxdHJpY3FHUEVnRVdt"

    response = get_data(external_api=external_api_url, api_key=api_key)

    return response.json()


@email_blueprint.route('/get-appointment-name', methods=['GET'])
def get_appointment_type_name():
    external_api_url = "https://api.ca1.cliniko.com/v1/appointment_types/436844012444322144"
    api_key = "MS0xMjc3NzQ5ODY0MzYwMzE1NDAyLVdiRVNvOVdBblZlcmtWZGk3T3IxdHJpY3FHUEVnRVdt"

    response = get_data(external_api=external_api_url, api_key=api_key)
    try:
        if response.status_code == 200:
            # Parse the JSON response and return it
            return response.json()['name']
        else:
            # If the request was not successful, return an error message
            return jsonify({'error': f'Request failed with status code {response.status_code}'}), response.status_code
    except Exception as e:
        # Handle any exceptions that might occur during the request
        error_message = {'error': f'An error occurred: {str(e)}'}
        return jsonify(error_message), 500


scheduler = BackgroundScheduler()
# Schedule the job to run every 20 minutes
scheduler.add_job(get_patients, 'interval', minutes=20)
