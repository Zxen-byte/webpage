const KEY="valentine-love-letter-v1";
const defaultData={
heroTitle:"Happy Valentine's Day ♥",heroTo:"To My Favorite Person",heroSubtitle:"Every moment with you is a memory I never want to forget.",
name:"[Your Name]",letter:`<p><em>My love,</em></p><p>I don't always know how to put my feelings into words, but I want you to know how grateful I am to have you in my life. Somehow, ordinary days became my favorite days simply because you were there.</p><p>Thank you for every laugh, every quiet moment, every memory, and every little way you make life feel warmer.</p><p>I choose you, again and again.</p>`,signature:"Forever yours,<br><b>[Your Name] ♥</b>",
secret:"You are one of the best things that ever happened to me. No matter where life takes us, I hope we keep choosing each other.",
songText:"This song always reminds me of you.",songLink:"",metDate:"2024-06-14T19:00",anniversary:"",
finalMessage:"If I could choose one person to make memories with over and over again, I would choose you every single time.",
heroImage:"",audio:"",settings:{primary:"#8b1e3f",background:"#fff9f5",text:"#34272b",heading:"Georgia,serif",body:"'Trebuchet MS',sans-serif",mood:"petals"},
memories:[],reasons:["Your smile","Your laugh","The way you care about people","The way you make ordinary days special"],
events:[
 {date:"2023",title:"The Beginning",description:"Somehow, two people met and started a story neither of us expected.",image:""},
 {date:"2024",title:"Our Favorite Memories",description:"Every day with you became another reason to smile.",image:""}
]};
let data=load(); let lightIndex=0; let draft;

