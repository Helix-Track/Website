# HelixTrack Core - Professional Website

![JIRA alternative for the free world!](docs/assets/Wide_Black.png)

This directory contains the professional enterprise website for HelixTrack Core, designed to be deployed on GitHub Pages or any static hosting service.

## Overview

The website is a modern, responsive single-page application showcasing HelixTrack Core V4.0 with Documents V2 Extension as the open-source JIRA + Confluence alternative. It features:

 - **372 API Actions** (282 core + 90 Documents V2 Extension)
 - **1,769 Tests** (1,375 core @ 98.8% + 394 documents @ 100%)
 - **100% JIRA Feature Parity** ✅ ACHIEVED
 - **102% Confluence Feature Parity** ✅ ACHIEVED (Documents V2)
 - **Robust Error Handling** with localized messages across all clients
- **Complete Documentation** links
- **Automated Build & Test Pipeline**
- **Multiple Download Options** (binary, Docker, source)
- **Professional Design** with modern CSS3 and animations

## Website Structure

```
Website/
├── docs/                        # GitHub Pages directory
│   ├── index.html               # Main website (single-page)
│   ├── diagrams.html            # Architecture diagrams page (NEW)
│   ├── style.css                # Professional styling (~860 lines)
│   ├── script.js                # Interactive JavaScript (~400 lines)
│   └── assets/
│       ├── Logo.png             # HelixTrack logo
│       └── diagrams/            # Architecture diagrams (NEW)
│           ├── *.png            # 5 high-resolution PNG diagrams
│           └── *.drawio         # 5 editable DrawIO source files
└── README.md                    # This file
```

## Features

### Design Elements

1. **Modern Navigation**
   - Sticky header with blur effect
   - Smooth scroll to sections
   - Active link highlighting
   - Responsive mobile hamburger menu

2. **Hero Section**
   - Animated gradient background
   - Moving grid pattern
   - Statistics showcase (235 endpoints, 85% parity, $0 cost)
   - Bouncing scroll indicator

3. **Features Section**
   - 6 feature cards with hover effects
   - Grid layout with responsive design
   - Icon-based visual hierarchy

4. **API Showcase**
   - Code window with terminal styling
   - Copy-to-clipboard functionality
   - Syntax-highlighted examples
   - Feature list with benefits

5. **Architecture Diagrams Page** (NEW)
   - Dedicated page with 5 comprehensive diagrams
   - System architecture, database schema, API flows, auth/permissions, microservices
   - Click-to-zoom modal viewer for full-size images
   - Download links for PNG and DrawIO source files
   - Detailed descriptions and key metrics for each diagram
   - Fully responsive design with mobile support

6. **Statistics Section**
   - Animated counters on scroll
   - 4 key metrics
   - Glassmorphism card design

7. **Documentation Section**
   - 4 documentation types
   - Direct links to GitHub
   - Card-based layout

8. **Download Section**
   - 3 download methods (Binary, Docker, Source)
   - Installation command examples
   - Quick-start instructions

9. **Contact Section**
   - 4 contact methods
   - External links to GitHub, Discord, Email

10. **Professional Footer**
    - Site map with navigation
    - Quick links to documentation
    - Legal information
    - Social media links

### Technical Features

#### HTML5
- Semantic markup
- Accessibility attributes
- SEO-optimized meta tags
- Open Graph tags for social sharing

#### CSS3
- CSS Custom Properties (variables)
- CSS Grid and Flexbox layouts
- Gradient backgrounds
- Backdrop filters (glassmorphism)
- Keyframe animations
- Smooth transitions
- Box shadows (multiple levels)
- Responsive design (mobile-first)

#### JavaScript
- Smooth scrolling
- Mobile menu toggle
- Scroll-based animations
- Active navigation highlighting
- Intersection Observer API
- Animated counters
- Copy-to-clipboard functionality
- Keyboard navigation support
- External link handling

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with animations
- **Vanilla JavaScript**: No frameworks or dependencies
- **Google Fonts**: Inter font family
- **SVG Icons**: Inline Unicode icons

## Deployment

### GitHub Pages (Recommended)

The website is ready for GitHub Pages deployment from the `docs/` directory:

1. **Enable GitHub Pages:**
   ```bash
   # Go to repository settings
   Settings → Pages → Source → Deploy from branch
   Branch: main
   Folder: /Website/docs
   ```

2. **Access the website:**
   ```
   https://helix-track.github.io/Core/
   ```

3. **Custom Domain (Optional):**
   ```bash
   # Add CNAME file
   echo "helixtrack.yourdomain.com" > docs/CNAME

   # Configure DNS
   CNAME record: helixtrack → helix-track.github.io
   ```

### Alternative Hosting

#### Netlify

```bash
# Deploy via Netlify CLI
cd Website/docs
netlify deploy --prod
```

#### Vercel

```bash
# Deploy via Vercel CLI
cd Website/docs
vercel --prod
```

#### Self-Hosted (Nginx)

```nginx
server {
    listen 80;
    server_name helixtrack.example.com;
    root /var/www/helixtrack/Website/docs;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    # Gzip compression
    gzip on;
    gzip_types text/css application/javascript image/svg+xml;
}
```

#### Self-Hosted (Apache)

