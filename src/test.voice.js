// Replace these with your Google account credentials
const email = 'nudspray@gmail.com';
const password = 'TinaNud0627#';

// Replace these with the recipient's phone number and your message
const recipientNumber = '+6027438646';
const message = 'Hello from Google Voice using Puppeteer and TypeScript!';


import puppeteer from 'puppeteer-core';

(async () => {
  try {
    const browser = await puppeteer.connect({
      browserURL: 'http://localhost:9222'
    });

    const page = await browser.newPage();

    // Navigate to a website
    await page.goto('https://example.com');

    // Perform actions on the page
    const title = await page.title();
    console.log('Page title:', title);

    // Optionally, close the page or perform other actions
    await page.close();

    // Note: Do not close the browser instance as it is externally managed
  } catch (error) {
    console.error('Error connecting to the browser:', error);
  }
})();
