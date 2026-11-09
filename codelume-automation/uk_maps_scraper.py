
# UK Maps Scraper - C:\CodeLume\uk_maps_scraper.py
# Kaam: Google Maps se khud hi businesses + websites nikalta hai
# Use: py uk_maps_scraper.py
# Pehle install karo:
#   pip install playwright
#   playwright install chromium

import time, csv, re
from playwright.sync_api import sync_playwright

# ===== YAHAN BADLO =====
SEARCH_QUERY = "Estate Agents in London"  # <-- Yahan City + Niche badlo, jaise "Dentists in Manchester"
MAX_LEADS = 50  # Ek baar me kitne nikalne hain, 50 se zyada mat rakho warna Google block karega
OUTPUT_FILE = "websites.txt"  # Finder isko padhega
# =======================

def main():
    print(f"Searching Google Maps for: {SEARCH_QUERY}")
    print("Browser khul raha hai... agar CAPTCHA aaye to khud solve karke Enter dabao.")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False, args=["--start-maximized"])
        page = browser.new_page(viewport={"width": 1400, "height": 900})
        # Google Maps search
        url = f"https://www.google.com/maps/search/{SEARCH_QUERY.replace(' ', '+')}"
        page.goto(url, timeout=60000)
        time.sleep(5)

        # Agar Consent / Accept aaye to click karo
        try:
            page.get_by_text("Accept all").first.click(timeout=3000)
            time.sleep(2)
        except: pass
        try:
            page.get_by_text("Reject all").first.click(timeout=3000)
            time.sleep(2)
        except: pass

        input("Agar CAPTCHA / 'I'm not a robot' aaya hai to usko solve karke yahan Enter dabao... (warna seedha Enter dabao)")

        # Results wali list ko scroll karo taake saare load hon
        print("Results load ho rahe hain, scroll kar raha hun...")
        for _ in range(8):
            try:
                page.mouse.wheel(0, 3000)
                time.sleep(2)
            except: pass

        # Saare business cards nikalo
        # Google Maps me har business ek <a> hota hai jiska href /maps/place/ se shuru hota hai
        links = page.eval_on_selector_all("a[href*='/maps/place/']", "els => els.map(e => e.href)")
        # Duplicate hatao
        seen = set()
        uniq_links = []
        for l in links:
            if l not in seen:
                seen.add(l)
                uniq_links.append(l)
        print(f"{len(uniq_links)} businesses mile, ab ek-ek karke website nikal raha hun...")

        websites = []
        leads = []
        for i, link in enumerate(uniq_links[:MAX_LEADS], 1):
            try:
                page.goto(link, timeout=30000)
                time.sleep(2.5)  # Human jaisa gap, warna block hoga
                # Business name
                try:
                    name = page.locator("h1").first.inner_text(timeout=5000)
                except:
                    name = ""
                # Website button - "Website" likha hota hai
                website = ""
                try:
                    # Website ka link <a> me hota hai
                    btns = page.locator("a[href^='http']").all()
                    for b in btns:
                        try:
                            txt = b.inner_text(timeout=1000).strip().lower()
                            href = b.get_attribute("href") or ""
                            if "website" in txt or "visit" in txt:
                                website = href
                                break
                            # Agar direct website link hai aur google ka nahi hai
                            if href.startswith("http") and "google.com" not in href and "maps" not in href:
                                # Pehla external link hi website hota hai aksar
                                if not website and len(href) > 12:
                                    website = href
                        except: continue
                except: pass
                # Phone
                phone = ""
                try:
                    body = page.locator("body").inner_text(timeout=3000)
                    m = re.search(r"\+44\s?\d[\d\s]{8,}", body)
                    if m: phone = m.group(0).strip()
                except: pass

                print(f"[{i}/{min(MAX_LEADS,len(uniq_links))}] {name} -> {website or 'NO WEBSITE'}")
                if website:
                    # google redirect hatao agar ho
                    if "google.com/url" in website:
                        import urllib.parse
                        q = urllib.parse.parse_qs(urllib.parse.urlparse(website).query).get("q", [""])[0]
                        if q: website = q
                    websites.append(website)
                    leads.append({"name": name, "website": website, "phone": phone, "maps_link": link})
                time.sleep(1)
            except Exception as e:
                print(f"[{i}] Error: {e}")
                continue

        browser.close()

    # websites.txt me save karo taake finder use kar sake
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        for w in websites:
            f.write(w + "\n")
    # leads_maps.csv me detail save karo
    with open("leads_maps.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=["name","website","phone","maps_link"])
        w.writeheader()
        w.writerows(leads)

    print(f"\nHO GAYA! {len(websites)} websites mili.")
    print(f"-> {OUTPUT_FILE} me save ho gayi")
    print(f"-> leads_maps.csv me detail save ho gayi")
    print(f"Ab agla step: py uk_email_finder.py chalao, wo in websites se email nikalega.")

if __name__ == "__main__":
    main()
