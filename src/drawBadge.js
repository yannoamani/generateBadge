import config from './badgeConfig';
import drawWrappedText from './helper';

// ─────────────────────────────────────────────────────────────
// Rounded rectangle helper
// ─────────────────────────────────────────────────────────────
function roundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// ─────────────────────────────────────────────────────────────
// Auto font size helper
// ─────────────────────────────────────────────────────────────
function fitText(ctx, text, maxWidth, baseSize, weight = 'bold') {
  let size = baseSize;

  do {
    ctx.font = `${weight} ${size}px Poppins`;
    size--;
  } while (ctx.measureText(text).width > maxWidth && size > 12);

  return size;
}


// ─────────────────────────────────────────────────────────────
// Draw circular image
// ─────────────────────────────────────────────────────────────
function drawCirclePhoto(ctx, img, cx, cy, radius) {
  ctx.save();

  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();

  if (img) {
    const ar = img.width / img.height;

    let sw, sh, sx, sy;

    if (ar > 1) {
      sh = img.height;
      sw = sh;
      sx = (img.width - sw) / 2;
      sy = 0;
    } else {
      sw = img.width;
      sh = sw;
      sx = 0;
      sy = (img.height - sh) / 2;
    }

    ctx.drawImage(
      img,
      sx,
      sy,
      sw,
      sh,
      cx - radius,
      cy - radius,
      radius * 2,
      radius * 2
    );
  } else {
    ctx.fillStyle = '#64748b';
    ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 52px Poppins';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('?', cx, cy);
  }

  ctx.restore();
}