function load(){try{const x=JSON.parse(localStorage.getItem(KEY));return x?normalize(x):structuredClone(defaultData)}catch{return structuredClone(defaultData)}}
function normalize(x){return {...structuredClone(defaultData),...x,settings:{...defaultData.settings,...(x.settings||{})},memories:Array.isArray(x.memories)?x.memories:[],reasons:Array.isArray(x.reasons)?x.reasons:defaultData.reasons,events:Array.isArray(x.events)?x.events:defaultData.events}}
function save(){localStorage.setItem(KEY,JSON.stringify(data));toast("Saved with love ♥")}
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
 renderGallery();renderTimeline();renderReasons();renderEditorLists();updateCounter();renderAudio();
 document.querySelectorAll("[data-style]").forEach(el=>el.value=data.settings[el.dataset.style]||"");
}
function setImage(id,src,placeholder){const im=document.getElementById(id),ph=document.getElementById(placeholder);if(src){im.src=src;im.hidden=false;ph.hidden=true}else{im.hidden=true;ph.hidden=false}}
function renderGallery(){
 const g=document.getElementById("gallery");
 if(!data.memories.length){g.innerHTML=`<div class="empty" style="column-span:all;text-align:center;padding:70px;background:#fff;border:1px dashed var(--line);border-radius:24px"><h3 style="font-family:var(--heading);font-size:34px;color:var(--primary2)">Your memories will live here ♥</h3><p class="muted">Start adding your favorite moments together.</p><button class="primary-btn" onclick="openEditor('memoriesTab')">Add Your First Photo</button></div>`;return}
 g.innerHTML=data.memories.map((m,i)=>`<article class="memory-card" data-i="${i}">${m.image?`<img loading="lazy" src="${m.image}" alt="${esc(m.title||"Memory")}">`:`<div class="photo-placeholder" style="height:220px"><span>♡</span></div>`}<div class="memory-info"><small>${esc(m.date||"A beautiful day")}</small><h3>${esc(m.title||"A favorite memory")}</h3><p>${esc(m.caption||"A moment worth keeping forever.")}</p></div></article>`).join("");
 g.querySelectorAll(".memory-card").forEach(c=>c.onclick=()=>openLight(+c.dataset.i));
}
function renderTimeline(){document.getElementById("timeline").innerHTML=data.events.map(e=>`<article class="event reveal"><time>${esc(e.date)}</time><h3>${esc(e.title)}</h3><p>${esc(e.description)}</p>${e.image?`<img src="${e.image}" alt="">`:""}</article>`).join("");observeReveals()}
function renderReasons(){document.getElementById("reasons").innerHTML=data.reasons.map(r=>`<div class="reason reveal"><span>${esc(r)} ♥</span></div>`).join("");observeReveals()}
function renderEditorLists(){
 document.getElementById("memoryEditorList").innerHTML=data.memories.map((m,i)=>`<div class="edit-item"><strong>Memory ${i+1}</strong><input data-m="${i}" data-field="date" placeholder="Date" value="${esc(m.date)}"><input data-m="${i}" data-field="title" placeholder="Title" value="${esc(m.title)}"><textarea data-m="${i}" data-field="caption" placeholder="Caption">${esc(m.caption)}</textarea><div class="edit-row"><button class="secondary-btn replace-memory" data-i="${i}">Replace photo</button><button class="mini-danger delete-memory" data-i="${i}">Delete</button></div></div>`).join("");
 document.getElementById("reasonEditorList").innerHTML=data.reasons.map((r,i)=>`<div class="edit-item"><input data-r="${i}" value="${esc(r)}"><button class="mini-danger delete-reason" data-i="${i}">Delete</button></div>`).join("");
 document.getElementById("eventEditorList").innerHTML=data.events.map((e,i)=>`<div class="edit-item"><strong>Story ${i+1}</strong><input data-e="${i}" data-field="date" placeholder="Date" value="${esc(e.date)}"><input data-e="${i}" data-field="title" placeholder="Title" value="${esc(e.title)}"><textarea data-e="${i}" data-field="description" placeholder="Description">${esc(e.description)}</textarea><button class="mini-danger delete-event" data-i="${i}">Delete</button></div>`).join("");
 document.querySelectorAll("[data-m]").forEach(x=>x.oninput=()=>{data.memories[x.dataset.m][x.dataset.field]=x.value;renderGallery()});
 document.querySelectorAll("[data-r]").forEach(x=>x.oninput=()=>{data.reasons[x.dataset.r]=x.value;renderReasons()});
 document.querySelectorAll("[data-e]").forEach(x=>x.oninput=()=>{data.events[x.dataset.e][x.dataset.field]=x.value;renderTimeline()});
 document.querySelectorAll(".delete-memory").forEach(b=>b.onclick=()=>{data.memories.splice(+b.dataset.i,1);render()});
 document.querySelectorAll(".delete-reason").forEach(b=>b.onclick=()=>{data.reasons.splice(+b.dataset.i,1);render()});
 document.querySelectorAll(".delete-event").forEach(b=>b.onclick=()=>{data.events.splice(+b.dataset.i,1);render()});
 document.querySelectorAll(".replace-memory").forEach(b=>b.onclick=()=>pickImage(img=>{data.memories[+b.dataset.i].image=img;render()}));
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
function observeReveals(){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");io.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll(".reveal:not(.visible)").forEach(x=>io.observe(x))}
function openEditor(tab="content"){draft=structuredClone(data);document.getElementById("editor").classList.add("open");document.getElementById("editor").setAttribute("aria-hidden","false");document.getElementById("editorBackdrop").hidden=false;switchTab(tab);document.body.style.overflow="hidden"}
function closeEditor(){document.getElementById("editor").classList.remove("open");document.getElementById("editor").setAttribute("aria-hidden","true");document.getElementById("editorBackdrop").hidden=true;document.body.style.overflow=""}
function switchTab(tab){document.querySelectorAll(".tab").forEach(x=>x.classList.toggle("active",x.dataset.tab===tab));document.querySelectorAll(".tab-panel").forEach(x=>x.classList.toggle("active",x.id==="tab-"+tab))}
function collectEditor(){document.querySelectorAll("[data-key]").forEach(el=>data[el.dataset.key]=el.value);document.querySelectorAll("[data-style]").forEach(el=>data.settings[el.dataset.style]=el.value)}
function pickImage(cb){const input=document.createElement("input");input.type="file";input.accept="image/*";input.onchange=()=>{const f=input.files[0];if(f)compressImage(f,cb)};input.click()}
function compressImage(file,cb){if(!file.type.startsWith("image/"))return toast("Please choose an image file.");const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const max=1600,s=Math.min(1,max/Math.max(im.width,im.height)),c=document.createElement("canvas");c.width=Math.round(im.width*s);c.height=Math.round(im.height*s);c.getContext("2d").drawImage(im,0,0,c.width,c.height);cb(c.toDataURL("image/jpeg",.82))};im.src=r.result};r.readAsDataURL(file)}
function openLight(i){if(!data.memories[i]?.image)return;lightIndex=i;updateLight();document.getElementById("lightbox").hidden=false}
function updateLight(){const m=data.memories[lightIndex];document.getElementById("lightImg").src=m.image;document.getElementById("lightImg").alt=m.title||"Memory";document.getElementById("lightCaption").textContent=[m.date,m.title,m.caption].filter(Boolean).join(" · ")}
function makeParticles(){if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;const p=document.getElementById("particles");setInterval(()=>{if(p.children.length>18)return;const x=document.createElement("span");x.className="particle";x.textContent=Math.random()>.5?"♥":"✦";x.style.left=Math.random()*100+"%";x.style.fontSize=10+Math.random()*15+"px";x.style.animationDuration=8+Math.random()*10+"s";p.appendChild(x);setTimeout(()=>x.remove(),19000)},900)}
document.getElementById("editBtn").onclick=()=>openEditor();document.getElementById("footerEdit").onclick=()=>openEditor();document.getElementById("closeEditor").onclick=closeEditor;document.getElementById("editorBackdrop").onclick=closeEditor;
document.querySelectorAll(".tab").forEach(t=>t.onclick=()=>switchTab(t.dataset.tab));
document.getElementById("saveBtn").onclick=()=>{collectEditor();save();render();closeEditor()};
document.getElementById("openHeart").onclick=()=>{document.getElementById("memories").scrollIntoView({behavior:"smooth"});for(let i=0;i<10;i++)setTimeout(()=>{const h=document.createElement("span");h.className="particle";h.textContent="♥";h.style.left=(45+Math.random()*10)+"%";h.style.animationDuration="3s";document.getElementById("particles").appendChild(h);setTimeout(()=>h.remove(),3000)},i*80)};
document.getElementById("revealBtn").onclick=()=>{document.getElementById("secret").hidden=false;document.getElementById("revealBtn").textContent="♥ A little piece of my heart";};
document.getElementById("audio").onplay=()=>document.getElementById("record").classList.add("playing");document.getElementById("audio").onpause=()=>document.getElementById("record").classList.remove("playing");
document.getElementById("addMemory").onclick=()=>{data.memories.push({date:"",title:"",caption:"",image:""});render()};
document.getElementById("addReason").onclick=()=>{data.reasons.push("Something I love about you");render()};
document.getElementById("addEvent").onclick=()=>{data.events.push({date:"",title:"A New Chapter",description:"Tell the story of this moment.",image:""});render()};
document.getElementById("photoUpload").onchange=e=>[...e.target.files].forEach(f=>compressImage(f,img=>{data.memories.push({date:"",title:"A favorite moment",caption:"",image:img});render()}));
document.getElementById("heroUpload").onchange=e=>{const f=e.target.files[0];if(f)compressImage(f,img=>{data.heroImage=img;render()})};
document.getElementById("audioUpload").onchange=e=>{const f=e.target.files[0];if(f){const r=new FileReader();r.onload=()=>{data.audio=r.result;render();toast("Song added ♥")};r.readAsDataURL(f)}};
document.getElementById("exportBtn").onclick=()=>{collectEditor();const blob=new Blob([JSON.stringify(data)],{type:"application/json"}),a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="my-valentines-page.json";a.click();URL.revokeObjectURL(a.href);toast("Backup exported")};
document.getElementById("importBtn").onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const x=JSON.parse(r.result);if(!x || typeof x!=="object" || !Array.isArray(x.memories))throw Error();if(!confirm("Import this Valentine's page? Your current saved content will be replaced."))return;data=normalize(x);save();render();toast("Imported successfully ♥")}catch{toast("That backup file could not be imported.")}};r.readAsText(f)};
document.getElementById("resetBtn").onclick=()=>{if(confirm("Are you sure you want to reset your Valentine's page? This will remove your saved content.")){data=structuredClone(defaultData);save();render();toast("Page reset")}};
document.getElementById("lovePreview").onclick=()=>{collectEditor();save();closeEditor();document.body.classList.add("love-mode");window.scrollTo({top:0,behavior:"smooth"});};
document.getElementById("menuBtn").onclick=()=>{const n=document.getElementById("nav");n.classList.toggle("open");document.getElementById("menuBtn").setAttribute("aria-expanded",n.classList.contains("open"))};
document.querySelectorAll(".nav a").forEach(a=>a.onclick=()=>document.getElementById("nav").classList.remove("open"));
document.getElementById("lightClose").onclick=()=>document.getElementById("lightbox").hidden=true;document.getElementById("lightPrev").onclick=()=>{lightIndex=(lightIndex-1+data.memories.length)%data.memories.length;while(!data.memories[lightIndex]?.image)lightIndex=(lightIndex-1+data.memories.length)%data.memories.length;updateLight()};document.getElementById("lightNext").onclick=()=>{lightIndex=(lightIndex+1)%data.memories.length;while(!data.memories[lightIndex]?.image)lightIndex=(lightIndex+1)%data.memories.length;updateLight()};
document.addEventListener("keydown",e=>{if(e.key==="Escape"){document.getElementById("lightbox").hidden=true;closeEditor()}if(!document.getElementById("lightbox").hidden){if(e.key==="ArrowLeft")document.getElementById("lightPrev").click();if(e.key==="ArrowRight")document.getElementById("lightNext").click()}});
document.getElementById("letterText").addEventListener("input",e=>{data.letter=e.currentTarget.innerHTML});document.getElementById("signature").addEventListener("input",e=>{data.signature=e.currentTarget.innerHTML});
function updateHeaderTheme(){
 const header=document.querySelector(".site-header");
 if(!header)return;
 const darkSections=document.querySelectorAll(".song-section,.ending");
 let dark=false;
 darkSections.forEach(sec=>{
   const r=sec.getBoundingClientRect();
   if(r.top<=90 && r.bottom>=90) dark=true;
 });
 header.classList.toggle("dark",dark);
 header.classList.toggle("light",!dark);
}
window.addEventListener("scroll",updateHeaderTheme,{passive:true});
window.addEventListener("resize",updateHeaderTheme);
setInterval(updateCounter,1000);render();observeReveals();makeParticles();updateHeaderTheme();
