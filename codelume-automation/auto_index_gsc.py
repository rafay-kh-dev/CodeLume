import time, json, urllib.request
from google.oauth2 import service_account
from google.auth.transport.requests import AuthorizedSession

KEY_FILE = "gsc-key.json"
SCOPES = ["https://www.googleapis.com/auth/indexing"]

# Sitemap + API se URLs nikalte hain, wahi indexing_automation wali list
import re, ssl
SITE = "https://www.Rafay's CodeLume.online"
urls = [f"{SITE}/", f"{SITE}/blogs", f"{SITE}/services", f"{SITE}/about", f"{SITE}/start-project"]

try:
    ctx = ssl._create_unverified_context()
    with urllib.request.urlopen(f"{SITE}/sitemap.xml", timeout=20, context=ctx) as r:
        found = re.findall(r"<loc>(.*?)</loc>", r.read().decode())
        for u in found:
            if u.strip() not in urls:
                urls.append(u.strip())
    print(f"Sitemap se {len(found)} URLs mile, total {len(urls)}")
except Exception as e:
    print(f"Sitemap fail: {e}")

print("Google Indexing API ko bhej raha hoon...\n")
creds = service_account.Credentials.from_service_account_file(KEY_FILE, scopes=SCOPES)
session = AuthorizedSession(creds)

for url in urls:
    body = {"url": url, "type": "URL_UPDATED"}
    resp = session.post("https://indexing.googleapis.com/v3/urlNotifications:publish", json=body)
    if resp.status_code in [200, 201]:
        print(f"✅ SENT: {url}")
    else:
        print(f"❌ FAIL {resp.status_code}: {url} -> {resp.text[:200]}")
    time.sleep(2)

print("\nDone! Google ko sab URLs bhej diye.")