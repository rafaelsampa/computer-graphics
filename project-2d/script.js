




const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const W = canvas.width;
const H = canvas.height;

// =============================================================
// VARIÁVEIS DE ESTADO 
// =============================================================
let carroPosX = 100;
let carroPosY = 150;
let carroAngulo = 0;

// =============================================================
// FUNÇÕES DE DESENHO
// =============================================================
function desenhaMapa() {
  ctx.beginPath();
  ctx.strokeStyle = '#999';
  ctx.lineWidth = 50;
  
  // Rua Horizontal
  ctx.moveTo(0, 150); 
  ctx.lineTo(W, 150);
  
  // Rua Vertical (centralizado)
  ctx.moveTo(400, 0); 
  ctx.lineTo(400, H);
  
  ctx.stroke();
}

function desenhaCarro() {
    ctx.fillStyle = 'red';
    ctx.fillRect(-20, -10, 40, 20); // Corpo do carro
    ctx.fillStyle = 'lightblue';
    ctx.fillRect(5, -8, 10, 16); //Para-brisa

}

// =============================================================
// LOOP DE ANIMAÇÃO (Substitui o desenharCena)
// =============================================================
function animar() {
    // 1. Limpa a tela e reseta as tranformacoes a cada frame
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, W, H);

    // 2. Desenha o fundo estático
    desenhaMapa();

    // 3. Aplica as transformações dinâmicas e desenha o carro 
    ctx.save();
    ctx.translate(carroPosX, carroPosY);
    ctx.rotate(carroAngulo);

    desenhaCarro();

    ctx.restore();

    // 4. Pede ao navegador para chamar essa função no próximo frame
    requestAnimationFrame(animar);
}

// =============================================================
// INTERATIVIDADE
// =============================================================
document.addEventListener('keydown', function(e) {
  const velocidade = 5; // pixels que o carro anda por clique
  switch (e.key) {
    case 'ArrowLeft':  
        carroPosX -= velocidade; 
        carroAngulo = Math.PI; 
        break;
    case 'ArrowRight': 
        carroPosX += velocidade; 
        carroAngulo = 0; 
        break;
    case 'ArrowUp':    
        carroPosY -= velocidade; 
        carroAngulo = -Math.PI/2; 
        break;
    case 'ArrowDown':  
        carroPosY += velocidade; 
        carroAngulo = Math.PI/2; 
        break;
  }
});

animar();











