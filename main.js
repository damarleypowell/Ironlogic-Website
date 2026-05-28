(function(){'use strict';

/* ─── SMOOTH SCROLL ─── */
function scrollToId(id){
  if(id==='top'){window.scrollTo({top:0,behavior:'smooth'});return}
  const el=document.getElementById(id);
  if(el)el.scrollIntoView({behavior:'smooth',block:'start'});
}
document.addEventListener('click',function(e){
  const t=e.target.closest('[data-scroll]');
  if(!t)return;
  e.preventDefault();
  scrollToId(t.getAttribute('data-scroll'));
});

/* ─── NAV SCROLL STATE ─── */
const nav=document.getElementById('nav');
const progressEl=document.getElementById('progress');
const stickyBar=document.getElementById('sticky-bar');
let ticking=false,stickyDismissed=false;
function onScroll(){
  if(!ticking){requestAnimationFrame(update);ticking=true}
}
function update(){
  ticking=false;
  const y=window.scrollY;
  const h=document.documentElement.scrollHeight-window.innerHeight;
  if(nav)nav.classList.toggle('scrolled',y>60);
  if(progressEl)progressEl.style.transform=`scaleX(${h>0?y/h:0})`;
  if(stickyBar&&!stickyDismissed)stickyBar.classList.toggle('show',y>600);
  triggerCounters();
}
window.addEventListener('scroll',onScroll,{passive:true});

/* ─── SCROLL REVEAL ─── */
const ro=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add('in');ro.unobserve(e.target)}
}),{threshold:.06,rootMargin:'0px 0px -30px 0px'});
document.querySelectorAll('.rv').forEach(el=>ro.observe(el));


