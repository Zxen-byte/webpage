const defaultData=window.SITE_DATA||{
heroTitle:"Happy Valentine's Day ♥",heroTo:"To My Favorite Person",heroSubtitle:"Every moment with you is a memory I never want to forget.",
name:"[Your Name]",letter:`<p><em>My love,</em></p><p>I don't always know how to put my feelings into words, but I want you to know how grateful I am to have you in my life. Somehow, ordinary days became my favorite days simply because you were there.</p><p>Thank you for every laugh, every quiet moment, every memory, and every little way you make life feel warmer.</p><p>I choose you, again and again.</p>`,signature:"Forever yours,<br><b>[Your Name] ♥</b>",
secret:"You are one of the best things that ever happened to me. No matter where life takes us, I hope we keep choosing each other.",songText:"This song always reminds me of you.",songLink:"",metDate:"2024-06-14T19:00",anniversary:"2026-07-28",accessPassword:"love",
finalMessage:"If I could choose one person to make memories with over and over again, I would choose you every single time.",heroImage:"",counterImage:"",messageImage:"",storyImage:"",loveImage:"",songImage:"",surpriseImage:"",audio:"",backgroundAudio:"",backgroundMusicEnabled:true,backgroundMusicVolume:0.18,
settings:{primary:"#8b1e3f",background:"#fff9f5",text:"#34272b",heading:"Georgia,serif",body:"'Trebuchet MS',sans-serif",mood:"petals"},
memories:[],reasons:["Your smile","Your laugh","The way you care about people","The way you make ordinary days special"],
events:[{date:"2023",title:"The Beginning",description:"Somehow, two people met and started a story neither of us expected.",image:""},{date:"2024",title:"Our Favorite Memories",description:"Every day with you became another reason to smile.",image:""}]
};
let data=normalize(window.SITE_DATA||defaultData); let lightIndex=0; let draft;
function normalize(x){return {...structuredClone(defaultData),...x,settings:{...defaultData.settings,...(x.settings||{})},memories:Array.isArray(x.memories)?x.memories:[],reasons:Array.isArray(x.reasons)?x.reasons:defaultData.reasons,events:Array.isArray(x.events)?x.events:defaultData.events}}
function downloadGitHubConfig(){
  collectEditor();
  const clean=structuredClone(data);
  const js='// Edit this file in GitHub to publish your Valentine website.\n// Keep image/audio files in the assets/ folder and use paths such as "assets/hero.jpg".\nwindow.SITE_DATA = '+JSON.stringify(clean,null,2)+';\n';
  const blob=new Blob([js],{type:'text/javascript'}),a=document.createElement('a');
  a.href=URL.createObjectURL(blob);a.download='site-data.js';a.click();URL.revokeObjectURL(a.href);
  toast('site-data.js downloaded ♥ Upload it to GitHub');
  return true;
}
function esc(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
function toast(t){const x=document.getElementById("toast");x.textContent=t;x.classList.add("show");clearTimeout(window._toast);window._toast=setTimeout(()=>x.classList.remove("show"),2200)}
function applyStyle(){const s=data.settings;document.documentElement.style.setProperty("--primary",s.primary);document.documentElement.style.setProperty("--background",s.background);document.documentElement.style.setProperty("--bg",s.background);document.documentElement.style.setProperty("--text",s.text);document.documentElement.style.setProperty("--heading",s.heading);document.documentElement.style.setProperty("--body",s.body);document.getElementById("particles").style.display=s.mood==="plain"?"none":"block"}
function render(){
 applyStyle();
 for(const el of document.querySelectorAll("[data-key]")){const k=el.dataset.key;if(k in data)el.value=data[k]}
 document.getElementById("heroTitle").innerHTML=esc(data.heroTitle).replace(/♥/g,"<span>♥</span>");
 document.getElementById("heroTo").textContent=data.heroTo;document.getElementById("heroSubtitle").textContent=data.heroSubtitle;
 document.getElementById("letterText").innerHTML=data.letter||"<p>Write something from your heart...</p>";
 document.getElementById("signature").innerHTML=data.signature;
 document.getElementById("secretText").textContent=data.secret;document.getElementById("songText").textContent=data.songText;
 const sl=document.getElementById("songLink");sl.href=data.songLink||"#";sl.hidden=!data.songLink;
 document.getElementById("finalMessage").textContent=data.finalMessage;document.getElementById("finalSignature").textContent=data.name;
 setImage("heroImage",data.heroImage,"heroPlaceholder");
 setPageImage("counterImage",data.counterImage);
 setPageImage("messageImage",data.messageImage);
 setPageImage("storyImage",data.storyImage);
 setPageImage("loveImage",data.loveImage);
 setPageImage("songImage",data.songImage);
 setPageImage("surpriseImage",data.surpriseImage);
 setPageImage("finalPhotoImg",data.heroImage);
 renderGallery();renderTimeline();renderReasons();renderEditorLists();updateCounter();renderAudio();renderBackgroundMusic();
 document.querySelectorAll("[data-style]").forEach(el=>el.value=data.settings[el.dataset.style]||"");
 const bmToggle=document.getElementById("backgroundMusicToggle");if(bmToggle)bmToggle.checked=data.backgroundMusicEnabled!==false;
 const bmVol=document.getElementById("backgroundMusicVolume");if(bmVol)bmVol.value=String(data.backgroundMusicVolume??.18);
}
function setImage(id,src,placeholder){
  const im=document.getElementById(id),ph=document.getElementById(placeholder);
  const showPlaceholder=()=>{
    im.hidden=true;
    im.removeAttribute("src");
    ph.hidden=false;
  };
  im.onerror=showPlaceholder;
  if(src){
    im.hidden=false;
    ph.hidden=true;
    im.src=src;
  }else{
    showPlaceholder();
  }
}
function setPageImage(id,src){
 const im=document.getElementById(id); if(!im)return;
 const holder=im.closest('.page-photo,.mini-photo,.final-photo');
 const cleanSrc=String(src||'').trim();
 const showFallback=()=>{im.hidden=true;im.removeAttribute('src');if(holder)holder.classList.remove('has-image')};
 im.onerror=showFallback;
 if(cleanSrc){im.hidden=false;im.src=cleanSrc;if(holder)holder.classList.add('has-image')}
 else showFallback();
}
function renderGallery(){
 const g=document.getElementById("gallery");
 if(!data.memories.length){g.innerHTML=`<div class="empty" style="column-span:all;text-align:center;padding:70px;background:#fff;border:1px dashed var(--line);border-radius:24px"><h3 style="font-family:var(--heading);font-size:34px;color:var(--primary2)">Your memories will live here ♥</h3><p class="muted">Start adding your favorite moments together.</p><button class="primary-btn" onclick="openEditor('memoriesTab')">Add Your First Photo</button></div>`;return}
 g.innerHTML=data.memories.map((m,i)=>`<article class="memory-card" data-i="${i}">${m.image?`<img loading="lazy" src="${m.image}" alt="${esc(m.title||"Memory")}">`:`<div class="photo-placeholder" style="height:220px"><span>♡</span></div>`}<div class="memory-info"><small>${esc(m.date||"A beautiful day")}</small><h3>${esc(m.title||"A favorite memory")}</h3><p>${esc(m.caption||"A moment worth keeping forever.")}</p></div></article>`).join("");
 g.querySelectorAll(".memory-card").forEach(c=>c.onclick=()=>openLight(+c.dataset.i));
}
function renderTimeline(){document.getElementById("timeline").innerHTML=data.events.map(e=>`<article class="event reveal"><time>${esc(e.date)}</time><h3>${esc(e.title)}</h3><p>${esc(e.description)}</p>${e.image?`<img src="${e.image}" alt="">`:""}</article>`).join("");observeReveals()}
function renderReasons(){document.getElementById("reasons").innerHTML=data.reasons.map(r=>`<div class="reason reveal"><span>${esc(r)} ♥</span></div>`).join("");observeReveals()}
function renderEditorLists(){
 document.getElementById("memoryEditorList").innerHTML=data.memories.map((m,i)=>`<div class="edit-item"><strong>Memory ${i+1}</strong><input data-m="${i}" data-field="date" placeholder="Date" value="${esc(m.date)}"><input data-m="${i}" data-field="title" placeholder="Title" value="${esc(m.title)}"><textarea data-m="${i}" data-field="caption" placeholder="Caption">${esc(m.caption)}</textarea><input data-m="${i}" data-field="image" placeholder="assets/memory-1.jpg" value="${esc(m.image||"")}"><button class="mini-danger delete-memory" data-i="${i}">Delete</button></div>`).join("");
 document.getElementById("reasonEditorList").innerHTML=data.reasons.map((r,i)=>`<div class="edit-item"><input data-r="${i}" value="${esc(r)}"><button class="mini-danger delete-reason" data-i="${i}">Delete</button></div>`).join("");
 document.getElementById("eventEditorList").innerHTML=data.events.map((e,i)=>`<div class="edit-item"><strong>Story ${i+1}</strong><input data-e="${i}" data-field="date" placeholder="Date" value="${esc(e.date)}"><input data-e="${i}" data-field="title" placeholder="Title" value="${esc(e.title)}"><textarea data-e="${i}" data-field="description" placeholder="Description">${esc(e.description)}</textarea><input data-e="${i}" data-field="image" placeholder="assets/story.jpg" value="${esc(e.image||"")}"><button class="mini-danger delete-event" data-i="${i}">Delete</button></div>`).join("");
 document.querySelectorAll("[data-m]").forEach(x=>x.oninput=()=>{data.memories[x.dataset.m][x.dataset.field]=x.value;renderGallery()});
 document.querySelectorAll("[data-r]").forEach(x=>x.oninput=()=>{data.reasons[x.dataset.r]=x.value;renderReasons()});
 document.querySelectorAll("[data-e]").forEach(x=>x.oninput=()=>{data.events[x.dataset.e][x.dataset.field]=x.value;renderTimeline()});
 document.querySelectorAll(".delete-memory").forEach(b=>b.onclick=()=>{data.memories.splice(+b.dataset.i,1);render()});
 document.querySelectorAll(".delete-reason").forEach(b=>b.onclick=()=>{data.reasons.splice(+b.dataset.i,1);render()});
 document.querySelectorAll(".delete-event").forEach(b=>b.onclick=()=>{data.events.splice(+b.dataset.i,1);render()});
}
function updateCounter(){
 const start=new Date(data.metDate);if(isNaN(start)){return}
 const now=new Date();let years=now.getFullYear()-start.getFullYear();let months=now.getMonth()-start.getMonth();let days=now.getDate()-start.getDate();let hours=now.getHours()-start.getHours();let mins=now.getMinutes()-start.getMinutes();let secs=now.getSeconds()-start.getSeconds();
 if(secs<0){secs+=60;mins--}if(mins<0){mins+=60;hours--}if(hours<0){hours+=24;days--}
 const prevMonth=new Date(now.getFullYear(),now.getMonth(),0).getDate();if(days<0){days+=prevMonth;months--}if(months<0){months+=12;years--}
 [["years",years],["months",months],["days",days],["hours",hours],["minutes",mins],["seconds",secs]].forEach(([id,v])=>document.getElementById(id).textContent=Math.max(0,v));
 document.getElementById("anniversaryText").textContent=data.anniversary?`Our anniversary ♥ ${new Date(data.anniversary+"T00:00").toLocaleDateString(undefined,{month:"long",day:"numeric",year:"numeric"})}`:"";
}
function renderAudio(){const a=document.getElementById("audio");if(data.audio){a.src=data.audio;a.hidden=false}else{a.removeAttribute("src");a.hidden=!data.songLink}}
function renderBackgroundMusic(){
  const a=document.getElementById("backgroundAudio");
  if(!a)return;
  if(data.backgroundAudio){a.src=data.backgroundAudio;a.volume=Math.max(0,Math.min(1,Number(data.backgroundMusicVolume??.18)));a.loop=true}
  else{a.pause();a.removeAttribute("src")}
}
async function startBackgroundMusic(){
  const a=document.getElementById("backgroundAudio");
  if(!a||!data.backgroundAudio||data.backgroundMusicEnabled===false||!a.paused)return;
  try{await a.play()}catch{}
}

function observeReveals(){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");io.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll(".reveal:not(.visible)").forEach(x=>io.observe(x))}
function openEditor(tab="content"){draft=structuredClone(data);document.getElementById("editor").classList.add("open");document.getElementById("editor").setAttribute("aria-hidden","false");document.getElementById("editorBackdrop").hidden=false;switchTab(tab);document.body.style.overflow="hidden"}
function closeEditor(){document.getElementById("editor").classList.remove("open");document.getElementById("editor").setAttribute("aria-hidden","true");document.getElementById("editorBackdrop").hidden=true;document.body.style.overflow=""}
function switchTab(tab){document.querySelectorAll(".tab").forEach(x=>x.classList.toggle("active",x.dataset.tab===tab));document.querySelectorAll(".tab-panel").forEach(x=>x.classList.toggle("active",x.id==="tab-"+tab))}
function collectEditor(){document.querySelectorAll("[data-key]").forEach(el=>data[el.dataset.key]=el.value);document.querySelectorAll("[data-style]").forEach(el=>data.settings[el.dataset.style]=el.value)}
function pickImage(cb){const input=document.createElement("input");input.type="file";input.accept="image/*";input.onchange=()=>{const f=input.files[0];if(f)compressImage(f,cb)};input.click()}

function pickAndStoreImage(key){
  pickImage(dataUrl=>{data[key]=dataUrl; const input=document.querySelector(`[data-key="${key}"]`); if(input) input.value=dataUrl; render(); toast('Photo added to this page ♥')});
}
function compressImage(file,cb){if(!file.type.startsWith("image/"))return toast("Please choose an image file.");const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const max=1600,s=Math.min(1,max/Math.max(im.width,im.height)),c=document.createElement("canvas");c.width=Math.round(im.width*s);c.height=Math.round(im.height*s);c.getContext("2d").drawImage(im,0,0,c.width,c.height);cb(c.toDataURL("image/jpeg",.82))};im.src=r.result};r.readAsDataURL(file)}
function closeLight(){
  const box=document.getElementById("lightbox");
  box.hidden=true;
  document.body.classList.remove("lightbox-open");
  document.body.style.overflow="";
}
function openLight(i){
  const m=data.memories[i];
  if(!m?.image)return;
  lightIndex=i;
  updateLight();
  const box=document.getElementById("lightbox");
  box.hidden=false;
  document.body.classList.add("lightbox-open");
  document.body.style.overflow="hidden";
}
function updateLight(){
  const m=data.memories[lightIndex];
  if(!m?.image){closeLight();return}
  document.getElementById("lightImg").src=m.image;
  document.getElementById("lightImg").alt=m.title||"Memory";
  document.getElementById("lightCaption").textContent=[m.date,m.title,m.caption].filter(Boolean).join(" · ");
}
function makeParticles(){if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;const p=document.getElementById("particles");setInterval(()=>{if(p.children.length>18)return;const x=document.createElement("span");x.className="particle";x.textContent=Math.random()>.5?"♥":"✦";x.style.left=Math.random()*100+"%";x.style.fontSize=10+Math.random()*15+"px";x.style.animationDuration=8+Math.random()*10+"s";p.appendChild(x);setTimeout(()=>x.remove(),19000)},900)}
document.getElementById("editBtn").onclick=()=>openEditor();document.getElementById("closeEditor").onclick=closeEditor;document.getElementById("editorBackdrop").onclick=closeEditor;
document.querySelectorAll(".tab").forEach(t=>t.onclick=()=>switchTab(t.dataset.tab));
document.getElementById("saveBtn").onclick=()=>{downloadGitHubConfig();render()};
let musicReady=false;
function tryStartMusic(){
  if(!musicReady)return;
  startBackgroundMusic();
}
document.addEventListener("pointerdown",tryStartMusic,{passive:true});
document.addEventListener("touchstart",tryStartMusic,{passive:true});
document.addEventListener("keydown",tryStartMusic,{passive:true});
document.getElementById("openHeart").onclick=()=>goToPage(1);
document.getElementById("revealBtn").onclick=()=>{document.getElementById("secret").hidden=false;document.getElementById("revealBtn").textContent="♥ A little piece of my heart";};
document.getElementById("audio").onplay=()=>document.getElementById("record").classList.add("playing");document.getElementById("audio").onpause=()=>document.getElementById("record").classList.remove("playing");
document.getElementById("addMemory").onclick=()=>{data.memories.push({date:"",title:"",caption:"",image:""});render()};
document.getElementById("addReason").onclick=()=>{data.reasons.push("Something I love about you");render()};
document.getElementById("addEvent").onclick=()=>{data.events.push({date:"",title:"A New Chapter",description:"Tell the story of this moment.",image:""});render()};
document.getElementById("backgroundMusicToggle").onchange=e=>{data.backgroundMusicEnabled=e.target.checked;if(e.target.checked)startBackgroundMusic();else document.getElementById("backgroundAudio").pause()};
document.getElementById("backgroundMusicVolume").oninput=e=>{data.backgroundMusicVolume=Number(e.target.value);document.getElementById("backgroundAudio").volume=data.backgroundMusicVolume};
['heroImage','counterImage','messageImage','storyImage','loveImage','songImage','surpriseImage'].forEach(key=>{
  const b=document.querySelector(`[data-upload="${key}"]`);
  if(b)b.onclick=()=>pickAndStoreImage(key);
});
document.getElementById("exportBtn").onclick=()=>downloadGitHubConfig();
document.getElementById("resetBtn").onclick=()=>{if(confirm("Reset the editor preview to the GitHub version?")){data=normalize(window.SITE_DATA||defaultData);render();toast("Preview reset")}};
document.getElementById("lovePreview").onclick=()=>{collectEditor();render();closeEditor();document.body.classList.add("love-mode");goToPage(0);};
document.getElementById("lightClose").onclick=e=>{e.preventDefault();e.stopPropagation();closeLight()};
document.getElementById("lightPrev").onclick=e=>{
  e.preventDefault();e.stopPropagation();
  const count=data.memories.length;
  if(!count)return closeLight();
  for(let n=0;n<count;n++){lightIndex=(lightIndex-1+count)%count;if(data.memories[lightIndex]?.image){updateLight();return}}
  closeLight();
};
document.getElementById("lightNext").onclick=e=>{
  e.preventDefault();e.stopPropagation();
  const count=data.memories.length;
  if(!count)return closeLight();
  for(let n=0;n<count;n++){lightIndex=(lightIndex+1)%count;if(data.memories[lightIndex]?.image){updateLight();return}}
  closeLight();
};
document.getElementById("lightbox").onclick=e=>{if(e.target===e.currentTarget)closeLight()};
document.addEventListener("keydown",e=>{
  const box=document.getElementById("lightbox");
  if(e.key==="Escape"){
    if(!box.hidden)closeLight();
    closeEditor();
    return;
  }
  if(!box.hidden){
    if(e.key==="ArrowLeft"){e.preventDefault();document.getElementById("lightPrev").click()}
    if(e.key==="ArrowRight"){e.preventDefault();document.getElementById("lightNext").click()}
  }
});
document.getElementById("letterText").addEventListener("input",e=>{data.letter=e.currentTarget.innerHTML});document.getElementById("signature").addEventListener("input",e=>{data.signature=e.currentTarget.innerHTML});
setInterval(updateCounter,1000);
const initialLightbox=document.getElementById("lightbox");
initialLightbox.hidden=true;
document.body.classList.remove("lightbox-open");
document.body.style.overflow="";
render();
observeReveals();
makeParticles();
musicReady=!!data.backgroundAudio;
window.addEventListener("pageshow",()=>{
  const box=document.getElementById("lightbox");
  if(box)box.hidden=true;
  document.body.classList.remove("lightbox-open");
  document.body.style.overflow="";
});

