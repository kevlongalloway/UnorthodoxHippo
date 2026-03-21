import { useState, useEffect } from "react";

// ═══════════════════════════════════════════════════
// THEME SYSTEM
// ═══════════════════════════════════════════════════
const THEMES={
  twilight:{id:"twilight",name:"Twilight Ink",icon:"\u263E",bg:"#161D2E",bg2:"#1C2438",bg3:"#232D44",card:"#1A2236",cardHover:"#1E2840",border:"rgba(212,168,85,0.09)",borderHover:"rgba(212,168,85,0.18)",gold:"#D4A855",goldDim:"rgba(212,168,85,0.45)",goldGlow:"rgba(212,168,85,0.08)",accent:"#C47232",accentHover:"#D4832F",ink:"#E8E2D6",ink2:"#C8C0B0",ink3:"#8A8474",ink4:"#5E5A4E",green:"#6A9A60",red:"#C45A4A",blue:"#5A8AB4",plum:"#9A70A0",teal:"#4EA8A0",rose:"#C47A8A",serif:"'Playfair Display',Georgia,serif",body:"'Source Serif 4',Georgia,serif",sans:"'DM Sans',system-ui,sans-serif"},
  parchment:{id:"parchment",name:"Warm Parchment",icon:"\u2600",bg:"#F7F3EC",bg2:"#EFEBE3",bg3:"#E7E1D6",card:"#FFFDF8",cardHover:"#FEFBF4",border:"rgba(180,160,120,0.2)",borderHover:"rgba(180,160,120,0.35)",gold:"#B8860B",goldDim:"rgba(184,134,11,0.5)",goldGlow:"rgba(184,134,11,0.06)",accent:"#B85A32",accentHover:"#D06838",ink:"#2C2418",ink2:"#3D3226",ink3:"#7A6E5E",ink4:"#A89C88",green:"#5A7A4A",red:"#A0422E",blue:"#4A6A8A",plum:"#7A5070",teal:"#3A8A7A",rose:"#A0506A",serif:"'Playfair Display',Georgia,serif",body:"'Source Serif 4',Georgia,serif",sans:"'DM Sans',system-ui,sans-serif"},
  stone:{id:"stone",name:"Stone & Sage",icon:"\u25D2",bg:"#EDEBE6",bg2:"#E2DFD8",bg3:"#D6D2CA",card:"#F5F3EE",cardHover:"#F0EDE6",border:"rgba(140,130,110,0.22)",borderHover:"rgba(140,130,110,0.38)",gold:"#8A7A4A",goldDim:"rgba(138,122,74,0.5)",goldGlow:"rgba(138,122,74,0.07)",accent:"#B05A3A",accentHover:"#C86842",ink:"#2A2A24",ink2:"#3E3E36",ink3:"#72706A",ink4:"#9A968C",green:"#4A7A56",red:"#A0493A",blue:"#506A80",plum:"#7A5A6A",teal:"#3A8878",rose:"#8A5060",serif:"'Playfair Display',Georgia,serif",body:"'Source Serif 4',Georgia,serif",sans:"'DM Sans',system-ui,sans-serif"},
  editorial:{id:"editorial",name:"Editorial Mono",icon:"\u25A0",bg:"#FAF9F7",bg2:"#F2F0EC",bg3:"#E8E6E0",card:"#FFFFFF",cardHover:"#FCFBF9",border:"rgba(120,110,100,0.15)",borderHover:"rgba(120,110,100,0.28)",gold:"#1A1A1A",goldDim:"rgba(26,26,26,0.45)",goldGlow:"rgba(0,0,0,0.03)",accent:"#C44A20",accentHover:"#D85828",ink:"#1A1A1A",ink2:"#2E2E2E",ink3:"#6A6A6A",ink4:"#9A9A9A",green:"#2A6A4A",red:"#C44A20",blue:"#2A4A7A",plum:"#6A3A6A",teal:"#2A7A6A",rose:"#8A3A5A",serif:"'Playfair Display',Georgia,serif",body:"'Source Serif 4',Georgia,serif",sans:"'DM Sans',system-ui,sans-serif"},
};
const THEME_KEY="precis-theme";
function useTheme(){
  const[tid,setTid]=useState(()=>{try{return localStorage.getItem(THEME_KEY)||"twilight"}catch{return"twilight"}});
  useEffect(()=>{try{localStorage.setItem(THEME_KEY,tid)}catch{}},[tid]);
  return{theme:THEMES[tid]||THEMES.twilight,tid,setTid};
}

