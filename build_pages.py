#!/usr/bin/env python3
"""Builds the static SEO/AdSense pages. Set PUB to your AdSense publisher id (e.g. 'ca-pub-1234567890123456') and SLOT to an ad unit id, then re-run."""
import json,html,os
PUB=os.environ.get('PUB','')      # e.g. ca-pub-1234567890123456
SLOT=os.environ.get('SLOT','')    # e.g. 1234567890 (a display ad unit)
CONTACT='ishansikder00@gmail.com'
SITE='https://mcqbook.online'
OUT='pages'
BQ=json.load(open("bq.json",encoding="utf-8"))
SUBJ=[('Bangla 1st Paper','বাংলা ১ম পত্র','bangla-1st-paper'),('Bangla 2nd Paper','বাংলা ২য় পত্র','bangla-2nd-paper'),('General Mathematics','সাধারণ গণিত','general-mathematics'),('Higher Mathematics','উচ্চতর গণিত','higher-mathematics'),('Physics','পদার্থবিজ্ঞান','physics'),('Chemistry','রসায়ন','chemistry'),('Biology','জীববিজ্ঞান','biology'),('ICT','তথ্য ও যোগাযোগ প্রযুক্তি','ict'),('Bangladesh & Global Studies','বাংলাদেশ ও বিশ্বপরিচয়','bangladesh-global-studies'),('Islam & Moral Education','ইসলাম ও নৈতিক শিক্ষা','islam-moral-education'),('Accounting','হিসাববিজ্ঞান','accounting'),('Finance & Banking','ফিন্যান্স ও ব্যাংকিং','finance-banking')]
e=html.escape
CSS='''<style>:root{color-scheme:light dark;--bg:#f6f2ea;--card:#fffdf9;--tx:#1a2038;--mu:#6b7080;--bd:#e7dfce;--pr:#14213d;--ac:#7a1f35;--gold:#b8912f}
@media(prefers-color-scheme:dark){:root{--bg:#0a0f1f;--card:#121a33;--tx:#e8ecf8;--mu:#a5b1d4;--bd:#34417a;--pr:#c7d2fe;--ac:#fcd34d}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--tx);font:17px/1.75 system-ui,"Noto Sans Bengali",sans-serif}
header{background:#14213d;color:#fff}header div{max-width:860px;margin:0 auto;padding:.8rem 1rem;display:flex;gap:1rem;align-items:center;flex-wrap:wrap}
header a{color:#fff;text-decoration:none;font-weight:700}header .go{margin-left:auto;background:#e2c26b;color:#2a1d00;border-radius:99px;padding:.45rem 1.1rem}
main{max-width:860px;margin:0 auto;padding:1.2rem 1rem 3rem}h1{font-size:1.65rem;line-height:1.3;margin:.5rem 0}h2{font-size:1.25rem;margin-top:2rem}
.card{background:var(--card);border:1px solid var(--bd);border-radius:16px;padding:1rem 1.2rem;margin:1rem 0}
.q{white-space:pre-wrap;font-weight:700}.o{list-style:none;padding:0;margin:.4rem 0}.o li{padding:.15rem 0}.src{color:var(--mu);font-size:.82rem}
details summary{cursor:pointer;color:var(--ac);font-weight:700}a{color:var(--ac)}.cta{display:inline-block;background:var(--pr);color:var(--bg);padding:.7rem 1.4rem;border-radius:99px;text-decoration:none;font-weight:800}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:.7rem}.grid a{display:block;background:var(--card);border:1px solid var(--bd);border-radius:14px;padding:.8rem 1rem;text-decoration:none;font-weight:700}
.ad{margin:1.5rem 0;min-height:90px;text-align:center}footer{max-width:860px;margin:0 auto;padding:1.5rem 1rem 3rem;color:var(--mu);font-size:.9rem}footer a{margin-right:1rem}</style>'''
def adsense():
    return f'<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client={PUB}" crossorigin="anonymous"></script>' if PUB else ''
