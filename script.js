const studentInput = document.getElementById("studentName");
const addStudentBtn = document.getElementById("addStudentBtn");
const attendanceList = document.getElementById("attendanceList");
const saveAttendanceBtn = document.getElementById("saveAttendanceBtn");
const historyList = document.getElementById("historyList");
const historyDetails = document.getElementById("historyDetails");
const todayDateEl = document.getElementById("todayDate");

const today = new Date().toISOString().split("T")[0];
todayDateEl.textContent = `Date: ${today}`;

// Add student
addStudentBtn.addEventListener("click", async () => {
  const name = studentInput.value.trim();
  if (!name) return;

  await db.collection("students").add({ name });
  studentInput.value = "";
  loadStudents();
});

// Load students
async function loadStudents() {
  attendanceList.innerHTML = "";
  const snapshot = await db.collection("students").get();

  snapshot.forEach(doc => {
    const li = document.createElement("li");
    li.innerHTML = `
      <label>
        <input type="checkbox" data-id="${doc.id}" />
        ${doc.data().name}
      </label>
    `;
    attendanceList.appendChild(li);
  });
}

// Save attendance
saveAttendanceBtn.addEventListener("click", async () => {
  const records = {};
  document.querySelectorAll("input[type='checkbox']").forEach(box => {
    records[box.dataset.id] = box.checked;
  });

  await db.collection("attendance").doc(today).set({
    date: today,
    records
  });

  loadHistory();
  alert("Attendance saved!");
});

// Load attendance history
async function loadHistory() {
  historyList.innerHTML = "";
  const snapshot = await db.collection("attendance").orderBy("date", "desc").get();

  snapshot.forEach(doc => {
    const li = document.createElement("li");
    li.textContent = doc.id;
    li.style.cursor = "pointer";
    li.onclick = () => showHistory(doc.data());
    historyList.appendChild(li);
  });
}

// Show attendance for selected date
async function showHistory(data) {
  historyDetails.innerHTML = "<h3>Attendance</h3>";
  const studentsSnap = await db.collection("students").get();

  studentsSnap.forEach(student => {
    const present = data.records[student.id];
    const p = document.createElement("p");
    p.textContent = `${student.data().name}: ${present ? "Present" : "Absent"}`;
    historyDetails.appendChild(p);
  });
}

// Initial load
loadStudents();
loadHistory();