const LENSES={analyst:{icon:"\uD83D\uDD2C",label:"Analyst",color:"#5B9BD5"},empath:{icon:"\uD83D\uDC96",label:"Empath",color:"#D4788C"},philosopher:{icon:"\uD83D\uDCA1",label:"Philosopher",color:"#D4A855"},storyteller:{icon:"\uD83C\uDFAD",label:"Storyteller",color:"#9B7ED4"},explorer:{icon:"\uD83D\uDDFA\uFE0F",label:"Explorer",color:"#5BAD7A"},alchemist:{icon:"\u2727",label:"Alchemist",color:"#C4A06A"}};
const TIERS=[{min:0,name:"Fresh Ink",color:"#8A8474"},{min:25,name:"Wet Ink",color:"#8BAAB8"},{min:100,name:"Set Ink",color:"#A0C090"},{min:500,name:"Deep Ink",color:"#D4A855"},{min:2000,name:"Indelible",color:"#C47232"}];
function getTier(n){for(let i=TIERS.length-1;i>=0;i--)if(n>=TIERS[i].min)return TIERS[i];return TIERS[0];}

const NAV_TABS=[
  {id:"feed",label:"Feed",icon:"\u229E"},
  {id:"explore",label:"Explore",icon:"\u25CE"},
  {id:"press",label:"The Press",icon:"\u270D"},
  {id:"compass",label:"Compass",icon:"\u2316"},
  {id:"shelf",label:"My Shelf",icon:"\u25A4"},
];

function ThemeSwitcher({T,tid,setTid}){
  return (
    <div style={{display:"flex",gap:4}}>
      {Object.values(THEMES).map(t => (
        <button key={t.id} onClick={()=>setTid(t.id)} title={t.name}
          style={{width:24,height:24,borderRadius:"50%",border:tid===t.id?`2px solid ${T.gold}`:`1.5px solid ${T.border}`,background:t.bg,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,transition:"all .2s"}}>
          {t.icon}
        </button>
      ))}
    </div>
  );
}