// ─────────────────────────────────────────────────────────────
// Main draw function
// ─────────────────────────────────────────────────────────────
export function drawBadge(
  canvas,
  {
    photoImg,
    prenom,
    nom,
    ddn,
    role, 
    sexe
  }
) {

  const ctx = canvas.getContext('2d');

  const W = config.badgeWidth;
  const H = config.badgeHeight;

  const c = config.colors;
  const fs = config.fontSizes;

  canvas.width = W;
  canvas.height = H;

  // ==========================================================
  // BACKGROUND
  // ==========================================================

const grad = ctx.createLinearGradient(0, 0, W, H);

grad.addColorStop(0, sexe === 'Masculin' ? 'black' : 'pink');   // bleu nuit profond
grad.addColorStop(0.5,  sexe === 'Masculin' ? '#1e3a8a' : 'indigo'); // bleu royal doux
grad.addColorStop(1,  sexe === 'Masculin' ? '#0f766e' : 'indigo');   // vert/teal spirituel

ctx.fillStyle = grad;
roundedRect(ctx, 0, 0, W, H, 36);
ctx.fill();

  // ==========================================================
  // GLASS EFFECT CARD
  // ==========================================================

  ctx.save();

  ctx.fillStyle = 'rgba(255,255,255,0.05)';
  ctx.strokeStyle = 'rgba(255,255,255,0.08)';
  ctx.lineWidth = 1.2;

  roundedRect(ctx, 18, 18, W - 36, H - 36, 28);

  ctx.fill();
  ctx.stroke();

  ctx.restore();

  // ==========================================================
  // WATERMARK
  // ==========================================================

  ctx.save();

  ctx.globalAlpha = 0.04;
  ctx.fillStyle = '#ffffff';

  ctx.font = '220px serif';

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.fillText('𓇌', W / 2, H / 2 + 30);

  ctx.restore();

  // ==========================================================
  // TOP HEADER
  // ==========================================================

  ctx.textAlign = 'center';

  ctx.fillStyle = 'rgba(255,255,255,0.82)';
  ctx.font = `500 ${fs.header}px Poppins`;

  ctx.fillText(config.headerLine1, W / 2, 38);
  ctx.fillText(config.headerLine2, W / 2, 56);

  // ==========================================================
  // GROUP NAME
  // ==========================================================

  ctx.fillStyle = '#ffffff';

  ctx.font = `bold ${fs.groupeName}px Poppins`;

  ctx.fillText(config.groupeName, W / 2, 108);

  // ==========================================================
  // TAGLINE PILL
  // ==========================================================

  ctx.fillStyle = 'rgba(250,204,21,0.15)';

  roundedRect(ctx, W / 2 - 60, 126, 120, 34, 20);

  ctx.fill();

  ctx.strokeStyle = 'rgba(250,204,21,0.4)';
  ctx.stroke();

  ctx.fillStyle = '#facc15';

  ctx.font = `bold ${fs.tagline}px Poppins`;

  ctx.fillText(config.tagline, W / 2, 148);

  // ==========================================================
  // TITLE
  // ==========================================================

  ctx.save();

  ctx.shadowColor = 'rgba(0,0,0,0.3)';
  ctx.shadowBlur = 12;

  ctx.fillStyle = c.bureauTitle;

  ctx.font = `bold ${fs.bureau}px Poppins`;

  ctx.fillText(config.bureauLabel, W / 2, 208);

  ctx.restore();

  // ==========================================================
  // PHOTO
  // ==========================================================

  const cx = W / 2;
  const cy = 340;
  const radius = 92;

  // Outer glow
  ctx.save();

  ctx.shadowColor = 'rgba(250,204,21,0.45)';
  ctx.shadowBlur = 25;

  ctx.strokeStyle = c.ring;
  ctx.lineWidth = 5;

  ctx.beginPath();
  ctx.arc(cx, cy, radius + 6, 0, Math.PI * 2);

  ctx.stroke();

  ctx.restore();

  drawCirclePhoto(ctx, photoImg, cx, cy, radius);

  // ==========================================================
  // NAME
  // ==========================================================

  const fullName = (nom || 'NOM').toUpperCase();

  const nomSize = fitText(
    ctx,
    fullName,
    W - 100,
    fs.nom
  );

  ctx.fillStyle = c.nom;

  ctx.font = `bold ${nomSize}px Poppins`;

  ctx.textAlign = 'center';

  drawWrappedText(
    ctx,
    fullName,
    W / 2,
    490,
    W - 100,
    42,
    'center'
  );

  // ==========================================================
  // PRENOM
  // ==========================================================

  const prenomText = (prenom || 'PRÉNOM').toUpperCase();

  const prenomSize = fitText(
    ctx,
    prenomText,
    W - 140,
    fs.prenom
  );

  ctx.fillStyle = c.prenom;

  ctx.font = `600 ${prenomSize}px Poppins`;

  ctx.fillText(prenomText, W / 2, 560);

  // ==========================================================
  // SEXE
  // ==========================================================
   if (sexe) {

    const sexeWidth = ctx.measureText(sexe).width + 50;

    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    
    

    ctx.fill();

    ctx.fillStyle = '#ffffff';

    ctx.font = `bold ${fs.sexe}px Poppins`;

    ctx.fillText(sexe, W / 2, 675);
  }
  // ==========================================================
  // ROLE
  // ==========================================================

  if (role) {

    const roleWidth = ctx.measureText(role).width + 50;

    ctx.fillStyle = 'rgba(255,255,255,0.08)';

    roundedRect(
      ctx,
      W / 2 - roleWidth / 2,
      590,
      roleWidth,
      38,
      18
    );

    ctx.fill();

    ctx.fillStyle = '#ffffff';

    ctx.font = `bold ${fs.role}px Poppins`;

    ctx.fillText(role, W / 2, 615);
  }

  //
  // ==========================================================
  //SEXE
  // ==========================================================
  
 


  

  // ==========================================================
  // DATE
  // ==========================================================

  if (ddn) {

    const d = new Date(ddn);

    const fmt = d.toLocaleDateString(
      'fr-FR',
      {
        day: '2-digit',
        month: 'long',
        
      }
    );

    ctx.fillStyle = 'rgba(255,255,255,0.7)';

    ctx.font = `${fs.date}px Poppins`;

    ctx.fillText(
      `Né(e) le : ${fmt}`,
      W / 2,
      662
    );
  }

  // ==========================================================
  // FOOTER LINE
  // ==========================================================

  ctx.strokeStyle = 'rgba(255,255,255,0.1)';

  ctx.lineWidth = 1;

  ctx.beginPath();

  ctx.moveTo(60, H - 42);
  ctx.lineTo(W - 60, H - 42);

  ctx.stroke();

  // ==========================================================
  // EXPORT
  // ==========================================================

  return canvas.toDataURL('image/png');
}