document.addEventListener('DOMContentLoaded', () => {

  let subjects = [];

  const subjectNameInput = document.getElementById('subject-name');
  const subjectUnitsInput = document.getElementById('subject-units');
  const subjectGradeInput = document.getElementById('subject-grade');
  const addSubjectBtn = document.getElementById('add-subject-btn');
  const subjectListTable = document.getElementById('subject-list');

  function convertGradeToGpaPoint(percentage) {
    if (percentage >= 95) return 4.0;
    if (percentage >= 90) return 3.5;
    if (percentage >= 85) return 3.0;
    if (percentage >= 80) return 2.5;
    if (percentage >= 75) return 2.0;
    return 1.0;
  }

  addSubjectBtn.addEventListener('click', () => {
    const name = subjectNameInput.value.trim();
    const units = parseFloat(subjectUnitsInput.value);
    const score = parseFloat(subjectGradeInput.value);

    if (name !== '' && !isNaN(units) && !isNaN(score) && units > 0 && score >= 0 && score <= 100) {
      const gpaPoint = convertGradeToGpaPoint(score);

      subjects.push({ name, units, score, gpaPoint });

      subjectNameInput.value = '';
      subjectUnitsInput.value = '';
      subjectGradeInput.value = '';

      renderTable();
    } else {
      alert('Please fill out all fields correctly (Units: 1-5, Score: 0-100)!');
    }
  });

  function renderTable() {
    subjectListTable.innerHTML = '';

    if (subjects.length === 0) {
      subjectListTable.innerHTML = '<tr><td colspan="4" style="text-align:center;">No subjects added yet.</td></tr>';
      return;
    }

    subjects.forEach(sub => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${sub.name}</strong></td>
        <td>${sub.units}</td>
        <td>${sub.score}%</td>
        <td>${sub.gpaPoint.toFixed(1)}</td>
      `;
      subjectListTable.appendChild(tr);
    });
  }

  renderTable();

});