/* ─── DEMO INTERACTIVE WHATSAPP CHAT ─── */
(function(){

  const IND={
    re:{label:'Barber Shop',name:"Marcus Cuts · AI Assistant",status:'Booking System · online',av:'MC',
      greeting:"Hey! ✂️ Thanks for hitting us up at Marcus Cuts. Looking to book a cut, or got a question about our services?",
      system:`You are an AI booking assistant for Marcus Cuts barber shop, built by Iron Logic. Book haircut appointments and answer questions. Be friendly, brief (2–3 sentences max), WhatsApp-style — no long paragraphs. Flow: what do they want → available day/time → confirm the booking. Prices: Haircut J$1,500 · Shape-up J$800 · Full cut + beard J$2,200. Hours: Mon–Sat 9am–7pm. If asked if you're AI, say yes — built by Iron Logic so no booking is ever missed.`,
      steps:[{h:'Instant reply',p:'Customer messages at 10pm. AI replies in 18 seconds — booking locked before they try someone else.'},{h:'Handles everything',p:'Prices, availability, services — answered automatically.'},{h:'Booking confirmed',p:'Slot booked, reminder sent — owner gets notified with no manual work.'},{h:'Zero missed bookings',p:'Every message handled around the clock.'}]},
    dental:{label:'Gym / Fitness',name:'FitLife Jamaica · AI',status:'Membership System · online',av:'FL',
      greeting:"Hey! 💪 Welcome to FitLife Jamaica. Are you interested in joining, asking about classes, or something else?",
      system:`You are an AI assistant for FitLife Jamaica gym, built by Iron Logic. Help with memberships, class info, and bookings. Be energetic, brief (2–3 sentences), WhatsApp-style. Flow: what are they interested in → relevant info → book a trial or sign them up. Monthly membership: J$8,000. Day pass: J$1,200. Classes: Zumba, CrossFit, Boxing. Trial session is free.`,
      steps:[{h:'24/7 enquiries handled',p:'Prospect messages at 6am before work. AI captures them instantly with pricing and class info.'},{h:'Trial session booked',p:'Offers a free trial, picks a time, locks it in — no back and forth.'},{h:'Membership upsell',p:'Explains plans, answers questions, guides them to sign up.'},{h:'More members, less admin',p:'Every DM and WhatsApp enquiry turned into a booking.'}]},
    law:{label:'Restaurant',name:'Jerk Palace · Reservations',status:'Booking System · online',av:'JP',
      greeting:"Yow! 🍽️ Welcome to Jerk Palace. Looking to make a reservation, ask about our menu, or order for pickup/delivery?",
      system:`You are an AI assistant for Jerk Palace restaurant, built by Iron Logic. Handle reservations, menu questions, and delivery/pickup orders. Be friendly, Jamaican-warm, brief (2–3 sentences), WhatsApp-style. Flow: what do they need → details → confirm. Reservations: up to 10 people, call for groups. Hours: Daily 11am–10pm. Delivery available via in-house delivery.`,
      steps:[{h:'No missed reservations',p:'Customer messages at 9pm for a Saturday table. AI books it instantly — no phone tag needed.'},{h:'Menu questions answered',p:'Pricing, allergens, specials — handled without a staff member.'},{h:'Orders captured',p:'Delivery and pickup orders confirmed and passed to the kitchen system.'},{h:'More tables filled',p:'Every enquiry becomes a confirmed booking or order.'}]},
    hvac:{label:'Nail Salon',name:'Glam Nails · AI Booking',status:'Booking System · online',av:'GN',
      greeting:"Hi gorgeous! 💅 Welcome to Glam Nails. Ready to book, or do you have a question about our services?",
      system:`You are an AI booking assistant for Glam Nails salon, built by Iron Logic. Book nail appointments and answer questions. Be warm, friendly, brief (2–3 sentences), WhatsApp-style. Flow: what service → availability → confirm booking. Services: Full set J$3,500 · Gel manicure J$2,500 · Pedicure J$2,000 · Nail art from J$500 extra. Hours: Tue–Sat 9am–6pm.`,
      steps:[{h:'Instant booking reply',p:'Client messages at 8pm about a Saturday full set. AI books her slot before the weekend fills up.'},{h:'Service questions handled',p:'Prices, nail art options, aftercare — answered automatically.'},{h:'Appointment confirmed',p:'Slot booked with the right technician, reminder sent, owner notified.'},{h:'Calendar filled automatically',p:'Every DM and WhatsApp message becomes a booking.'}]},
    consult:{label:'Service Biz',name:'Any Business · AI Assistant',status:'Lead System · online',av:'AI',
      greeting:"Hey! 👋 Thanks for reaching out. How can I help you today — pricing, availability, or booking?",
      system:`You are a friendly AI assistant for a service business, built by Iron Logic. Help customers with pricing, availability, and bookings. Be warm, brief (2–3 sentences max), WhatsApp-style. Flow: understand what they need → give relevant info → offer to book or connect them. If asked if you're AI, say yes — built to reply instantly so no customer is ever missed.`,
      steps:[{h:'Works for any service business',p:'Barbers, gyms, real estate agents, clinics — the AI handles your leads 24/7.'},{h:'Custom-built for your brand',p:'We write all the messages to match your tone, prices, and services.'},{h:'Connects to WhatsApp & Instagram',p:'Same accounts your customers already use — no new apps needed.'},{h:'Set up in 3–5 days',p:'From setup call to live — faster than you think.'}]}
  };

  const FB={
    re:{
      greet:["Hey! 👋 Welcome to Marcus Cuts. We do haircuts (J$1,500), shape-ups (J$800), and full cut + beard (J$2,200). Want to book a slot or have a question?","Wassup! ✂️ Marcus Cuts here. Looking to get a cut? I can book you in or answer anything you need."],
      services:["We offer: Haircut J$1,500 · Shape-up J$800 · Full cut + beard J$2,200. Open Mon–Sat 9am–7pm. Which service are you thinking?","Our services: fresh haircuts, shape-ups, fades, and the full cut + beard combo. Prices start at J$800. What are you going for?"],
      buy:["Nice — what service? Haircut, shape-up, or the full cut + beard combo? I'll find you the next open slot.","Let's get you booked. Are you going for a haircut, shape-up, or full combo? And what day works for you?"],
      sell:["Walk-ins are welcome, but booking guarantees your slot. Want me to lock in a time for you?","We usually have same-day availability. Morning or afternoon works better for you?"],
      price:["Haircut J$1,500 · Shape-up J$800 · Full cut + beard J$2,200. Open Mon–Sat 9am–7pm. Which are you going for?","Prices: Haircut J$1,500 · Shape-up J$800 · Full cut + beard combo J$2,200. Want to book one?"],
      timeline:["We're open Mon–Sat 9am–7pm. I can check slots for any day this week — morning or afternoon?","Usually same-day or next-day available. Which day are you thinking?"],
      book:["I have Saturday 10am or 1pm free. Which works?","How about Friday 3pm or Saturday 10am? Both are open."],
      confirm:["Locked in! ✅ We'll send you a reminder. See you then ✂️","Booked! 👍 If anything changes just message us here."],
      identity:null,
      default:["Got you — are you looking to book a cut, check prices, or ask about our services?","Happy to help! Are you booking an appointment or have a question about our services?"]
    },
    dental:{
      greet:["Hey! 💪 Welcome to FitLife Jamaica. Interested in joining, checking out classes, or booking a free trial?","Yo! FitLife here — we've got memberships, group classes (Zumba, CrossFit, Boxing), and a free trial to get started. What's on your mind?"],
      services:["We offer: Monthly membership J$8,000 · Day pass J$1,200 · Free trial session. Classes: Zumba, CrossFit, Boxing. Want to book the free trial?","FitLife has full gym access, group classes (Zumba, CrossFit, Boxing), and personal training. Membership is J$8,000/mo. Want to come in for a free trial?"],
      pain:["We have a free trial session — no commitment needed. Want to book one? I can check the schedule.","The free trial is the best way to see if we're the right fit. Interested? I can grab you a slot this week."],
      routine:["We run Zumba, CrossFit, and Boxing classes throughout the week. Monthly membership covers all of them — J$8,000. Want to book a trial class?","Zumba Mon/Wed/Fri · CrossFit Tue/Thu/Sat · Boxing daily 6am & 5pm. Which sounds like you?"],
      price:["Monthly membership: J$8,000 · Day pass: J$1,200 · Free trial session. Which works for you?","Membership is J$8,000/month — unlimited access to everything. Free trial first if you want to check it out. Interested?"],
      book:["Free trial slots: Tuesday 6am or Thursday 5pm. Which works?","Saturday 8am or Wednesday 5pm are both open for a trial. Which day?"],
      confirm:["Trial booked! 💪 Just wear comfortable clothes and bring water. See you there.","Confirmed! Come as you are — we'll show you around first."],
      identity:null,
      default:["Are you looking to join, ask about classes, or book a free trial session?","Happy to help! Is this about membership, classes, or booking a trial?"]
    },
    law:{
      greet:["Yow! 🍽️ Welcome to Jerk Palace. Looking to make a reservation, check the menu, or order for pickup?","Hey! Jerk Palace here — dine-in, takeout, and delivery available. What can I help with?"],
      services:["We do dine-in reservations, takeout, and delivery. Menu: Jerk chicken from J$1,200 · Oxtail J$1,800 · Curry goat J$1,600 · Vegetarian options available. What sounds good?","Jerk Palace menu highlights: Jerk chicken J$1,200 · Oxtail J$1,800 · Full Jerk combo J$2,800. Open daily 11am–10pm. Want to reserve a table or order?"],
      accident:["How many people and what time? We can seat up to 10 — larger groups just give us a heads up.","We're open daily 11am–10pm. What day, time, and how many guests?"],
      injury:["We've got jerk chicken, oxtail, curry goat, rice & peas, and vegetarian plates. What are you feeling?","Jerk chicken is our signature 🔥 — also oxtail, curry goat, and veggie options. Dine-in or takeout?"],
      price:["Jerk chicken from J$1,200 · Oxtail J$1,800 · Curry goat J$1,600 · Full combo J$2,800. Delivery available too. What are you ordering?","Plates start at J$1,200. The full Jerk experience combo is J$2,800 and it's worth it. Dine-in or delivery?"],
      book:["I can reserve Saturday 7pm — how many guests?","Sunday brunch 12pm works great. How many people?"],
      confirm:["Table reserved! 🍽️ We'll have your spot ready. Any dietary needs to know about?","Confirmed! See you then. Let us know if anything changes."],
      identity:null,
      default:["Are you looking to make a reservation, check the menu, or order for delivery?","Happy to help! Is this about dining in, takeout, or catering?"]
    },
    hvac:{
      greet:["Hi gorgeous! 💅 Welcome to Glam Nails. Looking to book, check prices, or ask about our services?","Hey! Glam Nails here — we do full sets, gel manicures, pedicures, and nail art. Want to book a slot?"],
      services:["Our services: Full set J$3,500 · Gel manicure J$2,500 · Pedicure J$2,000 · Nail art from J$500 extra. Open Tue–Sat 9am–6pm. Which one are you going for?","We offer full acrylic sets, gel manis, pedicures, and custom nail art. Prices start at J$2,000. What are you thinking?"],
      ac:["Full set J$3,500 · Gel manicure J$2,500 · Pedicure J$2,000 · Nail art designs from J$500 extra. Which one?","Going for a full set? That's J$3,500. Gel mani J$2,500. Want to book a slot for this week?"],
      heat:["Open Tue–Sat 9am–6pm. Which day works best for you — and morning or afternoon?","I can check availability for any day this week. What are you thinking?"],
      price:["Full set J$3,500 · Gel manicure J$2,500 · Pedicure J$2,000 · Nail art from J$500 extra. Which service?","Prices: Full set J$3,500 · Gel J$2,500 · Pedicure J$2,000. Want to book?"],
      book:["Saturday 11am or 2pm are both open. Which works?","Thursday 3pm or Friday 10am — either one available. Which do you prefer?"],
      confirm:["Confirmed! 💅 We'll send a reminder. See you soon!","Booked! 👏 If you have nail art inspo, send us a pic beforehand."],
      identity:null,
      default:["Are you looking to book, check prices, or ask about a specific service?","Happy to help! Booking, pricing, or availability — what do you need?"]
    },
    consult:{
      greet:["Hey! 👋 Thanks for reaching out. What kind of business do you run and how can I help?","Hi! Happy to answer questions about pricing, availability, or how we work. What's on your mind?"],
      services:["We build AI systems that reply to your leads on WhatsApp and Instagram — 24/7, in seconds. We also do full website builds, booking automation, and CRM integration. Want to know more?","Iron Logic builds: AI WhatsApp/Instagram responders · Booking automation · Website builds · CRM integration. Most systems go live in 3–5 days. Which of those interests you?"],
      revenue:["We build AI systems that reply to your leads on WhatsApp & Instagram in seconds, 24/7 — so you never miss a booking. Interested in learning how it works for your business?","The setup takes 3–5 days. We handle everything — you just see the results. Want to book a free call to see if it's a fit?"],
      leads:["We capture leads from WhatsApp, Instagram, and your website — qualify them automatically, and book appointments without any staff involvement. Sound interesting?","Our AI handles every message instantly — lead capture, qualification, booking. Works 24/7. Want to see how it'd work for your business?"],
      growth:["That's exactly what we help with. Our AI systems make sure every lead gets a fast, professional response — so you convert more without hiring. Want a free setup call?","Growth usually comes down to speed — responding to leads fast before they go somewhere else. We automate that entire process. Want to talk?"],
      price:["The first setup call is free — no commitment. After that it's a monthly fee based on what you need. Want to book a 30-min call to get a proper quote?","Free call to scope it out, then a monthly retainer. Most clients are set up in 3–5 days. Want to book?"],
      book:["Free setup call available Tuesday 2pm or Thursday 11am. Which works?","Monday 10am or Wednesday 3pm — both open for a free 30-min call. Which one?"],
      confirm:["Perfect! 👊 You'll get a confirmation shortly. Talk soon!","Confirmed — see you on the call! We'll prep some questions beforehand."],
      identity:null,
      default:["Happy to help! Are you asking about pricing, how we work, or want to book a free call?","What can I help with — how the AI works, pricing, or getting started?"]
    }
  };

  function pick(arr){return arr[Math.floor(Math.random()*arr.length)]}

  function pickFresh(arr,lastMsg){
    if(arr.length<2)return arr[0];
    const filtered=arr.filter(r=>r!==lastMsg);
    return pick(filtered.length?filtered:arr);
  }

  function classify(msg,ind){
    const m=msg.toLowerCase();
    if(/who are you|are you (an )?ai|are you (a )?bot|are you human|are you real|what are you/i.test(m))return'identity';
    if(/^(hi+|hey+|hello+|yo+|sup|wassup|what.?s up|good (morning|afternoon|evening)|hola)\b/i.test(m))return'greet';
    if(/service|what do you (do|offer)|what (can|do) you|what.?s (on offer|available)|tell me (more|about)|what (are|you got)/i.test(m))return'services';
    if(ind==='re'){
      if(/cut|haircut|trim|fade|shape.?up|style|barber/i.test(m))return'buy';
      if(/walk.?in|same.?day|wait|how long/i.test(m))return'sell';
      if(/price|cost|much|rate|charge|fee|how much/i.test(m))return'price';
      if(/when|open|hour|available|tomorrow|weekend|time/i.test(m))return'timeline';
    }else if(ind==='dental'){
      if(/trial|free|try|first time|join|sign.?up/i.test(m))return'pain';
      if(/class|zumba|crossfit|boxing|group|schedule|program/i.test(m))return'routine';
      if(/price|cost|much|membership|monthly|fee|rate/i.test(m))return'price';
    }else if(ind==='law'){
      if(/reserv|table|seat|dine|dinner|lunch|brunch|group|party|how many|people/i.test(m))return'accident';
      if(/menu|food|dish|jerk|oxtail|curry|chicken|vegetarian|eat|order/i.test(m))return'injury';
      if(/price|cost|how much|rate|charge|delivery|fee/i.test(m))return'price';
    }else if(ind==='hvac'){
      if(/nail|full set|gel|acrylic|manicure|pedicure|nail art|design/i.test(m))return'ac';
      if(/when|available|slot|open|hour|day|week|saturday|sunday/i.test(m))return'heat';
      if(/price|cost|much|rate|charge|fee|how much/i.test(m))return'price';
    }else if(ind==='consult'){
      if(/how.*(work|it work)|explain|tell me|what.?s the process|more info/i.test(m))return'revenue';
      if(/lead|message|reply|respond|whatsapp|instagram|dm/i.test(m))return'leads';
      if(/grow|scale|more client|more customer|sales|revenue|booking/i.test(m))return'growth';
      if(/price|cost|fee|much|invest|charge|plan|monthly/i.test(m))return'price';
    }
    if(/book|schedul|appoint|slot|time|available|meeting|call|visit|consult|session/i.test(m))return'book';
    if(/^(yes|sure|okay|ok|perfect|great|sounds good|go ahead|lock|let.?s do|i.?m in|deal)\b/i.test(m))return'confirm';
    return'default';
  }

  function getFallback(msg,ind,lastBotMsg){
    const intent=classify(msg,ind);
    const fb=FB[ind];
    if(intent==='identity'){
      const n=IND[ind];
      return`I'm an AI assistant — built by Iron Logic so ${n.name.split('·')[0].trim()}can respond to every lead instantly, 24/7. Now, how can I help you? 😊`;
    }
    return pickFresh(fb[intent]||fb.default, lastBotMsg);
  }

  async function getAI(text,history,ind){
    // In-browser WASM model (LaMini-Flan-T5, loaded optionally on this page)
    if(window._wasmAI){
      try{
        const sys=IND[ind].system;
        const prompt=sys+'\n\nCustomer message: "'+text+'"\n\nAssistant reply (2 sentences max, friendly, WhatsApp-style):';
        const out=await window._wasmAI(prompt,{max_new_tokens:90,temperature:0.45,repetition_penalty:1.4});
        const raw=(out[0]?.generated_text||'').trim().replace(/^(Assistant[:\s]*|Reply[:\s]*)/i,'').trim();
        const clean=raw.split('\n')[0].trim();
        if(clean.length>8&&clean.length<280&&!/fuck|shit|damn|hate|kill|illegal|weapon/i.test(clean)){
          return clean;
        }
      }catch(e){}
    }
    // Backend API (not available on static host — falls through to fallback)
    try{
      const res=await fetch('/api/chat',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({messages:[...history,{role:'user',content:text}],systemPrompt:IND[ind].system})
      });
      if(res.ok){const d=await res.json();if(d.reply)return d.reply;}
    }catch(e){}
    const lastBot=history.filter(h=>h.role==='assistant').slice(-1)[0]?.content||'';
    return getFallback(text,ind,lastBot);
  }

  function speakResponse(text){
    if(!voiceOn||!window.speechSynthesis)return;
    window.speechSynthesis.cancel();
    const utt=new SpeechSynthesisUtterance(text);
    utt.rate=1.0;utt.pitch=1.0;
    const pick=()=>{
      const vs=window.speechSynthesis.getVoices();
      const v=vs.find(v=>v.name.includes('Google')&&v.lang.startsWith('en'))||vs.find(v=>v.lang.startsWith('en-'));
      if(v)utt.voice=v;
      window.speechSynthesis.speak(utt);
    };
    window.speechSynthesis.getVoices().length?pick():window.speechSynthesis.onvoiceschanged=pick;
  }

  // ── State
  let history=[],currentInd='re',isTyping=false,lastSent=0,voiceOn=false,curAudio=null;
  const COOLDOWN=2500;

  // ── DOM
  const waBody=document.getElementById('wa-body');
  const waInput=document.getElementById('wa-input');
  const waSend=document.getElementById('wa-send');
  const waName=document.getElementById('wa-name');
  const waStatus=document.getElementById('wa-status');
  const waAv=document.getElementById('wa-av');
  const tabsEl=document.getElementById('demo-tabs');
  const stepsEl=document.getElementById('demo-steps');
  const micBtn=document.getElementById('wa-mic');
  const voiceToggle=document.getElementById('wa-voice-toggle');
  if(!waBody||!waInput||!waSend)return;

  function getTime(){const d=new Date();return d.getHours()+':'+String(d.getMinutes()).padStart(2,'0')}

  function playSend(){
    try{
      const ctx=new(window.AudioContext||window.webkitAudioContext)();
      const o=ctx.createOscillator(),g=ctx.createGain();
      o.connect(g);g.connect(ctx.destination);
      o.type='sine';
      o.frequency.setValueAtTime(1200,ctx.currentTime);
      o.frequency.exponentialRampToValueAtTime(700,ctx.currentTime+.12);
      g.gain.setValueAtTime(.18,ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+.18);
      o.start(ctx.currentTime);o.stop(ctx.currentTime+.18);
      o.onended=()=>ctx.close();
    }catch(e){}
  }

  function playReceive(){
    try{
      const ctx=new(window.AudioContext||window.webkitAudioContext)();
      const o=ctx.createOscillator(),g=ctx.createGain();
      o.connect(g);g.connect(ctx.destination);
      o.type='sine';
      o.frequency.setValueAtTime(600,ctx.currentTime);
      o.frequency.exponentialRampToValueAtTime(900,ctx.currentTime+.08);
      o.frequency.exponentialRampToValueAtTime(750,ctx.currentTime+.2);
      g.gain.setValueAtTime(.15,ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+.25);
      o.start(ctx.currentTime);o.stop(ctx.currentTime+.25);
      o.onended=()=>ctx.close();
    }catch(e){}
  }

  function appendMsg(text,side){
    const d=document.createElement('div');d.className='wa-msg '+side;
    const ticks=side==='out'?`<svg width="15" height="11" viewBox="0 0 15 11" fill="none"><path d="M1 5.5L4.5 9 9 1M6 5.5L9.5 9 14 1" stroke="#53bdeb" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`:''
    d.innerHTML=`<div class="wa-bubble">${text.replace(/\n/g,'<br>')}</div><div class="wa-time-line">${getTime()} ${ticks}</div>`;
    waBody.appendChild(d);waBody.scrollTop=waBody.scrollHeight;
  }

  function showTyping(){
    const d=document.createElement('div');d.className='wa-typing-row';
    d.innerHTML='<div class="wa-typing-bub"><span></span><span></span><span></span></div>';
    waBody.appendChild(d);waBody.scrollTop=waBody.scrollHeight;return d;
  }

  function buildSteps(ind){
    if(!stepsEl)return;
    stepsEl.innerHTML=IND[ind].steps.map((s,i)=>`
      <div class="ds active" style="opacity:1">
        <div class="ds-n">0${i+1}</div>
        <div><div class="ds-h">${s.h}</div><p class="ds-p">${s.p}</p></div>
      </div>`).join('');
  }

  function resetChat(ind){
    currentInd=ind;history=[];
    const i=IND[ind];
    if(waName)waName.textContent=i.name;
    if(waAv)waAv.textContent=i.av;
    if(waStatus)waStatus.textContent=i.status;
    waBody.innerHTML='<div class="wa-date-div"><span>Today</span></div>';
    buildSteps(ind);
    setTimeout(()=>{appendMsg(i.greeting,'in');history.push({role:'assistant',content:i.greeting});},500);
  }

  // ── Pipeline animation
  const pipelineEl=document.getElementById('demo-pipeline');
  const PIPELINE_STAGES=['dp-stage-0','dp-stage-1','dp-stage-2','dp-stage-3','dp-stage-4'];
  const PIPELINE_DELAYS=[0,320,620,980,1350];

  function runPipeline(){
    if(!pipelineEl)return;
    PIPELINE_STAGES.forEach(id=>{const el=document.getElementById(id);if(el){el.className='dp-stage';}});
    pipelineEl.style.display='block';
    PIPELINE_STAGES.forEach((id,i)=>{
      setTimeout(()=>{
        const el=document.getElementById(id);
        if(!el)return;
        el.classList.add('active');
        if(i>0){const prev=document.getElementById(PIPELINE_STAGES[i-1]);if(prev)prev.classList.add('done');}
      },PIPELINE_DELAYS[i]);
    });
  }

  function clearPipeline(){
    if(!pipelineEl)return;
    const last=document.getElementById(PIPELINE_STAGES[PIPELINE_STAGES.length-1]);
    if(last)last.classList.add('done');
    setTimeout(()=>{
      pipelineEl.style.display='none';
      PIPELINE_STAGES.forEach(id=>{const el=document.getElementById(id);if(el)el.className='dp-stage';});
    },700);
  }

  async function sendMsg(){
    const text=waInput.value.trim();
    if(!text||isTyping)return;
    if(Date.now()-lastSent<COOLDOWN)return;
    lastSent=Date.now();
    waInput.value='';waInput.disabled=true;waSend.disabled=true;isTyping=true;
    appendMsg(text,'out');playSend();history.push({role:'user',content:text});
    const prevStatus=waStatus?waStatus.textContent:'';
    if(waStatus)waStatus.textContent='typing...';
    const typingEl=showTyping();
    runPipeline();
    const delay=1800+Math.random()*1200;
    const[response]=await Promise.all([getAI(text,history,currentInd),new Promise(r=>setTimeout(r,delay))]);
    clearPipeline();
    typingEl.remove();appendMsg(response,'in');playReceive();history.push({role:'assistant',content:response});
    speakResponse(response);
    if(waStatus)waStatus.textContent=prevStatus;
    isTyping=false;waInput.disabled=false;waSend.disabled=false;waInput.focus();
  }

  // Build tabs
  if(tabsEl){
    Object.entries(IND).forEach(([key,ind],i)=>{
      const btn=document.createElement('button');
      btn.className='demo-tab'+(i===0?' on':'');
      btn.textContent=ind.label;btn.type='button';
      btn.addEventListener('click',()=>{
        tabsEl.querySelectorAll('.demo-tab').forEach(b=>b.classList.toggle('on',b===btn));
        resetChat(key);
      });
      tabsEl.appendChild(btn);
    });
  }

  // Voice toggle
  if(voiceToggle){
    voiceToggle.addEventListener('click',()=>{
      voiceOn=!voiceOn;
      voiceToggle.classList.toggle('on',voiceOn);
      voiceToggle.querySelector('span').textContent=voiceOn?'Voice on':'Voice off';
    });
  }

  // Mic — Web Speech API (free, browser-native)
  if(micBtn){
    const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    const waBar=document.getElementById('wa-bar');
    const recUI=document.getElementById('wa-rec-ui');
    const waveCanvas=document.getElementById('wa-wave-canvas');
    const recTimer=document.getElementById('wa-rec-timer');
    if(!SR){micBtn.style.display='none';}
    else{
      const rec=new SR();
      rec.continuous=false;rec.interimResults=true;rec.lang='en-US';
      let recActive=false,animFrame=null,timerInterval=null,recStart=0,waveT=0;

      function drawFakeWave(){
        if(!waveCanvas)return;
        const ctx2d=waveCanvas.getContext('2d');
        waveT+=0.12;
        const W=waveCanvas.width,H=waveCanvas.height;
        ctx2d.clearRect(0,0,W,H);
        const bars=36,bw=Math.floor(W/bars)-1;
        for(let i=0;i<bars;i++){
          const v=Math.sin(waveT+i*0.45)*0.5+0.5;
          const h=Math.max(3,v*H*.82);
          const y=(H-h)/2;
          ctx2d.fillStyle=`rgba(220,38,38,${.3+v*.7})`;
          ctx2d.beginPath();
          ctx2d.roundRect?ctx2d.roundRect(i*(bw+1),y,bw,h,2):ctx2d.rect(i*(bw+1),y,bw,h);
          ctx2d.fill();
        }
        animFrame=requestAnimationFrame(drawFakeWave);
      }

      function setRecState(on){
        recActive=on;
        micBtn.classList.toggle('recording',on);
        waBar.classList.toggle('recording',on);
        if(on){
          if(waveCanvas)waveCanvas.width=recUI?recUI.clientWidth-50||180:180;
          drawFakeWave();
          recStart=Date.now();
          timerInterval=setInterval(()=>{
            const s=Math.floor((Date.now()-recStart)/1000);
            if(recTimer)recTimer.textContent=Math.floor(s/60)+':'+(s%60<10?'0':'')+(s%60);
          },500);
        }else{
          if(animFrame){cancelAnimationFrame(animFrame);animFrame=null;}
          clearInterval(timerInterval);
          if(recTimer)recTimer.textContent='0:00';
          if(waveCanvas){const c=waveCanvas.getContext('2d');c.clearRect(0,0,waveCanvas.width,waveCanvas.height);}
        }
      }

      rec.onresult=(e)=>{
        const t=Array.from(e.results).map(r=>r[0].transcript).join('');
        waInput.value=t;
        if(e.results[e.results.length-1].isFinal){
          setRecState(false);sendMsg();
        }
      };
      rec.onerror=()=>setRecState(false);
      rec.onend=()=>{if(recActive)setRecState(false);};

      micBtn.addEventListener('click',()=>{
        if(recActive){rec.stop();setRecState(false);}
        else{waInput.value='';setRecState(true);rec.start();}
      });
    }
  }

  waSend.addEventListener('click',sendMsg);
  waInput.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendMsg();}});
  resetChat('re');
})();/* ─── COUNTERS ─── */
let countersDone=false;
function triggerCounters(){
  if(countersDone)return;
  const sec=document.getElementById('results');
  if(!sec)return;
  if(sec.getBoundingClientRect().top<window.innerHeight*.8){
    countersDone=true;
    document.querySelectorAll('.count-up').forEach(el=>{
      const target=parseFloat(el.dataset.target);
      const dec=parseInt(el.dataset.decimals||'0',10);
      const dur=1800;
      const start=performance.now();
      (function step(now){
        const p=Math.min((now-start)/dur,1);
        const ease=1-Math.pow(1-p,3);
        el.textContent=(ease*target).toFixed(dec);
        if(p<1)requestAnimationFrame(step);
      })(start);
    });
  }
}

