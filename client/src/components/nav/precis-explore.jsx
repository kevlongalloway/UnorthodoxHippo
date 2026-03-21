import { useState, useEffect, useRef, useCallback } from "react";

const THEMES={
  twilight:{id:"twilight",name:"Twilight Ink",icon:"\u263E",
    bg:"#161D2E",bg2:"#1C2438",bg3:"#232D44",card:"#1A2236",cardHover:"#1E2840",
    border:"rgba(212,168,85,0.09)",borderHover:"rgba(212,168,85,0.18)",
    gold:"#D4A855",goldDim:"rgba(212,168,85,0.45)",goldGlow:"rgba(212,168,85,0.08)",
    accent:"#C47232",accentHover:"#D4832F",
    ink:"#E8E2D6",ink2:"#C8C0B0",ink3:"#8A8474",ink4:"#6C685C",
    green:"#6A9A60",red:"#C45A4A",blue:"#5A8AB4",plum:"#9A70A0",teal:"#4EA8A0",rose:"#C47A8A",amber:"#D4A040",
    serif:"'Playfair Display',Georgia,serif",body:"'Source Serif 4',Georgia,serif",sans:"'DM Sans',system-ui,sans-serif"},
  parchment:{id:"parchment",name:"Warm Parchment",icon:"\u2600",
    bg:"#F7F3EC",bg2:"#EFEBE3",bg3:"#E7E1D6",card:"#FFFDF8",cardHover:"#FEFBF4",
    border:"rgba(180,160,120,0.2)",borderHover:"rgba(180,160,120,0.35)",
    gold:"#B68409",goldDim:"rgba(184,134,11,0.5)",goldGlow:"rgba(184,134,11,0.06)",
    accent:"#B85A32",accentHover:"#D06838",
    ink:"#2C2418",ink2:"#3D3226",ink3:"#7A6E5E",ink4:"#978B77",
    green:"#5A7A4A",red:"#A0422E",blue:"#4A6A8A",plum:"#7A5070",teal:"#3A8A7A",rose:"#A0506A",amber:"#C4851C",
    serif:"'Playfair Display',Georgia,serif",body:"'Source Serif 4',Georgia,serif",sans:"'DM Sans',system-ui,sans-serif"},
  stone:{id:"stone",name:"Stone & Sage",icon:"\u25D2",
    bg:"#EDEBE6",bg2:"#E2DFD8",bg3:"#D6D2CA",card:"#F5F3EE",cardHover:"#F0EDE6",
    border:"rgba(140,130,110,0.22)",borderHover:"rgba(140,130,110,0.38)",
    gold:"#8A7A4A",goldDim:"rgba(138,122,74,0.5)",goldGlow:"rgba(138,122,74,0.07)",
    accent:"#B05A3A",accentHover:"#C86842",
    ink:"#2A2A24",ink2:"#3E3E36",ink3:"#72706A",ink4:"#8B877D",
    green:"#4A7A56",red:"#A0493A",blue:"#506A80",plum:"#7A5A6A",teal:"#3A8878",rose:"#8A5060",amber:"#B87A30",
    serif:"'Playfair Display',Georgia,serif",body:"'Source Serif 4',Georgia,serif",sans:"'DM Sans',system-ui,sans-serif"},
  editorial:{id:"editorial",name:"Editorial Mono",icon:"\u25A0",
    bg:"#FAF9F7",bg2:"#F2F0EC",bg3:"#E8E6E0",card:"#FFFFFF",cardHover:"#FCFBF9",
    border:"rgba(120,110,100,0.15)",borderHover:"rgba(120,110,100,0.28)",
    gold:"#1A1A1A",goldDim:"rgba(26,26,26,0.45)",goldGlow:"rgba(0,0,0,0.03)",
    accent:"#C44A20",accentHover:"#D85828",
    ink:"#1A1A1A",ink2:"#2E2E2E",ink3:"#6A6A6A",ink4:"#909090",
    green:"#2A6A4A",red:"#C44A20",blue:"#2A4A7A",plum:"#6A3A6A",teal:"#2A7A6A",rose:"#8A3A5A",amber:"#B87A20",
    serif:"'Playfair Display',Georgia,serif",body:"'Source Serif 4',Georgia,serif",sans:"'DM Sans',system-ui,sans-serif"},
};
const THEME_ORDER=["twilight","parchment","stone","editorial"];
const THEME_DEFAULT="twilight";
function useTheme(){const[tid,setTid]=useState(THEME_DEFAULT);return{theme:THEMES[tid],tid,setTid};}
let T=THEMES[THEME_DEFAULT];
const LENSES={analyst:{icon:"\uD83D\uDD2C",label:"Analyst",color:"#5B9BD5"},empath:{icon:"\uD83D\uDC96",label:"Empath",color:"#D4788C"},philosopher:{icon:"\uD83D\uDCA1",label:"Philosopher",color:"#D4A855"},storyteller:{icon:"\uD83C\uDFAD",label:"Storyteller",color:"#9B7ED4"},explorer:{icon:"\uD83D\uDDFA\uFE0F",label:"Explorer",color:"#5BAD7A"},alchemist:{icon:"\u2727",label:"Alchemist",color:"#C4A06A"}};
const TIERS=[{name:"Fresh Ink",min:0,color:"#8A8474",bg:"rgba(122,112,103,0.1)"},{name:"Wet Ink",min:25,color:"#8BAAB8",bg:"rgba(139,170,184,0.1)"},{name:"Set Ink",min:100,color:"#A0C090",bg:"rgba(160,192,144,0.1)"},{name:"Deep Ink",min:500,color:"#D4A855",bg:"rgba(196,162,101,0.1)"},{name:"Indelible",min:2000,color:"#C47232",bg:"rgba(184,86,42,0.12)"}];
const getTier=ink=>TIERS.slice().reverse().find(t=>ink>=t.min)||TIERS[0];
function Av({i,ink=0,s=30}){const t=getTier(ink);return <div style={{width:s,height:s,borderRadius:"50%",background:`linear-gradient(135deg,${t.color}30,${T.bg2})`,border:`1.5px solid ${t.color}25`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:T.sans,fontSize:s*.35,fontWeight:700,color:t.color,flexShrink:0}}>{i}</div>;}
function IB({ink}){const t=getTier(ink);return <span style={{display:"inline-flex",alignItems:"center",gap:3,padding:"2px 7px",borderRadius:5,fontSize:9,fontWeight:700,fontFamily:T.sans,color:t.color,background:`${t.color}12`}}>{t.name}</span>;}
function Badge({lens}){const l=LENSES[lens];if(!l)return null;return <span style={{display:"inline-flex",alignItems:"center",gap:2,padding:"2px 7px",borderRadius:5,fontSize:9,fontWeight:600,fontFamily:T.sans,color:l.color,background:`${l.color}0A`}}>{l.icon} {l.label}</span>;}

