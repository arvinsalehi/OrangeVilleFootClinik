import {showEmailContent, showTemplateContent} from './widgetDisplay.js'
import {createFilterModal} from './widgetCreator.js';


export function initScrolls(section) {
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

export function initSentEmails(document) {
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
            showEmailContent(document, data);
        });
    });
}

export function initTemplateCard(document) {
    const templateCards = document.querySelectorAll('.template-card');
    document.getElementById("createTemplate").addEventListener("click", () => {
        const newTemplateForm = document.getElementById("NewTemplateContentOverlay");
        newTemplateForm.style.display = "flex";
    });
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

            showTemplateContent(document, data);
        });
    });
}

export function initFilterBtn(document) {
    const filterBtn = document.getElementById("filterBtn");
    filterBtn.addEventListener("click", () => {
        const filterContentOverlay = document.getElementById("filterContentOverlay");
        createFilterModal(document, document.getElementById("filterModalContent"));
        filterContentOverlay.style.display = "flex";
    });
}

// Close overlay when clicking outside the content
export function closeOverlay(overlay, content) {
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

export function showMore(document, url) {

    $.get(url, function (data) {
        window.open(url, '_blank');

    });
}

export function filterPatientCards(document, searchTerm) {
    const patientCards = document.querySelectorAll('.patient-card');
    patientCards.forEach(card => {
        const patientName = card.querySelector('.pname').textContent.toLowerCase();
        card.style.display = patientName.includes(searchTerm) ? 'block' : 'none';
    });
}