def ad():
    if not(PUB and SLOT): return ''
    return f'<div class="ad"><ins class="adsbygoogle" style="display:block" data-ad-client="{PUB}" data-ad-slot="{SLOT}" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({{}});</script></div>'
def page(fn,title,desc,body,sch=''):
    url=f'{SITE}/{fn}'
    h=f'''<!DOCTYPE html>
<html lang="bn"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{e(title)}</title><meta name="description" content="{e(desc)}"><meta name="robots" content="index, follow, max-image-preview:large">
<link rel="canonical" href="{url}"><meta property="og:type" content="website"><meta property="og:site_name" content="MCQBook"><meta property="og:title" content="{e(title)}"><meta property="og:description" content="{e(desc)}"><meta property="og:url" content="{url}"><meta property="og:image" content="{SITE}/og-image.png">
{adsense()}{CSS}</head><body>
<header><div><a href="/">MCQBook</a><a href="/ssc-mcq.html">সব বিষয়</a><a href="/about.html">About</a><a class="go" href="/#/learn">অনুশীলন শুরু করো →</a></div></header>
<main>{body}</main>
<footer><a href="/about.html">About</a><a href="/contact.html">Contact</a><a href="/privacy-policy.html">Privacy Policy</a><a href="/founder.html">Founder</a><p>© MCQBook (mcqbook.online) — SSC MCQ practice for Bangladesh.</p></footer></body></html>'''
    open(f'{OUT}/{fn}','w',encoding='utf-8').write(h)
urls=[]
def sample(L,n=25):
    L=[q for q in L if len(q['o'])==4 and len(q['q'])<400 and not str(q['b']).startswith('Practice Set')]
    if len(L)<=n:return L
    step=len(L)/n;return [L[int(i*step)] for i in range(n)]
for en,bn,slug in SUBJ:
    L=BQ.get(en,[])
    if not L:continue
    S=sample(L);tot=len(L);fn=f'ssc-{slug}-mcq.html'
    boards=sorted({q['b'] for q in L if not str(q['b']).startswith('Practice Set')})
    items=''
    for i,q in enumerate(S):
        items+=f'<div class="card"><div class="q">{i+1}. {e(q["q"])}</div><ol class="o" type="ক">'+''.join(f'<li>{"কখগঘ"[j]}. {e(o)}</li>' for j,o in enumerate(q['o']))+f'</ol><details><summary>উত্তর দেখো</summary><p><b>সঠিক উত্তর: {"কখগঘ"[q["a"]]}. {e(q["o"][q["a"]])}</b></p></details><div class="src">{e(q["b"])} · {e(str(q["y"]))}</div></div>'
        if i==4:items+=ad()
    body=f'''<h1>SSC {e(en)} MCQ — {e(bn)} বোর্ড প্রশ্ন উত্তরসহ</h1>
<p>এসএসসি {e(bn)} বিষয়ের MCQ প্র্যাকটিস করো MCQBook-এ। আগের বছরের বোর্ড প্রশ্ন, অধ্যায়ভিত্তিক অনুশীলন ও মক টেস্ট একসাথে। এই বিষয়ে এখন <b>{tot}+</b> প্রশ্ন আছে{(' ('+', '.join(boards[:6])+' ইত্যাদি বোর্ড)') if boards else ''}। নিচে কিছু নমুনা প্রশ্ন দেওয়া হলো, সবগুলো ফ্রিতে অনুশীলন করতে অ্যাপে যাও।</p>
<p><a class="cta" href="/#/learn">এই বিষয়ে ফ্রি অনুশীলন করো →</a></p>
<h2>নমুনা MCQ ও উত্তর</h2>{items}{ad()}
<div class="card"><h2 style="margin-top:0">সবগুলো প্রশ্ন অনুশীলন করো</h2><p>টাইমার সহ মক টেস্ট দাও, ভুল প্রশ্নের রিপোর্ট দেখো এবং প্রতিদিন একটু একটু করে উন্নতি করো।</p><a class="cta" href="/#/learn">অনুশীলন শুরু করো</a></div>
<h2>অন্যান্য বিষয়</h2><div class="grid">{''.join(f'<a href="/ssc-{s}-mcq.html">{e(b)}</a>' for en2,b,s in SUBJ if en2!=en and BQ.get(en2))}</div>'''
    page(fn,f'SSC {en} MCQ with Answers – {bn} বোর্ড প্রশ্ন | MCQBook',f'SSC {en} ({bn}) MCQ practice with answers: board questions, chapter-wise practice and mock tests for Bangladesh SSC students. Free on MCQBook.',body)
    urls.append((fn,'0.8'))
