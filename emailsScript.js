document.addEventListener("DOMContentLoaded", function () {
    // Sample data for sent and scheduled emails
    const sentEmailsData = [
        { patientName: "John Doe", emailDate: "2023-10-15", emailContent: "Hello John, Officia sint cupidatat mollit voluptate consequat. Dolore ut mollit culpa elit nostrud dolore deserunt. Commodo nulla magna pariatur id quis cillum aute sunt. Officia et Lorem eu amet voluptate enim irure in occaecat do consectetur voluptate labore. Veniam quis occaecat proident incididunt ipsum ad in ad non.", template: "Birthday" },
        { patientName: "Jane Smith", emailDate: "2023-10-12", emailContent: "Dear Jane, Enim sunt irure amet sunt minim id eu esse tempor aute nisi est. Cillum culpa consectetur velit officia excepteur irure cupidatat minim ipsum. Cupidatat ipsum velit incididunt occaecat dolor tempor est velit reprehenderit do non velit. Dolor cupidatat pariatur nisi aute eu anim nisi ex duis sit fugiat.Do ipsum et excepteur cupidatat esse exercitation aliqua ipsum exercitation pariatur. Pariatur consequat cillum laborum commodo mollit adipisicing ullamco qui ut. Officia cupidatat consectetur et laboris et cillum. Laboris aute magna proident nisi non dolore ullamco velit aliquip do velit consequat. Aute sunt cupidatat ipsum nulla.Elit cillum duis veniam voluptate dolore cupidatat pariatur consectetur ad qui labore. Proident elit cillum adipisicing labore nisi. Id officia veniam eu non ad sint ea. Mollit tempor ea deserunt elit. Minim pariatur elit amet consequat ad velit ut irure amet est. Ad enim exercitation pariatur pariatur cupidatat ad et pariatur do esse deserunt tempor.", template: "Reveiw" },
        { patientName: "John Doe", emailDate: "2023-10-15", emailContent: "Hello John, ...", template: "Birthday" },
        { patientName: "Jane Smith", emailDate: "2023-10-12", emailContent: "Dear Jane, ...", template: "Reveiw" },
        { patientName: "John Doe", emailDate: "2023-10-15", emailContent: "Hello John, ...", template: "Birthday" },
        { patientName: "Jane Smith", emailDate: "2023-10-12", emailContent: "Dear Jane, ...", template: "Reveiw" },
        { patientName: "John Doe", emailDate: "2023-10-15", emailContent: "Hello John, ...", template: "Birthday" },
        { patientName: "Jane Smith", emailDate: "2023-10-12", emailContent: "Dear Jane, ...", template: "Reveiw" },
        // Add more sent email data as needed
    ];

    const scheduledEmailsData = [
        { patientName: "Alice Johnson", emailDate: "2023-10-18", emailContent: "Hi Alice, ...", template: "Birthday" },
        { patientName: "Bob Brown", emailDate: "2023-10-20", emailContent: "Hello Bob, ...", template: "Reveiw" },
        { patientName: "Alice Johnson", emailDate: "2023-10-18", emailContent: "Hi Alice, ...", template: "Birthday" },
        { patientName: "Bob Brown", emailDate: "2023-10-20", emailContent: "Hello Bob, ...", template: "Reveiw" },
        { patientName: "Alice Johnson", emailDate: "2023-10-18", emailContent: "Hi Alice, ...", template: "Birthday" },
        { patientName: "Bob Brown", emailDate: "2023-10-20", emailContent: "Hello Bob, ...", template: "Reveiw" },
        { patientName: "Alice Johnson", emailDate: "2023-10-18", emailContent: "Hi Alice, ...", template: "Birthday" },
        { patientName: "Bob Brown", emailDate: "2023-10-20", emailContent: "Hello Bob, ...", template: "Reveiw" },
        // Add more scheduled email data as needed
    ];

    const templateData = [
        { group: "Birthday", content: "Magna quis do magna nostrud reprehenderit eiusmod aute aliqua do tempor deserunt ipsum. Adipisicing ullamco esse excepteur in reprehenderit cupidatat eu labore excepteur velit cillum occaecat. Sit mollit fugiat pariatur ad proident tempor mollit eu consequat esse. Officia do ad pariatur reprehenderit occaecat veniam aliqua eiusmod officia exercitation occaecat laborum. Sint labore labore minim esse elit velit laboris. Duis voluptate anim laboris quis ut laborum. In nostrud culpa in ut." },
        { group: "Review", content: "Magna quis do magna nostrud reprehenderit eiusmod aute aliqua do tempor deserunt ipsum. Adipisicing ullamco esse excepteur in reprehenderit cupidatat eu labore excepteur velit cillum occaecat. Sit mollit fugiat pariatur ad proident tempor mollit eu consequat esse. Officia do ad pariatur reprehenderit occaecat veniam aliqua eiusmod officia exercitation occaecat laborum. Sint labore labore minim esse elit velit laboris. Duis voluptate anim laboris quis ut laborum. In nostrud culpa in ut." },
        { group: "Custom", content: "Magna quis do magna nostrud reprehenderit eiusmod aute aliqua do tempor deserunt ipsum. Adipisicing ullamco esse excepteur in reprehenderit cupidatat eu labore excepteur velit cillum occaecat. Sit mollit fugiat pariatur ad proident tempor mollit eu consequat esse. Officia do ad pariatur reprehenderit occaecat veniam aliqua eiusmod officia exercitation occaecat laborum. Sint labore labore minim esse elit velit laboris. Duis voluptate anim laboris quis ut laborum. In nostrud culpa in ut." },
        { group: "Custom", content: "Magna quis do magna nostrud reprehenderit eiusmod aute aliqua do tempor deserunt ipsum. Adipisicing ullamco esse excepteur in reprehenderit cupidatat eu labore excepteur velit cillum occaecat. Sit mollit fugiat pariatur ad proident tempor mollit eu consequat esse. Officia do ad pariatur reprehenderit occaecat veniam aliqua eiusmod officia exercitation occaecat laborum. Sint labore labore minim esse elit velit laboris. Duis voluptate anim laboris quis ut laborum. In nostrud culpa in ut." },
        { group: "Review", content: "Magna quis do magna nostrud reprehenderit eiusmod aute aliqua do tempor deserunt ipsum. Adipisicing ullamco esse excepteur in reprehenderit cupidatat eu labore excepteur velit cillum occaecat. Sit mollit fugiat pariatur ad proident tempor mollit eu consequat esse. Officia do ad pariatur reprehenderit occaecat veniam aliqua eiusmod officia exercitation occaecat laborum. Sint labore labore minim esse elit velit laboris. Duis voluptate anim laboris quis ut laborum. In nostrud culpa in ut." },

    ]

    // Function to create a new email template
    function createTemplate() {
        // Implement your logic to create a new template here
        alert("New email template created!");
    }

    // Function to populate the "Email Template" section
    function populateEmailTemplate() {
        const emailTemplateContainer = document.getElementById("templateList");
        templateData.forEach((template) => {
            const templateCard = createTemplateCard(template.group, template.content);
            templateCard.addEventListener("click", () => {
                showTemplateContent(template);
            });
            emailTemplateContainer.appendChild(templateCard);
        });
    }

    // Function to populate the "Sent Emails" section
    function populateSentEmails() {
        const sentEmailsContainer = document.getElementById("sentEmails");
        sentEmailsData.forEach((email) => {
            const patientCard = createPatientCard(email.patientName, email.emailDate, email.template);
            patientCard.addEventListener("click", () => {
                showEmailContent(email);
            });
            sentEmailsContainer.appendChild(patientCard);
        });
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
        card.innerHTML += `<p>Patient: ${patientName}</p><p>Email Date: ${emailDate}</p>`;
        card.innerHTML += `<p>Tempate: ${template}</p>`;
        return card;
    }

    // Function to show email content in an overlay
    function showEmailContent(email) {
        const emailContentOverlay = document.getElementById("emailContentOverlay");
        const emailContent = document.getElementById("emailContent");
        contentCard = createEmailContentCard(email.patientName, email.emailDate, email.emailContent, email.template);
        emailContent.appendChild(contentCard);
        emailContentOverlay.style.display = "flex";
    }

    // Function to create email content card
    function createEmailContentCard(patientName, emailDate, emailContent, template) {
        const card = document.createElement("div");
        card.classList.add("emailContentCard");
        card.innerHTML = `<p>Patient: ${patientName}</p><p>Email Date: ${emailDate}</p>`;
        card.innerHTML += `<p>${emailContent}</p>`
        return card;
    }

    // Function to create a patient card
    function createTemplateCard(templateName, content) {
        const card = document.createElement("div");
        const truncatedContent = content.substring(0,100);
        card.classList.add("template-card");
        card.innerHTML = `<p>${templateName}</p>`;
        card.innerHTML += `<p>${truncatedContent} ...</p>`;
        return card;
    }

    // Function to show email content in an overlay
    function showTemplateContent(template) {
        const templateContentOverlay = document.getElementById("templateContentOverlay");
        const templateContent = document.getElementById("templateContent");
        const card = document.createElement("div");
        card.classList.add("template-content");
        card.innerHTML = `<p>${template.group} template</p>`;
        card.innerHTML += `<p>${template.content}</p>`
        templateContent.appendChild(card);
        templateContentOverlay.style.display = "flex";
    }

    // Close email content overlay when clicking outside of the content
    const emailContentOverlay = document.getElementById("emailContentOverlay");
    emailContentOverlay.addEventListener("click", (event) => {
        if (event.target === emailContentOverlay) {
            emailContentOverlay.style.display = "none";
            const emailContent = document.getElementById("emailContent");
            emailContent.innerHTML = '';
        }
    });

    // Close template content overlay when clicking outside of the content
    const templateContentOverlay = document.getElementById("templateContentOverlay");
    templateContentOverlay.addEventListener("click", (event) => {
        if (event.target === templateContentOverlay) {
            templateContentOverlay.style.display = "none";
        }
    });

    // Event listener for the "Create Template" button
    document.getElementById("createTemplate").addEventListener("click", createTemplate);

    populateEmailTemplate();
    // Populate the "Sent Emails" and "Scheduled Emails" sections
    populateSentEmails();
    populateScheduledEmails();
});
