import {submitForm} from './utilities/FormUtil.js';
import {
    initScrolls,
    initSentEmails,
    initTemplateCard,
    initFilterBtn,
    closeOverlay,
    showMore,
    filterPatientCards
} from './widgetCreator/widgetInit.js';

document.addEventListener("DOMContentLoaded", function (e) {

    // initialize scrolls
    $('section.btn-scroll-widget').each(function () {
        initScrolls(this);
    });

    // initialize sent emails
    initSentEmails(document);

    // initialize filter button
    initFilterBtn(document);


    // initialize overlay close functions
    closeOverlay(document.getElementById("emailContentOverlay"), document.getElementById("emailContent"));
    closeOverlay(document.getElementById("filterContentOverlay"), document.getElementById("filterModalContent"));

    // initialize search input and its functionality
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('keyup', function () {
        const searchTerm = searchInput.value.toLowerCase();
        filterPatientCards(document, searchTerm);
    });

});
