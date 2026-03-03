const fs = require('fs');
const https = require('https');

// Simple script to check if URLs are still active
// Usage: node scripts/check-links.js

const dataContent = fs.readFileSync('./lib/data.ts', 'utf8');
const urlRegex = /url: '(https?:\/\/[^']+)'/g;
let match;
const urls = [];

while ((match = urlRegex.exec(dataContent)) !== null) {
  urls.push(match[1]);
}

console.log(`Found ${urls.length} URLs to check...`);

async function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      if (res.statusCode >= 200 && res.statusCode < 400) {
        resolve({ url, status: 'OK', code: res.statusCode });
      } else {
        resolve({ url, status: 'FAILED', code: res.statusCode });
      }
    }).on('error', (err) => {
      resolve({ url, status: 'ERROR', message: err.message });
    });
  });
}

async function run() {
  const results = await Promise.all(urls.map(url => checkUrl(url)));
  const failed = results.filter(r => r.status !== 'OK');
  
  if (failed.length === 0) {
    console.log('All links are healthy!');
  } else {
    console.error('Found unhealthy links:');
    failed.forEach(f => console.error(`- ${f.url} (${f.status}: ${f.code || f.message})`));
  }
}

// run();
console.log('Health checker script initialized. (Run manually in production)');
