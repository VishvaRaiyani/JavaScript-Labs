// ------------------------------------------------------------
// Arrays to store roll numbers and their attendance status
// ------------------------------------------------------------

// Stores roll numbers entered by the user
// Example: [301, 302, 303, 304]
let rollNos = [];

// Stores attendance status corresponding to roll numbers
// Example: ["Present", "Absent", "Pending", "Present"]
let status = [];

// Stores the currently selected row index
// Used for keyboard navigation (Arrow keys)
let current = 0;

// ------------------------------------------------------------
// Load Students
// Called when user clicks "Load Students"
// ------------------------------------------------------------
function loadStudents() {

    // Read starting roll number from input box
    let start = Number(document.getElementById("start").value);

    // Read ending roll number from input box
    let end = Number(document.getElementById("end").value);

    // Clear previous data
    rollNos = [];
    status = [];

    // Start selection from first row
    current = 0;

    // Generate roll numbers from start to end
    for (let i = start; i <= end; i++) {

        // Add roll number
        rollNos.push(i);

        // Initially every student is Pending
        status.push("Pending");
    }

    // Display generated table
    displayTable();
}

// ------------------------------------------------------------
// Display Attendance Table
// ------------------------------------------------------------
function displayTable() {

    // Variable to store complete HTML table
    let temp = `
    <tr>
        <th>Roll No</th>
        <th>Present</th>
        <th>Absent</th>
        <th>Status</th>
    </tr>`;

    // Loop through every roll number
    for (let i = 0; i < rollNos.length; i++) {

        // Class used to highlight current row
        let cls = "";

        // Highlight selected row
        if (i == current)
            cls = "active";

        // Create table row
        temp += `
        <tr id="row${i}" class="${cls}">

            <!-- Roll Number -->
            <td>${rollNos[i]}</td>

            <!-- Present Button -->
            <td>
                <button class="present-btn" onclick="markPresent(${i})">
                Present
                </button>
            </td>

            <!-- Absent Button -->
            <td>
                <button class="absent-btn" onclick="markAbsent(${i})">
                Absent
                </button>
            </td>

            <!-- Attendance Status -->
            <td class="${status[i].toLowerCase()}">
                ${status[i]}
            </td>

        </tr>`;
    }
    console.log(temp)

    // Display table
    document.getElementById("table").innerHTML = temp;

    // Update summary
    updateSummary();
}

// ------------------------------------------------------------
// Automatically Scroll Current Row
// ------------------------------------------------------------
function scrollToCurrent() {

    // Find current row
    let row = document.getElementById("row" + current);

    // Scroll if row exists
    if (row) {
        row.scrollIntoView({

            // Smooth scrolling
            behavior: "smooth",

            // Keep row in center
            block: "center"
        });
    }
}

// ------------------------------------------------------------
// Mark Present
// ------------------------------------------------------------
function markPresent(index) {

    // Change status
    status[index] = "Present";

    // Automatically move to next student
    if (index < rollNos.length - 1)
        current++;

    // Refresh table
    displayTable();

    // Scroll to next student
    scrollToCurrent();
}

// ------------------------------------------------------------
// Mark Absent
// ------------------------------------------------------------
function markAbsent(index) {

    // Change status
    status[index] = "Absent";

    // Move to next student
    if (index < rollNos.length - 1)
        current++;

    // Refresh table
    displayTable();

    // Scroll to current row
    scrollToCurrent();
}

// ------------------------------------------------------------
// Mark Everyone Present
// ------------------------------------------------------------
function allPresent() {

    // Loop through every student
    for (let i = 0; i < status.length; i++) {

        status[i] = "Present";

    }

    displayTable();
}

// ------------------------------------------------------------
// Mark Everyone Absent
// ------------------------------------------------------------
function allAbsent() {

    // Loop through every student
    for (let i = 0; i < status.length; i++) {

        status[i] = "Absent";

    }

    displayTable();
}

// ------------------------------------------------------------
// Reset Attendance
// ------------------------------------------------------------
function resetAttendance() {

    // Set everyone to Pending
    for (let i = 0; i < status.length; i++) {

        status[i] = "Pending";

    }

    // Select first row
    current = 0;

    displayTable();
}

// ------------------------------------------------------------
// Attendance Summary
// ------------------------------------------------------------
function updateSummary() {

    // Count Present students
    let present = 0;

    // Count Absent students
    let absent = 0;

    // Store Present Roll Numbers
    let presentList = [];

    // Store Absent Roll Numbers
    let absentList = [];

    // Loop through every student
    for (let i = 0; i < status.length; i++) {

        // Present
        if (status[i] == "Present") {
            present++;
            presentList.push(rollNos[i]);
        }

        // Absent
        else if (status[i] == "Absent") {
            absent++;
            absentList.push(rollNos[i]);
        }
    }

    // Display summary
    document.getElementById("summary").innerHTML = `
        <h3>Attendance Summary</h3>

        <p><b>Present :</b> ${present}</p>

        <p><b>Absent :</b> ${absent}</p>

        <hr>

        <p><b>Present Roll Numbers</b></p>
        ${presentList.length ? presentList.join(", ") : "None"}

        <br><br>

        <p><b>Absent Roll Numbers</b></p>
        ${absentList.length ? absentList.join(", ") : "None"}
    `;
}

// ------------------------------------------------------------
// Keyboard Shortcuts
// ------------------------------------------------------------
document.addEventListener("keydown", function (e) {

    // If no students loaded
    if (rollNos.length == 0)
        return;

    // LEFT ARROW
    // Mark Present
    if (e.key == "ArrowLeft") {

        markPresent(current);

    }

    // RIGHT ARROW
    // Mark Absent
    else if (e.key == "ArrowRight") {

        markAbsent(current);

    }

    // UP ARROW
    // Move to previous student
    else if (e.key == "ArrowUp") {

        if (current > 0)
            current--;

        displayTable();
        scrollToCurrent();
    }

    // DOWN ARROW
    // Move to next student
    else if (e.key == "ArrowDown") {

        if (current < rollNos.length - 1)
            current++;

        displayTable();
        scrollToCurrent();
    }
});