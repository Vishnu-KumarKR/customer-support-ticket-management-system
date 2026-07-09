<div align="center">

# 🎫 Customer Support Ticket Management System

**A production-ready, highly optimized, and accessible Customer Support Dashboard built with Vanilla JavaScript.**

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](#)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](#)
[![JavaScript ES6+](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](#)
[![Local Storage](https://img.shields.io/badge/Local_Storage-00599C?style=for-the-badge&logo=sqlite&logoColor=white)](#)
[![Responsive](https://img.shields.io/badge/Responsive-Mobile_First-brightgreen?style=for-the-badge)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Stars](https://img.shields.io/github/stars/Vishnu-KumarKR/customer-support-ticket-management-system?style=for-the-badge)](https://github.com/Vishnu-KumarKR/customer-support-ticket-management-system/stargazers)
[![Last Commit](https://img.shields.io/github/last-commit/Vishnu-KumarKR/customer-support-ticket-management-system?style=for-the-badge)](https://github.com/Vishnu-KumarKR/customer-support-ticket-management-system/commits/main)
[![Repo Size](https://img.shields.io/github/repo-size/Vishnu-KumarKR/customer-support-ticket-management-system?style=for-the-badge)](https://github.com/Vishnu-KumarKR/customer-support-ticket-management-system)

<br />

[![Live Demo](https://img.shields.io/badge/🚀_View_Live_Demo-Netlify-38bdf8?style=for-the-badge&logo=netlify&logoColor=white)](https://vishnu-customer-support-ticket-manage.netlify.app/)

</div>

---

## 📖 About Project

This project is a premium, fully responsive **Customer Support Ticket Management System** developed strictly using core web technologies: **HTML5, CSS3, and Vanilla JavaScript (ES6+)**. 

Designed to mimic a professional production environment, it utilizes **Local Storage** for data persistence, ensuring an authentic application experience without requiring a backend. It features complete CRUD (Create, Read, Update, Delete) functionality, complex filtering and sorting, and robust accessibility enhancements.

---

## ✨ Features

- [x] **Dashboard:** Real-time metrics for total, open, in-progress, and closed tickets.
- [x] **Create Ticket:** Accessible modal form to securely log new issues.
- [x] **Edit Ticket:** Instantly modify existing ticket details.
- [x] **Delete Ticket:** Safe removal with confirmation dialogs.
- [x] **View Ticket:** Detailed, read-only modal for ticket inspection.
- [x] **Search Tickets:** Real-time, debounced searching across multiple data points.
- [x] **Filter by Status:** Isolate Open, In-Progress, or Closed tickets.
- [x] **Filter by Priority:** Sort through Low, Medium, and High severities.
- [x] **Sorting:** Multi-directional sorting by date, status, or priority.
- [x] **Pagination:** Client-side pagination handling 10 rows seamlessly.
- [x] **Responsive Design:** Adaptive glassmorphism UI from mobile to 4K displays.
- [x] **Form Validation:** Comprehensive client-side checks with visual error mapping.
- [x] **Toast Notifications:** Non-blocking, animated success and error alerts.
- [x] **Accessibility Improvements:** Screen-reader ready with proper semantic HTML.
- [x] **Keyboard Navigation:** Full support for `Tab` indexing and `Escape` key controls.
- [x] **Focus Management:** Intelligent focus trapping and restoration in modals.
- [x] **ARIA Support:** Explicit ARIA labels, roles, and live regions.
- [x] **Local Storage Persistence:** Zero data loss upon browser refresh.
- [x] **Production-level JavaScript Architecture:** Event delegation, DOM Fragments, and DRY configuration maps.

---

## 🛠 Tech Stack

| Technology | Description |
| :--- | :--- |
| **HTML5** | Semantic, accessible markup structure |
| **CSS3** | Modern styling, Glassmorphism, CSS variables |
| **JavaScript ES6+** | Modular vanilla logic, DOM manipulation |
| **Local Storage** | Persistent client-side database |
| **Responsive Design** | Flexbox, Grid, Media Queries |

---

## 📸 Screenshots

| Dashboard Overview | Ticket Creation |
| :---: | :---: |
| ![Dashboard Overview](docs/images/dashboard.png)<br>_High-level dashboard metrics and data table_ | ![Create Ticket](docs/images/create-ticket.png)<br>_Accessible form with inline validation_ |
| **Mobile View** | **Ticket Details** |
| ![Mobile View](docs/images/mobile-view.png)<br>_Adaptive stacking and horizontal scrolling_ | ![View Ticket](docs/images/view-ticket.png)<br>_Read-only detail inspection modal_ |

> **Note:** Create a `docs/images` folder and add these image placeholders to display them correctly.

---

## 📂 Folder Structure

```text
customer-support-ticket-management-system/
│
├── index.html        # Main application structure & semantic layout
├── style.css         # Styling, glassmorphism UI, themes, and animations
├── script.js         # Core application logic, state, and event handling
├── README.md         # Project documentation
└── docs/
    └── images/       # Directory for project screenshots
```

---

## 🧩 Application Modules

- **Dashboard:** Generates top-level insights recalculating dynamically based on Local Storage data.
- **Ticket CRUD:** Comprehensive operations to Create, Read, Update, and Delete support requests.
- **Search:** A debounced text-matching engine mapping against IDs, Subjects, and Names.
- **Filter:** Dual-dropdown mechanism to isolate tickets by active status or priority weight.
- **Sorting:** Array manipulation algorithms ordering tickets chronologically or logically.
- **Pagination:** Mathematical chunking of the dataset to display 10 items per page with navigation.
- **Validation:** Synchronous form checks ensuring required fields and exact formats (e.g., email syntax, length constraints).
- **Local Storage:** The persistent data bridge enabling data recovery across sessions.
- **Accessibility:** Screen-reader hints, keyboard shortcuts, and focus routing.
- **Responsive UI:** CSS media queries ensuring seamless visual scaling across all device types.

---

## ⚡ Performance Optimizations

- **Event Delegation:** Reduces memory bloat by attaching a single listener to parent elements (`<tbody>`) rather than iterating through hundreds of child buttons.
- **DocumentFragment:** Batches DOM updates in memory, allowing `renderTable()` to append data with a single reflow/repaint cycle.
- **Debounced Search:** Delays processing user keystrokes by 300ms, preventing heavy filtering algorithms from running unnecessarily on every typing tick.
- **Reusable Config Objects:** Eliminates repetitive `switch`/`if` chains by using optimized JS objects (`priorityWeights`, `statusClasses`) for mapping.
- **Efficient DOM Updates:** Separates the filtering logic from the rendering logic, ensuring the DOM is only repainted when strictly necessary.
- **Reduced Reflows:** Using `void element.offsetWidth` deliberately inside Toasts instead of inefficient `setTimeout` chaining to trigger CSS transition repaints.

---

## ♿ Accessibility

- **ARIA Labels:** Invisible descriptors for icon-only buttons (`aria-label`) and visual cues (`aria-hidden`).
- **`role="dialog"`:** Officially signals to screen readers when a modal has intercepted the screen.
- **`aria-live`:** Polite announcements allowing screen readers to dynamically read out form validation errors as they occur.
- **Keyboard Navigation:** Global `:focus-visible` outlines ensure keyboard users can track their visual position.
- **Escape Key:** Global listener gracefully dismisses modals when `Esc` is struck.
- **Focus Trap & Restore:** Auto-focuses the first input when a modal opens and seamlessly restores focus to the triggering button upon closure.
- **Screen Reader Support:** Form inputs are explicitly linked to error spans via `aria-describedby` and `aria-invalid`.

---

## 📱 Responsive Design

- **Desktop (1024px+):** Fluid, wide-view dashboard with a single-row 4-card layout.
- **Tablet (768px - 1024px):** 2x2 grid for metric cards, stacked control filtering.
- **Mobile (< 768px):** 1x4 stacked cards, touch-friendly navigation, and CSS-managed horizontal overflow wrapper ensuring the data table never breaks the viewport width.
- **Flexible Layout:** Entire system scales utilizing `em`/`rem` and CSS Grid/Flexbox properties.

---

## 💾 Local Storage

The application intercepts browser refreshes by synchronizing application state directly with the browser's `localStorage` API.
- **Initialization:** Upon first load, if the `ticketsData` object is empty or missing, a script automatically generates **20 randomized sample tickets** so the dashboard isn't completely empty.
- **Persistence:** Every Create, Update, and Delete operation commits a JSON-stringified state to local storage synchronously.

---

## ✅ Validation

- **Required Fields:** Rejects submission if mandatory inputs are left blank.
- **Email Validation:** Strictly checks against standard Regex patterns before accepting an email.
- **Description Length:** Enforces a minimum 20-character limit to ensure qualitative support tickets.
- **Inline Errors:** Visually highlights input fields in red while displaying dynamic text messages directly beneath the invalid field.

---

## 🚀 Future Improvements

- **Dark Mode:** Implement a global toggle utilizing `prefers-color-scheme`.
- **CSV Export:** Allow users to download filtered tables.
- **Authentication:** Restrict access via JWT.
- **Backend API:** Migrate Local Storage persistence to a dedicated **Node.js** server connected to a **MongoDB** database.
- **Firebase:** Hook up real-time database listeners for multi-admin sync.
- **Charts / Analytics:** Integrate `Chart.js` for visual metric breakdowns.

---

## 💻 Installation

To run this project locally, execute the following commands in your terminal:

```bash
# Clone the repository
git clone https://github.com/Vishnu-KumarKR/customer-support-ticket-management-system.git

# Navigate into the directory
cd customer-support-ticket-management-system

# Open the project (No build tools required!)
# Double-click index.html or use Live Server in VS Code
```

---

## 🌍 Deployment

This project is optimized for static hosting and is deployed directly to **Netlify**.
View it live: [Customer Support Ticket Management System](https://vishnu-customer-support-ticket-manage.netlify.app/)

---

## 🌐 Browser Support

- ✅ Google Chrome (Latest)
- ✅ Mozilla Firefox (Latest)
- ✅ Microsoft Edge (Latest)
- ✅ Apple Safari (Latest)
- ✅ Opera (Latest)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 👤 Author

**Vishnu Kumar K R**

- GitHub: [@Vishnu-KumarKR](https://github.com/Vishnu-KumarKR)
- Portfolio: [Insert Portfolio Link Here]
- LinkedIn: [Insert LinkedIn Link Here]
- Email: [Insert Email Here]

---

<div align="center">
  <strong>If you like this project, please consider giving it a ⭐!</strong>
</div>
