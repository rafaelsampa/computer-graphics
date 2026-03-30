const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const W = canvas.width;
const H = canvas.height;

// =============================================================
// VARIÁVEIS DE ESTADO
// =============================================================
// Carro Interativo (Vermelho)
let carroPosX = 100;
let carroPosY = 150;
let carroAngulo = 0;

// Carro de Drift (Azul)
let driftX = 600;
let driftY = 400;
let anguloDrift = 0;
let raioDrift = 100;



// =============================================================
// FUNÇÕES DE DESENHO (Sempre desenhadas ao redor da origem 0,0)
// =============================================================

function desenhaMapa() {
  ctx.beginPath();
  ctx.strokeStyle = '#999';
  ctx.lineWidth = 50;
  
  // Rua Horizontal e Vertical
  ctx.moveTo(0, 150); ctx.lineTo(W, 150);
  ctx.moveTo(600, 0); ctx.lineTo(600, H);
  ctx.stroke();

  // Rotatória do Drift
  ctx.beginPath();
  ctx.arc(600, 400, 60, 0, Math.PI * 2);
  ctx.fillStyle = '#777';
  ctx.fill();
  ctx.stroke();
}

function desenhaCarro(cor) {
  ctx.fillStyle = cor;
  ctx.fillRect(-20, -10, 40, 20); 
  ctx.fillStyle = 'lightblue';
  ctx.fillRect(5, -8, 10, 16);    
}





// =============================================================
// LOOP DE ANIMAÇÃO
// =============================================================
function animar() {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, W, H);

  // Matemática das animações
  anguloDrift += 0.03;
  driftX = 600 + Math.cos(anguloDrift) * raioDrift;
  driftY = 400 + Math.sin(anguloDrift) * raioDrift;


  desenhaMapa(); 

  // --- Carro Vermelho ---
  ctx.save();
    ctx.translate(carroPosX, carroPosY);
    ctx.rotate(carroAngulo);
    desenhaCarro('red');
  ctx.restore();



  // --- Carro Azul de Drift ---
  ctx.save();
    ctx.translate(driftX, driftY);         
    ctx.rotate(anguloDrift + Math.PI / 2); 
    desenhaCarro('blue');
    

  ctx.restore(); 

  requestAnimationFrame(animar);
}

// =============================================================
// INTERATIVIDADE
// =============================================================
document.addEventListener('keydown', function(e) {
  const velocidade = 5;
  switch (e.key) {
    case 'ArrowLeft':  carroPosX -= velocidade; carroAngulo = Math.PI; break;
    case 'ArrowRight': carroPosX += velocidade; carroAngulo = 0; break;
    case 'ArrowUp':    carroPosY -= velocidade; carroAngulo = -Math.PI/2; break;
    case 'ArrowDown':  carroPosY += velocidade; carroAngulo = Math.PI/2; break;
  }
});

animar();