// ═══ READER DATA WITH MAP COORDS ═══
// mapX/mapY: percentage position on world map (0-100)
// Local readers (nearby) cluster around center, friends spread globally
const ALL_READERS=[
  // Nearby (public + some friends)
  {id:"n1",name:"Elena Voss",handle:"@elenareads",initials:"EV",ink:560,lens:"empath",distance:"0.8 mi",currentBook:"Beloved",bookAuthor:"Toni Morrison",bookPct:63,lastActive:"12m ago",mutuals:2,bio:"Reading as an act of feeling.",isFriend:true,mapX:50.8,mapY:46.2,city:"West Palm Beach"},
  {id:"n2",name:"Kai Nakamura",handle:"@kailens",initials:"KN",ink:2400,lens:"analyst",distance:"1.2 mi",currentBook:"Intermezzo",bookAuthor:"Sally Rooney",bookPct:22,lastActive:"3h ago",mutuals:5,bio:"Structure is story.",isFriend:true,mapX:51.4,mapY:45.8,city:"Lake Worth"},
  {id:"n3",name:"Amara Okafor",handle:"@amarawrites",initials:"AO",ink:380,lens:"storyteller",distance:"2.1 mi",currentBook:"Demon Copperhead",bookAuthor:"Barbara Kingsolver",bookPct:56,lastActive:"1h ago",mutuals:0,bio:"Every sentence is a door.",isFriend:false,mapX:49.6,mapY:46.6,city:"Boynton Beach"},
  {id:"n4",name:"Leo Pacheco",handle:"@leopreads",initials:"LP",ink:1100,lens:"philosopher",distance:"3.4 mi",currentBook:"Beloved",bookAuthor:"Toni Morrison",bookPct:89,lastActive:"Just now",mutuals:3,bio:"What question does this book refuse to answer?",isFriend:true,mapX:52.1,mapY:47.1,city:"Riviera Beach"},
  {id:"n5",name:"Mira Johal",handle:"@mirajohal",initials:"MJ",ink:150,lens:"explorer",distance:"4.7 mi",currentBook:"James",bookAuthor:"Percival Everett",bookPct:15,lastActive:"2d ago",mutuals:1,bio:"Borders are for crossing.",isFriend:false,mapX:48.9,mapY:45.4,city:"Jupiter"},
  // Friends around the world
  {id:"f1",name:"Sofia Duarte",handle:"@sofialens",initials:"SD",ink:2100,lens:"storyteller",distance:"4,200 mi",currentBook:"The Vegetarian",bookAuthor:"Han Kang",bookPct:91,lastActive:"5h ago",mutuals:8,bio:"Prose should leave marks.",isFriend:true,mapX:30.2,mapY:38.5,city:"Lisbon"},
  {id:"f2",name:"Yuki Tanaka",handle:"@yukireads",initials:"YT",ink:3100,lens:"philosopher",distance:"7,400 mi",currentBook:"Orbital",bookAuthor:"Samantha Harvey",bookPct:34,lastActive:"1h ago",mutuals:6,bio:"Language is the house of being.",isFriend:true,mapX:82.5,mapY:40.2,city:"Tokyo"},
  {id:"f3",name:"Nico Bianchi",handle:"@nicoinks",initials:"NB",ink:870,lens:"alchemist",distance:"5,100 mi",currentBook:"Beloved",bookAuthor:"Toni Morrison",bookPct:47,lastActive:"30m ago",mutuals:4,bio:"Two threads. One needle.",isFriend:true,mapX:35.8,mapY:36.8,city:"Rome"},
  {id:"f4",name:"Priya Mehta",handle:"@priyalens",initials:"PM",ink:1650,lens:"empath",distance:"8,500 mi",currentBook:"Exit West",bookAuthor:"Mohsin Hamid",bookPct:72,lastActive:"3h ago",mutuals:3,bio:"Every book is a body.",isFriend:true,mapX:61.5,mapY:43.8,city:"Mumbai"},
  {id:"f5",name:"Davi Santos",handle:"@davisantos",initials:"DS",ink:1800,lens:"explorer",distance:"4,800 mi",currentBook:"James",bookAuthor:"Percival Everett",bookPct:88,lastActive:"12h ago",mutuals:5,bio:"Literature has no borders.",isFriend:true,mapX:27.5,mapY:62.5,city:"S\u00E3o Paulo"},
  // Public readers globally
  {id:"p1",name:"Lena Hardt",handle:"@lenahardt",initials:"LH",ink:420,lens:"analyst",distance:"4,600 mi",currentBook:"Intermezzo",bookAuthor:"Sally Rooney",bookPct:38,lastActive:"8h ago",mutuals:0,bio:"I read the footnotes first.",isFriend:false,mapX:34.5,mapY:32.5,city:"Berlin"},
  {id:"p2",name:"Tomoko Sato",handle:"@tomokoreads",initials:"TS",ink:290,lens:"empath",distance:"7,200 mi",currentBook:"Demon Copperhead",bookAuthor:"Barbara Kingsolver",bookPct:19,lastActive:"4h ago",mutuals:0,bio:"Feeling forward.",isFriend:false,mapX:81.2,mapY:39.0,city:"Osaka"},
];

const TRENDING=[
  {id:"t1",title:"Intermezzo",author:"Sally Rooney",readers:412,waypoints:89,genre:"Literary Fiction",heat:"+34%"},
  {id:"t2",title:"James",author:"Percival Everett",readers:387,waypoints:72,genre:"Historical Fiction",heat:"+28%"},
  {id:"t3",title:"Orbital",author:"Samantha Harvey",readers:298,waypoints:64,genre:"Literary Fiction",heat:"+22%"},
  {id:"t4",title:"The Vegetarian",author:"Han Kang",readers:261,waypoints:58,genre:"International",heat:"+19%"},
  {id:"t5",title:"Beloved",author:"Toni Morrison",readers:342,waypoints:156,genre:"Literary Fiction",heat:"+15%"},
  {id:"t6",title:"Demon Copperhead",author:"Barbara Kingsolver",readers:234,waypoints:41,genre:"Literary Fiction",heat:"+12%"},
];
const SHELVES=[
  {id:"s1",name:"The Grief Shelf",curator:"Priya Anand",curatorInk:1250,lens:"empath",count:7,desc:"Books that sit with you after the last page.",books:["Beloved","A Little Life","The Year of Magical Thinking"]},
  {id:"s2",name:"Prose as Architecture",curator:"Marcus Cole",curatorInk:4200,lens:"analyst",count:5,desc:"When every sentence is load-bearing.",books:["Absalom, Absalom!","The Waves","Intermezzo"]},
  {id:"s3",name:"Border Crossings",curator:"Davi Santos",curatorInk:1800,lens:"explorer",count:6,desc:"Literature that moves between worlds.",books:["Exit West","The Vegetarian","Flights"]},
];
const READING_NOW=[
  {book:"Beloved",author:"Toni Morrison",activeReaders:47,recentWaypoint:"The Clearing scene is the novel\u2019s pivot.",wpAuthor:"Kofi Asante",wpLens:"storyteller"},
  {book:"Intermezzo",author:"Sally Rooney",activeReaders:38,recentWaypoint:"Two hundred pages in, you\u2019re watching two brothers try to love the same feeling through different people.",wpAuthor:"Yuki Tanaka",wpLens:"philosopher"},
];

const pToast=msg=>{if(!msg)return;const el=document.getElementById("ex-t");if(!el)return;el.textContent=msg;el.style.display="block";el.style.animation="fadeUp .3s ease";setTimeout(()=>el.style.display="none",2500);};