function NotifBell({T,count=0,onClick}){
  return (
    <button onClick={onClick}
      style={{position:"relative",background:"none",border:"none",cursor:"pointer",padding:"4px 6px",fontSize:16,color:count>0?T.gold:T.ink3,transition:"color .2s"}}
      title={count>0?`${count} unread notifications`:"Notifications"}>
      {"\uD83D\uDD14"}
      {count>0 && (
        <span style={{position:"absolute",top:0,right:0,minWidth:16,height:16,borderRadius:8,background:T.accent,color:"#fff",fontSize:9,fontWeight:700,fontFamily:T.sans,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 4px"}}>
          {count>99?"99+":count}
        </span>
      )}
    </button>
  );
}

function NavAvatar({T,user,onClick}){
  const tier=getTier(user.ink);
  const lens=LENSES[user.lens];
  return (
    <button onClick={onClick}
      style={{display:"flex",alignItems:"center",gap:8,background:"none",border:"none",cursor:"pointer",padding:"4px 8px",borderRadius:8,transition:"background .2s"}}
      onMouseEnter={e=>e.currentTarget.style.background=T.bg3}
      onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
      <div style={{width:30,height:30,borderRadius:"50%",background:`linear-gradient(160deg,${T.bg3},${T.bg2})`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:T.sans,fontSize:11,fontWeight:700,color:T.ink2,border:`1.5px solid ${tier.color}30`,flexShrink:0}}>
        {user.initials}
      </div>
      <div className="nav-user-info" style={{textAlign:"left"}}>
        <div style={{fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.ink,lineHeight:1.2}}>{user.name}</div>
        <div style={{display:"flex",alignItems:"center",gap:4}}>
          {lens && <span style={{fontSize:9}}>{lens.icon}</span>}
          <span style={{fontFamily:T.sans,fontSize:9,color:tier.color,fontWeight:600}}>{"\u25C6"} {user.ink.toLocaleString()}</span>
        </div>
      </div>
    </button>
  );
}

// ═══════════════════════════════════════════════════
// PRÉCIS NAV — the reusable component
// ═══════════════════════════════════════════════════
function PrecisNav({T,tid,setTid,activeTab="feed",onNavigate=()=>{},user={name:"Reader",initials:"R",ink:0,lens:"philosopher"},unreadNotifs=0,streak=0,showSearch=true,foundingMember=false}){
  const[searchOpen,setSearchOpen]=useState(false);
  const[searchVal,setSearchVal]=useState("");

  return (
    <nav style={{padding:"0 20px",height:56,display:"flex",alignItems:"center",gap:8,borderBottom:`1px solid ${T.border}`,background:`${T.bg}F2`,backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",position:"sticky",top:0,zIndex:100}}>
      <div style={{display:"flex",alignItems:"center",gap:6,marginRight:8,flexShrink:0,cursor:"pointer"}} onClick={()=>onNavigate("feed")}>
        <span style={{fontFamily:T.serif,fontSize:17,fontWeight:700,color:T.gold}}>Pr{"\u00E9"}cis</span>
        {foundingMember && <span style={{fontSize:9,color:T.gold}}>{"\u2B50"}</span>}
      </div>
      <div style={{display:"flex",gap:2,flex:"0 0 auto"}}>
        {NAV_TABS.map(tab => (
          <button key={tab.id} onClick={()=>onNavigate(tab.id)}
            style={{padding:"6px 12px",borderRadius:8,border:"none",background:activeTab===tab.id?T.goldGlow:"transparent",color:activeTab===tab.id?T.gold:T.ink3,fontFamily:T.sans,fontSize:11,fontWeight:activeTab===tab.id?700:500,cursor:"pointer",transition:"all .2s",display:"flex",alignItems:"center",gap:5}}
            onMouseEnter={e=>{if(activeTab!==tab.id)e.currentTarget.style.color=T.ink2}}
            onMouseLeave={e=>{if(activeTab!==tab.id)e.currentTarget.style.color=T.ink3}}>
            <span style={{fontSize:12}}>{tab.icon}</span>
            <span className="nav-tab-label">{tab.label}</span>
          </button>
        ))}
      </div>
      <div style={{flex:1}}/>
      {showSearch && (searchOpen ? (
        <div style={{display:"flex",alignItems:"center",gap:6,background:T.bg2,borderRadius:8,border:`1px solid ${T.border}`,padding:"0 10px"}}>
          <span style={{fontSize:12,color:T.ink4}}>{"\uD83D\uDD0D"}</span>
          <input autoFocus value={searchVal} onChange={e=>setSearchVal(e.target.value)}
            onBlur={()=>{if(!searchVal)setSearchOpen(false);}}
            onKeyDown={e=>{if(e.key==="Escape"){setSearchVal("");setSearchOpen(false);}}}
            placeholder="Search books, readers, reviews..."
            style={{background:"none",border:"none",outline:"none",color:T.ink,fontFamily:T.sans,fontSize:12,width:180,padding:"7px 0"}}/>
        </div>
      ) : (
        <button onClick={()=>setSearchOpen(true)}
          style={{background:"none",border:"none",cursor:"pointer",padding:"4px 8px",fontSize:14,color:T.ink3}}
          onMouseEnter={e=>e.currentTarget.style.color=T.ink}
          onMouseLeave={e=>e.currentTarget.style.color=T.ink3}>
          {"\uD83D\uDD0D"}
        </button>
      ))}
      <button onClick={()=>onNavigate("compose")}
        style={{padding:"6px 14px",borderRadius:8,border:"none",background:`linear-gradient(135deg,${T.gold},${T.accent})`,color:"#1A1A1A",fontFamily:T.sans,fontSize:11,fontWeight:700,cursor:"pointer",transition:"all .2s",flexShrink:0}}
        onMouseEnter={e=>e.currentTarget.style.transform="translateY(-1px)"}
        onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
        {"\u270F\uFE0F"} Write
      </button>
      {streak>0 && (
        <div style={{display:"flex",alignItems:"center",gap:3,padding:"4px 8px",borderRadius:6,background:`${T.accent}12`,flexShrink:0}} title={`${streak}-day reading streak`}>
          <span style={{fontSize:11}}>{"\uD83D\uDD25"}</span>
          <span style={{fontFamily:T.sans,fontSize:10,fontWeight:700,color:T.accent}}>{streak}</span>
        </div>
      )}
      <NotifBell T={T} count={unreadNotifs} onClick={()=>onNavigate("notifications")}/>
      <ThemeSwitcher T={T} tid={tid} setTid={setTid}/>
      <NavAvatar T={T} user={user} onClick={()=>onNavigate("profile")}/>
      <style>{`@media(max-width:680px){.nav-tab-label{display:none!important;}.nav-user-info{display:none!important;}}`}</style>
    </nav>
  );
}

// ═══════════════════════════════════════════════════
// DEMO WRAPPER — default export, runs standalone
// ═══════════════════════════════════════════════════
export default function PrecisNavDemo(){
  const{theme:T,tid,setTid}=useTheme();
  const[activeTab,setActiveTab]=useState("feed");
  const[lastNav,setLastNav]=useState("");
  const[toast,setToast]=useState("");

  const navigate=(tab)=>{setActiveTab(tab);setLastNav(tab);setToast(`Navigating to ${tab}\u2026`);setTimeout(()=>setToast(""),2000);};
  const user={name:"Sean",initials:"S",ink:340,lens:"philosopher"};

  return (
    <div style={{minHeight:"100vh",background:T.bg}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Source+Serif+4:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}body{background:${T.bg};}
        @keyframes fadeUp{from{opacity:0;transform:translate(-50%,8px)}to{opacity:1;transform:translate(-50%,0)}}
      `}</style>

      <PrecisNav T={T} tid={tid} setTid={setTid} activeTab={activeTab} onNavigate={navigate} user={user} unreadNotifs={3} streak={7} foundingMember={true}/>

      <div style={{maxWidth:600,margin:"0 auto",padding:"60px 24px",textAlign:"center"}}>
        <div style={{fontFamily:T.serif,fontSize:28,fontWeight:700,color:T.ink,marginBottom:12}}>Shared Navigation</div>
        <div style={{fontFamily:T.body,fontSize:14,color:T.ink3,lineHeight:1.7,marginBottom:40}}>
          This nav bar drops into every Pr{"\u00E9"}cis build. Click any element to see cross-build navigation. Switch themes to verify visual consistency across all four palettes.
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,textAlign:"left"}}>
          {[
            {icon:"\u229E",label:"Tab Navigation",desc:"Feed, Explore, Compass, My Shelf \u2014 active state highlights in gold across all themes"},
            {icon:"\uD83D\uDD0D",label:"Collapsible Search",desc:"Click magnifier to expand. Escape or blur to collapse. Consistent across all builds."},
            {icon:"\uD83D\uDD14",label:"Notification Bell",desc:"Badge shows unread count. Routes to Notification Center. Accent badge on all themes."},
            {icon:"\u270F\uFE0F",label:"Write Button",desc:"Gradient gold-to-accent. Routes to Compose. Lifts on hover. Always visible."},
            {icon:"\uD83D\uDD25",label:"Streak Badge",desc:"Reading streak counter. Only visible when streak > 0. Accent-tinted background."},
            {icon:"\u25C6",label:"Ink + Lens Avatar",desc:"User initials, Ink tier color ring, lens icon, Ink count. Routes to Profile."},
          ].map((f,i) => (
            <div key={i} style={{padding:16,borderRadius:10,background:T.card,border:`1px solid ${T.border}`,transition:"border-color .2s"}}
              onMouseEnter={e=>e.currentTarget.style.borderColor=T.borderHover}
              onMouseLeave={e=>e.currentTarget.style.borderColor=T.border}>
              <div style={{fontSize:20,marginBottom:8}}>{f.icon}</div>
              <div style={{fontFamily:T.sans,fontSize:12,fontWeight:700,color:T.ink,marginBottom:4}}>{f.label}</div>
              <div style={{fontFamily:T.sans,fontSize:11,color:T.ink3,lineHeight:1.5}}>{f.desc}</div>
            </div>
          ))}
        </div>

        {lastNav && (
          <div style={{marginTop:32,padding:"12px 20px",borderRadius:10,background:T.goldGlow,border:`1px solid ${T.gold}15`,display:"inline-flex",alignItems:"center",gap:8}}>
            <span style={{fontFamily:T.sans,fontSize:12,color:T.gold,fontWeight:600}}>Last navigation: <span style={{color:T.ink}}>{lastNav}</span></span>
          </div>
        )}

        <div style={{marginTop:40,padding:"16px 20px",borderRadius:10,background:T.bg2,border:`1px solid ${T.border}`,textAlign:"left"}}>
          <div style={{fontFamily:T.sans,fontSize:11,fontWeight:700,color:T.ink4,textTransform:"uppercase",letterSpacing:.5,marginBottom:8}}>Integration</div>
          <div style={{fontFamily:T.sans,fontSize:12,color:T.ink3,lineHeight:1.7}}>
            Drop PrecisNav into any build. Pass your theme (T, tid, setTid), set activeTab to the current page, wire onNavigate to your routing. The nav handles responsive breakpoints, theme switching, search, notifications, and avatar rendering.
          </div>
        </div>
      </div>

      {toast && (
        <div style={{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",padding:"10px 20px",borderRadius:10,background:T.card,border:`1px solid ${T.borderHover}`,boxShadow:"0 8px 32px rgba(0,0,0,.3)",fontFamily:T.sans,fontSize:12,fontWeight:600,color:T.ink,zIndex:200,animation:"fadeUp .3s ease"}}>{toast}</div>
      )}
    </div>
  );
}
