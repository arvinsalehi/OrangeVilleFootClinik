export async function postData(url, data, csrf_token = null, headers = null) {
    try {
        const defaultHeaders = {
            'X-CSRFToken': csrf_token,
        };

        // Check if data is FormData or JSON
        let contentType = 'application/json'; // Default to JSON
        let bodyData = data;

        if (data instanceof FormData) {
            contentType = 'multipart/form-data';
        } else if (typeof data === 'object' && data !== null) {
            // If it's an object (presumed to be JSON), stringify it
            bodyData = JSON.stringify(data);
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                ...defaultHeaders,
                'Content-Type': contentType,
                ...(headers || {}),
            },
            body: bodyData,
        });

        const responseData = await response.json();
        console.log('Data:', responseData);

        return responseData;
    } catch (error) {
        console.error('Error:', error);
        throw error; // Rethrow the error for further handling if needed
    }
}


export async function get_data(url, query = null) {
    // URL of your Flask API
    // const apiUrl = 'http://127.0.0.1:5001/emailService/get-today-attendees';

    // Make a GET request to the Flask API
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Query': JSON.stringify(query || {}),  // Convert query to JSON if not null
                // Add any other headers if needed
            },
        });
        const responseData = await response.json();
        console.log('Data:', responseData);

        return responseData;
    } catch (error) {
        console.error('Error:', error);
        throw error; // Rethrow the error for further handling if needed
    }

}

