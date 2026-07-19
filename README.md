# CrosswordAssistant
# Crossword Assistant - README

This project provides a self-contained HTML/JS webpage that works as a Crossword Assistant.  
It has two modes:
- **Anagram Mode**: Find anagrams of 3–15 letters.
- **Word Finder Mode**: Find words that match a pattern with known letters and wildcards (wildcards entered with SPACE).

## Files

- `index.html` — The main webpage. Open directly in your browser, no server needed.
- `dictionarymap.js` — Precomputed dictionary map used for fast anagram solving.
- `dictionarylist.js` — Plain dictionary list used for wildcard pattern solving.

## Workflow

1. Maintain a plain `dictionary.txt` file containing one word per line.  
   Words should be alphabetic, and no longer than 15 characters.

2. Generate `dictionarymap.js` for **Anagram Mode**:  
   ```bash
   node make_dictionarymap.js dictionary.txt dictionarymap.js
   ```

3. Generate `dictionarylist.js` for **Word Finder Mode**:  
   ```bash
   node make_dictionarylist.js dictionary.txt dictionarylist.js
   ```

4. Place all three files (`index.html`, `dictionarymap.js`, `dictionarylist.js`) in the same directory.

5. Open `crossword.html` directly in your browser.

## Usage

- **Anagram Mode**  
  Enter 3–15 letters (alphabetic only). Solve will show all matching anagrams.

- **Word Finder Mode**  
  Enter known letters in order, use SPACE for unknown letters (wildcards).  
  Example: `C??T??` will find words like *CARTON*, *COSTLY*, etc.  
  Solve is enabled as soon as you have typed at least one wildcard character.  
  
