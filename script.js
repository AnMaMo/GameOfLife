/**
 * On Load the page
 */
window.onload = function startParty() {
    createTable();
}

/**
 * Function cell click event
 */
function cellClick(id){


    //Get class of cell
    const cell = document.getElementById(id);
    const cellClass = cell.className;

    if(cellClass == "noClicked"){
        cell.classList.add("clicked");
        cell.classList.remove("noClicked");
        cell.style.backgroundColor = "#292929";
    }else{
        cell.classList.add("noClicked");
        cell.classList.remove("clicked");
        cell.style.backgroundColor = "#d8d8d8";
    }
}


/**
 * Function to create a Game table
 */
function createTable() {
    //Get a table from html
    const table = document.querySelector("table");

    for (let i = 0; i < 25; i++) {
        //Create a row
        let row = document.createElement("tr");
        for (let j = 0; j < 25; j++) {
            //Create a cell
            const cell = document.createElement("td");
            cell.classList.add("noClicked");
            cell.id = (i + "_" + j);
            cell.setAttribute("onclick","cellClick(this.id);");
            row.appendChild(cell);
        }
            // add the row to the end of the table body
            table.appendChild(row);
    }
}
