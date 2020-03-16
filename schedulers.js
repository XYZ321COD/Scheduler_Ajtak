/**
 * Hide scheduler1 and occur scheduler2.
 */

function showscheduler1(){
    document.getElementById("tableName").innerHTML = "Year-1";
    document.getElementById("scheduler1").style.display = 'flex';
    document.getElementById("scheduler2").style.display = 'none';
}

/**
 *  Hide scheduler2 and occur scheduler1.
 */
function showscheduler2(){
    document.getElementById("tableName").innerHTML = "Year-2";
    document.getElementById("scheduler1").style.display = 'none';
    document.getElementById("scheduler2").style.display = 'flex';
}

/**
 * Depends on state of switch, shows scheduler1 or scheduler2.
 */
document.addEventListener('DOMContentLoaded', function () {
    /**
     * @var checkbox
     * @description Variable representing switcher visible on our web-page
     * @type {Object}
     */
    let checkbox = document.querySelector('input[type="checkbox"]');  // This part grabs the html object/entity that I highlighted
    
    /// And right now we are adding function that will be called depend on state of CheckBox
    checkbox.addEventListener('change', function () {
        // if checkbox is checked show, sheduler1 and hide scheduler2 and also show "Year-1" headline
        if (checkbox.checked) {
            showscheduler1()
        }
        // if checkbox is not checked, show sheduler2 and hide scheduler1 and also show "Year-2" headline
         else {
            showscheduler2()
        }
    });
});