// ═══ READER MAP COMPONENT ═══
function ReaderMap({readers,following,onFollow,onProfile,onBook}){
  const[zoom,setZoom]=useState(1);
  const[pan,setPan]=useState({x:0,y:0});
  const[dragging,setDragging]=useState(false);
  const[dragStart,setDragStart]=useState({x:0,y:0});
  const[panStart,setPanStart]=useState({x:0,y:0});
  const[selected,setSelected]=useState(null);
  const mapRef=useRef(null);

  const zoomIn=()=>setZoom(z=>Math.min(z*1.4,6));
  const zoomOut=()=>{setZoom(z=>{const nz=Math.max(z/1.4,.5);if(nz<=1)setPan({x:0,y:0});return nz;});};
  const resetView=()=>{setZoom(1);setPan({x:0,y:0});setSelected(null);};

  const onPointerDown=useCallback(e=>{if(e.target.closest('[data-pin]'))return;setDragging(true);setDragStart({x:e.clientX,y:e.clientY});setPanStart({...pan});e.currentTarget.setPointerCapture(e.pointerId);},[pan]);
  const onPointerMove=useCallback(e=>{if(!dragging)return;const dx=e.clientX-dragStart.x;const dy=e.clientY-dragStart.y;setPan({x:panStart.x+dx/zoom,y:panStart.y+dy/zoom});},[dragging,dragStart,panStart,zoom]);
  const onPointerUp=useCallback(()=>setDragging(false),[]);
  const onWheel=useCallback(e=>{e.preventDefault();if(e.deltaY<0)setZoom(z=>Math.min(z*1.15,6));else setZoom(z=>{const nz=Math.max(z/1.15,.5);if(nz<=1)setPan({x:0,y:0});return nz;});},[]);

  // Attach wheel listener with passive:false
  useEffect(()=>{const el=mapRef.current;if(!el)return;const h=e=>{e.preventDefault();if(e.deltaY<0)setZoom(z=>Math.min(z*1.15,6));else setZoom(z=>{const nz=Math.max(z/1.15,.5);if(nz<=1)setPan({x:0,y:0});return nz;});};el.addEventListener('wheel',h,{passive:false});return()=>el.removeEventListener('wheel',h);},[]);

  return <div style={{position:"relative",borderRadius:14,overflow:"hidden",background:"#0A0F18",border:`1px solid ${T.border}`,userSelect:"none"}}>
    {/* Map surface */}
    <div ref={mapRef} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} style={{width:"100%",height:380,cursor:dragging?"grabbing":"grab",overflow:"hidden",position:"relative",touchAction:"none"}}>
      {/* World map background — stylized grid */}
      <div style={{position:"absolute",inset:0,transform:`scale(${zoom}) translate(${pan.x}px,${pan.y}px)`,transformOrigin:"center center",transition:dragging?"none":"transform .25s ease"}}>
        {/* Ocean grid */}
        <svg width="100%" height="100%" viewBox="0 0 1000 500" style={{position:"absolute",inset:0}}>
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(212,168,85,0.03)" strokeWidth=".5"/>
            </pattern>
            <radialGradient id="glow" cx="50%" cy="46%" r="40%">
              <stop offset="0%" stopColor="rgba(196,114,50,0.06)"/>
              <stop offset="100%" stopColor="transparent"/>
            </radialGradient>
          </defs>
          <rect width="1000" height="500" fill="url(#grid)"/>
          <rect width="1000" height="500" fill="url(#glow)"/>
          {/* Simplified continent outlines */}
          <g fill="rgba(212,168,85,0.04)" stroke="rgba(212,168,85,0.08)" strokeWidth=".5">
            {/* North America */}
            <path d="M150,80 Q200,70 250,90 Q280,100 300,130 Q310,170 280,200 Q260,230 250,260 Q230,240 200,220 Q180,200 160,180 Q140,150 130,120 Z"/>
            {/* South America */}
            <path d="M250,280 Q270,270 290,290 Q300,320 290,360 Q270,390 250,400 Q230,380 220,350 Q215,320 230,300 Z"/>
            {/* Europe */}
            <path d="M420,100 Q450,80 480,90 Q500,100 490,120 Q480,140 460,150 Q440,145 420,130 Z"/>
            {/* Africa */}
            <path d="M440,170 Q470,160 490,180 Q500,220 490,260 Q470,300 450,310 Q430,290 420,260 Q415,220 430,190 Z"/>
            {/* Asia */}
            <path d="M520,80 Q580,60 650,80 Q720,100 750,130 Q770,160 760,190 Q730,200 700,190 Q660,180 620,170 Q580,160 550,140 Q520,120 510,100 Z"/>
            {/* Oceania */}
            <path d="M730,300 Q760,290 790,300 Q800,320 780,340 Q760,345 740,330 Q725,315 730,300 Z"/>
          </g>
          {/* Your location pulse */}
          <circle cx="500" cy="230" r="4" fill={T.accent} opacity=".8">
            <animate attributeName="r" values="4;10;4" dur="3s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values=".8;.2;.8" dur="3s" repeatCount="indefinite"/>
          </circle>
          <circle cx="500" cy="230" r="3" fill={T.accent}/>
        </svg>

        {/* Reader pins */}
        {readers.map(u=>{
          const lens=LENSES[u.lens];const isF=u.isFriend;const isSel=selected===u.id;
          // Convert mapX/mapY (0-100%) to pixel positions on 1000x500 viewbox
          const px=`${u.mapX}%`;const py=`${u.mapY}%`;
          return <div key={u.id} data-pin="1" style={{position:"absolute",left:px,top:py,transform:"translate(-50%,-50%)",zIndex:isSel?50:10,cursor:"pointer",transition:"transform .15s"}} onClick={()=>setSelected(isSel?null:u.id)}>
            {/* Pin body */}
            <div style={{position:"relative"}}>
              <div style={{width:isSel?36:28,height:isSel?36:28,borderRadius:"50%",background:T.card,border:`2px solid ${isF?T.gold:lens.color}`,boxShadow:`0 0 ${isSel?16:8}px ${isF?T.gold:lens.color}40`,display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s",fontFamily:T.sans,fontSize:isSel?11:9,fontWeight:700,color:isF?T.gold:lens.color}}>
                {u.initials}
              </div>
              {/* Book indicator dot */}
              <div style={{position:"absolute",bottom:-2,right:-2,width:12,height:12,borderRadius:"50%",background:T.accent,border:`1.5px solid ${T.card}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:6}}>{"\uD83D\uDCD6"}</div>
              {isF&&<div style={{position:"absolute",top:-3,left:-3,width:10,height:10,borderRadius:"50%",background:T.gold,border:`1.5px solid ${T.card}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:5}}>{"\u2605"}</div>}
            </div>

            {/* Popup card */}
            {isSel&&<div onClick={e=>e.stopPropagation()} style={{position:"absolute",top:"calc(100% + 8px)",left:"50%",transform:"translateX(-50%)",width:220,background:T.card,border:`1px solid ${T.borderHover}`,borderRadius:12,padding:"12px 14px",boxShadow:"0 12px 40px rgba(0,0,0,.6)",animation:"fadeUp .15s ease",zIndex:60}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                <Av i={u.initials} ink={u.ink} s={30}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontFamily:T.sans,fontSize:11,fontWeight:700,color:T.ink}}>{u.name}</div>
                  <div style={{fontFamily:T.sans,fontSize:9,color:T.ink4}}>{u.city} {"\u00B7"} {u.distance}</div>
                </div>
                <Badge lens={u.lens}/>
              </div>
              {/* What they're reading */}
              <div onClick={()=>onBook(u.currentBook)} style={{display:"flex",alignItems:"center",gap:6,padding:"7px 8px",borderRadius:7,background:`${T.accent}06`,border:`1px solid ${T.accent}08`,cursor:"pointer",marginBottom:8}}>
                <div style={{width:14,height:20,borderRadius:"0 2px 2px 0",background:`linear-gradient(145deg,${T.accent}CC,#6B2A10)`,flexShrink:0}}/>
                <div style={{flex:1}}>
                  <div style={{fontFamily:T.sans,fontSize:9,fontWeight:700,color:T.ink}}>{u.currentBook}</div>
                  <div style={{fontFamily:T.sans,fontSize:8,color:T.ink4}}>{u.bookAuthor}</div>
                </div>
                <span style={{fontFamily:T.sans,fontSize:9,fontWeight:700,color:T.accent}}>{u.bookPct}%</span>
              </div>
              <div style={{display:"flex",gap:6}}>
                <button onClick={()=>onProfile(u.name)} style={{flex:1,padding:"6px",borderRadius:6,border:`1px solid ${T.border}`,background:"transparent",fontFamily:T.sans,fontSize:9,fontWeight:600,color:T.ink3,cursor:"pointer"}}>Profile</button>
                <button onClick={()=>onFollow(u.id)} style={{flex:1,padding:"6px",borderRadius:6,border:"none",background:following[u.id]?`${T.green}12`:T.accent,fontFamily:T.sans,fontSize:9,fontWeight:700,color:following[u.id]?T.green:"#fff",cursor:"pointer"}}>{following[u.id]?"\u2713 Following":"Follow"}</button><button onClick={()=>pToast("Opening conversation\u2026")} style={{padding:"6px 10px",borderRadius:8,border:`1px solid ${T.border}`,background:"transparent",fontFamily:T.sans,fontSize:10,fontWeight:600,color:T.ink3,cursor:"pointer"}} aria-label="Message">{"\u2709"}</button>
              </div>
            </div>}
          </div>;
        })}
      </div>
    </div>

    {/* Zoom controls */}
    <div style={{position:"absolute",bottom:14,right:14,display:"flex",flexDirection:"column",gap:4}}>
      <button onClick={zoomIn} aria-label="Zoom in" style={{width:32,height:32,borderRadius:8,border:`1px solid ${T.border}`,background:`${T.bg}E0`,backdropFilter:"blur(8px)",color:T.ink,fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>+</button>
      <button onClick={zoomOut} aria-label="Zoom out" style={{width:32,height:32,borderRadius:8,border:`1px solid ${T.border}`,background:`${T.bg}E0`,backdropFilter:"blur(8px)",color:T.ink,fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>{"\u2212"}</button>
      {zoom!==1&&<button onClick={resetView} aria-label="Reset view" style={{width:32,height:32,borderRadius:8,border:`1px solid ${T.border}`,background:`${T.bg}E0`,backdropFilter:"blur(8px)",color:T.ink4,fontSize:11,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:T.sans,fontWeight:700}}>{"\u21BA"}</button>}
    </div>

    {/* Zoom level indicator */}
    <div style={{position:"absolute",bottom:14,left:14,fontFamily:T.sans,fontSize:9,color:T.ink4,background:`${T.bg}CC`,padding:"3px 8px",borderRadius:5}}>{zoom<=1?"World":zoom<=2?"Region":zoom<=4?"City":"Street"} view</div>

    {/* Legend */}
    <div style={{position:"absolute",top:14,right:14,display:"flex",gap:8,fontFamily:T.sans,fontSize:8,color:T.ink4}}>
      <span style={{display:"flex",alignItems:"center",gap:3}}><span style={{width:6,height:6,borderRadius:"50%",background:T.gold,border:`1px solid ${T.gold}50`}}/> Friend</span>
      <span style={{display:"flex",alignItems:"center",gap:3}}><span style={{width:6,height:6,borderRadius:"50%",background:T.blue,border:`1px solid ${T.blue}50`}}/> Public</span>
      <span style={{display:"flex",alignItems:"center",gap:3}}><span style={{width:6,height:6,borderRadius:"50%",background:T.accent}}/> You</span>
    </div>
  </div>;
}

// ═══ MAIN EXPORT ═══

function ThemeSwitcher({tid,setTid}){
  const[open,setOpen]=useState(false);
  return <div style={{position:"relative"}}>
    <button onClick={()=>setOpen(!open)} aria-label="Switch theme" style={{display:"flex",alignItems:"center",justifyContent:"center",width:28,height:28,borderRadius:"50%",border:`1.5px solid ${T.gold}40`,background:`${T.gold}10`,cursor:"pointer",fontSize:13,opacity:open?.9:.7}} onMouseEnter={e=>e.currentTarget.style.opacity="1"} onMouseLeave={e=>e.currentTarget.style.opacity=open?"0.9":"0.7"}>{THEMES[tid].icon}</button>
    {open&&<div style={{position:"absolute",top:"calc(100% + 8px)",right:0,background:T.card,border:`1px solid ${T.borderHover}`,borderRadius:14,padding:6,zIndex:60,boxShadow:"0 12px 40px rgba(0,0,0,.35)",minWidth:200}}>
      <div style={{padding:"4px 12px 8px",fontFamily:T.sans,fontSize:9,fontWeight:700,color:T.ink4,letterSpacing:".5px",textTransform:"uppercase"}}>Reading Theme</div>
      {THEME_ORDER.map(k=>{const th=THEMES[k];const active=k===tid;return <button key={k} onClick={()=>{setTid(k);setOpen(false);}} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",borderRadius:10,border:"none",cursor:"pointer",width:"100%",background:active?`${th.accent}15`:"transparent"}}>
        <div style={{display:"flex",gap:3}}>{[th.bg,th.card,th.ink,th.accent,th.gold].map((c,i)=><div key={i} style={{width:10,height:10,borderRadius:i===0?3:10,background:c,border:"1px solid rgba(128,128,128,.2)"}}/>)}</div>
        <div style={{flex:1,textAlign:"left"}}><div style={{fontFamily:T.sans,fontSize:11,fontWeight:active?700:500,color:active?th.accent:T.ink2}}>{th.name}</div></div>
        {active&&<span style={{fontSize:10,color:th.accent}}>{"\u2713"}</span>}
      </button>;})}
    </div>}
  </div>;
}


// ═══ SEARCH MODAL ═══
function SearchModal({onClose}){
  const[q,setQ]=useState("");
  const[tab,setTab]=useState("books");
  const ir=useRef(null);
  useEffect(()=>{ir.current?.focus();const h=e=>{if(e.key==="Escape")onClose();};document.addEventListener("keydown",h);return()=>document.removeEventListener("keydown",h);},[]);
  const BOOKS=[{id:"b1",title:"Intermezzo",author:"Sally Rooney",readers:412},{id:"b2",title:"James",author:"Percival Everett",readers:387},{id:"b3",title:"Orbital",author:"Samantha Harvey",readers:298},{id:"b4",title:"Beloved",author:"Toni Morrison",readers:342},{id:"b5",title:"The Vegetarian",author:"Han Kang",readers:261},{id:"b6",title:"Demon Copperhead",author:"Barbara Kingsolver",readers:234}];
  const READERS=[{id:"u1",name:"Marcus Cole",handle:"@marcusreads",initials:"MC",ink:4200,lens:"analyst"},{id:"u2",name:"Ava Chen",handle:"@avawrites",initials:"AC",ink:890,lens:"empath"},{id:"u3",name:"Davi Santos",handle:"@davisantos",initials:"DS",ink:1800,lens:"explorer"},{id:"u4",name:"Yuki Tanaka",handle:"@yukireads",initials:"YT",ink:3100,lens:"philosopher"}];
  const RECENT=["Toni Morrison","magical realism","short fiction","Sally Rooney"];
  const ql=q.toLowerCase().trim();
  const fb=ql?BOOKS.filter(b=>b.title.toLowerCase().includes(ql)||b.author.toLowerCase().includes(ql)):[];
  const fr=ql?READERS.filter(u=>u.name.toLowerCase().includes(ql)||u.handle.includes(ql)):[];
  function showToast(msg){onClose();const el=document.getElementById("ex-t");if(el){el.textContent=msg;el.style.display="block";setTimeout(()=>{el.style.display="none";},2000);}}
  const bookRow=(b)=>(<div key={b.id} onClick={()=>showToast("Opening "+b.title+"\u2026")} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 12px",borderRadius:10,cursor:"pointer",transition:"background .15s"}} onMouseEnter={e=>{e.currentTarget.style.background=T.bg3;}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";}}>
    <div style={{width:24,height:36,borderRadius:"1px 3px 3px 1px",background:"linear-gradient(145deg,"+T.accent+"CC,#6B2A10)",boxShadow:"1px 0 4px rgba(0,0,0,.25)",flexShrink:0}}/>
    <div style={{flex:1}}><div style={{fontFamily:T.serif,fontSize:13,fontWeight:700,color:T.ink}}>{b.title}</div><div style={{fontFamily:T.body,fontSize:11,color:T.ink3,fontStyle:"italic"}}>{b.author}</div></div>
    <span style={{fontFamily:T.sans,fontSize:9,color:T.ink4}}>{b.readers} readers</span>
  </div>);
  const readerRow=(u)=>{const lens=LENSES[u.lens];return(<div key={u.id} onClick={()=>showToast("Opening "+u.name+"\u2019s profile\u2026")} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:10,cursor:"pointer",transition:"background .15s"}} onMouseEnter={e=>{e.currentTarget.style.background=T.bg3;}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";}}>
    <Av i={u.initials} ink={u.ink} s={34}/>
    <div style={{flex:1}}><div style={{fontFamily:T.sans,fontSize:12,fontWeight:700,color:T.ink}}>{u.name}</div><div style={{fontFamily:T.sans,fontSize:10,color:T.ink4}}>{u.handle} {"\u00B7"} {lens?.icon} {lens?.label}</div></div>
    <IB ink={u.ink}/>
  </div>);};
  const noResults=(label)=>(<div style={{textAlign:"center",padding:"24px",fontFamily:T.body,fontSize:12,color:T.ink4,fontStyle:"italic"}}>No {label} match {"\u201C"}{q}{"\u201D"}</div>);
  return (<div style={{position:"fixed",inset:0,zIndex:250,background:"rgba(0,0,0,.7)",backdropFilter:"blur(4px)",animation:"fadeIn .15s ease"}} onClick={onClose}>
    <div onClick={e=>e.stopPropagation()} style={{maxWidth:560,width:"94%",margin:"60px auto 0",background:T.card,border:"1px solid "+T.borderHover,borderRadius:18,overflow:"hidden",boxShadow:"0 24px 80px rgba(0,0,0,.6)",animation:"fadeUp .2s ease"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,padding:"16px 20px",borderBottom:"1px solid "+T.border}}>
        <span style={{fontSize:16,opacity:.4}}>{"\uD83D\uDD0D"}</span>
        <input ref={ir} value={q} onChange={e=>setQ(e.target.value)} placeholder={"Search books, authors, or readers\u2026"} aria-label="Search" style={{flex:1,fontFamily:T.body,fontSize:15,color:T.ink,background:"transparent",border:"none",outline:"none",fontWeight:300}}/>
        <button onClick={onClose} style={{background:"none",border:"none",fontFamily:T.sans,fontSize:12,fontWeight:600,color:T.ink3,cursor:"pointer",padding:"4px 8px"}}>Cancel</button>
      </div>
      <div style={{maxHeight:"60vh",overflowY:"auto",padding:"12px 0"}}>
        {!ql&&<div style={{padding:"8px 20px"}}><div style={{fontFamily:T.sans,fontSize:9,fontWeight:700,color:T.ink4,letterSpacing:".5px",textTransform:"uppercase",marginBottom:8}}>Recent searches</div><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{RECENT.map((s,i)=><button key={i} onClick={()=>setQ(s)} style={{padding:"5px 12px",borderRadius:8,border:"1px solid "+T.border,background:T.bg3,fontFamily:T.sans,fontSize:11,color:T.ink3,cursor:"pointer"}}>{s}</button>)}</div></div>}
        {ql&&<div>
          <div style={{display:"flex",gap:4,padding:"4px 20px 10px"}}>{[{id:"books",label:"Books",c:fb.length},{id:"readers",label:"Readers",c:fr.length}].map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"5px 12px",borderRadius:6,border:"none",background:tab===t.id?T.gold+"10":"transparent",fontFamily:T.sans,fontSize:11,fontWeight:tab===t.id?700:500,color:tab===t.id?T.gold:T.ink4,cursor:"pointer"}}>{t.label} ({t.c})</button>)}</div>
          {tab==="books"&&<div style={{padding:"0 20px"}}>{fb.map(bookRow)}{fb.length===0&&noResults("books")}</div>}
          {tab==="readers"&&<div style={{padding:"0 20px"}}>{fr.map(readerRow)}{fr.length===0&&noResults("readers")}</div>}
        </div>}
      </div>
    </div>
  </div>);
}

