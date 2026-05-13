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
let ticking=false;
function onScroll(){
  if(!ticking){requestAnimationFrame(update);ticking=true}
}
function update(){
  ticking=false;
  const y=window.scrollY;
  const h=document.documentElement.scrollHeight-window.innerHeight;
  if(nav)nav.classList.toggle('scrolled',y>60);
  if(progressEl)progressEl.style.transform=`scaleX(${h>0?y/h:0})`;
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
    re:{buy:["We have morning and afternoon slots this week. Which day works for you?","We're open Mon–Sat 9am–7pm. Want me to check what's available?"],sell:["No problem! Walk-ins welcome, or I can book you a specific slot. What service are you looking for?","Sure — haircut, shape-up, or the full package? And which day works best?"],price:["Haircut is J$1,500 · Shape-up J$800 · Full cut + beard J$2,200. Which service are you going with?","Prices start from J$800. The full cut + beard combo is J$2,200. What are you going for?"],timeline:["We can usually fit you in same day or next day. Morning or afternoon better for you?","We're pretty flexible — what day are you thinking, and morning or afternoon?"],book:["I have Saturday 10am or 1pm available. Which works for you?","How about Friday 3pm or Saturday morning at 10am?"],confirm:["Locked in! ✅ We'll send you a reminder the day before. See you then! ✂️","Booked! 👍 Looking forward to seeing you. Any cancellations, just message us here."],identity:null,default:["Looking to book a cut, or got a question about pricing or hours?","What can I help with — booking, pricing, or services?"]},
    dental:{pain:["We have morning and evening classes this week. Want a free trial session first?","No worries — we offer a free trial so you can check the vibe before committing. Interested?"],routine:["Monthly membership is J$8,000 — that's unlimited access to all equipment and group classes. Want to try a free session first?","We have Zumba, CrossFit, and Boxing classes. Which one sounds like you?"],price:["Monthly membership: J$8,000 · Day pass: J$1,200 · Free trial session available. Want to book the trial?","Trial session is free — no commitment. Membership after is J$8,000/month. Want to book a trial?"],book:["I have a free trial slot Tuesday 6am or Thursday 5pm. Which works?","We have Saturday morning at 8am or Wednesday evening at 5pm. Which is better?"],confirm:["Trial session booked! 💪 See you then — just wear comfortable clothes and bring water.","Confirmed! Come as you are — we'll show you around and get you into the right class."],identity:null,default:["Interested in joining, asking about classes, or want to book a free trial?","What are you looking to do — lose weight, build muscle, or just stay active?"]},
    law:{accident:["We can seat up to 10 people — what date and time are you thinking?","We're open daily 11am–10pm. How many people in your party and which day?"],injury:["No problem! Jerk chicken, curry goat, oxtail — what's calling you today?","We have dine-in, takeout, and delivery. What are you in the mood for?"],price:["Our plates start from J$1,200. The full Jerk experience combo is J$2,800. Want to see the full menu?","Jerk chicken from J$1,200 · Oxtail J$1,800 · Vegetarian options available too. What sounds good?"],book:["I can book you for Saturday at 7pm — how many people?","Sunday brunch at 12pm is great — shall I reserve a table? How many guests?"],confirm:["Table reserved! 🍽️ See you then — we'll have your spot ready. Any dietary needs?","Confirmed! Your table will be set. Let us know if anything changes."],identity:null,default:["Looking to make a reservation, check the menu, or order for delivery?","What can I help with — dine-in, takeout, or catering?"]},
    hvac:{ac:["We have full set, gel manicure, and pedicure. Which service are you going for?","Full set is J$3,500 · Gel manicure J$2,500 · Pedicure J$2,000 · Nail art from J$500 extra. What are you thinking?"],heat:["We have slots Tue–Sat 9am–6pm. Which day works for you?","Morning or afternoon better for you? I can check what's available this week."],price:["Full set J$3,500 · Gel manicure J$2,500 · Pedicure J$2,000. Any nail art is J$500+ depending on design. Which service?","Prices: Full set J$3,500 · Gel J$2,500 · Pedicure J$2,000. Want to book?"],book:["I have Saturday 11am or 2pm available. Which slot works?","How about Thursday 3pm or Friday 10am? Both have availability."],confirm:["Appointment confirmed! 💅 We'll send a reminder. See you soon!","Booked! 👏 If you have nail art inspo, send us a pic beforehand. See you then!"],identity:null,default:["Looking to book an appointment, check prices, or ask about our services?","What can I help with — booking, pricing, or availability?"]},
    consult:{revenue:["What kind of business do you run? I can give you the right info straight away.","Happy to help! Are you asking about pricing, availability, or something specific?"],leads:["What service are you interested in? I can check availability right now.","No problem — are you looking to book, get a price, or find out more?"],growth:["We're open and ready to help. What are you looking for today?","Great! What service do you need and which day works for you?"],price:["The setup call is free and takes about 30 minutes. From there we build your system and you pay monthly. Want to book a call?","First call is free — no commitment. We only move forward if it makes sense for your business. Want to book?"],book:["I have a free setup call available Tuesday 2pm or Thursday 11am. Which works?","How about Monday 10am or Wednesday 3pm for a free 30-min setup call?"],confirm:["Perfect! 👊 You'll get a confirmation text shortly. See you on the call!","Confirmed — talk soon! We'll prep a few questions before the call."],identity:null,default:["What can I help with — pricing, availability, or booking?","Happy to help! What's your question?"]}
  };

  function pick(arr){return arr[Math.floor(Math.random()*arr.length)]}

  function classify(msg,ind){
    msg=msg.toLowerCase();
    if(/who are you|are you (an )?ai|are you (a )?bot|are you human|are you real|what are you/i.test(msg))return'identity';
    if(ind==='re'){
      if(/walk.?in|slot|cut|haircut|trim|fade|shape|style/i.test(msg))return'buy';
      if(/how long|wait|walk in|same day|today/i.test(msg))return'sell';
      if(/price|cost|much|rate|charge|fee|how much/i.test(msg))return'price';
      if(/when|open|hour|available|today|tomorrow|weekend/i.test(msg))return'timeline';
    }else if(ind==='dental'){
      if(/trial|free|try|test|first time|visit|join|tour/i.test(msg))return'pain';
      if(/class|zumba|crossfit|boxing|group|schedule|program/i.test(msg))return'routine';
      if(/price|cost|much|membership|monthly|fee|rate/i.test(msg))return'price';
    }else if(ind==='law'){
      if(/reserv|table|seat|book|dine|dinner|lunch|brunch|group|party|people/i.test(msg))return'accident';
      if(/menu|food|dish|jerk|oxtail|curry|chicken|vegetarian|option/i.test(msg))return'injury';
      if(/price|cost|how much|rate|charge|delivery|fee/i.test(msg))return'price';
    }else if(ind==='hvac'){
      if(/nail|full set|gel|acrylic|manicure|pedicure|nail art|design/i.test(msg))return'ac';
      if(/when|available|slot|open|hour|day|week|saturday|sunday/i.test(msg))return'heat';
      if(/price|cost|much|rate|charge|fee|how much/i.test(msg))return'price';
    }else if(ind==='consult'){
      if(/how|work|tell me|explain|more|info|what do/i.test(msg))return'revenue';
      if(/lead|traffic|client|customer|prospect|market|message/i.test(msg))return'leads';
      if(/grow|scale|expand|help|business|problem|issue/i.test(msg))return'growth';
      if(/price|cost|fee|much|invest|charge|service|plan/i.test(msg))return'price';
    }
    if(/book|schedul|appoint|slot|time|available|meeting|call|visit|consult|session/i.test(msg))return'book';
    if(/yes|sure|okay|ok|perfect|great|works|confirm|deal|let.s|sounds good|go ahead|lock/i.test(msg))return'confirm';
    return'default';
  }

  function getFallback(msg,ind){
    const intent=classify(msg,ind);
    const fb=FB[ind];
    if(intent==='identity'){
      const n=IND[ind];
      return`I'm an AI assistant — built by Iron Logic so ${n.name.split('·')[0].trim()}can respond to every lead instantly, 24/7. Now, how can I help you? 😊`;
    }
    return pick(fb[intent]||fb.default);
  }

  async function getAI(text,history,ind){
    try{
      const res=await fetch('/api/chat',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({messages:[...history,{role:'user',content:text}],systemPrompt:IND[ind].system})
      });
      if(res.ok){const d=await res.json();if(d.reply)return d.reply;}
    }catch(e){}
    return getFallback(text,ind);
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
document.querySelectorAll('.mag').forEach(btn=>{
  btn.addEventListener('mousemove',e=>{
    const r=btn.getBoundingClientRect();
    const x=(e.clientX-r.left-r.width/2)*.25;
    const y=(e.clientY-r.top-r.height/2)*.25;
    btn.style.transform=`translate(${x}px,${y}px)`;
  });
  btn.addEventListener('mouseleave',()=>{btn.style.transform=''});
});

