from datetime import datetime, timedelta
from apscheduler.schedulers.background import BackgroundScheduler
from flask import render_template, jsonify
from ..routes import email_blueprint
from enum import Enum
from ..utilities.get_data import get_data
from ..utilities.time_utilities import get_time_range_str
from ..utilities.filterBody import filter_field
from flask import jsonify, request
from ..models.models import User, EmailTemplates, EmailsSent, Bookings, db
from sqlalchemy import func

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
    today_date = datetime.now().strftime('%Y-%m-%d')
    # bookings = Bookings.query.filter(
    #     func.DATE(func.STR_TO_DATE(Bookings.ends_at, '%Y-%m-%dT%H:%i:%SZ')) == today_date
    # ).all()
    bookings = Bookings.query.all()
    patient_list = []
    for booking in bookings:
        user = User.query.filter_by(cliniko_id=booking.user_id).first()
        # appointment_type = booking.
        if user:
            patient_list.append({'name': user.username, 'ends_at': booking.ends_at,
                                 'template': "Email Content", 'user_id': user.cliniko_id,
                                 "booking_id": booking.cliniko_id})

    # Return the patient_list in the JSON response
    return jsonify({"attendees": patient_list}), 200


@email_blueprint.route('/get-bookings', methods=['GET'])
def get_bookings():
    try:
        external_api_url_bookings = "https://api.ca1.cliniko.com/v1/bookings"
        external_api_url = "https://api.ca1.cliniko.com/v1/appointment_types"
        api_key = "MS0xMjc3NzQ5ODY0MzYwMzE1NDAyLVdiRVNvOVdBblZlcmtWZGk3T3IxdHJpY3FHUEVnRVdt"

        # Convert datetime objects to string format expected by Cliniko API
        # Calculate the time range for the last 10 hours
        start_time_str, end_time_str = get_time_range_str(time_range=100)

        # Construct the query parameters
        appointment_query_str = "appointment_type_id:=" + ",".join([item for item in ACCEPTED_APPOINTMENT_TYPE_ID])
        query = {
            "q[]": [f"ends_at:<{end_time_str}", f"starts_at:>{start_time_str}", "did_not_arrive:=false",
                    appointment_query_str],
            "page": 1,
            "sort": "starts_at:desc",
        }

        response = get_data(external_api=external_api_url_bookings, api_key=api_key, query=query).json()

        for booking in response['bookings']:
            patient_id = booking['patient']['links']['self'].split("/")[-1]

            response_appointment = get_data(external_api=external_api_url, api_key=api_key).json()
            # for appointment in response_appointment['appointment_types']:
            #     appointment_in_db = Bookings.query.filter_by(cliniko_id=booking['id']).first()
            #     if appointment_in_db is not None and appointment_in_db.appointment_type_ID == appointment['id']:
            #         appointment_in_db.appointment_type_str = appointment['name']
            #         appointment_in_db.appointment_type_ID = appointment['id']
            #
            #         db.session.commit()

            # Check if the user_id from the database is not equal to the patient_id
            user = User.query.filter_by(cliniko_id=patient_id).first()
            new_booking = Bookings(
                appointment_type_ID=booking['appointment_type']['links']['self'].split("/")[-1],
                starts_at=booking['starts_at'],
                ends_at=booking['ends_at'],
                updated_at=booking['updated_at'],
                cliniko_id=booking['id'],
                user_id=patient_id,
                appointment_type_str=next(
                    (appointment['name'] for appointment in response_appointment['appointment_types'] if
                     appointment['id'] ==
                     booking['appointment_type']['links']['self'].split("/")[-1]),
                    "Null"  # Default value if no matching appointment is found
                )
            )

            db.session.add(new_booking)
            db.session.commit()
            if user is None or user.id != patient_id:
                query = {
                    "q[]": "string"
                }
                user_info_response = get_data(f'https://api.ca1.cliniko.com/v1/patients/{patient_id}', api_key=api_key,
                                              query=query)
                user_info = user_info_response.json()

                # Handle null exceptions when constructing user fields
                username = f"{user_info.get('first_name', '')} {user_info.get('last_name', '')}"
                email = user_info.get('email')
                if email is None:
                    email = "None"
                # Create a new user and add it to the database
                new_user = User(
                    cliniko_id=patient_id,
                    username=username,
                    email=email,
                    bookings_id=booking['id'],
                    # Add other user info fields as needed
                )
                db.session.add(new_user)

                # Commit changes to the database
                db.session.commit()
        return jsonify("Data added with success"), 200
    except Exception as e:
        return jsonify(f"Error: {e}"), 500


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


