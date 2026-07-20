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

            grid.appendChild(cell);
        }
    }
}

window.Wordle = {
    createGrid
};
