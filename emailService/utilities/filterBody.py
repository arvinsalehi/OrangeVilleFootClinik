from flask import jsonify


def filter_field(data=None, field=None, ret_json=False):
    """
    Filter a specific field from a list of dictionaries.

    Parameters:
        data (list of dict): The input data, a list of dictionaries.
        field (str): The field to filter from each dictionary in the data.
        ret_json (bool): If True, the result will be returned as JSON.

    Returns:
        list or JSON: If ret_json is False, returns a list containing the values
                      of the specified field from each dictionary in the input data.
                      If ret_json is True, returns a JSON response with the filtered
                      field values.

    Raises:
        ValueError: If data is None or field is an empty string.

    Examples:
        data = [{'id': 1, 'name': 'John'}, {'id': 2, 'name': 'Jane'}]

        # Example 1: Return a list of 'name' values
        result_list = filter_field(data, field='name')
        print(result_list)  # Output: ['John', 'Jane']

        # Example 2: Return a JSON response of 'id' values
        result_json = filter_field(data, field='id', ret_json=True)
        print(result_json)  # Output: {"id": [1, 2]}
    """
    try:
        # Check if input parameters are valid
        if data is None or field is None:
            raise ValueError("Data or field input is missing")

        # Extract the specified field from each dictionary in the data
        res = [item[field] for item in data]

        # Return the result as a list or JSON based on ret_json parameter
        if ret_json:
            return jsonify({f"{field}": res})
        else:
            return res

    except Exception as e:
        # Return an error response as JSON if an exception occurs
        if ret_json:
            res = jsonify({"error": f"{e}"})
            res.status_code = 500
            return res
        else:
            # Reraise the exception if ret_json is False
            raise e
