export async function postData(url, data, headers = null) {
    try {
        console.log(data)
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                // 'Content-Type': 'application/json',
                // 'X-CSRFToken': csrf_token,
                ...headers,
            },
            body: data,
        });

        const responseData = await response.json();
        console.log('Data:', responseData);

        return responseData;
    } catch (error) {
        console.error('Error:', error);
        throw error; // Rethrow the error for further handling if needed
    }
}


export function get_data(url, query = null) {
    // URL of your Flask API
    // const apiUrl = 'http://127.0.0.1:5001/emailService/get-today-attendees';

    // Make a GET request to the Flask API
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Query': JSON.stringify(query || {}),  // Convert query to JSON if not null
            // Add any other headers if needed
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();  // Parse the response body as JSON
        })
        .catch(error => {
            // Handle errors
            console.error('Error:', error);
            throw error;  // Re-throw the error to propagate it
        });
}

