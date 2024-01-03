// Function to populate the "Email Template" section


async function populateEmailTemplate() {
    const emailTemplateContainer = document.getElementById("templatesList");
    try {
        const templateArray = await get_data('http://127.0.0.1:5001/emailService/get_email_templates');
        console.log(templateArray);
        templateArray.forEach((template) => {
            if (template.name) {
                const templateCard = createTemplateCard(template['name'], template['content']);
                templateCard.addEventListener("click", () => {
                    showTemplateContent(template);
                });
                emailTemplateContainer.appendChild(templateCard);
            }
        });
        // Now you can use bookingsArray as needed
    } catch (error) {
        emailTemplateContainer.innerHTML = "Something went wrong :(";
        emailTemplateContainer.style.textAlign = "center";
        console.error('Error:', error);
    }
}

function createForm() {
    // Create a new <h1> element
    const h1 = document.createElement('h1');
    h1.textContent = 'Elegant Contact Form';

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

    const csrfToken = "{{ csrf_token() }}"; // Replace this with the actual token value

    // Create a hidden input element
    const csrfInput = document.createElement("input");
    csrfInput.type = "hidden";
    csrfInput.name = "csrf_token";
    csrfInput.value = csrfToken;

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
            console.log(csrfToken);
            await postData('http://localhost:5001/emailService/create_email_templates', dataToSend, csrfToken);
        }

    });
    // Append the elements to the form
    form.appendChild(leftDiv);
    form.appendChild(rightDiv);
    form.appendChild(csrfInput);
    form.appendChild(submitButton);

    return form;
}


function createTemplateCard(templateName, content) {
    const card = document.createElement("div");
    const colorCode = document.createElement("div");
    const truncatedContent = content.substring(0, 100);
    colorCode.classList.add("color-code");
    card.classList.add("template-card");
    card.appendChild(colorCode);
    card.innerHTML += `<p class="template-name">${templateName}</p>`;
    card.innerHTML += `<p class="template-content">${truncatedContent} ...</p>`;
    card.addEventListener("click", () => {
        showTemplateContent({"name": templateName, "content": content});
    });
    return card;
}

    function populateScheduledEmails(scheduledEmailsData) {
        const scheduledEmailsContainer = document.getElementById("scheduledEmails");
        scheduledEmailsData.forEach((email) => {
            const patientCard = createPatientCard(email.patientName, email.emailDate, email.template);
            patientCard.addEventListener("click", () => {
                showEmailContent(email);
            });
            scheduledEmailsContainer.appendChild(patientCard);
        });
    }

        function createPatientCard(patientName, emailDate, template) {
        const card = document.createElement("div");
        const colorCode = document.createElement("div");
        card.classList.add("patient-card");
        colorCode.classList.add("color-code");
        card.appendChild(colorCode);
        card.innerHTML += `<p class="pname">Patient: ${patientName}</p><p>Email Date: ${emailDate}</p>`;
        card.innerHTML += `<p>Tempate: ${template}</p>`;
        return card;
    }
        async function showEmailContent(content) {
        const templateContent = await get_data(`http://127.0.0.1:5001/emailService/get_email_template_by_name/${content['template_name']}`);
        if (showResponseStatus(templateContent, false)) {
            const emailContentOverlay = document.getElementById("emailContentOverlay");
            const emailContent = document.getElementById("emailContent");
            const contentCard = createEmailContentCard(content['patient_name'], "2023/04/11", templateContent['template'][0]['content'] || '');
            emailContent.appendChild(contentCard);
            emailContentOverlay.style.display = "flex";
        }
    }

        function createEmailContentCard(patientName, emailDate, emailContent) {
        const card = document.createElement("div");
        card.classList.add("emailContentCard");
        card.innerHTML = `<p>Patient: ${patientName}</p><p>Email Date: ${emailDate}</p>`;
        card.innerHTML += `<p>${emailContent}</p>`;
        return card;
    }