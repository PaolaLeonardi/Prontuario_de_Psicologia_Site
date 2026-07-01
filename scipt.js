const patientForm = document.getElementById('patient-form');
const anamnesisForm = document.getElementById('anamnesis-form');
const patientTableBody = document.getElementById('patient-table-body');
const anamnesisTableBody = document.getElementById('anamnesis-table-body');
const summaryPatients = document.getElementById('summary-patients');
const summaryAnamneses = document.getElementById('summary-anamneses');

const STORAGE_PATIENTS = 'prontuario_pacientes';
const STORAGE_ANAMNESES = 'prontuario_anamneses';

function getStoredData(key) {
    return JSON.parse(localStorage.getItem(key) || '[]');
}

function saveStoredData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function renderPatients() {
    const patients = getStoredData(STORAGE_PATIENTS);
    summaryPatients.textContent = patients.length;
    patientTableBody.innerHTML = '';

    if (!patients.length) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="5">Nenhum paciente registrado ainda.</td>';
        patientTableBody.appendChild(row);
        return;
    }

    patients.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.clinic}</td>
            <td>${item.mode}</td>
            <td>${item.specialty}</td>
            <td>${item.fileName || 'Nenhum'}</td>
        `;
        patientTableBody.appendChild(row);
    });
}

function renderAnamneses() {
    const anamneses = getStoredData(STORAGE_ANAMNESES);
    summaryAnamneses.textContent = anamneses.length;
    anamnesisTableBody.innerHTML = '';

    if (!anamneses.length) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="3">Nenhuma anamnese cadastrada ainda.</td>';
        anamnesisTableBody.appendChild(row);
        return;
    }

    anamneses.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.date}</td>
            <td>${item.notes}</td>
        `;
        anamnesisTableBody.appendChild(row);
    });
}

function resetForm(form) {
    form.reset();
}

patientForm.addEventListener('submit', event => {
    event.preventDefault();

    const patientData = {
        name: document.getElementById('patient-name').value.trim(),
        birth: document.getElementById('patient-birth').value,
        clinic: document.getElementById('patient-clinic').value.trim(),
        mode: document.getElementById('patient-mode').value,
        specialty: document.getElementById('patient-specialty').value.trim(),
        notes: document.getElementById('patient-notes').value.trim(),
        fileName: document.getElementById('patient-file').files[0]?.name || ''
    };

    const patients = getStoredData(STORAGE_PATIENTS);
    patients.unshift(patientData);
    saveStoredData(STORAGE_PATIENTS, patients);
    renderPatients();
    resetForm(patientForm);
});

anamnesisForm.addEventListener('submit', event => {
    event.preventDefault();

    const anamneseData = {
        name: document.getElementById('anamnese-name').value.trim(),
        date: document.getElementById('anamnese-date').value,
        notes: document.getElementById('anamnese-notes').value.trim()
    };

    const anamneses = getStoredData(STORAGE_ANAMNESES);
    anamneses.unshift(anamneseData);
    saveStoredData(STORAGE_ANAMNESES, anamneses);
    renderAnamneses();
    resetForm(anamnesisForm);
});

window.addEventListener('DOMContentLoaded', () => {
    renderPatients();
    renderAnamneses();
});
