import moment from 'moment';
import {getNotes} from "./notes";
import {getFilters} from "./filters";

const generateNoteDOM = (note) => {
    const noteEl = document.createElement('a');
    const textEl = document.createElement('span');
    const bodyEl = document.createElement('p');
    const createdAt = document.createElement('span');
    const statusEl = document.createElement('span');
    if (note.title.length > 0) {
        textEl.textContent = note.title;
    } else {
        textEl.textContent = 'Untitled Note';
    }
    if (note.body.length > 0) {
        bodyEl.textContent = note.body;
    } else {
        bodyEl.textContent = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.';
    }

    textEl.classList.add('textEl');
    bodyEl.classList.add('bodyEl');

    noteEl.appendChild(textEl);
    noteEl.appendChild(bodyEl);

    // Setup the link
    noteEl.setAttribute('href', `/edit.html#${note.id}`);
    noteEl.classList.add('noteEl');

    statusEl.textContent = generateLastEdited(note.updatedAt);
    statusEl.classList.add('note-date');
    noteEl.appendChild(statusEl);

    createdAt.textContent = createdTime(note.createdAt);
    createdAt.classList.add('note-date');
    createdAt.classList.add('float-right');
    noteEl.appendChild(createdAt);

    return noteEl;
};

const renderNotes =  () => {
    const notes = getNotes();
    const filters = getFilters();
    const notesEl = document.querySelector('#notes');
    const filteredNotes = notes.filter(function (note) {
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
    });

    document.querySelector('#notes').innerHTML = '';

    const notesCountDom = document.querySelector('#notesCount');
    notesCountDom.textContent = filteredNotes.length;

    if (filteredNotes.length > 0) {
        filteredNotes.forEach(function (note) {
            const noteEl = generateNoteDOM(note);
            notesEl.appendChild(noteEl);
        });
    } else {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'No Notes to Show';
        emptyMessage.classList.add('empty-message');
        notesEl.appendChild(emptyMessage);
    }
};

const initializeEditPage = (noteId) => {
    const titleElement = document.querySelector('#noteTitle');
    const bodyElement = document.querySelector('#noteBody');
    const dateElement = document.querySelector('#last-edited');

    const notes = getNotes();
    const note = notes.find((note) => note.id === noteId);

    if (!note) {
        location.assign('/index.html')
    }

    titleElement.value = note.title;
    bodyElement.value = note.body;
    dateElement.textContent = generateLastEdited(note.updatedAt);
};

const generateLastEdited = (timestamp) => {
    return `Last edited ${moment(timestamp).fromNow()}`
};

const createdTime = (timestamp) => {
    return `${moment(timestamp).fromNow()}`
};

export {generateLastEdited, createdTime, generateNoteDOM, renderNotes, initializeEditPage}