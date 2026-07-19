      function clearResults(){
        list.innerHTML = '';
        count.textContent = '0';
      }

      function renderChips(value, mode){
        chips.innerHTML = '';
        for(let i=0;i<value.length;i++){
          const c = document.createElement('div');
          if(mode==='finder'){
            if(value[i] === '?'){ c.className='chip wild'; c.textContent='?'; }
            else { c.className='chip letter'; c.textContent=value[i]; }
          }else{
            c.className='chip letter';
            c.textContent=value[i];
          }
          chips.appendChild(c);
        }
      }

      function renderResults(words){
        list.innerHTML = '';
        if(!words || words.length === 0){
          count.textContent = '0';
          const li = document.createElement('li');
          li.textContent = 'No matches found';
          list.appendChild(li);
          return;
        }
        const uniq = Array.from(new Set(words)).sort((a,b)=>a.localeCompare(b));
        count.textContent = String(uniq.length);
        for(const w of uniq){
          const li = document.createElement('li');
          li.textContent = w;
          list.appendChild(li);
        }
      }

window.UI = {
    clearResults,
    renderChips,
    renderResults
};
