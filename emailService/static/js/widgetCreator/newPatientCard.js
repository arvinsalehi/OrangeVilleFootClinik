export function createPatientCard(patientName, emailDate, template) {
    const card = document.createElement("div");
    const colorCode = document.createElement("div");
    card.classList.add("patient-card");
    colorCode.classList.add("color-code");
    card.appendChild(colorCode);
    card.innerHTML += `<p class="pname">Patient: ${patientName}</p><p>Email Date: ${emailDate}</p>`;
    card.innerHTML += `<p>Tempate: ${template}</p>`;
    return card;
}

