# Responsive Scaling System

A fluid, responsive typography and container sizing system based on the Osmo scaling methodology. This system automatically scales fonts and container sizes based on viewport size and design specifications.

## Overview

The scaling system uses CSS custom properties to create a mathematical relationship between viewport width and font sizes. Instead of fixed breakpoints, it uses `clamp()` to smoothly scale typography across all screen sizes.

## How It Works

The system calculates a scaling factor based on:
- **Screen size in your design** (`--size-container-ideal`)
- **Base font size** (`--size-unit`)
- **Current viewport width** (`--size-container`)

### Formula
```
--size-font = (current viewport width) / (ideal design width) * base font size
```

This ensures typography scales proportionally with the screen size.

## Breakpoints & Values

### Desktop (≥992px)
- Ideal screen size: 1440px
- Container min: 992px
- Container max: 1920px

### Tablet (768px - 991px)
- Ideal screen size: 834px
- Container min: 768px
- Container max: 991px

### Mobile Landscape (480px - 767px)
- Ideal screen size: 550px
- Container min: 480px
- Container max: 767px

### Mobile Portrait (≤479px)
- Ideal screen size: 390px
- Container min: 320px
- Container max: 479px

## CSS Custom Properties

All variables are defined in `src/index.css`:

```css
:root {
  --size-unit: 16;                    /* Base font size in px */
  --size-container-ideal: 1440;       /* Design viewport width */
  --size-container-min: 992px;        /* Minimum container width */
  --size-container-max: 1920px;       /* Maximum container width */
  --size-container: clamp(...);       /* Current container width */
  --size-font: calc(...);             /* Current font size */
}
```

## Usage

### Responsive Font Sizing

The body element automatically uses the scaling system:

```css
body {
  font-size: var(--size-font);
}
```

This means all text scales responsively by default. Use `em` or `rem` units for relative sizing:

```tsx
<h1 style={{ fontSize: '2em' }}>Large Heading</h1>
<p style={{ fontSize: '0.875em' }}>Small text</p>
```

### Container Utilities

Use the container utility classes for responsive layouts:

#### `.container`
Full-width container that respects the scaling system.

```tsx
<div className="container">
  {/* Max width: 992px-1920px depending on viewport */}
</div>
```

#### `.container.medium`
85% of the container width.

```tsx
<div className="container medium">
  {/* Max width: ~840px-1630px depending on viewport */}
</div>
```

#### `.container.small`
70% of the container width.

```tsx
<div className="container small">
  {/* Max width: ~694px-1344px depending on viewport */}
</div>
```

### Manual Access

Access the CSS variables directly in your components:

```tsx
import styled from 'styled-components';

const ResponsiveBox = styled.div`
  max-width: var(--size-container);
  font-size: var(--size-font);
  padding: calc(var(--size-font) * 1.5);
`;
```

Or in inline styles:

```tsx
<div style={{ maxWidth: 'var(--size-container)' }}>
  Responsive container
</div>
```

## Examples

### Example 1: Responsive Typography

```tsx
function Hero() {
  return (
    <section className="container py-12">
      <h1 style={{ fontSize: '3em' }}>Responsive Heading</h1>
      <p style={{ fontSize: '1.125em', marginTop: '1em' }}>
        This text scales automatically with the viewport
      </p>
    </section>
  );
}
```

On different viewports:
- Desktop (1440px): Heading = 48px, Paragraph = 18px
- Tablet (834px): Heading ≈ 28px, Paragraph ≈ 10.6px
- Mobile (390px): Heading ≈ 13.3px, Paragraph ≈ 5px

### Example 2: Responsive Spacing

```tsx
function Card() {
  return (
    <div style={{
      padding: 'calc(var(--size-font) * 1.5)',
      gap: 'calc(var(--size-font) * 0.5)',
    }}>
      Card with responsive padding
    </div>
  );
}
```

### Example 3: Customizing for Smaller Container

```tsx
function WideContent() {
  return (
    <div className="container medium">
      <div className="grid grid-cols-2 gap-4">
        {/* More constrained width for readability */}
      </div>
    </div>
  );
}
```

## Customization

### Adjusting Design Size

To change the ideal design width:

1. Open `src/index.css`
2. Find the `:root` section
3. Modify `--size-container-ideal`:

```css
:root {
  --size-container-ideal: 1600; /* Changed from 1440 */
}
```

### Adjusting Base Font Size

To change the base font size:

```css
:root {
  --size-unit: 18; /* Changed from 16 */
}
```

### Adjusting Min/Max Sizes

```css
:root {
  --size-container-min: 1024px;  /* Minimum width before scaling stops */
  --size-container-max: 2560px;  /* Maximum width before scaling stops */
}
```

## Best Practices

1. **Use `em` for relative sizing**: Always use `em` or multiples of `var(--size-font)` for spacing and sizing
2. **Avoid fixed pixels**: Minimize hard-coded pixel values for responsive designs
3. **Use container classes**: Leverage `.container`, `.container.medium`, `.container.small` for standard layouts
4. **Test across viewports**: Check your designs at different breakpoints to ensure scaling works as expected
5. **Use Tailwind utilities**: Combine container classes with Tailwind utilities for flexibility

```tsx
// Good: Responsive with em units
<h1 style={{ fontSize: '2.5em' }}>Heading</h1>

// Avoid: Fixed pixels
<h1 style={{ fontSize: '40px' }}>Heading</h1>
```

## CSS Variables Reference

| Variable | Purpose | Example |
|----------|---------|---------|
| `--size-unit` | Base font size | `16` (px) |
| `--size-container-ideal` | Design viewport width | `1440` (px) |
| `--size-container-min` | Minimum container width | `992px` |
| `--size-container-max` | Maximum container width | `1920px` |
| `--size-container` | Current responsive container width | `clamp(992px, 100vw, 1920px)` |
| `--size-font` | Current responsive font size | `calc(...)` |

## Resources

- [Osmo Scaling System](https://osmo.supply/)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [CSS clamp() function](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp)
- [REM/EM Units](https://www.w3schools.com/cssref/css_units.asp)

## Files Modified

- `src/index.css` - Added scaling system CSS and body font-size
- `tailwind.config.js` - Added container utility classes