/* Page-by-page navigation: one section visible at a time. */
const pageIds = ["home","anniversary-gate","counter","continue-gate","memories","memory-game","message","story","love","song","surprise","forever"];
let currentPage = 0;
let anniversaryVerified = false;
let continueVerified = false;
function showPage(index, updateHash=true){
  currentPage = Math.max(0, Math.min(pageIds.length-1, index));
  document.querySelectorAll(".page-section").forEach((section,i)=>{
    section.classList.toggle("active-page", i===currentPage);
  });
  const prev=document.getElementById("pagePrev");
  const next=document.getElementById("pageNext");
  const num=document.getElementById("pageNumber");
  const total=document.getElementById("pageTotal");
  const label=document.getElementById("nextLabel");
  if(prev) prev.disabled=currentPage===0;
  if(next) next.disabled=currentPage===pageIds.length-1 || currentPage===3 || currentPage===5;
  if(num) num.textContent=String(currentPage+1);
  if(total) total.textContent=String(pageIds.length);
  if(label){
    label.textContent=currentPage===pageIds.length-1?"Done":(currentPage===0?"Next":(currentPage===1?"Continue":(currentPage===3?"Choose Yes":(currentPage===5?"Matching...":"Next"))));
  }
  if(updateHash) history.replaceState(null,"","#"+pageIds[currentPage]);
  const page=document.getElementById(pageIds[currentPage]);
  if(page) page.scrollTop=0;
  window.dispatchEvent(new Event("pagechange"));
}
function goToPage(index){ showPage(index,true); }
function formatAnniversaryInput(value){
  const digits=String(value||"").replace(/\D/g,"").slice(0,6);
  return digits.length>4 ? digits.slice(0,2)+"/"+digits.slice(2,4)+"/"+digits.slice(4) : digits.length>2 ? digits.slice(0,2)+"/"+digits.slice(2) : digits;
}
function anniversaryInputToISO(value){
  const digits=String(value||"").replace(/\D/g,"");
  if(digits.length!==6)return "";
  const mm=digits.slice(0,2), dd=digits.slice(2,4), yy=digits.slice(4,6), year=2000+Number(yy);
  const d=new Date(year,Number(mm)-1,Number(dd));
  if(d.getFullYear()!==year||d.getMonth()!==Number(mm)-1||d.getDate()!==Number(dd))return "";
  return `${year}-${mm}-${dd}`;
}
function checkAnniversary(){
  const input=document.getElementById("anniversaryInput"), error=document.getElementById("anniversaryError");
  const entered=anniversaryInputToISO(input?.value);
  const expected=String(data.anniversary||"2026-07-28");
  if(entered && entered===expected){ anniversaryVerified=true; if(error) error.textContent=""; goToPage(2); return true; }
  if(error) error.textContent="Not quite — think of our special date again. ♥";
  input?.classList.add("shake"); setTimeout(()=>input?.classList.remove("shake"),450); input?.focus(); return false;
}

