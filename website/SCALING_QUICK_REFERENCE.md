# Quick Reference: Responsive Scaling System

## What Was Added

1. **CSS Custom Properties** (in `src/index.css`)
   - Responsive font scaling via `--size-font`
   - Responsive container sizing via `--size-container`
   - Automatic media query adjustments for each breakpoint

2. **Body Font Size** (in `src/index.css`)
   - Added `font-size: var(--size-font)` to body element
   - All text now scales automatically

3. **Tailwind Container Utilities** (in `tailwind.config.js`)
   - `.container` - Full width responsive container
   - `.container.medium` - 85% of container width
   - `.container.small` - 70% of container width

## Quick Usage

### Basic Container
```tsx
<div className="container">
  <h1>Full width responsive container</h1>
</div>
```

### Responsive Typography (via em units)
```tsx
<h1 style={{ fontSize: '3em' }}>
  Scales with viewport automatically
</h1>
```

### Responsive Spacing
```tsx
<div style={{ padding: 'calc(var(--size-font) * 1.5)' }}>
  Padding scales with viewport
</div>
```

## Design Specifications

| Screen | Ideal Size | Min | Max |
|--------|-----------|-----|-----|
| Desktop | 1440px | 992px | 1920px |
| Tablet | 834px | 768px | 991px |
| Mobile Landscape | 550px | 480px | 767px |
| Mobile Portrait | 390px | 320px | 479px |

## CSS Variables Available

- `--size-font` - Current font size
- `--size-container` - Current container width
- `--size-unit` - Base unit (16)
- `--size-container-ideal` - Design width
- `--size-container-min` - Minimum width
- `--size-container-max` - Maximum width

## Files Modified

- ✅ `src/index.css` - Added scaling system CSS & body font-size
- ✅ `tailwind.config.js` - Added container utilities

## Next Steps

1. Use `.container` class for main content wrappers
2. Use `em` units for responsive typography and spacing
3. Test at different viewport sizes
4. Adjust design sizes in variables if needed (see [SCALING_SYSTEM.md](./SCALING_SYSTEM.md))

## Documentation

For detailed documentation, see [SCALING_SYSTEM.md](./SCALING_SYSTEM.md)
