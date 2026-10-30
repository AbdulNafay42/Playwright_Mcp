# Abdul Nafay Portfolio Homepage Test Plan

## Application Overview

Test plan for the homepage of https://abdulnafay.vercel.app/ (Next.js portfolio). Page title: "Abdul Nafay | Software Engineer & React Developer". Sections: header nav (About, Experience, Projects, Blog, contact icon link), Hero (h1, CTAs, GitHub/LinkedIn icons, profile.ts code card, Scroll link), 01 About (portrait, stats, social links), 02 Skills (8 categories), 03 Experience (2 timeline entries), 04 Featured projects (4 cards), 05 Blog (3 latest posts), Contact CTA, Footer. All scenarios assume a fresh browser state and start at the homepage.

## Test Scenarios

### 1. Page Load and Metadata

**Seed:** `seed.spec.ts`

#### 1.1. Homepage loads with correct title and main landmarks

**File:** `tests/homepage/load.spec.ts`

**Steps:**
  1. Navigate to https://abdulnafay.vercel.app/
    - expect: Page title is 'Abdul Nafay | Software Engineer & React Developer'
    - expect: banner, main, contentinfo landmarks are visible
    - expect: No uncaught console errors; main document returns HTTP 200
  2. Check the h1
    - expect: Single h1 containing 'Abdul Nafay, software engineer. I build modern web applications with pixel-perfect precision.'

#### 1.2. Hero content and animation settle

**File:** `tests/homepage/hero.spec.ts`

**Steps:**
  1. Observe hero after load
    - expect: Eyebrow 'Software Engineer · Technyx Systems', intro 'Hi, I'm Abdul Nafay —', description paragraph visible
    - expect: Animated heading words become fully visible after animation
  2. Inspect the profile.ts code card
    - expect: Shows 9 numbered lines with name 'Abdul Nafay', role, company, based 'Karachi, Pakistan', stack and focus arrays
    - expect: Line numbers are aria-hidden

#### 1.3. Broken resources and SEO checks

**File:** `tests/homepage/resources.spec.ts`

**Steps:**
  1. Collect network requests during load
    - expect: No 4xx/5xx responses for images, scripts, fonts, CSS
  2. Verify portrait image
    - expect: Image 'Portrait of Abdul Nafay' has naturalWidth > 0

### 2. Navigation

**Seed:** `seed.spec.ts`

#### 2.1. Header nav links route to correct pages

**File:** `tests/homepage/nav-header.spec.ts`

**Steps:**
  1. Click each of About, Experience, Projects, Blog in the Main navigation, returning to home between clicks
    - expect: URLs become /about, /experience, /projects, /blog respectively and pages render without error
  2. Click the contact icon link in the header
    - expect: Navigates to /contact

#### 2.2. Logo returns to home

**File:** `tests/homepage/nav-logo.spec.ts`

**Steps:**
  1. Go to /about then click 'Abdul Nafay — home' logo
    - expect: Navigates to / and hero is shown

#### 2.3. Footer navigation links

**File:** `tests/homepage/nav-footer.spec.ts`

**Steps:**
  1. Click each Footer nav link (Home, About, Experience, Projects, Blog, Contact)
    - expect: Each routes to its matching path

#### 2.4. Skip to content link and keyboard navigation

**File:** `tests/homepage/nav-keyboard.spec.ts`

**Steps:**
  1. Press Tab once from page load
    - expect: 'Skip to content' link receives focus and becomes visible
  2. Press Enter
    - expect: URL hash becomes #main and focus/scroll moves to main
  3. Continue tabbing through header and hero
    - expect: Focus order is logical, focus indicator visible, no keyboard traps

#### 2.5. In-page anchors: Scroll and Back to top

**File:** `tests/homepage/nav-anchors.spec.ts`

