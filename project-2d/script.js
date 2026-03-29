const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const W = canvas.width;
const H = canvas.height;

// =============================================================
// VARIÁVEIS DE ESTADO
// Coloque aqui as variáveis que mudam ao longo do tempo
// (ângulos, posições, escalas, velocidades, etc.)
// =============================================================
let angulo = 0;
let posX = W / 2;
let posY = H / 2;

// =============================================================
// FUNÇÕES DE DESENHO
// Crie funções para cada objeto da sua cena.
// Desenhe sempre ao redor da ORIGEM (0,0) e use transformações
// para posicionar, rotacionar e escalar.
// =============================================================

function Carro1(corCarro, corRoda) {
  ctx.fillStyle = corCarro;
  ctx.fillRect(-20, -10, 40, 20); // Corpo do carro
  ctx.strokeStyle = corRoda;
  ctx.strokeRect(-20, -10, 40, 20); // Contorno do carro
  ctx.fillStyle = corRoda;
  ctx.fillRect(-15, -13, 10, 2); //Roda traseira esquerda
  ctx.fillRect(5, -13, 10, 2); //Roda dianteira esquerda
  ctx.fillRect(-15, 11, 10, 2); //Roda traseira direita
  ctx.fillRect(5, 11, 10, 2); //Roda dianteira direita
  ctx.fillStyle = 'lightblue';
  ctx.fillRect(5, -8, 10, 16); //Para-brisa
  //(pos X, pos Y, Gordura, Tamanho)
}

function desenhaTriangulo(base, altura, cor) {
  ctx.fillStyle = cor;
  ctx.beginPath();
  ctx.moveTo(0, -altura / 2);
  ctx.lineTo(-base / 2, altura / 2);
  ctx.lineTo(base / 2, altura / 2);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

// =============================================================
// LOOP DE ANIMAÇÃO
// Esta função é chamada a cada frame (~60x por segundo).
// =============================================================
function animar() {
  // --- RESET da matriz (obrigatório a cada frame!) ---
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, W, H);

  // --- ATUALIZAR ESTADO ---
  angulo += 0.02;

  // =============================================================
  // DESENHAR A CENA
  // Use ctx.save() e ctx.restore() para isolar as transformações
  // de cada objeto.
  // =============================================================

  // Exemplo: quadrado no centro, girando
  ctx.save();
    ctx.translate(posX, posY);       // posiciona no centro
    ctx.rotate(angulo);              // gira ao redor do centro
    Carro1('#FFEA17', 'gray');
  ctx.restore();

  // Exemplo: triângulo orbitando o quadrado
  ctx.save();
    ctx.translate(posX, posY);       // vai pro centro
    ctx.rotate(angulo * 2);          // orbita mais rápido
    ctx.translate(150, 0);           // afasta do centro
    ctx.scale(0.8, 0.8);            // um pouco menor
    desenhaTriangulo(40, 50, 'pink');
  ctx.restore();

  // Exemplo: escala com ponto fixo (canto superior esquerdo)
  ctx.save();
    var px = 100, py = 100;
    ctx.translate(px, py);           // volta
    ctx.scale(1 + 0.3 * Math.sin(angulo), 1 + 0.3 * Math.sin(angulo));
    ctx.translate(-px, -py);         // leva à origem
    ctx.fillStyle = 'cyan';
    ctx.fillRect(70, 70, 60, 60);
    ctx.strokeRect(70, 70, 60, 60);
  ctx.restore();

  // --- PRÓXIMO FRAME ---
  requestAnimationFrame(animar);
}

// =============================================================
// INTERATIVIDADE (BÔNUS)
// Adicione controles de teclado ou mouse se quiser.
// =============================================================
document.addEventListener('keydown', function(e) {
  switch (e.key) {
    case 'ArrowLeft':  posX -= 10; break;
    case 'ArrowRight': posX += 10; break;
    case 'ArrowUp':    posY -= 10; break;
    case 'ArrowDown':  posY += 10; break;
  }
});

// Inicia a animação
animar();