/* ─── ROI CALCULATOR ─── */
function calcROI(){
  const L=+document.getElementById('leads').value;
  const D=+document.getElementById('deal').value;
  const C=+document.getElementById('close').value/100;
  const M=+document.getElementById('miss').value/100;
  document.getElementById('vl').textContent=L;
  document.getElementById('vd').textContent='$'+D.toLocaleString();
  document.getElementById('vc').textContent=Math.round(C*100)+'%';
  document.getElementById('vm').textContent=Math.round(M*100)+'%';
  const curr=L*C*D;
  const missed=L*M;
  const lost=missed*C*D;
  const rec=missed*.75*(C*2)*D;
  const extra=Math.round(missed*.75*C*2);
  const roi=Math.min(Math.round(rec/500),99);
  const pb=Math.max(1,Math.round(500/(rec/30||1)));
  document.getElementById('o-lost').textContent=Math.round(lost).toLocaleString();
  document.getElementById('o-rec').textContent=Math.round(rec).toLocaleString();
  document.getElementById('o-nc').textContent=extra;
  document.getElementById('o-roi').textContent=roi;
  document.getElementById('o-pb').textContent=pb;
  document.getElementById('o-pb-t').textContent=pb+' days';
  const max=curr+rec;
  document.getElementById('bar-now').style.width=(max>0?Math.round(curr/max*100):50)+'%';
  document.getElementById('o-cl').textContent='$'+Math.round(curr).toLocaleString()+'/mo';
  document.getElementById('o-al').textContent='+$'+Math.round(rec).toLocaleString()+'/mo';
}
function updateTrack(el){
  const pct=(el.value-el.min)/(el.max-el.min)*100;
  el.style.background=`linear-gradient(to right,var(--ink) 0%,var(--ink) ${pct}%,var(--border2) ${pct}%,var(--border2) 100%)`;
}
['leads','deal','close','miss'].forEach(id=>{
  const el=document.getElementById(id);
  if(!el)return;
  el.addEventListener('input',()=>{updateTrack(el);calcROI();});
  updateTrack(el);
});
if(document.getElementById('leads'))calcROI();

