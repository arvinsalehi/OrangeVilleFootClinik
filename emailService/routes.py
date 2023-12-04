from flask import jsonify
from flask import render_template
from itsdangerous import base64_encode
from . import email_blueprint
import requests
from requests.auth import HTTPBasicAuth


@email_blueprint.route("/")
def emails():
    return render_template("emails.html")


# Define a route that sends a request to an external API
@email_blueprint.route('/external-api', methods=['GET'])
def get_patients():
    try:
        api_key = "MS0xMjc3NzQ5ODY0MzYwMzE1NDAyLVdiRVNvOVdBblZlcmtWZGk3T3IxdHJpY3FHUEVnRVdt-ca1"

# Encode the API key using base64
        api_key_encoded = base64_encode(f"{api_key}:".encode()).decode()

# Set up the HTTPBasicAuth using the encoded API key
        auth = HTTPBasicAuth(f"Basic {api_key_encoded}")
        headers = {
            'Accept': 'application/json',
            "User-Agent": "OrangVille foot clinik (arvinsalehi99@gmail.com)"
            }
        query = {
            "order": "asc",
            "page": "0",
            "per_page": "1",
            "q[]": "string",
            "sort": "created_at:desc"
        }
        # Replace 'https://jsonplaceholder.typicode.com/posts/1' with the actual API endpoint you want to call
        external_api_url = "https://api.au1.cliniko.com/v1/patients"
        
        # Make a GET request to the external API
        response = requests.get(external_api_url, headers=headers, params=query, auth=auth)

        # Check if the request was successful (status code 200)
        if response.status_code == 200:
            # Parse the JSON response and return it to the client
            data = response.json()
            return jsonify(data)
        else:
            # If the request was not successful, return an error message
            return jsonify({'error': f'{response.status_code}'}), 500

    except Exception as e:
        # Handle any exceptions that might occur during the request
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500
