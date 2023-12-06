"""
    Module for getting data
"""
import base64
import requests
from flask import jsonify


def get_data(external_api=None, api_key=None, *args, **kwargs):
    """
    Function for getting sending request to given api
    :param external_api:
    :param api_key:
    :param args:
    :param kwargs:
    :return response:
    """
    try:

        # validate the inputs
        if api_key is None:
            return jsonify({'error': "API Key is not Provided"}), 500

        if external_api is None:
            return jsonify({'error': "API is not Provided"}), 500

        # Encode the API key using base64
        api_key_encoded = base64.b64encode(f'{api_key}:'.encode()).decode()

        # Set up the HTTPBasicAuth using the encoded API key
        basic_auth_header = f"Basic {api_key_encoded}"
        app_vendor_name = 'OrangeVille foot clinic'
        app_vendor_email = 'arvinsalehi99@gmail.com'
        headers = {
            'Authorization': basic_auth_header,
            'Accept': 'application/json',
            'User-Agent': f'{app_vendor_name} ({app_vendor_email})'
        }
        query = kwargs['query'] if 'query' in kwargs.keys() else {}

        # Make a GET request to the external API
        response = requests.get(external_api, headers=headers, params=query)

        # Check if the request was successful (status code 200)
        if response.status_code == 200:
            # Parse the JSON response and return it to the client
            data = response.json()
            return data
        else:
            # If the request was not successful, return an error message
            return jsonify({'error': f'{response.status_code}'}), 500

    except Exception as e:
        # Handle any exceptions that might occur during the request
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500
