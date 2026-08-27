import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import fs from 'fs';
import path from 'path';

async function runLighthouse(url) {
  console.log(`Launching Chrome for ${url}...`);
  let chrome;
  try {
    chrome = await chromeLauncher.launch({
      chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
    });
    
    console.log(`Chrome started on port ${chrome.port}. Running Lighthouse...`);
    const options = {
      logLevel: 'info',
      output: 'json',
      port: chrome.port
    };
    
    const runnerResult = await lighthouse(url, options);
    
    // Parse scores
    const categories = runnerResult.lhr.categories;
    const scores = {
      performance: categories.performance.score * 100,
      accessibility: categories.accessibility.score * 100,
      bestPractices: categories['best-practices'].score * 100,
      seo: categories.seo.score * 100
    };

    const metrics = runnerResult.lhr.audits;
    const keyMetrics = {
      fcp: metrics['first-contentful-paint'].displayValue,
      lcp: metrics['largest-contentful-paint'].displayValue,
      tbt: metrics['total-blocking-time'].displayValue,
      cls: metrics['cumulative-layout-shift'].displayValue,
      speedIndex: metrics['speed-index'].displayValue
    };

    console.log('\n==================================================');
    console.log('LIGHTHOUSE SCORE AUDIT RESULT');
    console.log('==================================================');
    console.log(`Performance:    ${scores.performance}`);
    console.log(`Accessibility:  ${scores.accessibility}`);
    console.log(`Best Practices: ${scores.bestPractices}`);
    console.log(`SEO:            ${scores.seo}`);
    console.log('--------------------------------------------------');
    console.log(`First Contentful Paint (FCP):    ${keyMetrics.fcp}`);
    console.log(`Largest Contentful Paint (LCP):  ${keyMetrics.lcp}`);
    console.log(`Total Blocking Time (TBT):       ${keyMetrics.tbt}`);
    console.log(`Cumulative Layout Shift (CLS):   ${keyMetrics.cls}`);
    console.log(`Speed Index:                     ${keyMetrics.speedIndex}`);
    console.log('==================================================\n');

    return { scores, keyMetrics };
  } catch (err) {
    console.error('Lighthouse audit failed:', err.message || err);
  } finally {
    if (chrome) {
      console.log('Stopping Chrome...');
      try {
        await chrome.kill();
      } catch (killErr) {
        console.warn('Failed to kill Chrome cleanly:', killErr.message);
      }
    }
  }
}

const targetUrl = process.argv[2] || 'https://behindthebuild-fawn.vercel.app/';
runLighthouse(targetUrl).then(() => process.exit(0));
