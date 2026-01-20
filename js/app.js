/**
 * KITSW Universal SGPA Calculator - App Logic
 */

// DOM Elements
const branchSelect = document.getElementById('branch-select');
const semesterSelect = document.getElementById('semester-select');
const courseContainer = document.getElementById('course-container');
const courseTableBody = document.getElementById('course-list');
const resultsSection = document.getElementById('results-section');

// TAB_ORDER is defined in gestures.js

// Tab Switching Logic
function switchTab(tabId) {
    // Determine direction
    const currentActive = document.querySelector('.tab-content:not(.hidden)');
    const currentIndex = currentActive ? TAB_ORDER.indexOf(currentActive.id) : 0;
    const newIndex = TAB_ORDER.indexOf(tabId);

    // Default to 'right' (slide in from right) if going forward, 'left' if backward
    // Initial load (currentIndex -1) just fades or defaults
    const direction = newIndex > currentIndex ? 'right' : 'left';
    const animClass = direction === 'right' ? 'animate-slide-right' : 'animate-slide-left';

    // Hide all contents
    document.querySelectorAll('.tab-content').forEach(el => {
        el.classList.add('hidden');
        el.classList.remove('animate-slide-right', 'animate-slide-left', 'animate-fade-in');
    });

    document.querySelectorAll('.tab-btn').forEach(el => {
        el.classList.remove('active');
    });

    // Show selected with animation
    const target = document.getElementById(tabId);
    target.classList.remove('hidden');
    void target.offsetWidth; // Force reflow
    target.classList.add(animClass);

    const activeBtn = document.querySelector(`[onclick="switchTab('${tabId}')"]`);
    if (activeBtn) activeBtn.classList.add('active');

    // Trigger help modal for this tab (if not dismissed)
    if (typeof HelpSystem !== 'undefined' && HelpSystem.content[tabId]) {
        setTimeout(() => HelpSystem.show(tabId), 300);
    }
}

// Initialization
function init() {
    // Populate Branches
    branchSelect.innerHTML = '<option value="">Select Branch</option>';
    Object.keys(BRANCH_MAPPING).forEach(code => {
        branchSelect.innerHTML += `<option value="${code}">${BRANCH_MAPPING[code]} (${code})</option>`;
    });

    // Populate Semesters on Branch Change
    branchSelect.addEventListener('change', () => {
        const branch = branchSelect.value;
        semesterSelect.innerHTML = '<option value="">Select Semester</option>';
        semesterSelect.disabled = !branch;

        if (branch && COURSE_DATA[branch]) {
            Object.keys(COURSE_DATA[branch]).forEach(sem => {
                semesterSelect.innerHTML += `<option value="${sem}">${sem}</option>`;
            });
        }
        courseContainer.classList.add('hidden');
        resultsSection.classList.add('hidden');

        // Reset Bunk Buffer if active
        if (typeof renderAttendanceTable === 'function') {
            renderAttendanceTable();
        }
    });

    // Render Courses on Semester Change
    semesterSelect.addEventListener('change', () => {
        renderCourses();
        if (typeof renderAttendanceTable === 'function') {
            renderAttendanceTable();
        }
    });

    // Initialize Attendance Module (if present)
    if (typeof initAttendance === 'function') {
        initAttendance();
    }

    // Initialize Gestures
    if (typeof initGestures === 'function') {
        initGestures();
    }

    // Initialize Help System
    if (typeof HelpSystem !== 'undefined') {
        HelpSystem.init();
    }

    // Theme Toggle Logic
    const themeBtn = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    function toggleDarkMode() {
        const isDark = document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeIcons(isDark);
    }

    function updateThemeIcons(isDark) {
        if (isDark) {
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
        } else {
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        }
    }

    // Load saved theme
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        updateThemeIcons(true);
    }

    themeBtn.addEventListener('click', toggleDarkMode);

    // Show Swipe Hint every time
    const hint = document.getElementById('swipe-hint');
    if (hint) {
        hint.classList.remove('hidden');
        // Auto hide after 5s
        setTimeout(() => {
            hint.classList.add('hidden');
        }, 5000);
    }
}

