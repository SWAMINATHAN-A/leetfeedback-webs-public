# Lenis Smooth Scroll Integration

Lenis is integrated into LeetFeedback for smooth, performant scrolling. It works alongside the existing anime.js smooth scroll utilities.

## Installation

Lenis is already installed via `pnpm add lenis`.

## Setup

The `LenisProvider` is already wrapped in your App.tsx:

```tsx
<LenisProvider>
  <Router>
    <AppContent />
  </Router>
</LenisProvider>
```

## Basic Usage

### Using the Enhanced Smooth Scroll Functions

The easiest way to use Lenis is through the enhanced scroll utilities:

```tsx
import { smoothScrollToEnhanced, smoothScrollToElementEnhanced } from '@/utils/lenisUtils';

// Scroll to a specific position
smoothScrollToEnhanced(1000, 1000); // Scroll to 1000px with 1000ms duration

// Scroll to an element
smoothScrollToElementEnhanced('#target-section', 800);
```

### Using the Lenis Hook

For more control, use the `useLenis` hook in components:

```tsx
import { useLenis } from '@/hooks/useLenis';

function MyComponent() {
  const lenis = useLenis();

  return (
    <button onClick={() => {
      if (lenis) {
        lenis.scrollTo(1000, { duration: 1 });
      }
    }}>
      Scroll Down
    </button>
  );
}
```

### Using the Global Lenis Instance

Lenis is exposed globally on the window object:

```tsx
const lenis = (window as any).lenis;
if (lenis) {
  lenis.scrollTo('#my-element', { duration: 1 });
}
```

## Advanced Features

### Pause/Resume Scrolling

Useful for modals or overlays:

```tsx
import { pauseLenis, resumeLenis } from '@/hooks/useLenis';

// When opening a modal
pauseLenis();

// When closing the modal
resumeLenis();
```

### Using data-lenis-prevent Attribute

For nested scrollable elements (modals with internal scroll), add this attribute:

```tsx
<div data-lenis-prevent>
  <div style={{ overflow: 'scroll', height: '400px' }}>
    {/* This element will scroll normally, not affected by Lenis */}
  </div>
</div>
```

### Listening to Scroll Events

```tsx
const lenis = useLenis();

useEffect(() => {
  if (!lenis) return;

  const handleScroll = ({ velocity, direction, progress }: any) => {
    console.log('Scroll:', { velocity, direction, progress });
  };

  lenis.on('scroll', handleScroll);

  return () => {
    lenis.off('scroll', handleScroll);
  };
}, [lenis]);
```

## Configuration

Customize Lenis behavior via the LenisProvider:

```tsx
<LenisProvider 
  options={{
    wheelMultiplier: 1,
    smoothWheel: true,
    smoothTouch: true,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    lerp: 0.1,
    duration: 1.2,
  }}
>
  {/* your app */}
</LenisProvider>
```

### Common Options

- **wheelMultiplier** (default: 1): Scroll speed on mouse wheel
- **smoothWheel** (default: true): Enable smooth scrolling on wheel
- **smoothTouch** (default: false): Enable smooth scrolling on touch
- **lerp** (default: 0.1): Linear interpolation factor (0-1, lower = smoother)
- **duration** (default: 1.2): Scroll animation duration in seconds
- **easing**: Custom easing function

## Integration with Existing Code

Your existing `smoothScroll.ts` functions continue to work. The new `lenisUtils.ts` provides enhanced versions that:

1. Use Lenis when available
2. Fall back to anime.js if Lenis isn't initialized
3. Maintain API compatibility

You can update existing code gradually:

```tsx
// Old way (still works)
import { smoothScrollTo } from '@/utils/smoothScroll';
smoothScrollTo(1000);

// New way (uses Lenis with fallback)
import { smoothScrollToEnhanced } from '@/utils/lenisUtils';
smoothScrollToEnhanced(1000);
```

## Performance Tips

- Lenis with `autoRaf: true` handles RAF automatically
- Use `data-lenis-prevent` for nested scrollable elements
- For modals, use `pauseLenis()`/`resumeLenis()` to prevent scroll interference

## TypeScript Support

Full TypeScript support included. Types are inferred from Lenis library:

```tsx
import Lenis from 'lenis';

const lenis = (window as any).lenis as Lenis | undefined;
```

## Browser Support

Lenis supports all modern browsers. Check [Lenis GitHub](https://github.com/darkroom-engineering/lenis) for detailed browser support.

## Resources

- [Lenis Documentation](https://github.com/darkroom-engineering/lenis)
- [Lenis GitHub](https://github.com/darkroom-engineering/lenis)
- Local utilities: `src/hooks/useLenis.ts`, `src/contexts/LenisContext.tsx`, `src/utils/lenisUtils.ts`
