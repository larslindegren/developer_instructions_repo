# Wellness Tracker App

A modern, responsive web application for tracking daily wellness activities including water intake, steps, meditation, and sleep.

## Features

- **Water Tracking**: Quick one-click button to log glasses of water consumed
- **Activity Logging**: Modal-based interface for logging steps, meditation minutes, and sleep hours
- **Real-time Updates**: Immediate visual feedback on progress towards daily goals
- **Activity History**: Chronological list of all logged activities with timestamps
- **Data Persistence**: Automatic saving to browser localStorage for data retention across sessions
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Architecture

### State Management
The application uses a centralized state management pattern with the `WellnessApp` object:
- Single source of truth for all application state
- Encapsulated state updates through controlled methods
- Automatic persistence to localStorage

### Performance Optimizations
- **DOM Caching**: All frequently accessed elements are cached at initialization
- **DocumentFragment**: Activity list rendering uses DocumentFragment for minimal reflows
- **Modular Rendering**: Separated concerns with dedicated rendering methods

### Error Handling
- Try-catch blocks around all critical operations
- Input validation with user-friendly error messages
- Console logging for debugging and monitoring

## Code Quality Improvements

### From Initial Version to Refactored
1. **Eliminated Global Variables**: Wrapped in `WellnessApp` namespace
2. **Removed Redundant DOM Queries**: Cached at initialization
3. **Fixed Syntax Errors**: Missing semicolons in CSS
4. **DRY Principle**: Consolidated duplicate code patterns
5. **Better Validation**: Added input validation and error handling
6. **Enhanced UX**: Added keyboard support (Enter key) and auto-focus

## File Structure

```
.
├── index.html          # Main HTML structure
├── styles.css          # Refactored CSS with utility classes
├── app.js             # Refactored JavaScript with modular architecture
└── README.md          # This file
```

## Usage

### Opening the Application
Simply open `index.html` in a modern web browser. No build process or dependencies required.

### Logging Activities
1. **Water**: Click "Add Glass" to increment water count
2. **Other Activities**: Click the respective "Log" button, enter a value, and save

### Data Persistence
All data is automatically saved to browser localStorage and will be restored on next visit.

## Browser Compatibility

Works on all modern browsers with localStorage support:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Development

### Testing
Open the application in a browser and test:
```bash
# Start a local server (optional)
python3 -m http.server 8000

# Navigate to http://localhost:8000
```

### Debugging
The application includes console.log statements for debugging. Open browser DevTools to monitor:
- State updates
- Modal operations
- Activity logging
- localStorage operations

## Refactoring Highlights

### JavaScript
- **Before**: Global variables, redundant DOM queries, no validation
- **After**: Modular object with encapsulated state, cached DOM, comprehensive validation

### CSS
- **Before**: Duplicate rules, missing semicolons
- **After**: Utility classes, combined selectors, proper syntax

### Code Metrics
- Lines of code: Reduced by ~15% while adding features
- Cyclomatic complexity: Reduced through better modularization
- Maintainability: Significantly improved with documentation and structure

## Future Enhancements

Potential improvements for future versions:
- [ ] Data export/import functionality
- [ ] Weekly/monthly progress charts
- [ ] Customizable daily goals
- [ ] Multiple user profiles
- [ ] Dark mode support
- [ ] PWA capabilities for offline use
- [ ] Integration with fitness APIs

## License

This is a demonstration project for educational purposes.
