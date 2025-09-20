# 📅 Dynamic Class Meeting Scheduler (Frontend)

A web-based meeting scheduler built with **Next.js** that allows users to select multiple dates, automatically assigns student meetings based on age priority and class balance, and exports the schedule to Excel.

---

## ⚙️ Setup Instructions
1. Clone the repo:
```bash
git clone https://github.com/Deepak777K/social-media-content-calendar.git
cd meeting-scheduler
```

or download the zip

2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Deliverables
- Functional calendar UI
- API integration with dummy data
- Excel export with overview + per-date sheets
- Clean, responsive UI
- GitHub repo with structured commits + README

## 🚀 Features
- Interactive **calendar UI** for selecting dates
- **Age-based scheduling** (older students get priority)
- **Balanced distribution** of meetings across selected dates
- **Overview page** with class-wise breakdown and daily totals
- **Excel export** (overview + date-wise sheets) using SheetJS
- **Edit/remove meetings** directly from the overview
- **Responsive design** for desktop and mobile
- Optional **filters** by student or class

---

## 🛠️ Tech Stack
- **Framework:** Next.js (React)
- **State Management:** Context API
- **Data Fetching:** Fetch API
- **Excel Export:** SheetJS (xlsx)
- **Styling:** Inline styles (can be extended with Tailwind)

---

## 📂 Project Structure
```
/app
  /overview
    page.js
  page.js
/components
  CalendarGrid.js
  StudentList.js
/context
  AppContext.js
/utils
  scheduler.js
/public
  dummy-data.json
```

---

## Author
- ([@Deepak](https://github.com/Deepak777K))
