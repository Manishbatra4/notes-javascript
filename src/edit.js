import { initializeEditPage, generateLastEdited } from "./views";
import { updateNotes, removeNote } from "./notes";

const titleElement = document.querySelector('#noteTitle');
const bodyElement = document.querySelector('#noteBody');
const removeElement = document.querySelector('#remove-note');
const dateElement = document.querySelector('#last-edited');
const noteId = location.hash.substr(1);

initializeEditPage(noteId);


titleElement.addEventListener('input', e => {
   const note = updateNotes(noteId,{
        title: e.target.value
    });
    dateElement.textContent = generateLastEdited(note.updatedAt);
});

bodyElement.addEventListener('input', e => {
    const note = updateNotes(noteId,{
        body: e.target.value
    });
    dateElement.textContent = generateLastEdited(note.updatedAt);
});

removeElement.addEventListener('click', (e) => {
    removeNote(noteId);
    location.assign('/index.html')
});

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        initializeEditPage(noteId);
    }
});