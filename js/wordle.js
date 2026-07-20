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

        let guess = "";
        let complete = true;
        const score = [];

        for (let col = 0; col < 5; col++) {

            const cell = cells[row * 5 + col];

            if (cell.value === "") // Discard empty or incomplete rows
                complete = false;

            guess += cell.value.toUpperCase();
            score.push(Number(cell.dataset.state));
        }
        if (complete)
            rows.push({ guess, score });
    }
    return rows;
}

/*
  "For every entered guess, would this candidate produce exactly the same colours?
   If not, discard it."

   That's Wordle in a nutshell!
*/
function matchesGrid(candidate, grid) {

    for (const row of grid) {

        const actual = scoreGuess(row.guess, candidate);

        for (let i = 0; i < 5; i++) {

            if (actual[i] !== row.score[i])
                return false;
        }
    }
    return true;
}

function solve() {

    const grid = getGrid();

    const results = [];

    for (const word of dictionaryList) {

        if (word.length !== 5)
            continue;

        if (matchesGrid(word, grid))
            results.push(word);
    }
    return results;
}

/******************************************************************************
 *
 * Returns the Wordle score for a guess against a candidate answer.
 *
 * 0 = grey
 * 1 = yellow
 * 2 = green
 *
 ******************************************************************************/

function scoreGuess(guess, answer) {

    guess = guess.toUpperCase();
    answer = answer.toUpperCase();

    const score = [0, 0, 0, 0, 0];
    const used = [false, false, false, false, false];

    // Pass 1 - Greens
    for (let i = 0; i < 5; i++) {

        if (guess[i] === answer[i]) {

            score[i] = 2;
            used[i] = true;
        }
    }

    // Pass 2 - Yellows
    for (let i = 0; i < 5; i++) {

        if (score[i] !== 0)
            continue;

        for (let j = 0; j < 5; j++) {

            if (used[j])
                continue;

            if (guess[i] !== answer[j])
                continue;

            score[i] = 1;
            used[j] = true;
            break;
        }
    }
    return score;
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
    getGrid,
    scoreGuess
};
