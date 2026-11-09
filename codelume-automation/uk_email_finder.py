
# UK Leads Finder - C:\CodeLume\uk_email_finder.py
# Kaam: websites.txt se websites padh ke unka email + speed nikalta hai
# Use: python uk_email_finder.py
import re, csv, time, requests
from urllib.parse import urljoin, urlparse

HEADERS = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) CodeLume-LeadFinder"}
EMAIL_RE = re.compile(r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}")
BAD = ["example@", "sentry@", "wixpress@", "noreply@", "no-reply@"]

def clean_url(u):
    u = u.strip()
    if not u: return None
    if not u.startswith("http"): u = "https://" + u
    return u

def find_emails(html, domain):
    emails = set()
    for e in EMAIL_RE.findall(html):
        e = e.lower()
        if any(b in e for b in BAD): continue
        if e.endswith((".png",".jpg",".webp",".svg",".js",".css")): continue
        # Sirf usi domain ya generic contact emails rakho
        if domain in e or e.startswith(("info@","hello@","contact@","sales@","enquiries@","support@")):
            emails.add(e)
    return list(emails)

def check_one(url):
    domain = urlparse(url).netloc.replace("www.","")
    start = time.time()
    try:
        r = requests.get(url, headers=HEADERS, timeout=15)
        speed = round(time.time()-start, 2)
        html = r.text
        emails = find_emails(html, domain)
        # Agar homepage pe na mile to /contact try karo
        if not emails:
            try:
                rc = requests.get(urljoin(url, "/contact"), headers=HEADERS, timeout=15)
                emails = find_emails(rc.text, domain)
                if not emails:
                    rc2 = requests.get(urljoin(url, "/contact-us"), headers=HEADERS, timeout=15)
                    emails = find_emails(rc2.text, domain)
            except: pass
        has_mobile = "viewport" in html.lower()
        return {"website": url, "email": emails[0] if emails else "", "all_emails": ";".join(emails), "speed_sec": speed, "has_mobile": "Yes" if has_mobile else "No", "status": "OK" if r.status_code==200 else f"HTTP {r.status_code}"}
    except Exception as e:
        return {"website": url, "email": "", "all_emails": "", "speed_sec": "", "has_mobile": "", "status": f"Error: {str(e)[:80]}"}

def main():
    try:
        lines = open("websites.txt", encoding="utf-8").read().splitlines()
    except FileNotFoundError:
        print("websites.txt nahi mili! Pehle websites.txt banao, ek line me ek website.")
        print("Example:\nhttps://example-estate.co.uk\nhttps://example-dental.co.uk")
        return
    urls = [clean_url(x) for x in lines if x.strip()]
    urls = [u for u in urls if u]
    print(f"{len(urls)} websites mili, check kar raha hun...")
    with open("leads.csv","w",newline="",encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=["website","email","all_emails","speed_sec","has_mobile","status"])
        w.writeheader()
        for i,u in enumerate(urls,1):
            row = check_one(u)
            w.writerow(row)
            print(f"[{i}/{len(urls)}] {u} -> {row['email'] or 'NO EMAIL'} | Speed: {row['speed_sec']}s | {row['status']}")
            time.sleep(1)
    print("\nHo gaya! leads.csv ban gayi. Usme se sirf wohi rakho jinka email hai aur speed 3s se zyada hai - wohi HOT leads hain.")

if __name__=="__main__":
    main()
