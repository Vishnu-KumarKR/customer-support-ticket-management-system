// Data & State Management
let tickets = [];
let filteredTickets = [];
let currentPage = 1;
const itemsPerPage = 10;
let currentEditId = null;
let currentDeleteId = null;
let activeModalId = null; // Track active modal for focus management

// DOM Elements
const ticketsTableBody = document.getElementById('tableBody');
const emptyState = document.getElementById('emptyState');
const tableWrapper = document.querySelector('.table-wrapper');

// Dashboard Elements
const countTotal = document.getElementById('count-total');
const countOpen = document.getElementById('count-open');
const countProgress = document.getElementById('count-progress');
const countClosed = document.getElementById('count-closed');

// Filters & Search
const searchInput = document.getElementById('searchInput');
const filterStatus = document.getElementById('filterStatus');
const filterPriority = document.getElementById('filterPriority');
const sortData = document.getElementById('sortData');

// Form Elements
const ticketForm = document.getElementById('ticketForm');
const modalTitle = document.getElementById('modalTitle');

// Pagination Elements
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');
const pageNumbers = document.getElementById('pageNumbers');

// Configuration Maps
const priorityWeights = { 'High': 3, 'Medium': 2, 'Low': 1 };
const priorityClasses = { 'High': 'prio-high', 'Medium': 'prio-medium', 'Low': 'prio-low' };
const statusClasses = { 'Closed': 'stat-closed', 'In Progress': 'stat-in-progress', 'Open': 'stat-open' };

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    setupEventListeners();
    updateView(true); // Initial load resets to page 1
});

// Setup Event Listeners
function setupEventListeners() {
    // New Ticket Button
    document.getElementById('btnNewTicket').addEventListener('click', () => openModal('formModal'));
    
    // Form Submit
    ticketForm.addEventListener('submit', handleFormSubmit);
    
    // Filters & Search (Debounce search)
    searchInput.addEventListener('input', debounce(() => updateView(true), 300));
    filterStatus.addEventListener('change', () => updateView(true));
    filterPriority.addEventListener('change', () => updateView(true));
    sortData.addEventListener('change', () => updateView(true));
    
    // Pagination
    btnPrev.addEventListener('click', () => handlePagination(-1));
    btnNext.addEventListener('click', () => handlePagination(1));
    
    // Confirm Delete Button
    document.getElementById('btnConfirmDelete').addEventListener('click', confirmDelete);

    // Modal Close Buttons
    document.querySelectorAll('[data-action="close"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = e.currentTarget.getAttribute('data-target');
            if (target) closeModal(target);
        });
    });

    // Event Delegation for Table Actions
    ticketsTableBody.addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-action]');
        if (!btn) return;

        const action = btn.getAttribute('data-action');
        const id = btn.getAttribute('data-id');

        if (action === 'view') viewTicket(id);
        else if (action === 'edit') editTicket(id);
        else if (action === 'delete') deleteTicketPrompt(id);
    });

    // Keyboard Accessibility for Modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && activeModalId) {
            closeModal(activeModalId);
        }
    });
}

// Utility: Debounce
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Local Storage Functions
function loadFromLocalStorage() {
    try {
        const data = localStorage.getItem('ticketsData');
        if (data) {
            tickets = JSON.parse(data);
        } else {
            generateSampleData();
        }
    } catch (e) {
        console.error("Failed to load data from Local Storage", e);
        generateSampleData();
    }
}

function saveToLocalStorage() {
    try {
        localStorage.setItem('ticketsData', JSON.stringify(tickets));
    } catch (e) {
        showToast('Error saving data to local storage', 'error');
        console.error("Local Storage quota exceeded or unavailable.", e);
    }
}