/* ─── PROOF FILTER ─── */
document.querySelectorAll('.pf-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const f=btn.dataset.filter;
    document.querySelectorAll('.pf-btn').forEach(b=>b.classList.remove('on'));
    btn.classList.add('on');
    document.querySelectorAll('.pc').forEach(c=>c.classList.toggle('hidden',f!=='all'&&c.dataset.i!==f));
  });
});

/* ─── MAGNETIC BUTTONS ─── */
const hasHover=window.matchMedia('(hover:hover)').matches;
if(hasHover){
  document.querySelectorAll('.mag').forEach(btn=>{
    let rafMag=0;
    btn.addEventListener('mousemove',e=>{
      if(rafMag)return;
      rafMag=requestAnimationFrame(()=>{
        rafMag=0;
        const r=btn.getBoundingClientRect();
        const x=(e.clientX-r.left-r.width/2)*.25;
        const y=(e.clientY-r.top-r.height/2)*.25;
        btn.style.transform=`translate(${x}px,${y}px)`;
      });
    });
    btn.addEventListener('mouseleave',()=>{btn.style.transform=''});
  });
}

/* ─── TILT CARDS ─── */
if(hasHover){
  document.querySelectorAll('.tilt').forEach(card=>{
    let rafTilt=0;
    card.addEventListener('mousemove',e=>{
      if(rafTilt)return;
      rafTilt=requestAnimationFrame(()=>{
        rafTilt=0;
        const r=card.getBoundingClientRect();
        const x=(e.clientX-r.left)/r.width-.5;
        const y=(e.clientY-r.top)/r.height-.5;
        card.style.transform=`perspective(800px) rotateX(${-y*6}deg) rotateY(${x*6}deg) translateZ(4px)`;
      });
    });
    card.addEventListener('mouseleave',()=>{
      card.style.transform='perspective(800px) rotateX(0) rotateY(0) translateZ(0)';
    });
  });
}

/* ─── HERO BLOB MOUSE PARALLAX ─── */
const blobs=document.querySelectorAll('.hero-blob');
if(hasHover&&blobs.length){
  let rafBlob=0,blobCx=0,blobCy=0,heroVisible=true;
  const heroEl=document.getElementById('hero');
  if(heroEl){
    new IntersectionObserver(([e])=>{heroVisible=e.isIntersecting;},{threshold:0}).observe(heroEl);
  }
  document.addEventListener('mousemove',e=>{
    if(!heroVisible)return;
    blobCx=e.clientX/window.innerWidth-.5;
    blobCy=e.clientY/window.innerHeight-.5;
    if(rafBlob)return;
    rafBlob=requestAnimationFrame(()=>{
      rafBlob=0;
      blobs.forEach((b,i)=>{
        const s=(i+1)*8;
        b.style.transform=`translate(${blobCx*s}px,${blobCy*s}px)`;
      });
    });
  },{passive:true});
}

/* ─── MODAL MULTI-STEP ─── */
const overlay=document.getElementById('modal-overlay');
const modalClose=document.getElementById('modal-close');
let currentStep=1;

function openModal(){
  if(!overlay)return;
  overlay.classList.add('open');
  document.body.style.overflow='hidden';
  setTimeout(()=>{const el=document.getElementById('f-name');if(el)el.focus()},350);
}
function closeModal(){
  if(!overlay)return;
  overlay.classList.remove('open');
  document.body.style.overflow='';
}
function resetModal(){
  currentStep=1;
  showStep(1);
  document.getElementById('modal-form-view').style.display='';
  document.getElementById('modal-success-view').style.display='none';
  const f=document.getElementById('audit-form');
  if(f){f.reset();f.querySelectorAll('.opt-btn').forEach(b=>b.classList.remove('active'));}
}
function showStep(n){
  currentStep=n;
  [1,2,3].forEach(i=>{
    const s=document.getElementById('step'+i);
    if(s)s.classList.toggle('active',i===n);
  });
  const pbar=document.getElementById('modal-pbar-fill');
  if(pbar)pbar.style.width=(n/3*100)+'%';
  const ctx=document.getElementById('modal-hdr-step');
  const labels=['About you','Your numbers','Your situation'];
  if(ctx)ctx.textContent='Step '+n+' of 3 · '+labels[n-1];
}
function validateStep(n){
  const step=document.getElementById('step'+n);
  if(!step)return true;
  const required=step.querySelectorAll('[required]');
  let ok=true;
  required.forEach(el=>{
    if(!el.value.trim()){
      ok=false;
      if(el.type==='hidden'){
        const grid=step.querySelector(`.opt-grid[data-target="${el.id}"]`);
        if(grid){grid.classList.add('shake');setTimeout(()=>grid.classList.remove('shake'),500);}
      } else {
        el.style.borderColor='var(--red)';
        el.style.boxShadow='0 0 0 3px rgba(220,38,38,.15)';
        setTimeout(()=>{el.style.borderColor='';el.style.boxShadow=''},2000);
      }
    }
  });
  return ok;
}

// Option button pickers
document.querySelectorAll('.opt-grid').forEach(grid=>{
  const hiddenInput=grid.dataset.target?document.getElementById(grid.dataset.target):null;
  grid.querySelectorAll('.opt-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      grid.querySelectorAll('.opt-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      if(hiddenInput)hiddenInput.value=btn.dataset.value;
    });
  });
});

if(overlay){overlay.addEventListener('click',e=>{if(e.target===overlay)closeModal()})}
if(modalClose){modalClose.addEventListener('click',()=>{closeModal();setTimeout(resetModal,400)})}
const msCloseBtn=document.getElementById('ms-close-btn');
if(msCloseBtn){msCloseBtn.addEventListener('click',()=>{closeModal();setTimeout(resetModal,400)})}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
document.addEventListener('click',e=>{
  const t=e.target.closest('[data-modal="open"]');
  if(!t)return;
  e.preventDefault();
  openModal();
});

// step navigation
const next1=document.getElementById('next1');
const next2=document.getElementById('next2');
const back2=document.getElementById('back2');
const back3=document.getElementById('back3');
if(next1)next1.addEventListener('click',()=>{if(validateStep(1))showStep(2)});
if(next2)next2.addEventListener('click',()=>{if(validateStep(2))showStep(3)});
if(back2)back2.addEventListener('click',()=>showStep(1));
if(back3)back3.addEventListener('click',()=>showStep(2));

// clear red border on input
document.querySelectorAll('#audit-form input,#audit-form select,#audit-form textarea').forEach(el=>{
  el.addEventListener('input',()=>{el.style.borderColor='';el.style.boxShadow='';});
});

/* Formspree submission */
const auditForm=document.getElementById('audit-form');
const submitBtn=document.getElementById('modal-submit');
if(auditForm){
  auditForm.addEventListener('submit',async function(e){
    e.preventDefault();
    if(!validateStep(3))return;
    submitBtn.disabled=true;
    submitBtn.textContent='Sending…';
    const data=new FormData(auditForm);
    try{
      const res=await fetch('https://formspree.io/f/xzdyjveb',{method:'POST',body:data,headers:{Accept:'application/json'}});
      if(res.ok){
        document.getElementById('modal-form-view').style.display='none';
        document.getElementById('modal-success-view').style.display='block';
        submitBtn.disabled=false;
        submitBtn.textContent='Submit Application →';
      }else{
        submitBtn.disabled=false;
        submitBtn.textContent='Submit Application →';
        alert('Something went wrong. Please email us at ironlogic.business@gmail.com');
      }
    }catch(err){
      submitBtn.disabled=false;
      submitBtn.textContent='Submit Application →';
      alert('Network error. Please email ironlogic.business@gmail.com');
    }
  });
}

