const numberOfHours = 10;
const ColumnsPerDay = 3;
let Classrooms = [];
let draggedItem = null;
let Days =['Monday','Tuesday','Wednesday','Thursday','Friday'];


function appendSubject(json) {
    json.forEach(obj => {
        document.getElementById('subjects').innerHTML += '<div class="subject" draggable="true" >'+ obj.subject +'</div>';
    });
}


function appendTimeBoxes() {
    for (let i = 8; i < numberOfHours + 8; i++) {
        let currentTime = i + ":00";
        document.getElementById('time').innerHTML += '<div class="list-item2" >'+ currentTime +'</div>';
        document.getElementById('time2').innerHTML += '<div class="list-item2" >'+ currentTime +'</div>';
    }
}

function appendDays() {
    for (let iter=1;iter<3;iter++) {
        for (let j = 0; j < Days.length; j++) {
            for (let i = 0; i < ColumnsPerDay; i++) {
                let currentList = 'column ' + Days[j] + iter + ' ' + i;
                document.getElementById(Days[j] + iter).innerHTML += '<div class="list" id="' + currentList + '" ></div>';
            }
        }
    }
}

function appendSubjectBoxes() {
    for (let iter=1;iter<3;iter++) {
        for (let iter1 = 0; iter1 < Days.length; iter1++) {
            for (let iter2 = 0; iter2 < ColumnsPerDay; iter2++) {
                let currentList = 'column ' + Days[iter1] + iter + ' ' + iter2;
                for (let iter3 = 0; iter3 < numberOfHours; iter3++) {
                    document.getElementById(currentList).innerHTML += '<div class="list-item" ></div>';
                }
            }
        }
    }
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
    for (i = 0; i < Classrooms.length; i++) {
        if (Classrooms[i].numberOfSeats > numberOfSeats) {
            return Classrooms[i];
        }
    }
    throw "Not enough Space"
}


// Functionality for time-box
function timeboxfunctioanlity() {
    const list_items = document.querySelectorAll('.list-item');
    for (let j = 0; j < list_items.length; j++) {
        const list = list_items[j];

        list.addEventListener('dragover', function (e) {
            e.preventDefault();
        });

        list.addEventListener('dragenter', function () {
            if (this.dropped) {
                //
            } else {
                this.lastcolor = this.style.backgroundColor;
                this.style.backgroundColor = 'rgba(150, 231, 220, 0.5)';
            }
        });

        list.addEventListener('dragleave', function () {
            if (this.dropped) {
                //
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
        })
    }
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