function generateSampleData() {
    tickets = [];
    const statuses = ['Open', 'In Progress', 'Closed'];
    const priorities = ['Low', 'Medium', 'High'];
    
    for (let i = 1; i <= 20; i++) {
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const priority = priorities[Math.floor(Math.random() * priorities.length)];
        
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 30));
        
        tickets.push({
            id: `TKT-${1000 + i}`,
            subject: `Sample Issue ${i}`,
            customerName: `Customer ${i}`,
            email: `customer${i}@example.com`,
            priority: priority,
            status: status,
            description: `This is a sample description for ticket TKT-${1000 + i}. It has more than 20 characters as required.`,
            createdAt: date.toISOString(),
            updatedAt: date.toISOString()
        });
    }
    saveToLocalStorage();
}

// Data Processing Functions
function updateView(resetPage = false) {
    filterAndSortTickets();
    
    if (resetPage) {
        currentPage = 1;
    } else {
        // Ensure currentPage is within bounds after deletion/filtering
        const totalPages = Math.ceil(filteredTickets.length / itemsPerPage) || 1;
        if (currentPage > totalPages) {
            currentPage = totalPages;
        }
    }

    renderDashboard();
    renderTable();
}

function filterAndSortTickets() {
    const searchTerm = searchInput.value.toLowerCase();
    const statusVal = filterStatus.value;
    const priorityVal = filterPriority.value;
    const sortVal = sortData.value;
    
    // Filter
    filteredTickets = tickets.filter(ticket => {
        const matchSearch = ticket.id.toLowerCase().includes(searchTerm) || 
                            ticket.subject.toLowerCase().includes(searchTerm) || 
                            ticket.customerName.toLowerCase().includes(searchTerm);
                            
        const matchStatus = statusVal === 'all' || ticket.status === statusVal;
        const matchPriority = priorityVal === 'all' || ticket.priority === priorityVal;
        
        return matchSearch && matchStatus && matchPriority;
    });
    
    // Sort
    filteredTickets.sort((a, b) => {
        switch (sortVal) {
            case 'date-desc':
                return new Date(b.createdAt) - new Date(a.createdAt);
            case 'date-asc':
                return new Date(a.createdAt) - new Date(b.createdAt);
            case 'priority-desc':
                return (priorityWeights[b.priority] || 0) - (priorityWeights[a.priority] || 0);
            case 'priority-asc':
                return (priorityWeights[a.priority] || 0) - (priorityWeights[b.priority] || 0);
            case 'status-asc':
                return a.status.localeCompare(b.status);
            default:
                return 0;
        }
    });
}

// Render Functions
function renderDashboard() {
    countTotal.innerText = tickets.length;
    countOpen.innerText = tickets.filter(t => t.status === 'Open').length;
    countProgress.innerText = tickets.filter(t => t.status === 'In Progress').length;
    countClosed.innerText = tickets.filter(t => t.status === 'Closed').length;
}

function renderTable() {
    ticketsTableBody.innerHTML = '';
    
    if (filteredTickets.length === 0) {
        tableWrapper.classList.add('hidden');
        emptyState.classList.remove('hidden');
        renderPagination(0);
        return;
    }
    
    tableWrapper.classList.remove('hidden');
    emptyState.classList.add('hidden');
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredTickets.length);
    const pageData = filteredTickets.slice(startIndex, endIndex);
    
    // Use DocumentFragment for performance
    const fragment = document.createDocumentFragment();

    pageData.forEach(ticket => {
        const tr = document.createElement('tr');
        
        // Build table row HTML
        tr.innerHTML = `
            <td class="ticket-id">${ticket.id}</td>
            <td class="subject-col">${ticket.subject}</td>
            <td>${ticket.customerName}</td>
            <td><span class="badge ${priorityClasses[ticket.priority] || 'prio-low'}">${ticket.priority}</span></td>
            <td><span class="badge ${statusClasses[ticket.status] || 'stat-open'}">${ticket.status}</span></td>
            <td>${formatDate(ticket.createdAt)}</td>
            <td class="actions">
                <button data-action="view" data-id="${ticket.id}" title="View" aria-label="View Ticket ${ticket.id}">
                    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                </button>
                <button data-action="edit" data-id="${ticket.id}" title="Edit" aria-label="Edit Ticket ${ticket.id}">
                    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </button>
                <button class="btn-del" data-action="delete" data-id="${ticket.id}" title="Delete" aria-label="Delete Ticket ${ticket.id}">
                    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </button>
            </td>
        `;
        fragment.appendChild(tr);
    });
    
    ticketsTableBody.appendChild(fragment);
    renderPagination(filteredTickets.length);
}