/* ─── WORD CYCLE (data-words) ─── */
(function(){
  document.querySelectorAll('.word-cycle[data-words]').forEach(function(el){
    var words=el.dataset.words.split('|');
    if(words.length<2)return;
    var wordEl=el.querySelector('.cycle-word');
    var barEl=el.querySelector('.cycle-bar');
    if(!wordEl)return;
    var idx=0;
    var interval=parseInt(el.dataset.interval,10)||2400;
    setInterval(function(){
      idx=(idx+1)%words.length;
      if(barEl){
        barEl.classList.remove('sweep');
        void barEl.offsetWidth;
        barEl.classList.add('sweep');
        setTimeout(function(){wordEl.textContent=words[idx];},290);
      }else{
        wordEl.textContent=words[idx];
      }
    },interval);
  });
})();

/* ─── VIDEO MODAL ─── */
(function(){
  const ov=document.getElementById('video-overlay');
  const vid=document.getElementById('modal-video');
  const lbl=document.getElementById('video-label');
  const cls=document.getElementById('video-close');
  function openVideo(src,label){
    vid.src=src;
    lbl.textContent=label||'';
    ov.classList.add('open');
    document.body.style.overflow='hidden';
    vid.play().catch(()=>{});
  }
  function closeVideo(){
    ov.classList.remove('open');
    document.body.style.overflow='';
    vid.pause();
    vid.src='';
  }
  window._openVideo=openVideo;
  if(cls)cls.addEventListener('click',closeVideo);
  if(ov)ov.addEventListener('click',e=>{if(e.target===ov)closeVideo()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&ov.classList.contains('open'))closeVideo()});
  document.addEventListener('click',e=>{
    const t=e.target.closest('[data-video]');
    if(!t)return;
    openVideo(t.dataset.video, t.dataset.videoLabel||'');
  });
})();

/* ─── STICKY CTA BAR ─── */
(function(){
  const dis=document.getElementById('sticky-dismiss');
  if(dis)dis.addEventListener('click',()=>{stickyDismissed=true;if(stickyBar)stickyBar.classList.remove('show');});
})();

/* ─── EXIT INTENT ─── */
(function(){
  const ov=document.getElementById('exit-overlay');
  const cls=document.getElementById('exit-close');
  let fired=false;
  function closeExit(){ov.classList.remove('open');document.body.style.overflow='';}
  document.addEventListener('mouseleave',e=>{
    if(fired||e.clientY>10)return;
    fired=true;
    if(window.scrollY<300)return;
    ov.classList.add('open');
  });
  if(cls)cls.addEventListener('click',closeExit);
  if(ov)ov.addEventListener('click',e=>{if(e.target===ov)closeExit()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&ov.classList.contains('open'))closeExit()});
})();

/* ─── HERO HEADLINE WORD HOVER WRAP ─── */
(function(){
  const h=document.querySelector('.hero-h');
  if(!h)return;
  const nodes=[...h.childNodes];
  h.innerHTML='';
  nodes.forEach(node=>{
    if(node.nodeType===3){
      node.textContent.split(/(\s+)/).forEach(part=>{
        if(/\S/.test(part)){
          const s=document.createElement('span');
          s.className='hero-word';
          s.textContent=part;
          h.appendChild(s);
        }else{
          h.appendChild(document.createTextNode(part));
        }
      });
    }else{
      h.appendChild(node);
    }
  });
})();

/* ─── HERO CARD AUTO-PLAY LOOP ─── */
(function(){
  const ids=['hm0','hm1','hm2','hm3'];
  const result=document.getElementById('hc-result');
  const typing=document.getElementById('hc-typing');
  const playBtn=document.getElementById('hc-play-btn');
  const playLabel=document.getElementById('hc-play-label');
  let timers=[];
  let loopTimer=null;

  function show(id){const el=document.getElementById(id);if(el)el.classList.remove('hidden');}
  function hideAll(){
    timers.forEach(clearTimeout);timers=[];
    clearTimeout(loopTimer);
    ids.forEach(id=>{const el=document.getElementById(id);if(el)el.classList.add('hidden');});
    if(result){result.style.transition='none';result.style.opacity='0';}
    if(typing)typing.style.display='none';
  }

  function run(){
    hideAll();
    if(playBtn){playLabel.textContent='Playing…';playBtn.disabled=true;}

    timers.push(setTimeout(()=>show('hm0'),                                        300));
    timers.push(setTimeout(()=>{if(typing)typing.style.display='';},              1100));
    timers.push(setTimeout(()=>{if(typing)typing.style.display='none';show('hm1');},2500));
    timers.push(setTimeout(()=>show('hm2'),                                       4000));
    timers.push(setTimeout(()=>{if(typing)typing.style.display='';},              5000));
    timers.push(setTimeout(()=>{if(typing)typing.style.display='none';show('hm3');},6800));
    timers.push(setTimeout(()=>{
      if(result){result.style.transition='opacity .7s';result.style.opacity='1';}
      if(playBtn){playLabel.textContent='Replay';playBtn.disabled=false;}
      // loop: pause 3s then restart
      loopTimer=setTimeout(run, 3200);
    },8200));
  }

  if(playBtn)playBtn.addEventListener('click',run);
  // start immediately on page load
  run();
})();

