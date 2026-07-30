# Nova Py-Hub — Deployment Guide

## Your Current Setup

- **Domain:** `primevoidcourse.dpdns.org`
- **Free slots:** 1 (you can register another domain like `novapyhub.dpdns.org`)
- **Nameservers already set to Cloudflare:** `daisy.ns.cloudflare.com`, `yevgen.ns.cloudflare.com`
- **Device:** Phone only (no PC)

---

## Option 1: Deploy on DigitalPlat Pages (Easiest — All from Phone)

### Step 1: Register a Better Domain (Optional)
1. Go to DigitalPlat Dashboard → **Register Domain**
2. Enter `novapyhub.dpdns.org` (or similar)
3. Register it (free — you have 1 slot)
4. Now you have 2 domains

### Step 2: Create a Page on DigitalPlat
1. DigitalPlat Dashboard → **Pages** → **New**
2. Choose "Upload files" or "Create from scratch"
3. Upload the website files (the HTML/CSS/JS from this project)
4. Connect your domain

---

## Option 2: Deploy on GitHub Pages (Better — Free & Easy)

### Step 1: Create a GitHub Account (on your phone)
1. Open chrome/safari → go to `github.com`
2. Tap "Sign Up" → create username + email + password
3. Verify email

### Step 2: Create a Repository
1. Tap the `+` icon → **New repository**
2. Name: `novapyhub`
3. Make it **Public**
4. Check "Add a README file" → **Create repository**

### Step 3: Upload Website Files
1. In your repo, tap **Add file** → **Upload files**
2. Upload ALL files from the `novapyhub/` folder:
   - index.html
   - css/style.css
   - js/script.js
   - courses/ folder (all files inside)
   - certificate/ folder
3. Tap **Commit changes**

### Step 4: Enable GitHub Pages
1. Go to repo → **Settings** (gear icon)
2. Scroll down to **Pages**
3. Under "Branch" → select `main` → `/ (root)` → **Save**
4. Wait 2 minutes — your site is live at:
   `https://YOUR_USERNAME.github.io/novapyhub/`

### Step 5: Connect Your Custom Domain
1. Same Pages settings → "Custom domain" field
2. Enter: `primevoidcourse.dpdns.org` (or your new domain)
3. **Save**
4. Check "Enforce HTTPS" after DNS propagates

---

## Option 3: Deploy on Cloudflare Pages (Best Performance)

1. Create Cloudflare account at `dash.cloudflare.com`
2. Go to **Pages** → **Connect to Git**
3. Connect your GitHub repo
4. Build settings: Framework = None, Build command = empty
5. Deploy → your site is live
6. Go to Pages → your project → **Custom domains** → add your domain

---

## DNS Configuration (Cloudflare)

### The nameservers are already set. Now add your domain to Cloudflare:

1. Go to `dash.cloudflare.com` (on your phone browser)
2. Create account or log in
3. Click **Add a Site**
4. Enter your domain: `primevoidcourse.dpdns.org`
5. Select **Free plan**
6. Cloudflare will scan existing DNS records — **keep them**
7. Click **Continue**

### Add DNS Records

After your domain is added to Cloudflare:

1. Go to your domain in Cloudflare dashboard
2. Click **DNS** → **Records**
3. Add these records:

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| A | @ | 185.199.108.153 | Proxied (orange) |
| A | @ | 185.199.109.153 | Proxied (orange) |
| A | @ | 185.199.110.153 | Proxied (orange) |
| A | @ | 185.199.111.153 | Proxied (orange) |
| CNAME | www | YOUR_USERNAME.github.io | Proxied (orange) |

(These are GitHub Pages IPs. If using DigitalPlat Pages, use their IP instead.)

### SSL/TLS Settings
1. Go to **SSL/TLS** → **Overview**
2. Set to **Full** (not Flexible, not Strict)
3. Go to **Edge Certificates** → enable **Always Use HTTPS**

---

## How to Upload Files from Phone

### Using GitHub Mobile Web (No App Needed)
1. Open `github.com/YOUR_USERNAME/novapyhub` in chrome
2. Tap `.` (dot) key — opens web-based VS Code editor
3. You can now create/edit/upload all files
4. Commit changes via the Source Control tab

### Using Termux (Android) — For Git Operations
```bash
pkg install git
git clone https://github.com/YOUR_USERNAME/novapyhub.git
cd novapyhub
# Replace files with the ones from this project
git add .
git commit -m "Update website"
git push
```

---

## Troubleshooting

### "Domain not configured" error
- DNS propagation takes 5 minutes to 48 hours (usually under 1 hour)
- Check your DNS records are correct in Cloudflare

### "404 Page not found"
- Make sure your files are in the root of the repo, not a subfolder
- GitHub Pages expects index.html at the root

### HTTPS not working
- Cloudflare provides free SSL automatically
- Enable "Always Use HTTPS" in SSL/TLS settings
- It may take a few minutes to provision the certificate

### Site works at github.io but not at custom domain
- Wait for DNS propagation
- Verify the CNAME record is correct
- Check that your domain is added to Cloudflare

---

## Quick Checklist

- [ ] GitHub account created
- [ ] Repository created (`novapyhub`)
- [ ] All website files uploaded to repo
- [ ] GitHub Pages enabled in repo settings
- [ ] Custom domain set in Pages settings
- [ ] Cloudflare account created
- [ ] Domain added to Cloudflare
- [ ] DNS records added (A records or CNAME)
- [ ] SSL/TLS set to Full
- [ ] Wait 1-2 hours for propagation
- [ ] Your site is LIVE! 🎉

---

## Getting Started on Your Phone NOW

1. Open this file on your phone
2. Follow "Option 2: Deploy on GitHub Pages" steps
3. Upload all the files I created for you
4. Your Nova Py-Hub website will be live within 10 minutes
5. Then follow DNS section to connect your domain

**You don't need a PC. Everything here works from a phone browser.**
