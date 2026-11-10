import csv

hot = []
with open('leads.csv', newline='', encoding='utf-8', errors='ignore') as f:
    reader = csv.DictReader(f)
    print("Columns:", reader.fieldnames)
    # column ka naam chota-bara ho sakta hai isliye lower karke dhoond rahe hain
    cols = {k.lower(): k for k in reader.fieldnames}
    email_col = cols.get('email')
    speed_col = cols.get('speed_sec') or cols.get('speed') or cols.get('load_time')

    for row in reader:
        email = (row.get(email_col) or '').strip() if email_col else ''
        try:
            speed = float(str(row.get(speed_col) or '0').replace('s','').strip())
        except:
            speed = 0

        if email and email.lower() != 'no email' and speed > 3:
            hot.append(row)

with open('hot_leads.csv', 'w', newline='', encoding='utf-8') as out:
    writer = csv.DictWriter(out, fieldnames=reader.fieldnames)
    writer.writeheader()
    writer.writerows(hot)

print(f"HOT leads: {len(hot)}")
for h in hot:
    print(h)