```apache
<VirtualHost *:80>
    ServerName helixtrack.example.com
    DocumentRoot /var/www/helixtrack/Website/docs

    <Directory /var/www/helixtrack/Website/docs>
        Options -Indexes +FollowSymLinks
        AllowOverride None
        Require all granted
    </Directory>

    # Compression
    <IfModule mod_deflate.c>
        AddOutputFilterByType DEFLATE text/html text/css application/javascript
    </IfModule>
</VirtualHost>
```

## Development

### Local Testing

**Option 1: Python HTTP Server**
```bash
cd Website/docs
python3 -m http.server 8000
# Visit: http://localhost:8000
```

**Option 2: Node.js HTTP Server**
```bash
cd Website/docs
npx serve
# Visit: http://localhost:3000
```

**Option 3: PHP Built-in Server**
```bash
cd Website/docs
php -S localhost:8000
# Visit: http://localhost:8000
```

### File Editing

**HTML (index.html):**
- Update content, links, and structure
- All sections are clearly commented
- Follow semantic HTML5 practices

**CSS (style.css):**
- CSS variables defined in `:root`
- Organized by component sections
- Responsive breakpoints at 768px
- Print styles included

**JavaScript (script.js):**
- Modular functionality
- Well-commented code
- No external dependencies
- Vanilla JavaScript only

### Customization

#### Colors

Edit CSS variables in `style.css`:

```css
:root {
    --primary-color: #0066CC;    /* Main brand color */
    --secondary-color: #00CC66;  /* Success/accent color */
    --accent-color: #FF6600;     /* Call-to-action color */
}
```

#### Logo

Replace `assets/Wide_Black.png` with your logo:
- Recommended size: 300x60px
- Format: PNG with transparency
- Update both navbar and footer logos

#### Content

Edit `index.html` sections:
- Hero text and statistics
- Feature cards
- API examples
- Documentation links
- Download options
- Contact information

## Performance

### Optimization Checklist

- ✅ No external dependencies
- ✅ Inline critical CSS (small file size)
- ✅ Optimized images
- ✅ Lazy loading for images
- ✅ Minification ready (no build step required)
- ✅ Gzip/Brotli compression compatible
- ✅ Fast loading (~100KB total)

### Lighthouse Scores (Target)

- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

### Optimizations Applied

1. **Images**: Optimized PNG logo
2. **CSS**: Efficient selectors, minimal specificity
3. **JavaScript**: Vanilla JS, no frameworks
4. **Fonts**: Google Fonts with font-display: swap
5. **Animations**: GPU-accelerated transforms

## Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### Progressive Enhancement

- Core content accessible without JavaScript
- Graceful degradation for older browsers
- No critical dependencies on modern features

## SEO

### Meta Tags Included

```html
<meta name="description" content="...">
<meta name="keywords" content="...">
<meta name="author" content="HelixTrack Project">
<link rel="canonical" href="https://helix-track.github.io/Core/">
```

### Open Graph Tags

```html
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="...">
<meta property="og:url" content="...">
```

### Structured Data

Consider adding JSON-LD structured data for:
- Organization
- SoftwareApplication
- WebSite

## Accessibility

- ✅ Semantic HTML5 elements
- ✅ ARIA labels where needed
- ✅ Keyboard navigation support
- ✅ Focus indicators
- ✅ Alt text for images
- ✅ Color contrast (WCAG AA compliant)

## Future Enhancements

### Potential Additions

1. **Blog Section**: Latest news and updates
2. **Demo Environment**: Live API playground
3. **Video Tutorials**: Embedded YouTube guides
4. **Search Functionality**: Documentation search
5. **Multi-Language**: i18n support
6. **Dark Mode**: Theme switcher
7. **Analytics**: Google Analytics / Plausible
8. **Chat Widget**: Discord integration

## Maintenance

### Regular Updates

- Keep HelixTrack version numbers current
- Update API endpoint count as features are added
- Refresh documentation links
- Test cross-browser compatibility
- Monitor Lighthouse scores
- Check broken links

### Monitoring

```bash
# Check broken links
npm install -g linkinator
linkinator https://helix-track.github.io/Core/

# Test accessibility
npm install -g @axe-core/cli
axe https://helix-track.github.io/Core/

# Performance audit
npm install -g lighthouse
lighthouse https://helix-track.github.io/Core/ --view
```

## Contact

Reach us using one of the following communication channels:

- **GitHub Issues**: [https://github.com/Helix-Track/Core/issues](https://github.com/Helix-Track/Core/issues)
- **Email**: [svyaz.s.ulitkami@helixtrack.ru](mailto:svyaz.s.ulitkami@helixtrack.ru)
- **Telegram**: [https://t.me/helixtrack](https://t.me/helixtrack)
- **Yandex Messenger**: [Join Chat](https://yandex.ru/chat/#/join/8813765f-4288-49e9-8c65-1e088f988587)

## License

This website is part of the HelixTrack Core project and follows the same open-source license.

## Contributing

To improve the website:

1. Edit files in `Website/docs/`
2. Test locally with HTTP server
3. Verify responsive design (mobile/tablet/desktop)
4. Test JavaScript functionality
5. Check accessibility and performance
6. Submit pull request

---

**Website Version**: 3.0
**Last Updated**: October 19, 2025
**Status**: ✅ Production Ready
**HelixTrack Core**: V4.0 (372 API Actions, 1,769 Tests, 100% JIRA Parity + 102% Confluence Parity ✅)
