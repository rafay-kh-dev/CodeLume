"""
Rafay's CodeLume - Auto Indexing Automation (NO PIP NEEDED VERSION)
requests ki zaroorat nahi, sirf Python ka built-in urllib use hota hai.
Isliye pip install karne ki zaroorat hi nahi.

Chalane ka tareeka:
  py indexing_automation.py
ya
  python indexing_automation.py
"""

import re, time, csv, urllib.request, urllib.error, ssl
from datetime import datetime

SITE = "https://www.Rafay's CodeLume.online"
SITEMAP_URL = f"{SITE}/sitemap.xml"
API_BASE = "https://Rafay's CodeLume-rb3h.onrender.com"
HEADERS = {"User-Agent": "Rafay's CodeLume-IndexBot/1.0"}

def fetch(url, timeout=25):
    req = urllib.request.Request(url, headers=HEADERS)
    ctx = ssl._create_unverified_context()
    with urllib.request.urlopen(req, timeout=timeout, context=ctx) as r:
        return r.status, r.read().decode("utf-8", errors="ignore")

def get_all_urls():
    urls = set()
    for p in ["/", "/blogs", "/start-project", "/about"]:
        urls.add(SITE + p)
    try:
        status, text = fetch(SITEMAP_URL, timeout=20)
        if status == 200:
            found = re.findall(r"<loc>(.*?)</loc>", text)
            for u in found:
                urls.add(u.strip())
            print(f"✅ Sitemap se {len(found)} URLs mile")
        else:
            print(f"⚠️ Sitemap nahi mila (Status {status})")
    except Exception as e:
        print(f"⚠️ Sitemap fetch fail: {e}")
    try:
        status, text = fetch(f"{API_BASE}/api/blogs", timeout=30)
        if status == 200:
            import json
            blogs = json.loads(text)
            if isinstance(blogs, list):
                for b in blogs:
                    if b.get("status") == "published" and b.get("slug"):
                        urls.add(f"{SITE}/blogs/{b['slug']}")
                print(f"✅ API se {len(blogs)} blogs mile")
    except Exception as e:
        print(f"⚠️ API fetch fail: {e} - Render sleep pe hoga")
    return sorted(urls)

def check_page(url):
    issues = []
    status = 0
    load_time = 0
    title = ""
    start = time.time()
    try:
        status, html = fetch(url, timeout=25)
        load_time = round(time.time() - start, 2)
        if status != 200:
            issues.append(f"Status {status} - page khul hi nahi raha, Google index nahi karega")
            return {"url": url, "status": status, "load_time": load_time, "issues": issues, "indexed_chance": "LOW", "title": ""}
        m = re.search(r"<title>(.*?)</title>", html, re.I | re.S)
        title = m.group(1).strip() if m else ""
        if not title or len(title) < 10:
            issues.append("Title missing ya bahut chhota")
        if "Rafay's CodeLume-backend" in html:
            issues.append("Purana dead API (Rafay's CodeLume-backend) abhi bhi page me hai")
        if not re.search(r'name="description"', html, re.I):
            issues.append("Meta description missing")
        if not re.search(r'rel="canonical"', html, re.I):
            issues.append("Canonical missing")
        has_noindex = bool(re.search(r'content="[^"]*noindex', html, re.I))
        if has_noindex:
            issues.append("NOINDEX laga hua hai - Google jaan ke index nahi karega!")
        if not re.search(r"<h1", html, re.I):
            issues.append("H1 missing")
        if "Loading article" in html and "article-content" not in html:
            issues.append("Sirf Loading... dikh raha hai, content SSR nahi hai")
            has_loading_only = True
        else:
            has_loading_only = False
        if load_time > 5:
            issues.append(f"Bahut slow ({load_time}s) - Render sleep pe hai")
        elif load_time > 3:
            issues.append(f"Slow ({load_time}s)")
        if "/admin" in url and not has_noindex:
            issues.append("Admin page indexable hai - ispe noindex hona chahiye")
        if has_noindex or status != 200 or has_loading_only:
            chance = "LOW - Index nahi hoga"
        elif issues:
            chance = "MEDIUM - Late ho sakta hai"
        else:
            chance = "HIGH - Index ho jayega"
        return {"url": url, "status": status, "load_time": load_time, "issues": issues, "indexed_chance": chance, "title": title[:80]}
    except Exception as e:
        load_time = round(time.time() - start, 2)
        issues.append(f"Fetch fail / Timeout: {e}")
        return {"url": url, "status": 0, "load_time": load_time, "issues": issues, "indexed_chance": "LOW", "title": ""}

def auto_request_index():
    print("\n🔄 Google + Bing ko sitemap ping kar raha hoon...")
    for name, ping_url in [("Google", f"https://www.google.com/ping?sitemap={SITEMAP_URL}"), ("Bing", f"https://www.bing.com/ping?sitemap={SITEMAP_URL}")]:
        try:
            status, _ = fetch(ping_url, timeout=15)
            print(f"  {name} ping: {status}")
        except Exception as e:
            print(f"  {name} ping fail: {e}")

def main():
    print("="*60)
    print(f"Rafay's CodeLume Auto-Indexing - {datetime.now().strftime('%d %b %Y, %I:%M %p')}")
    print("="*60)
    urls = get_all_urls()
    print(f"\nTotal pages: {len(urls)}\n")
    results = []
    for i, url in enumerate(urls, 1):
        print(f"[{i}/{len(urls)}] {url}")
        res = check_page(url)
        results.append(res)
        if not res["issues"]:
            print(f"  ✅ OK - {res['indexed_chance']} - {res['load_time']}s")
        else:
            print(f"  ❌ {res['indexed_chance']}")
            for iss in res["issues"]:
                print(f"     - {iss}")
        time.sleep(1)
    auto_request_index()
    with open("indexing_report.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=["url","status","load_time","indexed_chance","issues"])
        w.writeheader()
        for r in results:
            w.writerow({"url": r["url"], "status": r["status"], "load_time": r["load_time"], "indexed_chance": r["indexed_chance"], "issues": " | ".join(r["issues"]) if r["issues"] else "OK"})
    rows = ""
    for r in results:
        color = "#16a34a" if "HIGH" in r["indexed_chance"] else ("#f59e0b" if "MEDIUM" in r["indexed_chance"] else "#dc2626")
        iss = "<br>".join(r["issues"]) if r["issues"] else "✅ Koi issue nahi"
        rows += f"<tr><td>{r['url']}</td><td>{r['status']}</td><td>{r['load_time']}s</td><td style='color:{color};font-weight:bold'>{r['indexed_chance']}</td><td>{iss}</td></tr>"
    html = f"<html><head><meta charset='utf-8'><title>Rafay's CodeLume Indexing Report</title></head><body style='font-family:sans-serif;padding:20px'><h1>Rafay's CodeLume Indexing Report - {datetime.now().strftime('%d %b %Y')}</h1><p>Total: {len(results)} | OK: {sum(1 for r in results if not r['issues'])} | Issue: {sum(1 for r in results if r['issues'])}</p><table border='1' cellpadding='8' cellspacing='0' style='border-collapse:collapse;width:100%'><tr><th>URL</th><th>Status</th><th>Speed</th><th>Index Chance</th><th>Issue</th></tr>{rows}</table></body></html>"
    with open("indexing_report.html", "w", encoding="utf-8") as f:
        f.write(html)
    print("\n" + "="*60)
    print(f"✅ DONE - indexing_report.html + indexing_report.csv ban gayi")
    print(f"   OK: {sum(1 for r in results if not r['issues'])} / {len(results)}")
    print("="*60)

if __name__ == "__main__":
    main()
