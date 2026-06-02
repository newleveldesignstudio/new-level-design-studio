export function markdownToHtml(markdown: string): string {
  const lines = markdown.split('\n');
  const out: string[] = [];
  let inList = false;
  let inOl = false;

  const flush = () => {
    if (inList) { out.push('</ul>'); inList = false; }
    if (inOl) { out.push('</ol>'); inOl = false; }
  };

  for (const line of lines) {
    const t = line.trim();

    if (!t || t === '---') { flush(); continue; }

    if (t.startsWith('### ')) { flush(); out.push(`<h3>${fmt(t.slice(4))}</h3>`); continue; }
    if (t.startsWith('## ')) { flush(); out.push(`<h2>${fmt(t.slice(3))}</h2>`); continue; }

    if (t.startsWith('- ')) {
      if (inOl) { out.push('</ol>'); inOl = false; }
      if (!inList) { out.push('<ul>'); inList = true; }
      out.push(`<li>${fmt(t.slice(2))}</li>`);
      continue;
    }

    const ol = t.match(/^(\d+)\.\s+(.+)$/);
    if (ol) {
      if (inList) { out.push('</ul>'); inList = false; }
      if (!inOl) { out.push('<ol>'); inOl = true; }
      out.push(`<li>${fmt(ol[2])}</li>`);
      continue;
    }

    flush();
    out.push(`<p>${fmt(t)}</p>`);
  }

  flush();
  return out.join('\n');
}

function fmt(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*\n]+?)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}
