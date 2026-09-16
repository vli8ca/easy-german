(function () {
  'use strict';

  window.KlarVerbPractice = {
    pages: {
      sein: {
        id: 'sein',
        title: 'Ser ou estar',
        subtitle: 'Treine o verbo sein — a mesma palavra para ser e estar no presente.',
        verb: 'sein',
        meaning: 'ser · estar',
        heroTitle: 'Ser ou estar',
        heroAccent: 'sem travar.',
        heroCopy: 'a mesma base para “ser” e “estar” em alemão.',
        perfectMessage: 'Perfeito. Sein já está ficando automático.',
        modes: {
          conjugation: {
            id: 'conjugation',
            label: 'Conjugação',
            shortLabel: '01 · Formas do verbo',
            title: 'Complete as formas de sein',
            instruction: 'Veja o pronome em português e escreva a tradução completa em alemão. O verbo muda conforme a pessoa.',
            items: [
              { id: 'ich', prompt: 'Eu sou', detail: '1ª pessoa · singular', placeholder: 'Digite em alemão…', answers: ['ich bin'] },
              { id: 'du', prompt: 'Você é', detail: '2ª pessoa · informal', placeholder: 'Digite em alemão…', answers: ['du bist'] },
              { id: 'er', prompt: 'Ele é', detail: '3ª pessoa · singular', placeholder: 'Digite em alemão…', answers: ['er ist'] },
              { id: 'sie-singular', prompt: 'Ela é', detail: '3ª pessoa · singular', placeholder: 'Digite em alemão…', answers: ['sie ist'] },
              { id: 'es', prompt: 'Isso é', detail: '3ª pessoa · singular', placeholder: 'Digite em alemão…', answers: ['es ist'] },
              { id: 'wir', prompt: 'Nós somos', detail: '1ª pessoa · plural', placeholder: 'Digite em alemão…', answers: ['wir sind'] },
              { id: 'ihr', prompt: 'Vocês são', detail: '2ª pessoa · informal', placeholder: 'Digite em alemão…', answers: ['ihr seid'] },
              { id: 'sie', prompt: 'Eles / Elas são', detail: '3ª pessoa · plural', placeholder: 'Digite em alemão…', answers: ['sie sind'] }
            ]
          },
          sentences: {
            id: 'sentences',
            label: 'Frases rápidas',
            shortLabel: '02 · Na vida real',
            title: 'Leve sein para uma frase',
            instruction: 'Traduza as frases curtas para o alemão. Preste atenção ao pronome e à forma de sein.',
            items: [
              { id: 'happy', prompt: 'Eu estou feliz.', detail: 'Dica: ich + sein', placeholder: 'Escreva a frase em alemão…', answers: ['ich bin glücklich'] },
              { id: 'here', prompt: 'Você está aqui.', detail: 'Dica: du + sein', placeholder: 'Escreva a frase em alemão…', answers: ['du bist hier'] },
              { id: 'office', prompt: 'Ele está no escritório.', detail: 'Dica: er + sein', placeholder: 'Escreva a frase em alemão…', answers: ['er ist im büro'] },
              { id: 'home', prompt: 'Nós estamos em casa.', detail: 'Dica: wir + sein', placeholder: 'Escreva a frase em alemão…', answers: ['wir sind zu hause'] },
              { id: 'ready', prompt: 'Vocês estão prontos.', detail: 'Dica: ihr + sein', placeholder: 'Escreva a frase em alemão…', answers: ['ihr seid bereit'] },
              { id: 'friendly', prompt: 'Eles são gentis.', detail: 'Dica: sie + sein', placeholder: 'Escreva a frase em alemão…', answers: ['sie sind freundlich'] }
            ]
          }
        }
      },
      haben: {
        id: 'haben',
        title: 'Conjugação de haben',
        subtitle: 'Treine o verbo haben — ter no presente.',
        verb: 'haben',
        meaning: 'ter',
        heroTitle: 'Ter',
        heroAccent: 'sem travar.',
        heroCopy: 'a forma mais comum de dizer “ter” em alemão.',
        perfectMessage: 'Perfeito. Haben já está ficando automático.',
        modes: {
          conjugation: {
            id: 'conjugation',
            label: 'Conjugação',
            shortLabel: '01 · Formas do verbo',
            title: 'Complete as formas de haben',
            instruction: 'Veja o pronome em português e escreva a tradução completa em alemão. O verbo muda conforme a pessoa.',
            items: [
              { id: 'ich', prompt: 'Eu tenho', detail: '1ª pessoa · singular', placeholder: 'Digite em alemão…', answers: ['ich habe'] },
              { id: 'du', prompt: 'Você tem', detail: '2ª pessoa · informal', placeholder: 'Digite em alemão…', answers: ['du hast'] },
              { id: 'er', prompt: 'Ele tem', detail: '3ª pessoa · singular', placeholder: 'Digite em alemão…', answers: ['er hat'] },
              { id: 'sie-singular', prompt: 'Ela tem', detail: '3ª pessoa · singular', placeholder: 'Digite em alemão…', answers: ['sie hat'] },
              { id: 'es', prompt: 'Isso tem', detail: '3ª pessoa · singular', placeholder: 'Digite em alemão…', answers: ['es hat'] },
              { id: 'wir', prompt: 'Nós temos', detail: '1ª pessoa · plural', placeholder: 'Digite em alemão…', answers: ['wir haben'] },
              { id: 'ihr', prompt: 'Vocês têm', detail: '2ª pessoa · informal', placeholder: 'Digite em alemão…', answers: ['ihr habt'] },
              { id: 'sie', prompt: 'Eles / Elas têm', detail: '3ª pessoa · plural', placeholder: 'Digite em alemão…', answers: ['sie haben'] }
            ]
          },
          sentences: {
            id: 'sentences',
            label: 'Frases rápidas',
            shortLabel: '02 · Na vida real',
            title: 'Leve haben para uma frase',
            instruction: 'Traduza as frases curtas para o alemão. Preste atenção ao pronome e à forma de haben.',
            items: [
              { id: 'time', prompt: 'Eu tenho tempo.', detail: 'Dica: ich + haben', placeholder: 'Escreva a frase em alemão…', answers: ['ich habe zeit'] },
              { id: 'car', prompt: 'Você tem um carro.', detail: 'Dica: du + haben', placeholder: 'Escreva a frase em alemão…', answers: ['du hast ein auto'] },
              { id: 'question', prompt: 'Ele tem uma pergunta.', detail: 'Dica: er + haben', placeholder: 'Escreva a frase em alemão…', answers: ['er hat eine frage'] },
              { id: 'work', prompt: 'Nós temos trabalho.', detail: 'Dica: wir + haben', placeholder: 'Escreva a frase em alemão…', answers: ['wir haben arbeit'] },
              { id: 'hunger', prompt: 'Vocês têm fome.', detail: 'Dica: ihr + haben', placeholder: 'Escreva a frase em alemão…', answers: ['ihr habt hunger'] },
              { id: 'their-time', prompt: 'Eles têm tempo.', detail: 'Dica: sie + haben', placeholder: 'Escreva a frase em alemão…', answers: ['sie haben zeit'] }
            ]
          }
        }
      }
    }
  };
}());
