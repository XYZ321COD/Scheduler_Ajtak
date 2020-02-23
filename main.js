const list_items = document.querySelectorAll('.list-item');
// const lists = document.querySelectorAll('.list');
const subject_items = document.querySelectorAll('.subject');

const scheduler = document.querySelectorAll('.scheduler');
const scheduler2 = document.querySelectorAll('.scheduler2');

let draggedItem = null;

document.addEventListener('DOMContentLoaded', function () {
    let checkbox = document.querySelector('input[type="checkbox"]');

    checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
            // do this
            document.getElementById("tableName").innerHTML = "Year-1"
            document.getElementById("scheduler1").style.display = 'flex';
            document.getElementById("scheduler2").style.display = 'none';
        } else {
            document.getElementById("tableName").innerHTML = "Year-2"
            document.getElementById("scheduler1").style.display = 'none';
            document.getElementById("scheduler2").style.display = 'flex';
        }
    });
});

for (let j = 0; j < list_items.length; j++) {
    const list = list_items[j];

    list.addEventListener('dragover', function (e) {
        e.preventDefault();
    });

    list.addEventListener('dragenter', function (e) {
            if(this.dropped){

            }
            else {
                this.lastcolor = this.style.backgroundColor;
                this.style.backgroundColor = 'rgba(150, 231, 220, 0.5)';
            }
    });

    list.addEventListener('dragleave', function (e) {
            if(this.dropped){

            }
            else {
                this.style.backgroundColor = this.lastcolor;
            }
    });

    list.addEventListener('drop', function (e) {
        console.log('drop');
        this.innerHTML  = draggedItem.innerHTML
        draggedItem.style.display = 'none';
        this.style.backgroundColor = 'rgba(237, 199, 183,1 )';
        this.dropped = true
    });

    list.addEventListener('click',function (e) {
        if(this.dropped) {
            window.alert("You can add something");
        }
    })
}


for (let i = 0; i < subject_items.length; i++) {
    const item = subject_items[i];
    item.addEventListener('dragstart', function () {
        draggedItem = item;
        setTimeout(function () {
            item.style.display = 'none';
        }, 0)
    });

    item.addEventListener('dragend', function () {
        setTimeout(function () {
            draggedItem.style.display = 'flex';
            draggedItem = null;
        }, 0);
    })
}