/* ===== Memory matching game ===== */
const memoryGameImages = Array.from({length:9},(_,i)=>`assets/game-photos/${i+1}.avif`);
// 18 cards total: 9 unique memories, with each memory appearing twice.
const memoryPairs = memoryGameImages.flatMap((_,i)=>[i,i]);
let memoryDeck = [];
let memoryFlipped = [];
let memoryMatched = new Set();
let memoryBusy = false;
let memoryFinished = false;

function shuffleDeck(arr){
  const a=[...arr];
  for(let i=a.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
  return a;
}
function updateGameStatus(){
  const el=document.getElementById("gamePairsFound");
  if(el) el.textContent=String(Math.floor(memoryMatched.size/2));
}
function createMemoryGame(){
  const board=document.getElementById("memoryGame");
  if(!board)return;
  memoryDeck=shuffleDeck(memoryPairs);
  memoryFlipped=[];
  memoryMatched=new Set();
  memoryBusy=false;
  memoryFinished=false;
  const complete=document.getElementById("gameComplete");
  if(complete)complete.hidden=true;
  board.classList.remove("game-won");
  // Compact 18-card board: 6 columns × 3 rows.
  board.innerHTML=memoryDeck.map((pairId,index)=>{
    const src=memoryGameImages[pairId];
    return `<button class="memory-game-card" type="button" data-game-index="${index}" aria-label="Hidden memory card ${index+1}">
      <span class="memory-card-inner">
        <span class="memory-card-face memory-card-back" aria-hidden="true"><span>♥</span></span>
        <span class="memory-card-face memory-card-front">
          <img src="${src}" alt="Memory ${pairId+1}" loading="eager">
        </span>
      </span>
    </button>`;
  }).join("");
  board.querySelectorAll(".memory-game-card").forEach(card=>{
    card.addEventListener("click",()=>flipMemoryCard(Number(card.dataset.gameIndex)));
  });
  updateGameStatus();
}
function setCardFlipped(index, flipped){
  const card=document.querySelector(`.memory-game-card[data-game-index="${index}"]`);
  if(card)card.classList.toggle("is-flipped",flipped);
}
function setCardMatched(index){
  const card=document.querySelector(`.memory-game-card[data-game-index="${index}"]`);
  if(card)card.classList.add("is-matched");
}
function finishMemoryGame(){
  if(memoryFinished)return;
  memoryFinished=true;
  memoryBusy=true;
  document.querySelectorAll(".memory-game-card").forEach(card=>card.classList.add("is-matched","celebrate"));
  const board=document.getElementById("memoryGame");
  const complete=document.getElementById("gameComplete");
  if(board)board.classList.add("game-won");
  if(complete)complete.hidden=false;
  setTimeout(()=>goToPage(6),1900);
}
function flipMemoryCard(index){
  if(memoryBusy || memoryMatched.has(index) || memoryFlipped.includes(index))return;
  if(memoryFlipped.length>=2)return;
  memoryFlipped.push(index);
  setCardFlipped(index,true);
  if(memoryFlipped.length<2)return;

  memoryBusy=true;
  const [a,b]=memoryFlipped;
  if(memoryDeck[a]===memoryDeck[b]){
    memoryMatched.add(a); memoryMatched.add(b);
    setCardMatched(a); setCardMatched(b);
    memoryFlipped=[];
    memoryBusy=false;
    updateGameStatus();
    if(memoryMatched.size===memoryDeck.length) setTimeout(finishMemoryGame,450);
  }else{
    setTimeout(()=>{
      setCardFlipped(a,false);
      setCardFlipped(b,false);
      memoryFlipped=[];
      memoryBusy=false;
    },850);
  }
}
createMemoryGame();

document.getElementById("pagePrev").onclick=()=>goToPage(currentPage-1);
document.getElementById("pageNext").onclick=()=>{
  if(currentPage===0)return goToPage(1);
  if(currentPage===1)return checkAnniversary();
  if(currentPage===3)return;
  return goToPage(currentPage+1);
};
window.addEventListener("hashchange",()=>{
  const id=location.hash.replace("#",""); const i=pageIds.indexOf(id);
  if(i<0)return;
  if(i>1&&!anniversaryVerified){showPage(1,false);return;}
  if(i>3&&!continueVerified){showPage(3,false);return;}
  showPage(i,false);
});
const anniversaryInput=document.getElementById("anniversaryInput");
anniversaryInput?.addEventListener("input",e=>{e.target.value=formatAnniversaryInput(e.target.value);document.getElementById("anniversaryError").textContent=""});

anniversaryInput?.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();checkAnniversary()}});

