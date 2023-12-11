/// TODO
import {createFilterModal} from './createFilterModal.js';

function get_data(query = null) {
    // URL of your Flask API
    const apiUrl = 'http://127.0.0.1:5001/emailService/get-today-attendees';

    // Make a GET request to the Flask API
    return fetch(apiUrl, {
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


document.addEventListener("DOMContentLoaded", function () {


    const scheduledEmailsData = null;

    const templateData = [
        {
            group: "Birthday",
            content: "Magna quis do magna nostrud reprehenderit eiusmod aute aliqua do tempor deserunt ipsum. Adipisicing ullamco esse excepteur in reprehenderit cupidatat eu labore excepteur velit cillum occaecat. Sit mollit fugiat pariatur ad proident tempor mollit eu consequat esse. Officia do ad pariatur reprehenderit occaecat veniam aliqua eiusmod officia exercitation occaecat laborum. Sint labore labore minim esse elit velit laboris. Duis voluptate anim laboris quis ut laborum. In nostrud culpa in ut."
        },
        {
            group: "Review",
            content: "Magna quis do magna nostrud reprehenderit eiusmod aute aliqua do tempor deserunt ipsum. Adipisicing ullamco esse excepteur in reprehenderit cupidatat eu labore excepteur velit cillum occaecat. Sit mollit fugiat pariatur ad proident tempor mollit eu consequat esse. Officia do ad pariatur reprehenderit occaecat veniam aliqua eiusmod officia exercitation occaecat laborum. Sint labore labore minim esse elit velit laboris. Duis voluptate anim laboris quis ut laborum. In nostrud culpa in ut."
        },
        {
            group: "Custom",
            content: "Magna quis do magna nostrud reprehenderit eiusmod aute aliqua do tempor deserunt ipsum. Adipisicing ullamco esse excepteur in reprehenderit cupidatat eu labore excepteur velit cillum occaecat. Sit mollit fugiat pariatur ad proident tempor mollit eu consequat esse. Officia do ad pariatur reprehenderit occaecat veniam aliqua eiusmod officia exercitation occaecat laborum. Sint labore labore minim esse elit velit laboris. Duis voluptate anim laboris quis ut laborum. In nostrud culpa in ut."
        },
        {
            group: "Custom",
            content: "Magna quis do magna nostrud reprehenderit eiusmod aute aliqua do tempor deserunt ipsum. Adipisicing ullamco esse excepteur in reprehenderit cupidatat eu labore excepteur velit cillum occaecat. Sit mollit fugiat pariatur ad proident tempor mollit eu consequat esse. Officia do ad pariatur reprehenderit occaecat veniam aliqua eiusmod officia exercitation occaecat laborum. Sint labore labore minim esse elit velit laboris. Duis voluptate anim laboris quis ut laborum. In nostrud culpa in ut."
        },
        {
            group: "Review",
            content: "Magna quis do magna nostrud reprehenderit eiusmod aute aliqua do tempor deserunt ipsum. Adipisicing ullamco esse excepteur in reprehenderit cupidatat eu labore excepteur velit cillum occaecat. Sit mollit fugiat pariatur ad proident tempor mollit eu consequat esse. Officia do ad pariatur reprehenderit occaecat veniam aliqua eiusmod officia exercitation occaecat laborum. Sint labore labore minim esse elit velit laboris. Duis voluptate anim laboris quis ut laborum. In nostrud culpa in ut."
        },

    ]

    // Function to create a new email template
    function createTemplate() {
        // Implement your logic to create a new template here
        showNewTemplateForm();
    }

    // Function to populate the "Email Template" section
    function populateEmailTemplate() {
        const emailTemplateContainer = document.getElementById("templatesList");
        templateData.forEach((template) => {
            const templateCard = createTemplateCard(template.group, template.content);
            templateCard.addEventListener("click", () => {
                showTemplateContent(template);
            });
            emailTemplateContainer.appendChild(templateCard);
        });
    }

    // Function to populate the "Sent Emails" section
    async function populateSentEmails() {
        const sentEmailsContainer = document.getElementById("sentEmails");
        try {
            const responseData = await get_data();
            const bookingsArray = responseData.bookings;
            bookingsArray.forEach((booking) => {
                console.log(booking);
                const patientCard = createPatientCard(booking['patient_name'], booking['ends_at'], 'Birthday');
                patientCard.addEventListener("click", () => {
                    showEmailContent(booking);
                });
                sentEmailsContainer.appendChild(patientCard);
            });
            // Now you can use bookingsArray as needed
        } catch (error) {
            sentEmailsContainer.innerHTML = "Something went wrong :("
            console.error('Error:', error);
        }

    }

    // Function to populate the "Scheduled Emails" section
    function populateScheduledEmails() {
        const scheduledEmailsContainer = document.getElementById("scheduledEmails");
        scheduledEmailsData.forEach((email) => {
            const patientCard = createPatientCard(email.patientName, email.emailDate, email.template);
            patientCard.addEventListener("click", () => {
                showEmailContent(email);
            });
            scheduledEmailsContainer.appendChild(patientCard);
        });
    }

    // Function to create a patient card
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

    // Function to show email content in an overlay
    function showEmailContent(content) {
        const emailContentOverlay = document.getElementById("emailContentOverlay");
        const emailContent = document.getElementById("emailContent");
        const contentCard = createEmailContentCard(content['patient_name'], content['ends_at'], templateData[1].content, "Review");
        emailContent.appendChild(contentCard);
        emailContentOverlay.style.display = "flex";
    }

    // Function to create email content card
    function createEmailContentCard(patientName, emailDate, emailContent) {
        const card = document.createElement("div");
        card.classList.add("emailContentCard");
        card.innerHTML = `<p>Patient: ${patientName}</p><p>Email Date: ${emailDate}</p>`;
        card.innerHTML += `<p>${emailContent}</p>`
        return card;
    }

    // Function to create a template card
    function createTemplateCard(templateName, content) {
        const card = document.createElement("div");
        const colorCode = document.createElement("div");
        const truncatedContent = content.substring(0, 100);
        colorCode.classList.add("color-code");
        card.classList.add("template-card");
        card.appendChild(colorCode);
        card.innerHTML += `<p class="${templateName}">${templateName}</p>`;
        card.innerHTML += `<p>${truncatedContent} ...</p>`;
        return card;
    }


    // Function to show email content in an overlay
    function showTemplateContent(template) {
        const templateContentOverlay = document.getElementById("templateContentOverlay");
        const templateContent = document.getElementById("templateContent");
        const card = document.createElement("div");
        card.classList.add("template-content");

        const row = document.createElement("div");

        row.classList.add('row');
        row.style.display = 'flex';
        row.style.alignItems = 'baseline';


        const h2 = document.createElement("h2");
        h2.innerHTML = `${template.group} template`;
        h2.classList.add('col-md-6');

        const p = document.createElement('p');
        p.innerHTML = `${template.content}`;
        // Create the <i> element
        const iconElement = document.createElement("i");
        // Set the class attributes
        iconElement.className = "fa-solid fa-pen-to-square fa-2xl";
        iconElement.style.textAlign = 'end';
        iconElement.style.color = '';
        iconElement.style.cursor = 'pointer';
        iconElement.classList.add('col-md-6');


        let isEditMode = false;

// Attach the named event listener

        iconElement.addEventListener('click', () => {

            if (!isEditMode) {
                // Close template content overlay when clicking outside the content
                templateContentOverlay.classList.add("EditMode");
                const colorInput = document.createElement('input');
                colorInput.type = 'color';
                colorInput.value = "#e28c0e"; // Set initial color
                colorInput.style.marginRight = '10px'; // Adjust spacing
                colorInput.style.border = 'none'; // Remove border

                // Create a save button
                const saveButton = document.createElement('button');
                saveButton.textContent = 'Save';
                saveButton.style.padding = '10px'; // Add padding
                saveButton.style.backgroundColor = '#00a34f'; // Set background color
                saveButton.style.color = 'white'; // Set text color
                saveButton.style.border = 'none'; // Remove border
                saveButton.style.borderRadius = '.5rem'; // Remove border
                saveButton.style.cursor = 'pointer'; // Change cursor

                // Add click event listener to the save button
                saveButton.addEventListener('click', () => {
                    // Save the changes
                    iconElement.style.color = colorInput.value;
                    h2.contentEditable = false;
                    p.contentEditable = false;
                    isEditMode = false;
                    const cd = document.getElementById('controlsDiv');
                    card.removeChild(cd);
                });

                const controlsDiv = document.createElement('div');
                controlsDiv.id = "controlsDiv";
                controlsDiv.style.display = 'flex';
                controlsDiv.style.justifyContent = 'space-between';
                controlsDiv.style.alignItems = 'center';

                controlsDiv.appendChild(colorInput);
                controlsDiv.appendChild(saveButton);
                // Make h2 and p editable
                h2.contentEditable = true;
                p.contentEditable = true;
                // Create a div to hold the color input and save button

                isEditMode = true;
                // Append controlsDiv to the card
                card.appendChild(controlsDiv);
            } else {
                const cd = document.getElementById('controlsDiv');
                card.removeChild(cd);
                isEditMode = false;
            }
        });

        // Append the <i> element to the document body or another container
        row.appendChild(h2);
        row.appendChild(iconElement);
        card.appendChild(row);
        card.appendChild(p);
        templateContent.appendChild(card);
        templateContentOverlay.style.display = "flex";


    }

    // Function to show email content in an overlay
    function showFilterContent() {
        const filterContentOverlay = document.getElementById("filterContentOverlay");
        const filterContent = createFilterModal(document.getElementById("filterModalContent"));
        filterContentOverlay.style.display = "flex";
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

        submitButton.addEventListener('click', () => {

            // Make an AJAX request to the Flask API
            const dataToSend = {
                name: inputName.value,
                content: textareaMessage.value
            }
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://localhost:5001/emailService/create_email_templates', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function () {
                // alert(textareaMessage.value);
                if (xhr.readyState === 4 && xhr.status === 200) {
                    console.log('Data added successfully:', xhr.responseText);
                }
            };
            xhr.send(JSON.stringify(dataToSend));
        });
        // Append the elements to the form
        form.appendChild(leftDiv);
        form.appendChild(rightDiv);
        form.appendChild(submitButton);

        return form;
    }

    function showNewTemplateForm() {
        const newTemplateForm = document.getElementById("templateContentOverlay");
        const formContent = document.getElementById("templateContent");
        const form = createForm();
        formContent.appendChild(form);
        newTemplateForm.style.display = "flex";
    }

    // Close email content overlay when clicking outside the content
    const emailContentOverlay = document.getElementById("emailContentOverlay");
    emailContentOverlay.addEventListener("click", (event) => {
        if (event.target === emailContentOverlay) {
            emailContentOverlay.style.display = "none";
            const emailContent = document.getElementById("emailContent");
            emailContent.innerHTML = '';
        }
    });

    // Close template content overlay when clicking outside the content
    const templateContentOverlay = document.getElementById("templateContentOverlay");
    templateContentOverlay.addEventListener("click", (event) => {
        if (event.target === templateContentOverlay) {
            if (templateContentOverlay.classList.contains('EditMode')) {
                // Display a confirmation dialog
                const userResponse = confirm("Do you want to proceed?");

                // Check the user's response
                if (userResponse) {

                    templateContentOverlay.style.display = "none";
                    const templateContent = document.getElementById("templateContent");
                    templateContent.innerHTML = '';
                    templateContentOverlay.classList.remove("EditMode");
                }

            } else {
                templateContentOverlay.style.display = "none";
                const templateContent = document.getElementById("templateContent");
                templateContent.innerHTML = '';
            }
        }

    });


    const filterBtn = document.getElementById("filterBtn");
    filterBtn.addEventListener("click", () => {
        showFilterContent();
    })
    // Close filter content overlay when clicking outside the content
    const filterContentOverlay = document.getElementById("filterContentOverlay");
    filterContentOverlay.addEventListener("click", (event) => {
        if (event.target === filterContentOverlay) {
            filterContentOverlay.style.display = "none";
            const filterContent = document.getElementById("filterModalContent");
            filterContent.innerHTML = '';
        }
    });

    // Getting the show more buttons
    const showMoreBtns = document.getElementsByClassName('show-more');

    // adding functionality to the buttons
    const showMoreArr = Array.from(showMoreBtns);
    showMoreArr.forEach((e) => {
        e.addEventListener('click', (e) => {

            // Getting the section parent ID
            let section = e.target.parentNode;

            while (section.tagName !== 'SECTION') {
                section = section.parentNode;
            }

            // getting the parent Div
            const contentListConainer = Array.from(section.childNodes).filter(node => node.nodeType === Node.ELEMENT_NODE)[1];

            // rotating the button to show the arrow up
            // styling the expanded section
            e.target.style.transform = e.target.style.transform ? '' : "rotate(180deg)";
            section.style.height = section.style.height ? '' : '80vh';
            section.style.marginBottom = section.style.marginBottom ? '' : '4rem';
            contentListConainer.style.height = contentListConainer.style.height ? '' : '100%';
            contentListConainer.style.borderRadius = contentListConainer.style.borderRadius ? '' : '.5rem';
            contentListConainer.style.flexDirection = contentListConainer.style.flexDirection ? '' : 'column';
            contentListConainer.style.boxShadow = contentListConainer.style.boxShadow ? '' : '0 3px 2px 0 #e38901';

        })
    });

    // Function to filter and show/hide patient cards based on the search term
    function filterPatientCards(searchTerm) {
        const patientCards = document.querySelectorAll('.patient-card');

        patientCards.forEach(card => {
            const patientName = card.querySelector('.pname').textContent.toLowerCase();

            if (patientName.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Get the search input element
    const searchInput = document.getElementById('search-input');

    // Attach an event listener to the search input (keyup event)
    searchInput.addEventListener('keyup', function () {
        const searchTerm = searchInput.value.toLowerCase();
        filterPatientCards(searchTerm);
    });

    // Event listener for the "Create Template" button
    document.getElementById("createTemplate").addEventListener("click", createTemplate);

    populateEmailTemplate();
    // Populate the "Sent Emails" and "Scheduled Emails" sectionstemplate-card
    populateSentEmails();
    // populateScheduledEmails();
});
