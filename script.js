// --- ANTONETONATE'S FEATURE: Add Subject & Compute GPA ---
document.getElementById('addBtn').addEventListener('click', function() {
    const name = document.getElementById('subjectName').value;
    const grade = parseFloat(document.getElementById('subjectGrade').value);
    const units = parseFloat(document.getElementById('subjectUnits').value);

    if (!name || isNaN(grade) || isNaN(units)) {
        alert('Punan ang tamang detalye!');
        return;
    }

    const tableBody = document.querySelector('#gradeTable tbody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = '<td>${name}</td><td>${grade}</td><td>${units}</td>';
    tableBody.appendChild(newRow);

    calculateGPA();
});

function calculateGPA() {
    const rows = document.querySelectorAll('#gradeTable tbody tr');
    let totalPoints = 0;
    let totalUnits = 0;

    rows.forEach(row => {
        const grade = parseFloat(row.cells[1].innerText);
        const units = parseFloat(row.cells[2].innerText);
        totalPoints += grade * units;
        totalUnits += units;
    });

    const gpa = totalUnits > 0 ? (totalPoints / totalUnits).toFixed(2) : '0.00';
    document.getElementById('gpaResult').innerText = gpa;
}

// --- KAREN'S FEATURE: Clear All Button Logic ---
document.getElementById('clearBtn')?.addEventListener('click', function() {
    document.querySelector('#gradeTable tbody').innerHTML = '';
    document.getElementById('gpaResult').innerText = '0.00';
});
