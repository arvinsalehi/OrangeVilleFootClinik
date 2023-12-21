import {createFilterModal} from './createFilterModal.js';
import {postData, get_data} from './utilities/api.js';
import {showResponseStatus} from './utilities/ShowResponseStatus.js';
import {TemplateForm} from './widgetCreator/newTemplateForm.js';
import {EditEmailTemplate} from './widgetCreator/createEditEmailTemplate.js';

document.addEventListener("DOMContentLoaded", function () {
    // TODO: Consider removing unused variable
    // const scheduledEmailsData = null;

    // function initScrolls() {
    //     const scrollContainer = document.getElementById("sentEmails");
    //     // const scrollBtnHolder = document.getElementById("sentEmailsScroll");
    //     const scrollLeftButton = document.getElementById("scrollLeft");
    //     const scrollRightButton = document.getElementById("scrollRight");
    //
    //     scrollRightButton.addEventListener("click", function () {
    //         scrollContainer.scrollBy({
    //             left: scrollContainer.offsetWidth,
    //             behavior: "smooth"
    //         });
    //         // scrollBtnHolder.style.justifyContent = 'space-between';
    //     });
    //
    //     scrollLeftButton.addEventListener("click", function () {
    //         scrollContainer.scrollBy({
    //             left: -scrollContainer.offsetWidth,
    //             behavior: "smooth"
    //         });
    //     });
    //
    //     // Initial check for the scroll buttons
    //     updateScrollButtons();
    //
    //     function updateScrollButtons() {
    //         let maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    //         scrollLeftButton.style.display = scrollContainer.scrollLeft > 0 ? "block" : "none";
    //         // scrollBtnHolder.style.justifyContent = scrollContainer.scrollLeft > 0 ? "space-between" : "end";
    //         scrollRightButton.style.display = scrollContainer.scrollLeft < maxScrollLeft ? "block" : "none";
    //     }
    //
    //     // Show/hide scroll buttons based on scroll position
    //     scrollContainer.addEventListener("scroll", function () {
    //         updateScrollButtons();
    //     });
    // }

    function initScrolls(section) {
        // const scrollContainer = $('.scroll-buttons');
        const scrollContainerWrap = $(section).find('.scroll-container-wrap');
        const scrollLeftButton = scrollContainerWrap.find('.scroll-left');
        const scrollContainer = scrollContainerWrap.find('.scrollable-container');
        const scrollRightButton = scrollContainerWrap.find('.scroll-right');

        scrollRightButton.on('click', function () {
            scrollContainer[0].scrollBy({
                left: scrollContainer.outerWidth(),
                behavior: 'smooth'
            });
        });

        scrollLeftButton.on('click', function () {
            scrollContainer[0].scrollBy({
                left: -scrollContainer.outerWidth(),
                behavior: 'smooth'
            });
        });

        // Initial check for the scroll buttons
        updateScrollButtons();

        function updateScrollButtons() {
            let maxScrollLeft = scrollContainer[0].scrollWidth - scrollContainer.outerWidth();
            scrollLeftButton.css('display', scrollContainer.scrollLeft() > 0 ? 'block' : 'none');
            scrollRightButton.css('display', scrollContainer.scrollLeft() < maxScrollLeft ? 'block' : 'none');
        }

        // Show/hide scroll buttons based on scroll position
        scrollContainer.on('scroll', function () {
            updateScrollButtons();
        });
    }

    $('section.btn-scroll-widget').each(function () {
        initScrolls(this);
    });

    // Function to create a new email template
    function createTemplate() {
        const newTemplateForm = document.getElementById("NewTemplateContentOverlay");
        newTemplateForm.style.display = "flex";
    }

    function initSentEmails() {
        const sentEmailsContainer = document.getElementById("sentEmails");
        const patientCards = document.querySelectorAll('.patient-card');

        patientCards.forEach((card) => {
            const patient_name = card.querySelector('.pname').textContent;
            const template_name = card.querySelector('.tname').textContent;
            const colorCodeContainer = $(card).find('.color-code');
            const colorCode = $(colorCodeContainer).find('.color-code-value').text();
            colorCodeContainer.css('display', "block");
            colorCodeContainer.css('border-color', `transparent ${colorCode} transparent transparent`);

            card.addEventListener("click", () => {
                const data = {
                    'patient_name': patient_name,
                    'template_name': template_name,
                };
                showEmailContent(data);
            });
        });
    }

    initSentEmails();

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

    // Function to show email content in an overlay
    async function showTemplateContent(template) {
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

                            const res = await postData("http://127.0.0.1:5001/emailService/update_email_templates", formData);

                            if (showResponseStatus(res)) {
                                isEditMode = false;
                                $("#templates").load(window.location.href + " #templatesList", () => {
                                    initTemplateCard();
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
                                    initTemplateCard();
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

    function showFilterContent() {
        const filterContentOverlay = document.getElementById("filterContentOverlay");
        const filterContent = createFilterModal(document.getElementById("filterModalContent"));
        filterContentOverlay.style.display = "flex";
    }

    // Close overlay when clicking outside the content
    function closeOverlay(overlay, content) {
        overlay.addEventListener("click", (event) => {
            if (event.target === overlay) {
                if (overlay.classList.contains('EditMode')) {
                    const userResponse = confirm("Do you want to proceed?");
                    if (userResponse) {
                        overlay.style.display = "none";
                        content.innerHTML = '';
                        overlay.classList.remove("EditMode");
                    }
                } else {
                    overlay.style.display = "none";
                    content.innerHTML = '';
                }
            }
        });
    }

    closeOverlay(document.getElementById("emailContentOverlay"), document.getElementById("emailContent"));
    closeOverlay(document.getElementById("templateContentOverlay"), document.getElementById("templateContent"));
    closeOverlay(document.getElementById("NewTemplateContentOverlay"), null);
    closeOverlay(document.getElementById("filterContentOverlay"), document.getElementById("filterModalContent"));

    const filterBtn = document.getElementById("filterBtn");
    filterBtn.addEventListener("click", () => {
        showFilterContent();
    });

    $('.show-more').on('click', function () {
        let section = $(this).parent();
        while (section.prop('tagName') !== 'SECTION') {
            section = section.parent();
        }

        const contentListContainer = Array.from(section.children()).filter(function (node) {
            return node.nodeType === Node.ELEMENT_NODE;
        })[1];

        $.get("http://127.0.0.1:5001/emailService/Sent-Emails", function (data) {
            // Create an iframe
            const iframe = $("<iframe>").attr({
                "srcdoc": data,  // Set the API response as the iframe content
                "width": "100%",
                "height": "400px",
                "frameborder": "0"
            });
            window.open('http://127.0.0.1:5001/emailService/Sent-Emails', '_blank');

        });
    });

    function filterPatientCards(searchTerm) {
        const patientCards = document.querySelectorAll('.patient-card');
        patientCards.forEach(card => {
            const patientName = card.querySelector('.pname').textContent.toLowerCase();
            card.style.display = patientName.includes(searchTerm) ? 'block' : 'none';
        });
    }

    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('keyup', function () {
        const searchTerm = searchInput.value.toLowerCase();
        filterPatientCards(searchTerm);
    });

    function initTemplateCard() {
        const templateCards = document.querySelectorAll('.template-card');
        document.getElementById("createTemplate").addEventListener("click", createTemplate);
        // const truncatedString = (str, maxLength) => (str.length > maxLength ? str.substring(0, maxLength) + '...' : str);


        templateCards.forEach(card => {
            const colorCodeContainer = $(card).find('.color-code');
            const colorCode = $(colorCodeContainer).find('.color-code-value').text();
            colorCodeContainer.css('display', "block");
            colorCodeContainer.css('border-color', `transparent ${colorCode} transparent transparent`);
            card.addEventListener('click', function (e) {
                const templateName = card.querySelector('.template-name').textContent;
                const templateContent = card.querySelector('.template-content').textContent;
                const csrfTokenInput = card.querySelector('.csrfTokenInput');
                const csrfToken = csrfTokenInput.value;
                // alert(colorCode);
                const data = {
                    "name": templateName,
                    "content": templateContent,
                    'color_code': colorCode,
                    'csrf_token': csrfToken
                }

                showTemplateContent(data);
            });
        });
    }

    initTemplateCard();

    async function submitForm() {
        const newTemplateForm = document.getElementById("NewTemplateContentOverlay");

        const form = document.getElementById('emailForm');
        const formData = new FormData(form);
        const res = await postData("/emailService/create_email_templates", formData)

        if (showResponseStatus(res)) {
            $("#templates").load(window.location.href + " #templatesList", () => {
                newTemplateForm.style.display = "none";
                initTemplateCard();
            });
        }
    }

    document.getElementById('emailForm').addEventListener('submit', function (event) {
        event.preventDefault();
        submitForm();
        document.getElementById('emailForm').reset();
    });
});
