    let appVersion = 'unknown';

    // Load version from manifest
    fetch('manifest.json')
      .then(res => res.json())
      .then(manifest => {
        appVersion = manifest.version || 'unknown';
        document.getElementById('app-version').textContent = `v${appVersion}`;
      })
      .catch(() => {
        document.getElementById('app-version').textContent = `(${appVersion})`;
      });

    (function(){
      const input = document.getElementById('letters');
      const button = document.getElementById('solve');
      const list = document.getElementById('list');
      const count = document.getElementById('count');
      const chips = document.getElementById('chips');
      const results = document.getElementById('results');
      const modeRadios = document.querySelectorAll('input[name="mode"]');
      const hint = document.getElementById('hint');
      const wordlePanel = document.getElementById('wordlePanel');

      function getMode(){
        return document.querySelector('input[name="mode"]:checked').value;
      }

function updateHint(){

    switch(getMode()){

        case "anagram":
            hint.textContent =
                "Anagram: enter 3–15 letters. Solve enables at 3+ letters.";
            break;

        case "finder":
            hint.textContent =
                "Word Finder: ENTER LETTERS, or SPACE for wildcard '?'.";
            break;

        case "wordle":
            hint.textContent =
                "Enter your guesses, then double-click squares to change Grey → Yellow → Green.";
            break;
    }
}

function showCurrentMode() {

    const wordle = getMode() === "wordle";

    input.style.display = wordle ? "none" : "";
    chips.style.display = wordle ? "none" : "";
    wordlePanel.style.display = wordle ? "block" : "none";
}

      function setValidityAndButton(){
        const mode = getMode();
        const val = input.value;
        let valid = false;

        if(mode === 'anagram'){
          valid = (val.length >= 3);
        } else {
          valid = (val.includes('?')); // no minimum letters, just at least one wildcard
        }

        input.classList.toggle('valid', valid);
        input.classList.toggle('invalid', !valid && val.length > 0);
        button.disabled = !valid;
      }

      function updateUI(){
        const mode = getMode();
        UI.renderChips(input.value, mode);
        setValidityAndButton();
      }

      input.addEventListener('input', ()=>{
        const mode = getMode();
        const cleaned = (mode==='anagram') ? Anagram.sanitize(input.value) : Finder.sanitize(input.value);
        if(cleaned !== input.value) input.value = cleaned;
        updateUI();
      });

      input.addEventListener('keydown', (e)=>{
        if(e.key === 'Enter' && !button.disabled){
          e.preventDefault();
          button.click();
        }
      });

      button.addEventListener('click', ()=>{
        if(button.disabled) return;
        results.setAttribute('aria-busy','true');
        const mode = getMode();
        const val = input.value;

        if(mode === 'anagram'){
          const sig = Anagram.signature(val);
          const matches = (window.DICTIONARYMAP && window.DICTIONARYMAP[sig]) ? window.DICTIONARYMAP[sig] : [];
          UI.renderResults(matches);
        } else {
          const regex = new RegExp('^' + val.replace(/\?/g, '.') + '$', 'i');
          const words = Array.isArray(window.DICTIONARY) ? window.DICTIONARY : [];
          const matches = words.filter(w => regex.test(w));
          UI.renderResults(matches);
        }

        results.setAttribute('aria-busy','false');
        setValidityAndButton();
      });

      modeRadios.forEach(radio=>{
        radio.addEventListener('change', ()=>{
          input.value = '';
          UI.clearResults();
          updateHint();
          showCurrentMode();
        });
      });

      // init
      Wordle.createGrid();
      showCurrentMode();
      updateHint();
      input.value = '';
    })();