/* ─── PROOF DETAIL PANEL ─── */
(function(){
  const PD=[
    {industry:'Medical / Testing Lab',tag:'Medical',metric:'340%',metricLabel:'Projected conversion increase',tl:'21 days',sys:'WhatsApp AI + CRM',
     before:{response:'4 hours',conversion:'12%',missed:'68%',bookings:'~40/mo'},
     after:{response:'47 seconds',conversion:'53%',missed:'2%',bookings:'~174/mo'},
     bars:[{l:'Lead Response Time',b:100,a:2,bl:'4 hours',al:'47 sec'},{l:'Conversion Rate',b:12,a:53,bl:'12%',al:'53%'},{l:'Missed Inquiries',b:68,a:2,bl:'68%',al:'2%'}],
     roi:'2,800%',revenue:'+4× revenue',payback:'< 7 days',
     why:['68% of inquiries went unanswered after hours — each one a lost booking at ~$44 avg','Response time is the #1 conversion lever in medical scheduling: studies show 78% of patients book the first provider who responds','Moving from 4-hour to 47-second response closes the gap before the lead goes cold or calls a competitor','Full coverage (24/7) alone captures the 40%+ of inbound that comes outside business hours']},
    {industry:'Residential Brokerage',tag:'Real Estate',metric:'$28K',metricLabel:'Commission, single recovered lead',tl:'10 days',sys:'AI Voice + Booking Engine',
     before:{response:'Next morning',conversion:'—',missed:'43%',bookings:'Manual'},
     after:{response:'23 seconds',conversion:'+220%',missed:'0%',bookings:'Automated'},
     bars:[{l:'Response Time',b:100,a:1,bl:'Next morning',al:'23 seconds'},{l:'After-Hours Coverage',b:0,a:100,bl:'None',al:'Full 24/7'},{l:'Missed Calls Captured',b:0,a:100,bl:'0%',al:'43% recovered'}],
     roi:'5,600%',revenue:'+$28K/lead',payback:'1 day',
     why:['Real estate moves on speed — buyers and sellers contact multiple agents simultaneously; first response wins','43% of inbound came outside business hours with zero coverage — pure lost commissions','A single recovered $28K commission pays for the system 80× over','AI voice agent qualifies intent and books showings without agent involvement, freeing time for closings']},
    {industry:'Dental Clinic',tag:'Medical',metric:'62%',metricLabel:'Reduction in missed appointments',tl:'14 days',sys:'SMS + Follow-Up AI',
     before:{response:'Business hours',conversion:'28%',missed:'62%',bookings:'Phone only'},
     after:{response:'< 20 seconds',conversion:'66%',missed:'8%',bookings:'AI 24/7'},
     bars:[{l:'Appointment No-Shows',b:62,a:8,bl:'62%',al:'8%'},{l:'New Patient Conversion',b:28,a:66,bl:'28%',al:'66%'},{l:'After-Hours Bookings',b:0,a:100,bl:'Zero',al:'Full coverage'}],
     roi:'840%',revenue:'+$4.2K/mo',payback:'12 days',
     why:['62% no-show rate is eliminated by automated reminders 24h and 2h before appointment','New patient inquiries sent after hours previously hit voicemail and never converted — AI captures them instantly','SMS confirmation + reminder sequences reduce cognitive load on patient, increasing follow-through','Dental avg patient value ~$800–$2,400 — recovering 5 missed appointments/month easily justifies system cost']},
    {industry:'Personal Injury Firm',tag:'Legal',metric:'3.8×',metricLabel:'Intake qualification rate',tl:'30 days',sys:'AI Intake Pipeline',
     before:{response:'2–4 hours',conversion:'22%',missed:'55%',bookings:'Paralegal calls'},
     after:{response:'31 seconds',conversion:'84%',missed:'4%',bookings:'AI intake'},
     bars:[{l:'Response Time',b:100,a:3,bl:'2–4 hours',al:'31 seconds'},{l:'Qualified Case Rate',b:22,a:84,bl:'22%',al:'84%'},{l:'After-Hours Capture',b:0,a:100,bl:'None',al:'Full'}],
     roi:'1,240%',revenue:'+$62K/mo est.',payback:'9 days',
     why:['55% of PI inquiries arrive outside office hours — the AI intake works overnight','2–4hr response means leads call the next firm; 31-second response means they stay and book','AI asks qualifying questions (injury type, fault, medical treatment) — only viable cases reach attorneys','At $25K average case value, one additional qualified case/month = 70× system cost recovered']},
    {industry:'HVAC Company',tag:'Home Services',metric:'47s',metricLabel:'Response time vs 3hr previous',tl:'10 days',sys:'Missed Call Recovery',
     before:{response:'3 hours avg',conversion:'—',missed:'71%',bookings:'Phone tag'},
     after:{response:'47 seconds',conversion:'+190%',missed:'3%',bookings:'Same-day'},
     bars:[{l:'Response Time',b:100,a:1,bl:'3 hours',al:'47 seconds'},{l:'Same-Day Bookings',b:18,a:76,bl:'18%',al:'76%'},{l:'Missed Job Recovery',b:0,a:100,bl:'0%',al:'71% recovered'}],
     roi:'3,600%',revenue:'+$18K/mo',payback:'4 days',
     why:['HVAC is urgency-driven — broken AC in summer means the customer books whoever answers first','71% of calls were missed during busy install seasons when techs were in the field','AI captures the call, qualifies (emergency vs routine), and books a slot — no human needed','Average HVAC job $350–$800; recovering 20+ missed jobs/month is +$7K–$16K directly']},
    {industry:'Commercial Real Estate',tag:'Real Estate',metric:'+22',metricLabel:'Qualified showings in 30 days',tl:'21 days',sys:'AI Booking Engine',
     before:{response:'Same day',conversion:'14%',missed:'38%',bookings:'Manual'},
     after:{response:'< 1 minute',conversion:'45%',missed:'1%',bookings:'Automated'},
     bars:[{l:'Leads Responded To',b:62,a:99,bl:'62%',al:'99%'},{l:'Showing Conversion',b:14,a:45,bl:'14%',al:'45%'},{l:'Qualification Speed',b:100,a:4,bl:'1–2 days',al:'< 30 min'}],
     roi:'1,680%',revenue:'+$84K pipeline',payback:'11 days',
     why:['Commercial inquiries require qualification (budget, timeline, business type) — AI handles this in real time','38% of weekend inquiries went cold before Monday — AI captures and qualifies 24/7','Instant showing booking (calendar sync) removes friction from the highest-intent leads','Each commercial deal is worth $50K–$500K+ in commission; one additional deal = 100× system cost']},
    {industry:'Business Consultant',tag:'Consulting',metric:'94%',metricLabel:'Reduction in unqualified calls',tl:'14 days',sys:'Lead Qualification AI',
     before:{response:'Same day',conversion:'12%',missed:'—',bookings:'All inbound'},
     after:{response:'27 seconds',conversion:'53%',missed:'—',bookings:'Qualified only'},
     bars:[{l:'Unqualified Calls',b:78,a:6,bl:'78% of calls',al:'6% of calls'},{l:'Strategy Session Rate',b:12,a:53,bl:'12%',al:'53%'},{l:'Response Time',b:100,a:3,bl:'Hours',al:'27 seconds'}],
     roi:'2,400%',revenue:'+$12K/mo',payback:'6 days',
     why:['78% of inbound were price-shoppers or mismatched clients — burning billable time','AI pre-qualifies: budget, current challenge, timeline — only serious leads book a call','Freed consultant time can be used for delivery or higher-value client acquisition','Strategy session close rate jumps when leads arrive pre-educated and pre-sold through the AI conversation']},
    {industry:'Roofing Company',tag:'Home Services',metric:'$18K',metricLabel:'Revenue recovered in 14 days',tl:'10 days',sys:'Missed Call + SMS',
     before:{response:'Next day',conversion:'—',missed:'64%',bookings:'Call-backs'},
     after:{response:'< 30 seconds',conversion:'+210%',missed:'2%',bookings:'Automated'},
     bars:[{l:'Missed Call Recovery',b:0,a:100,bl:'None',al:'64% recovered'},{l:'Estimate Bookings',b:100,a:310,bl:'Baseline',al:'+210%'},{l:'After-Hours Revenue',b:0,a:100,bl:'$0',al:'$18K/14 days'}],
     roi:'3,600%',revenue:'+$18K/14 days',payback:'5 days',
     why:['Roofing leads spike after storms — high urgency, high competition — first response books the job','64% of calls missed during peak season meant crews had idle days while phones rang unanswered','AI sends immediate SMS with estimate booking link — lead converted before checking competitor','Average roof job $8K–$25K; recovering 2 additional jobs/month is +$16K–$50K directly']},
    {industry:'Immigration Firm',tag:'Legal',metric:'2.9×',metricLabel:'Increase in retained consultations',tl:'21 days',sys:'AI Intake + Follow-Up',
     before:{response:'24 hours',conversion:'31%',missed:'59%',bookings:'Email/phone'},
     after:{response:'< 45 seconds',conversion:'89%',missed:'3%',bookings:'Automated'},
     bars:[{l:'Consultation Retention',b:31,a:89,bl:'31%',al:'89%'},{l:'Response Time',b:100,a:2,bl:'24 hours',al:'< 45 sec'},{l:'After-Hours Coverage',b:0,a:100,bl:'0%',al:'100%'}],
     roi:'560%',revenue:'+$28K/mo',payback:'18 days',
     why:['Immigration clients are anxious and often contact multiple firms — instant response signals competence and trustworthiness','59% of inquiries came outside office hours through referral networks and online search','AI handles intake in English and Spanish — immediately collecting visa type, country, urgency','Retainer value $3K–$15K; recovering 3 additional retained clients/month = +$9K–$45K']},
    {industry:'Financial Advisor',tag:'Consulting',metric:'8.4×',metricLabel:'ROI on full system at 90 days',tl:'30 days',sys:'Full Iron Logic System',
     before:{response:'Next business day',conversion:'—',missed:'52%',bookings:'Assistant'},
     after:{response:'< 20 seconds',conversion:'+380%',missed:'1%',bookings:'AI 24/7'},
     bars:[{l:'Response Time',b:100,a:1,bl:'Next day',al:'< 20 sec'},{l:'Qualified Appointments',b:100,a:480,bl:'Baseline',al:'+380%'},{l:'After-Hours Bookings',b:0,a:100,bl:'None',al:'Full coverage'}],
     roi:'8,400%',revenue:'+$42K/mo',payback:'7 days',
     why:['High-net-worth prospects contact advisors on evenings and weekends — next-day response loses them to firms with immediate availability','AI pre-qualifies AUM, investment goals, risk tolerance — only aligned prospects book discovery calls','Automated follow-up sequence re-engages cold leads with educational content — converting 30-day-old inquiries','At $5K–$50K AUM fee per client, one additional client per month = 14–140× system cost recovered']}
  ];

  const detailOverlay=document.getElementById('detail-overlay');
  const dpClose=document.getElementById('dp-close');

  function openDetail(idx){
    const d=PD[idx];
    if(!d||!detailOverlay)return;

    // Header
    document.getElementById('dp-tag').textContent=d.industry;
    document.getElementById('dp-metric').textContent=d.metric;
    document.getElementById('dp-metric-label').textContent=d.metricLabel;

    // Meta row
    document.getElementById('dp-meta').innerHTML=
      `<div class="dp-col"><div class="dp-col-label">Timeline</div><div class="dp-col-val">${d.tl}</div></div>`+
      `<div class="dp-col"><div class="dp-col-label">System</div><div class="dp-col-val">${d.sys}</div></div>`+
      `<div class="dp-proj-notice">⚠ Projected estimate — not a confirmed client result</div>`;

    // Before/after compare
    const rows=[
      {k:'Response Time',b:d.before.response,a:d.after.response},
      {k:'Conversion',b:d.before.conversion,a:d.after.conversion},
      {k:'Missed Leads',b:d.before.missed,a:d.after.missed},
      {k:'Bookings',b:d.before.bookings,a:d.after.bookings},
    ];
    document.getElementById('dp-compare').innerHTML=`
      <div class="dp-compare-grid">
        <div class="dp-compare-hdr"><span>Metric</span><span>Before</span><span>After</span></div>
        ${rows.map(r=>`
        <div class="dp-compare-row">
          <span class="dcr-k">${r.k}</span>
          <span class="dcr-b">${r.b}</span>
          <span class="dcr-a">${r.a}</span>
        </div>`).join('')}
      </div>`;

    // Animated bars
    const barsEl=document.getElementById('dp-bars');
    barsEl.innerHTML=`<div class="dp-bars-title">Performance Shift</div>`+d.bars.map(b=>{
      const bPct=Math.min(b.b,100);
      const aPct=Math.min(b.a,100);
      return`<div class="dp-bar-section">
        <div class="dp-bar-label">${b.l}</div>
        <div class="dp-bar-pair">
          <div class="dp-bar-item">
            <span class="dp-bar-tag">Before</span>
            <div class="dp-bar-track"><div class="dp-bar-fill before-fill" style="width:0" data-w="${bPct}"></div></div>
            <span class="dp-bar-val">${b.bl}</span>
          </div>
          <div class="dp-bar-item">
            <span class="dp-bar-tag">After</span>
            <div class="dp-bar-track"><div class="dp-bar-fill after-fill" style="width:0" data-w="${aPct}"></div></div>
            <span class="dp-bar-val" style="color:var(--red)">${b.al}</span>
          </div>
        </div>
      </div>`;
    }).join('');

    // KPIs
    document.getElementById('dp-bottom').innerHTML=
      `<div class="dp-kpi"><div class="dp-kpi-n" style="color:#16a34a">${d.roi}</div><div class="dp-kpi-l">Projected ROI</div></div>`+
      `<div class="dp-kpi"><div class="dp-kpi-n">${d.revenue}</div><div class="dp-kpi-l">Added Revenue</div></div>`+
      `<div class="dp-kpi"><div class="dp-kpi-n">${d.payback}</div><div class="dp-kpi-l">Payback Period</div></div>`;

    // Why we project this
    const whyEl=document.getElementById('dp-why');
    if(whyEl&&d.why){
      whyEl.innerHTML=`<div class="dp-why-title">Why we project this</div>`+
        d.why.map(w=>`<div class="dp-why-item"><span class="dp-why-dot">→</span><span>${w}</span></div>`).join('');
    }else if(whyEl){whyEl.innerHTML='';}

    // Lock scroll without losing position
    const sy=window.scrollY;
    document.body.style.top='-'+sy+'px';
    document.body.style.position='fixed';
    document.body.style.width='100%';
    document.body.style.overflow='hidden';
    detailOverlay._scrollY=sy;

    detailOverlay.classList.add('open');

    // Animate bars in after panel appears
    setTimeout(()=>{
      barsEl.querySelectorAll('.dp-bar-fill[data-w]').forEach(el=>{
        el.style.width=el.dataset.w+'%';
      });
    },120);
  }

  window._openDetail=openDetail;
  function closeDetail(){
    detailOverlay.classList.remove('open');
    const sy=detailOverlay._scrollY||0;
    document.body.style.position='';
    document.body.style.top='';
    document.body.style.width='';
    document.body.style.overflow='';
    window.scrollTo(0,sy);
  }
  if(dpClose)dpClose.addEventListener('click',closeDetail);
  if(detailOverlay)detailOverlay.addEventListener('click',e=>{if(e.target===detailOverlay)closeDetail()});
  document.addEventListener('click',e=>{
    const pc=e.target.closest('.pc[data-proof]');
    if(pc)openDetail(+pc.dataset.proof);
  });
})();

