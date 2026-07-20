/******************************************************************************
 *
 * Puzzle Assistant
 *
 * wordle.js
 *
 * Creates and manages the Wordle grid.
 *
 ******************************************************************************/

let lastClickedCell = null;
let lastClickTime = 0;

const DOUBLE_CLICK_MS = 350;

function createGrid() {

    const grid = document.getElementById("wordleGrid");

    if (!grid) return;

    grid.innerHTML = "";

    for (let row = 0; row < 6; row++) {

        for (let col = 0; col < 5; col++) {

            const cell = document.createElement("input");

            cell.type = "text";
            cell.maxLength = 1;
            cell.inputMode = "text";

            cell.className = "wordleCell grey";

            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.dataset.state = 0; // 0=grey, 1=yellow, 2=green

            cell.autocomplete = "off";
            cell.autocorrect = "off";
            cell.autocapitalize = "characters";
            cell.spellcheck = false;

            cell.addEventListener("input", handleInput);
            cell.addEventListener("keydown", handleKeyDown);
            cell.addEventListener("click", handleClick);

            grid.appendChild(cell);
        }
    }
}

function getGrid() {

    const rows = [];

    const cells = document.querySelectorAll(".wordleCell");

    for (let row = 0; row < 6; row++) {

        const guess = [];

        for (let col = 0; col < 5; col++) {

            const cell = cells[row * 5 + col];

            guess.push({
                letter: cell.value,
                state: Number(cell.dataset.state)
            });
        }
        rows.push(guess);
    }
    return rows;
}

function handleInput(event) {

    const cell = event.target;

    let value = cell.value.toUpperCase();

    // Keep only the first A-Z character
    value = value.replace(/[^A-Z]/g, "");

    cell.value = value;

    if (value === "") {

        cell.dataset.state = 0;

        cell.classList.remove("yellow", "green");
        cell.classList.add("grey");

        return;
    }

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

function handleClick(event) {

    const cell = event.target;
    const now = Date.now();

    if (cell === lastClickedCell &&
        now - lastClickTime < DOUBLE_CLICK_MS) {

        cycleColour(cell);

        lastClickedCell = null;
        lastClickTime = 0;

        return;
    }

    lastClickedCell = cell;
    lastClickTime = now;
}

function cycleColour(cell) {

    const colours = ["grey", "yellow", "green"];

    let state = Number(cell.dataset.state);

    if (cell.value === "") // disallow colouring an empty cell
        return;

    state = (state + 1) % colours.length;

    cell.dataset.state = state;

    cell.classList.remove("grey", "yellow", "green");
    cell.classList.add(colours[state]);
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
    createGrid,
    getGrid
};
