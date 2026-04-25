# Liver Health Connect – GitHub Pages Site

## File Structure
```
/
├── index.html                          ← Homepage
├── style.css                           ← Shared styles (all pages use this)
├── nav.js                              ← Shared nav/scroll JS
├── liver-health-basics/
│   ├── index.html
│   ├── fatty-liver-disease/index.html
│   ├── alcohol-related-liver-disease/index.html
│   ├── viral-hepatitis/index.html
│   ├── autoimmune-liver-diseases/index.html
│   ├── liver-cancer/index.html
│   └── cirrhosis/index.html
├── community-events-outreach/index.html
├── our-partners/index.html
├── pathways-to-care/index.html
├── diet-and-liver-health/index.html
├── our-team/index.html
└── contact-us/index.html
```

## Deploying to GitHub Pages

1. Go to github.com → New Repository → name it e.g. `liverhealthconnect`
2. Upload ALL files (keeping the folder structure exactly as-is)
3. Go to Settings → Pages → Source: Deploy from branch → Branch: main → / (root)
4. GitHub will give you a URL like: https://yourusername.github.io/liverhealthconnect/

## Connecting Your Custom Domain (liverhealthconnect.com)

1. In your repo root, create a file named `CNAME` containing just:
   liverhealthconnect.com
2. In your domain registrar's DNS settings, add:
   - Type: A, Name: @, Value: 185.199.108.153
   - Type: A, Name: @, Value: 185.199.109.153
   - Type: A, Name: @, Value: 185.199.110.153
   - Type: A, Name: @, Value: 185.199.111.153
   - Type: CNAME, Name: www, Value: yourusername.github.io
3. Back in GitHub Settings → Pages → Custom domain → enter liverhealthconnect.com
4. Check "Enforce HTTPS" once it becomes available (may take up to 24h)

## Adding New Pages

Copy any existing page's HTML, update the breadcrumb and content, save it as a new folder/index.html, and add a link to the nav in nav.js and style.css is already shared.
