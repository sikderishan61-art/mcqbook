#!/usr/bin/env python3
"""MCQBook Premium code tool. Run on YOUR computer only. Never upload this file.
  python3 premium_codes.py code student@email.com 30   -> unlock code (30 days) bound to that email
  python3 premium_codes.py ref  student@email.com      -> that student's referral id (match it with ?ref=ID in referral emails)
  python3 premium_codes.py token student@email.com     -> that student's topper token (to verify entries)
"""
import hmac,hashlib,sys,secrets,string
SECRET="b867c9299674c3d4581518b21e195b00"  # must equal PM.secret in index.html
def mac(m): return hmac.new(SECRET.encode(),m.encode(),hashlib.sha256).hexdigest()
cmd,email=sys.argv[1],sys.argv[2].strip().lower()
if cmd=="code":
    days=int(sys.argv[3]); nonce="".join(secrets.choice(string.ascii_uppercase+string.digits) for _ in range(6))
    print(f"P{days}-{nonce}-{mac(f'{days}|{nonce}|{email}')[:8].upper()}")
elif cmd=="ref": print(mac("ref|"+email)[:8])
elif cmd=="token": print("MCQ-"+mac("tok|"+email)[:8].upper())
