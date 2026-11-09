
# UK Sender - C:\CodeLume\uk_sender.py
# Kaam: leads.csv se personalized emails bhejta hai, safe gap ke saath
# Use: python uk_sender.py
# Pehle neeche SMTP setting bharo
import csv, time, smtplib, random
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# ===== SETTING YAHAN BHARO =====
SMTP_SERVER = "smtp.gmail.com"  # Brevo ke liye: smtp-relay.brevo.com
SMTP_PORT = 587
SMTP_USER = "TUMHARA_GMAIL@gmail.com"  # jis Gmail ka App Password banaya
SMTP_PASS = "TUMHARA_16_LETTER_APP_PASSWORD"  # space ke bagair
FROM_EMAIL = "rafay@codelume.online"
FROM_NAME = "Muhammad Rafay - CodeLume"
DAILY_LIMIT = 50  # Pehle hafte 50 se zyada mat bhejo
DELAY_MIN = 30  # har email ke beech 30-60 sec gap
DELAY_MAX = 60
# ===============================

TEMPLATE_REDESIGN = """Hi {name},

I was looking at estate agents in {city} and I found your website {website}.

I noticed it takes {speed}s to load on mobile, and most visitors leave if a site takes more than 3 seconds. That means you could be losing enquiries every week.

I help UK businesses rebuild fast, modern websites that load in under 1 second and turn visitors into enquiries.

Would you like me to send you a free 1-page audit of your site - what is slow and what to fix?

Best regards,
Muhammad Rafay
CodeLume - Web Development Agency
rafay@codelume.online
https://www.codelume.online

P.S. If you don't want emails from me, just reply STOP and I won't email again.
"""

TEMPLATE_ADS = """Hi {name},

I saw your business in {city} - {website} - and I noticed you are not running Facebook / Google Ads right now, while your competitors are.

I help UK businesses get 10-20 new enquiries per month with targeted ads in their local area.

Would you like me to send you a free ads plan for {city} - what it would cost and how many leads you could expect?

Best regards,
Muhammad Rafay
CodeLume - Web Development Agency
rafay@codelume.online
https://www.codelume.online

P.S. If you don't want emails from me, just reply STOP and I won't email again.
"""

def get_name_from_website(url):
    # example-estate.co.uk -> Example Estate
    import re
    from urllib.parse import urlparse
    host = urlparse(url).netloc.replace("www.","").replace(".co.uk","").replace(".com","").replace(".uk","")
    name = host.replace("-"," ").replace("_"," ").title()
    return name or "there"

def main():
    try:
        rows = list(csv.DictReader(open("leads.csv", encoding="utf-8")))
    except FileNotFoundError:
        print("leads.csv nahi mili! Pehle python uk_email_finder.py chalao.")
        return
    # Sirf wohi jinka email hai
    rows = [r for r in rows if r.get("email")]
    print(f"Total leads with email: {len(rows)} | Aaj bhejunga: min({DAILY_LIMIT}, {len(rows)})")
    if SMTP_USER.startswith("TUMHARA"):
        print("Pehle uk_sender.py me SMTP_USER aur SMTP_PASS bharo!")
        return
    server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
    server.starttls()
    server.login(SMTP_USER, SMTP_PASS)
    sent = 0
    for r in rows[:DAILY_LIMIT]:
        name = get_name_from_website(r["website"])
        # Agar speed zyada hai to redesign template, warna ads template
        try:
            speed = float(r.get("speed_sec") or 0)
        except:
            speed = 0
        template = TEMPLATE_REDESIGN if speed > 3 else TEMPLATE_ADS
        subject = f"Quick question about {r['website']} - slow on mobile?" if speed > 3 else f"Are you running ads in your area?"
        body = template.format(name=name, city="London", website=r["website"], speed=r.get("speed_sec",""))
        msg = MIMEMultipart()
        msg["From"] = f"{FROM_NAME} <{FROM_EMAIL}>"
        msg["To"] = r["email"]
        msg["Subject"] = subject
        msg.attach(MIMEText(body, "plain"))
        try:
            server.sendmail(FROM_EMAIL, [r["email"]], msg.as_string())
            print(f"[{sent+1}] SENT to {r['email']} ({r['website']}) - {subject}")
            sent += 1
        except Exception as e:
            print(f"[FAIL] {r['email']} -> {e}")
        if sent < DAILY_LIMIT:
            wait = random.randint(DELAY_MIN, DELAY_MAX)
            print(f"  ... {wait}s wait ...")
            time.sleep(wait)
    server.quit()
    print(f"\nDone! {sent} emails bheje.")

if __name__=="__main__":
    main()