**Steps:**
  1. Click hero 'Scroll' link
    - expect: URL hash #about; About section scrolls into view
  2. Scroll to footer and click 'Back to top'
    - expect: Page scrolls to top (#top)

#### 2.6. Browser back/forward and unknown route

**File:** `tests/homepage/nav-history.spec.ts`

**Steps:**
  1. Navigate Home -> Projects -> Back -> Forward
    - expect: History works, pages render correctly
  2. Visit https://abdulnafay.vercel.app/does-not-exist
    - expect: A friendly 404 page is shown with a way back home (negative test)

### 3. Sections and Content

**Seed:** `seed.spec.ts`

#### 3.1. About section content

**File:** `tests/homepage/about.spec.ts`

**Steps:**
  1. Scroll to section 01 About
    - expect: Heading 'Software engineer building production-ready web applications.'
    - expect: Name, role, Technyx Systems, Karachi, Pakistan, 'Open to full-time & freelance' badge
    - expect: Stats: Experience 2+ years, Currently Technyx Systems, Based in Karachi, Studying Computer Science · Iqra University
  2. Click the link at the end of the about text
    - expect: Navigates to /about

#### 3.2. Skills section lists all categories

**File:** `tests/homepage/skills.spec.ts`

**Steps:**
  1. Scroll to 02 Skills
    - expect: 8 cards: Languages, Frameworks, Backend, Testing & quality, Styling & motion, UI craft, CMS, Workflow
    - expect: Each card has a description and list with labelled aria-label (e.g. 'Languages skills')
    - expect: Languages contains HTML5, CSS3, SCSS / Sass, JavaScript, TypeScript; Workflow contains 9 items

#### 3.3. Experience timeline

**File:** `tests/homepage/experience.spec.ts`

**Steps:**
  1. Scroll to 03 Experience
    - expect: Entry 'Software Engineer' at Technyx Systems, Jun 2024 to Present, with 6 tech tags
    - expect: Entry 'Junior Front-End Developer' at Bhabha Technologies, Sep 2023 to Apr 2024, with 4 tech tags
    - expect: Entries in reverse chronological order
  2. Click the section's arrow link
    - expect: Navigates to /experience

#### 3.4. Featured projects cards

**File:** `tests/homepage/projects.spec.ts`

**Steps:**
  1. Scroll to 04 Featured projects
    - expect: 4 cards: Tourism Platform, E-Learning Platform, Hisabzo, SellDesk
    - expect: Badges: Under NDA/Client work for first two; Live and In development for products
    - expect: SellDesk shows '+1' overflow tech chip
    - expect: Illustration disclaimer text present for each card
  2. Click each project title link
    - expect: Routes to /projects/tourism-platform, /projects/e-learning-platform, /projects/hisabzo, /projects/selldesk and detail pages load
  3. Click section arrow link
    - expect: Navigates to /projects

#### 3.5. Latest blog posts

**File:** `tests/homepage/blog.spec.ts`

**Steps:**
  1. Scroll to 05 Writing
    - expect: 3 articles with date, category, title, excerpt and 'Read article'
    - expect: Order newest first: 22 Oct 2026, 5 Oct 2026, 14 Sept 2026
  2. Click each article title
    - expect: Routes to /blog/server-vs-client-components-nextjs, /blog/reusable-react-components, /blog/figma-to-responsive-ui-checklist
  3. Click section arrow link
    - expect: Navigates to /blog

#### 3.6. Contact call to action

**File:** `tests/homepage/contact-cta.spec.ts`

**Steps:**
  1. Scroll to Contact section
    - expect: Heading 'Have a project or a role in mind? Let's talk.' visible
  2. Click the contact form button then return
    - expect: Navigates to /contact
  3. Inspect email link
    - expect: href is mailto:abdulnafay2005@gmail.com and text matches

### 4. External Links and Hero CTAs

**Seed:** `seed.spec.ts`

#### 4.1. Hero CTA buttons

**File:** `tests/homepage/hero-cta.spec.ts`

**Steps:**
  1. Click the primary projects CTA in the hero
    - expect: Navigates to /projects
  2. Click 'Get in touch'
    - expect: Navigates to /contact

#### 4.2. Social links open in new tab securely

**File:** `tests/homepage/external-links.spec.ts`

**Steps:**
  1. Inspect GitHub and LinkedIn links in hero, About and footer
    - expect: hrefs are https://github.com/AbdulNafay42 and https://www.linkedin.com/in/abdul-nafay-2b1572241/
    - expect: target=_blank with rel containing noopener
    - expect: Accessible names include '(opens in a new tab)'
  2. Click GitHub link in hero
    - expect: New tab opens to GitHub profile; original tab remains on homepage

#### 4.3. Project external links

**File:** `tests/homepage/project-external.spec.ts`

**Steps:**
  1. Inspect 'Visit Hisabzo live site' and 'SellDesk source code on GitHub' links
    - expect: Hrefs are https://www.hisabzo.online and https://github.com/AbdulNafay42/SellDesk, open in new tab with noopener
  2. Click each
    - expect: Destination loads in new tab; homepage unaffected

#### 4.4. Hash-free link audit

**File:** `tests/homepage/link-audit.spec.ts`

**Steps:**
  1. Collect all internal hrefs from the homepage and request each
    - expect: All return 200; no empty or '#' placeholder hrefs except intended anchors
    - expect: Icon-only links (hero CTA, header contact, section arrows, contact button) have an accessible name (known: several appear unnamed in snapshot - report as accessibility defect if so)

### 5. Responsiveness

**Seed:** `seed.spec.ts`

#### 5.1. Desktop layout 1920x1080 and 1280x720

**File:** `tests/homepage/responsive-desktop.spec.ts`

**Steps:**
  1. Set viewport to each size and load page
    - expect: Header nav inline, hero two-column with code card, no horizontal scrollbar

#### 5.2. Tablet layout 768x1024

**File:** `tests/homepage/responsive-tablet.spec.ts`

**Steps:**
  1. Set viewport 768x1024 and scroll full page
    - expect: Content reflows, no overflow or clipped text, project and skill grids adapt

#### 5.3. Mobile layout 375x667 and 320x568

**File:** `tests/homepage/responsive-mobile.spec.ts`

**Steps:**
  1. Set viewport and load page
    - expect: No horizontal scroll (scrollWidth <= innerWidth)
    - expect: Navigation collapses to a menu or remains usable
    - expect: Heading, CTAs and code card readable without clipping
  2. Open and use mobile menu if present, select a link
    - expect: Menu opens/closes, link navigates, menu closes after navigation, Escape closes menu
  3. Verify tap targets
    - expect: Interactive elements at least ~44px high and not overlapping

#### 5.4. Viewport resize and orientation change

**File:** `tests/homepage/responsive-resize.spec.ts`

**Steps:**
  1. Resize from 1440 wide to 390 wide and rotate to landscape 667x375
    - expect: Layout updates live without breakage or duplicated content

### 6. Edge Cases, Accessibility and Robustness

**Seed:** `seed.spec.ts`

#### 6.1. Reduced motion preference

**File:** `tests/homepage/reduced-motion.spec.ts`

**Steps:**
  1. Emulate prefers-reduced-motion: reduce and load page
    - expect: All content visible immediately without hidden/blank animated elements

#### 6.2. Dark/light color scheme

**File:** `tests/homepage/color-scheme.spec.ts`

**Steps:**
  1. Emulate prefers-color-scheme dark and light
    - expect: Text remains legible with sufficient contrast; no invisible elements

#### 6.3. JavaScript disabled

**File:** `tests/homepage/no-js.spec.ts`

**Steps:**
  1. Disable JavaScript and load page
    - expect: Core content (hero text, nav links) is still server rendered and visible; or a graceful state is shown

#### 6.4. Slow network and offline

**File:** `tests/homepage/network.spec.ts`

**Steps:**
  1. Throttle to Slow 3G and load
    - expect: Content progressively renders; no layout shift of key content or permanent blank
  2. Block image requests
    - expect: Portrait shows alt text; layout stays intact

#### 6.5. Heading hierarchy and landmarks

**File:** `tests/homepage/a11y-structure.spec.ts`

**Steps:**
  1. Extract headings
    - expect: One h1, section h2s, card h3s with no skipped levels
    - expect: Navigation landmarks labelled 'Main' and 'Footer'
    - expect: Images have alt text; decorative elements aria-hidden

#### 6.6. Zoom 200% and text scaling

**File:** `tests/homepage/zoom.spec.ts`

**Steps:**
  1. Zoom browser to 200% and 400%
    - expect: Content reflows without loss of function or horizontal scrolling at 400%

#### 6.7. Cross-browser smoke

**File:** `tests/homepage/cross-browser.spec.ts`

**Steps:**
  1. Run load, nav and section visibility checks on Chromium, Firefox and WebKit
    - expect: Identical content and working links on all engines

#### 6.8. Rapid interaction and repeated navigation

**File:** `tests/homepage/stress.spec.ts`

**Steps:**
  1. Rapidly click nav links and scroll up/down repeatedly; reload mid-scroll
    - expect: No errors or console exceptions; scroll position and page state recover sanely
