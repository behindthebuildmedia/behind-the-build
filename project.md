You are a senior frontend engineer, creative developer, UI/UX designer, and web animation specialist.

Build a complete premium website from scratch for my company:

BEHIND THE BUILD

Do not create a generic agency template.

The website must feel like a premium international creative media company with a strong editorial design, cinematic visuals, sophisticated interactions, clean spacing, and a unique interactive service configurator.

Before coding:

1. Analyze all requirements.
2. Create a development plan.
3. Create the project structure.
4. Install the required dependencies.
5. Build the website.
6. Run the project.
7. Test all interactions.
8. Check the browser console.
9. Fix all errors.
10. Test desktop, tablet, and mobile responsiveness.

Do not only explain what to do.

Directly create and implement the complete project.

==================================================
1. COMPANY INFORMATION
==================================================

Company Name:

BEHIND THE BUILD

Behind the Build helps businesses, brands, companies, and creators with:

- Video Editing
- Videography
- Photography
- Content Creation
- Content Creators
- Event Media Coverage
- Remote Editing

The main idea behind the company is:

Companies should not have to purchase services they do not need.

Instead of forcing clients into fixed packages, Behind the Build allows clients to choose, combine, and customize only the creative services they actually require.

The signature feature of the website is:

BUILD YOUR OWN PLAN

This must be the most important and interactive feature of the website.

==================================================
2. TECH STACK
==================================================

Create the project using:

- React
- Vite
- JavaScript
- Tailwind CSS
- Motion / Framer Motion
- Lucide React icons

Use modern, clean, reusable React components.

Do NOT use Three.js or React Three Fiber initially.

Create the premium 3D feeling using:

- Transparent images
- CSS perspective
- CSS 3D transforms
- Framer Motion
- Mouse parallax
- Scroll animations
- Layered depth effects

This approach should prioritize performance and maintainability.

==================================================
3. BRAND DESIGN SYSTEM
==================================================

Use these exact colors:

PRIMARY RED:
#C8041C

CHARCOAL:
#212121

WHITE:
#FFFFFF

The website must primarily use a LIGHT THEME.

Approximate color distribution:

70% White / Off-White
20% Charcoal
10% Brand Red

Do not overuse red.

Use red only for:

- Important headline words
- Primary buttons
- Active states
- Selected plans
- Small visual accents
- The signature Build Line

TYPOGRAPHY:

Use NimbusSanL as the primary font.

Create:

src/assets/fonts/

and configure the project so I can add my NimbusSanL font files later.

Use appropriate fallback fonts until the files are added.

The typography should feel:

Bold
Editorial
Modern
Premium
Cinematic

Use large headlines and generous whitespace.

==================================================
4. IMPORTANT DESIGN RULES
==================================================

DO NOT create:

- A generic agency template
- A SaaS-style website
- Excessive cards
- Excessive rounded corners
- Excessive shadows
- Glassmorphism
- Neon effects
- Random gradients
- Excessive icons
- Fake statistics
- Fake testimonials
- Fake client logos
- Fake awards
- Fake “100+ brands trust us” claims
- Custom cursors

IMPORTANT:

Use the NORMAL DEFAULT SYSTEM CURSOR.

Do not create:

- Red dot cursor
- Mouse-following cursor
- Custom cursor
- Cursor trail
- Cursor glow
- Cursor circle

Mouse movement may control hero image parallax, but the normal cursor must remain unchanged.

==================================================
5. COMPLETE HOMEPAGE STRUCTURE
==================================================

Build the homepage in this exact order:

1. Header
2. Hero
3. Featured Work
4. Brand Statement
5. Build Your Own Plan
6. Our Process
7. Why Behind the Build
8. Available Worldwide
9. Final CTA
10. Footer

Do NOT create a separate Services section.

Services are already presented inside Build Your Own Plan.

==================================================
6. HEADER
==================================================

Create a premium minimal header.

LEFT:

Large Behind the Build logo.

Create a placeholder text logo if the real logo is unavailable.

The logo should be approximately:

Desktop: 130px–150px
Tablet: 105px–120px
Mobile: 90px–105px

Do not make the header excessively tall.

NAVIGATION:

Work
Build Your Plan
Our Process
About
Contact

PRIMARY CTA:

START A PROJECT →

Use brand red #C8041C.

Header behavior:

Initially clean and integrated with the hero.

On scroll:

- Add white background
- Very subtle backdrop blur if appropriate
- Thin bottom border
- Smooth transition

Navigation hover:

Use a thin red underline animation.

Mobile:

Create a premium fullscreen menu.

Do not use a generic dropdown.

==================================================
7. HERO SECTION
==================================================

Do NOT add:

“CREATIVE MEDIA STUDIO”

or any eyebrow text above the headline.

The Hero Section must begin directly with the main headline.

MAIN HEADLINE:

WE MAKE
WHAT YOU BUILD
IMPOSSIBLE TO IGNORE.

Highlight:

IMPOSSIBLE TO IGNORE.

using #C8041C.

DESCRIPTION:

We help brands turn ideas into powerful visual stories through content creation, videography, photography, editing, and complete media solutions.

CTA BUTTONS:

START A PROJECT →

VIEW OUR WORK ↗

PRIMARY CTA:

Red background.

SECONDARY CTA:

Minimal editorial style.

==================================================
8. HERO CAMERA VISUAL
==================================================

The right side of the Hero Section must feature a large professional cinema camera image.

Use a transparent PNG or WebP image.

Create this asset location:

src/assets/images/hero-camera.webp

If the image does not exist:

Do not create a black procedural object.

Do not create a camera using CSS boxes.

Do not create a fake Three.js camera.

Instead, create a clean placeholder implementation and clearly tell me to add:

hero-camera.webp

to:

src/assets/images/

The camera must:

- Be large
- Be visually impressive
- Occupy approximately 45–55% of the desktop hero
- Have a transparent background
- Blend naturally into the light website
- Not appear inside a card
- Not have a rectangular background
- Not overlap the headline
- Not overlap navigation

==================================================
9. ANIMATED CAMERA EFFECT
==================================================

Make the transparent camera image feel 3D.

Use:

Framer Motion
CSS perspective
CSS 3D transforms

Add subtle continuous motion:

rotateY:
approximately -4deg to +4deg

rotateX:
approximately -2deg to +2deg

translateY:
approximately -8px to +8px

Duration:

5–8 seconds

Use smooth ease-in-out.

Infinite loop.

Do not spin the camera 360 degrees.

Do not use fast movement.

The camera should gently float.

==================================================
10. CAMERA MOUSE PARALLAX
==================================================

Desktop only:

Add subtle mouse parallax.

When the mouse moves inside the Hero:

Camera moves slightly on X and Y axes.

Maximum translation:

10–20px.

Maximum rotation:

2–4 degrees.

Use spring smoothing.

IMPORTANT:

Mouse movement affects ONLY the camera and supporting visual layers.

Do not create a custom cursor.

The normal cursor must remain visible.

Disable mouse parallax on touch devices.

==================================================
11. FLOATING MEDIA ELEMENTS
==================================================

Around the camera, add 3–4 minimal floating visual frames.

Represent:

Video Editing
Photography
Content Creation
Events

Use image placeholders that can later be replaced with real Behind the Build work.

Apply different depth levels:

Background layer
Camera layer
Foreground layer

Use subtle:

Parallax
Rotation
Floating
Scale
Depth

Do not overcrowd the hero.

==================================================
12. HERO ENTRANCE ANIMATION
==================================================

Create this entrance sequence:

1. Header appears.
2. Main headline reveals line-by-line using mask animation.
3. Description fades upward.
4. CTA buttons appear.
5. Camera enters smoothly from the right.
6. Camera scales from approximately 0.92 to 1.
7. Floating frames appear.
8. Build Line begins drawing.

Keep the entire sequence smooth and relatively quick.

==================================================
13. SIGNATURE BUILD LINE
==================================================

Create a unique visual element:

THE BUILD LINE

The Build Line is a thin red line:

#C8041C

It begins inside the Hero Section.

As the user scrolls, the Build Line visually continues through selected sections.

It should connect the website story.

Use it around:

Hero
Featured Work
Brand Statement
Build Your Own Plan
Process
Final CTA

Keep it subtle.

Do not make it distracting.

==================================================
14. FEATURED WORK
==================================================

Create a premium editorial Featured Work section.

Do NOT use 5–6 small equal cards.

Use:

One large featured project.

Two smaller asymmetric projects.

Use large imagery.

Project categories may include:

Brand Film
Product Content
Creator Content
Photography
Events
Editing

Each project should display:

Project Name
Category
Minimal CTA

Example:

VIEW PROJECT ↗

Hover animation:

- Subtle image zoom
- Image mask movement
- Project title reveal
- Small red line animation

Create project data in a separate data file so projects can easily be replaced later.

Do not create fake clients.

Use generic project placeholders.

==================================================
15. BRAND STATEMENT
==================================================

After Featured Work, create a large editorial statement.

TEXT:

WE DON’T SELL PACKAGES.

WE BUILD AROUND

WHAT YOU NEED.

Highlight:

WHAT YOU NEED.

in brand red.

Supporting text:

Choose the creative services you need. Combine them your way. Pay only for what adds value.

Use large typography.

Use generous whitespace.

Do not place this inside a card.

==================================================
16. BUILD YOUR OWN PLAN
==================================================

This is the MOST IMPORTANT FEATURE.

Create a premium interactive configurator.

Main services:

VIDEO EDITING

VIDEOGRAPHY

PHOTOGRAPHY

CONTENT CREATION

EVENTS

The user must be able to click a main service.

After clicking:

Show relevant sub-options.

After selecting a sub-option:

Show:

- Deliverables
- Starting Price
- Select Plan button

Use smooth animated transitions.

The interaction flow is:

01 SERVICE

02 PLAN

03 DETAILS

04 REVIEW

Display a thin red progress line.

==================================================
17. VIDEO EDITING OPTIONS
==================================================

When Video Editing is selected, show:

Short-Form Editing

Long-Form Editing

Corporate Editing

Event Editing

Custom Editing

Create reusable data structures for pricing and deliverables.

==================================================
18. VIDEOGRAPHY OPTIONS
==================================================

When Videography is selected, show:

Product Videos

Brand Videos

Social Media Shoots

Corporate Shoots

Custom Shoots

==================================================
19. PHOTOGRAPHY OPTIONS
==================================================

When Photography is selected, show:

Product Photography

Brand Photography

Corporate Photography

Custom Photography

==================================================
20. CONTENT CREATION OPTIONS
==================================================

When Content Creation is selected, show:

UGC Content

On-Camera Content

Product Content

Social Media Content

Monthly Content

MONTHLY CONTENT PLAN:

Large headline:

2 VIDEOS
PER WEEK

Supporting:

8 Videos Per Month

Include:

Dedicated Content Creator

Content Planning Support

Basic Script Assistance

Video Shooting

Professional Editing

Social Media Ready Delivery

Revisions Included

STARTING FROM:

₹15,000 / MONTH

SELECT PLAN →

==================================================
21. EVENTS OPTIONS
==================================================

When Events is selected, show:

Photos Only

Videos Only

Photos + Videos

Editing Only

Complete Coverage

PHOTOS ONLY:

Up to 6 Hours Coverage

75 Professionally Edited Photos

High-Resolution Delivery

STARTING FROM:

₹5,000

VIDEOS ONLY:

Up to 6 Hours Coverage

3 Edited Reels

1 Event Highlight Video

STARTING FROM:

₹10,000

PHOTOS + VIDEOS:

Up to 6 Hours Coverage

75 Edited Photos

3 Edited Reels

1 Event Highlight Video

STARTING FROM:

₹15,000

EDITING ONLY:

Client Provides Raw Footage

3 Edited Reels

1 Event Highlight Video

STARTING FROM:

₹5,000

COMPLETE COVERAGE:

Dedicated Photographer

Dedicated Videographer

Up to 6 Hours Coverage

100 Edited Photos

5 Professionally Edited Reels

1 Premium Highlight Video

Priority Delivery

STARTING FROM:

₹20,000

==================================================
22. CONFIGURATOR INTERACTIONS
==================================================

When the user selects a service:

Animate the relevant options into view.

When hovering over a plan:

- Highlight it using subtle red accents.
- Fade non-selected options slightly.
- Change the preview image.
- Animate deliverable numbers.
- Reveal the starting price.

When Select Plan is clicked:

Move to the Details stage.

Ask for:

Name

Company Name

Email

Phone

Project Location

Project Date if relevant

Additional Requirements

Then show Review.

Do not implement online payment.

Final CTA:

REQUEST QUOTE →

==================================================
23. OUR PROCESS
==================================================

Create:

01 DISCOVER

02 PLAN

03 CREATE

04 REFINE

05 DELIVER

Use the Build Line to visually connect the stages.

Use minimal icons.

