# Computação Gráfica

Um repositório para prática de transformações geométricas em Canvas 2D.

## Informações Gerais
* **Alunos:** Rafael, 
* **Prazo:** 31 de março
* **Tecnologia:** JavaScript + HTML + Canvas 2D

## Tema Escolhido
Cena de carros em movimento em ruas e rotatórias. 


## Mapeamento de Requisitos
Para facilitar a avaliação, detalhamos abaixo onde cada transformação exigida foi aplicada no nosso código:

* **1. Translação (`ctx.translate`):** [Explicar qual objeto foi movido e em qual linha/função]
* **2. Rotação (`ctx.rotate`):** [Explicar qual objeto foi girado e em qual linha/função]
* **3. Escala (`ctx.scale`):** [Explicar qual objeto foi redimensionado e em qual linha/função]
* **4. Composição de transformações:** [Explicar onde duas operações ocorrem em sequência. Ex: Rotação seguida de translação no objeto X]
* **5. Rotação/Escala em ponto fixo:** [Explicar onde foi usado o padrão T -> Op -> T para alterar o pivô]
* **6. Animação:** Implementada usando `requestAnimationFrame` na função principal, com o reset de matriz garantido a cada frame.
* **7. Gerenciamento de pilha:** Uso de `ctx.save()` e `ctx.restore()` em cada objeto desenhado para isolar os estados e não afetar o restante da cena.

## Requisitos Bônus Implementados
<!---*(Preencha os tópicos abaixo com o que o grupo conseguir desenvolver)*--->
* **Interatividade:** [Ex: O teclado controla a posição do objeto principal]
* **Hierarquia de transformações:** [Ex: O objeto Y é desenhado como filho do objeto X]
* **Reflexão ou cisalhamento:** [Ex: Aplicado no objeto Z usando escala negativa]

## Critérios de Avaliação
* Uso correto das transformações(T,R,S): **30%**
* Composições das transformações: **20%**
* Rotação/Escala em ponto fixo: **15%**
* Animação com reset de matriz: **15%**
* Organização do código(save/restore, funções): **10%**
* Criatividade e apresentação visual: **10%**
* **BÔNUS**: Interatividade, reflexão, hierarquia: **+10%**

## Entrega
* Arquivos: `index.html` e arquivos auxiliares.
* O projeto funciona abrindo o `index.html` diretamente no navegador.