/* ─── ANALYTICS CHARTS ─── */
(function(){
  const NS='http://www.w3.org/2000/svg';
  function se(tag,a){const e=document.createElementNS(NS,tag);Object.entries(a||{}).forEach(([k,v])=>e.setAttribute(k,v));return e;}
  function linreg(xs,ys){
    const n=xs.length,mx=xs.reduce((a,b)=>a+b,0)/n,my=ys.reduce((a,b)=>a+b,0)/n;
    const num=xs.reduce((s,x,i)=>s+(x-mx)*(ys[i]-my),0),den=xs.reduce((s,x)=>s+(x-mx)**2,0);
    const m=num/den,b=my-m*mx;
    const ss_res=ys.reduce((s,y,i)=>s+(y-(m*xs[i]+b))**2,0),ss_tot=ys.reduce((s,y)=>s+(y-my)**2,0);
    return{m,b,r2:1-ss_res/ss_tot};
  }

  function drawConv(){
    const svg=document.getElementById('chart-conv');if(!svg)return;
    const W=320,H=180,pl=42,pr=12,pt=16,pb=36,cw=W-pl-pr,ch=H-pt-pb;
    const weeks=[1,2,3,4,5,6,7,8],conv=[13,17,23,30,37,43,48,52];
    const {m,b,r2}=linreg(weeks,conv);
    const xMin=1,xMax=8,yMin=0,yMax=60;
    const tx=x=>pl+(x-xMin)/(xMax-xMin)*cw,ty=y=>pt+ch-(y-yMin)/(yMax-yMin)*ch;
    // grid
    [0,15,30,45,60].forEach(y=>{
      svg.appendChild(se('line',{x1:pl,y1:ty(y),x2:pl+cw,y2:ty(y),stroke:'rgba(17,24,39,.06)','stroke-width':'1'}));
      const t=se('text',{x:pl-6,y:ty(y)+4,'text-anchor':'end','font-size':'9',fill:'rgba(17,24,39,.35)','font-family':'DM Mono,monospace'});
      t.textContent=y+'%';svg.appendChild(t);
    });
    weeks.forEach(w=>{
      const t=se('text',{x:tx(w),y:H-pb+14,'text-anchor':'middle','font-size':'9',fill:'rgba(17,24,39,.35)','font-family':'DM Mono,monospace'});
      t.textContent='W'+w;svg.appendChild(t);
    });
    // confidence band
    const bpts=weeks.map(w=>({x:tx(w),yu:ty(m*w+b-3),yl:ty(m*w+b+3)}));
    const bpath=bpts.map((p,i)=>(i===0?'M':'L')+p.x+','+p.yu).join(' ')+' '+[...bpts].reverse().map(p=>'L'+p.x+','+p.yl).join(' ')+' Z';
    svg.appendChild(se('path',{d:bpath,fill:'rgba(220,38,38,.07)',stroke:'none'}));
    // regression line animated
    const lx1=tx(xMin),ly1=ty(m*xMin+b),lx2=tx(xMax),ly2=ty(m*xMax+b);
    const len=Math.hypot(lx2-lx1,ly2-ly1);
    const rl=se('line',{x1:lx1,y1:ly1,x2:lx2,y2:ly2,stroke:'#dc2626','stroke-width':'2','stroke-linecap':'round','stroke-dasharray':len,'stroke-dashoffset':len});
    svg.appendChild(rl);
    // scatter points
    conv.forEach((c,i)=>{
      const jitter=(i%3===0?1.2:i%3===1?-1.5:0.6);
      const dot=se('circle',{cx:tx(weeks[i]),cy:ty(c+jitter),r:'4',fill:'#dc2626',opacity:'0',stroke:'#fff','stroke-width':'1.5'});
      svg.appendChild(dot);
      setTimeout(()=>{dot.style.transition='opacity .3s';dot.setAttribute('opacity','1');},i*70+200);
    });
    // R² label
    const ann=se('text',{x:W-pr-2,y:pt+12,'text-anchor':'end','font-size':'9',fill:'rgba(220,38,38,.8)','font-family':'DM Mono,monospace','font-weight':'600'});
    ann.textContent='R²='+r2.toFixed(2);svg.appendChild(ann);
    setTimeout(()=>{rl.style.transition='stroke-dashoffset 1.3s cubic-bezier(.16,1,.3,1)';rl.setAttribute('stroke-dashoffset','0');},300);
  }

  function drawResp(){
    const svg=document.getElementById('chart-resp');if(!svg)return;
    const W=320,H=180,pl=82,pr=16,pt=14,pb=26,cw=W-pl-pr,ch=H-pt-pb;
    const metrics=[
      {label:'Response Time',before:100,after:0.3,bLabel:'4 hours',aLabel:'47 sec'},
      {label:'Missed Leads',before:68,after:2,bLabel:'68%',aLabel:'2%'},
      {label:'Conversion',before:12,after:53,bLabel:'12%',aLabel:'53%'},
      {label:'Coverage',before:32,after:100,bLabel:'32%',aLabel:'100%'},
    ];
    const bh=12,gap=ch/metrics.length;
    metrics.forEach((m,i)=>{
      const cy=pt+i*gap+gap/2;
      const lbl=se('text',{x:pl-8,y:cy+4,'text-anchor':'end','font-size':'9.5',fill:'rgba(17,24,39,.65)','font-family':'DM Mono,monospace'});
      lbl.textContent=m.label;svg.appendChild(lbl);
      const bW=m.before/100*cw;
      const bBar=se('rect',{x:pl,y:cy-bh-3,width:'0',height:bh,fill:'rgba(17,24,39,.1)',rx:'4'});
      svg.appendChild(bBar);
      const bv=se('text',{x:pl+bW+5,y:cy-3,'font-size':'8.5',fill:'rgba(17,24,39,.4)','font-family':'DM Mono,monospace'});
      bv.textContent=m.bLabel;svg.appendChild(bv);
      const aW=m.after/100*cw;
      const aBar=se('rect',{x:pl,y:cy+3,width:'0',height:bh,fill:'#dc2626',rx:'4',opacity:'.85'});
      svg.appendChild(aBar);
      const av=se('text',{x:pl+aW+5,y:cy+bh,'font-size':'8.5',fill:'#dc2626','font-family':'DM Mono,monospace','font-weight':'600'});
      av.textContent=m.aLabel;svg.appendChild(av);
      setTimeout(()=>{
        bBar.style.transition='width .8s cubic-bezier(.16,1,.3,1)';bBar.setAttribute('width',bW);
        aBar.style.transition='width .9s .1s cubic-bezier(.16,1,.3,1)';aBar.setAttribute('width',aW);
      },i*100+150);
    });
    const ly=H-8;
    [[pl,'rgba(17,24,39,.1)','Before'],[pl+56,'#dc2626','After AI']].forEach(([x,c,lbl])=>{
      svg.appendChild(se('rect',{x,y:ly-7,width:10,height:7,fill:c,rx:'2',opacity:c==='#dc2626'?'.85':'1'}));
      const t=se('text',{x:x+14,y:ly,'font-size':'8.5',fill:c==='#dc2626'?c:'rgba(17,24,39,.4)','font-family':'DM Mono,monospace'});
      t.textContent=lbl;svg.appendChild(t);
    });
  }

  function drawRev(){
    const svg=document.getElementById('chart-rev');if(!svg)return;
    const W=640,H=160,pl=48,pr=16,pt=18,pb=32,cw=W-pl-pr,ch=H-pt-pb;
    const days=Array.from({length:90},(_,i)=>i+1);
    const proj=d=>8*(1-Math.exp(-d/18));
    const cost=0.35;
    const yMax=10;
    const tx=d=>pl+(d-1)/89*cw,ty=v=>pt+ch-v/yMax*ch;
    [0,2.5,5,7.5,10].forEach(v=>{
      svg.appendChild(se('line',{x1:pl,y1:ty(v),x2:pl+cw,y2:ty(v),stroke:'rgba(17,24,39,.05)','stroke-width':'1'}));
      const t=se('text',{x:pl-6,y:ty(v)+4,'text-anchor':'end','font-size':'8',fill:'rgba(17,24,39,.35)','font-family':'DM Mono,monospace'});
      t.textContent='$'+v+'K';svg.appendChild(t);
    });
    [1,15,30,45,60,75,90].forEach(d=>{
      const t=se('text',{x:tx(d),y:H-pb+14,'text-anchor':'middle','font-size':'8',fill:'rgba(17,24,39,.35)','font-family':'DM Mono,monospace'});
      t.textContent='D'+d;svg.appendChild(t);
    });
    const beY=ty(cost);
    svg.appendChild(se('line',{x1:pl,y1:beY,x2:pl+cw,y2:beY,stroke:'rgba(17,24,39,.2)','stroke-width':'1','stroke-dasharray':'5,4'}));
    const belt=se('text',{x:pl+4,y:beY-4,'font-size':'8',fill:'rgba(17,24,39,.4)','font-family':'DM Mono,monospace'});
    belt.textContent='System cost';svg.appendChild(belt);
    // shaded area
    const apath=days.map((d,i)=>(i===0?'M':'L')+tx(d)+','+ty(Math.max(proj(d),cost))).join(' ')+' L'+tx(90)+','+ty(cost)+' L'+tx(1)+','+ty(cost)+' Z';
    svg.appendChild(se('path',{d:apath,fill:'rgba(220,38,38,.07)',stroke:'none'}));
    // curve
    const cpath=days.map((d,i)=>(i===0?'M':'L')+tx(d)+','+ty(proj(d))).join(' ');
    const curve=se('path',{d:cpath,fill:'none',stroke:'#dc2626','stroke-width':'2.5','stroke-linecap':'round','stroke-linejoin':'round','stroke-dasharray':'2000','stroke-dashoffset':'2000'});
    svg.appendChild(curve);
    // regression annotation
    const sx=[1,10,20,30,45,60,75,90],sy=sx.map(proj);
    const {r2}=linreg(sx,sy);
    const ann=se('text',{x:W-pr-4,y:pt+12,'text-anchor':'end','font-size':'8.5',fill:'rgba(220,38,38,.75)','font-family':'DM Mono,monospace','font-weight':'600'});
    ann.textContent='R²='+r2.toFixed(2)+' · Projected monthly Δ revenue';svg.appendChild(ann);
    // breakeven dot
    const beDay=10;
    const bdot=se('circle',{cx:tx(beDay),cy:ty(proj(beDay)),r:'4',fill:'#dc2626',stroke:'#fff','stroke-width':'2',opacity:'0'});
    svg.appendChild(bdot);
    const bcall=se('text',{x:tx(beDay)+8,y:ty(proj(beDay))-5,'font-size':'8',fill:'#dc2626','font-family':'DM Mono,monospace','font-weight':'600',opacity:'0'});
    bcall.textContent='Breakeven ~D10';svg.appendChild(bcall);
    setTimeout(()=>{
      curve.style.transition='stroke-dashoffset 2.2s cubic-bezier(.16,1,.3,1)';
      curve.setAttribute('stroke-dashoffset','0');
    },200);
    setTimeout(()=>{
      bdot.style.transition='opacity .3s';bdot.setAttribute('opacity','1');
      bcall.style.transition='opacity .3s';bcall.setAttribute('opacity','1');
    },2000);
  }

  const grid=document.querySelector('.analytics-grid');
  if(!grid)return;
  let drawn=false;
  new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting&&!drawn){drawn=true;drawConv();drawResp();drawRev();}
  },{threshold:0.2}).observe(grid);
})();

