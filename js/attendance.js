const attendanceStoragePrefix = 'bunkBuffer_v2_';

// DOM Elements
let attTableBody, attTableContainer, attEmptyState;
let overallPctEl, overallFracEl, bufferValEl, bufferTitleEl, bufferSubEl, futureInput, futureResultEl;

function initAttendance() {
    attTableBody = document.getElementById('att-table-body');
    attTableContainer = document.getElementById('att-table-container');
    attEmptyState = document.getElementById('att-empty-state');

    overallPctEl = document.getElementById('att-overall-pct');
    overallFracEl = document.getElementById('att-overall-frac');
    bufferValEl = document.getElementById('att-buffer-value');
    bufferTitleEl = document.getElementById('att-buffer-title');
    bufferSubEl = document.getElementById('att-buffer-subtitle');
    futureInput = document.getElementById('att-future-input');
    futureResultEl = document.getElementById('att-future-result');

    if (!attTableBody) return;

    // Listen for Future Planner input
    futureInput.addEventListener('input', calculateFutureBuffer);

    // Delegate input events with Sync Logic
    attTableBody.addEventListener('input', (e) => {
        if (e.target.tagName === 'INPUT') {
            const idx = e.target.dataset.idx;
            const field = e.target.dataset.field;
            const val = e.target.value;

            // Sync other inputs with same idx/field
            const related = attTableBody.querySelectorAll(`input[data-idx="${idx}"][data-field="${field}"]`);
            related.forEach(inp => {
                if (inp !== e.target) inp.value = val;
            });

            updateAttendanceCalculations();
        }
    });

    // Initial Render
    renderAttendanceTable();
}

/**
 * Generates the subject list based on Branch & Semester
 * Rules:
 * - 4 Credits -> Theory + Lab (2 rows)
 * - Exclude: Practicum, SEA/SAA, ETS, Sports, Yoga, EGCAD?, UHV?
 * - Others -> 1 row
 */
function generateSubjects(branch, sem) {
    if (!COURSE_DATA[branch] || !COURSE_DATA[branch][sem]) return [];

    const rawCourses = COURSE_DATA[branch][sem];
    const generated = [];

    rawCourses.forEach(c => {
        const name = c.n;
        const credits = c.c;

        // Exclusion List (No attendance needed usually)
        if (name.includes("Practicum") ||
            name.includes("SEA/SAA") ||
            name.includes("ETS") ||
            name.includes("Sports") ||
            name.includes("NSS") ||
            name.includes("NCC")) {
            return;
        }

        if (credits === 4) {
            // Split into Theory & Lab
            generated.push({ name: `${name} Theory`, held: 0, absent: 0 });
            generated.push({ name: `${name} Lab`, held: 0, absent: 0 });
        } else {
            // Single Subject
            generated.push({ name: name, held: 0, absent: 0 });
        }
    });

    return generated;
}

function getStorageKey() {
    const branch = document.getElementById('branch-select').value;
    const sem = document.getElementById('semester-select').value;
    if (!branch || !sem) return null;
    return `${attendanceStoragePrefix}${branch}_${sem}`;
}

function getAttendanceData() {
    const key = getStorageKey();
    if (!key) return null;

    const saved = localStorage.getItem(key);
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            console.error("Error parsing saved data", e);
        }
    }

    // If no data, generate fresh
    const branch = document.getElementById('branch-select').value;
    const sem = document.getElementById('semester-select').value;
    return generateSubjects(branch, sem);
}

function saveAttendanceData(data) {
    const key = getStorageKey();
    if (key) {
        localStorage.setItem(key, JSON.stringify(data));
    }
}

