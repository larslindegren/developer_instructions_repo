/**
 * Wellness Tracker App - Refactored Version
 * Enhanced with proper state management, modular rendering, and error handling
 */

// Application State Manager - Centralized state management
const WellnessApp = {
    // State object for better organization
    state: {
        water: 0,
        steps: 0,
        meditation: 0,
        sleep: 0,
        activities: [],
        currentModalType: ''
    },

    // Goals configuration
    goals: {
        water: 8,
        steps: 10000,
        meditation: 30,
        sleep: 8
    },

    // Cached DOM elements to avoid redundant queries
    dom: {},

    /**
     * Initialize the application
     * Cache DOM elements and set up event listeners
     */
    init() {
        try {
            // Cache frequently accessed DOM elements
            this.dom = {
                waterValue: document.getElementById('water-value'),
                stepsValue: document.getElementById('steps-value'),
                meditationValue: document.getElementById('meditation-value'),
                sleepValue: document.getElementById('sleep-value'),
                activityList: document.getElementById('activity-list'),
                modal: document.getElementById('modal'),
                modalTitle: document.getElementById('modal-title'),
                activityInput: document.getElementById('activity-input')
            };

            // Load persisted state from localStorage
            this.loadState();

            // Update UI with loaded state
            this.updateAllStats();
            this.renderActivities();

            console.log('Wellness App initialized successfully');
        } catch (error) {
            console.error('Failed to initialize app:', error);
        }
    },

    /**
     * Update a specific stat value
     * @param {string} type - The type of stat (water, steps, meditation, sleep)
     * @param {number} value - The value to add
     */
    updateStat(type, value) {
        try {
            if (!this.state.hasOwnProperty(type)) {
                throw new Error(`Invalid stat type: ${type}`);
            }

            this.state[type] += value;
            this.updateStatDisplay(type);
            this.addActivity(type, value);
            this.saveState();

            console.log(`Updated ${type}: ${this.state[type]}`);
        } catch (error) {
            console.error(`Error updating stat ${type}:`, error);
        }
    },

    /**
     * Update the display for a specific stat
     * @param {string} type - The type of stat to update
     */
    updateStatDisplay(type) {
        const element = this.dom[`${type}Value`];
        if (!element) {
            console.warn(`DOM element not found for ${type}`);
            return;
        }

        const current = this.state[type];
        const goal = this.goals[type];
        
        // Format display based on type
        const formattedValue = type === 'steps' ? current.toLocaleString() : current;
        const formattedGoal = type === 'steps' ? goal.toLocaleString() : goal;
        
        element.textContent = `${formattedValue} / ${formattedGoal}`;
    },

    /**
     * Update all stat displays
     */
    updateAllStats() {
        ['water', 'steps', 'meditation', 'sleep'].forEach(type => {
            this.updateStatDisplay(type);
        });
    },

    /**
     * Add an activity to the log
     * @param {string} type - Activity type
     * @param {number} value - Activity value
     */
    addActivity(type, value) {
        const units = {
            water: 'glass' + (value > 1 ? 'es' : ''),
            steps: 'steps',
            meditation: 'minutes',
            sleep: 'hours'
        };

        const activity = {
            type: type.charAt(0).toUpperCase() + type.slice(1),
            value: `${value.toLocaleString()} ${units[type]}`,
            timestamp: new Date()
        };

        this.state.activities.push(activity);
        this.renderActivities();
    },

    /**
     * Modal configuration for different activity types
     */
    modalConfig: {
        steps: {
            title: 'Log Steps',
            placeholder: 'Enter number of steps'
        },
        meditation: {
            title: 'Log Meditation',
            placeholder: 'Enter minutes'
        },
        sleep: {
            title: 'Log Sleep',
            placeholder: 'Enter hours'
        }
    },

    /**
     * Open modal for logging activity
     * @param {string} type - The type of activity to log
     */
    openModal(type) {
        try {
            if (!this.modalConfig[type]) {
                throw new Error(`Invalid modal type: ${type}`);
            }

            this.state.currentModalType = type;
            const config = this.modalConfig[type];

            this.dom.modalTitle.textContent = config.title;
            this.dom.activityInput.placeholder = config.placeholder;
            this.dom.activityInput.value = '';
            this.dom.modal.style.display = 'block';

            // Focus on input for better UX
            this.dom.activityInput.focus();

            console.log(`Opened modal for ${type}`);
        } catch (error) {
            console.error('Error opening modal:', error);
        }
    },

    /**
     * Close modal and reset state
     */
    closeModal() {
        try {
            this.dom.modal.style.display = 'none';
            this.state.currentModalType = '';
            this.dom.activityInput.value = '';

            console.log('Modal closed');
        } catch (error) {
            console.error('Error closing modal:', error);
        }
    },

    /**
     * Log activity from modal with validation
     */
    logActivity() {
        try {
            const value = parseInt(this.dom.activityInput.value, 10);

            // Validate input
            if (!this.state.currentModalType) {
                throw new Error('No modal type set');
            }

            if (isNaN(value) || value <= 0) {
                alert('Please enter a valid positive number');
                return;
            }

            // Update the appropriate stat
            this.updateStat(this.state.currentModalType, value);
            this.closeModal();

            console.log(`Logged ${this.state.currentModalType}: ${value}`);
        } catch (error) {
            console.error('Error logging activity:', error);
            alert('Failed to log activity. Please try again.');
        }
    },

    /**
     * Render activities list efficiently
     * Uses DocumentFragment to minimize reflows
     */
    renderActivities() {
        try {
            if (this.state.activities.length === 0) {
                this.dom.activityList.innerHTML = 
                    '<p class="empty-state">No activities logged yet. Start tracking your wellness!</p>';
                return;
            }

            // Use DocumentFragment for better performance
            const fragment = document.createDocumentFragment();

            // Render activities in reverse order (newest first)
            for (let i = this.state.activities.length - 1; i >= 0; i--) {
                const activity = this.state.activities[i];
                const activityElement = this.createActivityElement(activity);
                fragment.appendChild(activityElement);
            }

            // Single DOM update
            this.dom.activityList.innerHTML = '';
            this.dom.activityList.appendChild(fragment);
        } catch (error) {
            console.error('Error rendering activities:', error);
        }
    },

    /**
     * Create a single activity element
     * @param {Object} activity - Activity data
     * @returns {HTMLElement} Activity element
     */
    createActivityElement(activity) {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';

        // Create and append child elements
        const typeSpan = this.createElement('span', 'activity-type', activity.type);
        const valueSpan = this.createElement('span', 'activity-value', activity.value);
        const timeSpan = this.createElement('span', 'activity-time', this.formatTime(activity.timestamp));

        activityItem.appendChild(typeSpan);
        activityItem.appendChild(valueSpan);
        activityItem.appendChild(timeSpan);

        return activityItem;
    },

    /**
     * Helper to create an element with class and text
     * @param {string} tag - HTML tag name
     * @param {string} className - CSS class name
     * @param {string} text - Text content
     * @returns {HTMLElement} Created element
     */
    createElement(tag, className, text) {
        const element = document.createElement(tag);
        element.className = className;
        element.textContent = text;
        return element;
    },

    /**
     * Format timestamp to HH:MM
     * @param {Date} timestamp - Date object to format
     * @returns {string} Formatted time string
     */
    formatTime(timestamp) {
        const hours = timestamp.getHours();
        const minutes = timestamp.getMinutes();
        return `${hours}:${minutes.toString().padStart(2, '0')}`;
    },

    /**
     * Save state to localStorage for persistence
     */
    saveState() {
        try {
            const stateToSave = {
                water: this.state.water,
                steps: this.state.steps,
                meditation: this.state.meditation,
                sleep: this.state.sleep,
                activities: this.state.activities
            };
            localStorage.setItem('wellnessAppState', JSON.stringify(stateToSave));
            console.log('State saved to localStorage');
        } catch (error) {
            console.error('Error saving state:', error);
        }
    },

    /**
     * Load state from localStorage
     */
    loadState() {
        try {
            const savedState = localStorage.getItem('wellnessAppState');
            if (savedState) {
                const parsed = JSON.parse(savedState);
                
                // Restore numeric values
                this.state.water = parsed.water || 0;
                this.state.steps = parsed.steps || 0;
                this.state.meditation = parsed.meditation || 0;
                this.state.sleep = parsed.sleep || 0;
                
                // Restore activities with Date objects
                this.state.activities = (parsed.activities || []).map(activity => ({
                    ...activity,
                    timestamp: new Date(activity.timestamp)
                }));

                console.log('State loaded from localStorage');
            }
        } catch (error) {
            console.error('Error loading state:', error);
        }
    }
};

// Global convenience functions for inline onclick handlers
// These delegate to the WellnessApp object
function incrementWater() {
    WellnessApp.updateStat('water', 1);
}

function openModal(type) {
    WellnessApp.openModal(type);
}

function closeModal() {
    WellnessApp.closeModal();
}

function logActivity() {
    WellnessApp.logActivity();
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => WellnessApp.init());
} else {
    WellnessApp.init();
}

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === WellnessApp.dom.modal) {
        WellnessApp.closeModal();
    }
});

// Handle Enter key in modal input
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && WellnessApp.state.currentModalType) {
        WellnessApp.logActivity();
    }
});
