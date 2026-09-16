(function () {
  'use strict';

  window.KlarVerbPractice = {
    pages: {
      sein: {
        id: 'sein',
        title: 'Ser ou estar',
        title_en: 'To be',
        subtitle: 'Treine o verbo sein — a mesma palavra para ser e estar no presente.',
        subtitle_en: 'Practice the verb sein — the German verb for “to be” in the present tense.',
        verb: 'sein',
        meaning: 'ser · estar',
        meaning_en: 'to be',
        heroTitle: 'Ser ou estar',
        heroTitle_en: 'To be',
        heroAccent: 'sem travar.',
        heroAccent_en: 'without hesitation.',
        heroCopy: 'a mesma base para “ser” e “estar” em alemão.',
        heroCopy_en: 'the same verb for “to be” in German.',
        perfectMessage: 'Perfeito. Sein já está ficando automático.',
        perfectMessage_en: 'Perfect. Sein is becoming automatic.',
        modes: {
          conjugation: {
            id: 'conjugation',
            label: 'Conjugação',
            label_en: 'Conjugation',
            shortLabel: '01 · Formas do verbo',
            shortLabel_en: '01 · Verb forms',
            title: 'Complete as formas de sein',
            title_en: 'Complete the forms of sein',
            instruction: 'Veja o pronome em português e escreva a tradução completa em alemão. O verbo muda conforme a pessoa.',
            instruction_en: 'Look at the English pronoun and write the complete translation in German. The verb changes depending on the person.',
            items: [
              { id: 'ich', prompt: 'Eu sou', prompt_en: 'I am', detail: '1ª pessoa · singular', detail_en: '1st person · singular', placeholder: 'Digite em alemão…', placeholder_en: 'Type in German…', answers: ['ich bin'] },
              { id: 'du', prompt: 'Você é', prompt_en: 'You are', detail: '2ª pessoa · informal', detail_en: '2nd person · informal', placeholder: 'Digite em alemão…', placeholder_en: 'Type in German…', answers: ['du bist'] },
              { id: 'er', prompt: 'Ele é', prompt_en: 'He is', detail: '3ª pessoa · singular', detail_en: '3rd person · singular', placeholder: 'Digite em alemão…', placeholder_en: 'Type in German…', answers: ['er ist'] },
              { id: 'sie-singular', prompt: 'Ela é', prompt_en: 'She is', detail: '3ª pessoa · singular', detail_en: '3rd person · singular', placeholder: 'Digite em alemão…', placeholder_en: 'Type in German…', answers: ['sie ist'] },
              { id: 'es', prompt: 'Isso é', prompt_en: 'It is', detail: '3ª pessoa · singular', detail_en: '3rd person · singular', placeholder: 'Digite em alemão…', placeholder_en: 'Type in German…', answers: ['es ist'] },
              { id: 'wir', prompt: 'Nós somos', prompt_en: 'We are', detail: '1ª pessoa · plural', detail_en: '1st person · plural', placeholder: 'Digite em alemão…', placeholder_en: 'Type in German…', answers: ['wir sind'] },
              { id: 'ihr', prompt: 'Vocês são', prompt_en: 'You are', detail: '2ª pessoa · informal', detail_en: '2nd person · informal', placeholder: 'Digite em alemão…', placeholder_en: 'Type in German…', answers: ['ihr seid'] },
              { id: 'sie', prompt: 'Eles / Elas são', prompt_en: 'They are', detail: '3ª pessoa · plural', detail_en: '3rd person · plural', placeholder: 'Digite em alemão…', placeholder_en: 'Type in German…', answers: ['sie sind'] }
            ]
          },
          sentences: {
            id: 'sentences',
            label: 'Frases rápidas',
            label_en: 'Quick sentences',
            shortLabel: '02 · Na vida real',
            shortLabel_en: '02 · In real life',
            title: 'Leve sein para uma frase',
            title_en: 'Use sein in a sentence',
            instruction: 'Traduza as frases curtas para o alemão. Preste atenção ao pronome e à forma de sein.',
            instruction_en: 'Translate the short sentences into German. Pay attention to the pronoun and the form of sein.',
            items: [
              { id: 'happy', prompt: 'Eu estou feliz.', prompt_en: 'I am happy.', detail: 'Dica: ich + sein', detail_en: 'Hint: ich + sein', placeholder: 'Escreva a frase em alemão…', placeholder_en: 'Write the sentence in German…', answers: ['ich bin glücklich'] },
              { id: 'here', prompt: 'Você está aqui.', prompt_en: 'You are here.', detail: 'Dica: du + sein', detail_en: 'Hint: du + sein', placeholder: 'Escreva a frase em alemão…', placeholder_en: 'Write the sentence in German…', answers: ['du bist hier'] },
              { id: 'office', prompt: 'Ele está no escritório.', prompt_en: 'He is in the office.', detail: 'Dica: er + sein', detail_en: 'Hint: er + sein', placeholder: 'Escreva a frase em alemão…', placeholder_en: 'Write the sentence in German…', answers: ['er ist im büro'] },
              { id: 'home', prompt: 'Nós estamos em casa.', prompt_en: 'We are at home.', detail: 'Dica: wir + sein', detail_en: 'Hint: wir + sein', placeholder: 'Escreva a frase em alemão…', placeholder_en: 'Write the sentence in German…', answers: ['wir sind zu hause'] },
              { id: 'ready', prompt: 'Vocês estão prontos.', prompt_en: 'You are ready.', detail: 'Dica: ihr + sein', detail_en: 'Hint: ihr + sein', placeholder: 'Escreva a frase em alemão…', placeholder_en: 'Write the sentence in German…', answers: ['ihr seid bereit'] },
              { id: 'friendly', prompt: 'Eles são gentis.', prompt_en: 'They are kind.', detail: 'Dica: sie + sein', detail_en: 'Hint: sie + sein', placeholder: 'Escreva a frase em alemão…', placeholder_en: 'Write the sentence in German…', answers: ['sie sind freundlich'] }
            ]
          }
        }
      },
      haben: {
        id: 'haben',
        title: 'Conjugação de haben',
        title_en: 'Conjugation of haben',
        subtitle: 'Treine o verbo haben — ter no presente.',
        subtitle_en: 'Practice the verb haben — “to have” in the present tense.',
        verb: 'haben',
        meaning: 'ter',
        meaning_en: 'to have',
        heroTitle: 'Ter',
        heroTitle_en: 'To have',
        heroAccent: 'sem travar.',
        heroAccent_en: 'without hesitation.',
        heroCopy: 'a forma mais comum de dizer “ter” em alemão.',
        heroCopy_en: 'the most common way to say “to have” in German.',
        perfectMessage: 'Perfeito. Haben já está ficando automático.',
        perfectMessage_en: 'Perfect. Haben is becoming automatic.',
        modes: {
          conjugation: {
            id: 'conjugation',
            label: 'Conjugação',
            label_en: 'Conjugation',
            shortLabel: '01 · Formas do verbo',
            shortLabel_en: '01 · Verb forms',
            title: 'Complete as formas de haben',
            title_en: 'Complete the forms of haben',
            instruction: 'Veja o pronome em português e escreva a tradução completa em alemão. O verbo muda conforme a pessoa.',
            instruction_en: 'Look at the English pronoun and write the complete translation in German. The verb changes depending on the person.',
            items: [
              { id: 'ich', prompt: 'Eu tenho', prompt_en: 'I have', detail: '1ª pessoa · singular', detail_en: '1st person · singular', placeholder: 'Digite em alemão…', placeholder_en: 'Type in German…', answers: ['ich habe'] },
              { id: 'du', prompt: 'Você tem', prompt_en: 'You have', detail: '2ª pessoa · informal', detail_en: '2nd person · informal', placeholder: 'Digite em alemão…', placeholder_en: 'Type in German…', answers: ['du hast'] },
              { id: 'er', prompt: 'Ele tem', prompt_en: 'He has', detail: '3ª pessoa · singular', detail_en: '3rd person · singular', placeholder: 'Digite em alemão…', placeholder_en: 'Type in German…', answers: ['er hat'] },
              { id: 'sie-singular', prompt: 'Ela tem', prompt_en: 'She has', detail: '3ª pessoa · singular', detail_en: '3rd person · singular', placeholder: 'Digite em alemão…', placeholder_en: 'Type in German…', answers: ['sie hat'] },
              { id: 'es', prompt: 'Isso tem', prompt_en: 'It has', detail: '3ª pessoa · singular', detail_en: '3rd person · singular', placeholder: 'Digite em alemão…', placeholder_en: 'Type in German…', answers: ['es hat'] },
              { id: 'wir', prompt: 'Nós temos', prompt_en: 'We have', detail: '1ª pessoa · plural', detail_en: '1st person · plural', placeholder: 'Digite em alemão…', placeholder_en: 'Type in German…', answers: ['wir haben'] },
              { id: 'ihr', prompt: 'Vocês têm', prompt_en: 'You have', detail: '2ª pessoa · informal', detail_en: '2nd person · informal', placeholder: 'Digite em alemão…', placeholder_en: 'Type in German…', answers: ['ihr habt'] },
              { id: 'sie', prompt: 'Eles / Elas têm', prompt_en: 'They have', detail: '3ª pessoa · plural', detail_en: '3rd person · plural', placeholder: 'Digite em alemão…', placeholder_en: 'Type in German…', answers: ['sie haben'] }
            ]
          },
          sentences: {
            id: 'sentences',
            label: 'Frases rápidas',
            label_en: 'Quick sentences',
            shortLabel: '02 · Na vida real',
            shortLabel_en: '02 · In real life',
            title: 'Leve haben para uma frase',
            title_en: 'Use haben in a sentence',
            instruction: 'Traduza as frases curtas para o alemão. Preste atenção ao pronome e à forma de haben.',
            instruction_en: 'Translate the short sentences into German. Pay attention to the pronoun and the form of haben.',
            items: [
              { id: 'time', prompt: 'Eu tenho tempo.', prompt_en: 'I have time.', detail: 'Dica: ich + haben', detail_en: 'Hint: ich + haben', placeholder: 'Escreva a frase em alemão…', placeholder_en: 'Write the sentence in German…', answers: ['ich habe zeit'] },
              { id: 'car', prompt: 'Você tem um carro.', prompt_en: 'You have a car.', detail: 'Dica: du + haben', detail_en: 'Hint: du + haben', placeholder: 'Escreva a frase em alemão…', placeholder_en: 'Write the sentence in German…', answers: ['du hast ein auto'] },
              { id: 'question', prompt: 'Ele tem uma pergunta.', prompt_en: 'He has a question.', detail: 'Dica: er + haben', detail_en: 'Hint: er + haben', placeholder: 'Escreva a frase em alemão…', placeholder_en: 'Write the sentence in German…', answers: ['er hat eine frage'] },
              { id: 'work', prompt: 'Nós temos trabalho.', prompt_en: 'We have work.', detail: 'Dica: wir + haben', detail_en: 'Hint: wir + haben', placeholder: 'Escreva a frase em alemão…', placeholder_en: 'Write the sentence in German…', answers: ['wir haben arbeit'] },
              { id: 'hunger', prompt: 'Vocês têm fome.', prompt_en: 'You are hungry.', detail: 'Dica: ihr + haben', detail_en: 'Hint: ihr + haben', placeholder: 'Escreva a frase em alemão…', placeholder_en: 'Write the sentence in German…', answers: ['ihr habt hunger'] },
              { id: 'their-time', prompt: 'Eles têm tempo.', prompt_en: 'They have time.', detail: 'Dica: sie + haben', detail_en: 'Hint: sie + haben', placeholder: 'Escreva a frase em alemão…', placeholder_en: 'Write the sentence in German…', answers: ['sie haben zeit'] }
            ]
          }
        }
      }
    }
  };
}());
