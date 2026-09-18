(() => {
  const button = document.getElementById('copy-prompt');
  const prompt = document.getElementById('speaker-prompt');
  const status = document.getElementById('copy-status');
  if (!button || !prompt || !status) return;
  button.hidden = false;
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(prompt.textContent);
      status.textContent = 'Prompt copied.';
    } catch {
      const range = document.createRange();
      range.selectNodeContents(prompt);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = 'Prompt selected. Copy with Ctrl+C, Command+C, or your device’s Copy menu.';
    }
  });
})();
