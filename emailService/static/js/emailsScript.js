/// TODO
import {createFilterModal} from './createFilterModal.js';
import {postData, get_data} from './utilities/api.js';
import {showResponseStatus} from './utilities/ShowResponseStatus.js';
import {TemplateForm} from './widgetCreator/newTemplateForm.js';
import {EditEmailTemplate} from './widgetCreator/createEditEmailTemplate.js';
// import {createPatientCard} from './widgetCreator/newPatientCard.js';


document.addEventListener("DOMContentLoaded", function () {


        const scheduledEmailsData = null;

        // Function to create a new email template
        function createTemplate() {
            // Implement your logic to create a new template here
            const newTemplateForm = document.getElementById("NewTemplateContentOverlay");
            newTemplateForm.style.display = "flex";
        }


        // Function to populate the "Sent Emails" section
        // async function populateSentEmails() {
        //     const sentEmailsContainer = document.getElementById("sentEmails");
        //     try {
        //         const responseData = await get_data('http://127.0.0.1:5001/emailService/get-today-attendees');
        //         const attendeesArray = responseData.attendees;
        //         attendeesArray.forEach((attendee) => {
        //             console.log(attendee);
        //             const patientCard = createPatientCard(attendee.name, attendee.ends_at, 'Birthday');
        //             patientCard.addEventListener("click", () => {
        //                 showEmailContent(attendee);
        //             });
        //             sentEmailsContainer.appendChild(patientCard);
        //         });
        //         // Now you can use bookingsArray as needed
        //     } catch (error) {
        //         sentEmailsContainer.innerHTML = "Something went wrong :(";
        //         sentEmailsContainer.style.textAlign = "center";
        //         console.error('Error:', error);
        //     }
        //
        // }

        function initSentEmails() {
            const sentEmailsContainer = document.getElementById("sentEmails");
            const patientCards = document.querySelectorAll('.patient-card');

            patientCards.forEach((card) => {

                const patient_name = card.querySelector('.pname').textContent;
                const template_name = card.querySelector('.tname').textContent;
                card.addEventListener("click", () => {
                    const data = {
                        'patient_name': patient_name,
                        'template_name': template_name,
                    };
                    showEmailContent(data);
                });
            });
        }

        initSentEmails()

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
        async function showEmailContent(content) {
            const templateContent = await get_data(`http://127.0.0.1:5001/emailService/get_email_template_by_name/${content['template_name']}`);

            const emailContentOverlay = document.getElementById("emailContentOverlay");
            const emailContent = document.getElementById("emailContent");
            const contentCard = createEmailContentCard(content['patient_name'], "2023/04/11", templateContent[0]['content'] || '');
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

        // Function to show email content in an overlay
        function showTemplateContent(template) {
            const templateContentOverlay = document.getElementById("templateContentOverlay");
            const templateContent = document.getElementById("templateContent");

            const card = document.createElement("div");

            const row = document.createElement("div");
            row.classList.add('row');
            row.style.display = 'flex';
            row.style.alignItems = 'baseline';

            const h2 = document.createElement("h2");
            h2.innerHTML = `${template.name}`;
            h2.classList.add('col-md-6');

            const p = document.createElement('p');
            p.innerHTML = `${template.content}`;

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
                    // Open template content overlay when clicking the edit icon
                    templateContentOverlay.classList.add("EditMode");

                    // Create a color input
                    const colorInput = document.createElement('input');
                    colorInput.type = 'color';
                    colorInput.value = "#e28c0e";
                    colorInput.style.marginRight = '10px';
                    colorInput.style.border = 'none';

                    // Create a save button
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

                    // Add click event listener to the save button
                    saveButton.addEventListener('click', async (e) => {
                        const new_name = h2.textContent;
                        const new_content = p.textContent;

                        if (new_name === '' || new_content === "") {
                            alert('Fill out the necessary fields');
                        } else if (name === new_name && new_content === content) {
                            alert('No change was detected');
                        } else {
                            // Save the changes
                            iconElement.style.color = colorInput.value;
                            h2.contentEditable = "false";
                            p.contentEditable = "false";

                            const data = {
                                "new_name": new_name,
                                "name": name,
                                "new_content": new_content,
                                "content": content,
                                "csrf_token": template.csrf_token // Make sure csrfToken is defined
                            };

                            const formData = new FormData();
                            for (const key in data) {
                                formData.append(key, data[key]);
                            }

                            // Modify the URL accordingly
                            const res = await postData("http://127.0.0.1:5001/emailService/update_email_templates", formData);

                            if (showResponseStatus(res)) {
                                isEditMode = false;
                                $("#templatesList").load(window.location.href + " #templatesList", () => {
                                    initTemplateCard();
                                    templateContentOverlay.classList.remove("EditMode");
                                    templateContentOverlay.style.display = 'none';
                                    card.innerHTML = "";
                                    controlsDiv = null;
                                });
                            }
                        }
                    });

                    // Create controlsDiv only if it doesn't exist
                    if (!controlsDiv) {
                        // Create controlsDiv
                        controlsDiv = document.createElement('div');
                        controlsDiv.id = "controlsDiv";
                        controlsDiv.style.display = 'flex';
                        controlsDiv.style.justifyContent = 'space-between';
                        controlsDiv.style.alignItems = 'center';

                        controlsDiv.appendChild(colorInput);
                        controlsDiv.appendChild(saveButton);

                        // Append controlsDiv to the card
                        card.appendChild(controlsDiv);
                    }

                    // Make h2 and p editable
                    h2.contentEditable = 'true';
                    p.contentEditable = 'true';

                    isEditMode = true;
                } else {
                    // Close template content overlay when clicking the edit icon again
                    templateContentOverlay.classList.remove("EditMode");

                    // Remove controlsDiv from card
                    if (controlsDiv) {
                        card.innerHTML = "";
                        controlsDiv = null; // Reset controlsDiv
                    }

                    // Cleanup (modify based on your HTML structure)
                    isEditMode = false;
                }
            });

// Append the elements to the card
            row.appendChild(h2);
            row.appendChild(iconElement);
            card.appendChild(row);
            card.appendChild(p);

// Append the card to the template content
            templateContent.appendChild(card);
            templateContentOverlay.style.display = "flex";

        }


        function showFilterContent() {
            const filterContentOverlay = document.getElementById("filterContentOverlay");
            const filterContent = createFilterModal(document.getElementById("filterModalContent"));
            filterContentOverlay.style.display = "flex";
        }

        // -----------------------------------------------------------------------------
        // Codes related to overlays ||
        //                           ||
        //                           ||
        //                           vv

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

        // Close template form overlay when clicking outside the content
        const NewTemplateContentOverlay = document.getElementById("NewTemplateContentOverlay");
        NewTemplateContentOverlay.addEventListener("click", (event) => {
            if (event.target === NewTemplateContentOverlay) {
                // Display a confirmation dialog
                const userResponse = confirm("Do you want to proceed?");
                // Check the user's response
                if (userResponse) {
                    NewTemplateContentOverlay.style.display = "none";
                }
            }
        });

        // ---------------------------------------------------------------------------
        // Codes related to filter popup ||
        //                               ||
        //                               ||
        //                               VV

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


        //----------------------------------------------------------------------------------
        ///  Codes related to arrow buttons ------
        ///                                       |
        ///                                       |
        ///                                       v


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
                const contentListContainer = Array.from(section.childNodes).filter(node => node.nodeType === Node.ELEMENT_NODE)[1];

                // rotating the button to show the arrow up
                // styling the expanded section
                e.target.style.transform = e.target.style.transform ? '' : "rotate(180deg)";
                section.style.height = section.style.height ? '' : '80vh';
                section.style.marginBottom = section.style.marginBottom ? '' : '4rem';
                contentListContainer.style.height = contentListContainer.style.height ? '' : '100%';
                contentListContainer.style.borderRadius = contentListContainer.style.borderRadius ? '' : '.5rem';
                contentListContainer.style.flexDirection = contentListContainer.style.flexDirection ? '' : 'column';
                contentListContainer.style.boxShadow = contentListContainer.style.boxShadow ? '' : '0 3px 2px 0 #e38901';

            })
        });

        // -----------------------------------------------------------------------------
        /// Codes related to search and filtering patients based on the search  |
        ///                                                                     |
        ///                                                                     |
        ///                                                                     v

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

        /// ---------------------------------------------------------------------------
        /// Codes Related to template list section  ---
        ///                                            |
        ///                                            |
        ///                                            v

        // Event listener for the "Create Template" button
        document.getElementById("createTemplate").addEventListener("click", createTemplate);


        function initTemplateCard() {
            const templateCards = document.querySelectorAll('.template-card');
            console.log(templateCards);
// Add a click event listener to each element
            templateCards.forEach(card => {
                card.addEventListener('click', function (e) {
                    const templateName = card.querySelector('.template-name').textContent;
                    const templateContent = card.querySelector('.template-content').textContent;
                    // Find the CSRF token input within the clicked template card
                    const csrfTokenInput = card.querySelector('.csrfTokenInput');
                    const csrfToken = csrfTokenInput.value;
                    const data = {
                        "name": templateName,
                        "content": templateContent,
                        'csrf_token': csrfToken
                    }
                    // Your click event handling code goes here
                    showTemplateContent(data);
                });
            });
        }

        initTemplateCard();

        async function submitForm() {
            const form = document.getElementById('emailForm');
            const formData = new FormData(form);
            const res = await postData("/emailService/create_email_templates", formData)

            if (showResponseStatus(res)) {
                $("#templatesList").load(window.location.href + " #templatesList", () => {
                    NewTemplateContentOverlay.style.display = "none";
                    initTemplateCard();
                    document.getElementById("createTemplate").addEventListener("click", createTemplate);

                });
            }
        }

        // Populate the "Sent Emails" and "Scheduled Emails" sectionstemplate-card
        // populateSentEmails();
        // populateScheduledEmails();

        // Add an event listener to the form to prevent default form submission
        document.getElementById('emailForm').addEventListener('submit', function (event) {
            event.preventDefault();
            submitForm(); // Manually trigger the form submission logic
            document.getElementById('emailForm').reset();
        });

    }
)
;