function renderCourses() {
    const branch = branchSelect.value;
    const sem = semesterSelect.value;

    if (!branch || !sem || !COURSE_DATA[branch][sem]) {
        courseContainer.classList.add('hidden');
        return;
    }

    courseTableBody.innerHTML = '';
    COURSE_DATA[branch][sem].forEach((course, index) => {
        const row = document.createElement('tr');
        // Removed explicit hover:bg-slate-50, relying on CSS tbody tr:hover
        row.className = "transition-colors";
        row.innerHTML = `
            <td class="p-4 text-sm font-medium theme-text">
                ${course.n}
                <div class="md:hidden text-xs theme-muted-light mt-1">Credits: ${course.c}</div>
            </td>
            <td class="p-4 text-center text-sm font-bold theme-muted hidden md:table-cell">${course.c}</td>
            <td class="p-4 max-w-[140px]">
                <select class="grade-input theme-input w-full p-2 border theme-border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition" 
                        data-credits="${course.c}" onchange="calculateResults()">
                    <option value="" selected disabled>Grade</option>
                    ${Object.keys(GRADE_POINTS).filter(g => g !== 'F' && g !== 'M').map(g => `<option value="${GRADE_POINTS[g]}">${g} (${GRADE_POINTS[g]})</option>`).join('')}
                </select>
            </td>
        `;
        courseTableBody.appendChild(row);
    });

    courseContainer.classList.remove('hidden');
    resultsSection.classList.add('hidden'); // Hide old results until new calc
}

function calculateResults() {
    const inputs = document.querySelectorAll('.grade-input');
    const grades = [];
    let allSelected = true;

    inputs.forEach(input => {
        if (!input.value) {
            allSelected = false; // Don't auto-calculate if not all filled? Actually, maybe calculate partial? 
            // Better to only calculate if user intentionally wants to, OR calculate valid ones.
            // Let's calculate based on what is selected.
        } else {
            grades.push({
                credits: parseFloat(input.dataset.credits),
                gradePoint: parseFloat(input.value)
            });
        }
    });

    if (grades.length === 0) return;

    const result = Calculator.calculateSGPA(grades);
    const percentage = Calculator.cgpaToPercentage(result.sgpa);

    // Update UI
    document.getElementById('sgpa-display').innerText = result.sgpa.toFixed(2);
    document.getElementById('percentage-display').innerText = percentage + "%";
    document.getElementById('credits-display').innerText = result.clearedCredits + " / " + result.totalRegisteredCredits;

    resultsSection.classList.remove('hidden');
}


// Converter Logic 
function convertSgpaToPerc() {
    const val = parseFloat(document.getElementById('converter-input').value);
    if (isNaN(val) || val < 0 || val > 10) {
        alert("Please enter a valid SGPA/CGPA (0-10)");
        return;
    }
    const perc = Calculator.cgpaToPercentage(val);
    document.getElementById('converter-result').innerHTML = `
        <div class="text-sm text-slate-500 uppercase font-bold tracking-wider mb-1">Percentage</div>
        <div class="text-3xl font-black text-indigo-600">${perc}%</div>
    `;
}

// Target Planner Logic 
function calculateTarget() {
    const currentCGPA = parseFloat(document.getElementById('current-cgpa').value);
    const currentCredits = parseFloat(document.getElementById('current-credits').value);
    const targetCGPA = parseFloat(document.getElementById('target-cgpa').value);
    const nextCredits = parseFloat(document.getElementById('next-credits').value);

    if ([currentCGPA, currentCredits, targetCGPA, nextCredits].some(isNaN)) {
        alert("Please fill all fields correctly.");
        return;
    }

    const req = Calculator.calculateTargetSGPA(currentCGPA, currentCredits, targetCGPA, nextCredits);
    const resEl = document.getElementById('planner-result');

    if (typeof req === 'string') {
        resEl.innerHTML = `<span class="text-red-500 font-bold">${req}</span>`;
    } else {
        resEl.innerHTML = `
             <div class="text-sm text-slate-500 uppercase font-bold tracking-wider mb-1">Required SGPA</div>
             <div class="text-3xl font-black text-indigo-600">${req}</div>
        `;
    }
}

// Initialize on Load
document.addEventListener('DOMContentLoaded', init);
