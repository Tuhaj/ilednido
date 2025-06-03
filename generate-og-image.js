// This script generates a static OG image for the project
// Run with: node generate-og-image.js

const fs = require('fs');
const path = require('path');

// Simple SVG-based OG image
const ogImageSVG = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1e293b;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#334155;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>
  
  <!-- Clock Circle -->
  <circle cx="600" cy="200" r="60" fill="rgba(255,255,255,0.1)" />
  
  <!-- Clock Icon -->
  <g transform="translate(600, 200)">
    <circle cx="0" cy="0" r="40" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"/>
    <path d="M0,-20 L0,0 L20,10" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  
  <!-- Title -->
  <text x="600" y="340" font-family="system-ui, -apple-system, sans-serif" font-size="72" font-weight="bold" fill="white" text-anchor="middle" letter-spacing="-2">
    Ile dni do
  </text>
  
  <!-- Subtitle -->
  <text x="600" y="420" font-family="system-ui, -apple-system, sans-serif" font-size="32" fill="rgba(255,255,255,0.8)" text-anchor="middle">
    Koniec kadencji Karola Nawrockiego
  </text>
</svg>`;

// Write SVG to public directory
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

fs.writeFileSync(path.join(publicDir, 'og-image.svg'), ogImageSVG);
console.log('OG image generated at public/og-image.svg');
console.log('Note: For best compatibility, you may want to convert this SVG to PNG using an image editor or online tool.');