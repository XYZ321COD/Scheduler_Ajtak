function showscheduler1(){
    document.getElementById("tableName").innerHTML = "Year-1";
    document.getElementById("scheduler1").style.display = 'flex';
    document.getElementById("scheduler2").style.display = 'none';
}

function showscheduler2(){
    document.getElementById("tableName").innerHTML = "Year-2";
    document.getElementById("scheduler1").style.display = 'none';
    document.getElementById("scheduler2").style.display = 'flex';
}

// Functionality for switch
document.addEventListener('DOMContentLoaded', function () {
    let checkbox = document.querySelector('input[type="checkbox"]');

    checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
            showscheduler1()
        } else {
            showscheduler2()
        }
    });
});
