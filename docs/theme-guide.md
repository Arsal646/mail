# Theme Design System

## Overview
This document outlines the enhanced theme system for the Temporary Email Service application. The theme focuses on modern design principles with improved accessibility, performance, and user experience.

## Color Palette

### Primary Colors
- `--primary-50`: #eff6ff (Very light blue)
- `--primary-100`: #dbeafe (Light blue)
- `--primary-200`: #bfdbfe (Lighter blue)
- `--primary-300`: #93c5fd (Light blue)
- `--primary-400`: #60a5fa (Medium light blue)
- `--primary-500`: #3b82f6 (Primary blue)
- `--primary-600`: #2563eb (Medium blue)
- `--primary-700`: #1d4ed8 (Dark blue)
- `--primary-800`: #1e40af (Darker blue)
- `--primary-900`: #1e3a8a (Darkest blue)

### Neutral Colors
- `--neutral-50`: #f8fafc (Very light gray)
- `--neutral-100`: #f1f5f9 (Light gray)
- `--neutral-200`: #e2e8f0 (Lighter gray)
- `--neutral-300`: #cbd5e1 (Light gray)
- `--neutral-400`: #94a3b8 (Medium light gray)
- `--neutral-500`: #64748b (Medium gray)
- `--neutral-600`: #475569 (Medium dark gray)
- `--neutral-700`: #334155 (Dark gray)
- `--neutral-800`: #1e293b (Darker gray)
- `--neutral-900`: #0f172a (Darkest gray)

### Semantic Colors
- Success: `--success-50`, `--success-500`, `--success-600`
- Warning: `--warning-50`, `--warning-500`, `--warning-600`
- Error: `--error-50`, `--error-500`, `--error-600`

## Typography

### Font Families
- **Primary**: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
- **Monospace**: 'JetBrains Mono', 'Fira Code', Consolas, monospace

### Font Weights
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700
- Extrabold: 800

## Spacing & Layout

### Border Radius
- `--border-radius-sm`: 6px
- `--border-radius-md`: 8px
- `--border-radius-lg`: 12px
- `--border-radius-xl`: 16px
- `--border-radius-2xl`: 20px

### Shadows
- `--shadow-sm`: Subtle shadow for small elements
- `--shadow-md`: Medium shadow for cards
- `--shadow-lg`: Large shadow for elevated elements
- `--shadow-xl`: Extra large shadow for modals/overlays

## Animations & Transitions

### Timing Functions
- `--transition-fast`: 150ms cubic-bezier(0.4, 0, 0.2, 1)
- `--transition-normal`: 250ms cubic-bezier(0.4, 0, 0.2, 1)
- `--transition-slow`: 350ms cubic-bezier(0.4, 0, 0.2, 1)

### Animation Classes
- `.animate-fade-in`: Fade in animation
- `.animate-slide-up`: Slide up animation
- `.animate-scale-in`: Scale in animation

## Component Patterns

### Cards
```css
.content-section {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid var(--neutral-200);
  border-radius: var(--border-radius-2xl);
  padding: 2rem;
  box-shadow: var(--shadow-lg);
  transition: all var(--transition-normal);
}
```

### Buttons
- Use consistent padding and border radius
- Implement hover states with transform and shadow changes
- Include focus-visible styles for accessibility

### Navigation
- Glass morphism effect with backdrop-filter
- Smooth transitions between states
- Clear active state indicators

## Accessibility

### Focus Management
- All interactive elements have visible focus indicators
- Focus indicators use primary color with 2px outline
- Skip links provided for keyboard navigation

### Color Contrast
- All text meets WCAG AA standards
- Interactive elements have sufficient contrast ratios
- Color is not the only means of conveying information

## Performance Considerations

### CSS Custom Properties
- Centralized color management
- Easy theme switching capability
- Reduced CSS bundle size through reuse

### Animations
- Use transform and opacity for smooth animations
- Implement will-change property where appropriate
- Respect user's motion preferences

## Usage Guidelines

### Do's
- Use the defined color palette consistently
- Implement hover states for interactive elements
- Use appropriate shadow levels for visual hierarchy
- Follow the established spacing system

### Don'ts
- Don't use hardcoded colors outside the palette
- Don't create overly complex animations
- Don't ignore accessibility requirements
- Don't mix different design patterns inconsistently

## Browser Support
- Modern browsers with CSS custom properties support
- Graceful degradation for older browsers
- Backdrop-filter fallbacks where needed