# View Transitions for Next.js App Router

A lightweight, zero-dependency solution for adding smooth view transitions to your Next.js 15 app using the native View Transitions API.

## 📦 What's Included

- **`useViewTransition`** - Core hook for basic view transitions
- **`useViewTransitionRouter`** - Hook for programmatic navigation with transitions
- **`ViewTransitionLink`** - Drop-in Link replacement with automatic transitions
- **`ViewTransitionProvider`** - Optional provider for app-wide transitions

## 🚀 Quick Start

### 1. Basic Usage

```tsx
import { useViewTransition } from "@/hooks/useViewTransition";
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const withTransition = useViewTransition();

  return (
    <div>
      <h1 style={{ viewTransitionName: "count" }}>{count}</h1>
      <button onClick={() => withTransition(() => setCount(count + 1))}>
        Increment
      </button>
    </div>
  );
}
```

### 2. Navigation with Links

```tsx
import ViewTransitionLink from "@/components/ViewTransitionLink";

function Navigation() {
  return (
    <nav>
      <ViewTransitionLink href="/">Home</ViewTransitionLink>
      <ViewTransitionLink href="/about">About</ViewTransitionLink>
      <ViewTransitionLink href="/contact">Contact</ViewTransitionLink>
    </nav>
  );
}
```

### 3. Programmatic Navigation

```tsx
import { useViewTransitionRouter } from "@/hooks/useViewTransitionRouter";

function LoginButton() {
  const router = useViewTransitionRouter();

  const handleLogin = async () => {
    await loginUser();
    router.push("/dashboard"); // Navigates with transition
  };

  return <button onClick={handleLogin}>Login</button>;
}
```

### 4. App-Wide Setup (Optional)

Add to your root layout for consistent behavior:

```tsx
// app/layout.tsx
import ViewTransitionProvider from "@/components/ViewTransitionProvider";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ViewTransitionProvider>
          {children}
        </ViewTransitionProvider>
      </body>
    </html>
  );
}
```

## 🎨 Customizing Transitions

Add CSS to control the animation:

```css
/* globals.css */

/* Fade transition (default) */
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 0.3s;
}

/* Slide transition for specific elements */
::view-transition-old(hero),
::view-transition-new(hero) {
  animation-duration: 0.5s;
}

::view-transition-old(hero) {
  animation-name: slideOut;
}

::view-transition-new(hero) {
  animation-name: slideIn;
}

@keyframes slideOut {
  to {
    transform: translateX(-100%);
  }
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
}
```

## 🎯 Naming Elements for Transitions

Add `viewTransitionName` to elements you want to animate:

```tsx
<div style={{ viewTransitionName: "hero-image" }}>
  <img src="/hero.jpg" alt="Hero" />
</div>

<h1 style={{ viewTransitionName: "page-title" }}>
  Welcome
</h1>
```

Or use Tailwind CSS with arbitrary values:

```tsx
<div className="[view-transition-name:hero-image]">
  <img src="/hero.jpg" alt="Hero" />
</div>
```

## 📊 API Reference

### `useViewTransition()`

Returns a function that wraps state updates with view transitions.

```tsx
const withTransition = useViewTransition();

withTransition(() => {
  // Your state updates here
  setState(newValue);
});
```

### `useViewTransitionRouter()`

Returns a router object with transition-enabled navigation methods.

```tsx
const router = useViewTransitionRouter();

router.push(href, options);      // Navigate to new route
router.replace(href, options);   // Replace current route
router.back();                   // Go back
router.forward();                // Go forward
router.refresh();                // Refresh current route
router.prefetch(href);           // Prefetch route (no transition)
```

### `ViewTransitionLink`

Props extend Next.js Link:

```tsx
<ViewTransitionLink
  href="/about"
  disableTransition={false}  // Disable transition for this link
  onClick={(e) => {}}        // Custom click handler
  prefetch={true}            // All Next.js Link props work
>
  Link Text
</ViewTransitionLink>
```

## 🌐 Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome/Edge | 111+ | ✅ Full |
| Safari | 18+ | ✅ Full |
| Firefox | 146+ | ✅ Full |

On unsupported browsers or older versions, navigation still works but transitions fall back to React's `startTransition` (instant updates).

## 💡 Best Practices

1. **Name your transitions** - Use `viewTransitionName` on elements you want to animate between pages

2. **Keep transitions fast** - 200-400ms is ideal for most transitions

3. **Test on real devices** - Transitions can behave differently on mobile

4. **Disable when needed** - Use `disableTransition` prop for external links or special cases

5. **Progressive enhancement** - The fallback ensures your app works everywhere

## 🆚 vs npm Packages

### Use This When:
- ✅ You need basic view transitions
- ✅ Bundle size matters (~0.5KB total)
- ✅ You want full control over the code
- ✅ Simple state updates and navigation
- ✅ You prefer ownership over convenience

### Use `use-view-transitions` When:
- ❌ You need Suspense integration
- ❌ Complex async workflows
- ❌ You want externally maintained code
- ❌ You need additional advanced features

## 🔧 TypeScript Support

All components and hooks are fully typed with TypeScript. No additional `@types` packages needed.

## 📝 License

Copy it, modify it, use it however you want. No attribution required.

## 🤝 Contributing

This is meant to be copied into your project. Feel free to modify it to suit your needs!

## 📚 Learn More

- [View Transitions API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)
- [React 19 - startTransition](https://react.dev/reference/react/startTransition)
- [Next.js App Router](https://nextjs.org/docs/app)
