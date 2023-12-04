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

    // Create options for the filter type dropdown
    const sentOption = document.createElement('option');
    sentOption.value = 'sent';
    sentOption.textContent = 'Sent Emails';

    const queueOption = document.createElement('option');
    queueOption.value = 'queue';
    queueOption.textContent = 'Emails in Queue';

    // Append options to the filter type dropdown
    filterTypeDropdown.appendChild(sentOption);
    filterTypeDropdown.appendChild(queueOption);

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

    // Create the apply filter button
    const applyFilterBtn = document.createElement('button');
    applyFilterBtn.id = 'applyFilterBtn';
    applyFilterBtn.textContent = 'Apply Filter';

    // Append all elements to the modal content
    modalContent.appendChild(closeModalBtn);
    modalContent.appendChild(modalHeading);
    modalContent.appendChild(filterTypeLabel);
    modalContent.appendChild(filterTypeDropdown);
    modalContent.appendChild(sortOrderLabel);
    modalContent.appendChild(sortOrderDropdown);
    modalContent.appendChild(applyFilterBtn);

    return modalContent;
}

