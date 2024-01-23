import {
    closeOverlay,
} from './widgetToolBox/closeOverLay.js';

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

    // dropdown functionality
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
    //
    // closeOverlay(document.getElementById("templateContentOverlay"), document.getElementById("templateContent"), {
    //     closeParent: true,
    //     emptyElement: true
    // });

    const dropDownOverlay = document.getElementById('dropdownOverlay');
    dropDownOverlay == null ? {} : closeOverlay(dropDownOverlay, document.getElementById("dropdown-content"), {
        closeParent: true,
    });

});