function renderAttendanceTable() {
    const data = getAttendanceData();

    if (!data) {
        // No selection made
        attTableContainer.classList.add('hidden');
        attEmptyState.classList.remove('hidden');
        resetStats();
        return;
    }

    // Show Table Container
    attTableContainer.classList.remove('hidden');
    attEmptyState.classList.add('hidden');

    // Render Table Rows (Desktop) & Mobile Cards
    attTableBody.innerHTML = data.map((s, i) => `
        <tr class="group border-b border-slate-100 hover:bg-slate-50 transition-colors hidden md:table-row">
            <td class="p-4 font-bold text-slate-700 text-sm">
                ${s.name}
            </td>
            <td class="p-4 text-center">
                <input type="number" min="0" data-idx="${i}" data-field="held" value="${s.held}" 
                    class="w-16 p-2 text-center bg-white border border-slate-200 rounded-lg font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none transition text-sm">
            </td>
            <td class="p-4 text-center">
                <input type="number" min="0" data-idx="${i}" data-field="absent" value="${s.absent}" 
                    class="w-16 p-2 text-center bg-white border border-red-200 text-red-600 rounded-lg font-bold focus:ring-2 focus:ring-red-500 outline-none transition text-sm">
            </td>
            <td class="p-4 text-right">
                <span id="att-pct-${i}" class="font-bold text-slate-400 text-sm">0%</span>
            </td>
        </tr>
        
        <!-- Mobile Card View -->
        <tr class="md:hidden border-b theme-border last:border-0">
            <td colspan="4" class="p-4">
                <div class="flex flex-col gap-3">
                    <div class="flex justify-between items-start">
                        <span class="font-bold theme-text text-base">${s.name}</span>
                        <span id="att-pct-mobile-${i}" class="font-bold text-slate-400 text-sm px-2 py-1 rounded theme-bg">0%</span>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-bold theme-muted-light uppercase mb-1">Held</label>
                            <input type="number" inputmode="numeric" pattern="[0-9]*" min="0" data-idx="${i}" data-field="held" value="${s.held}" 
                                class="theme-input w-full p-3 text-center border theme-border rounded-xl font-bold focus:ring-2 focus:ring-indigo-500 outline-none text-lg">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-red-300 uppercase mb-1">Absent</label>
                            <input type="number" inputmode="numeric" pattern="[0-9]*" min="0" data-idx="${i}" data-field="absent" value="${s.absent}" 
                                class="w-full p-3 text-center bg-red-50 border border-red-100 rounded-xl font-bold text-red-600 focus:ring-2 focus:ring-red-500 outline-none text-lg">
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    `).join('');

    updateAttendanceCalculations(data);
}

function getCurrentTableData() {
    // Only select desktop rows (with class 'group') to avoid duplication
    const rows = attTableBody.querySelectorAll('tr.group');
    const newData = [];
    rows.forEach((row) => {
        const name = row.querySelector('td').innerText.trim();
        const heldInput = row.querySelector('input[data-field="held"]');
        const absentInput = row.querySelector('input[data-field="absent"]');

        newData.push({
            name: name,
            held: parseInt(heldInput.value) || 0,
            absent: parseInt(absentInput.value) || 0
        });
    });
    return newData;
}

