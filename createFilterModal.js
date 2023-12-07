let QUERY = [];

export function createFilterModal(modalContent) {
    // Create the close button
    const closeModalBtn = document.createElement('span');
    closeModalBtn.className = 'close';
    closeModalBtn.id = 'closeModalBtn';
    closeModalBtn.innerHTML = '&times;';

    // Create the heading
    const modalHeading = document.createElement('h2');
    modalHeading.textContent = 'Email Filters';


    // Create the filter type label
    const filterTypeLabel = document.createElement('label');
    filterTypeLabel.textContent = 'Filter Type:';


    // Create a hidden select element
    const filterTypeDropdownWidgets = createDropDown();
    const filterTypeDropdown = filterTypeDropdownWidgets[0];
    const listContainer = filterTypeDropdownWidgets[1];
    // Add a global click event listener to hide the dropdown list when clicking outside
    filterTypeDropdown.addEventListener("click", function (event) {
        if (!filterTypeDropdown.contains(event.target)) {
            listContainer.style.display = "none";
        }
    });

    // Create the sort order label
    const sortOrderLabel = document.createElement('label');
    sortOrderLabel.htmlFor = 'sortOrder';
    sortOrderLabel.textContent = 'Sort Order:';

    // Create the sort order dropdown
    const sortOrderDropdown = document.createElement('select');
    sortOrderDropdown.id = 'sortOrder';

    // Create options for the sort order dropdown
    const ascOption = document.createElement('option');
    ascOption.value = 'asc';
    ascOption.textContent = 'Ascending';

    const descOption = document.createElement('option');
    descOption.value = 'desc';
    descOption.textContent = 'Descending';

    // Append options to the sort order dropdown
    sortOrderDropdown.appendChild(ascOption);
    sortOrderDropdown.appendChild(descOption);

    // Create the start date label
    const startDateLabel = document.createElement('label');
    startDateLabel.htmlFor = 'startDate';
    startDateLabel.textContent = 'Start Date:';

    // Create the start date input
    const startDateInput = document.createElement('input');
    startDateInput.type = 'date';
    startDateInput.id = 'startDate';

    // Create the end date label
    const endDateLabel = document.createElement('label');
    endDateLabel.htmlFor = 'endDate';
    endDateLabel.textContent = 'End Date:';

    // Create the end date input
    const endDateInput = document.createElement('input');
    endDateInput.type = 'date';
    endDateInput.id = 'endDate';

    // Create the apply filter button
    const applyFilterBtn = document.createElement('button');
    applyFilterBtn.id = 'applyFilterBtn';
    applyFilterBtn.textContent = 'Apply Filter';

    modalContent.id = 'filterModalContent';

    // Add a click event listener to the close button
    closeModalBtn.addEventListener('click', () => {
        // Hide or remove the parent widget
        modalContent.parentElement.style.display = 'none'; // You can use 'block' to show it again
        // Alternatively, you can remove it from the DOM: modalContainer.remove();
        modalContent.innerHTML = "";
    });
    // Append all elements to the modal content
    modalContent.appendChild(closeModalBtn);
    modalContent.appendChild(modalHeading);
    modalContent.appendChild(filterTypeLabel);
    modalContent.appendChild(filterTypeDropdown);
    modalContent.appendChild(sortOrderLabel);
    modalContent.appendChild(sortOrderDropdown);
    modalContent.appendChild(startDateLabel);
    modalContent.appendChild(startDateInput);
    modalContent.appendChild(endDateLabel);
    modalContent.appendChild(endDateInput);
    modalContent.appendChild(applyFilterBtn);

    return modalContent;
}

// Function to create radio input
function createDropDown() {
// Create the main container
    const dropdownContainer = document.createElement("div");
    dropdownContainer.classList.add("custom-dropdown");

    // Create the input element
    const inputElement = document.createElement("input");
    inputElement.type = "text";
    inputElement.classList.add("custom-dropdown-input");
    inputElement.placeholder = "Select options";
    inputElement.readOnly = true;

    // Create the dropdown list container
    const listContainer = document.createElement("div");
    listContainer.classList.add("custom-dropdown-list");

    // Create individual dropdown items
    const optionValues = ["Emails Sent", "Emails In Queue", "Email Templates", "ALL"];
    optionValues.forEach(function (value, index) {

        const item = document.createElement("div");
        item.classList.add("custom-dropdown-item");
        item.id = `${value.replace(/\s/g, '')}`;
        item.value = value;
        item.innerHTML = value;

        item.addEventListener('click', (e) => {
            const thisElement = e.target;

            if (thisElement.classList.contains('checked')) {
                const iconElement = thisElement.querySelector('i');
                thisElement.removeChild(iconElement);
                QUERY = QUERY.filter(item => item !== thisElement.id);

            } else {

                // Create the <i> element
                const iconElement = document.createElement("i");
                iconElement.className = "fa-solid fa-circle-check fa-xl";
                iconElement.style.color = "#00a34f";
                QUERY.push(thisElement.id);
                thisElement.appendChild(iconElement);
            }
            thisElement.classList.toggle('checked');
        })
        listContainer.appendChild(item);
    });

    // Append elements to the main container
    dropdownContainer.appendChild(inputElement);
    dropdownContainer.appendChild(listContainer);

    // Append the main container to the document body
    document.body.appendChild(dropdownContainer);

    // Add click event listener to toggle the visibility of the dropdown list
    inputElement.addEventListener("click", function () {
        listContainer.style.display = listContainer.style.display === "block" ? "none" : "block";
    });

    return [dropdownContainer, listContainer];
}
