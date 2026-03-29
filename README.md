# Pragmatic Strength

Website for Pragmatic Strength — elite powerlifting coaching led by Michael Greeno and Heidi Howar.

## Structure

```
├── index.html      # Main page
├── styles.css      # All styles
├── main.js         # Carousel, scroll animations, contact form
└── images/         # Logos, coach photos, carousel images
```

## Setup

This is a static site — no build step required. Open `index.html` in a browser or serve locally:

```bash
python3 -m http.server 8080
```

Then visit [http://localhost:8080](http://localhost:8080).

## Contact Form (EmailJS)

The contact form uses [EmailJS](https://www.emailjs.com) to send inquiries. To enable it:

1. Sign up at emailjs.com and create an Email Service + Template
2. In `main.js`, replace the three placeholders at the top:

```js
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
```

Template variables: `{{fname}}`, `{{lname}}`, `{{email}}`, `{{goal}}`, `{{message}}`

## Deployment

Hosted as a static site. Compatible with Netlify, GitHub Pages, or Cloudflare Pages.
