/**
 * @var Classrooms
 * @description Array of ClassRooms.
 * @type {Array}
 */
let Classrooms = [];

/**
 * @var draggedItem
 * @description One of the subject-boxes that we are currently dragging.
 * @type {Object}
 */
let draggedItem = null;

/**
 * @description Reads data from ClassRooms.js and create list of classrooms, and sorts by number of places.
 * @param {Object} json
 * json file that holds all potential classrooms (number of class and number of people that can fit into this class).
 */
function appendData(json) {
    Classrooms = json.filter(obj => {
        return !Classrooms.includes(obj)
    });
    Classrooms.sort(function (a, b) {
        return a.numberOfSeats - b.numberOfSeats;
    });
}

/**
 * Reads data from Subjects.js and create draggable subject-boxes.
 * @param  {Object} json
 * json file that holds all potential subjects(names)
 */

function appendSubjects(json) {
    json.forEach(obj => {
        document.getElementById('tableOfSubjects').innerHTML += '<div class="subject" draggable="true" >' + obj.subject + '</div>';
    });
}

/**
 * Reads data from config.js and create time-boxes. For each year there is separate scheduler.
 */

function appendTimeBoxes() {
    config.hoursTable.forEach(hour => {
        document.getElementById('time').innerHTML += '<div class="list-item2" >' + hour + '</div>';
        document.getElementById('time2').innerHTML += '<div class="list-item2" >' + hour + '</div>';
    });
}

/**
 * Reads data from config.js and create scheduler with accuracy to the day.
 */
function appendDays() {
    config.schedulersNr.forEach(numberOfScheduler => {
        config.days.forEach(day => {
            config.columnsPerDay.forEach(columnNr => {
                let currentList = 'column ' + day + numberOfScheduler + ' ' + columnNr;
                document.getElementById(day + numberOfScheduler).innerHTML += '<div class="list" id="' + currentList + '" ></div>';
            });
        });
    });
}

/**
 * Reads data from config.js and create place-holders for potential subjects.
 */
function appendSubjectBoxes() {
    config.schedulersNr.forEach(numberOfScheduler => {
        config.days.forEach(day => {
            config.columnsPerDay.forEach(columnNr => {
                let currentList = 'column ' + day + numberOfScheduler + ' ' + columnNr;
                config.hoursTable.forEach(hours => {
                    document.getElementById(currentList).innerHTML += '<div class="list-item" ></div>';
                });
            });
        });
    });
}

/**
 * @description return minimal classroom fulfilling request.
 * @param {number} numberOfSeats
 * number representing minimal size of classroom
 * @returns {Object} ClassRoom
 * ClassRoom object
 */
function minimalClassroom(numberOfSeats) {
    let potentialRooms = Classrooms.filter(obj => {
        return (obj.numberOfSeats > numberOfSeats)
    });
    if (potentialRooms.length === 0) {
        throw "Not enough space";
    }
    return potentialRooms[0];
}



function addDragOverEvent(object) {
    object.addEventListener('dragover', function (e) {
        e.preventDefault();
    });
}

/**
 * @description How placeholder object will react to dragging subject object over him.
 * @param {Object} object
 * Object representing placeholder for potential subjects.
 *
 */
function addDragEnterEvent(object) {
    object.addEventListener('dragenter', function () {
        if (this.dropped) {
            /**
             *  if there is subject already enter do nothing
             */
        } else {
            this.lastcolor = this.style.backgroundColor;
            this.style.backgroundColor = 'rgba(150, 231, 220, 0.5)';
        }
    });
}
/**
 * @description How placeholder object will react to ending dragging process of subject object over him.
 * @param {Object} object
 * Object representing placeholder for potential subjects.
 *
 */
function addDragLeaveEvent(object) {
    object.addEventListener('dragleave', function () {
        if (this.dropped) {
            /**
             *  don't change color
             */
        } else {
            this.style.backgroundColor = this.lastcolor;
        }
    });
}

/**
 * @description How placeholder object will react to dropping subject object into him.
 * @param {Object} object
 * Object representing placeholder for potential subjects.
 *
 */
function addDropEvent(object) {
    object.addEventListener('drop', function () {
        if(this.dropped){
            /**
             *  don't change name
             */
        }
        else {
            console.log('drop');
            this.innerHTML = draggedItem.innerHTML;
            draggedItem.style.display = 'none';
            this.style.backgroundColor = 'rgba(237, 199, 183,1 )';
            this.dropped = true
        }
    });
}


/**
 * @description How placeholder object will react to clicking on him.
 * @param {Object} object
 * Object representing placeholder for potential subjects.
 *
 */
function addClickEvent(object) {
    object.addEventListener('click', function () {
        if (this.dropped && !this.clicked) {
            let actualElement;
            let numberOfSeats = window.prompt("Enter number of seats");
            try {
                numberOfSeats = parseInt(numberOfSeats);
                if (isNaN(numberOfSeats)) {
                    throw "is not a number";
                }
                try {
                    actualElement = minimalClassroom(numberOfSeats);
                    this.classroom = actualElement.classroom

                } catch (err) {
                    window.alert(err);
                    this.classroom = "";
                }
            } catch (err) {
                window.alert("Entered value " + err);
                this.classroom = "";
            }
            if (this.classroom === "") {
                this.clicked = false;
            } else {
                this.style.fontSize = '3mm';
                this.innerHTML = this.innerHTML + ' classroom: ' + this.classroom;
                this.clicked = true;

            }
        }
    });
}
/**
 * @description Set all events for placeholders objects.
 *
 */function placeholdersFunctionality() {
    const list_items = document.querySelectorAll('.list-item');
    list_items.forEach(list => {
        addDragOverEvent(list);
        addDragEnterEvent(list);
        addDragLeaveEvent(list);
        addDropEvent(list);
        addClickEvent(list);
    });
}

window.onload = function () {
    appendData(classRoomsData);
    appendSubjects(subjectsData);
    appendTimeBoxes();
    appendDays();
    appendSubjectBoxes();
    placeholdersFunctionality();
    loadSubjects();
};