/* ─── TILT CARDS ─── */
document.querySelectorAll('.tilt').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const r=card.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`perspective(800px) rotateX(${-y*6}deg) rotateY(${x*6}deg) translateZ(4px)`;
  });
  card.addEventListener('mouseleave',()=>{
    card.style.transform='perspective(800px) rotateX(0) rotateY(0) translateZ(0)';
  });
});

/* ─── HERO BLOB MOUSE PARALLAX ─── */
const blobs=document.querySelectorAll('.hero-blob');
document.addEventListener('mousemove',e=>{
  const cx=e.clientX/window.innerWidth-.5;
  const cy=e.clientY/window.innerHeight-.5;
  blobs.forEach((b,i)=>{
    const s=(i+1)*14;
    b.style.transform=`translate(${cx*s}px,${cy*s}px)`;
  });
},{passive:true});

/* ─── MODAL MULTI-STEP ─── */
const overlay=document.getElementById('modal-overlay');
const modalClose=document.getElementById('modal-close');
let currentStep=1;

function openModal(){
  overlay.classList.add('open');
  document.body.style.overflow='hidden';
  setTimeout(()=>{const el=document.getElementById('f-name');if(el)el.focus()},350);
}
function closeModal(){
  overlay.classList.remove('open');
  document.body.style.overflow='';
}
function resetModal(){
  currentStep=1;
  showStep(1);
  document.getElementById('modal-form-view').style.display='';
  document.getElementById('modal-success-view').style.display='none';
  const f=document.getElementById('audit-form');
  if(f)f.reset();
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
      el.style.borderColor='var(--red)';
      el.style.boxShadow='0 0 0 3px rgba(220,38,38,.15)';
      ok=false;
      setTimeout(()=>{el.style.borderColor='';el.style.boxShadow=''},2000);
    }
  });
  return ok;
}

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

