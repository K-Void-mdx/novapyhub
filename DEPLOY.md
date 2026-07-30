# Nova Py-Hub

**Password:** `novalA77`

**WhatsApp Owner:** +2347046855205  
**WhatsApp Assistant:** +2349121419046

---

## Deployment on Vercel (Already Done)

Your site is live at: `https://novapyhub.vercel.app`

### To Connect Your Custom Domain:

1. Go to `vercel.com` → your `novapyhub` project → **Domains**
2. Add: `primevoidcourse.dpdns.org` (or your new domain)
3. Vercel will show you DNS records to add

### Cloudflare DNS Setup

1. Go to `dash.cloudflare.com` → **Add a Site** → enter your domain → Free plan
2. In DNS → add CNAME record:
   - Type: `CNAME`
   - Name: `@`
   - Target: `cname.vercel-dns.com`
   - Proxy: Off (gray cloud)
3. Also add for `www`:
   - Type: `CNAME`
   - Name: `www`
   - Target: `cname.vercel-dns.com`
   - Proxy: Off
4. SSL/TLS → set to **Full**
5. Wait for DNS propagation (5 min to 1 hour)

## Features

- **Password-protected** — students enter password `novalA77` to access
- **WhatsApp support** — floating buttons link to Owner (+2347046855205) and Assistant (+2349121419046)
- **Device selection** — choose iPhone, Android, or PC for tailored instructions
- **42 Python lessons** — beginner through professional/university level
- **Code syntax highlighting** — Python-colored code with copy buttons
- **Quizzes** — A-D multiple choice after lessons, wrong answers vibrate phone
- **Progress tracking** — auto-saves completed lessons, certificates unlock when level is complete
- **Dark/Light mode** — toggle in navigation
- **3D design** — Gold/Black/Blue premium theme with animations
- **Certificate** — auto-generated PDF when level is completed

## Updating the Site

After editing files:
```bash
git add .
git commit -m "description of changes"
git push
```
Vercel auto-deploys when you push to GitHub.
