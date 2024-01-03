import {initTemplateCard} from '../widgetCreator/widgetInit.js'
import {showResponseStatus} from './ShowResponseStatus.js'
import {postData} from './api.js'

export async function submitForm(document) {
    const newTemplateForm = document.getElementById("NewTemplateContentOverlay");

    const form = document.getElementById('emailForm');
    const formData = new FormData(form);
    const res = await postData("/emailService/create_email_templates", formData)

    if (showResponseStatus(res)) {
        $("#templates").load(window.location.href + " #templatesList", () => {
            newTemplateForm.style.display = "none";
            initTemplateCard(document);
        });
    }
}