function renderPagination(totalItems) {
    pageNumbers.innerHTML = '';
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    btnPrev.disabled = currentPage <= 1;
    btnNext.disabled = currentPage >= totalPages || totalPages === 0;
    
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.innerText = i;
        btn.setAttribute('aria-label', `Page ${i}`);
        if (i === currentPage) {
            btn.classList.add('active');
            btn.setAttribute('aria-current', 'page');
        }
        btn.addEventListener('click', () => {
            currentPage = i;
            renderTable();
        });
        pageNumbers.appendChild(btn);
    }
}

function handlePagination(direction) {
    const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);
    const newPage = currentPage + direction;
    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        renderTable();
    }
}

// Helpers
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function generateId() {
    if (tickets.length === 0) return 'TKT-1001';
    
    const ids = tickets.map(t => parseInt(t.id.split('-')[1], 10)).filter(id => !isNaN(id));
    const maxId = ids.length ? Math.max(...ids) : 1000;
    return `TKT-${maxId + 1}`;
}

// CRUD Operations
function handleFormSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;
    
    const formData = new FormData(ticketForm);
    const now = new Date().toISOString();
    
    if (currentEditId) {
        // Update
        const index = tickets.findIndex(t => t.id === currentEditId);
        if (index !== -1) {
            tickets[index] = {
                ...tickets[index],
                subject: formData.get('subject').trim(),
                customerName: formData.get('customerName').trim(),
                email: formData.get('email').trim(),
                priority: formData.get('priority'),
                status: formData.get('status'),
                description: formData.get('description').trim(),
                updatedAt: now
            };
            showToast('Ticket Updated Successfully', 'success');
        }
    } else {
        // Create
        const newTicket = {
            id: generateId(),
            subject: formData.get('subject').trim(),
            customerName: formData.get('customerName').trim(),
            email: formData.get('email').trim(),
            priority: formData.get('priority'),
            status: formData.get('status'),
            description: formData.get('description').trim(),
            createdAt: now,
            updatedAt: now
        };
        tickets.push(newTicket);
        showToast('Ticket Created Successfully', 'success');
    }
    
    saveToLocalStorage();
    updateView(false); // Preserve page if possible
    closeModal('formModal');
}

function viewTicket(id) {
    const ticket = tickets.find(t => t.id === id);
    if (!ticket) return;
    
    document.getElementById('viewSubject').innerText = ticket.subject;
    
    const prioBadge = document.getElementById('viewPriority');
    prioBadge.innerText = ticket.priority;
    prioBadge.className = `badge ${priorityClasses[ticket.priority] || 'prio-low'}`;
    
    const statBadge = document.getElementById('viewStatus');
    statBadge.innerText = ticket.status;
    statBadge.className = `badge ${statusClasses[ticket.status] || 'stat-open'}`;
    
    document.getElementById('viewId').innerText = ticket.id;
    document.getElementById('viewName').innerText = ticket.customerName;
    document.getElementById('viewEmail').innerText = ticket.email;
    document.getElementById('viewDate').innerText = formatDate(ticket.createdAt);
    document.getElementById('viewUpdated').innerText = formatDate(ticket.updatedAt);
    document.getElementById('viewDescription').innerText = ticket.description;
    
    openModal('viewModal');
}

