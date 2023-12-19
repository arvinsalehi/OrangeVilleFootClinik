import {postData, get_data} from '../utilities/api.js';

export function TemplateForm() {
    // Create a <form> element with the "cf" class
    const form = document.createElement('form');
    form.className = 'cf';

    // Create the left half of the form
    const leftDiv = document.createElement('div');
    leftDiv.className = 'half left cf';

    // Create input elements for name, email, and subject
    const inputName = document.createElement('input');
    inputName.type = 'text';
    inputName.id = 'input-name';
    inputName.placeholder = 'title';

    leftDiv.appendChild(inputName);

    // Create the right half of the form
    const rightDiv = document.createElement('div');
    rightDiv.className = 'half right cf';

    // Create a textarea for the message
    const textareaMessage = document.createElement('textarea');
    textareaMessage.name = 'message';
    // textareaMessage.type = 'text';
    textareaMessage.id = 'input-message';
    textareaMessage.placeholder = 'Message';

    rightDiv.appendChild(textareaMessage);

    // Create the submit button
    const submitButton = document.createElement('input');
    submitButton.type = 'submit';
    submitButton.value = 'Submit';
    submitButton.id = 'input-submit';

    // const csrfToken = document.querySelector('#templateContent [name="csrf_token"]').value;
    const csrfToken = document.getElementById('csrf').value;

    submitButton.addEventListener('click', async (e) => {
        if (inputName.value === "" || textareaMessage.value === "") {
            alert('please fill the fields');
            e.preventDefault()
        } else {

            // Make an AJAX request to the Flask API
            const dataToSend = {
                name: inputName.value,
                content: textareaMessage.value
            }
            const res = await postData('http://localhost:5001/emailService/create_email_templates', dataToSend, csrfToken);
            alert(res.ok);
            console.log(res.json());
        }

    });
    // Append the elements to the form
    form.appendChild(leftDiv);
    form.appendChild(rightDiv);
    form.appendChild(submitButton);

    return form;
}
