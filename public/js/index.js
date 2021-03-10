function showFaculty() {
    let option = document.getElementById('role').value;
    if (option == 'Administrator' || option == 'Manager') {
        document.getElementById('faculty').style.display = "none";
    }
    else {
        document.getElementById('faculty').style.display = "table-row";
    }
}