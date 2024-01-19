import {get_data, postData} from './utilities/api.js'
import {showResponseStatus} from './utilities/ShowResponseStatus.js';

document.addEventListener("DOMContentLoaded", async () => {
    const deleteIcons = document.querySelectorAll('.delete');

    deleteIcons.forEach((deleteIcon) => {
        deleteIcon.addEventListener('click', async () => {
            const templateName = deleteIcon.getAttribute('data-template-name');

            try {

                const res = await get_data(`http://127.0.0.1:5001/emailService/delete_email_templates/${templateName}`);

                if (showResponseStatus(res)) {
                    location.reload();

                }
            } catch (e) {
                console.log(`Unknown Error: ${e}`);
            }

            // Now you can use the templateName in your logic
            console.log('Deleting template with name:', templateName);
        });
    })
})