import asyncio
from playwright.async_api import async_playwright
import os

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 1280, 'height': 800})
        # Use absolute path for file://
        path = os.path.abspath('homepage.html')
        await page.goto(f'file://{path}')

        # Capture top section
        await page.screenshot(path='homepage_top.png')

        # Scroll down to verify navbar opacity
        await page.evaluate("window.scrollTo(0, 100)")
        await asyncio.sleep(0.5)
        await page.screenshot(path='homepage_scrolled.png')

        # Zoom into CTA/Trust line - selecting the div containing the primary button and trust line
        cta = page.locator(".space-y-3").first
        await cta.screenshot(path='homepage_cta_trust.png')

        await browser.close()

asyncio.run(run())
