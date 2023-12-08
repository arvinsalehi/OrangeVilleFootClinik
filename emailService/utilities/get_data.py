"""
Module for getting data
"""
import base64
import requests
from flask import jsonify


def get_data(external_api=None, api_key=None, *args, **kwargs):
    """
    Function for sending a request to a given API.

    Parameters:
        external_api (str): The URL of the external API.
        api_key (str): The API key used for authentication.
        args (tuple): Additional positional arguments (not used).
        kwargs (dict): Additional keyword arguments:
            - query (dict): Additional parameters to include in the API request.

    Returns:
        JSON: The response from the external API.

    Raises:
        ValueError: If API key or external API is not provided.
        JSON: If there is an error during the API request, returns a JSON error response.

    Examples:
        # Example 1: Sending a request to an external API without query parameters
        response = get_data(external_api='https://example.com/api', api_key='my_api_key')
        print(response)

        # Example 2: Sending a request to an external API with query parameters
        query_params = {'param1': 'value1', 'param2': 'value2'}
        response = get_data(external_api='https://example.com/api', api_key='my_api_key', query=query_params)
        print(response)
    """
    try:
        # Validate the inputs
        if api_key is None:
            return jsonify({'error': "API Key is not provided"}), 500

        if external_api is None:
            return jsonify({'error': "API is not provided"}), 500

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
            # data = response.json()
            return response
        else:
            # If the request was not successful, return an error message
            return response.json()
    except Exception as e:
        # Handle any exceptions that might occur during the request
        error_message = {'error': f'An error occurred: {str(e)}'}
        error_response = jsonify(error_message)
        error_response.status_code = 500
        return error_response
