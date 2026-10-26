// Added by Karen - Clear All Functionality & Input Validation
function clearAllData() {
    subjects = [];
    const tableBody = document.querySelector("#subjectTable tbody");
    const gpaResult = document.getElementById("gpaResult");
    
    if (tableBody) tableBody.innerHTML = "";
    if (gpaResult) gpaResult.textContent = "0.00";
    
    alert("All data has been cleared.");
}

function validateInput(subjectName, grade, units) {
    if (!subjectName || subjectName.trim() === "") {
        alert("Please enter a valid subject name.");
        return false;
    }
    if (isNaN(grade) || grade < 1.0 || grade > 5.0) {
        alert("Grade must be a valid number between 1.0 and 5.0.");
        return false;
    }
    if (isNaN(units) || units <= 0) {
        alert("Units must be greater than 0.");
        return false;
    }
    return true;
}