export default function Explore(){
  const{theme,tid,setTid}=useTheme(); T=theme;
  const[vis,setVis]=useState(false);
  const[locEnabled,setLocEnabled]=useState(true);
  const[lf,setLF]=useState("all");
  const[mapView,setMapView]=useState(true);
  const[mapFilter,setMapFilter]=useState("everyone");// everyone | friends | public
  const[following,setFollowing]=useState({});
  const[shelved,setShelved]=useState({});
  const[showSearch,setShowSearch]=useState(false);
  const[ghostMode,setGhostMode]=useState(false);
  useEffect(()=>{setTimeout(()=>setVis(true),60);},[]);

  // Filter readers based on map filter + lens
  const filteredReaders=ALL_READERS.filter(u=>{
    if(mapFilter==="friends"&&!u.isFriend)return false;
    if(mapFilter==="public"&&u.isFriend)return false;
    if(lf!=="all"&&u.lens!==lf)return false;
    return true;
  });

  // For card view, sort by distance (nearby first)
  const cardReaders=[...filteredReaders].sort((a,b)=>parseFloat(a.distance)-parseFloat(b.distance));

  function toggleFollow(uid){setFollowing(p=>{const n={...p};if(n[uid])delete n[uid];else n[uid]=true;return n;});pToast(following[uid]?"Unfollowed":"Following");}
  function toggleShelf(sid){setShelved(p=>{const n={...p};if(n[sid])delete n[sid];else n[sid]=true;return n;});pToast(shelved[sid]?"Removed from shelf":"Added to shelf");}

  return <div style={{minHeight:"100vh",background:T.bg,color:T.ink}}>
  <style>{`
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,700&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;1,8..60,300;1,8..60,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');
*{margin:0;padding:0;box-sizing:border-box}::selection{background:rgba(212,168,85,.2)}body{background:${T.bg}!important}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:${T.ink4};border-radius:3px}
@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
button:focus-visible{outline:2px solid ${T.gold};outline-offset:2px}
.ex-card{transition:border-color .2s,transform .15s}.ex-card:hover{border-color:${T.borderHover}!important;transform:translateY(-1px)}
.hscroll{overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none}.hscroll::-webkit-scrollbar{display:none}
@media(max-width:640px){.mob-nav{display:flex!important}.eg{grid-template-columns:repeat(2,1fr)!important}.nearby-meta{flex-direction:column!important;align-items:flex-start!important;gap:8px!important}.nearby-follow{align-self:flex-start!important}.rn-grid{flex-direction:column!important}.sec-head{flex-direction:column!important;align-items:flex-start!important;gap:6px!important}.map-controls{flex-wrap:wrap!important}}
@media(max-width:420px){.eg{grid-template-columns:1fr!important}}
@media(prefers-reduced-motion:reduce){*{animation-duration:0.01ms!important;transition-duration:0.01ms!important}}
  `}</style>

  <div id="ex-t" style={{display:"none",position:"fixed",bottom:80,left:"50%",transform:"translateX(-50%)",padding:"10px 24px",borderRadius:10,background:T.bg2,border:`1px solid ${T.borderHover}`,boxShadow:"0 8px 32px rgba(0,0,0,.4)",fontFamily:T.sans,fontSize:12,fontWeight:700,color:T.ink,zIndex:300}}/>

  {/* NAV */}
  <nav style={{position:"sticky",top:0,zIndex:100,background:`${T.bg}E8`,backdropFilter:"blur(24px) saturate(1.2)",borderBottom:`1px solid ${T.border}`}}>
    <div style={{maxWidth:800,margin:"0 auto",padding:"0 24px",display:"flex",alignItems:"center",height:56,gap:14}}>
      <span onClick={()=>pToast("Navigating to Feed\u2026")} style={{fontFamily:T.serif,fontSize:22,fontWeight:700,color:T.ink,letterSpacing:"-.5px",cursor:"pointer"}}>Pr<span style={{color:T.accent}}>{"\u00E9"}</span>cis</span>
      <span onClick={()=>pToast("\u2190 Feed")} style={{fontFamily:T.sans,fontSize:12,color:T.ink3,cursor:"pointer"}}>{"\u2190"} Feed</span>
      <div style={{flex:1}}/>
        <ThemeSwitcher tid={tid} setTid={setTid}/>
      <span style={{fontFamily:T.sans,fontSize:13,fontWeight:700,color:T.gold}}>{"\uD83C\uDF0D"} Explore</span>
      <button onClick={()=>setShowSearch(true)} aria-label="Search" style={{width:36,height:36,borderRadius:"50%",border:`1px solid ${T.border}`,background:"transparent",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:15,color:T.ink3}}>{"\uD83D\uDD0D"}</button>
    </div>
  </nav>

  {showSearch&&<SearchModal onClose={()=>setShowSearch(false)}/>}

  <main style={{maxWidth:800,margin:"0 auto",padding:"28px 24px 100px",opacity:vis?1:0,transform:vis?"none":"translateY(12px)",transition:"opacity .4s ease,transform .4s ease"}}>

    {/* ═══ READING RIGHT NOW ═══ */}
    <section style={{marginBottom:32}}>
      <div className="sec-head" style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
        <h2 style={{fontFamily:T.serif,fontSize:18,fontWeight:700,color:T.ink}}>{"\uD83D\uDCD6"} Reading right now</h2>
        <span style={{fontFamily:T.sans,fontSize:10,color:T.ink4}}>{"\u25CF"} Live</span>
      </div>
      <div className="rn-grid" style={{display:"flex",gap:12}}>
        {READING_NOW.map((r,i)=><div key={i} className="ex-card" style={{flex:1,padding:"18px 20px",borderRadius:14,background:T.card,border:`1px solid ${T.border}`,cursor:"pointer"}} onClick={()=>pToast(`Opening ${r.book}\u2026`)}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
            <div style={{width:28,height:42,borderRadius:"1px 3px 3px 1px",background:`linear-gradient(145deg,${T.accent}CC,#6B2A10)`,boxShadow:"2px 0 6px rgba(0,0,0,.3)",flexShrink:0}}/>
            <div><div style={{fontFamily:T.serif,fontSize:14,fontWeight:700,color:T.ink}}>{r.book}</div><div style={{fontFamily:T.body,fontSize:11,color:T.ink3,fontStyle:"italic"}}>{r.author}</div></div>
            <div style={{marginLeft:"auto",textAlign:"right"}}><div style={{fontFamily:T.sans,fontSize:16,fontWeight:800,color:T.gold}}>{r.activeReaders}</div><div style={{fontFamily:T.sans,fontSize:8,color:T.ink4,textTransform:"uppercase",letterSpacing:".5px"}}>reading</div></div>
          </div>
          <div style={{padding:"10px 12px",borderRadius:8,background:`${T.blue}06`,border:`1px solid ${T.blue}08`}}>
            <div style={{fontFamily:T.body,fontSize:11,color:T.ink2,fontWeight:300,lineHeight:1.6,fontStyle:"italic"}}>{"\u201C"}{r.recentWaypoint.length>100?r.recentWaypoint.slice(0,100)+"\u2026":r.recentWaypoint}{"\u201D"}</div>
            <div style={{fontFamily:T.sans,fontSize:9,color:T.ink4,marginTop:4}}>{LENSES[r.wpLens]?.icon} {r.wpAuthor} {"\u00B7"} waypoint</div>
          </div>
        </div>)}
      </div>
    </section>

    {/* ═══ READERS NEAR YOU — MAP + CARDS ═══ */}
    <section style={{marginBottom:32}}>
      <div className="sec-head" style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
        <h2 style={{fontFamily:T.serif,fontSize:18,fontWeight:700,color:T.ink}}>{"\uD83D\uDCCD"} Readers near you</h2>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          {locEnabled&&<button onClick={()=>{setGhostMode(g=>!g);pToast(ghostMode?"You\u2019re visible again":"You\u2019re invisible on the map");}} style={{display:"flex",alignItems:"center",gap:4,padding:"4px 10px",borderRadius:6,border:`1px solid ${ghostMode?`${T.plum}25`:T.border}`,background:ghostMode?`${T.plum}08`:"transparent",fontFamily:T.sans,fontSize:9,fontWeight:600,color:ghostMode?T.plum:T.ink4,cursor:"pointer"}}>{ghostMode?"\uD83D\uDC7B Ghost mode":"\uD83D\uDC41 Visible"}</button>}
          {locEnabled&&<button onClick={()=>{setLocEnabled(false);pToast("Location disabled");}} style={{fontFamily:T.sans,fontSize:9,color:T.ink4,background:"none",border:"none",cursor:"pointer",textDecoration:"underline",textDecorationColor:`${T.ink4}40`}}>Disable</button>}
        </div>
      </div>

      {/* Ghost mode banner */}
      {locEnabled&&ghostMode&&<div style={{display:"flex",alignItems:"center",gap:8,padding:"10px 14px",borderRadius:10,background:`${T.plum}06`,border:`1px solid ${T.plum}10`,marginBottom:12}}>
        <span style={{fontSize:16}}>{"\uD83D\uDC7B"}</span>
        <div style={{flex:1}}>
          <div style={{fontFamily:T.sans,fontSize:11,fontWeight:700,color:T.plum}}>Ghost mode is on</div>
          <div style={{fontFamily:T.body,fontSize:10,color:T.ink3,fontWeight:300}}>You can browse, but other readers can{"\u2019"}t see you on the map or in Nearby. <span onClick={()=>pToast("Opening Settings \u2192 Privacy\u2026")} style={{color:T.accent,cursor:"pointer",textDecoration:"underline",textDecorationColor:`${T.accent}40`}}>Manage in Settings</span></div>
        </div>
        <button onClick={()=>{setGhostMode(false);pToast("You\u2019re visible again");}} style={{padding:"5px 12px",borderRadius:6,border:`1px solid ${T.plum}20`,background:"transparent",fontFamily:T.sans,fontSize:9,fontWeight:700,color:T.plum,cursor:"pointer",whiteSpace:"nowrap"}}>Turn off</button>
      </div>}

      {!locEnabled?<div style={{textAlign:"center",padding:"40px 20px",background:T.card,borderRadius:14,border:`1px solid ${T.border}`}}>
        <div style={{fontSize:36,opacity:.3,marginBottom:10}}>{"\uD83D\uDCCD"}</div>
        <div style={{fontFamily:T.serif,fontSize:15,fontWeight:700,color:T.ink,fontStyle:"italic",marginBottom:6}}>See who{"\u2019"}s reading near you</div>
        <div style={{fontFamily:T.body,fontSize:12,color:T.ink3,fontWeight:300,lineHeight:1.6,marginBottom:14,maxWidth:320,margin:"0 auto 14px"}}>Enable location to discover readers in your area. Your exact location is never shared.</div>
        <button onClick={()=>setLocEnabled(true)} style={{padding:"10px 24px",borderRadius:10,border:"none",background:T.accent,color:"#fff",fontFamily:T.sans,fontSize:12,fontWeight:700,cursor:"pointer"}}>Enable location</button>
      </div>:<>

      {/* Controls row 1: view + people */}
      <div className="map-controls" style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
        <div style={{display:"flex",background:T.bg3,borderRadius:8,border:`1px solid ${T.border}`,overflow:"hidden"}}>
          <button onClick={()=>setMapView(true)} style={{padding:"6px 12px",border:"none",fontFamily:T.sans,fontSize:10,fontWeight:mapView?700:500,color:mapView?T.gold:T.ink4,background:mapView?`${T.gold}10`:"transparent",cursor:"pointer"}}>{"\uD83D\uDDFA\uFE0F"} Map</button>
          <button onClick={()=>setMapView(false)} style={{padding:"6px 12px",border:"none",fontFamily:T.sans,fontSize:10,fontWeight:!mapView?700:500,color:!mapView?T.gold:T.ink4,background:!mapView?`${T.gold}10`:"transparent",cursor:"pointer"}}>{"\u2630"} Cards</button>
        </div>
        <div style={{width:1,height:20,background:T.border}}/>
        {[{id:"everyone",label:"Everyone"},{id:"friends",label:"Friends"},{id:"public",label:"Public"}].map(f=><button key={f.id} onClick={()=>setMapFilter(f.id)} style={{padding:"5px 10px",borderRadius:6,border:`1px solid ${mapFilter===f.id?`${T.gold}25`:T.border}`,background:mapFilter===f.id?`${T.gold}08`:"transparent",fontFamily:T.sans,fontSize:10,fontWeight:mapFilter===f.id?700:500,color:mapFilter===f.id?T.gold:T.ink4,cursor:"pointer"}}>{f.label}</button>)}
      </div>

      {/* Controls row 2: lens filter — full labeled buttons */}
      <div style={{display:"flex",gap:5,marginBottom:12,flexWrap:"wrap"}}>
        <button onClick={()=>setLF("all")} style={{padding:"5px 12px",borderRadius:7,border:`1px solid ${lf==="all"?`${T.gold}25`:T.border}`,background:lf==="all"?`${T.gold}08`:"transparent",fontFamily:T.sans,fontSize:10,fontWeight:lf==="all"?700:500,color:lf==="all"?T.gold:T.ink4,cursor:"pointer"}}>All lenses</button>
        {Object.entries(LENSES).map(([k,v])=><button key={k} onClick={()=>setLF(k)} style={{padding:"5px 12px",borderRadius:7,border:`1px solid ${lf===k?`${v.color}25`:T.border}`,background:lf===k?`${v.color}08`:"transparent",fontFamily:T.sans,fontSize:10,fontWeight:lf===k?700:500,color:lf===k?v.color:T.ink4,cursor:"pointer"}}>{v.icon} {v.label}</button>)}
      </div>

      {/* Contextual lens header */}
      {lf!=="all"&&<div style={{padding:"10px 14px",borderRadius:10,background:`${LENSES[lf].color}06`,border:`1px solid ${LENSES[lf].color}10`,marginBottom:12,display:"flex",alignItems:"center",gap:8}}>
        <span style={{fontSize:18}}>{LENSES[lf].icon}</span>
        <div>
          <div style={{fontFamily:T.sans,fontSize:12,fontWeight:700,color:LENSES[lf].color}}>What {LENSES[lf].label}s are reading</div>
          <div style={{fontFamily:T.body,fontSize:10,color:T.ink3,fontWeight:300,fontStyle:"italic",marginTop:1}}>{lf==="analyst"?"Readers who dissect structure, pattern, and form.":lf==="empath"?"Readers who feel their way through every page.":lf==="philosopher"?"Readers who chase the question behind the story.":lf==="storyteller"?"Readers who live inside narrative.":lf==="explorer"?"Readers who cross borders and break ground.":"Readers who find the hidden thread between worlds."}</div>
        </div>
        <div style={{marginLeft:"auto",fontFamily:T.sans,fontSize:18,fontWeight:800,color:LENSES[lf].color}}>{filteredReaders.length}</div>
      </div>}

      {/* Reader count */}
      <div style={{fontFamily:T.sans,fontSize:10,color:T.ink4,marginBottom:10}}>{filteredReaders.length} reader{filteredReaders.length!==1?"s":""} {lf!=="all"?`with ${LENSES[lf].icon} ${LENSES[lf].label} lens`:""} {mapFilter==="friends"?"you follow":mapFilter==="public"?"in the community":"nearby and worldwide"}</div>

      {/* MAP VIEW */}
      {mapView&&<ReaderMap readers={filteredReaders} following={following} onFollow={toggleFollow} onProfile={name=>pToast(`Opening ${name}\u2019s profile\u2026`)} onBook={book=>pToast(`Opening ${book}\u2026`)}/>}

      {/* CARD VIEW */}
      {!mapView&&<div style={{display:"flex",flexDirection:"column",gap:8}}>
        {cardReaders.map(u=>{const lens=LENSES[u.lens];const isF=following[u.id];
        return <div key={u.id} className="ex-card" style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:14,padding:"14px 16px"}}>
          <div className="nearby-meta" style={{display:"flex",alignItems:"center",gap:10}}>
            <div onClick={()=>pToast(`Opening ${u.name}\u2019s profile\u2026`)} style={{cursor:"pointer"}}><Av i={u.initials} ink={u.ink} s={40}/></div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",alignItems:"center",gap:5,flexWrap:"wrap"}}>
                <span onClick={()=>pToast(`Opening ${u.name}\u2019s profile\u2026`)} style={{fontFamily:T.sans,fontSize:12,fontWeight:700,color:T.ink,cursor:"pointer"}}>{u.name}</span>
                <Badge lens={u.lens}/>
                {u.isFriend&&<span style={{fontSize:8,color:T.gold}} title="Friend">{"\u2605"}</span>}
                <span style={{fontFamily:T.sans,fontSize:9,color:T.ink4}}>{"\uD83D\uDCCD"} {u.distance}</span>
              </div>
              <div style={{fontFamily:T.body,fontSize:11,color:T.ink3,fontWeight:300,fontStyle:"italic",marginTop:1}}>{u.bio}</div>
            </div>
            <div className="nearby-follow" style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4,flexShrink:0}}>
              <button onClick={()=>toggleFollow(u.id)} style={{padding:"5px 12px",borderRadius:7,border:`1px solid ${isF?`${T.green}25`:T.border}`,background:isF?`${T.green}06`:"transparent",fontFamily:T.sans,fontSize:10,fontWeight:700,color:isF?T.green:T.ink3,cursor:"pointer",whiteSpace:"nowrap",minHeight:30}}>{isF?"\u2713 Following":"Follow"}</button><button onClick={()=>pToast("Opening conversation\u2026")} style={{padding:"6px 10px",borderRadius:8,border:`1px solid ${T.border}`,background:"transparent",fontFamily:T.sans,fontSize:10,fontWeight:600,color:T.ink3,cursor:"pointer"}} aria-label="Message">{"\u2709"}</button>
              <span style={{fontFamily:T.sans,fontSize:8,color:T.ink4}}>{u.lastActive}{u.mutuals>0?` \u00B7 ${u.mutuals} mutual${u.mutuals>1?"s":""}`:""}</span>
            </div>
          </div>
          <div onClick={()=>pToast(`Opening ${u.currentBook}\u2026`)} style={{display:"flex",alignItems:"center",gap:8,marginTop:10,padding:"8px 10px",borderRadius:8,background:`${T.accent}04`,border:`1px solid ${T.accent}06`,cursor:"pointer",transition:"background .15s"}} onMouseEnter={e=>e.currentTarget.style.background=`${T.accent}08`} onMouseLeave={e=>e.currentTarget.style.background=`${T.accent}04`}>
            <div style={{width:18,height:26,borderRadius:"1px 2px 2px 1px",background:`linear-gradient(145deg,${T.accent}CC,#6B2A10)`,boxShadow:"1px 0 3px rgba(0,0,0,.25)",flexShrink:0}}/>
            <div style={{flex:1}}><div style={{fontFamily:T.sans,fontSize:10,fontWeight:700,color:T.ink}}>{u.currentBook}</div><div style={{fontFamily:T.sans,fontSize:9,color:T.ink4}}>{u.bookAuthor} {u.city?`\u00B7 ${u.city}`:""}</div></div>
            <div style={{width:36,height:3,borderRadius:2,background:T.bg3,overflow:"hidden",flexShrink:0}}><div style={{width:`${u.bookPct}%`,height:"100%",borderRadius:2,background:`linear-gradient(90deg,${T.accent},${T.gold})`}}/></div>
            <span style={{fontFamily:T.sans,fontSize:10,fontWeight:700,color:T.accent,flexShrink:0}}>{u.bookPct}%</span>
          </div>
        </div>;})}
        {cardReaders.length===0&&<div style={{textAlign:"center",padding:"36px 20px",background:T.card,borderRadius:14,border:`1px solid ${T.border}`}}>
          <div style={{fontFamily:T.serif,fontSize:14,fontWeight:700,color:T.ink,fontStyle:"italic",marginBottom:4}}>No readers match this filter</div>
          <div style={{fontFamily:T.body,fontSize:11,color:T.ink3,fontWeight:300}}>Try "Everyone" or adjust the lens.</div>
        </div>}
      </div>}

      {/* Privacy */}
      <div style={{marginTop:10,padding:"8px 12px",borderRadius:8,background:`${T.gold}03`,border:`1px solid ${T.gold}04`}}>
        <div style={{display:"flex",alignItems:"center",gap:5}}>
          <span style={{fontSize:9}}>{"\uD83D\uDD12"}</span>
          <span style={{fontFamily:T.sans,fontSize:8,color:T.ink4}}>Your exact location is never shared. Readers see your general area only.</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10,marginTop:5}}>
          <span onClick={()=>pToast("Opening Settings \u2192 Privacy\u2026")} style={{fontFamily:T.sans,fontSize:8,color:T.accent,cursor:"pointer",textDecoration:"underline",textDecorationColor:`${T.accent}30`}}>Manage visibility in Settings</span>
          <span style={{fontFamily:T.sans,fontSize:8,color:T.ink4}}>{"\u00B7"}</span>
          <span onClick={()=>{setGhostMode(g=>!g);pToast(ghostMode?"Visible":"Ghost mode on");}} style={{fontFamily:T.sans,fontSize:8,color:ghostMode?T.plum:T.ink4,cursor:"pointer",textDecoration:"underline",textDecorationColor:`${ghostMode?T.plum:T.ink4}30`}}>{ghostMode?"\uD83D\uDC7B Ghost mode on":"\uD83D\uDC41 Currently visible"}</span>
        </div>
      </div>
      </>}
    </section>

    {/* ═══ TRENDING ═══ */}
    <section style={{marginBottom:32}}>
      <div className="sec-head" style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
        <h2 style={{fontFamily:T.serif,fontSize:18,fontWeight:700,color:T.ink}}>{"\uD83D\uDD25"} Trending this week</h2>
      </div>
      <div className="eg" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
        {TRENDING.map((b,i)=><div key={b.id} className="ex-card" style={{padding:14,borderRadius:12,background:T.card,border:`1px solid ${T.border}`,cursor:"pointer",position:"relative"}} onClick={()=>pToast(`Opening ${b.title}\u2026`)}>
          {i<3&&<div style={{position:"absolute",top:10,right:10,width:20,height:20,borderRadius:"50%",background:`${T.gold}12`,border:`1px solid ${T.gold}20`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:T.sans,fontSize:9,fontWeight:800,color:T.gold}}>{i+1}</div>}
          <div style={{width:38,height:56,borderRadius:"1px 4px 4px 1px",background:`linear-gradient(145deg,${T.accent}CC,#6B2A10)`,boxShadow:"2px 0 6px rgba(0,0,0,.3)",marginBottom:10}}/>
          <div style={{fontFamily:T.serif,fontSize:12,fontWeight:700,color:T.ink,lineHeight:1.2,marginBottom:2}}>{b.title}</div>
          <div style={{fontFamily:T.body,fontSize:10,color:T.ink3,fontStyle:"italic",marginBottom:6}}>{b.author}</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6,fontFamily:T.sans,fontSize:9,color:T.ink4}}><span>{b.readers} readers</span><span style={{color:T.green,fontWeight:700}}>{b.heat}</span></div>
          <span style={{display:"inline-block",marginTop:6,padding:"2px 7px",borderRadius:4,fontSize:8,fontWeight:600,fontFamily:T.sans,color:T.ink4,background:T.bg3}}>{b.genre}</span>
        </div>)}
      </div>
    </section>

    {/* ═══ CURATED SHELVES ═══ */}
    <section style={{marginBottom:32}}>
      <div className="sec-head" style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
        <h2 style={{fontFamily:T.serif,fontSize:18,fontWeight:700,color:T.ink}}>{"\u25C6"} Curated shelves</h2>
        <span style={{fontFamily:T.sans,fontSize:10,color:T.accent,cursor:"pointer",fontWeight:600}} onClick={()=>pToast("Opening all shelves\u2026")}>See all {"\u203A"}</span>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {SHELVES.map(s=>{const isSh=shelved[s.id];
        return <div key={s.id} className="ex-card" style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:14,padding:"18px 20px"}}>
          <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
            <div style={{flex:1}}>
              <div style={{fontFamily:T.serif,fontSize:15,fontWeight:700,color:T.ink,marginBottom:3}}>{s.name}</div>
              <div style={{fontFamily:T.body,fontSize:12,color:T.ink3,fontWeight:300,fontStyle:"italic",lineHeight:1.5,marginBottom:8}}>{s.desc}</div>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <span onClick={()=>pToast(`Opening ${s.curator}\u2019s profile\u2026`)} style={{fontFamily:T.sans,fontSize:10,fontWeight:600,color:T.ink2,cursor:"pointer"}}>{s.curator}</span>
                <Badge lens={s.lens}/>
                <span style={{fontFamily:T.sans,fontSize:9,color:T.ink4}}>{"\u00B7"} {s.count} books</span>
              </div>
            </div>
            <button onClick={()=>toggleShelf(s.id)} style={{padding:"6px 14px",borderRadius:8,border:`1px solid ${isSh?`${T.gold}25`:T.border}`,background:isSh?`${T.gold}06`:"transparent",fontFamily:T.sans,fontSize:10,fontWeight:700,color:isSh?T.gold:T.ink3,cursor:"pointer",flexShrink:0,whiteSpace:"nowrap"}}>{isSh?"\u2713 Shelved":"+ Shelf"}</button>
          </div>
          <div style={{display:"flex",gap:4,marginTop:12}}>
            {s.books.map((bk,i)=><div key={i} onClick={()=>pToast(`Opening ${bk}\u2026`)} style={{display:"flex",alignItems:"center",gap:6,padding:"5px 10px",borderRadius:6,background:T.bg3,border:`1px solid ${T.border}`,cursor:"pointer",transition:"border-color .15s"}} onMouseEnter={e=>e.currentTarget.style.borderColor=T.borderHover} onMouseLeave={e=>e.currentTarget.style.borderColor=T.border}>
              <div style={{width:10,height:16,borderRadius:"0 2px 2px 0",background:`linear-gradient(145deg,${[T.accent,T.blue,T.green][i%3]}CC,#2A1A10)`,flexShrink:0}}/>
              <span style={{fontFamily:T.sans,fontSize:9,fontWeight:600,color:T.ink2,whiteSpace:"nowrap"}}>{bk}</span>
            </div>)}
          </div>
        </div>;})}
      </div>
    </section>

    {/* ═══ READERS LIKE YOU ═══ */}
    <section>
      <div className="sec-head" style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
        <h2 style={{fontFamily:T.serif,fontSize:18,fontWeight:700,color:T.ink}}>{"\u2727"} Readers like you</h2>
        <span style={{fontFamily:T.sans,fontSize:9,color:T.ink4}}>Based on your lens + reading</span>
      </div>
      <div className="hscroll" style={{display:"flex",gap:10,paddingBottom:4}}>
        {ALL_READERS.filter(u=>u.isFriend).sort((a,b)=>b.mutuals-a.mutuals).slice(0,5).map(u=>{const isF=following[u.id];
        return <div key={u.id} className="ex-card" style={{minWidth:180,background:T.card,border:`1px solid ${T.border}`,borderRadius:14,padding:"16px 14px",textAlign:"center",flexShrink:0}}>
          <div style={{display:"flex",justifyContent:"center",marginBottom:8}}><Av i={u.initials} ink={u.ink} s={44}/></div>
          <div style={{fontFamily:T.sans,fontSize:12,fontWeight:700,color:T.ink}}>{u.name}</div>
          <div style={{fontFamily:T.sans,fontSize:10,color:T.ink4,marginBottom:4}}>{u.handle}</div>
          <Badge lens={u.lens}/>
          <div style={{fontFamily:T.body,fontSize:10,color:T.ink3,fontWeight:300,fontStyle:"italic",marginTop:6,lineHeight:1.4}}>{u.bio}</div>
          <button onClick={()=>toggleFollow(u.id)} style={{marginTop:10,padding:"6px 18px",borderRadius:8,border:`1px solid ${isF?`${T.green}25`:T.border}`,background:isF?`${T.green}06`:"transparent",fontFamily:T.sans,fontSize:10,fontWeight:700,color:isF?T.green:T.ink3,cursor:"pointer",width:"100%"}}>{isF?"\u2713 Following":"Follow"}</button><button onClick={()=>pToast("Opening conversation\u2026")} style={{padding:"6px 10px",borderRadius:8,border:`1px solid ${T.border}`,background:"transparent",fontFamily:T.sans,fontSize:10,fontWeight:600,color:T.ink3,cursor:"pointer"}} aria-label="Message">{"\u2709"}</button>
        </div>;})}
      </div>
    </section>

  </main>

  {/* MOBILE BOTTOM NAV */}
  <nav className="mob-nav" aria-label="Mobile navigation" style={{position:"fixed",bottom:0,left:0,right:0,zIndex:200,background:`${T.bg}F2`,backdropFilter:"blur(20px)",borderTop:`1px solid ${T.border}`,display:"none",padding:"6px 0 env(safe-area-inset-bottom,8px)"}}>
    <div style={{display:"flex",justifyContent:"space-around",maxWidth:480,margin:"0 auto"}}>
      {[{id:"feed",icon:"\u25A3",label:"Feed",active:false},{id:"explore",icon:"\uD83C\uDF0D",label:"Explore",active:true},{id:"press",icon:"\uD83D\uDCF0",label:"The Press",active:false},{id:"compose",icon:"\u270D",label:"Write",active:false},{id:"shelf",icon:"\u25C6",label:"Shelf",active:false},{id:"profile",icon:"\u25CF",label:"Profile",active:false}].map(n=><button key={n.id} onClick={()=>pToast(n.active?"":`Opening ${n.label}\u2026`)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"6px 12px",border:"none",background:"none",cursor:"pointer",minWidth:48,minHeight:44}}>
        <span style={{fontSize:18,opacity:n.active?1:.5}}>{n.icon}</span>
        <span style={{fontFamily:T.sans,fontSize:9,fontWeight:n.active?700:500,color:n.active?T.gold:T.ink4}}>{n.label}</span>
      </button>)}
    </div>
  </nav>
  </div>;
}

