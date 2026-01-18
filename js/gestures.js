// Swipe Navigation Logic

let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

const TAB_ORDER = ['tab-attend', 'tab-calc', 'tab-plan', 'tab-conv'];

function initGestures() {
    const contentArea = document.querySelector('body'); // Listen on body for better coverage

    contentArea.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    contentArea.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });
}

function handleSwipe() {
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    // Thresholds
    const minSwipeDistance = 50;

    // Check 1: Must be primarily horizontal
    if (Math.abs(deltaX) < Math.abs(deltaY)) return;

    // Check 2: Must be long enough
    if (Math.abs(deltaX) < minSwipeDistance) return;

    // Determine Direction
    if (deltaX > 0) {
        // Swipe Right -> Previous Tab
        switchTabRelative(-1);
    } else {
        // Swipe Left -> Next Tab
        switchTabRelative(1);
    }
}

function switchTabRelative(direction) {
    // Find current active tab
    const activeTab = document.querySelector('.tab-content:not(.hidden)');
    if (!activeTab) return;

    const currentId = activeTab.id;
    const currentIndex = TAB_ORDER.indexOf(currentId);

    if (currentIndex === -1) return;

    let newIndex = currentIndex + direction;

    // Bounds check
    if (newIndex < 0) newIndex = 0; // Clamp start
    if (newIndex >= TAB_ORDER.length) newIndex = TAB_ORDER.length - 1; // Clamp end

    if (newIndex !== currentIndex) {
        const newTabId = TAB_ORDER[newIndex];
        switchTab(newTabId);

        // Hide hint if it exists
        const hint = document.getElementById('swipe-hint');
        if (hint) hint.classList.add('hidden');
    }
}
