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
import {showResponseStatus} from './utilities/ShowResponseStatus.js'


document.addEventListener("DOMContentLoaded", function (e) {

    // toggeling left side for screns  <= 768
    $("#toggleLeftSide").click(function () {
        $(".left-side").toggleClass('show-side-bar');
        $(".navbar").toggleClass("navbar-reposition");
        $(this).find('i').toggleClass('rotate-180');

    });

    // round widget functionallity
    $(".round-widget").click(function () {
        $(".dropdown-content").css('display', 'flex');
        $("#dropdownOverlay").css({
            "display": "block",
        })

    });
    //
    // // initialize scrolls
    // $('section.btn-scroll-widget').each(function () {
    //     initScrolls(this);
    // });

    // initialize sent emails
    // initSentEmails(document);

    // initialize templateCard
    // initTemplateCard(document);

    // initialize filter button
    // initFilterBtn(document);

    // dropdown duncitonallity
    document.querySelectorAll('.dropdown-nav').forEach(function (element) {

        element.addEventListener('click', function (e) {

            let nextEl = element.nextElementSibling;
            let parentEl = element.parentElement;

            if (nextEl) {
                e.preventDefault();
                let mycollapse = new bootstrap.Collapse(nextEl);

                if (nextEl.classList.contains('show')) {
                    mycollapse.hide();
                } else {
                    mycollapse.show();
                    // find other submenus with class=show
                    let opened_submenu = parentEl.parentElement.querySelector('.submenu.show');
                    // if it exists, then close all of them
                    if (opened_submenu) {
                        new bootstrap.Collapse(opened_submenu);
                    }
                }
            }
        }); // addEventListener
    }) // forEach

    // initialize overlay close functions
    // closeOverlay(document.getElementById("emailContentOverlay"), document.getElementById("emailContent"), {
    //     closeParent: true,
    //     emptyElement: true
    // });

    // closeOverlay(document.getElementById("templateContentOverlay"), document.getElementById("templateContent"), {
    //     closeParent: true,
    //     emptyElement: true
    // });

    // closeOverlay(document.getElementById("NewTemplateContentOverlay"), null, {closeParent: true, emptyElement: true});

    document.getElementById("filterContentOverlay") != null ? closeOverlay(document.getElementById("filterContentOverlay"), document.getElementById("filterModalContent"), {
        closeParent: true,
        emptyElement: true
    }) : {};

    document.getElementById('dropdownOverlay') != null ? closeOverlay(document.getElementById('dropdownOverlay'), document.getElementById("dropdown-content"), {
        closeParent: true,
    }) : {};
    // initialize show more button
    $('.show-more').on('click', function () {
        const urls = [
            '#',
            'http://127.0.0.1:5001/emailService/Sent-Emails',
            'http://127.0.0.1:5001/emailService/Scheduled-Emails'
            // Add more URLs as needed
        ];
        const index = $('.show-more').index(this); // Get the index of the clicked button

        // Check if the index is within the range of the URLs array
        if (index >= 0 && index < urls.length) {
            showMore(this, urls[index]);
        } else {
            console.error('Invalid index or URL not defined for the clicked button.');
        }
        showMore(this);


    });

    // initialize search input and its functionality
    const searchInput = document.getElementById('search-input');
    searchInput == null ? {} : searchInput.addEventListener('keyup', function () {
        const searchTerm = searchInput.value.toLowerCase();
        filterPatientCards(document, searchTerm);
    });

    // form function
    document.getElementById('emailForm') == null ? {} : document.getElementById('emailForm').addEventListener('submit', function (event) {
        event.preventDefault();
        submitForm(document);
        document.getElementById('emailForm').reset();
    });
});
