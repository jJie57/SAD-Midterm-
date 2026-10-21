document.addEventListener('DOMContentLoaded', () => {

  let subjects = [];

  // MEMBER 1 DOM ELEMENTS
  const subjectNameInput = document.getElementById('subject-name');
  const subjectUnitsInput = document.getElementById('subject-units');
  const subjectGradeInput = document.getElementById('subject-grade');
  const addSubjectBtn = document.getElementById('add-subject-btn');

  // MEMBER 2 DOM ELEMENTS
  const subjectListTable = document.getElementById('subject-list');

  // MEMBER 3 DOM ELEMENTS
  const totalUnitsDisplay = document.getElementById('total-units');
  const computedGpaDisplay = document.getElementById('computed-gpa');
  const academicStatusDisplay = document.getElementById('academic-status');
  const clearAllBtn = document.getElementById('clear-all-btn');

  // Exact Grading System Conversion based on your image
  function getEquivalentGrade(totalGrade) {
    if (totalGrade >= 97) return 1.0;
    if (totalGrade >= 93) return 1.25;
    if (totalGrade >= 89) return 1.5;
    if (totalGrade >= 85) return 1.75;
    if (totalGrade >= 81) return 2.0;
    if (totalGrade >= 77) return 2.25;
    if (totalGrade >= 73) return 2.5;
    if (totalGrade >= 69) return 2.75;
    if (totalGrade >= 65) return 3.0;
    if (totalGrade >= 50) return 4.0; // Conditional / Remedial
    return 5.0; // Failed
  }

  // MEMBER 1 FEATURE: Add Subject Logic
  addSubjectBtn.addEventListener('click', () => {
    const name = subjectNameInput.value.trim();
    const units = parseFloat(subjectUnitsInput.value);
    const score = parseFloat(subjectGradeInput.value);

    if (name !== '' && !isNaN(units) && !isNaN(score) && units > 0 && score >= 0 && score <= 100) {
      const equivalent = getEquivalentGrade(score);

      const subjectData = {
        name: name,
        units: units,
        score: score,
        equivalent: equivalent
      };

      subjects.push(subjectData);

      // Clear Form Fields
      subjectNameInput.value = '';
      subjectUnitsInput.value = '';
      subjectGradeInput.value = '';

      // Trigger updates
      renderTable();
      calculateGPA();
    } else {
      alert('Please fill out all fields correctly (Units: 1-5, Total Grade: 0-100)!');
    }
  });

  // MEMBER 2 FEATURE: Render Table Rows
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
        <td>${sub.score.toFixed(2)}%</td>
        <td><strong>${sub.equivalent.toFixed(2)}</strong></td>
      `;
      subjectListTable.appendChild(tr);
    });
  }

  // MEMBER 3 FEATURE: GPA Computation & Academic Status Summary
  function calculateGPA() {
    if (subjects.length === 0) {
      totalUnitsDisplay.textContent = '0';
      computedGpaDisplay.textContent = '0.00';
      academicStatusDisplay.textContent = 'No Data';
      academicStatusDisplay.className = 'badge';
      return;
    }

    let totalUnits = 0;
    let totalQualityPoints = 0;

    subjects.forEach(sub => {
      totalUnits += sub.units;
      totalQualityPoints += (sub.equivalent * sub.units);
    });

    const finalGpa = totalQualityPoints / totalUnits;

    totalUnitsDisplay.textContent = totalUnits;
    computedGpaDisplay.textContent = finalGpa.toFixed(2);

    if (finalGpa <= 3.0) {
      academicStatusDisplay.textContent = 'Passed / Good Standing 🎉';
      academicStatusDisplay.className = 'badge passed';
    } else {
      academicStatusDisplay.textContent = 'Failed / Warning ⚠️';
      academicStatusDisplay.className = 'badge failed';
    }
  }

  clearAllBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all subject records?')) {
      subjects = [];
      renderTable();
      calculateGPA();
    }
  });

  // Initial Load
  renderTable();
  calculateGPA();

});
