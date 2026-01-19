// In-memory state
let classes = {};
let activeClass = null;

// DOM elements
const classNameInput = document.getElementById("className");
const createClassBtn = document.getElementById("createClassBtn");
const activeClassEl = document.getElementById("activeClass");

const studentNameInput = document.getElementById("studentName");
const studentIdInput = document.getElementById("studentId");
const addStudentBtn = document.getElementById("addStudentBtn");

const attendanceDateInput = document.getElementById("attendanceDate");
const attendanceList = document.getElementById("attendanceList");
const saveAttendanceBtn = document.getElementById("saveAttendanceBtn");

const historyList = document.getElementById("historyList");
const historyDetails = document.getElementById("historyDetails");

// Create/switch class function
createClassBtn.addEventListener("click", () => {
  const name = classNameInput.value.trim();
  if (!name) return;

  if (!classes[name]) {
    classes[name] = {
      students: [],
      attendance: {}
    };
  }

  activeClass = name;
  activeClassEl.textContent = `Active Class: ${name}`;

  renderStudents();
  renderHistory();
});

// Add student function
addStudentBtn.addEventListener("click", () => {
  if (!activeClass) {
    alert("Create or select a class first.");
    return;
  }

  const name = studentNameInput.value.trim();
  const id = studentIdInput.value.trim();

  if (!name) return;

  classes[activeClass].students.push({
    uid: Date.now().toString(),
    name,
    id
  });

  studentNameInput.value = "";
  studentIdInput.value = "";

  renderStudents();
});

// Display students for attendance
function renderStudents() {
  attendanceList.innerHTML = "";

  if (!activeClass) return;

  classes[activeClass].students.forEach(student => {
    const displayName = student.id
      ? `${student.name} (${student.id})`
      : student.name;

    const li = document.createElement("li");
    li.innerHTML = `
      <label>
        <input type="checkbox" data-id="${student.uid}" />
        ${displayName}
      </label>
    `;
    attendanceList.appendChild(li);
  });
}

// Save attendance function
saveAttendanceBtn.addEventListener("click", () => {
  if (!activeClass) {
    alert("Select a class first.");
    return;
  }

  const date = attendanceDateInput.value;
  if (!date) {
    alert("Select a date.");
    return;
  }

  const records = {};
  document.querySelectorAll("input[type='checkbox']").forEach(box => {
    records[box.dataset.id] = box.checked;
  });

  classes[activeClass].attendance[date] = records;
  renderHistory();

  alert("Attendance saved.");
});

// Display attendance history
function renderHistory() {
  historyList.innerHTML = "";
  historyDetails.innerHTML = "";

  if (!activeClass) return;

  Object.keys(classes[activeClass].attendance).forEach(date => {
    const li = document.createElement("li");
    li.textContent = date;
    li.style.cursor = "pointer";
    li.onclick = () => showHistory(date);
    historyList.appendChild(li);
  });
}

// Display attendance details
function showHistory(date) {
  historyDetails.innerHTML = `<h3>${activeClass} — ${date}</h3>`;

  const classData = classes[activeClass];

  classData.students.forEach(student => {
    const present = classData.attendance[date][student.uid];
    const displayName = student.id
      ? `${student.name} (${student.id})`
      : student.name;

    const p = document.createElement("p");
    p.textContent = `${displayName}: ${present ? "Present" : "Absent"}`;
    historyDetails.appendChild(p);
  });
}
