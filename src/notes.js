import uuidv4 from 'uuid/v4';
import moment from 'moment';

let notes = [];

const loadNotes = () => {
    const notesJSON = JSON.parse(localStorage.getItem('notes'));
    try {
        return notesJSON ? notesJSON : []
    } catch (e) {
        return []
    }
};

const saveNote = () => {
    localStorage.setItem('notes', JSON.stringify(notes));
};

const removeNote = (id) => {
    const noteIndex = notes.findIndex(note => note.id === id);

    if (noteIndex > -1){
        notes.splice(noteIndex, 1);
        saveNote();
    }
};

const getNotes = () => notes;

const createNote = () => {
    const id = uuidv4();
    const timestamp = moment().valueOf();
    notes.push({
        id: id,
        title: '',
        body: '',
        createdAt: timestamp,
        updatedAt: timestamp
    });
    saveNote();

    return id;
};

const updateNotes = (id, update) => {
    const note = notes.find((note) => note.id === id);

    if(!note){
        return
    }

    if (typeof update.title === 'string'){
        note.title = update.title;
        note.updatedAt = moment().valueOf();
    }

    if (typeof update.body === 'string'){
        note.body = update.body;
        note.updatedAt = moment().valueOf();
    }

    saveNote();
    return note;
};

notes = loadNotes();

export { getNotes, createNote, removeNote, updateNotes }