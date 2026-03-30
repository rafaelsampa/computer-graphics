const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const W = canvas.width;
const H = canvas.height;


// =============================================================
// VARIÁVEIS DE ESTADO 
// =============================================================


// Carro Manual (Amarelo)
let carroPosX = 50;
let carroPosY = 150;
let carroAngulo = 0;

// Carro em Loop (Vermelho)
let dist = 0;
let posYGen = H / 2;
let anguloGen = 0;
let foward = true;
let turn180 = false;

// Carro de Drift (Azul)
let driftX = W/4;
let driftY = H*(3/4);
let anguloDrift = 0;
let raioDrift = 100;


// =============================================================
// FUNÇÕES DE DESENHO
// =============================================================

function desenhaMapa() {
  // Fundo
  ctx.fillStyle = '#6ee48f';
  ctx.fillRect(0, 0, W, H);

  // Estrada Principal
  ctx.beginPath();
  ctx.strokeStyle = '#999999';
  ctx.lineWidth = 100;

  // Rua Horizontal
  ctx.moveTo(-W, H/4); 
  ctx.lineTo(W, H/4);
  // Rua Vertical
  ctx.moveTo(W*(3/4), -H); 
  ctx.lineTo(W*(3/4), H);
  // Rua Circular
  ctx.arc(W/4, H*(3/4), 125, 0, 2 * Math.PI);


  ctx.stroke();

  // Faixas de sinalização
  ctx.beginPath();
  ctx.strokeStyle = '#fff200';
  ctx.lineWidth = 2.5;

  //Faixa Superior da Rua Esquerda (Horizontal)
  ctx.moveTo(0, (H/4) - 2.5); 
  ctx.lineTo(W*(3/4) - 50, (H/4) - 2.5);
  //Faixa Inferior da Rua Esquerda (Horizontal)
  ctx.moveTo(0, H/4 + 2.5); 
  ctx.lineTo(W*(3/4) - 50, (H/4) + 2.5);
  //Faixa Superior da Rua Direita (Horizontal)
  ctx.moveTo(W*(3/4) + 50, (H/4) - 2.5); 
  ctx.lineTo(W, (H/4) - 2.5);
  //Faixa Inferior da Rua Direita (Horizontal)
  ctx.moveTo(W*(3/4) + 50, (H/4) + 2.5); 
  ctx.lineTo(W, (H/4) + 2.5);
  //Faixa Esquerda da Rua de Cima (Vertical)
  ctx.moveTo(W*(3/4) - 2.5, 0); 
  ctx.lineTo(W*(3/4) - 2.5, (H/4) - 50);
  //Faixa Direita da Rua de Cima (Vertical)
  ctx.moveTo(W*(3/4) + 2.5, 0); 
  ctx.lineTo(W*(3/4) + 2.5, (H/4) - 50);
  //Faixa Esquerda da Rua de Baixo (Vertical)
  ctx.moveTo(W*(3/4) - 2.5, (H/4) + 50); 
  ctx.lineTo(W*(3/4) - 2.5, H);
  //Faixa Direita da Rua de Baixo (Vertical)
  ctx.moveTo(W*(3/4) + 2.5, (H/4) + 50); 
  ctx.lineTo(W*(3/4) + 2.5, H);
  //Faixa Superior da conexão com a Rua Circular
  ctx.moveTo(W*(3/4) - 50, H - 27.5);
  ctx.lineTo(W/4 + 125 + 50, H*(3/4) + 22.5);
  //Faixa Inferior da conexão com a Rua Circular
  ctx.moveTo(W*(3/4) - 50, H - 22.5);
  ctx.lineTo(W/4 + 125 + 50, H*(3/4) + 27.5);
  
  ctx.stroke();
  
  //Faixa da Rua Circular
  ctx.beginPath();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 3;

  ctx.moveTo(W/4 + 125, H*(3/4));
  ctx.arc(W/4, H*(3/4), 125, 0, 2 * Math.PI);
  ctx.stroke();
}

function criarCarro(corCarro, corRoda) {
  ctx.fillStyle = corCarro;
  ctx.fillRect(-20, -10, 40, 20); // Corpo do carro
  ctx.strokeStyle = '#595959';
  ctx.strokeRect(-20, -10, 40, 20); // Contorno do carro
  ctx.fillStyle = corRoda;
  ctx.fillRect(-15, -13, 10, 2); //Roda traseira esquerda
  ctx.fillRect(5, -13, 10, 2); //Roda dianteira esquerda
  ctx.fillRect(-15, 11, 10, 2); //Roda traseira direita
  ctx.fillRect(5, 11, 10, 2); //Roda dianteira direita
  ctx.fillStyle = 'lightblue';
  ctx.fillRect(5, -8, 10, 16); //Para-brisa
}

// =============================================================
// LOOP DE ANIMAÇÃO
// =============================================================

function animar() {
    // 1. Limpa a tela e reseta as tranformacoes a cada frame
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, W, H);

    // 2. Desenha o fundo estático
    desenhaMapa();

    // 3. Aplica as transformações dinâmicas e desenha os carros 
    ctx.save();
    ctx.translate(0, posYGen - (H/4) + 25);
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
      criarCarro('#ff0000', '#00304b');
    ctx.restore();

    ctx.save();
      ctx.translate(driftX, driftY);
      ctx.rotate(anguloDrift + Math.PI / 2);
      anguloDrift += 0.02;
      driftX = W/4 + Math.cos(anguloDrift) * raioDrift;
      driftY = H*(3/4) + Math.sin(anguloDrift) * raioDrift;
      criarCarro('#1100ff', '#ffffff');
    ctx.restore(); 

    ctx.save();
      ctx.translate(carroPosX, carroPosY - 25);
      ctx.rotate(carroAngulo);
      criarCarro('#FFEA17', '#595959');
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