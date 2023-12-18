export function showResponseStatus(data) {
    if (data.hasOwnProperty("message")) {
        // Show a success popup using SweetAlert2
        Swal.fire({
            title: 'Success!',
            text: data.message,
            icon: 'success',
            confirmButtonText: 'OK'
        });
        return true

    } else if (data.hasOwnProperty("error")) {
        // Handle other scenarios if needed

        Swal.fire({
            title: 'Failed!',
            text: data["error"],
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return false
    } else {
        Swal.fire({
            title: 'Failed!',
            text: data['internalError'],
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return false
    }
}