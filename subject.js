/**
 * Loads data from Subjects.js, and adds event to every subject-box.
 */
function loadSubjects() {

    const subject_items = document.querySelectorAll('.subject');
    subject_items.forEach(item => {
        item.addEventListener('dragstart', function () {
            /**
             * @var draggedItem
             * @description One of the subject-boxes that we are currently dragging.
             * @type {Object}
             */
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