function updateAttendanceCalculations(providedData = null) {
    const data = providedData || getCurrentTableData();
    let totalHeld = 0;
    let totalAbsent = 0;

    // Update row percentages
    data.forEach((s, i) => {
        totalHeld += s.held;
        totalAbsent += s.absent;

        const pct = s.held > 0 ? ((s.held - s.absent) / s.held) * 100 : 100;

        // Desktop Badge
        const pctEl = document.getElementById(`att-pct-${i}`);
        if (pctEl) {
            pctEl.textContent = pct.toFixed(1) + '%';
            if (pct >= 75) {
                pctEl.className = 'font-bold text-[#2DD4BF] text-sm'; // Teal-Green
            } else if (pct >= 65) {
                pctEl.className = 'font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded text-xs';
            } else {
                pctEl.className = 'font-bold text-red-500 bg-red-50 px-2 py-1 rounded text-xs';
            }
        }

        // Mobile Badge
        const mobPctEl = document.getElementById(`att-pct-mobile-${i}`);
        if (mobPctEl) {
            mobPctEl.textContent = pct.toFixed(1) + '%';
            if (pct >= 75) {
                mobPctEl.className = 'font-bold text-[#2DD4BF] text-sm px-2 py-1 rounded theme-bg';
            } else if (pct >= 65) {
                mobPctEl.className = 'font-bold text-orange-500 text-sm px-2 py-1 rounded bg-orange-50';
            } else {
                mobPctEl.className = 'font-bold text-red-500 text-sm px-2 py-1 rounded bg-red-50';
            }
        }
    });

    if (!providedData) {
        saveAttendanceData(data);
    }

    // Overall Stats
    const overallPct = totalHeld > 0 ? ((totalHeld - totalAbsent) / totalHeld) * 100 : 0;
    overallPctEl.textContent = overallPct.toFixed(2) + '%';
    overallFracEl.textContent = `${totalHeld - totalAbsent} / ${totalHeld} Classes`;

    // Buffer Calculation (75% Rule)
    const buffer = Math.floor(0.25 * totalHeld - totalAbsent);

    if (totalHeld === 0) {
        bufferValEl.textContent = "-";
        bufferValEl.className = "text-5xl font-black text-slate-300";
        bufferTitleEl.textContent = "Buffer Status";
        bufferTitleEl.className = "text-slate-400 text-xs font-bold uppercase tracking-widest mb-1";
        bufferSubEl.textContent = "No data";
    } else if (buffer >= 0) {
        // Safe
        bufferValEl.textContent = buffer;
        bufferValEl.className = "text-5xl font-black text-[#2DD4BF]";
        bufferTitleEl.textContent = "Bunks Available";
        bufferTitleEl.className = "text-xs font-bold text-[#2DD4BF] uppercase tracking-widest mb-1";
        bufferSubEl.textContent = "to stay above 75%";
    } else {
        // Danger
        const needed = Math.ceil(totalAbsent / 0.25 - totalHeld);
        bufferValEl.textContent = needed;
        bufferValEl.className = "text-5xl font-black text-rose-500";
        bufferTitleEl.textContent = "Classes Needed";
        bufferTitleEl.className = "text-xs font-bold text-rose-600 uppercase tracking-widest mb-1";
        bufferSubEl.textContent = "to recover to 75%";
    }

    calculateFutureBuffer();
}

function resetStats() {
    overallPctEl.textContent = "0.00%";
    overallFracEl.textContent = "0 / 0 Classes";
    bufferValEl.textContent = "-";
    bufferTitleEl.textContent = "Buffer Status";
    bufferSubEl.textContent = "Calculated";
}

function calculateFutureBuffer() {
    const extraClasses = parseInt(futureInput.value) || 0;

    // If table is hidden/empty, don't calc
    if (attTableContainer.classList.contains('hidden')) {
        futureResultEl.textContent = "...";
        return;
    }

    const data = getCurrentTableData();
    // Current totals
    const curHeld = data.reduce((a, b) => a + b.held, 0);
    const curAbsent = data.reduce((a, b) => a + b.absent, 0);

    // New total held
    const newHeld = curHeld + extraClasses;

    // Buffer logic: (Held * 0.25) - Absent
    // New Buffer: ( (CurrentHeld + FutureHeld) * 0.25 ) - CurrentAbsent
    const fBuf = Math.floor(0.25 * newHeld - curAbsent);

    if (extraClasses > 0) {
        if (fBuf >= 0) {
            futureResultEl.textContent = `${fBuf} Bunks`;
            futureResultEl.className = "ml-2 px-3 py-1 bg-emerald-100 text-emerald-700 font-bold rounded-lg border border-emerald-200 text-sm";
        } else {
            futureResultEl.textContent = `${Math.abs(fBuf)} Classes Still Needed`;
            futureResultEl.className = "ml-2 px-3 py-1 bg-rose-100 text-rose-700 font-bold rounded-lg border border-rose-200 text-xs";
        }
    } else {
        futureResultEl.textContent = "...";
        futureResultEl.className = "ml-2 text-slate-400 font-bold text-sm";
    }
}

function resetAttendanceData() {
    if (confirm("Reset attendance data for this semester? This cannot be undone.")) {
        const key = getStorageKey();
        if (key) localStorage.removeItem(key);
        renderAttendanceTable();
    }
}
