# gu-attendance-tracker
Georgetown University Attendance Tracker

Overview
The Hoya Developers Attendance Tracker is a simple web application that allows a professor to create class sections, add students, take attendance for specific dates, and view past attendance records. The application is intentionally scoped as a lightweight MVP and uses in-memory JavaScript state to manage data.

Features
- Create and switch between multiple class sections
- Add students to a specific class
  - Student name required
  - Optional student ID displayed alongside the name
- Take attendance for a selected date
- View attendance history for each class
- Clean, card-based UI styled using Georgetown’s blue and gray color palette

Tech Stack
- HTML: page structure
- CSS: styling and layout
- Vanilla JavaScript: application logic and state management
- Vercel: deployment and hosting

Design Decisions & Assumptions
- Each class maintains its own list of students and attendance records
- Attendance is tracked as present/absent
- Data is stored in-memory only:
  - Refreshing the page clears all data
  - No database or authentication is used

Data Storage
All data is stored in JavaScript objects during runtime:

- Classes are stored as objects
- Each class contains:
  - A list of students
  - Attendance history keyed by date

No external services or setup are required.

No build tools or package installation is required.