/* ─── HAMBURGER NAV ─── */
(function(){
  const ham=document.getElementById('nav-ham');
  if(!ham)return;
  const navLinks=document.querySelector('.nav-links');
  if(!navLinks)return;
  const drawer=document.createElement('div');
  drawer.className='nav-drawer';
  drawer.id='nav-drawer';
  navLinks.querySelectorAll('a').forEach(a=>{
    const link=document.createElement('a');
    link.href=a.href;
    link.textContent=a.textContent;
    if(a.style.color&&a.style.color!=='')link.classList.add('active');
    drawer.appendChild(link);
  });
  const ctaWrap=document.createElement('div');
  ctaWrap.className='nav-drawer-cta';
  ctaWrap.innerHTML='<button class="btn-primary" data-modal="open" type="button" style="width:100%;justify-content:center;font-size:15px;padding:12px">Get Free Setup Call →</button>';
  drawer.appendChild(ctaWrap);
  document.getElementById('nav').after(drawer);
  function closeDrawer(){ham.classList.remove('open');drawer.classList.remove('open');document.body.style.overflow='';}
  ham.addEventListener('click',e=>{
    e.stopPropagation();
    const open=ham.classList.toggle('open');
    drawer.classList.toggle('open',open);
    document.body.style.overflow=open?'hidden':'';
  });
  drawer.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeDrawer));
  document.addEventListener('click',e=>{if(!ham.contains(e.target)&&!drawer.contains(e.target))closeDrawer();});
})();

/* ─── ABOUT PLAY DEMO ─── */
(function(){
  const playBtn=document.getElementById('about-play-btn');
  const overlay=document.getElementById('play-overlay');
  const closeBtn=document.getElementById('play-close');
  if(!playBtn||!overlay)return;
  const msgs=['pm-0','pm-typing','pm-1','pm-2','pm-typing2','pm-3'];
  const pps=['pps-0','pps-1','pps-2','pps-3','pps-4'];
  const timings=[400,800,2200,3400,3900,5100];
  const pipeTimings=[800,1100,1400,1700,2000];
  let playing=false;
  function reset(){
    msgs.forEach(id=>{const el=document.getElementById(id);if(el){el.classList.remove('show');}});
    pps.forEach(id=>{const el=document.getElementById(id);if(el)el.className='pps-step';});
    playing=false;
  }
  function play(){
    if(playing)return;
    playing=true;
    reset();
    timings.forEach((t,i)=>{
      setTimeout(()=>{const el=document.getElementById(msgs[i]);if(el)el.classList.add('show');},t);
    });
    pipeTimings.forEach((t,i)=>{
      setTimeout(()=>{
        pps.forEach((id,j)=>{
          const el=document.getElementById(id);
          if(!el)return;
          if(j<i)el.className='pps-step done';
          else if(j===i)el.className='pps-step active';
          else el.className='pps-step';
        });
      },t);
    });
    setTimeout(()=>{pps.forEach(id=>{const el=document.getElementById(id);if(el)el.className='pps-step done';});},2400);
  }
  playBtn.addEventListener('click',()=>{
    overlay.classList.add('open');
    document.body.style.overflow='hidden';
    setTimeout(play,300);
  });
  function close(){overlay.classList.remove('open');document.body.style.overflow='';setTimeout(reset,400);}
  if(closeBtn)closeBtn.addEventListener('click',close);
  overlay.addEventListener('click',e=>{if(e.target===overlay)close();});
})();

/* ─── ABOUT PAGE VIEW TOGGLE ─── */
(function(){
  const btnSimple=document.getElementById('vt-simple');
  const btnTech=document.getElementById('vt-tech');
  const viewSimple=document.getElementById('view-simple');
  const viewTech=document.getElementById('view-tech');
  const pill=document.getElementById('vt-pill');
  if(!btnSimple||!btnTech)return;

  function movePill(btn){
    if(!pill)return;
    const toggle=btn.parentElement;
    const toggleRect=toggle.getBoundingClientRect();
    const btnRect=btn.getBoundingClientRect();
    pill.style.width=btnRect.width+'px';
    pill.style.transform=`translateX(${btnRect.left-toggleRect.left-4}px)`;
  }

  function showView(which){
    const isSimple=which==='simple';
    const activeBtn=isSimple?btnSimple:btnTech;
    const outPanel=isSimple?viewTech:viewSimple;
    const inPanel=isSimple?viewSimple:viewTech;

    btnSimple.classList.toggle('on',isSimple);
    btnTech.classList.toggle('on',!isSimple);
    movePill(activeBtn);

    // fade out old
    if(outPanel){outPanel.classList.remove('fade-in');outPanel.style.opacity='0';setTimeout(()=>{outPanel.classList.remove('active');outPanel.style.display='none';},200);}

    // fade in new after brief delay
    setTimeout(()=>{
      if(!inPanel)return;
      inPanel.style.display='block';
      inPanel.classList.add('active');
      inPanel.classList.remove('fade-in');
      requestAnimationFrame(()=>requestAnimationFrame(()=>{
        inPanel.classList.add('fade-in');
      }));
      if(!isSimple){
        setTimeout(()=>{
          inPanel.querySelectorAll('.tech-bar-fill').forEach(el=>{
            el.style.width='0';
            requestAnimationFrame(()=>requestAnimationFrame(()=>{el.style.width='var(--w)';}));
          });
        },50);
      }
    },150);
  }

  // init pill + show default panel
  requestAnimationFrame(()=>{
    movePill(btnSimple);
    if(viewSimple){viewSimple.classList.add('fade-in');}
  });
  window.addEventListener('resize',()=>movePill(document.querySelector('.vt-btn.on')));

  btnSimple.addEventListener('click',()=>showView('simple'));
  btnTech.addEventListener('click',()=>showView('tech'));
})();

/* ─── PROJECT PREVIEW MODAL ─── */
(function(){
  const ov=document.getElementById('proj-overlay');
  const modal=document.getElementById('proj-modal');
  const closeBtn=document.getElementById('proj-close');
  const urlBar=document.getElementById('proj-url-bar');
  const visitBtn=document.getElementById('proj-visit-btn');
  const screenshot=document.getElementById('proj-screenshot');
  const nameEl=document.getElementById('proj-modal-name');
  const typeEl=document.getElementById('proj-modal-type');
  const ctaEl=document.getElementById('proj-modal-cta');
  if(!ov)return;

  function openProj(url,name,type){
    urlBar.textContent=url.replace(/^https?:\/\//,'');
    visitBtn.href=url;
    ctaEl.href=url;
    screenshot.src='https://image.thum.io/get/width/1200/crop/800/'+url;
    screenshot.alt=name;
    nameEl.textContent=name;
    typeEl.textContent=type;
    ov.style.opacity='1';
    ov.style.pointerEvents='auto';
    modal.style.transform='translateY(0) scale(1)';
    document.body.style.overflow='hidden';
  }
  function closeProj(){
    ov.style.opacity='0';
    ov.style.pointerEvents='none';
    modal.style.transform='translateY(24px) scale(.97)';
    document.body.style.overflow='';
    setTimeout(()=>{screenshot.src='';},350);
  }
  if(closeBtn)closeBtn.addEventListener('click',closeProj);
  ov.addEventListener('click',e=>{if(e.target===ov)closeProj();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&ov.style.pointerEvents==='auto')closeProj();});
  document.addEventListener('click',e=>{
    const card=e.target.closest('[data-proj-preview]');
    if(!card)return;
    openProj(card.dataset.projUrl,card.dataset.projName,card.dataset.projType);
  });
})();

/* ─── BUTTON RIPPLE EFFECT ─── */
document.addEventListener('click',function(e){
  const btn=e.target.closest('button,a.btn-primary,a.btn-ghost,.btn-primary,.btn-ghost,.nav-cta,.modal-btn-next,.modal-btn-back,.modal-btn-next[type=submit]');
  if(!btn)return;
  const existing=btn.querySelector('.btn-ripple');
  if(existing)existing.remove();
  const rect=btn.getBoundingClientRect();
  const r=document.createElement('span');
  r.className='btn-ripple';
  r.style.cssText=`left:${e.clientX-rect.left}px;top:${e.clientY-rect.top}px`;
  btn.appendChild(r);
  setTimeout(()=>r.remove(),600);
},{passive:true});

update();
})();