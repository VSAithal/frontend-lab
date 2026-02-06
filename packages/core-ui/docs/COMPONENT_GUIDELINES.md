# Component Guidelines

These guidelines define how UI components are built in **core-ui** — a personal design system built with **React**, **TypeScript**, **Tailwind CSS**, and **Radix UI primitives**.

The goal is to create **predictable, extensible, accessible, and composable components** that can be reused across all projects.

---

## Goals

Components should be:

- Flexible and easy to customize
- Extensible through native / Radix props
- Accessible by default
- Composable and easy to reason about
- Stable and safe to evolve over time

---

## Non-Goals

- Making every component infinitely configurable
- Exposing props without a real use-case
- Replacing Radix UI behavior or accessibility
- Using advanced patterns prematurely

---

## Quick Checklist

Before shipping a component:

- [ ] Uses `children` for content
- [ ] Extends native or Radix primitive props
- [ ] Spreads `...restProps`
- [ ] Merges `className`
- [ ] Provides sensible defaults
- [ ] Uses composition over configuration

---

## Core Rules

### 1. Use `children` for Content

If a component renders visible content, pass it via `children`.

```tsx
<Button>
  <Icon />
  <span>Submit</span>
</Button>
```

Avoid `label`, `text`, or `content` props unless strictly necessary.

---

### 2. Extend the Underlying Element or Primitive

Components should extend the props of the element or Radix primitive they wrap.

```ts
React.ComponentPropsWithoutRef<'button'>
React.ComponentPropsWithoutRef<typeof RadixPrimitive>
```

Use `Omit` only when redefining behavior.

---

### 3. Destructure Explicitly, Spread the Rest

Explicitly destructure handled props.  
Forward all remaining props to the underlying element.

```tsx
const Button = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <button className={cn(base, className)} {...rest}>
      {children}
    </button>
  )
}
```

---

### 4. Always Merge `className`

Components own base styles but must allow overrides.

```ts
cn(baseClasses, variantClasses, className)
```

Order matters: base → variants → consumer.

---

### 5. Provide Sensible Defaults

Add safe defaults to prevent common issues.

- `<button>` → `type="button"`
- External links → `rel="noopener noreferrer"`

Defaults must be explicit and overridable.

---

### 6. Prefer Composition Over Configuration

Avoid large prop surfaces that describe layout or structure.

❌ Many boolean or layout props  
✅ Small primitives composed together

---

## Radix UI Usage

- Radix UI provides behavior and accessibility
- Do not re-implement interaction logic
- Wrap Radix primitives to:
  - Apply styling
  - Normalize APIs
  - Add safe defaults
- Expose Radix props unless intentionally restricted

---

## Advanced Patterns (Use Sparingly)

Use these only when real consumer needs arise.

### Polymorphic Components

Use polymorphism only when the visual identity stays the same but the HTML tag must vary.

Do **not** make components polymorphic by default.

---

### Composite Components

For components built from multiple primitives:

- Expose the primary primitive directly
- Prefer composition over large prop APIs

Choose the simplest pattern that solves the problem.

| Need                         | Pattern             |
| ---------------------------- | ------------------- |
| Replace one internal piece   | Slots               |
| Pass props to known children | Prop tunneling      |
| Full layout control          | Compound components |

---

## Canonical Example

```tsx
type ButtonProps =
  React.ComponentPropsWithoutRef<'button'> & {
    variant?: 'primary' | 'secondary'
  }

export const Button = ({
  children,
  variant = 'primary',
  className,
  type = 'button',
  ...rest
}: ButtonProps) => {
  const base = 'ds-inline-flex ds-items-center ds-rounded ds-px-4 ds-py-2'
  const variants = {
    primary: 'ds-bg-blue-600 ds-text-white',
    secondary: 'ds-bg-gray-200 ds-text-gray-800',
  }

  return (
    <button
      type={type}
      className={cn(base, variants[variant], className)}
      {...rest}
    >
      {children}
    </button>
  )
}
```

---

## Final Principle

> Start with the smallest API that solves most use-cases.  
> Add power only when real usage demands it.
