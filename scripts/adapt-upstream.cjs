// Regenerate live CSS from the cloned MIT-licensed After Dark CSS sources.
// Retains upstream timing, route keyframes, and launch positions; replaces sprite frame animation.
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
let result='/* Adapted from bryanbraun/after-dark-css (MIT). See THIRD-PARTY-NOTICES.md. */\n';
for(const [file,scope] of [['flying-toasters','toilets'],['fish','swamp']]){
 const html=fs.readFileSync(path.join(root,'upstream',file+'.html'),'utf8');
 const css=html.match(/<style>([\s\S]*?)<\/style>/)[1].replace(/\/\*[\s\S]*?\*\//g,'');
 const names=[...css.matchAll(/@keyframes\s+([\w-]+)/g)].map(m=>m[1]);
 let cursor=0;
 while(cursor<css.length){const open=css.indexOf('{',cursor);if(open<0)break;let depth=1,end=open+1;while(depth&&end<css.length){if(css[end]==='{')depth++;else if(css[end]==='}')depth--;end++}let selector=css.slice(cursor,open).trim(),body=css.slice(open+1,end-1);cursor=end;
  if(selector.startsWith('@-')||selector==='body')continue;
  if(selector.startsWith('@keyframes')){if(/\b(flap|toggle|bubble-alt)$/.test(selector))continue;selector=selector.replace('@keyframes ','@keyframes ad-')}
  else selector=selector.split(',').map(s=>'#world.upstream-'+scope+' '+s.trim()).join(',');
  body=body.replace(/-(?:webkit|moz|ms|o)-[\w-]+\s*:[^;{}]*;/g,'').replace(/background-image\s*:[^;]*;/g,'');
  body=body.replace(/animation\s*:([^;]+);/g,(_,value)=>{value=value.split(',').filter(v=>!/^\s*(flap|toggle|bubble-alt)\b/.test(v)).join(',');for(const n of names)value=value.replace(new RegExp('\\b'+n+'\\b','g'),'ad-'+n);value=value.replace(/(\d*\.?\d+)s\b/g,'calc($1s / var(--speed))');return 'animation:'+value+';'});
  result+=selector+'{'+body+'}\n';
 }
}
fs.writeFileSync(path.join(root,'upstream.css'),result.replace(/[ \t]+$/gm,'').replace(/\n{3,}/g,'\n\n'));
console.log('Generated upstream.css from the two cloned screensavers.');
