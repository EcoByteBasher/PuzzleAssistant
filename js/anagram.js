      function sanitizeAnagram(str){
        const letters = (str.match(/[a-z]/gi) || []).join('').toUpperCase();
        return letters.slice(0, 15);
      }

      function signature(str){
        return str.split('').sort().join('');
      }

window.Anagram = {
    sanitize: sanitizeAnagram,
    signature: signature
};
