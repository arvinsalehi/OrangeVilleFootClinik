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
    filterTypeLabel.htmlFor = 'filterType';
    filterTypeLabel.textContent = 'Filter Type:';

    // Create the filter type dropdown
    const filterTypeDropdown = document.createElement('select');
    filterTypeDropdown.id = 'filterType';

    // Create the filter type radio inputs
    const sentRadio = createRadioInput('filterType', 'sent', 'Sent Emails');
    const queueRadio = createRadioInput('filterType', 'queue', 'Emails in Queue');

    // Append radio inputs to the filter type label
    filterTypeDropdown.appendChild(sentRadio[0]);
    filterTypeDropdown.appendChild(sentRadio[1]);
    filterTypeDropdown.appendChild(queueRadio[0]);
    filterTypeDropdown.appendChild(queueRadio[1]);


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
function createRadioInput(name, value, label) {
    const radioInput = document.createElement('input');
    radioInput.type = 'radio';
    radioInput.name = name;
    radioInput.value = value;
    radioInput.id = `${name}-${value}`;

    const radioLabel = document.createElement('label');
    radioLabel.htmlFor = radioInput.id;
    radioLabel.textContent = label;

    return [radioInput, radioLabel];
}