/* ─── WORD CYCLE (generic) ─── */
(function(){
  function startCycle(wordEl,barEl,words,interval){
    let idx=0;
    function next(){
      idx=(idx+1)%words.length;
      if(barEl){
        barEl.classList.remove('sweep');
        void barEl.offsetWidth;
        barEl.classList.add('sweep');
      }
      setTimeout(()=>{ wordEl.textContent=words[idx]; },barEl?260:0);
    }
    setInterval(next,interval||2400);
  }

  // Named cycles via data-cycle-id on .word-cycle containers
  document.querySelectorAll('.word-cycle[data-words]').forEach(container=>{
    const wordEl=container.querySelector('.cycle-word');
    const barEl=container.querySelector('.cycle-bar');
    if(!wordEl)return;
    const words=container.dataset.words.split('|');
    const interval=+(container.dataset.interval||2400);
    startCycle(wordEl,barEl,words,interval);
  });

  // Legacy hero cycle (index.html — no data-words, uses id="cycle-word")
  const legacyWord=document.getElementById('cycle-word');
  if(legacyWord&&!legacyWord.closest('[data-words]')){
    const words=['elsewhere.','to a competitor.','without replying.','without booking.','without coming back.'];
    const legacyBar=document.getElementById('cycle-bar');
    startCycle(legacyWord,legacyBar,words,2400);
  }
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
  const bar=document.getElementById('sticky-bar');
  const dis=document.getElementById('sticky-dismiss');
  let dismissed=false;
  function checkSticky(){
    if(dismissed)return;
    bar.classList.toggle('show',window.scrollY>600);
  }
  window.addEventListener('scroll',checkSticky,{passive:true});
  if(dis)dis.addEventListener('click',()=>{dismissed=true;bar.classList.remove('show');});
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
    // only fire if user has scrolled enough to have seen content
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
      h.appendChild(node.cloneNode(true));
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
    {industry:'DNA Testing Lab',tag:'Medical',metric:'340%',metricLabel:'Conversion rate increase',tl:'21 days',sys:'WhatsApp AI + CRM',
     before:{response:'4 hours',conversion:'12%',missed:'68%',bookings:'~40/mo'},
     after:{response:'47 seconds',conversion:'53%',missed:'2%',bookings:'~174/mo'},
     bars:[{l:'Lead Response Time',b:100,a:2,bl:'4 hours',al:'47 sec'},{l:'Conversion Rate',b:12,a:53,bl:'12%',al:'53%'},{l:'Missed Inquiries',b:68,a:2,bl:'68%',al:'2%'}],
     roi:'2,800%',revenue:'+J$2.4M/mo',payback:'< 7 days'},
    {industry:'Residential Brokerage',tag:'Real Estate',metric:'$28K',metricLabel:'Commission, single recovered lead',tl:'10 days',sys:'AI Voice + Booking Engine',
     before:{response:'Next morning',conversion:'—',missed:'43%',bookings:'Manual'},
     after:{response:'23 seconds',conversion:'+220%',missed:'0%',bookings:'Automated'},
     bars:[{l:'Response Time',b:100,a:1,bl:'Next morning',al:'23 seconds'},{l:'After-Hours Coverage',b:0,a:100,bl:'None',al:'Full 24/7'},{l:'Missed Calls Captured',b:0,a:100,bl:'0%',al:'43% recovered'}],
     roi:'5,600%',revenue:'+$28K/lead',payback:'1 day'},
    {industry:'Dental Clinic',tag:'Medical',metric:'62%',metricLabel:'Reduction in missed appointments',tl:'14 days',sys:'SMS + Follow-Up AI',
     before:{response:'Business hours',conversion:'28%',missed:'62%',bookings:'Phone only'},
     after:{response:'< 20 seconds',conversion:'66%',missed:'8%',bookings:'AI 24/7'},
     bars:[{l:'Appointment No-Shows',b:62,a:8,bl:'62%',al:'8%'},{l:'New Patient Conversion',b:28,a:66,bl:'28%',al:'66%'},{l:'After-Hours Bookings',b:0,a:100,bl:'Zero',al:'Full coverage'}],
     roi:'840%',revenue:'+$4.2K/mo',payback:'12 days'},
    {industry:'Personal Injury Firm',tag:'Legal',metric:'3.8×',metricLabel:'Intake qualification rate',tl:'30 days',sys:'AI Intake Pipeline',
     before:{response:'2–4 hours',conversion:'22%',missed:'55%',bookings:'Paralegal calls'},
     after:{response:'31 seconds',conversion:'84%',missed:'4%',bookings:'AI intake'},
     bars:[{l:'Response Time',b:100,a:3,bl:'2–4 hours',al:'31 seconds'},{l:'Qualified Case Rate',b:22,a:84,bl:'22%',al:'84%'},{l:'After-Hours Capture',b:0,a:100,bl:'None',al:'Full'}],
     roi:'1,240%',revenue:'+$62K/mo est.',payback:'9 days'},
    {industry:'HVAC Company',tag:'Home Services',metric:'47s',metricLabel:'Response time vs 3hr previous',tl:'10 days',sys:'Missed Call Recovery',
     before:{response:'3 hours avg',conversion:'—',missed:'71%',bookings:'Phone tag'},
     after:{response:'47 seconds',conversion:'+190%',missed:'3%',bookings:'Same-day'},
     bars:[{l:'Response Time',b:100,a:1,bl:'3 hours',al:'47 seconds'},{l:'Same-Day Bookings',b:18,a:76,bl:'18%',al:'76%'},{l:'Missed Job Recovery',b:0,a:100,bl:'0%',al:'71% recovered'}],
     roi:'3,600%',revenue:'+$18K/mo',payback:'4 days'},
    {industry:'Commercial Real Estate',tag:'Real Estate',metric:'+22',metricLabel:'Qualified showings in 30 days',tl:'21 days',sys:'AI Booking Engine',
     before:{response:'Same day',conversion:'14%',missed:'38%',bookings:'Manual'},
     after:{response:'< 1 minute',conversion:'45%',missed:'1%',bookings:'Automated'},
     bars:[{l:'Leads Responded To',b:62,a:99,bl:'62%',al:'99%'},{l:'Showing Conversion',b:14,a:45,bl:'14%',al:'45%'},{l:'Qualification Speed',b:100,a:4,bl:'1–2 days',al:'< 30 min'}],
     roi:'1,680%',revenue:'+$84K pipeline',payback:'11 days'},
    {industry:'Business Consultant',tag:'Consulting',metric:'94%',metricLabel:'Reduction in unqualified calls',tl:'14 days',sys:'Lead Qualification AI',
     before:{response:'Same day',conversion:'12%',missed:'—',bookings:'All inbound'},
     after:{response:'27 seconds',conversion:'53%',missed:'—',bookings:'Qualified only'},
     bars:[{l:'Unqualified Calls',b:78,a:6,bl:'78% of calls',al:'6% of calls'},{l:'Strategy Session Rate',b:12,a:53,bl:'12%',al:'53%'},{l:'Response Time',b:100,a:3,bl:'Hours',al:'27 seconds'}],
     roi:'2,400%',revenue:'+$12K/mo',payback:'6 days'},
    {industry:'Roofing Company',tag:'Home Services',metric:'$18K',metricLabel:'Revenue recovered in 14 days',tl:'10 days',sys:'Missed Call + SMS',
     before:{response:'Next day',conversion:'—',missed:'64%',bookings:'Call-backs'},
     after:{response:'< 30 seconds',conversion:'+210%',missed:'2%',bookings:'Automated'},
     bars:[{l:'Missed Call Recovery',b:0,a:100,bl:'None',al:'64% recovered'},{l:'Estimate Bookings',b:100,a:310,bl:'Baseline',al:'+210%'},{l:'After-Hours Revenue',b:0,a:100,bl:'$0',al:'$18K/14 days'}],
     roi:'3,600%',revenue:'+$18K/14 days',payback:'5 days'},
    {industry:'Immigration Firm',tag:'Legal',metric:'2.9×',metricLabel:'Increase in retained consultations',tl:'21 days',sys:'AI Intake + Follow-Up',
     before:{response:'24 hours',conversion:'31%',missed:'59%',bookings:'Email/phone'},
     after:{response:'< 45 seconds',conversion:'89%',missed:'3%',bookings:'Automated'},
     bars:[{l:'Consultation Retention',b:31,a:89,bl:'31%',al:'89%'},{l:'Response Time',b:100,a:2,bl:'24 hours',al:'< 45 sec'},{l:'After-Hours Coverage',b:0,a:100,bl:'0%',al:'100%'}],
     roi:'560%',revenue:'+$28K/mo',payback:'18 days'},
    {industry:'Financial Advisor',tag:'Consulting',metric:'8.4×',metricLabel:'ROI on full system at 90 days',tl:'30 days',sys:'Full Iron Logic System',
     before:{response:'Next business day',conversion:'—',missed:'52%',bookings:'Assistant'},
     after:{response:'< 20 seconds',conversion:'+380%',missed:'1%',bookings:'AI 24/7'},
     bars:[{l:'Response Time',b:100,a:1,bl:'Next day',al:'< 20 sec'},{l:'Qualified Appointments',b:100,a:480,bl:'Baseline',al:'+380%'},{l:'After-Hours Bookings',b:0,a:100,bl:'None',al:'Full coverage'}],
     roi:'8,400%',revenue:'+$42K/mo',payback:'7 days'}
  ];

  const detailOverlay=document.getElementById('detail-overlay');
  const dpClose=document.getElementById('dp-close');

  function openDetail(idx){
    const d=PD[idx];
    if(!d)return;
    document.getElementById('dp-tag').textContent=d.industry;
    document.getElementById('dp-metric').textContent=d.metric;
    document.getElementById('dp-metric-label').textContent=d.metricLabel;
    document.getElementById('dp-meta').innerHTML=
      `<span class="dp-tag-pill tl">⏱ ${d.tl}</span><span class="dp-tag-pill sys">${d.sys}</span>`;
    document.getElementById('dp-compare').innerHTML=`
      <div class="dp-col before">
        <div class="dp-col-label">Before</div>
        <div class="dp-stat"><div class="dp-stat-k">Response Time</div><div class="dp-stat-v">${d.before.response}</div></div>
        <div class="dp-stat"><div class="dp-stat-k">Conversion</div><div class="dp-stat-v">${d.before.conversion}</div></div>
        <div class="dp-stat"><div class="dp-stat-k">Missed Leads</div><div class="dp-stat-v">${d.before.missed}</div></div>
        <div class="dp-stat"><div class="dp-stat-k">Bookings</div><div class="dp-stat-v">${d.before.bookings}</div></div>
      </div>
      <div class="dp-col after">
        <div class="dp-col-label">After</div>
        <div class="dp-stat"><div class="dp-stat-k">Response Time</div><div class="dp-stat-v">${d.after.response}</div></div>
        <div class="dp-stat"><div class="dp-stat-k">Conversion</div><div class="dp-stat-v">${d.after.conversion}</div></div>
        <div class="dp-stat"><div class="dp-stat-k">Missed Leads</div><div class="dp-stat-v">${d.after.missed}</div></div>
        <div class="dp-stat"><div class="dp-stat-k">Bookings</div><div class="dp-stat-v">${d.after.bookings}</div></div>
      </div>`;
    const barsEl=document.getElementById('dp-bars');
    barsEl.innerHTML=d.bars.map(b=>{
      const bPct=Math.min(b.b,100);
      const aPct=Math.min(b.a,100);
      return`<div class="dp-bar-row">
        <div class="dp-bar-labels"><span>${b.l}</span><span style="color:var(--red)">${b.al}</span></div>
        <div style="position:relative;height:6px;background:var(--bg3);border-radius:3px;margin-bottom:3px">
          <div class="dp-bar-ghost" data-w="${bPct}" style="background:var(--border2)"></div>
          <div class="dp-bar-fill" data-w="${aPct}"></div>
        </div>
        <div style="display:flex;justify-content:space-between;font-family:var(--mono);font-size:10px;color:var(--ink4)"><span>Before: ${b.bl}</span><span style="color:var(--red)">After: ${b.al}</span></div>
      </div>`;
    }).join('');
    document.getElementById('dp-bottom').innerHTML=`
      <div class="dp-kpi"><div class="dp-kpi-n" style="color:var(--green)">${d.roi}</div><div class="dp-kpi-l">ROI</div></div>
      <div class="dp-kpi"><div class="dp-kpi-n">${d.revenue}</div><div class="dp-kpi-l">Added Revenue</div></div>
      <div class="dp-kpi"><div class="dp-kpi-n">${d.payback}</div><div class="dp-kpi-l">Payback Period</div></div>`;
    detailOverlay.classList.add('open');
    document.body.style.overflow='hidden';
    // animate bars after open
    requestAnimationFrame(()=>requestAnimationFrame(()=>{
      document.querySelectorAll('.dp-bar-ghost').forEach(el=>{el.style.width=el.dataset.w+'%'});
      document.querySelectorAll('.dp-bar-fill').forEach(el=>{el.style.width=el.dataset.w+'%'});
    }));
  }

  function closeDetail(){detailOverlay.classList.remove('open');document.body.style.overflow='';}
  if(dpClose)dpClose.addEventListener('click',closeDetail);
  if(detailOverlay)detailOverlay.addEventListener('click',e=>{if(e.target===detailOverlay)closeDetail()});
  document.addEventListener('click',e=>{
    const pc=e.target.closest('.pc[data-proof]');
    if(pc)openDetail(+pc.dataset.proof);
  });
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
  if(!btnSimple||!btnTech)return;

  function showView(which){
    const isSimple=which==='simple';
    btnSimple.classList.toggle('on',isSimple);
    btnTech.classList.toggle('on',!isSimple);
    if(viewSimple)viewSimple.style.display=isSimple?'block':'none';
    if(viewTech)viewTech.style.display=isSimple?'none':'block';
    if(!isSimple){
      setTimeout(()=>{
        viewTech.querySelectorAll('.tech-bar-fill').forEach(el=>{
          el.style.width='0';
          requestAnimationFrame(()=>requestAnimationFrame(()=>{el.style.width='var(--w)';}));
        });
      },50);
    }
  }

  btnSimple.addEventListener('click',()=>showView('simple'));
  btnTech.addEventListener('click',()=>showView('tech'));
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