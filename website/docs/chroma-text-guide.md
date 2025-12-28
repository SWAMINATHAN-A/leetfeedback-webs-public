# ChromaText Animation Guide

A simple guide on how to apply the colorful text reveal animation to any text element.

## Quick Usage

### 1. Import the component
```tsx
import { ChromaText } from "./ui/textRenderAppear";
```

### 2. Use the VisibleChromaText wrapper (for scroll-triggered animation)
```tsx
// Already defined in Features.tsx - copy this component for use elsewhere
const VisibleChromaText: React.FC<{
  id: string;
  className?: string;
  delay?: number;
  duration?: number;
  children: React.ReactNode;
}> = ({ id, className, delay, duration, children }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  if (!isVisible) {
    return <span ref={ref} className={className} style={{ opacity: 0 }}>{children}</span>;
  }

  return (
    <ChromaText id={id} className={className} delay={delay} duration={duration}>
      {children}
    </ChromaText>
  );
};
```

### 3. Apply to your text
```tsx
<VisibleChromaText id="unique-id" delay={0.3} duration={1.2} className="font-light">
  Your animated text here
</VisibleChromaText>
```

### 4. Add CSS gradient in `index.css`
```css
/* Light mode */
[data-chroma-id="unique-id"] {
    background-image: linear-gradient(
        90deg,
        rgb(0, 0, 0) 0px,
        rgb(0, 0, 0) 33.33%,
        rgb(198, 121, 196) 40%,
        rgb(250, 61, 29) 47%,
        rgb(255, 176, 5) 54%,
        transparent 66.67%,
        transparent
    );
    animation-delay: 0.3s;
    animation-duration: 1.2s;
}

/* Dark mode */
.dark [data-chroma-id="unique-id"] {
    background-image: linear-gradient(
        90deg,
        rgb(255, 255, 255) 0px,
        rgb(255, 255, 255) 33.33%,
        rgb(198, 121, 196) 40%,
        rgb(250, 61, 29) 47%,
        rgb(255, 176, 5) 54%,
        transparent 66.67%,
        transparent
    );
}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `id` | string | required | Unique ID for CSS targeting |
| `delay` | number | 0.1 | Delay before animation starts (seconds) |
| `duration` | number | 0.9 | Animation duration (seconds) |
| `className` | string | '' | Additional CSS classes (use `font-light` for thin text) |

## Tips

- **Unique IDs**: Each element needs a unique `id` for its CSS gradient
- **Thin text**: Add `font-light` class for lighter weight
- **Custom colors**: Modify the gradient colors in CSS to match your design
- **Dark mode**: Always include both light and dark mode gradient styles

## Current Usage Examples

| ID | Text | Location |
|----|------|----------|
| `practice-progress` | "practice into progress" | Features.tsx |
| `happy-users` | "Happy" | Features.tsx |
| `spaced-repetition` | "Spaced repetition for better memory retention" | Features.tsx |
| `beyond-basics` | "BEYOND BASICS" | Features.tsx |
| `showcases-growth` | "showcases your growth to employers" | Features.tsx |
| `auto-background` | "everything happens automatically in the background" | HowItWorks.tsx |
| `works-for-you` | "Choose the plan that works for you" | Pricing.tsx |
| `faq-title` | "Frequently Asked Questions" | Pricing.tsx |
| `everything-know` | "Everything you need to know" | Pricing.tsx |
| `shape-future` | "shape the future" | Pricing.tsx |
