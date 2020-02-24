const subject_items = document.querySelectorAll('.subject');
//Functionality for draggable subjects

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