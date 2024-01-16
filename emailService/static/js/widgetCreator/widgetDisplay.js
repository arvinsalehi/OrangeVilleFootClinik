import {createEmailContentCard} from './widgetCreator.js'
import {showResponseStatus} from '../utilities/ShowResponseStatus.js'
import {get_data, postData} from '../utilities/api.js'
import {initTemplateCard} from './widgetInit.js'

export async function showEmailContent(document, content) {
    const templateContent = await get_data(`http://127.0.0.1:5001/emailService/get_email_template_by_name/${content['template_name']}`);
    if (showResponseStatus(templateContent, false)) {
        const emailContentOverlay = document.getElementById("emailContentOverlay");
        const emailContent = document.getElementById("emailContent");
        const contentCard = createEmailContentCard(document, content['patient_name'], "2023/04/11", templateContent['template'][0]['content'] || '');
        emailContent.appendChild(contentCard);
        emailContentOverlay.style.display = "flex";
    }
}

// Function to show email content in an overlay
export async function showTemplateContent(document, template) {
    const templateContentOverlay = document.getElementById("templateContentOverlay");
    const templateContent = document.getElementById("templateContent");
    const templateContentTxt = await get_data(`http://127.0.0.1:5001/emailService/get_email_template_by_name/${template.name}`);
    if (templateContentTxt.hasOwnProperty('error') || templateContentTxt.hasOwnProperty('internalError')) {
        showResponseStatus(templateContentTxt, false);
    } else {

        const card = document.createElement("div");

        const wrap = document.createElement("div");

        wrap.style.display = 'flex';
        wrap.style.justifyContent = 'space-between';
        wrap.style.alignItems = 'center';

        const row = document.createElement("div");
        row.classList.add('row');
        row.style.display = 'flex';
        row.style.alignItems = 'baseline';

        const h2 = document.createElement("h2");
        h2.innerHTML = `${template.name}`;
        h2.classList.add('col-md-6');

        const p = document.createElement('p');
        p.innerHTML = templateContentTxt['template'][0]['content'];

        const iconElement = document.createElement("i");
        iconElement.className = "fa-solid fa-pen-to-square fa-2xl";
        iconElement.style.textAlign = 'end';
        iconElement.style.color = '';
        iconElement.style.cursor = 'pointer';
        iconElement.classList.add('col-md-6');


        let isEditMode = false;
        let controlsDiv;

        iconElement.addEventListener('click', async () => {
            if (!isEditMode) {
                templateContentOverlay.classList.add("EditMode");

                const deleteIconElement = document.createElement('i');

// Set the class attribute
                deleteIconElement.className = 'fa-solid fa-square-minus fa-2xl';
                deleteIconElement.style.cursor = 'pointer';

// Set the style attribute for color
                deleteIconElement.style.color = '#df0707';

                const colorInput = document.createElement('input');
                colorInput.type = 'color';
                colorInput.value = "#e28c0e";
                colorInput.style.marginRight = '10px';
                colorInput.style.border = 'none';

                const saveButton = document.createElement('button');
                saveButton.textContent = 'Save';
                saveButton.value = '';
                saveButton.style.padding = '10px';
                saveButton.style.backgroundColor = '#00a34f';
                saveButton.style.color = 'white';
                saveButton.style.border = 'none';
                saveButton.style.borderRadius = '.5rem';
                saveButton.style.cursor = 'pointer';

                const name = h2.textContent;
                const content = p.textContent;

                saveButton.addEventListener('click', async (e) => {
                    const new_name = h2.textContent;
                    const new_content = p.textContent;
                    const color_value = colorInput.value;
                    if (new_name === '' || new_content === "") {
                        alert('Fill out the necessary fields');
                    } else if (name === new_name && new_content === content && template.color_code === color_value) {
                        alert('No change was detected');
                    } else {
                        iconElement.style.color = colorInput.value;
                        h2.contentEditable = "false";
                        p.contentEditable = "false";

                        const data = {
                            "name": name,
                            "color_value": color_value,
                            "csrf_token": template.csrf_token,
                            ...(new_name !== name ? {"new_name": new_name} : ''),
                            ...(new_content !== content ? {"new_content": new_content} : '')
                        };


                        const formData = new FormData();
                        for (const key in data) {
                            formData.append(key, data[key]);
                        }

                        // TODO postData is changed the parameter sent to it should be of type json from now on.
                        const res = await postData("http://127.0.0.1:5001/emailService/update_email_templates", formData);

                        if (showResponseStatus(res)) {
                            isEditMode = false;
                            $("#templates").load(window.location.href + " #templatesList", () => {
                                initTemplateCard(document);
                                templateContentOverlay.classList.remove("EditMode");
                                templateContentOverlay.style.display = 'none';
                                card.innerHTML = "";
                                controlsDiv = null;
                            });
                        }
                    }
                });

                deleteIconElement.addEventListener('click', async () => {
                    const userConfirm = confirm(`Are you sure you want to delete ${template.name} template?`);
                    if (userConfirm) {
                        const data = {
                            'name': template.name,
                            "csrf_token": template.csrf_token
                        };

                        const formData = new FormData();
                        for (const key in data) {
                            formData.append(key, data[key]);
                        }

                        const res = await postData("http://127.0.0.1:5001/emailService/delete_email_templates", formData);

                        if (showResponseStatus(res)) {
                            isEditMode = false;
                            $("#templates").load(window.location.href + " #templatesList", () => {
                                initTemplateCard(document);
                                templateContentOverlay.classList.remove("EditMode");
                                templateContentOverlay.style.display = 'none';
                                card.innerHTML = "";
                                controlsDiv = null;
                            });
                        }
                    }
                })
                if (!controlsDiv) {
                    controlsDiv = document.createElement('div');
                    controlsDiv.id = "controlsDiv";
                    controlsDiv.style.display = 'flex';
                    controlsDiv.style.justifyContent = 'space-between';
                    controlsDiv.style.alignItems = 'center';

                    controlsDiv.appendChild(deleteIconElement);
                    controlsDiv.appendChild(colorInput);
                    controlsDiv.appendChild(saveButton);

                    card.appendChild(controlsDiv);
                }

                h2.contentEditable = 'true';
                p.contentEditable = 'true';

                isEditMode = true;
            } else {
                templateContentOverlay.classList.remove("EditMode");

                if (controlsDiv) {
                    card.innerHTML = "";
                    controlsDiv = null;
                }

                isEditMode = false;
            }
        });

        wrap.appendChild(h2);
        wrap.appendChild(iconElement);
        row.appendChild(wrap);
        card.appendChild(row);
        card.appendChild(p);
        templateContent.appendChild(card);
        templateContentOverlay.style.display = "flex";
    }
}


