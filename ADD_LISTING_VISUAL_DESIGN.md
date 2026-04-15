# 🎨 Add Listing Page — Visual Design Reference

## Page Layout Flow (Top to Bottom)

```
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│                    🟡 HERO SECTION                           │
│         Join Mpumalanga's Trusted Business Network          │
│                                                               │
│        [👉 Apply via Email]  [View Packages]               │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│          ✨ WHY PARTNER WITH LOWVELDHUB? ✨                 │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │      01      │  │      02      │  │      03      │      │
│  │ Unmatched    │  │ Verified     │  │ Real Business│      │
│  │ Visibility   │  │ Trust        │  │ Growth       │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│              💎 LISTING PACKAGES                             │
│         Choose the plan that fits your business goals       │
│                                                               │
│  (Package cards rendered with renderPackages())            │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│                 📊 HOW IT WORKS                              │
│                                                               │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐                   │
│  │  1   │  │  2   │  │  3   │  │  4   │                   │
│  │Apply │  │Review│  │Accept│  │Go    │                   │
│  │      │  │      │  │      │  │Live  │                   │
│  └──────┘  └──────┘  └──────┘  └──────┘                   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│               🤝 OUR PROMISE                                 │
│                                                               │
│    Premium standard. Not limited access.                    │
│                                                               │
│    [Philosophy statement about verified excellence]         │
│                                                               │
│    We are not a classifieds site.                          │
│    We are Mpumalanga's digital business ecosystem.         │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│        📧 READY TO LIST YOUR BUSINESS?                       │
│                                                               │
│           [👉 Apply via Email]                              │
│                                                               │
│             info@lowveldhub.co.za                           │
│                                                               │
│    ┌──────────────────────────────────────────┐            │
│    │ What to include in your application:     │            │
│    │ ✓ Business Name                          │            │
│    │ ✓ Location                               │            │
│    │ ✓ Category                               │            │
│    │ ✓ Contact Details                        │            │
│    │ ✓ 2–5 Images                             │            │
│    │ ✓ Short Description                      │            │
│    └──────────────────────────────────────────┘            │
│                                                               │
│    ┌──────────────────────────────────────────┐            │
│    │ Example Application Email:                │            │
│    │ Subject: Application to List My Business  │            │
│    │                                            │            │
│    │ [Email template example shown]            │            │
│    │ [Copyable code block]                     │            │
│    └──────────────────────────────────────────┘            │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│              🚀 LET'S GROW TOGETHER                          │
│                                                               │
│           [👉 Apply via Email]                              │
│                                                               │
│             info@lowveldhub.co.za                           │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## Color Scheme

| Element | Color | Usage |
|---------|-------|-------|
| **Background** | #0a0a0a | Full page dark background |
| **Text (Primary)** | White (#ffffff) | Headings, main text |
| **Text (Secondary)** | #999999 / gray-400 | Subtext, descriptions |
| **Accent** | Gold (#d4af37) | Buttons, highlights, numbers |
| **Borders** | white/10 | Subtle dividers, boxes |
| **Button Hover** | Gold glow shadow-lg shadow-gold-500/30 | Interactive feedback |

---

## Typography Hierarchy

```
HERO SECTION:
  H1: "Join Mpumalanga's Trusted Business Network" 
      → text-5xl md:text-6xl font-serif

SECTION HEADINGS:
  H2: "Why Partner With LowveldHub?"
      → text-4xl font-serif

SUBSECTION HEADINGS:
  H3: "Unmatched Visibility", "How It Works"
      → text-xl font-semibold

BODY TEXT:
  P: "Get discovered by customers..."
     → text-gray-400 text-lg leading-relaxed

SMALL TEXT:
  Span: "curated network" badge
        → text-xs font-semibold uppercase tracking-widest
```

---

## Button Styles

### Primary CTA Button (Apply via Email)
```
Background: gradient-to-r from-gold-500 to-gold-400
Text: text-black font-bold uppercase tracking-wider
Padding: px-8 md:px-10 py-4
Hover: shadow-lg shadow-gold-500/30
```

### Secondary Button (View Packages)
```
Border: border border-white/20
Text: text-white font-bold uppercase tracking-wider
Padding: px-8 py-4
Hover: border-white/40
```

### Email Link
```
Text: text-gold-400 text-lg font-semibold
Hover: text-gold-300 transition-colors
```

---

## Section Spacing

```
HERO SECTION:
  Top/Bottom: py-20 md:py-32
  Sides: px-6 md:px-8
  Result: Huge generous spacing

WHY PARTNER:
  Vertical: py-20
  Borders: border-y border-white/10
  Gap between items: gap-12

HOW IT WORKS:
  Grid columns: grid-cols-1 md:grid-cols-4
  Gap: gap-6

