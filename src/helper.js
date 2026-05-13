export default function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 2) {
  const words = text.split(' ');
  let line = '';
  const lines = [];

  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' ';
    const testWidth = ctx.measureText(testLine).width;

    if (testWidth > maxWidth && line !== '') {
      lines.push(line.trim());
      line = words[i] + ' ';

      if (lines.length === maxLines - 1) {
        break;
      }
    } else {
      line = testLine;
    }
  }

  lines.push(line.trim());

  lines.forEach((l, index) => {
    ctx.fillText(l, x, y + index * lineHeight);
  });
}