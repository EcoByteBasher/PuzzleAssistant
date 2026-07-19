      function sanitizeFinder(str){
        const up = str.toUpperCase();
        let out = '';
        for(const ch of up){
          if(/[A-Z]/.test(ch)) out += ch;
          else if(ch === ' ' || ch === '?') out += '?';
          else continue;
          if(out.length >= 15) break;
        }
        return out;
      }

window.Finder = {
    sanitize: sanitizeFinder
};