APPLICATION SECTION:
  Top/Bottom: py-20
  Between elements: mb-12
  Nested spacing: space-y-4
```

---

## Responsive Breakpoints

### Mobile First (< 640px)
- Hero: Full width, vertical buttons
- Why Partner: 1 column grid
- How It Works: 1 column grid
- Sections: Full padding with px-6
- Application: Stacked, readable

### Small Tablets (640px - 1024px)
- Hero: 2-3 columns
- Why Partner: 2 columns
- How It Works: 2 columns
- Sections: Still centered max-width

### Desktop (1024px+)
- Hero: Perfect layouts
- Why Partner: 3 columns
- How It Works: 4 columns (1-2-3-4 numbering)
- All sections perfectly centered and spaced

---

## Interactive Elements

### Smooth Scroll
"View Packages" button uses:
```javascript
document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
```

### Email Links
All "Apply via Email" buttons:
```
href="mailto:info@lowveldhub.co.za?subject=Application%20to%20Join%20LowveldHub"
```

### Hover States
- Buttons: shadow-lg hover:shadow-gold-500/30
- Links: hover:text-gold-300 transition-colors
- Borders: hover:border-white/40 transition-colors

---

## Box/Card Styles

### Info Box (Why Partner Section)
```
Layout: flex flex-col
Numbers: text-gold-500 font-serif text-3xl
Title: text-xl font-semibold text-white
Text: text-gray-400 leading-relaxed
```

### Promise Box (Our Promise Section)
```
Background: bg-white/3
Border: border border-white/10
Padding: p-8 md:p-12
Rounded: rounded-2xl
Layout: text-center py-20
```

### Application Box (What to Include)
```
Background: bg-white/5
Border: border border-white/10
Padding: p-8
Rounded: rounded-xl
Text: text-left
```

### Email Example Box
```
Background: #121212 (darker)
Border: border border-white/10
Padding: p-8
Rounded: rounded-xl
Font: font-mono text-sm
Highlighting: text-gold-400 for field names
```

---

## Visual Hierarchy Key

**Most Important (Size/Color/Prominence):**
1. Hero heading + CTAs (largest, centered, gold accents)
2. Section headings (large serif, white)
3. Value prop titles (medium, white)
4. Body descriptions (smaller, gray)
5. Supporting text (smallest, subtle gray)

**Visual Emphasis Techniques:**
- ✨ Gold highlights (numbers, buttons, accents)
- 🎨 Subtle borders (white/10 for sophistication)
- 📏 Large spacing (py-20, gap-12 for luxury)
- 🔤 Serif fonts (headlines for elegance)
- 🌙 Dark background (premium dark mode)

---

## Design Tokens

```css
/* Colors */
--gold-500: #d4af37
--gold-400: #ffd700
--bg-dark: #0a0a0a
--bg-card: #121212
--text-primary: #ffffff
--text-secondary: #999999
--border-subtle: rgba(255, 255, 255, 0.1)

/* Spacing */
--space-lg: 2rem (py-8)
--space-xl: 3rem (py-12)
--space-2xl: 5rem (py-20)
--space-3xl: 8rem (py-32)

/* Typography */
--serif: font-serif
--sans: font-sans
--size-xs: 0.75rem
--size-sm: 0.875rem
--size-base: 1rem
--size-lg: 1.125rem
--size-xl: 1.25rem
--size-2xl: 1.5rem
--size-3xl: 1.875rem
--size-4xl: 2.25rem
--size-5xl: 3rem
--size-6xl: 3.75rem

/* Borders */
--radius-lg: 0.5rem
--radius-xl: 0.75rem
--radius-2xl: 1rem
```

---

## User Journey on Page

1. **Hero Section** → "Wow, this looks premium"
2. **Why Partner** → "I see the benefits clearly"
3. **Packages** → "I understand the options"
4. **How It Works** → "The process is simple"
5. **Our Promise** → "I can trust this"
6. **Application Section** → "I know exactly what to do"
7. **Email Example** → "I can just copy this template"
8. **Final CTA** → "Ready to click Apply"

---

## Accessibility Notes

✅ Color contrast: Gold on dark background WCAG AAA compliant  
✅ Font sizes: Readable on mobile (px-6 padding, large text)  
✅ Link targets: Clickable email links with clear CTAs  
✅ Spacing: Generous spacing aids readability  
✅ Responsiveness: Works on all device sizes  
✅ Semantic HTML: Proper heading hierarchy (h1 > h2 > h3)  

---

## Mobile Experience (iPhone/Android)

✅ Hero text stacks nicely  
✅ Buttons full-width or 2 per row  
✅ Grid layouts collapse to 1 column  
✅ Email example scrollable  
✅ Tap targets 44px+ for easy clicking  
✅ No horizontal scroll  
✅ Text readable without zooming  

