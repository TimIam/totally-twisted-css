(async()=>{
 const checks=[];
 const assert=(condition,name)=>{if(!condition)throw new Error(name);checks.push(name)};
 const original=localStorage.getItem('twisted.v1');
 const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
 let variants=0;
 try{
  for(const m of modules){select(m.id);assert(document.getElementById('world').children.length>0,m.name+' renders');for(const choice of m.choices){const control=document.getElementById('variant');control.value=choice;control.dispatchEvent(new Event('change',{bubbles:true}));assert(variant()===choice,m.name+': '+choice);variants++;}if(m.fractal){drawFractal(1);const c=document.querySelector('canvas'),p=c.getContext('2d').getImageData(0,0,c.width,c.height).data;assert(p.some((v,i)=>i%4!==3&&v>30),m.name+' has visible pixels')}}
  select('toilets');assert(document.getElementById('world').className==='upstream-toilets','Cloned flight CSS active');await wait(80);assert(document.getAnimations().some(a=>a.animationName==='ad-fly'),'Upstream flight keyframes running');
  const speed=document.getElementById('speed');speed.value='1.5';speed.dispatchEvent(new Event('input',{bubbles:true}));assert(state.speed===1.5,'Speed control');
  const density=document.getElementById('density');density.value='10';density.dispatchEvent(new Event('input',{bubbles:true}));assert(document.querySelectorAll('.toaster,.toast').length===38,'Population changes cast');
  pause();assert(document.body.classList.contains('paused'),'Pause sets state');assert(document.querySelector('.toaster')&&getComputedStyle(document.querySelector('.toaster')).animationPlayState==='paused','Pause freezes upstream CSS');pause();
  select('message');const msg=document.getElementById('message');msg.value='<img src=x onerror=alert(1)>';msg.dispatchEvent(new Event('input',{bubbles:true}));assert(document.querySelector('.graffiti').textContent===msg.value&&!document.querySelector('.graffiti img'),'Message is safe literal text');
  select('mime');const target=document.querySelector('.mime');target.click();assert(state.score===1,'Mime hit scores');
  document.getElementById('aboutButton').click();assert(document.getElementById('about').open,'About opens');document.getElementById('closeAbout').click();
  await startSaver();await wait(80);assert(state.saving&&document.body.classList.contains('saving'),'Full viewport playback');document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));await wait(100);assert(!state.saving,'Escape exits playback');
  assert(document.documentElement.scrollWidth<=innerWidth,'No horizontal page overflow');
  const image=new Image();image.src='assets/twisted-sprites.png';await image.decode();assert(image.naturalWidth>1000&&image.naturalWidth===image.naturalHeight,'Generated atlas loads at expected resolution');
  return {passed:checks.length,scenes:modules.length,variants,viewport:[innerWidth,innerHeight],checks};
 }finally{if(original===null)localStorage.removeItem('twisted.v1');else localStorage.setItem('twisted.v1',original);location.reload()}
})()
