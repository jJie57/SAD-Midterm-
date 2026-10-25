document.addEventListener('DOMContentLoaded', () => {

  let subjects = [];

  const subjectNameInput = document.getElementById('subject-name');
  const subjectUnitsInput = document.getElementById('subject-units');
  const subjectGradeInput = document.getElementById('subject-grade');
  const addSubjectBtn = document.getElementById('add-subject-btn');
  const subjectListTable = document.getElementById('subject-list');

  // Lahat ng elements para sa Academic Summary at Controls
  const totalUnitsEl = document.getElementById('total-units');
  const computedGpaEl = document.getElementById('computed-gpa');
  const academicStatusEl = document.getElementById('academic-status');
  const clearAllBtn = document.getElementById('clear-all-btn');

  function convertGradeToGpaPoint(percentage) {
    if (percentage >= 95) return 4.0;
    if (percentage >= 90) return 3.5;
    if (percentage >= 85) return 3.0;
    if (percentage >= 80) return 2.5;
    if (percentage >= 75) return 2.0;
    return 1.0;
  }

  // Event listener para sa pag-add ng subject
  if (addSubjectBtn) {
    addSubjectBtn.addEventListener('click', () => {
      const name = subjectNameInput.value.trim();
      const units = parseFloat(subjectUnitsInput.value);
      const score = parseFloat(subjectGradeInput.value);

      if (name !== '' && !isNaN(units) && !isNaN(score) && units > 0 && score >= 0 && score <= 100) {
        const gpaPoint = convertGradeToGpaPoint(score);

        subjects.push({ name, units, score, gpaPoint });

        // Linisin ang mga input fields pagkatapos i-add
        subjectNameInput.value = '';
        subjectUnitsInput.value = '';
        subjectGradeInput.value = '';

        renderTable();
        updateSummary();
      } else {
        alert('Please fill out all fields correctly (Units > 0, Score: 0-100)!');
      }
    });
  }

  // Function para i-render ang listahan ng subjects sa table
  function renderTable() {
    if (!subjectListTable) return;
    subjectListTable.innerHTML = '';

    if (subjects.length === 0) {
      subjectListTable.innerHTML = '<tr><td colspan="4" style="text-align:center;">No subjects added yet.</td></tr>';
      return;
    }

    subjects.forEach((sub, index) => {
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

  // Function para i-compute ang Total Units at Computed GPA
  function updateSummary() {
    let totalUnits = 0;
    let totalGradePoints = 0;

    subjects.forEach(sub => {
      totalUnits += sub.units;
      totalGradePoints += sub.gpaPoint * sub.units;
    });

    const computedGpa = totalUnits > 0 ? (totalGradePoints / totalUnits) : 0;

    // Ligtas na pag-update ng HTML text contents
    if (totalUnitsEl) totalUnitsEl.textContent = totalUnits;
    if (computedGpaEl) computedGpaEl.textContent = computedGpa.toFixed(2);
    
    if (academicStatusEl) {
      if (subjects.length === 0) {
        academicStatusEl.textContent = 'No Data';
      } else if (computedGpa >= 3.0) {
        academicStatusEl.textContent = 'Dean\'s Lister / Passed';
      } else {
        academicStatusEl.textContent = 'Regular / Passed';
      }
    }
  }

  // Function para sa Clear All button (kung sakaling meron sa HTML ninyo)
  if (clearAllBtn) {
    clearAllBtn.addEventListener('click', () => {
      subjects = [];
      renderTable();
      updateSummary();
    });
  }

  // Paunang tawag para mag-load ang malinis na estado
  renderTable();
  updateSummary();

});
