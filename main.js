const list_items = document.querySelectorAll('.list-item');

let  Classrooms = [];
let draggedItem = null;


// Reading data about classrooms
function appendData(json) {
    Classrooms = json.filter(obj => {
        return !Classrooms.includes(obj)});
    Classrooms.sort(function(a,b){ return a.numberOfSeats - b.numberOfSeats});
}

function minimalClassroom(numberOfSeats){
    for (i = 0; i< Classrooms.length;i++){
        if(Classrooms[i].numberOfSeats > numberOfSeats){
            return Classrooms[i];
        }
    }
    throw "Not enough Space"
}


 // Functionality for time-box
for (let j = 0; j < list_items.length; j++) {
    const list = list_items[j];

    list.addEventListener('dragover', function (e) {
        e.preventDefault();
    });

    list.addEventListener('dragenter', function () {
            if(this.dropped){
                //
            }
            else {
                this.lastcolor = this.style.backgroundColor;
                this.style.backgroundColor = 'rgba(150, 231, 220, 0.5)';
            }
    });

    list.addEventListener('dragleave', function () {
            if(this.dropped){
                //
            }
            else {
                this.style.backgroundColor = this.lastcolor;
            }
    });

    list.addEventListener('drop', function () {
        console.log('drop');
        this.innerHTML  = draggedItem.innerHTML;
        draggedItem.style.display = 'none';
        this.style.backgroundColor = 'rgba(237, 199, 183,1 )';
        this.dropped = true
    });

    list.addEventListener('click',function () {
        if(this.dropped && !this.clicked) {
            let actualElement;
            let numberOfSeats = window.prompt("Podaj liczbe miejsc");

            try {
                numberOfSeats = parseInt(numberOfSeats);
                if(isNaN(numberOfSeats)){
                    throw "is not a number";
                }
                try {
                    actualElement  = minimalClassroom(numberOfSeats);
                    this.classroom = actualElement.classroom

                }
                catch(err){
                    window.alert(err);
                    this.classroom = "";
                }
            }
            catch(err){
                window.alert("Entered value " + err);
                this.classroom = "";
            }
            if(this.classroom === "") {
                this.clicked = false;
            }
            else {
                this.style.fontSize = '3mm'
                this.innerHTML  = this.innerHTML + ' classroom: ' +  this.classroom;
                this.clicked = true;

            }
        }
    })
}


window.onload = function () {
    appendData(data);
};

