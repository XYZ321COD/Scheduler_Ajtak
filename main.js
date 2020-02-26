let Classrooms = [];
let draggedItem = null;


function appendSubject(json) {
    json.forEach(obj => {
        document.getElementById('subjects').innerHTML += '<div class="subject" draggable="true" >' + obj.subject + '</div>';
    });
}


function appendTimeBoxes() {
    config.hoursTable.forEach(hour => {
        document.getElementById('time').innerHTML += '<div class="list-item2" >' + hour + '</div>';
        document.getElementById('time2').innerHTML += '<div class="list-item2" >' + hour + '</div>';
    });
}

function appendDays() {
    config.SchedulersNr.forEach(numberOfScheduler => {
        config.Days.forEach(day => {
            config.ColumnsPerDay.forEach(columnNr => {
                let currentList = 'column ' + day + numberOfScheduler + ' ' + columnNr;
                document.getElementById(day + numberOfScheduler).innerHTML += '<div class="list" id="' + currentList + '" ></div>';
            });
        });
    });
}


function appendSubjectBoxes() {
    config.SchedulersNr.forEach(numberOfScheduler => {
        config.Days.forEach(day => {
            config.ColumnsPerDay.forEach(columnNr => {
                let currentList = 'column ' + day + numberOfScheduler + ' ' + columnNr;
                config.hoursTable.forEach(hours => {
                    document.getElementById(currentList).innerHTML += '<div class="list-item" ></div>';
                });
            });
        });
    });
}

function appendData(json) {
    Classrooms = json.filter(obj => {
        return !Classrooms.includes(obj)
    });
    Classrooms.sort(function (a, b) {
        return a.numberOfSeats - b.numberOfSeats;
    });
}


function minimalClassroom(numberOfSeats) {
    let potentialRooms = Classrooms.filter(obj => {
        return (obj.numberOfSeats > numberOfSeats)
    });
    if (potentialRooms.length === 0) {
        throw "Not enough Space";
    }
    return potentialRooms[0];
}


// Functionality for time-box
function timeboxfunctioanlity() {
    const list_items = document.querySelectorAll('.list-item');

    list_items.forEach(list => {
        list.addEventListener('dragover', function (e) {
            e.preventDefault();
        });

        list.addEventListener('dragenter', function () {
            if (this.dropped) {
                // if there is subject already enter do nothing
            } else {
                this.lastcolor = this.style.backgroundColor;
                this.style.backgroundColor = 'rgba(150, 231, 220, 0.5)';
            }
        });

        list.addEventListener('dragleave', function () {
            if (this.dropped) {
                // don't change color
            } else {
                this.style.backgroundColor = this.lastcolor;
            }
        });

        list.addEventListener('drop', function () {
            console.log('drop');
            this.innerHTML = draggedItem.innerHTML;
            draggedItem.style.display = 'none';
            this.style.backgroundColor = 'rgba(237, 199, 183,1 )';
            this.dropped = true
        });

        list.addEventListener('click', function () {
            if (this.dropped && !this.clicked) {
                let actualElement;
                let numberOfSeats = window.prompt("Podaj liczbe miejsc");

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
    });
}


window.onload = function () {
    appendData(classRoomsData);
    appendSubject(subjectsData);
    appendTimeBoxes();
    appendDays();
    appendSubjectBoxes();
    timeboxfunctioanlity();
    loadSubjects();
};

