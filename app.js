// API KEYS (fixed as provided by you)


function drawFishChart(data){
const ctx = document.getElementById('chart').getContext('2d');
try{ window.fishChart && window.fishChart.destroy(); }catch(e){}
const counts = {};
data.forEach(d=> counts[d.species] = (counts[d.species]||0) + (d.count||1));
const labels = Object.keys(counts).slice(0,10);
const values = labels.map(l=>counts[l]);
window.fishChart = new Chart(ctx, {
type:'bar', data:{labels, datasets:[{label:'Relative count', data:values}]}, options:{responsive:true,plugins:{legend:{display:false}}}
});
}


function renderWeatherAndAdvice(weather){
const el = document.getElementById('weather-block');
if(!weather){ el.innerHTML = '<em>Weather unavailable</em>'; return; }
const now = weather.current || weather[0];
const temp = now.temp || (now.main && now.main.temp);
const wind = (now.wind_speed|| now.wind && now.wind.speed) || 0;
const pop = (weather.hourly && weather.hourly[0] && weather.hourly[0].pop) || 0;


el.innerHTML = `
<h4>Weather</h4>
<div>Temp: ${Math.round(temp-273.15)}°C</div>
<div>Wind: ${wind} m/s</div>
<div>Precipitation chance: ${Math.round(pop*100)}%</div>
`;


// basic fishing advice rules
const advice = evaluateFishingSuitability({temp:temp-273.15,wind,pop});
el.innerHTML += `<h4>Fishing Suitability</h4><div>${advice.message}</div>`;
}


function evaluateFishingSuitability({temp,wind,pop}){
// Simple scoring rules — you can refine these
let score = 100;
if(pop>0.4) score -= 60;
if(wind>8) score -= 40;
if(temp < 5 || temp > 40) score -= 30;


if(score>70) return {ok:true,message:'Good for fishing — conditions look favorable.'};
if(score>40) return {ok:false,message:'Moderate — be cautious, check local forecasts.'};
return {ok:false,message:'Poor — not recommended due to weather/climate.'};
}


function onZoomChange(){
// show/hide small markers when zoom is low for performance
}


function onSearch(e){
const q = e.target.value.toLowerCase().trim();
if(!q) return;
fetch('/api/waterbodies').then(r=>r.json()).then(list=>{
const match = list.find(x => (x.name||'').toLowerCase().includes(q));
if(match && match.latitude && match.longitude){
map.setView([match.latitude, match.longitude],10);
showInfo(match);
}
});
}


function showNotification(text, timeout=4000){
const n = document.getElementById('notification');
n.innerText = text; n.classList.remove('hidden');
setTimeout(()=>n.classList.add('hidden'), timeout);
}


window.addEventListener('load', init);