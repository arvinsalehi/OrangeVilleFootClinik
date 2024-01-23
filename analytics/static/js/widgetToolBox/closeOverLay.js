export function closeOverlay(parent, element, {closeParent = false, emptyElement = false} = {}) {
    parent.addEventListener("click", (event) => {
        if (event.target === parent) {
            if (parent.classList.contains('EditMode')) {
                const userResponse = confirm("Do you want to proceed?");
                if (userResponse) {
                    closeParent === true ? parent.style.display = "none" : {};
                    emptyElement === true ? element.innerHTML = '' : element.style.display = 'none';
                    parent.classList.remove("EditMode");
                }
            } else {
                closeParent === true ? parent.style.display = "none" : {};
                emptyElement === true ? element.innerHTML = '' : element.style.display = 'none';
            }
        }
    });
}
