var partyStarted = false;
var x = 30;
var y = 30;

/**
 * On Load the page
 */
window.onload = function OpenGame() {
    createTable();
}


/**
 * Function to create a Game table
 */
function createTable() {
    //Get a table from html
    const table = document.querySelector("table");

    for (let i = 0; i < x; i++) {
        //Create a row
        let row = document.createElement("tr");
        for (let j = 0; j < y; j++) {
            //Create a cell
            const cell = document.createElement("td");
            cell.classList.add("noClicked");
            cell.id = (i + "_" + j);
            cell.setAttribute("onclick", "cellClick(this.id);");
            row.appendChild(cell);
        }
        // add the row to the end of the table body
        table.appendChild(row);
    }
}


/**
 * Function cell click event
 */
function cellClick(id) {

    //Get class of cell
    const cell = document.getElementById(id);
    const cellClass = cell.className;


    if (cellClass == "noClicked") {
        cell.classList.add("clicked");
        cell.classList.remove("noClicked");
        cell.style.backgroundColor = "#292929";
    } else {
        cell.classList.add("noClicked");
        cell.classList.remove("clicked");
        cell.style.backgroundColor = "#d8d8d8";
    }
}

/**
 * Function to generate the next round board
 */
function generateNewBoard() {
    //Create a array of new celds
    var arrayNewBoard = [];

    // Iterate over all the cells
    for (var i = 0; i < x; i++) {
        // Array for row
        var row = [];
        for (var j = 0; j < y; j++) {
            var cell = document.getElementById(i + "_" + j);
            var cellClicked = cell.classList;
            var cellRound = getRoundColoredCells(i, j);

            // Check the cell status
            var cellStatus = false;
            if (cellClicked == "clicked") {
                cellStatus = true;
            } else {
                cellStatus = false;
            }

            nextRoundStatus = toNextRoundCell(cellStatus, cellRound);
            row.push(nextRoundStatus);
        }
        arrayNewBoard.push(row);
    }
    return arrayNewBoard;

}

/**
 * Function to set a new board
 * @param {} newBoard 
 */
function setNewBoard(newBoard) {
    for (var i = 0; i < x; i++) {
        for (var j = 0; j < y; j++) {
            var cell = document.getElementById(i + "_" + j);
            var status = newBoard[i][j];

            if (status) {
                cell.classList.add("clicked");
                cell.classList.remove("noClicked");
                cell.style.backgroundColor = "#292929";
            } else {
                cell.classList.add("noClicked");
                cell.classList.remove("clicked");
                cell.style.backgroundColor = "#d8d8d8";
            }
        }
    }
}


/**
 * Function to get number of colored cells has around
 * @param {*} x 
 * @param {*} y 
 * @returns 
 */
function getRoundColoredCells(x, y) {
    // Number of colored round cells
    var count = 0;

    //All round cells
    var roundCellsID = [
        x + "_" + (y - 1),
        x + "_" + (y + 1),
        (x - 1) + "_" + y,
        (x + 1) + "_" + y,
        (x - 1) + "_" + (y - 1),
        (x - 1) + "_" + (y + 1),
        (x + 1) + "_" + (y - 1),
        (x + 1) + "_" + (y + 1)
    ];

    //Iterate over all round cells
    for (let i = 0; i < roundCellsID.length; i++) {

        if (document.getElementById(roundCellsID[i]) != null) {
            //Get cell
            const cell = document.getElementById(roundCellsID[i]);
            const cellClass = cell.className;

            //If cell is colored
            if (cellClass == "clicked") {
                count++;
            }
        }
    }
    return count;
}

/**
 * Function to check if to the next round the cell is colored or not
 * @param {*} cellStatus
 * @param {*} liveCells 
 * 
 */
function toNextRoundCell(cellStatus, liveCells) {
    if (cellStatus == true && liveCells < 2) {
        return false;
    }

    if (cellStatus == true && liveCells > 3) {
        return false;
    }

    if (cellStatus == true && liveCells == 2 || liveCells == 3) {
        return true;
    }

    if (cellStatus == false && liveCells == 3) {
        return true;
    }
    return false;
}


///// START OR STOP THE PARTY
/**
 * Function to start a party
 */
var partyTimer;
function startParty() {
    //if partyStarted is true no start a new party
    if (partyStarted) {
        console.log("Party is already started");
        return;
    } else {
        // set partyStarted to true
        partyStarted = true;
    }

    partyTimer = setInterval(party, 100);
    function party() {

        //Set party time
        //get text to class partytime
        var timeLapsed = parseInt(document.getElementById("partyTime").innerText);
        document.getElementById("partyTime").innerText = timeLapsed + 1;

        //Generate new board
        var newBoard = generateNewBoard();

        //Set new board
        setNewBoard(newBoard);
    }
}

/**
 * Function to stop party
 */
function stopParty() {
    //if partyStarted is false no stop a party
    if (!partyStarted) {
        console.log("Party is already stopped");
        return;
    } else {
        // set partyStarted to false
        partyStarted = false;
        document.getElementById("partyTime").innerText = "0";
        clearInterval(partyTimer);
    }
}
//////////




///// BOARD CLEAR OR RANDOM /////

/**
 * Function  to generate random board
 */
function generateRandomBoard() {
    // Iterate all cells
    for (var i = 0; i < x; i++) {
        for (var j = 0; j < y; j++) {
            var cell = document.getElementById(i + "_" + j);
            var cellClicked = cell.classList;


            //Generate random number
            var random = Math.floor(Math.random() * 2);

            //If random number is 1
            if (random == 1) {
                cell.classList.add("clicked");
                cell.classList.remove("noClicked");
                cell.style.backgroundColor = "#292929";
            } else {
                cell.classList.add("noClicked");
                cell.classList.remove("clicked");
                cell.style.backgroundColor = "#d8d8d8";
            }
        }
    }
}

/**
 * Function to clear board
 */
function clearBoard() {
    // Iterate all cells
    for (var i = 0; i < x; i++) {
        for (var j = 0; j < y; j++) {
            var cell = document.getElementById(i + "_" + j);
            cell.classList.add("noClicked");
            cell.classList.remove("clicked");
            cell.style.backgroundColor = "#d8d8d8";

        }
    }
}
//////////
