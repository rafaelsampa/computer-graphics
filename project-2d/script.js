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
let dist = 0;
let posX = W / 2;
let posY = H / 2;
let carHeight = 0;
let foward = true;
let turn180 = false;
let turnleft;
let turnright;

// =============================================================
// FUNÇÕES DE DESENHO
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

function desenhaMapa() {
  // Asfalto
  ctx.beginPath();
  ctx.strokeStyle = '#999999';
  ctx.lineWidth = 100;
  
  // Rua Horizontal
  ctx.moveTo(-W, H/4); 
  ctx.lineTo(W, H/4);
  // Rua Vertical (centralizado)
  ctx.moveTo(W*(3/4), -H); 
  ctx.lineTo(W*(3/4), H);

  ctx.stroke();

  // Faixas de sinalização (Horz -> Vert)
  ctx.beginPath();
  ctx.strokeStyle = '#fff200';
  ctx.lineWidth = 2.5;
  //Faixa da Direita 1
  ctx.moveTo(0, H/4 + 2.5); 
  ctx.lineTo(W*(3/4) - 50, (H/4) + 2.5);
  ctx.moveTo(W*(3/4) + 2.5, 0); 
  ctx.lineTo(W*(3/4) + 2.5, (H/4) - 50);
  //Faixa da Direita 2
  ctx.moveTo(W*(3/4) + 50, (H/4) + 2.5); 
  ctx.lineTo(W, (H/4) + 2.5);
  ctx.moveTo(W*(3/4) + 2.5, (H/4) + 50); 
  ctx.lineTo(W*(3/4) + 2.5, H);
  //Faixa da Esquerda 1
  ctx.moveTo(0, (H/4) - 2.5); 
  ctx.lineTo(W*(3/4) - 50, (H/4) - 2.5);
  ctx.moveTo(W*(3/4) - 2.5, 0); 
  ctx.lineTo(W*(3/4) - 2.5, (H/4) - 50);
  //Faixa da Esquerda 2
  ctx.moveTo(W*(3/4) + 50, (H/4) - 2.5); 
  ctx.lineTo(W, (H/4) - 2.5);
  ctx.moveTo(W*(3/4) - 2.5, (H/4) + 50); 
  ctx.lineTo(W*(3/4) - 2.5, H);
  
  ctx.stroke();
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
  ctx.save(); //Background da Animação
    desenhaMapa();
  ctx.restore();

  ctx.save(); // Movimentação do Carro 01
    ctx.translate(0, posY - (H/4) - 25);
    if (foward && !turn180) {
      if (dist <= -100){
        dist += 4.5;
      }
      else{
        dist += 2.5;
      }
      if (dist > W) {
        foward = false;
      }
    } else {
      if (dist <= -100){
        dist -= 1.5;
      }
      else{
        dist -= 2.5;
      }
      turn180 = true;
      if (dist < 0){
        foward = true;
        turn180 = false;
      }
    }
    ctx.translate(dist, 0); 
    if (turn180){
      ctx.rotate(Math.PI);
    }
    Carro1('#FFEA17', '#595959');
  ctx.restore();

  // --- PRÓXIMO FRAME ---
  requestAnimationFrame(animar);
}

// Inicia a animação
animar();