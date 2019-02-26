document.addEventListener('mouseup', () => {
  const text = document.querySelector('#text');
  const selection = window.getSelection().toString().trim().toLowerCase();

  const punctuation = '.,;:)?';

  const checkHyphenWords = (word) => {
    const subWords = word.split('-');
    const subs = subWords.map((sub) => {
      if (sub.toLowerCase() === selection) return `<span class="highlight">${sub}</span>`;
      return sub;
    });
    return subs.join('-');
  };

  const highlight = text.textContent
    .split(' ')
    .map((word) => {
      const cleanedWord = word.replace(/[.,;:()?]/g, '').toLowerCase();
      const lastChar = word.slice(-1);
      if (word.includes('-')) return checkHyphenWords(word);
      if (cleanedWord === selection) {
        if (punctuation.includes(lastChar)) {
          return `<span class="highlight">${word.slice(0, word.length - 1)}</span>${lastChar}`;
        }
        if (word.slice(0, 1) === '(') {
          return `${'('}<span class="highlight">${word.slice(1, word.length)}</span>`;
        }
        return `<span class="highlight">${word}</span>`;
      }
      return word;
    });
  text.innerHTML = highlight.join(' ');
});
