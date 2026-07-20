/******************************************************************************
 *
 * Puzzle Assistant
 *
 * wordle.js
 *
 * Creates and manages the Wordle grid.
 *
 ******************************************************************************/

function createGrid() {

    const grid = document.getElementById("wordleGrid");

    if (!grid) return;

    grid.innerHTML = "";

    for (let row = 0; row < 6; row++) {

        for (let col = 0; col < 5; col++) {

            const cell = document.createElement("input");

            cell.type = "text";
            cell.maxLength = 1;

            cell.className = "wordleCell grey";

            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.dataset.state = "grey";

            cell.autocomplete = "off";
            cell.autocorrect = "off";
            cell.autocapitalize = "characters";
            cell.spellcheck = false;

            cell.addEventListener("input", handleInput);
            cell.addEventListener("keydown", handleKeyDown);

            grid.appendChild(cell);
        }
    }
}

function handleInput(event) {

    const cell = event.target;

    let value = cell.value.toUpperCase();

    // Keep only the first A-Z character
    value = value.replace(/[^A-Z]/g, "");

    cell.value = value;

    if (value === "")
        return;

    const next = nextCell(cell);

    if (next)
        next.focus();
}

function handleKeyDown(event) {

    const cell = event.target;

    switch (event.key) {

        case "Backspace":

            if (cell.value !== "") {
                // Let the browser clear this cell normally.
                return;
            }

            const prev = previousCell(cell);

            if (prev) {
                prev.focus();
                prev.value = "";
                event.preventDefault();
            }
            break;
    }
}

/*
  These work because the grid is created in row-major order, 
  so the next <input> in the DOM is exactly the next Wordle square.
*/

function nextCell(cell) {
    return cell.nextElementSibling;
}

function previousCell(cell) {
    return cell.previousElementSibling;
}

window.Wordle = {
    createGrid
};
