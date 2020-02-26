
function loadSubjects() {

    const subject_items = document.querySelectorAll('.subject');
    //Functionality for draggable subjects
    subject_items.forEach(item => {
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
        });
    });
}
