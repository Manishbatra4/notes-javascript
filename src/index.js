import {createNote} from './notes';
import {renderNotes} from './views'
import {setFilters} from "./filters";

renderNotes();

document.querySelector('#search-note').addEventListener('input', function (e) {
    setFilters({
        searchText: e.target.value
    });
    renderNotes();
});

document.querySelector('#createNote').addEventListener('click', function () {
    const id = createNote();
    location.assign(`/edit.html#${id}`)
});

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        renderNotes();
    }
});