@email_blueprint.route('/get_email_templates', methods=['GET'])
def get_email_templates():
    emailTemplates = EmailTemplates.query.all()
    emailTemplates = [{'name': template.name, 'content': template.content} for template in emailTemplates]

    return jsonify(emailTemplates), 200


@email_blueprint.route('/get_email_template_by_name/<name>', methods=['GET'])
def get_email_template_by_name(name):
    emailTemplate = EmailTemplates.query.filter_by(name=name).first()

    if emailTemplate is not None:
        template = [{'name': emailTemplate.name, 'content': emailTemplate.content, "colorCode": emailTemplate.color}]
        return jsonify(template), 200

    return jsonify("Error: template not found"), 404


@email_blueprint.route('/create_email_templates', methods=['POST'])
def create_email_templates():
    try:
        # Get data from the request
        title = request.form.get('title')
        email_template_lis = EmailTemplates.query.all()
        for email in email_template_lis:
            if email.name == title:
                return jsonify({'error': "Check for duplicate names"}), 400

        content = request.form.get('content')
        color = request.form.get('color', '#e28c0e')  # Default color if not provided

        # Create a new EmailTemplates object and add it to the database
        new_email_template = EmailTemplates(name=title, content=content, color=color)
        db.session.add(new_email_template)
        db.session.commit()

        return jsonify({'message': 'Data added successfully!'}), 200
    except Exception as e:
        print("Error:", str(e))
        return jsonify({'internalError': "Something wrong in our end"}), 500


@email_blueprint.route('/update_email_templates', methods=['POST'])
def update_email_templates():
    try:
        # Get data from the request
        name = request.form.get('name')
        new_name = request.form.get('new_name')
        content = request.form.get('content')
        new_content = request.form.get('new_content')
        color_input = request.form.get('color_value')
        # Create a new Person object and add it to the database
        template = EmailTemplates.query.filter_by(name=name).first()

        if name.replace(" ", "") == new_name.replace(" ", "") and template.content == content.replace(" ", "")\
                and template.color == color_input:
            return jsonify({'error': "No change was detected"}), 402

        emailsSent = EmailsSent.query.filter_by(template_color_code=template.color)
        if emailsSent is not None:
            for email in emailsSent:
                email.template_color_code = color_input

        template.name = new_name
        template.content = new_content
        template.color = color_input

        db.session.commit()

        return jsonify({'message': 'Data Updated successfully!'}), 200
    except Exception as e:
        print("Error:", str(e))  # Print the error message to the console
        return jsonify({'error': str(e)}), 500


@email_blueprint.route('/delete_email_templates', methods=['POST'])
def delete_email_templates():
    try:
        # Get data from the request
        name = request.form.get('name')

        # Create a new Person object and add it to the database
        template = EmailTemplates.query.filter_by(name=name).first_or_404()

        db.session.delete(template)
        db.session.commit()

        return jsonify({'message': 'Data Deleted successfully!'}), 200
    except Exception as e:
        print("Error:", str(e))  # Print the error message to the console
        return jsonify({'error': str(e)}), 500


@email_blueprint.route('/send-email', methods=['GET'])
def send_email():
    try:
        # Get data from the request
        bookings = Bookings.query.all()
        for booking in bookings:
            user = User.query.filter_by(cliniko_id=booking.user_id).first()
            if user:
                emailSent = EmailsSent(username=user.username, template="Review",
                                       content="Email Content", user_cliniko_id=user.cliniko_id,
                                       booking_cliniko_id=booking.cliniko_id)

                db.session.add(emailSent)
                db.session.commit()
        return jsonify({'message': 'Data Added successfully!'}), 200
    except Exception as e:
        print("Error:", str(e))  # Print the error message to the console
        return jsonify({'error': str(e)}), 500


scheduler = BackgroundScheduler()
# Schedule the job to run every 20 minutes
scheduler.add_job(get_patients, 'interval', minutes=20)
