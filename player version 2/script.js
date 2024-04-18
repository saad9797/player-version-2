document.addEventListener('DOMContentLoaded', (event) => {
    const popupBox = document.querySelector(".popup-box");
    const popupTitle = popupBox.querySelector("header p");
    const closeIcon = popupBox.querySelector("header i");
    const titleTag = popupBox.querySelector("input");
    const descTag = popupBox.querySelector("textarea");
    const addBtn = popupBox.querySelector("button");

    const months = ["January", "February", "March", "April", "May", "June", "July",
                    "August", "September", "October", "November", "December"];
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");
    let isUpdate = false, updateId;

    function showNotes() {
        if (!notes) return;
        document.querySelectorAll(".note").forEach(li => li.remove());
        notes.forEach((note, id) => {
            let filterDesc = note.description.replaceAll("\n", '<br/>');
            let liTag = `<li class="note">
                            <div class="details">
                                <p>${note.title}</p>
                                <span>${filterDesc}</span>
                            </div>
                            <div class="bottom-content">
                                <span>${note.date}</span>
                            </div>
                        </li>`;
            document.querySelector(".wrapper").insertAdjacentHTML("beforeend", liTag);
        });
    }
    showNotes();

    function deleteNote(noteId) {
        let confirmDel = confirm("Are you sure you want to delete this note?");
        if (!confirmDel) return;
        notes.splice(noteId, 1);
        localStorage.setItem("notes", JSON.stringify(notes));
        showNotes();
    }

    function updateNote(noteId, title, filterDesc) {
        let description = filterDesc.replaceAll('<br/>', '\r\n');
        updateId = noteId;
        isUpdate = true;
        popupBox.classList.add("show");
        titleTag.value = title;
        descTag.value = description;
        popupTitle.innerText = "Update a Note";
        addBtn.innerText = "Update Note";
    }

    addBtn.addEventListener("click", e => {
        e.preventDefault();
        let title = titleTag.value.trim(),
            description = descTag.value.trim();

        if (title || description) {
            let currentDate = new Date(),
                month = months[currentDate.getMonth()],
                day = currentDate.getDate(),
                year = currentDate.getFullYear();

            let noteInfo = { title, description, date: `${month} ${day}, ${year}` };
            if (!isUpdate) {
                notes.push(noteInfo);
            } else {
                isUpdate = false;
                notes[updateId] = noteInfo;
            }
            localStorage.setItem("notes", JSON.stringify(notes));
            showNotes();
            closeIcon.click();
            titleTag.value = descTag.value = ""; // Clear input fields after saving
        }
    });

    // Event listener for clicking the "Add new note" button
    document.querySelector(".add-box").addEventListener("click", () => {
        popupTitle.innerText = "Add a new Note";
        addBtn.innerText = "Add Note";
        popupBox.classList.add("show");
        document.querySelector("body").style.overflow = "hidden";
        titleTag.focus();
    });

    // Event listener for clicking the close icon in the popup
    closeIcon.addEventListener("click", () => {
        isUpdate = false;
        titleTag.value = descTag.value = "";
        popupBox.classList.remove("show");
        document.querySelector("body").style.overflow = "auto";
    });
});
