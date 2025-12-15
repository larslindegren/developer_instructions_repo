// Wellness Tracker App - Needs Refactoring
// Issues: Poor state management, redundant DOM queries, no modularization

// Global state - poorly managed
var waterCount = 0;
var stepsCount = 0;
var meditationMinutes = 0;
var sleepHours = 0;
var activities = [];
var currentModalType = '';

// Water increment - redundant DOM query
function incrementWater() {
    waterCount = waterCount + 1;
    document.getElementById('water-value').textContent = waterCount + ' / 8';
    
    // Redundant activity logging
    var activity = {
        type: 'Water',
        value: '1 glass',
        timestamp: new Date()
    };
    activities.push(activity);
    
    // Redundant render call
    var activityList = document.getElementById('activity-list');
    renderActivities();
}

// Open modal - poor state management
function openModal(type) {
    currentModalType = type;
    var modal = document.getElementById('modal');
    modal.style.display = 'block';
    
    // Redundant DOM queries
    var title = document.getElementById('modal-title');
    var input = document.getElementById('activity-input');
    
    if (type == 'steps') {
        title.textContent = 'Log Steps';
        input.placeholder = 'Enter number of steps';
    } else if (type == 'meditation') {
        title.textContent = 'Log Meditation';
        input.placeholder = 'Enter minutes';
    } else if (type == 'sleep') {
        title.textContent = 'Log Sleep';
        input.placeholder = 'Enter hours';
    }
    
    input.value = '';
}

// Close modal - missing validation
function closeModal() {
    var modal = document.getElementById('modal');
    modal.style.display = 'none';
    currentModalType = '';
}

// Log activity - lots of redundancy
function logActivity() {
    var input = document.getElementById('activity-input');
    var value = parseInt(input.value);
    
    // Missing validation
    
    if (currentModalType == 'steps') {
        stepsCount = stepsCount + value;
        document.getElementById('steps-value').textContent = stepsCount.toLocaleString() + ' / 10,000';
        
        var activity = {
            type: 'Steps',
            value: value.toLocaleString() + ' steps',
            timestamp: new Date()
        };
        activities.push(activity);
    } else if (currentModalType == 'meditation') {
        meditationMinutes = meditationMinutes + value;
        document.getElementById('meditation-value').textContent = meditationMinutes + ' / 30';
        
        var activity = {
            type: 'Meditation',
            value: value + ' minutes',
            timestamp: new Date()
        };
        activities.push(activity);
    } else if (currentModalType == 'sleep') {
        sleepHours = sleepHours + value;
        document.getElementById('sleep-value').textContent = sleepHours + ' / 8';
        
        var activity = {
            type: 'Sleep',
            value: value + ' hours',
            timestamp: new Date()
        };
        activities.push(activity);
    }
    
    renderActivities();
    closeModal();
}

// Render activities - inefficient loop and DOM manipulation
function renderActivities() {
    var activityList = document.getElementById('activity-list');
    
    // Inefficient: clearing and rebuilding entire list
    activityList.innerHTML = '';
    
    if (activities.length == 0) {
        activityList.innerHTML = '<p class="empty-state">No activities logged yet. Start tracking your wellness!</p>';
        return;
    }
    
    // Inefficient loop with redundant DOM operations
    for (var i = activities.length - 1; i >= 0; i--) {
        var activity = activities[i];
        
        var activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        
        var typeSpan = document.createElement('span');
        typeSpan.className = 'activity-type';
        typeSpan.textContent = activity.type;
        
        var valueSpan = document.createElement('span');
        valueSpan.className = 'activity-value';
        valueSpan.textContent = activity.value;
        
        var timeSpan = document.createElement('span');
        timeSpan.className = 'activity-time';
        var hours = activity.timestamp.getHours();
        var minutes = activity.timestamp.getMinutes();
        timeSpan.textContent = hours + ':' + (minutes < 10 ? '0' : '') + minutes;
        
        activityItem.appendChild(typeSpan);
        activityItem.appendChild(valueSpan);
        activityItem.appendChild(timeSpan);
        
        activityList.appendChild(activityItem);
    }
}

// Close modal when clicking outside - missing proper event handling
window.onclick = function(event) {
    var modal = document.getElementById('modal');
    if (event.target == modal) {
        closeModal();
    }
}

// Missing: Error handling, proper initialization, state persistence
