import {postData} from './utilities/api.js';
import {showResponseStatus} from './utilities/ShowResponseStatus.js';

async function htmlToImage(title, htmlCode, callback) {
    // Create a temporary div element
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlCode;

    // Append the div to the document body
    document.body.appendChild(tempDiv);

    // Use html2canvas to capture the content of the div
    return await html2canvas(tempDiv, {
        useCORS: true, //By passing this option in function Cross origin images will be rendered properly in the downloaded version of the PDF
    }).then(async function (canvas) {
        // Remove the temporary div
        document.body.removeChild(tempDiv);

        // Convert the canvas to an image file
        return canvas.toBlob(async (blob) => {
            // Use the callback to handle the imageBlob
            await callback(blob);
        }, 'image/png');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the template data from the data-* attribute
    const templateData = document.getElementById('template-data').dataset.template;

    // Parse the JSON data
    const template = JSON.parse(templateData);

    // Now 'template' variable contains the template data that you can use in your JavaScript code
    // console.log(template['jsonConstruct']);


    unlayer.init({
        id: 'editor',
        displayMode: 'email',
        projectId: 207983,
    });

    unlayer.loadDesign(template['jsonConstruct']);
    document.getElementById('createTemplateForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const colorCode = document.getElementById('color-picker').value;
        const csrf_token = document.getElementById('csrf_token').value;
        let valid = true;

        unlayer.exportHtml(async function (data) {
            const json = data.design; // design json
            const html = data.html; // final html

            await htmlToImage(title, html, async (imageBlob) => {
                const apiEndpoint = 'http://127.0.0.1:5001/emailService/upload-image';

                const formData = new FormData();
                formData.append('title', title);
                formData.append('image', imageBlob, `${title}.png`);

                const imageUrl = await postData(apiEndpoint, formData, csrf_token)
                    .then(response => {
                        console.log(`then: ${JSON.stringify(response)}`);

                        return response['filename'];
                    })
                    .catch(error => {

                        console.log(`catch error: ${error}`);
                        return null;
                    }).finally(error => {
                        console.log(`error: ${error}`);
                    });


                // Ensure that imageUrl is available before proceeding
                if (imageUrl !== undefined) {
                    const requestData = {
                        id: template['id'],
                        title: title.trim() === '' ? (alert('Title field is empty'), valid = false) : title,
                        color: colorCode,
                        jsonConstruct: json === undefined ? (alert('Wait for the email creator'), valid = false) : JSON.stringify(json),
                        imageUrl: imageUrl,
                    };

                    if (valid) {
                        try {
                            const headers = {
                                'Content-Type': 'application/json',
                            };

                            const res = await postData('http://127.0.0.1:5001/emailService/update_email_templates', JSON.stringify(requestData), csrf_token, headers);

                            if (showResponseStatus(res)) {
                                document.getElementById('title').value = '';
                            }
                        } catch (e) {
                            console.log(`Unknown Error: ${e}`);
                        }
                    }
                } else {
                    alert('Image was not uploaded. please try again');
                }
            });
        });
    });
});
