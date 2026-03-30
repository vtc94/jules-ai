import os
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        # Using current working directory
        current_dir = os.getcwd()
        page.goto(f"file://{current_dir}/homepage.html")

        # Take screenshot of the hero section
        hero = page.locator("section.hero-bg")
        hero.screenshot(path="cta_v2_hero.png")

        # Target the stats row specifically
        stats_row = page.locator(".flex.flex-wrap.gap-6.text-sm")
        stats_row.screenshot(path="cta_v2_stats.png")

        # Specifically target the CTA buttons to check alignment and height
        # Use a more robust selector if the class list is complex
        cta_container = page.locator(".flex.flex-col.sm\\:flex-row.gap-6.items-start")
        cta_container.screenshot(path="cta_v2_buttons.png")

        browser.close()

if __name__ == "__main__":
    run()