function editTicket(id) {
    const ticket = tickets.find(t => t.id === id);
    if (!ticket) return;
    
    currentEditId = id;
    modalTitle.innerText = 'Edit Ticket';
    
    document.getElementById('ticketIdInput').value = ticket.id;
    document.getElementById('subject').value = ticket.subject;
    document.getElementById('customerName').value = ticket.customerName;
    document.getElementById('email').value = ticket.email;
    document.getElementById('priority').value = ticket.priority;
    document.getElementById('status').value = ticket.status;
    document.getElementById('description').value = ticket.description;
    
    clearErrors();
    openModal('formModal');
}

function deleteTicketPrompt(id) {
    currentDeleteId = id;
    openModal('deleteModal');
}

function confirmDelete() {
    if (currentDeleteId) {
        tickets = tickets.filter(t => t.id !== currentDeleteId);
        saveToLocalStorage();
        updateView(false); // Preserve page, adjust bounds if necessary
        showToast('Ticket Deleted Successfully', 'success');
        closeModal('deleteModal');
    }
}

// Form Validation
function validateForm() {
    let isValid = true;
    clearErrors();
    
    const subject = document.getElementById('subject');
    const customerName = document.getElementById('customerName');
    const email = document.getElementById('email');
    const description = document.getElementById('description');
    
    if (!subject.value.trim()) {
        showError('err-subject', 'Subject is required', subject);
        isValid = false;
    }
    
    if (!customerName.value.trim()) {
        showError('err-customerName', 'Customer Name is required', customerName);
        isValid = false;
    }
    
    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        showError('err-email', 'Valid email is required', email);
        isValid = false;
    }
    
    if (!description.value.trim() || description.value.trim().length < 20) {
        showError('err-description', 'Description must be at least 20 characters', description);
        isValid = false;
    }
    
    return isValid;
}

function showError(id, message, inputElement) {
    const errSpan = document.getElementById(id);
    errSpan.innerText = message;
    if (inputElement) {
        inputElement.setAttribute('aria-invalid', 'true');
        // Add listener to remove error on input
        inputElement.addEventListener('input', function removeError() {
            errSpan.innerText = '';
            inputElement.removeAttribute('aria-invalid');
            inputElement.removeEventListener('input', removeError);
        }, { once: true });
    }
}

function clearErrors() {
    document.querySelectorAll('.error').forEach(el => el.innerText = '');
    document.querySelectorAll('[aria-invalid="true"]').forEach(el => el.removeAttribute('aria-invalid'));
}

// Modals Focus Management
let previouslyFocusedElement = null;

function openModal(id) {
    previouslyFocusedElement = document.activeElement;
    
    if (id === 'formModal' && !currentEditId) {
        ticketForm.reset();
        modalTitle.innerText = 'Create New Ticket';
        clearErrors();
    }
    
    const modalOverlay = document.getElementById(id);
    modalOverlay.classList.add('active');
    activeModalId = id;
    
    // Focus first focusable element inside modal
    const focusable = modalOverlay.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable) {
        setTimeout(() => focusable.focus(), 50); // slight delay to allow transition
    }
}

function closeModal(id) {
    const modalOverlay = document.getElementById(id);
    modalOverlay.classList.remove('active');
    
    if (activeModalId === id) {
        activeModalId = null;
    }
    
    if (id === 'formModal') {
        currentEditId = null;
        clearErrors();
    }
    
    // Return focus to previously focused element
    if (previouslyFocusedElement) {
        setTimeout(() => previouslyFocusedElement.focus(), 50);
    }
}

// Toasts
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.setAttribute('role', type === 'error' ? 'alert' : 'status');
    
    const icon = type === 'success' ? 
        '<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="toast-icon"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>' : 
        '<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="toast-icon"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';
        
    toast.innerHTML = `
        ${icon}
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    // Force reflow
    void toast.offsetWidth;
    
    // Animate in
    toast.classList.add('show');
    
    // Animate out and remove
    setTimeout(() => {
        toast.classList.remove('show');
        toast.addEventListener('transitionend', () => toast.remove());
    }, 3000);
}