# hub
cards=''.join(f'<a href="/ssc-{s}-mcq.html">{e(b)}<br><small style="font-weight:400;color:var(--mu)">{e(en)} · {len(BQ[en])}+ প্রশ্ন</small></a>' for en,b,s in SUBJ if BQ.get(en))
page('ssc-mcq.html','SSC MCQ – সব বিষয়ের বোর্ড প্রশ্ন ও প্র্যাকটিস | MCQBook','Free SSC MCQ practice for all subjects: Bangla, Math, Physics, Chemistry, Biology, ICT, Accounting, Finance & Banking and more. Board questions with answers.',f'<h1>SSC MCQ — সব বিষয়</h1><p>বিষয় বেছে নাও এবং বোর্ড প্রশ্ন, অধ্যায়ভিত্তিক অনুশীলন ও মক টেস্ট দিয়ে প্রস্তুতি নাও। সবকিছু ফ্রি।</p><div class="grid">{cards}</div>{ad()}<p><a class="cta" href="/#/learn">অনুশীলন শুরু করো →</a></p>')
urls.append(('ssc-mcq.html','0.9'))
page('about.html','About MCQBook – SSC MCQ Practice Platform','About MCQBook (mcqbook.online): a free chapter-wise MCQ practice platform for Bangladesh SSC students, founded by Md. Masnur Islam Ishan.',f'''<h1>About MCQBook</h1><p>MCQBook (mcqbook.online) হলো বাংলাদেশের এসএসসি (NCTB) শিক্ষার্থীদের জন্য একটি MCQ প্র্যাকটিস প্ল্যাটফর্ম। এখানে বিষয়ভিত্তিক ও অধ্যায়ভিত্তিক MCQ, আগের বছরের বোর্ড প্রশ্ন, মক টেস্ট, কুইক প্র্যাকটিস এবং ভুলের রিপোর্ট পাওয়া যায়।</p>
<h2>আমাদের লক্ষ্য</h2><p>প্রতিদিন অল্প অল্প অনুশীলনের মাধ্যমে প্রতিটি শিক্ষার্থী যেন নিজের দুর্বল জায়গা চিনে উন্নতি করতে পারে। বেশিরভাগ প্র্যাকটিস ফ্রি।</p>
<h2>প্রতিষ্ঠাতা</h2><p>MCQBook প্রতিষ্ঠা করেছেন <a href="/founder.html">Md. Masnur Islam Ishan (Ishan)</a>, সফটওয়্যার ইঞ্জিনিয়ার এবং Kallaiya-এর CEO।</p>
<h2>প্রশ্নের উৎস ও ভুল</h2><p>প্রশ্নগুলো বোর্ড প্রশ্ন ও পাঠ্যবইয়ের ভিত্তিতে সাজানো। কোনো প্রশ্ন বা উত্তরে ভুল পেলে অ্যাপের রিপোর্ট সুবিধা ব্যবহার করো বা <a href="/contact.html">আমাদের জানাও</a>।</p><p><a class="cta" href="/#/learn">অনুশীলন শুরু করো</a></p>''')
urls.append(('about.html','0.6'))
page('contact.html','Contact MCQBook','Contact MCQBook for feedback, corrections, partnerships or support.',f'<h1>যোগাযোগ</h1><p>প্রশ্ন, ভুল সংশোধন, পরামর্শ বা সহযোগিতার জন্য ইমেইল করো:</p><p><b><a href="mailto:{CONTACT}">{CONTACT}</a></b></p><p>ইমেইলে বিষয় লিখে দিলে আমরা দ্রুত উত্তর দেওয়ার চেষ্টা করব।</p>')
urls.append(('contact.html','0.5'))
page('privacy-policy.html','Privacy Policy – MCQBook','Privacy policy of MCQBook (mcqbook.online): data we store, cookies, Google Analytics and Google AdSense advertising.',f'''<h1>Privacy Policy</h1><p>সর্বশেষ হালনাগাদ: ২ নভেম্বর ২০২৬</p>
<h2>আমরা কী তথ্য রাখি</h2><p>অ্যাকাউন্ট খুললে তোমার ইমেইল এবং অনুশীলনের ফলাফল (স্কোর, ইতিহাস, প্রোফাইল) তোমার ব্রাউজারের লোকাল স্টোরেজে থাকে। পাসওয়ার্ড সরাসরি রাখা হয় না, শুধু হ্যাশ করা অবস্থায় থাকে। নতুন অ্যাকাউন্ট বা লগইনের সময় আমাদের কাছে ইমেইলসহ কিছু ব্যবহার-তথ্য পাঠানো হতে পারে, যাতে সাইট উন্নত করা ও সহায়তা দেওয়া যায়। প্রিমিয়ামের পেমেন্ট যাচাইয়ের জন্য তুমি যে TrxID ও নম্বর দাও, তা শুধু যাচাইয়ের কাজে ব্যবহার হয়।</p>
<h2>কুকি ও বিজ্ঞাপন</h2><p>আমরা Google AdSense-এর মাধ্যমে বিজ্ঞাপন দেখাতে পারি। Google ও তার অংশীদাররা কুকি বা অনুরূপ প্রযুক্তি ব্যবহার করে তোমার আগের ভিজিটের ভিত্তিতে বিজ্ঞাপন দেখাতে পারে। তুমি <a href="https://adssettings.google.com" rel="noopener">Google Ads Settings</a> থেকে ব্যক্তিগতকৃত বিজ্ঞাপন বন্ধ করতে পারো। আরও জানতে দেখো <a href="https://policies.google.com/technologies/ads" rel="noopener">Google-এর বিজ্ঞাপন নীতি</a>।</p>
<h2>অ্যানালিটিক্স</h2><p>আমরা Google Analytics ব্যবহার করে সাইটে কতজন আসে ও কোন পেজ দেখে তা অজ্ঞাতনামভাবে মাপি।</p>
<h2>তৃতীয় পক্ষ</h2><p>আমরা তোমার ব্যক্তিগত তথ্য বিক্রি করি না। বিজ্ঞাপন, অ্যানালিটিক্স ও ফর্ম-ইমেইল সেবার প্রদানকারীদের নিজস্ব গোপনীয়তা নীতি প্রযোজ্য।</p>
<h2>শিশুদের তথ্য</h2><p>১৩ বছরের কম বয়সীদের কাছ থেকে আমরা জেনেশুনে ব্যক্তিগত তথ্য সংগ্রহ করি না।</p>
<h2>যোগাযোগ</h2><p>এই নীতি নিয়ে প্রশ্ন থাকলে <a href="/contact.html">যোগাযোগ</a> পেজে ইমেইল করো।</p>''')
urls.append(('privacy-policy.html','0.4'))
sm='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n<url><loc>https://mcqbook.online/</loc><priority>1.0</priority></url>\n<url><loc>https://mcqbook.online/founder.html</loc><priority>0.8</priority></url>\n'+''.join(f'<url><loc>{SITE}/{f}</loc><priority>{p}</priority></url>\n' for f,p in urls)+'</urlset>\n'
open(f'{OUT}/sitemap.xml','w').write(sm)
if PUB: open(f'{OUT}/ads.txt','w').write(f'google.com, {PUB.replace("ca-","")}, DIRECT, f08c47fec0942fa0\n')
print(len(urls),'pages')
