// Copy snippet to clipboard
document.getElementById('copySnippet').addEventListener('click', async () => {
  const snippet = document.getElementById('snippet').value;

  try {
    await navigator.clipboard.writeText(snippet);
    document.getElementById('status').textContent = 'Snippet copied to clipboard!';
  } catch (err) {
    document.getElementById('status').textContent = 'Failed to copy snippet!';
    console.error('Failed to copy text: ', err);
  }

  setTimeout(() => {
    document.getElementById('status').textContent = '';
  }, 2000);
});

// Clear snippet content when close button is clicked
document.getElementById('closeSnippet').addEventListener('click', () => {
  document.getElementById('snippet').value = '';
  chrome.storage.local.remove('savedSnippet', () => {
    window.close(); // 关闭弹出窗口
  });
});

// Ensure snippet content persists across popups
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get('savedSnippet', (data) => {
    if (data.savedSnippet) {
      document.getElementById('snippet').value = data.savedSnippet;
    }
  });

  document.getElementById('snippet').addEventListener('input', () => {
    chrome.storage.local.set({ savedSnippet: document.getElementById('snippet').value });
  });
});
