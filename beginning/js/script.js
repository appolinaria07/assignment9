// CREATE AN ARRAY OF EMPLOYEES
let initArr = [
    [22334455, "John Smith", 1234, "jsmith@email.com", "Engineering"], 
    [12345678, "Anabel Lucas", 2345, "alucas1@email.com", "Administrative"], 
    [90876543, "Lilly Tiago", 3456, "l_tiago@email.com", "Engineering"], 
    [11335577, "Patricia Berrimore", 4567, "berrimore_pat@email.com", "Sales"], 
    [22446688, "Michael Doe", 5678, "doe_m@email.com", "Sales"]
];
let newEmployees = [];
let storage = localStorage.getItem('employees', JSON.stringify(initArr));;
let empCount = 0;

// CHECK TO SEE IF STORAGE OBJECT EXISTS WHEN THE PAGE LOADS
// let storage = localStorage.getItem('employees', JSON.stringify(newEmployees));
if (storage === '') {
    localStorage.setItem('employees', JSON.stringify(initArr));
    initArr = JSON.parse(localStorage.getItem('employees'));
    
} else {
// IF DOES, RETURN STORAGE OBJECT INTO ARRAY INSTEAD OF POPULATED ARRAY
    initArr = JSON.parse(localStorage.getItem('employees'));
}

// GET DOM ELEMENTS
const $ = (id) => {
    return document.getElementById(id);
}

// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS
buildGrid(initArr);

// ADD EMPLOYEE
$('addForm').addEventListener('submit', (e) => {
    // PREVENT FORM SUBMISSION
    e.preventDefault();
    // GET THE VALUES FROM THE TEXT BOXES
    let id = $('id').value;
    let fullName = $('name').value;
    let ext = $('extension').value;
    let email = $('email').value;
    let department = $('department').value;

    // ADD THE NEW EMPLOYEE TO A NEW ARRAY OBJECT
    newEmployees = [id, fullName, ext, email, department];
    // PUSH THE NEW ARRAY TO THE *EXISTING* EMPLOYEES ARRAY
    initArr.push(newEmployees);
    newEmployees = Array.from(initArr);
    // BUILD THE GRID
    buildGrid(newEmployees);
    // RESET THE FORM
    $('addForm').reset();
    // SET FOCUS BACK TO THE ID TEXT BOX
    let idFocus = $('id');
    idFocus.focus();
});

// DELETE EMPLOYEE
let table = $('employees');
table.addEventListener('click', (e) => {
    // CONFIRM THE DELETE
    if (confirm('Remove this employee?')) {

        // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
        let rowI = parseInt(table.parentNode.parentNode.rowIndex);
        console.log(rowI);
        // CALL DELETEROW() METHOD TO DELETE SPECIFIC ROW IN THE TABLE
        table.deleteRow(rowI);

        // REMOVE EMPLOYEE FROM ARRAY
        initArr = initArr.splice(rowI, 1);

        // BUILD THE GRID
        buildGrid();
    }
});

// BUILD THE EMPLOYEES GRID
function buildGrid() {
    // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
    let table = $('employees');
    // table.removeChild(table.childNodes[1]);
    let tbody = document.querySelector('tbody');
    tbody.parentNode.removeChild(tbody);

    // REBUILD THE TBODY FROM SCRATCH
     tbody = document.createElement('tbody');
   
     // LOOP THROUGH THE ARRAY OF EMPLOYEES
    // REBUILDING THE ROW STRUCTURE
    for (employee of initArr) {
        tbody.innerHTML += `<tr>
        <td>${employee[0]}</td>
        <td>${employee[1]}</td>
        <td>${employee[2]}</td>
        <td>${employee[3]}</td>
        <td>${employee[4]}</td>
        <td><button class = 'btn btn-danger btn-sm delete'>X</button></td>
        </tr>`;
    }

    // BIND THE TBODY TO THE EMPLOYEE TABLE
    table.appendChild(tbody);

    // UPDATE EMPLOYEE COUNT
    empCount = initArr.length;
    $('empCount').innerHTML = `(${empCount})`;

    // STORE THE ARRAY IN STORAGE
    newEmployees = Array.from(initArr)
    localStorage.setItem('employees', JSON.stringify(newEmployees));
};