Add scroll-triggered line animation.

Do not use large cards.

==================================================
24. WHY BEHIND THE BUILD
==================================================

Show:

CREATIVE EXCELLENCE

CLIENT-FIRST APPROACH

ON TIME, EVERY TIME

PREMIUM QUALITY

FLEXIBLE SERVICES

Do not use fake claims.

Use clean editorial layout.

==================================================
25. AVAILABLE WORLDWIDE
==================================================

Do not claim that we already have clients worldwide.

Use the heading:

AVAILABLE WORLDWIDE.

Supporting text:

Remote creative services for brands and businesses, wherever you are.

Clearly explain:

India:
Videography
Photography
Content Creation
Events
Editing

International:
Remote Video Editing
Remote Photo Editing
Remote Post-Production

Do not use fake client locations.

Do not create fake global statistics.

A minimal abstract map may be used.

==================================================
26. FINAL CTA
==================================================

Create a large visual CTA section.

TEXT:

LET’S BUILD SOMETHING
WORTH SEEING.

Use a strong red visual accent.

CTA:

START A PROJECT →

Use one premium cinematic image if appropriate.

==================================================
27. FOOTER
==================================================

Keep the Footer minimal.

Include:

Large Behind the Build logo

Navigation

Services

Contact

Social Links

Copyright

Closing statement:

WHAT YOU BUILD DESERVES TO BE SEEN.

Do not add a newsletter section.

==================================================
28. ANIMATIONS ACROSS THE WEBSITE
==================================================

Use:

Text mask reveals

Image reveal masks

Subtle parallax

Magnetic primary buttons

Animated Build Line

Scroll-triggered process animation

Subtle image zoom

Section transitions

Configurator transitions

Do not animate everything.

The website must remain premium and usable.

==================================================
29. RESPONSIVE DESIGN
==================================================

Build specifically for:

Desktop

Laptop

Tablet

Mobile

Do not simply shrink desktop layouts.

Mobile requirements:

- Fullscreen navigation
- Hero camera below content
- Reduced floating elements
- No mouse parallax
- Simplified animations
- Touch-friendly configurator
- Stacked project layouts
- Readable typography
- No horizontal overflow

==================================================
30. ACCESSIBILITY
==================================================

Implement:

Semantic HTML

Keyboard navigation

Visible focus states

Accessible buttons

ARIA labels where necessary

Proper heading hierarchy

Alt text

prefers-reduced-motion support

==================================================
31. PERFORMANCE
==================================================

Optimize:

Images

Animations

Component rendering

Lazy loading

Code splitting if appropriate

Avoid unnecessary animation loops.

Avoid layout shifts.

The website should feel smooth on normal laptops and mobile devices.

==================================================
32. PROJECT STRUCTURE
==================================================

Create a scalable architecture similar to:

src/

components/
Header/
MobileMenu/
MagneticButton/
BuildLine/

sections/
Hero/
FeaturedWork/
BrandStatement/
PlanBuilder/
Process/
WhyUs/
Worldwide/
FinalCTA/
Footer/

data/
projects.js
services.js
plans.js

hooks/
useMouseParallax.js
useReducedMotion.js
useResponsive.js

assets/
images/
videos/
fonts/

utils/

Use a better structure if appropriate.

==================================================
33. FINAL DEVELOPMENT INSTRUCTIONS
==================================================

First:

Create the complete project foundation.

Then:

Build the Header and Hero.

Verify them.

Then:

Build Featured Work.

Verify it.

Then:

Build Brand Statement.

Then:

Build the complete Build Your Own Plan configurator.

Test all service selections.

Test Content Creation.

Test Events.

Test prices.

Test Details and Review stages.

Then:

Build remaining sections.

Finally:

Run the entire project.

Check for:

Broken imports

Missing dependencies

Console errors

Console warnings

Layout issues

Animation issues

Mobile responsiveness

Tablet responsiveness

Horizontal overflow

Accessibility problems

Performance problems

Fix all problems found.

IMPORTANT:

Do not stop after creating code.

Actually run the application and verify that it works.

Do not create a generic website.

Do not create fake achievements or fake clients.

Do not use a custom cursor.

Do not add “CREATIVE MEDIA STUDIO” above the Hero headline.

Do not create a separate Services section.

Do not use Three.js initially.

The final result should feel like a premium, modern, international creative media company website with Behind the Build’s unique Build Your Own Plan experience.