const continueYes=document.getElementById("continueYes");
const continueNo=document.getElementById("continueNo");
const continueArea=document.getElementById("continueChoiceArea");

function moveNoButton(){
  if(!continueNo||!continueArea)return;
  const areaRect=continueArea.getBoundingClientRect();
  const buttonRect=continueNo.getBoundingClientRect();
  const pad=8;
  const maxX=Math.max(pad,areaRect.width-buttonRect.width-pad);
  const maxY=Math.max(pad,areaRect.height-buttonRect.height-pad);
  const x=pad+Math.random()*Math.max(0,maxX-pad);
  const y=pad+Math.random()*Math.max(0,maxY-pad);
  continueNo.style.left=`${x}px`;
  continueNo.style.top=`${y}px`;
}
["pointerenter","mouseover","touchstart","focus"].forEach(evt=>{
  continueNo?.addEventListener(evt,e=>{
    e.preventDefault();
    moveNoButton();
  },{passive:false});
});
continueNo?.addEventListener("click",e=>{e.preventDefault();moveNoButton()});
continueYes?.addEventListener("click",()=>{
  continueVerified=true;
  goToPage(4);
});
document.addEventListener("keydown",e=>{
  if(document.getElementById("editor")?.classList.contains("open")) return;
  if(!document.getElementById("lightbox")?.hidden) return;
  if(e.key==="ArrowRight" || e.key==="PageDown"){e.preventDefault();document.getElementById("pageNext")?.click()}
  if(e.key==="ArrowLeft" || e.key==="PageUp"){e.preventDefault();goToPage(currentPage-1)}
});
const startId=location.hash.replace("#","");
if(pageIds.includes(startId) && startId!=="home"){
  const startIndex=pageIds.indexOf(startId);
  if(startIndex>3 && !anniversaryVerified) showPage(1,false);
  else if(startIndex>3 && !continueVerified) showPage(3,false);
  else if(startIndex>1 && !anniversaryVerified) showPage(1,false);
  else showPage(startIndex,false);
}else showPage(0,false);
