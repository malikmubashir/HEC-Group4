# Global Apex — Professional Website v2.0

**Website:** https://www.globalapex.net  
**GitHub:** https://github.com/malikmubashir/globalapex.net  
**Contact:** contact@globalapex.net

---

## Project Structure

```
globalapex.net/
├── index.html              # Homepage
├── about.html              # About Us
├── services.html           # Our Services
├── case-studies.html       # Case Studies
├── insights.html           # Insights & Thought Leadership
├── contact.html            # Contact Page
├── contact-handler.php     # PHP form handler (sends to contact@globalapex.net)
├── sitemap.xml             # XML sitemap for search engines
├── robots.txt              # Search engine & AI crawler directives
├── llms.txt                # AI/LLM crawler guidance
├── .htaccess               # Apache config (HTTPS, caching, security)
├── assets/
│   ├── css/style.css       # Main stylesheet
│   └── js/main.js          # JavaScript (nav, animations, form)
└── .github/
    └── workflows/
        └── deploy.yml      # GitHub Actions: auto-deploy to cPanel via SSH
```

---

## GitHub Actions Deployment Setup

Set the following **Repository Secrets** in GitHub (Settings → Secrets → Actions):

| Secret Name       | Value                                          |
|-------------------|------------------------------------------------|
| `SSH_PRIVATE_KEY` | Your SSH private key (from cPanel key manager) |
| `REMOTE_HOST`     | `globalapex.net`                               |
| `REMOTE_USER`     | `globalapex`                                   |
| `REMOTE_TARGET`   | `/home/globalapex/public_html/`                |

> **How to get the SSH private key:**  
> In cPanel → Security → SSH Access → Manage SSH Keys → View/Download the private key you generated.

---

## Manual cPanel Deployment (SSH)

```bash
# Connect to server (cPanel typically uses port 2222)
ssh globalapex@globalapex.net -p 2222

# Navigate to web root
cd public_html

# If git is initialized on server:
git pull origin main

# Or upload files via FTP/SFTP using cPanel File Manager
```

---

## Contact Form

- Form submits to `/contact-handler.php` via AJAX
- Emails delivered to: **contact@globalapex.net**
- Auto-reply sent to the submitter
- Anti-spam: honeypot field (no CAPTCHA dependency)
- PHP `mail()` function — no external SMTP required

---

## SEO Features

- Schema.org JSON-LD (Organization, Service, FAQ, BreadcrumbList)
- Open Graph & Twitter Card meta tags
- Canonical URLs
- XML Sitemap
- Proper heading hierarchy (H1→H6)
- Descriptive alt text on all images
- robots.txt with AI crawler permissions (GPTBot, ClaudeBot, PerplexityBot)
- llms.txt for AI search engine guidance
- Fast loading: system fonts fallback, lazy images, minimal JS
- Mobile responsive, Core Web Vitals optimized

---

## Tech Stack

- Pure HTML5, CSS3 (custom properties), Vanilla JavaScript
- PHP for contact form backend
- Apache (.htaccess) for URL rewrites, security headers, caching
- Google Fonts: Playfair Display + Inter
- Images: Unsplash CDN (replace with self-hosted for production)
