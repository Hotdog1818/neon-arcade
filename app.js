const $ = s => document.querySelector(s);
const grid = $("#gameGrid"), modal = $("#modalBackdrop"), area = $("#gameArea");
const games = [
 {id:"trivia",title:"Trivia Blitz",desc:"Teste dein Wissen in 60 Sekunden.",category:"Quiz",tag:"WISSEN",emoji:"🧠",bg:"linear-gradient(135deg,#392064,#7b43b6)",time:"1–2 MIN",difficulty:"EASY"},
 {id:"memory",title:"Memory Mix",desc:"Finde alle passenden Kartenpaare.",category:"Puzzle",tag:"PUZZLE",emoji:"🃏",bg:"linear-gradient(135deg,#193e55,#276f8d)",time:"2–4 MIN",difficulty:"EASY"},
 {id:"words",title:"Wortsalat",desc:"Entwirre Buchstaben und knack das Wort.",category:"Puzzle",tag:"WÖRTER",emoji:"🔤",bg:"linear-gradient(135deg,#4a1d42,#a23b89)",time:"1–3 MIN",difficulty:"MEDIUM"},
 {id:"clicker",title:"Neon Clicker",desc:"Klicke schnell und knack deinen Rekord.",category:"Action",tag:"ARCADE",emoji:"👾",bg:"linear-gradient(135deg,#153f37,#248b71)",time:"10 SEK",difficulty:"EASY"},
 {id:"reaction",title:"Reflex-Rush",desc:"Warte auf Grün und reagiere blitzschnell.",category:"Action",tag:"REFLEX",emoji:"⚡",bg:"linear-gradient(135deg,#542a19,#c66d36)",time:"30 SEK",difficulty:"MEDIUM"},
 {id:"estimate",title:"Schätz mal!",desc:"Wie nah kommst du an die richtige Zahl?",category:"Quiz",tag:"SCHÄTZEN",emoji:"🎯",bg:"linear-gradient(135deg,#4b3516,#b18437)",time:"1–2 MIN",difficulty:"EASY"},
 {id:"truefalse",title:"Wahr oder Quatsch?",desc:"Stimmt das wirklich – oder ist es Fake?",category:"Quiz",tag:"WAHR / FALSCH",emoji:"⚖️",bg:"linear-gradient(135deg,#202b59,#4d64c4)",time:"1 MIN",difficulty:"EASY"}
];
let filter="Alle", currentCleanup=null, toastTimer;
const readScores=()=>{try{return JSON.parse(localStorage.getItem("neonScores")||"{}")}catch{return {}}};
const scores=readScores();
function saveScore(id,score){if(id==="reaction"){scores[id]=scores[id]?Math.min(scores[id],score):score}else{scores[id]=Math.max(scores[id]||0,score)}localStorage.setItem("neonScores",JSON.stringify(scores));renderGames()}
function renderGames(){
 const term=$("#searchInput").value.trim().toLocaleLowerCase("de");
 const list=games.filter(g=>(filter==="Alle"||g.category===filter)&&(`${g.title} ${g.desc} ${g.tag}`).toLocaleLowerCase("de").includes(term));
 grid.innerHTML=list.length?list.map(g=>`<button class="game-card" data-game="${g.id}" type="button"><div class="game-art" style="--artbg:${g.bg}"><span class="game-badge">${g.tag}</span><span class="game-emoji">${g.emoji}</span><span class="game-arrow">↗</span></div><h3>${g.title}</h3><p>${g.desc}</p><div class="card-meta"><span>◷ ${g.time}</span><strong>${scores[g.id]?`BEST ${scores[g.id]}`:g.difficulty}</strong></div></button>`).join(""):`<div class="empty-state">Kein Spiel gefunden. Versuch einen anderen Suchbegriff.</div>`;
 grid.querySelectorAll("[data-game]").forEach(b=>b.addEventListener("click",()=>openGame(b.dataset.game)));
}
function notify(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove("show"),2200)}
function cleanup(){if(currentCleanup){currentCleanup();currentCleanup=null}}
function openGame(id){
 cleanup();const g=games.find(x=>x.id===id);$("#modalTitle").textContent=g.title;$("#modalCategory").textContent=`${g.tag} · KOSTENLOS`;modal.classList.remove("hidden");document.body.style.overflow="hidden";
 ({trivia:playTrivia,memory:playMemory,words:playWords,clicker:playClicker,reaction:playReaction,estimate:playEstimate,truefalse:playTrueFalse})[id]();
}
function closeGame(){cleanup();modal.classList.add("hidden");document.body.style.overflow="";area.innerHTML=""}
$("#closeModal").addEventListener("click",closeGame);modal.addEventListener("click",e=>{if(e.target===modal)closeGame()});document.addEventListener("keydown",e=>{if(e.key==="Escape")closeGame()});
function shuffle(a){return [...a].sort(()=>Math.random()-.5)}
function playTrivia(){
 let qs=shuffle(window.GAME_CONTENT.trivia).slice(0,5),i=0,score=0,locked=false;
 function draw(){if(i>=qs.length){area.innerHTML=`<div class="game-panel"><div class="eyebrow">RUNDE BEENDET</div><div class="big-number">${score} / ${qs.length}</div><p class="game-question">${score===qs.length?"Perfekt! Du bist eine Quiz-Legende.":"Gut gespielt! Noch eine Runde?"}</p><button class="primary-button" id="again">Nochmal spielen ↻</button></div>`;saveScore("trivia",score);$("#again").onclick=playTrivia;return}
 const q=qs[i];locked=false;area.innerHTML=`<div class="game-panel"><div class="card-meta"><span>FRAGE ${i+1} / ${qs.length}</span><strong>PUNKTE ${score}</strong></div><p class="game-question" style="margin-top:20px">${q.q}</p><div class="answer-list">${q.a.map((a,n)=>`<button class="answer-button" data-answer="${n}">${a}</button>`).join("")}</div><p class="game-status" id="status">Wähle eine Antwort.</p><div class="game-controls"><button class="secondary-button" id="next" disabled>Weiter →</button></div></div>`;
 area.querySelectorAll("[data-answer]").forEach(b=>b.onclick=()=>{if(locked)return;locked=true;let ok=Number(b.dataset.answer)===q.correct;if(ok)score++;area.querySelectorAll("[data-answer]").forEach(x=>{x.disabled=true;if(Number(x.dataset.answer)===q.correct)x.classList.add("correct")});if(!ok)b.classList.add("wrong");$("#status").textContent=(ok?"Richtig! ":"Leider nicht. ")+q.why;$("#next").disabled=false;$("#next").onclick=()=>{i++;draw()}})}
 draw();
}
function playTrueFalse(){
 let qs=shuffle(window.GAME_CONTENT.truefalse).slice(0,5),i=0,score=0,locked=false;
 function draw(){if(i>=qs.length){area.innerHTML=`<div class="game-panel"><div class="eyebrow">DEIN ERGEBNIS</div><div class="big-number">${score} / ${qs.length}</div><button class="primary-button" id="again">Nochmal spielen ↻</button></div>`;saveScore("truefalse",score);$("#again").onclick=playTrueFalse;return}
 let q=qs[i];locked=false;area.innerHTML=`<div class="game-panel"><div class="card-meta"><span>AUSSAGE ${i+1} / ${qs.length}</span><strong>${score} PUNKTE</strong></div><p class="game-question" style="margin-top:22px">${q.q}</p><div class="answer-list"><button class="answer-button" data-v="true">✓ Wahr</button><button class="answer-button" data-v="false">✕ Falsch</button></div><p class="game-status" id="status">Was meinst du?</p><div class="game-controls"><button class="secondary-button" id="next" disabled>Weiter →</button></div></div>`;
 area.querySelectorAll("[data-v]").forEach(b=>b.onclick=()=>{if(locked)return;locked=true;const ok=(b.dataset.v==="true")===q.correct;if(ok)score++;area.querySelectorAll("[data-v]").forEach(x=>{x.disabled=true;if((x.dataset.v==="true")===q.correct)x.classList.add("correct")});if(!ok)b.classList.add("wrong");$("#status").textContent=(ok?"Richtig! ":"Nicht ganz. ")+q.why;$("#next").disabled=false;$("#next").onclick=()=>{i++;draw()}})}
 draw();
}
function playEstimate(){
 let qs=shuffle(window.GAME_CONTENT.estimates).slice(0,5),i=0,score=0;
 function draw(){if(i>=qs.length){area.innerHTML=`<div class="game-panel"><div class="eyebrow">DEIN ERGEBNIS</div><div class="big-number">${score} / ${qs.length}</div><p class="game-status">Punkte gibt's für Schätzungen in der Nähe des Zielwerts.</p><button class="primary-button" id="again">Nochmal schätzen ↻</button></div>`;saveScore("estimate",score);$("#again").onclick=playEstimate;return}
 let q=qs[i];area.innerHTML=`<div class="game-panel"><div class="card-meta"><span>SCHÄTZFRAGE ${i+1} / ${qs.length}</span><strong>${score} PUNKTE</strong></div><p class="game-question" style="margin-top:20px">${q.q}</p><form id="estimateForm"><input class="text-input" id="guess" type="number" min="0" step="1" required placeholder="Deine Schätzung in ${q.unit}"><div class="game-controls"><button class="primary-button" type="submit">Antwort prüfen ↗</button></div></form><p class="game-status" id="status"></p></div>`;
 $("#estimateForm").onsubmit=e=>{e.preventDefault();let val=Number($("#guess").value),delta=Math.abs(val-q.answer);if(delta<=q.tolerance)score++;$("#status").textContent=`Richtige Antwort: ${q.answer.toLocaleString("de-CH")} ${q.unit}. ${delta<=q.tolerance?"Sehr gut geschätzt!":"Abstand: "+delta.toLocaleString("de-CH")+" "+q.unit+"."}`;area.querySelector("form").innerHTML=`<button class="primary-button" type="button" id="next">Weiter →</button>`;$("#next").onclick=()=>{i++;draw()}}}
 draw();
}
function playWords(){
 let qs=shuffle(window.GAME_CONTENT.words),i=0,score=0;
 function draw(){if(i>=qs.length){area.innerHTML=`<div class="game-panel"><div class="big-number">${score} / ${qs.length}</div><button class="primary-button" id="again">Nochmal rätseln ↻</button></div>`;saveScore("words",score);$("#again").onclick=playWords;return}
 const q=qs[i],scrambled=shuffle([...q.word]);area.innerHTML=`<div class="game-panel"><div class="card-meta"><span>WORT ${i+1} / ${qs.length}</span><strong>${score} PUNKTE</strong></div><div class="big-number" style="letter-spacing:.13em;font-size:clamp(26px,7vw,39px)">${scrambled.join("")}</div><p class="game-status" style="margin-bottom:15px">Tipp: ${q.hint}</p><form id="wordForm"><input class="text-input" id="wordGuess" required autocomplete="off" placeholder="Wort eingeben…"><div class="game-controls"><button class="primary-button" type="submit">Prüfen ↗</button><button class="secondary-button" type="button" id="reveal">Lösung</button></div></form><p class="game-status" id="status"></p></div>`;
 let done=false;function finish(correct,show=false){if(done)return;done=true;if(correct)score++;$("#status").textContent=correct?"Richtig! 🎉":`Gesucht war: ${q.word}`;$("#wordForm").innerHTML=`<button class="primary-button" type="button" id="next">Weiter →</button>`;$("#next").onclick=()=>{i++;draw()}}
 $("#wordForm").onsubmit=e=>{e.preventDefault();finish($("#wordGuess").value.trim().toLocaleUpperCase("de")===q.word)};$("#reveal").onclick=()=>finish(false,true)}
 draw();
}
function playMemory(){
 const symbols=shuffle(["🌙","🚀","👾","💎","🎧","🪐","⚡","🧩"].flatMap((x,i)=>[{x,id:i},{x,id:i}]));
 let opened=[],matched=new Set(),moves=0,lock=false;
 area.innerHTML=`<div class="game-panel"><div class="card-meta"><span>FINDE 8 PAARE</span><strong id="moves">ZÜGE 0</strong></div><p class="game-status" style="margin:12px 0">Tippe zwei Karten an, um gleiche Symbole zu finden.</p><div class="memory-grid">${symbols.map((s,i)=>`<button class="memory-card" data-i="${i}" aria-label="Verdeckte Karte">${i+1}</button>`).join("")}</div><p class="game-status" id="status"></p><div class="game-controls"><button class="secondary-button" id="restart">Neu mischen ↻</button></div></div>`;
 const cards=[...area.querySelectorAll("[data-i]")];
 function reset(){cleanup();playMemory()}
 cards.forEach((b,i)=>b.onclick=()=>{if(lock||matched.has(i)||opened.includes(i))return;b.classList.add("revealed");b.textContent=symbols[i].x;b.setAttribute("aria-label",symbols[i].x);opened.push(i);if(opened.length===2){moves++;$("#moves").textContent="ZÜGE "+moves;if(symbols[opened[0]].id===symbols[opened[1]].id){opened.forEach(n=>{matched.add(n);cards[n].classList.add("matched")});opened=[];if(matched.size===symbols.length){$("#status").textContent=`Geschafft in ${moves} Zügen!`;saveScore("memory",Math.max(0,100-moves));$("#restart").textContent="Nochmal spielen ↻"}}else{lock=true;const pair=[...opened];const timer=setTimeout(()=>{pair.forEach(n=>{cards[n].classList.remove("revealed");cards[n].textContent=n+1;cards[n].setAttribute("aria-label","Verdeckte Karte")});opened=[];lock=false},700);currentCleanup=()=>clearTimeout(timer)}}});
 $("#restart").onclick=reset;
}
function playClicker(){
 let count=0,left=10,active=true,interval;area.innerHTML=`<div class="game-panel"><div class="card-meta"><span>10-SEKUNDEN-CHALLENGE</span><strong>BEST ${scores.clicker||0}</strong></div><div class="big-number" id="clickCount">0</div><button class="reaction-pad" id="clickPad">TIPPEN / KLICKEN!</button><p class="game-status" id="status">Drücke Start und klicke so schnell du kannst.</p><div class="game-controls"><button class="primary-button" id="start">Start ↗</button></div></div>`;
 const pad=$("#clickPad");pad.disabled=true;$("#start").onclick=()=>{count=0;left=10;active=true;pad.disabled=false;$("#start").disabled=true;$("#status").textContent="Los geht's!";interval=setInterval(()=>{left--;$("#status").textContent=`Noch ${left} Sekunden!`;if(left<=0){clearInterval(interval);active=false;pad.disabled=true;$("#start").disabled=false;$("#start").textContent="Nochmal ↻";$("#status").textContent=`Zeit vorbei! Du hast ${count} Klicks geschafft.`;saveScore("clicker",count)}},1000)};pad.onclick=()=>{if(active){count++;$("#clickCount").textContent=count}};currentCleanup=()=>clearInterval(interval);
}
function playReaction(){
 area.innerHTML=`<div class="game-panel"><div class="card-meta"><span>REFLEX-TEST</span><strong>BEST ${scores.reaction? scores.reaction+" MS":"—"}</strong></div><p class="game-status" style="margin:14px 0">Drücke Start. Warte, bis die Fläche grün wird, und tippe dann sofort.</p><button class="reaction-pad" id="reactionPad">Bereit?</button><div class="game-controls"><button class="primary-button" id="reactionStart">Start ↗</button></div><p class="game-status" id="reactionStatus"></p></div>`;
 let phase="idle",startTime=0,timer,timeout;const pad=$("#reactionPad");
 $("#reactionStart").onclick=()=>{clearTimeout(timer);clearTimeout(timeout);phase="wait";pad.className="reaction-pad waiting";pad.textContent="Warte auf GRÜN …";$("#reactionStatus").textContent="Nicht zu früh drücken!";$("#reactionStart").disabled=true;timer=setTimeout(()=>{phase="go";startTime=performance.now();pad.className="reaction-pad go";pad.textContent="JETZT!";},1000+Math.random()*3500)};
 pad.onclick=()=>{if(phase==="wait"){phase="idle";clearTimeout(timer);pad.className="reaction-pad";pad.textContent="Zu früh!";$("#reactionStatus").textContent="Nochmal versuchen.";$("#reactionStart").disabled=false}else if(phase==="go"){let ms=Math.round(performance.now()-startTime);phase="done";pad.className="reaction-pad";pad.textContent=ms+" ms";$("#reactionStatus").textContent=ms<220?"Blitzschnell!":ms<320?"Gute Reflexe!":"Da geht noch was!";saveScore("reaction",ms);$("#reactionStart").disabled=false;$("#reactionStart").textContent="Nochmal ↻"}};
 currentCleanup=()=>{clearTimeout(timer);clearTimeout(timeout)};
}
$("#searchInput").addEventListener("input",renderGames);
$("#filters").querySelectorAll("[data-filter]").forEach(b=>b.addEventListener("click",()=>{filter=b.dataset.filter;$("#filters").querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===b));renderGames()}));
$("#randomGame").onclick=()=>openGame(games[Math.floor(Math.random()*games.length)].id);
$("#dailyBtn").onclick=()=>{document.querySelector("#dailyChallenge").scrollIntoView({behavior:"smooth",block:"center"});notify("Deine Mission: Spiele heute mindestens ein Game! ✦")};
renderGames();
