# Liver Health Connect - GitHub Pages Replica

A modular, maintainable website replica for Liver Health Connect using injectable navbar and footer components. Perfect for static hosting on GitHub Pages.

## 🎯 Project Overview

This is an exact replica of the Liver Health Connect homepage with a key improvement: **modular, reusable navbar and footer components**. This means you only need to update navigation or footer content in one place, and those changes automatically appear on every page.

## 📁 Project Structure

```
liver-health-connect/
├── index.html                          # Homepage
├── styles.css                          # All shared styles (extracted)
├── navbar.html                         # Navbar component (auto-injected)
├── footer.html                         # Footer component (auto-injected)
├── js/
│   └── components.js                   # Loader that injects components
├── assets/
│   └── images/
│       └── LHC_logo_transparent.png    # Logo
└── pages/
    ├── liver-health-basics.html        # Example subpage template
    ├── diet-and-liver-health.html
    ├── community-events-outreach.html
    ├── pathways-to-care.html
    ├── our-team.html
    └── contact-us.html
```

## 🚀 How the Component System Works

### The Smart Injection System

Instead of duplicating navbar and footer HTML across every page, we have:

1. **navbar.html** - Just the `<nav>` element
2. **footer.html** - Just the `<footer>` element
3. **components.js** - Fetches these files and injects them into any page

### How It Works in Practice

When you load any page:

```html
<!-- At the top of your page body -->
<script src="/js/components.js"></script>
```

The JavaScript automatically:
- Fetches `/navbar.html` and inserts it at the start of the body
- Fetches `/footer.html` and inserts it at the end of the body
- Initializes all functionality (hamburger menu, animations, etc.)

**Result:** You write once, deploy everywhere! ✨

## 🔧 Setting Up GitHub Pages

### Step 1: Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Create a repository named:
   - **username.github.io** (for your main site)
   - OR any name like **liver-health-connect** (for a project site)

### Step 2: Push Your Files

```bash
# Initialize git in your local folder
cd your-project-folder
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Liver Health Connect website"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/yourusername/liver-health-connect.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Build and deployment":
   - Source: Select `Deploy from a branch`
   - Branch: Select `main` and `/root`
4. Click **Save**
5. Wait 1-2 minutes for deployment

**Your site will be live at:**
- `https://yourusername.github.io/` (if repo is `username.github.io`)
- `https://yourusername.github.io/liver-health-connect/` (if repo name is `liver-health-connect`)

## 📝 Creating New Subpages

It's incredibly easy to create new pages:

### Quick Start

1. **Copy the template:**
   ```bash
   cp pages/liver-health-basics.html pages/my-new-page.html
   ```

2. **Edit the new file:**
   ```html
   <title>My New Page - Liver Health Connect</title>
   <h1>My New Page Title</h1>
   <!-- Add your unique content -->
   ```

3. **That's it!** The navbar and footer load automatically.

### Important Notes

- All page files must be in the `/pages` directory
- All pages must include: `<link rel="stylesheet" href="/styles.css" />`
- All pages must include: `<script src="/js/components.js"></script>`
- Use **relative paths** for internal links (e.g., `/pages/contact-us.html`)

## ✏️ Maintaining Your Site

### Update Navigation Links

Edit `/navbar.html`:

```html
<li><a href="/pages/my-new-page.html">My New Page</a></li>
```

This change appears on **every page automatically**!

### Update Footer Content

Edit `/footer.html`:

```html
<li><a href="/pages/my-new-page.html">My New Page</a></li>
```

Again, changes appear **everywhere instantly**!

### Update Styles

Edit `/styles.css`:

```css
:root {
  --green-deep: #1e8735;  /* Change your colors here */
  --green-mid: #6e9b2d;
  /* ... */
}
```

Changes apply to **all pages** automatically.

### Update Hero Section or Global Content

Since the hero is in `index.html`, it only appears on the homepage. If you want a different header on subpages, edit the individual page files.

## 🎨 Customization Guide

### Change Colors

In `/styles.css`, modify the CSS variables:

```css
:root {
  --green-deep:   #1e8735;    /* Main dark green */
  --green-mid:    #6e9b2d;    /* Medium green */
  --green-light:  #abbe30;    /* Light green */
  --orange:       #e05f1a;    /* Accent orange */
  /* ... more colors ... */
}
```

### Change Logo

Replace `/assets/images/LHC_logo_transparent.png` with your new logo, or update the logo reference in `/navbar.html`:

```html
<img src="/assets/images/your-logo.png" alt="Liver Health Connect" class="nav-logo-img" />
```

### Modify Navigation Links

Edit `/navbar.html` to add/remove menu items:

```html
<li><a href="/pages/new-page.html">New Page</a></li>
```

### Update Social Media Links

Edit `/footer.html` and update the social links:

```html
<a href="https://your-instagram-url.com" title="Instagram" target="_blank">
```

## 🚨 Troubleshooting

### Components Not Loading?

If navbar/footer don't appear:

1. **Check file paths:** Ensure `navbar.html` and `footer.html` are in the **root directory**
2. **Check script:** Ensure `<script src="/js/components.js"></script>` is included
3. **Check console:** Open DevTools (F12) → Console for error messages
4. **Browser cache:** Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### Images Not Loading?

1. Check image paths in `navbar.html` (logo path should be `/assets/images/LHC_logo_transparent.png`)
2. Verify images exist in `/assets/images/` folder
3. Try a hard refresh

### Styles Look Wrong?

1. Ensure `<link rel="stylesheet" href="/styles.css" />` is in your `<head>`
2. Hard refresh browser cache
3. Check browser DevTools for missing files (red X)

## 📚 File Reference

| File | Purpose | Edit When... |
|------|---------|--------------|
| `index.html` | Homepage | Adding/removing sections on home page |
| `navbar.html` | Navigation menu | Changing menu items, logo, links |
| `footer.html` | Footer content | Updating footer links, social media, copyright |
| `styles.css` | All styling | Changing colors, fonts, layout, animations |
| `js/components.js` | Component loader | Advanced: Adding new functionality |
| `pages/*.html` | Subpages | Creating new content pages |
| `assets/images/` | Images & logos | Adding new images |

## 💡 Pro Tips

1. **Use the browser DevTools** (F12) to debug issues
2. **Test locally** before pushing to GitHub (just open HTML files in your browser)
3. **Commit frequently** to GitHub with clear messages
4. **Keep a backup** of important changes locally
5. **Preview changes** in a text editor with split-screen view

## 🔗 GitHub Pages Documentation

For more information about GitHub Pages, visit:
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-site)
- [Troubleshooting](https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-404-errors-for-github-pages)

## 📧 Need Help?

If you encounter issues:

1. Check the troubleshooting section above
2. Review the file structure to ensure everything is in place
3. Open your browser's Developer Tools (F12) to check for error messages
4. Check GitHub's Pages documentation

## 🎉 You're All Set!

Your Liver Health Connect website is ready to go live on GitHub Pages. Update content, add new pages, and maintain consistency across your entire site with ease!

---

**Built with care for the community** ❤️🫀
