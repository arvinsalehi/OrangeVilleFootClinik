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

    // initialize templateCard
    initTemplateCard(document);

    // initialize filter button
    initFilterBtn(document);


    // initialize overlay close functions
    closeOverlay(document.getElementById("emailContentOverlay"), document.getElementById("emailContent"));
    closeOverlay(document.getElementById("templateContentOverlay"), document.getElementById("templateContent"));
    closeOverlay(document.getElementById("NewTemplateContentOverlay"), null);
    closeOverlay(document.getElementById("filterContentOverlay"), document.getElementById("filterModalContent"));

    // initialize show more button
    $('.show-more').on('click', function () {
        showMore(this);
    });

    // initialize search input and its functionality
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('keyup', function () {
        const searchTerm = searchInput.value.toLowerCase();
        filterPatientCards(document, searchTerm);
    });

    // form function
    document.getElementById('emailForm').addEventListener('submit', function (event) {
        event.preventDefault();
        submitForm(document);
        document.getElementById('emailForm').reset();
    });
});
