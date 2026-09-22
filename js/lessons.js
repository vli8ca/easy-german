(function () {
  'use strict';

  const lessons = [
    {
      id: 'first-sentences', number: 1, level: 'A1', practiceMode: 'sequential-translate', exerciseOnly: true,
      title: 'Frases iniciais',
      description: 'Aprenda suas primeiras frases em alemão para cumprimentar, se apresentar, falar da rotina e fazer perguntas simples.',
      duration: '25 min', focus: 'Construir frases do dia a dia',
      introduction: 'Nesta aula, você vai traduzir frases curtas e úteis, uma por uma. Começamos com cumprimentos e apresentações, passamos por casa, trabalho e horários e terminamos com perguntas básicas.',
      objectives: ['Cumprimentar e se apresentar em alemão', 'Falar sobre lugares, rotina, família e horários', 'Fazer e entender perguntas simples no nível A1'],
      sections: [],
      vocabulary: [
        { word: 'Hallo!', meaning: 'olá', example: 'Hallo!' },
        { word: 'Guten Morgen!', meaning: 'bom dia', example: 'Guten Morgen!' },
        { word: 'der Name', meaning: 'o nome', example: 'Mein Name ist Ana.' },
        { word: 'heißen', meaning: 'chamar-se', example: 'Ich heiße Bruno.' },
        { word: 'kommen aus', meaning: 'vir de', example: 'Ich komme aus Brasilien.' },
        { word: 'wohnen', meaning: 'morar', example: 'Ich wohne in Berlin.' },
        { word: 'sprechen', meaning: 'falar', example: 'Ich spreche Portugiesisch.' },
        { word: 'der Bahnhof', meaning: 'a estação de trem', example: 'Wo ist der Bahnhof?' },
        { word: 'die Familie', meaning: 'a família', example: 'Wir sind eine kleine Familie.' },
        { word: 'der Zug', meaning: 'o trem', example: 'Wann kommt der Zug?' }
      ],
      summary: ['Cumprimentos e apresentações ajudam você a iniciar uma conversa.', 'Frases curtas podem falar de origem, cidade, rotina, família e horários.', 'O verbo conjugado aparece cedo na frase em declarações e perguntas.', 'Aprenda cada frase como um bloco útil e observe as palavras que se repetem.', 'A prática sequencial reforça a tradução do português para o alemão.'],
      exercises: [
        { id: 'fs1', type: 'translate', prompt: 'Traduza para o alemão: “Olá!”', answer: 'Hallo!', answers: ['Hallo!'], explanation: 'Hallo! é uma forma simples e comum de dizer “Olá!” em alemão.' },
        { id: 'fs2', type: 'translate', prompt: 'Traduza para o alemão: “Bom dia!”', answer: 'Guten Morgen!', answers: ['Guten Morgen!'], explanation: 'Guten Morgen! significa “Bom dia!” e é usado pela manhã.' },
        { id: 'fs3', type: 'translate', prompt: 'Traduza para o alemão: “Meu nome é Ana.”', answer: 'Mein Name ist Ana.', answers: ['Mein Name ist Ana.'], explanation: 'Mein Name ist Ana. apresenta seu nome literalmente como “Meu nome é Ana”.' },
        { id: 'fs4', type: 'translate', prompt: 'Traduza para o alemão: “Eu me chamo Bruno.”', answer: 'Ich heiße Bruno.', answers: ['Ich heiße Bruno.'], explanation: 'Ich heiße Bruno. usa heiße para dizer “eu me chamo”.' },
        { id: 'fs5', type: 'translate', prompt: 'Traduza para o alemão: “Eu venho do Brasil.”', answer: 'Ich komme aus Brasilien.', answers: ['Ich komme aus Brasilien.'], explanation: 'A expressão Ich komme aus significa “Eu venho de” ou “Eu sou de”.' },
        { id: 'fs6', type: 'translate', prompt: 'Traduza para o alemão: “Eu moro em Berlim.”', answer: 'Ich wohne in Berlin.', answers: ['Ich wohne in Berlin.'], explanation: 'Ich wohne in Berlin. significa “Eu moro em Berlim”.' },
        { id: 'fs7', type: 'translate', prompt: 'Traduza para o alemão: “Eu falo português.”', answer: 'Ich spreche Portugiesisch.', answers: ['Ich spreche Portugiesisch.'], explanation: 'Ich spreche Portugiesisch. usa spreche para “falo” e Portugiesisch para “português”.' },
        { id: 'fs8', type: 'translate', prompt: 'Traduza para o alemão: “Prazer em conhecer você.”', answer: 'Freut mich.', answers: ['Freut mich.'], explanation: 'Freut mich. é a forma curta e natural de dizer “Prazer” ou “Prazer em conhecer você”.' },
        { id: 'fs9', type: 'translate', prompt: 'Traduza para o alemão: “Isto é um livro.”', answer: 'Das ist ein Buch.', answers: ['Das ist ein Buch.'], explanation: 'Das ist significa “Isto é” ou “Isso é”; ein Buch é “um livro”.' },
        { id: 'fs10', type: 'translate', prompt: 'Traduza para o alemão: “Isto é uma bolsa.”', answer: 'Das ist eine Tasche.', answers: ['Das ist eine Tasche.'], explanation: 'Tasche é um substantivo feminino, por isso usamos eine: eine Tasche.' },
        { id: 'fs11', type: 'translate', prompt: 'Traduza para o alemão: “O livro é novo.”', answer: 'Das Buch ist neu.', answers: ['Das Buch ist neu.'], explanation: 'Das Buch significa “o livro” e neu significa “novo”.' },
        { id: 'fs12', type: 'translate', prompt: 'Traduza para o alemão: “A porta está aberta.”', answer: 'Die Tür ist offen.', answers: ['Die Tür ist offen.'], explanation: 'Die Tür é “a porta” e offen é “aberta” ou “aberto”.' },
        { id: 'fs13', type: 'translate', prompt: 'Traduza para o alemão: “Eu tenho uma chave.”', answer: 'Ich habe einen Schlüssel.', answers: ['Ich habe einen Schlüssel.'], explanation: 'Ich habe significa “Eu tenho”; Schlüssel é masculino e aparece como einen Schlüssel aqui.' },
        { id: 'fs14', type: 'translate', prompt: 'Traduza para o alemão: “Você tem um telefone.”', answer: 'Du hast ein Telefon.', answers: ['Du hast ein Telefon.'], explanation: 'Com du, o verbo haben fica hast: Du hast ein Telefon.' },
        { id: 'fs15', type: 'translate', prompt: 'Traduza para o alemão: “O gato está no jardim.”', answer: 'Die Katze ist im Garten.', answers: ['Die Katze ist im Garten.'], explanation: 'Im é a contração de in dem; im Garten significa “no jardim”.' },
        { id: 'fs16', type: 'translate', prompt: 'Traduza para o alemão: “Eu não tenho carro.”', answer: 'Ich habe kein Auto.', answers: ['Ich habe kein Auto.'], explanation: 'Kein nega um substantivo; kein Auto significa “nenhum carro” ou “não tenho carro”.' },
        { id: 'fs17', type: 'translate', prompt: 'Traduza para o alemão: “Eu acordo às sete horas.”', answer: 'Ich stehe um sieben Uhr auf.', answers: ['Ich stehe um sieben Uhr auf.'], explanation: 'Stehe ... auf é o verbo separável aufstehen, “levantar-se” ou “acordar”.' },
        { id: 'fs18', type: 'translate', prompt: 'Traduza para o alemão: “Eu tomo café da manhã às oito horas.”', answer: 'Ich frühstücke um acht Uhr.', answers: ['Ich frühstücke um acht Uhr.'], explanation: 'Frühstücken significa “tomar café da manhã”; um acht Uhr é “às oito horas”.' },
        { id: 'fs19', type: 'translate', prompt: 'Traduza para o alemão: “Eu vou para o trabalho.”', answer: 'Ich gehe zur Arbeit.', answers: ['Ich gehe zur Arbeit.'], explanation: 'Zur é a contração de zu der; zur Arbeit significa “para o trabalho”.' },
        { id: 'fs20', type: 'translate', prompt: 'Traduza para o alemão: “Eu trabalho de manhã.”', answer: 'Ich arbeite am Morgen.', answers: ['Ich arbeite am Morgen.'], explanation: 'Am Morgen significa “de manhã” ou literalmente “na manhã”.' },
        { id: 'fs21', type: 'translate', prompt: 'Traduza para o alemão: “Eu aprendo alemão todos os dias.”', answer: 'Ich lerne jeden Tag Deutsch.', answers: ['Ich lerne jeden Tag Deutsch.'], explanation: 'Jeden Tag significa “todos os dias”; Deutsch é “alemão”.' },
        { id: 'fs22', type: 'translate', prompt: 'Traduza para o alemão: “Eu bebo água.”', answer: 'Ich trinke Wasser.', answers: ['Ich trinke Wasser.'], explanation: 'Ich trinke Wasser. significa “Eu bebo água”.' },
        { id: 'fs23', type: 'translate', prompt: 'Traduza para o alemão: “Ela lê um livro.”', answer: 'Sie liest ein Buch.', answers: ['Sie liest ein Buch.'], explanation: 'Com sie, lesen fica liest: Sie liest ein Buch.' },
        { id: 'fs24', type: 'translate', prompt: 'Traduza para o alemão: “Nós cozinhamos à noite.”', answer: 'Wir kochen am Abend.', answers: ['Wir kochen am Abend.'], explanation: 'Wir kochen significa “nós cozinhamos”; am Abend é “à noite”.' },
        { id: 'fs25', type: 'translate', prompt: 'Traduza para o alemão: “Você dorme cedo.”', answer: 'Du schläfst früh.', answers: ['Du schläfst früh.'], explanation: 'Com du, schlafen fica schläfst; früh significa “cedo”.' },
        { id: 'fs26', type: 'translate', prompt: 'Traduza para o alemão: “Hoje estou cansado.”', answer: 'Heute bin ich müde.', answers: ['Heute bin ich müde.'], explanation: 'Quando Heute vem primeiro, o verbo aparece logo depois: Heute bin ich müde.' },
        { id: 'fs27', type: 'translate', prompt: 'Traduza para o alemão: “Onde fica a estação de trem?”', answer: 'Wo ist der Bahnhof?', answers: ['Wo ist der Bahnhof?'], explanation: 'Wo pergunta “onde”; der Bahnhof é “a estação de trem”.' },
        { id: 'fs28', type: 'translate', prompt: 'Traduza para o alemão: “A escola está aqui.”', answer: 'Die Schule ist hier.', answers: ['Die Schule ist hier.'], explanation: 'Die Schule significa “a escola” e hier significa “aqui”.' },
        { id: 'fs29', type: 'translate', prompt: 'Traduza para o alemão: “Eu estou em casa.”', answer: 'Ich bin zu Hause.', answers: ['Ich bin zu Hause.'], explanation: 'Zu Hause é a expressão fixa para “em casa”.' },
        { id: 'fs30', type: 'translate', prompt: 'Traduza para o alemão: “Nós estamos no escritório.”', answer: 'Wir sind im Büro.', answers: ['Wir sind im Büro.'], explanation: 'Wir sind significa “nós estamos”; im Büro significa “no escritório”.' },
        { id: 'fs31', type: 'translate', prompt: 'Traduza para o alemão: “O supermercado está perto.”', answer: 'Der Supermarkt ist nah.', answers: ['Der Supermarkt ist nah.'], explanation: 'Nah significa “perto” e der Supermarkt é “o supermercado”.' },
        { id: 'fs32', type: 'translate', prompt: 'Traduza para o alemão: “Eu vou ao banco.”', answer: 'Ich gehe zur Bank.', answers: ['Ich gehe zur Bank.'], explanation: 'Zur Bank significa “ao banco”, com a contração de zu der.' },
        { id: 'fs33', type: 'translate', prompt: 'Traduza para o alemão: “Você trabalha em Munique?”', answer: 'Arbeitest du in München?', answers: ['Arbeitest du in München?'], explanation: 'Em uma pergunta sim/não, o verbo vem primeiro: Arbeitest du ...?' },
        { id: 'fs34', type: 'translate', prompt: 'Traduza para o alemão: “Eles moram na Alemanha.”', answer: 'Sie wohnen in Deutschland.', answers: ['Sie wohnen in Deutschland.'], explanation: 'Sie pode significar “eles” neste contexto; wohnen significa “moram”.' },
        { id: 'fs35', type: 'translate', prompt: 'Traduza para o alemão: “Que horas são?”', answer: 'Wie spät ist es?', answers: ['Wie spät ist es?'], explanation: 'Wie spät ist es? é a pergunta comum para saber as horas.' },
        { id: 'fs36', type: 'translate', prompt: 'Traduza para o alemão: “São três horas.”', answer: 'Es ist drei Uhr.', answers: ['Es ist drei Uhr.'], explanation: 'Para dizer a hora, usamos Es ist ... Uhr.' },
        { id: 'fs37', type: 'translate', prompt: 'Traduza para o alemão: “Hoje é segunda-feira.”', answer: 'Heute ist Montag.', answers: ['Heute ist Montag.'], explanation: 'Montag é “segunda-feira” e os dias da semana começam com letra maiúscula.' },
        { id: 'fs38', type: 'translate', prompt: 'Traduza para o alemão: “Amanhã é terça-feira.”', answer: 'Morgen ist Dienstag.', answers: ['Morgen ist Dienstag.'], explanation: 'Morgen significa “amanhã” e Dienstag significa “terça-feira”.' },
        { id: 'fs39', type: 'translate', prompt: 'Traduza para o alemão: “A aula começa às nove horas.”', answer: 'Der Unterricht beginnt um neun Uhr.', answers: ['Der Unterricht beginnt um neun Uhr.'], explanation: 'Unterricht significa “aula” ou “ensino”; beginnt é “começa”.' },
        { id: 'fs40', type: 'translate', prompt: 'Traduza para o alemão: “Quando chega o trem?”', answer: 'Wann kommt der Zug?', answers: ['Wann kommt der Zug?'], explanation: 'Wann pergunta “quando”; der Zug é “o trem”.' },
        { id: 'fs41', type: 'translate', prompt: 'Traduza para o alemão: “Eu tenho tempo hoje.”', answer: 'Ich habe heute Zeit.', answers: ['Ich habe heute Zeit.'], explanation: 'Ich habe Zeit significa “Eu tenho tempo”; heute adiciona “hoje”.' },
        { id: 'fs42', type: 'translate', prompt: 'Traduza para o alemão: “Esta é minha mãe.”', answer: 'Das ist meine Mutter.', answers: ['Das ist meine Mutter.'], explanation: 'Meine Mutter significa “minha mãe”; Das ist apresenta a pessoa.' },
        { id: 'fs43', type: 'translate', prompt: 'Traduza para o alemão: “Meu pai trabalha em casa.”', answer: 'Mein Vater arbeitet zu Hause.', answers: ['Mein Vater arbeitet zu Hause.'], explanation: 'Mein Vater é “meu pai” e zu Hause significa “em casa”.' },
        { id: 'fs44', type: 'translate', prompt: 'Traduza para o alemão: “Eu tenho um irmão.”', answer: 'Ich habe einen Bruder.', answers: ['Ich habe einen Bruder.'], explanation: 'Bruder é masculino e objeto de haben, por isso usamos einen Bruder.' },
        { id: 'fs45', type: 'translate', prompt: 'Traduza para o alemão: “Ela tem duas irmãs.”', answer: 'Sie hat zwei Schwestern.', answers: ['Sie hat zwei Schwestern.'], explanation: 'Com sie, haben fica hat; zwei Schwestern significa “duas irmãs”.' },
        { id: 'fs46', type: 'translate', prompt: 'Traduza para o alemão: “Nós somos uma família pequena.”', answer: 'Wir sind eine kleine Familie.', answers: ['Wir sind eine kleine Familie.'], explanation: 'Wir sind significa “nós somos”; eine kleine Familie é “uma família pequena”.' },
        { id: 'fs47', type: 'translate', prompt: 'Traduza para o alemão: “Como você se chama?”', answer: 'Wie heißt du?', answers: ['Wie heißt du?'], explanation: 'Wie heißt du? é a forma informal de perguntar o nome de alguém.' },
        { id: 'fs48', type: 'translate', prompt: 'Traduza para o alemão: “De onde você vem?”', answer: 'Woher kommst du?', answers: ['Woher kommst du?'], explanation: 'Woher pergunta a origem; kommst du significa “você vem”.' },
        { id: 'fs49', type: 'translate', prompt: 'Traduza para o alemão: “O que você faz?”', answer: 'Was machst du?', answers: ['Was machst du?'], explanation: 'Was significa “o que” e machst du significa “você faz”.' },
        { id: 'fs50', type: 'translate', prompt: 'Traduza para o alemão: “Você fala inglês?”', answer: 'Sprichst du Englisch?', answers: ['Sprichst du Englisch?'], explanation: 'Sprichst du Englisch? é uma pergunta informal sobre falar inglês.' }
      ]
    },
    {
      id: 'pronunciation', number: 1, title: 'Pronúncia e leitura',
      description: 'Aprenda os sons que você vai ouvir todos os dias e ganhe segurança para ler suas primeiras palavras.',
      duration: '18 min', focus: 'Ouvir e reconhecer',
      introduction: 'O alemão fica muito mais fácil quando você para de tentar adivinhar os sons. Nesta aula, vamos criar um mapa de pronúncia prático: observe a combinação, ouça a palavra e repita em voz alta.',
      objectives: ['Reconhecer ä, ö, ü e ß', 'Ler combinações frequentes', 'Usar o áudio para treinar o ouvido'],
      sections: [
        { type: 'soundGrid', title: 'Os quatro sons especiais', lede: 'Eles não são enfeites: mudam a pronúncia e às vezes mudam o significado da palavra.', items: [
          { symbol: 'ä', title: 'ä / Ä', pronunciation: 'parecido com “é” aberto', example: 'Mädchen', translation: 'menina' },
          { symbol: 'ö', title: 'ö / Ö', pronunciation: 'faça “ê” com os lábios de “ô”', example: 'schön', translation: 'bonito / bonita' },
          { symbol: 'ü', title: 'ü / Ü', pronunciation: 'faça “i” com os lábios de “u”', example: 'müde', translation: 'cansado / cansada' },
          { symbol: 'ß', title: 'ß (Eszett)', pronunciation: 'soa como “ss”', example: 'Straße', translation: 'rua' }
        ]},
        { type: 'table', title: 'Combinações que aparecem o tempo todo', lede: 'Use estas aproximações apenas como ponto de partida. O botão Ouvir mostra o som real em alemão.', headers: ['Escrita', 'Som aproximado', 'Exemplo', 'Tradução'], rows: [
          ['ch', 'um sopro suave', 'ich', 'eu'], ['sch', '“x”', 'Schule', 'escola'], ['sp', '“xp” no início', 'Sport', 'esporte'], ['st', '“x t” no início', 'Stein', 'pedra'], ['z', '“ts”', 'Zeit', 'tempo'], ['w', '“v”', 'Wasser', 'água'], ['v', 'geralmente “f”', 'Vater', 'pai'], ['j', '“i”', 'ja', 'sim']
        ]},
        { type: 'table', title: 'Vogais em dupla', lede: 'Estas combinações são ótimos atalhos para ler palavras novas.', headers: ['Combinação', 'Leia como', 'Exemplo', 'Tradução'], rows: [
          ['ei', '“ai”', 'mein', 'meu / minha'], ['ie', '“i” longo', 'Liebe', 'amor'], ['eu', '“ói”', 'Deutsch', 'alemão'], ['äu', '“ói”', 'Häuser', 'casas']
        ]},
        { type: 'examples', title: 'Leia, ouça, repita', lede: 'Clique no alto-falante e repita cada palavra duas vezes.', items: [
          { de: 'Mädchen', pt: 'menina' }, { de: 'schön', pt: 'bonito / bonita' }, { de: 'müde', pt: 'cansado / cansada' }, { de: 'Straße', pt: 'rua' }, { de: 'Deutsch', pt: 'alemão' }, { de: 'Häuser', pt: 'casas' }
        ]}
      ],
      vocabulary: [
        { word: 'die Schule', meaning: 'a escola', example: 'Die Schule ist hier.' }, { word: 'die Straße', meaning: 'a rua', example: 'Die Straße ist lang.' },
        { word: 'das Wasser', meaning: 'a água', example: 'Das Wasser, bitte.' }, { word: 'der Sport', meaning: 'o esporte', example: 'Ich mache Sport.' },
        { word: 'mein', meaning: 'meu / minha', example: 'Das ist mein Buch.' }, { word: 'die Liebe', meaning: 'o amor', example: 'Liebe ist wichtig.' }
      ],
      summary: ['ä, ö e ü têm sons próprios.', 'ß tem som de “ss”.', 'sch soa como “x”; z começa com “ts”.', 'ei soa como “ai”; ie é um “i” longo.', 'Ouvir e repetir é mais importante do que decorar uma aproximação em português.'],
      exercises: [
        { id: 'p1', type: 'multiple', prompt: 'Qual combinação costuma soar como “ai”?', options: ['ie', 'ei', 'eu', 'äu'], answer: 'ei', explanation: 'Em alemão, ei costuma soar como “ai”: mein, Stein, drei.' },
        { id: 'p2', type: 'multiple', prompt: 'Qual palavra começa com o som “x”?', options: ['Vater', 'Schule', 'Zeit', 'Liebe'], answer: 'Schule', explanation: 'sch no início de Schule produz um som parecido com “x”.' },
        { id: 'p3', type: 'multiple', prompt: 'Qual é a pronúncia aproximada de Zeit?', options: ['“zait”', '“ziet”', '“xait”', '“tsait”'], answer: '“tsait”', explanation: 'A letra z alemã começa com “ts”. Zeit significa “tempo”.' },
        { id: 'p4', type: 'translate', prompt: 'Como dizer “água” em alemão? (inclua o artigo)', answer: 'das Wasser', answers: ['das Wasser'], explanation: 'Água é das Wasser. Aprenda o substantivo junto com seu artigo.' }
      ]
    },
    {
      id: 'pronouns', number: 2, title: 'Pronomes pessoais',
      description: 'Descubra quem faz a ação e comece a montar frases sobre você, outras pessoas e o tratamento formal.',
      duration: '20 min', focus: 'Falar sobre pessoas',
      introduction: 'Pronomes são as pequenas palavras que ocupam o lugar de nomes. Eles aparecem antes do verbo e determinam a forma que o verbo vai assumir.',
      objectives: ['Usar os nove pronomes básicos', 'Distinguir sie de Sie', 'Apresentar pessoas com frases simples'],
      sections: [
        { type: 'table', title: 'O mapa dos pronomes', lede: 'O contexto e a letra maiúscula ajudam a entender sie e Sie.', headers: ['Alemão', 'Português', 'Pista rápida'], rows: [
          ['ich', 'eu', 'quem fala'], ['du', 'você (informal)', 'uma pessoa próxima'], ['er', 'ele', 'masculino'], ['sie', 'ela', 'minúsculo'], ['es', 'isso / ele / ela neutro', 'neutro'], ['wir', 'nós', 'ich + outras pessoas'], ['ihr', 'vocês (informal)', 'mais de uma pessoa'], ['sie', 'eles / elas', 'minúsculo'], ['Sie', 'você / vocês (formal)', 'sempre maiúsculo']
        ]},
        { type: 'callout', title: 'Atenção ao “Sie”', text: '<strong>sie</strong> pode significar “ela” ou “eles/elas”. <strong>Sie</strong>, com S maiúsculo, é o tratamento formal. Na fala, o verbo e o contexto ajudam; na escrita, a maiúscula é uma pista importante.' },
        { type: 'examples', title: 'Frases de apresentação', items: [
          { de: 'Ich bin Leonardo.', pt: 'Eu sou Leonardo.' }, { de: 'Du bist hier.', pt: 'Você está aqui.' }, { de: 'Er arbeitet.', pt: 'Ele trabalha.' },
          { de: 'Sie lernt Deutsch.', pt: 'Ela aprende alemão.' }, { de: 'Wir wohnen in Deutschland.', pt: 'Nós moramos na Alemanha.' }, { de: 'Sprechen Sie Deutsch?', pt: 'Você fala alemão? (formal)' }
        ]}
      ],
      vocabulary: [
        { word: 'ich', meaning: 'eu', example: 'Ich lerne Deutsch.' }, { word: 'du', meaning: 'você informal', example: 'Du bist nett.' },
        { word: 'wir', meaning: 'nós', example: 'Wir wohnen hier.' }, { word: 'ihr', meaning: 'vocês informal', example: 'Ihr seid pünktlich.' },
        { word: 'sie', meaning: 'ela / eles / elas', example: 'Sie arbeitet heute.' }, { word: 'Sie', meaning: 'você / vocês formal', example: 'Wie heißen Sie?' }
      ],
      summary: ['ich significa “eu”; du é “você” informal.', 'er, sie e es significam ele, ela e neutro.', 'sie minúsculo pode ser ela ou eles/elas.', 'Sie maiúsculo é formal e pede verbo no plural.', 'O pronome vem normalmente antes do verbo em uma frase simples.'],
      exercises: [
        { id: 'pr1', type: 'multiple', prompt: '___ lernt Deutsch. (ela)', options: ['Er', 'Sie', 'Wir', 'Ihr'], answer: 'Sie', explanation: '“Ela” é sie. No início da frase, aparece como Sie porque toda primeira palavra é maiúscula.' },
        { id: 'pr2', type: 'multiple', prompt: 'Qual pronome significa “nós”?', options: ['ihr', 'sie', 'wir', 'du'], answer: 'wir', explanation: 'wir significa “nós”.' },
        { id: 'pr3', type: 'fill', prompt: 'Complete: ___ bin Leonardo. (eu)', answer: 'ich', explanation: 'A primeira pessoa do singular é ich: Ich bin Leonardo.' },
        { id: 'pr4', type: 'translate', prompt: 'Traduza para o alemão: “Nós moramos na Alemanha.”', answers: ['Wir wohnen in Deutschland.', 'wir wohnen in deutschland'], answer: 'Wir wohnen in Deutschland.', explanation: 'wir = nós, wohnen = moramos / morar e Deutschland = Alemanha.' }
      ]
    },
    {
      id: 'sein-haben', number: 3, title: 'Sein e haben',
      description: 'Domine os dois verbos mais importantes do alemão: ser/estar e ter, com frases úteis desde o primeiro dia.',
      duration: '24 min', focus: 'Bin, bist, habe',
      introduction: 'Sein e haben aparecem em apresentações, descrições, necessidades e situações do cotidiano. Vale aprender suas formas de cor, sempre ligadas a uma frase curta.',
      objectives: ['Conjugar sein no presente', 'Conjugar haben no presente', 'Descrever estados e necessidades'],
      sections: [
        { type: 'table', title: 'SEIN — ser / estar', headers: ['Pronome', 'Forma', 'Exemplo'], rows: [
          ['ich', 'bin', 'Ich bin müde.'], ['du', 'bist', 'Du bist nett.'], ['er / sie / es', 'ist', 'Er ist im Büro.'], ['wir', 'sind', 'Wir sind hier.'], ['ihr', 'seid', 'Ihr seid pünktlich.'], ['sie / Sie', 'sind', 'Sie sind freundlich.']
        ]},
        { type: 'table', title: 'HABEN — ter', headers: ['Pronome', 'Forma', 'Exemplo'], rows: [
          ['ich', 'habe', 'Ich habe Zeit.'], ['du', 'hast', 'Du hast ein Auto.'], ['er / sie / es', 'hat', 'Er hat eine Frage.'], ['wir', 'haben', 'Wir haben Arbeit.'], ['ihr', 'habt', 'Ihr habt Hunger.'], ['sie / Sie', 'haben', 'Sie haben Zeit.']
        ]},
        { type: 'examples', title: 'Frases que você vai usar', lede: 'Ouça a frase completa. O ritmo ajuda a fixar a forma do verbo.', items: [
          { de: 'Ich bin müde.', pt: 'Estou cansado / cansada.' }, { de: 'Ich bin glücklich.', pt: 'Estou feliz.' }, { de: 'Ich bin zu Hause.', pt: 'Estou em casa.' },
          { de: 'Du bist nett.', pt: 'Você é gentil.' }, { de: 'Er ist im Büro.', pt: 'Ele está no escritório.' }, { de: 'Ich habe Zeit.', pt: 'Eu tenho tempo.' },
          { de: 'Ich habe Hunger.', pt: 'Estou com fome.' }, { de: 'Du hast ein Auto.', pt: 'Você tem um carro.' }, { de: 'Er hat eine Frage.', pt: 'Ele tem uma pergunta.' }, { de: 'Wir haben Arbeit.', pt: 'Nós temos trabalho.' }
        ]},
        { type: 'callout', title: 'Uma pista para lembrar', text: 'As formas de <strong>sein</strong> são mais irregulares: bin, bist, ist, sind, seid. Já <strong>haben</strong> mantém “hab-” na maior parte da conjugação, mas muda para hast e hat no singular.' }
      ],
      vocabulary: [
        { word: 'müde', meaning: 'cansado / cansada', example: 'Ich bin müde.' }, { word: 'glücklich', meaning: 'feliz', example: 'Sie ist glücklich.' },
        { word: 'zu Hause', meaning: 'em casa', example: 'Wir sind zu Hause.' }, { word: 'Zeit', meaning: 'tempo', example: 'Ich habe Zeit.' },
        { word: 'Hunger', meaning: 'fome', example: 'Ich habe Hunger.' }, { word: 'die Frage', meaning: 'a pergunta', example: 'Ich habe eine Frage.' }
      ],
      summary: ['bin, bist, ist, sind, seid são formas de sein.', 'habe, hast, hat, haben, habt são formas de haben.', 'Em alemão, fome e tempo são expressos com haben.', 'Aprenda a forma do verbo junto com uma frase curta.', 'O verbo muda de acordo com o pronome.'],
      exercises: [
        { id: 'sh1', type: 'multiple', prompt: 'Ich ___ müde.', options: ['bin', 'bist', 'ist', 'sind'], answer: 'bin', explanation: 'Com ich, sein vira bin: Ich bin müde.' },
        { id: 'sh2', type: 'multiple', prompt: 'Du ___ nett.', options: ['bin', 'bist', 'ist', 'seid'], answer: 'bist', explanation: 'Com du, usamos bist.' },
        { id: 'sh3', type: 'multiple', prompt: 'Er ___ im Büro.', options: ['bin', 'bist', 'ist', 'sind'], answer: 'ist', explanation: 'er/sie/es usa ist.' },
        { id: 'sh4', type: 'multiple', prompt: 'Wir ___ hier.', options: ['ist', 'seid', 'sind', 'bin'], answer: 'sind', explanation: 'wir usa sind.' },
        { id: 'sh5', type: 'multiple', prompt: 'Ihr ___ pünktlich.', options: ['sind', 'seid', 'ist', 'habt'], answer: 'seid', explanation: 'ihr usa seid.' },
        { id: 'sh6', type: 'multiple', prompt: 'Ich ___ Zeit.', options: ['hat', 'hast', 'habe', 'haben'], answer: 'habe', explanation: 'Com ich, haben vira habe.' },
        { id: 'sh7', type: 'multiple', prompt: 'Du ___ ein Auto.', options: ['habe', 'hast', 'hat', 'habt'], answer: 'hast', explanation: 'du usa hast.' },
        { id: 'sh8', type: 'multiple', prompt: 'Er ___ eine Frage.', options: ['hat', 'hast', 'haben', 'habe'], answer: 'hat', explanation: 'er/sie/es usa hat.' },
        { id: 'sh9', type: 'multiple', prompt: 'Wir ___ Arbeit.', options: ['habt', 'hat', 'haben', 'habe'], answer: 'haben', explanation: 'wir usa haben.' },
        { id: 'sh10', type: 'translate', prompt: 'Traduza: “Eu estou em casa.”', answers: ['Ich bin zu Hause.', 'ich bin zu hause'], answer: 'Ich bin zu Hause.', explanation: 'A frase é Ich bin zu Hause. Zu Hause é a expressão “em casa”.' }
      ]
    },
    {
      id: 'sentence-structure', number: 4, title: 'Estrutura básica das frases',
      description: 'Entenda a posição 2 do verbo e construa frases claras mesmo quando você começa com hoje, amanhã ou outro elemento.',
      duration: '20 min', focus: 'Verbo na posição 2',
      introduction: 'A frase alemã fica previsível quando você encontra o verbo conjugado. Em uma declaração, ele costuma ocupar a segunda posição — o segundo elemento da frase, não necessariamente a segunda palavra.',
      objectives: ['Identificar o verbo conjugado', 'Montar frases declarativas', 'Começar frases com tempo ou lugar'],
      sections: [
        { type: 'rule', title: 'A regra que organiza a frase', segments: ['Posição 1', 'VERBO', 'Resto da frase'], verbIndex: 1, caption: 'O verbo conjugado normalmente fica no segundo elemento.' },
        { type: 'examples', title: 'Sujeito primeiro', items: [
          { de: 'Ich arbeite bei Bosch.', pt: 'Eu trabalho na Bosch.', note: 'Ich = posição 1 · arbeite = verbo' }, { de: 'Ich lerne Deutsch.', pt: 'Eu aprendo alemão.' }, { de: 'Ich wohne in Stuttgart.', pt: 'Eu moro em Stuttgart.' }
        ]},
        { type: 'examples', title: 'Outro elemento primeiro', lede: 'Quando Hoje ocupa a posição 1, o sujeito vai depois do verbo.', items: [
          { de: 'Heute arbeite ich.', pt: 'Hoje eu trabalho.', note: 'Heute = posição 1 · arbeite = verbo · ich = sujeito' }, { de: 'Heute lerne ich Deutsch.', pt: 'Hoje eu aprendo alemão.' }, { de: 'Am Montag arbeite ich.', pt: 'Na segunda-feira eu trabalho.' }
        ]},
        { type: 'callout', title: 'Segundo elemento, não segunda palavra', text: 'Em <strong>Am Montag arbeite ich</strong>, “Am Montag” funciona como um bloco de tempo. Por isso, arbeite continua na posição 2, mesmo aparecendo como a terceira palavra.' }
      ],
      vocabulary: [
        { word: 'heute', meaning: 'hoje', example: 'Heute lerne ich.' }, { word: 'am Montag', meaning: 'na segunda-feira', example: 'Am Montag arbeite ich.' },
        { word: 'arbeiten', meaning: 'trabalhar', example: 'Ich arbeite bei Bosch.' }, { word: 'lernen', meaning: 'aprender', example: 'Ich lerne Deutsch.' },
        { word: 'wohnen', meaning: 'morar', example: 'Ich wohne in Stuttgart.' }, { word: 'bei', meaning: 'em / na (empresa)', example: 'bei Bosch' }
      ],
      summary: ['Uma declaração costuma ter o verbo conjugado na posição 2.', 'Posição 2 é o segundo elemento sintático.', 'O sujeito pode vir depois do verbo.', 'Hoje = heute; na segunda-feira = am Montag.', 'Não traduza a ordem do português palavra por palavra.'],
      exercises: [
        { id: 'st1', type: 'order', prompt: 'Ordene as palavras: Deutsch / ich / lerne', answer: ['Ich', 'lerne', 'Deutsch'], explanation: 'A frase fica Ich lerne Deutsch. O verbo lerne ocupa a posição 2.' },
        { id: 'st2', type: 'order', prompt: 'Ordene as palavras: Heute / ich / arbeite', answer: ['Heute', 'arbeite', 'ich'], explanation: 'Heute é o primeiro elemento; arbeite permanece na posição 2.' },
        { id: 'st3', type: 'multiple', prompt: 'Qual frase está correta?', options: ['Heute ich lerne Deutsch.', 'Heute lerne ich Deutsch.', 'Heute Deutsch ich lerne.', 'Lerne heute ich Deutsch.'], answer: 'Heute lerne ich Deutsch.', explanation: 'Depois de Hoje, vem o verbo conjugado: Heute lerne ich Deutsch.' },
        { id: 'st4', type: 'truefalse', prompt: 'Verdadeiro ou falso: na frase alemã, o verbo conjugado precisa ser sempre a segunda palavra.', options: ['Verdadeiro', 'Falso'], answer: 'Falso', explanation: 'Ele costuma ser o segundo elemento. Um bloco como Am Montag pode ter duas palavras e ocupar a posição 1.' }
      ]
    },
    {
      id: 'questions', number: 5, title: 'Perguntas em alemão',
      description: 'Aprenda as palavras interrogativas essenciais e monte perguntas que resolvem situações reais na Alemanha.',
      duration: '21 min', focus: 'Perguntar e entender',
      introduction: 'Fazer uma boa pergunta é uma das formas mais rápidas de ganhar autonomia. Primeiro, reconheça a palavra interrogativa; depois, deixe o verbo fazer o trabalho.',
      objectives: ['Reconhecer as principais W-Fragen', 'Perguntar sobre lugares, preços e horários', 'Usar frases de sobrevivência'],
      sections: [
        { type: 'table', title: 'As palavras que abrem portas', headers: ['Pergunta', 'Significado', 'Exemplo'], rows: [
          ['Was?', 'o quê?', 'Was ist das?'], ['Wer?', 'quem?', 'Wer ist das?'], ['Wo?', 'onde?', 'Wo ist der Bahnhof?'], ['Woher?', 'de onde?', 'Woher kommst du?'], ['Wohin?', 'para onde?', 'Wohin gehst du?'], ['Wann?', 'quando?', 'Wann kommt der Zug?'], ['Warum?', 'por quê?', 'Warum lernst du Deutsch?'], ['Wie?', 'como?', 'Wie heißt du?'], ['Wie viel?', 'quanto?', 'Wie viel kostet das?'], ['Wie lange?', 'quanto tempo?', 'Wie lange dauert das?']
        ]},
        { type: 'examples', title: 'Perguntas úteis de verdade', items: [
          { de: 'Wo ist der Bahnhof?', pt: 'Onde fica a estação de trem?' }, { de: 'Wie viel kostet das?', pt: 'Quanto custa isso?' }, { de: 'Wann kommt der Zug?', pt: 'Quando chega o trem?' }, { de: 'Woher kommst du?', pt: 'De onde você vem?' }, { de: 'Warum lernst du Deutsch?', pt: 'Por que você aprende alemão?' }, { de: 'Wie heißt du?', pt: 'Como você se chama?' }, { de: 'Sprechen Sie Englisch?', pt: 'Você fala inglês? (formal)' }
        ]},
        { type: 'scenario', title: 'Frases de bolso', scenarios: [
          { icon: 'life-buoy', title: 'Quando precisar de ajuda', phrases: ['Entschuldigung, wo ist der Bahnhof?', 'Können Sie mir helfen?', 'Sprechen Sie Englisch?'] },
          { icon: 'credit-card', title: 'Quando for pagar', phrases: ['Wie viel kostet das?', 'Kann ich mit Karte bezahlen?'] }
        ]}
      ],
      vocabulary: [
        { word: 'der Bahnhof', meaning: 'a estação de trem', example: 'Wo ist der Bahnhof?' }, { word: 'der Zug', meaning: 'o trem', example: 'Wann kommt der Zug?' },
        { word: 'wie viel', meaning: 'quanto', example: 'Wie viel kostet das?' }, { word: 'warum', meaning: 'por quê', example: 'Warum lernst du Deutsch?' },
        { word: 'helfen', meaning: 'ajudar', example: 'Können Sie mir helfen?' }, { word: 'bezahlen', meaning: 'pagar', example: 'Kann ich mit Karte bezahlen?' }
      ],
      summary: ['Wo pergunta por lugar; wohin pergunta destino.', 'Woher pergunta origem.', 'Wie viel é usado para perguntar preços e quantidades.', 'Entschuldigung é uma forma educada de chamar alguém.', 'Perguntas formais usam Sie.'],
      exercises: [
        { id: 'q1', type: 'multiple', prompt: '___ ist der Bahnhof? (onde)', options: ['Was', 'Wo', 'Wann', 'Warum'], answer: 'Wo', explanation: 'Wo significa “onde”.' },
        { id: 'q2', type: 'multiple', prompt: '___ kostet das? (quanto)', options: ['Wie viel', 'Woher', 'Wer', 'Wie lange'], answer: 'Wie viel', explanation: 'Wie viel significa “quanto” e aparece muito em perguntas de preço.' },
        { id: 'q3', type: 'multiple', prompt: '___ kommt der Zug? (quando)', options: ['Warum', 'Wohin', 'Wann', 'Was'], answer: 'Wann', explanation: 'Wann pergunta “quando”.' },
        { id: 'q4', type: 'translate', prompt: 'Traduza: “Você fala inglês?” (formal)', answers: ['Sprechen Sie Englisch?', 'sprechen sie englisch'], answer: 'Sprechen Sie Englisch?', explanation: 'Com Sie formal, a pergunta fica Sprechen Sie Englisch?' }
      ]
    },
    {
      id: 'present-verbs', number: 6, title: 'Verbos no presente',
      description: 'Use a lógica dos verbos regulares para falar sobre trabalho, estudo, moradia, compras e rotina.',
      duration: '24 min', focus: 'Ações do dia a dia',
      introduction: 'A maioria dos verbos regulares segue um padrão claro. Retire -en para encontrar o radical e acrescente a terminação correspondente ao pronome.',
      objectives: ['Encontrar o radical do verbo', 'Conjugar machen e verbos frequentes', 'Falar sobre sua rotina'],
      sections: [
        { type: 'rule', title: 'machen como modelo', segments: ['mach-', 'terminação', 'frase'], verbIndex: 0, caption: 'Radical + terminação. No presente, a terminação acompanha o pronome.' },
        { type: 'table', title: 'As terminações regulares', headers: ['Pronome', 'Final', 'machen'], rows: [
          ['ich', '-e', 'ich mache'], ['du', '-st', 'du machst'], ['er / sie / es', '-t', 'er macht'], ['wir', '-en', 'wir machen'], ['ihr', '-t', 'ihr macht'], ['sie / Sie', '-en', 'sie machen']
        ]},
        { type: 'table', title: 'Verbos para sua primeira semana', headers: ['Infinitivo', 'Significado', 'Exemplo'], rows: [
          ['machen', 'fazer', 'Ich mache Sport.'], ['arbeiten', 'trabalhar', 'Ich arbeite heute.'], ['lernen', 'aprender', 'Wir lernen Deutsch.'], ['wohnen', 'morar', 'Ich wohne in Stuttgart.'], ['kommen', 'vir', 'Ich komme aus Brasilien.'], ['kaufen', 'comprar', 'Wir kaufen Brot.'], ['brauchen', 'precisar', 'Ich brauche Hilfe.'], ['spielen', 'jogar / brincar', 'Die Kinder spielen.'], ['fragen', 'perguntar', 'Ich frage den Lehrer.']
        ]},
        { type: 'callout', title: 'Pequena atenção', text: 'Verbos cujo radical termina em -t ou -d podem ganhar um “e” de apoio em algumas formas: <strong>arbeiten → du arbeitest</strong>. Não tente aplicar o padrão de forma mecânica a todos os verbos.' }
      ],
      vocabulary: [
        { word: 'machen', meaning: 'fazer', example: 'Was machst du?' }, { word: 'arbeiten', meaning: 'trabalhar', example: 'Ich arbeite bei Bosch.' },
        { word: 'lernen', meaning: 'aprender', example: 'Ich lerne Deutsch.' }, { word: 'wohnen', meaning: 'morar', example: 'Wir wohnen in Deutschland.' },
        { word: 'kaufen', meaning: 'comprar', example: 'Ich kaufe Brot.' }, { word: 'brauchen', meaning: 'precisar', example: 'Ich brauche Hilfe.' }
      ],
      summary: ['Retire -en para encontrar o radical de um verbo regular.', 'ich recebe -e; du recebe -st.', 'er/sie/es recebe -t; ihr também recebe -t.', 'wir e sie/Sie recebem -en.', 'Alguns radicais pedem um “e” de apoio, como arbeiten.'],
      exercises: [
        { id: 'v1', type: 'fill', prompt: 'Ich ___ Deutsch. (lernen)', answer: 'lerne', explanation: 'ich recebe a terminação -e: lernen → ich lerne.' },
        { id: 'v2', type: 'fill', prompt: 'Du ___ in Berlin. (wohnen)', answer: 'wohnst', explanation: 'du recebe -st: wohnen → du wohnst.' },
        { id: 'v3', type: 'fill', prompt: 'Er ___ bei Bosch. (arbeiten)', answer: 'arbeitet', explanation: 'arbeiten tem um “e” de apoio: er arbeitet.' },
        { id: 'v4', type: 'multiple', prompt: 'Qual é a forma correta para wir + machen?', options: ['wir macht', 'wir machen', 'wir machst', 'wir mache'], answer: 'wir machen', explanation: 'wir recebe -en: wir machen.' },
        { id: 'v5', type: 'translate', prompt: 'Traduza: “Eu preciso de ajuda.”', answers: ['Ich brauche Hilfe.', 'ich brauche hilfe'], answer: 'Ich brauche Hilfe.', explanation: 'brauchen → ich brauche; Hilfe é ajuda.' }
      ]
    },
    {
      id: 'articles', number: 7, title: 'Artigos e gênero',
      description: 'Aprenda a tratar cada substantivo como um conjunto: artigo + palavra. Isso deixa sua fala muito mais natural.',
      duration: '22 min', focus: 'Der, die, das',
      introduction: 'Todo substantivo alemão tem gênero gramatical. Para quem fala português, a melhor estratégia é nunca memorizar a palavra sozinha: aprenda der Tisch, die Stadt, das Haus.',
      objectives: ['Reconhecer os artigos definidos', 'Usar ein e eine', 'Memorizar substantivos com artigo'],
      sections: [
        { type: 'table', title: 'Os artigos definidos', headers: ['Artigo', 'Gênero / número', 'Exemplo'], rows: [
          ['der', 'masculino', 'der Mann · o homem'], ['die', 'feminino', 'die Frau · a mulher'], ['das', 'neutro', 'das Auto · o carro'], ['die', 'plural', 'die Kinder · as crianças']
        ]},
        { type: 'scenario', title: 'Vocabulário agrupado', scenarios: [
          { icon: 'user-round', title: 'Masculino · der', phrases: ['der Mann — o homem', 'der Tisch — a mesa', 'der Bahnhof — a estação', 'der Zug — o trem'] },
          { icon: 'user-round', title: 'Feminino · die', phrases: ['die Frau — a mulher', 'die Stadt — a cidade', 'die Arbeit — o trabalho', 'die Schule — a escola'] },
          { icon: 'box', title: 'Neutro · das', phrases: ['das Auto — o carro', 'das Haus — a casa', 'das Kind — a criança', 'das Wasser — a água'] }
        ]},
        { type: 'table', title: 'Um / uma', lede: 'O artigo indefinido acompanha o gênero. No plural, não existe um equivalente direto de “um/uma”.', headers: ['Definido', 'Indefinido', 'Exemplo'], rows: [
          ['der', 'ein', 'ein Mann'], ['die', 'eine', 'eine Frau'], ['das', 'ein', 'ein Auto']
        ]},
        { type: 'callout', title: 'A regra de ouro', text: 'Não memorize <strong>Tisch = mesa</strong>. Memorize <strong>der Tisch = a mesa</strong>. O artigo faz parte da palavra e vai ajudar você nas próximas aulas.' }
      ],
      vocabulary: [
        { word: 'der Mann', meaning: 'o homem', example: 'Der Mann ist hier.' }, { word: 'die Frau', meaning: 'a mulher', example: 'Die Frau arbeitet.' },
        { word: 'das Kind', meaning: 'a criança', example: 'Das Kind lernt.' }, { word: 'der Tisch', meaning: 'a mesa', example: 'Der Tisch ist groß.' },
        { word: 'die Stadt', meaning: 'a cidade', example: 'Die Stadt ist schön.' }, { word: 'das Haus', meaning: 'a casa', example: 'Das Haus ist neu.' }
      ],
      summary: ['der é masculino; die é feminino e plural; das é neutro.', 'O gênero alemão nem sempre coincide com o gênero em português.', 'Aprenda substantivos com artigo.', 'ein acompanha der e das; eine acompanha die.', 'O plural usa die no artigo definido.'],
      exercises: [
        { id: 'a1', type: 'multiple', prompt: '___ Auto', options: ['der', 'die', 'das'], answer: 'das', explanation: 'Carro é das Auto.' },
        { id: 'a2', type: 'multiple', prompt: '___ Frau', options: ['der', 'die', 'das'], answer: 'die', explanation: 'Mulher é die Frau.' },
        { id: 'a3', type: 'multiple', prompt: '___ Bahnhof', options: ['der', 'die', 'das'], answer: 'der', explanation: 'Estação de trem é der Bahnhof.' },
        { id: 'a4', type: 'multiple', prompt: 'Qual forma significa “uma casa”?', options: ['ein Haus', 'eine Haus', 'der Haus', 'ein Hause'], answer: 'ein Haus', explanation: 'Haus é neutro, então usamos ein Haus.' },
        { id: 'a5', type: 'translate', prompt: 'Traduza: “a escola”', answers: ['die Schule'], answer: 'die Schule', explanation: 'Escola é die Schule. Guarde o artigo junto.' }
      ]
    },
    {
      id: 'negation', number: 8, title: 'Negação: nicht e kein',
      description: 'Diga que algo não acontece, não é caro ou que você não tem alguma coisa sem travar na hora de falar.',
      duration: '19 min', focus: 'Dizer “não”',
      introduction: 'Em alemão, há dois caminhos principais para negar. Pense primeiro no que você está negando: uma ação ou característica pede nicht; um substantivo sem artigo definido pede kein.',
      objectives: ['Usar nicht para ações e adjetivos', 'Usar kein para substantivos', 'Negar frases do cotidiano'],
      sections: [
        { type: 'compare', title: 'nicht × kein', items: [
          { label: 'nicht', color: 'coral', description: 'nega uma ação, adjetivo ou frase inteira', examples: ['Ich verstehe nicht. — Eu não entendo.', 'Das ist nicht teuer. — Isso não é caro.'] },
          { label: 'kein', color: 'teal', description: 'nega um substantivo: nenhum / nenhuma / não ter', examples: ['Ich habe kein Auto. — Eu não tenho carro.', 'Ich habe keine Zeit. — Eu não tenho tempo.'] }
        ]},
        { type: 'examples', title: 'Compare no contexto', items: [
          { de: 'Ich arbeite heute nicht.', pt: 'Eu não trabalho hoje.', note: 'não + ação' }, { de: 'Ich verstehe nicht.', pt: 'Eu não entendo.', note: 'não + ação' }, { de: 'Das ist nicht teuer.', pt: 'Isso não é caro.', note: 'não + adjetivo' }, { de: 'Das ist kein Problem.', pt: 'Isso não é um problema.', note: 'kein + substantivo' }, { de: 'Ich habe keine Zeit.', pt: 'Eu não tenho tempo.', note: 'keine + substantivo' }
        ]},
        { type: 'callout', title: 'Uma primeira aproximação segura', text: 'Se você está negando a existência ou posse de uma coisa, use <strong>kein</strong>: Ich habe kein Auto. Se está negando o que alguém faz ou uma qualidade, use <strong>nicht</strong>: Ich arbeite nicht.' }
      ],
      vocabulary: [
        { word: 'nicht', meaning: 'não', example: 'Ich verstehe nicht.' }, { word: 'kein', meaning: 'nenhum / não um', example: 'Kein Problem!' },
        { word: 'keine Zeit', meaning: 'sem tempo', example: 'Ich habe keine Zeit.' }, { word: 'teuer', meaning: 'caro', example: 'Das ist nicht teuer.' },
        { word: 'verstehen', meaning: 'entender', example: 'Ich verstehe Deutsch.' }, { word: 'das Problem', meaning: 'o problema', example: 'Das ist kein Problem.' }
      ],
      summary: ['nicht nega ações, adjetivos ou a frase.', 'kein nega um substantivo.', 'kein acompanha palavras de gênero neutro e masculino no básico.', 'keine aparece com palavras femininas e no plural.', 'Aprenda frases inteiras, não apenas a regra isolada.'],
      exercises: [
        { id: 'n1', type: 'multiple', prompt: 'Ich verstehe ___.', options: ['nicht', 'kein', 'keine'], answer: 'nicht', explanation: 'Verstehen é uma ação; usamos nicht.' },
        { id: 'n2', type: 'multiple', prompt: 'Ich habe ___ Auto.', options: ['nicht', 'kein', 'keine'], answer: 'kein', explanation: 'Auto é um substantivo neutro: kein Auto.' },
        { id: 'n3', type: 'multiple', prompt: 'Ich habe ___ Zeit.', options: ['nicht', 'kein', 'keine'], answer: 'keine', explanation: 'Zeit é feminina: keine Zeit.' },
        { id: 'n4', type: 'fill', prompt: 'Das ist ___ teuer. (não)', answer: 'nicht', explanation: 'Teuer é um adjetivo; use nicht.' },
        { id: 'n5', type: 'translate', prompt: 'Traduza: “Isso não é um problema.”', answers: ['Das ist kein Problem.', 'das ist kein problem'], answer: 'Das ist kein Problem.', explanation: 'Problem é neutro e aparece sem artigo definido na expressão: kein Problem.' },
        { id: 'n6', type: 'truefalse', prompt: 'Verdadeiro ou falso: “kein” é usado para negar uma ação.', options: ['Verdadeiro', 'Falso'], answer: 'Falso', explanation: 'kein nega um substantivo. Ações são negadas com nicht.' },
        { id: 'n7', type: 'multiple', prompt: 'Qual frase está correta?', options: ['Ich habe nicht Auto.', 'Ich habe kein Auto.', 'Ich habe keine Auto.', 'Ich kein habe Auto.'], answer: 'Ich habe kein Auto.', explanation: 'Auto é neutro: Ich habe kein Auto.' },
        { id: 'n8', type: 'translate', prompt: 'Traduza: “Eu não trabalho hoje.”', answers: ['Ich arbeite heute nicht.', 'ich arbeite heute nicht'], answer: 'Ich arbeite heute nicht.', explanation: 'Aqui negamos a ação arbeiten, por isso usamos nicht.' }
      ]
    },
    {
      id: 'accusative', number: 9, title: 'Acusativo',
      description: 'Uma introdução tranquila ao objeto direto: perceba por que der muda para den e ein para einen.',
      duration: '22 min', focus: 'Quem faz · o que recebe',
      introduction: 'Você já consegue formar frases. Agora vamos observar o que acontece com a pessoa ou coisa que recebe diretamente a ação. No início, concentre-se na mudança do masculino.',
      objectives: ['Diferenciar sujeito e objeto', 'Reconhecer der → den', 'Usar ein → einen no masculino'],
      sections: [
        { type: 'rule', title: 'Quem faz e quem recebe', segments: ['Quem faz', 'VERBO', 'Objeto direto'], verbIndex: 1, caption: 'Nominativo = quem realiza. Acusativo = objeto direto da ação.' },
        { type: 'table', title: 'A mudança básica', headers: ['Gênero / número', 'Nominativo', 'Acusativo'], rows: [
          ['masculino', 'der', 'den'], ['feminino', 'die', 'die'], ['neutro', 'das', 'das'], ['plural', 'die', 'die']
        ]},
        { type: 'table', title: 'Com o artigo indefinido', headers: ['Gênero', 'Nominativo', 'Acusativo'], rows: [
          ['masculino', 'ein', 'einen'], ['feminino', 'eine', 'eine'], ['neutro', 'ein', 'ein']
        ]},
        { type: 'examples', title: 'Veja a mudança em frases reais', items: [
          { de: 'Der Mann ist hier.', pt: 'O homem está aqui.', note: 'der Mann = sujeito' }, { de: 'Ich sehe den Mann.', pt: 'Eu vejo o homem.', note: 'den Mann = objeto' }, { de: 'Ich kaufe einen Kaffee.', pt: 'Eu compro um café.' }, { de: 'Ich habe einen Termin.', pt: 'Eu tenho um compromisso.' }, { de: 'Ich brauche einen Arzt.', pt: 'Eu preciso de um médico.' }, { de: 'Ich kaufe das Brot.', pt: 'Eu compro o pão.' }, { de: 'Ich sehe die Frau.', pt: 'Eu vejo a mulher.' }
        ]},
        { type: 'callout', title: 'Não tente aprender tudo agora', text: 'Nesta etapa, guarde uma única imagem mental: quando um substantivo masculino recebe diretamente a ação, <strong>der → den</strong> e <strong>ein → einen</strong>. die e das ficam iguais neste quadro básico.' }
      ],
      vocabulary: [
        { word: 'sehen', meaning: 'ver', example: 'Ich sehe den Mann.' }, { word: 'kaufen', meaning: 'comprar', example: 'Ich kaufe einen Kaffee.' },
        { word: 'der Kaffee', meaning: 'o café', example: 'Einen Kaffee, bitte.' }, { word: 'der Termin', meaning: 'o compromisso', example: 'Ich habe einen Termin.' },
        { word: 'der Arzt', meaning: 'o médico', example: 'Ich brauche einen Arzt.' }, { word: 'das Brot', meaning: 'o pão', example: 'Ich kaufe das Brot.' }
      ],
      summary: ['Nominativo é quem faz a ação.', 'Acusativo é o objeto direto.', 'No masculino: der vira den.', 'No masculino: ein vira einen.', 'die e das permanecem iguais nesta introdução.'],
      exercises: [
        { id: 'ac1', type: 'multiple', prompt: 'Ich sehe ___ Mann.', options: ['der', 'den', 'die', 'das'], answer: 'den', explanation: 'Mann recebe a ação de ver: masculino no acusativo = den Mann.' },
        { id: 'ac2', type: 'multiple', prompt: 'Ich kaufe ___ Kaffee.', options: ['ein', 'einen', 'eine', 'der'], answer: 'einen', explanation: 'Kaffee é masculino e é objeto direto: einen Kaffee.' },
        { id: 'ac3', type: 'multiple', prompt: 'Ich sehe ___ Frau.', options: ['der', 'den', 'die', 'das'], answer: 'die', explanation: 'Feminino permanece die no acusativo.' },
        { id: 'ac4', type: 'multiple', prompt: 'Ich kaufe ___ Brot.', options: ['den', 'ein', 'das', 'einen'], answer: 'das', explanation: 'Brot é neutro: das permanece das.' },
        { id: 'ac5', type: 'fill', prompt: 'Ich habe ___ Termin. (ein, masculino)', answer: 'einen', explanation: 'Termin é masculino e objeto direto: einen Termin.' },
        { id: 'ac6', type: 'translate', prompt: 'Traduza: “Eu preciso de um médico.”', answers: ['Ich brauche einen Arzt.', 'ich brauche einen arzt'], answer: 'Ich brauche einen Arzt.', explanation: 'Arzt é masculino e está no acusativo: einen Arzt.' }
      ]
    },
    {
      id: 'modals-real-life', number: 10, title: 'Verbos modais e alemão da vida real',
      description: 'Feche o A1 Starter com kann, muss e möchte — e leve frases prontas para supermercado, restaurante, transporte e trabalho.',
      duration: '28 min', focus: 'Se virar na Alemanha',
      introduction: 'Verbos modais expressam o que você pode, precisa, quer ou gostaria de fazer. Eles deixam suas frases muito mais úteis: o modal conjugado fica na posição 2 e o infinitivo vai para o final.',
      objectives: ['Usar können, müssen, wollen, möchten e dürfen', 'Construir frases com dois verbos', 'Resolver situações práticas'],
      sections: [
        { type: 'table', title: 'Modais essenciais', headers: ['Verbo', 'Ideia', '1ª pessoa'], rows: [
          ['können', 'poder / conseguir', 'ich kann'], ['müssen', 'precisar / ter que', 'ich muss'], ['wollen', 'querer', 'ich will'], ['möchten', 'gostaria', 'ich möchte'], ['dürfen', 'poder / ter permissão', 'ich darf']
        ]},
        { type: 'rule', title: 'Dois verbos, duas posições', segments: ['Ich', 'kann', 'Deutsch', 'sprechen'], verbIndex: 1, caption: 'O modal conjugado fica na posição 2; o infinitivo fecha a frase.' },
        { type: 'examples', title: 'Frases para guardar', items: [
          { de: 'Ich kann Deutsch sprechen.', pt: 'Eu consigo falar alemão.' }, { de: 'Ich muss arbeiten.', pt: 'Eu preciso trabalhar.' }, { de: 'Ich möchte einen Kaffee.', pt: 'Eu gostaria de um café.' }, { de: 'Ich will nach Hause gehen.', pt: 'Eu quero ir para casa.' }, { de: 'Darf ich hier sitzen?', pt: 'Posso sentar aqui?' }, { de: 'Kann ich mit Karte bezahlen?', pt: 'Posso pagar com cartão?' }, { de: 'Können Sie mir helfen?', pt: 'Você pode me ajudar? (formal)' }
        ]},
        { type: 'scenario', title: 'Alemão da vida real', scenarios: [
          { icon: 'shopping-basket', title: 'Supermercado', phrases: ['Wo finde ich ...?', 'Wie viel kostet das?', 'Kann ich mit Karte bezahlen?', 'Brauchen Sie eine Tüte?'] },
          { icon: 'utensils', title: 'Restaurante', phrases: ['Ich möchte ...', 'Die Rechnung, bitte.', 'Ein Wasser, bitte.', 'Ich hätte gerne ...'] },
          { icon: 'train-front', title: 'Transporte', phrases: ['Wo ist der Bahnhof?', 'Wann kommt der Zug?', 'Fährt dieser Zug nach Stuttgart?', 'Welches Gleis?'] },
          { icon: 'briefcase-business', title: 'Trabalho', phrases: ['Guten Morgen.', 'Ich habe eine Frage.', 'Können Sie mir helfen?', 'Können Sie das bitte wiederholen?'] }
        ]},
        { type: 'dialogue', title: 'Mini diálogo: primeiro contato', lines: [
          ['A', 'Guten Morgen!'], ['B', 'Guten Morgen!'], ['A', 'Sprechen Sie Englisch?'], ['B', 'Ja, ein bisschen.']
        ]},
        { type: 'examples', title: 'Apresentação pessoal', items: [
          { de: 'Ich heiße Leonardo.', pt: 'Eu me chamo Leonardo.' }, { de: 'Ich komme aus Brasilien.', pt: 'Eu venho do Brasil.' }, { de: 'Ich wohne in Stuttgart.', pt: 'Eu moro em Stuttgart.' }, { de: 'Ich arbeite bei Bosch.', pt: 'Eu trabalho na Bosch.' }, { de: 'Ich lerne Deutsch.', pt: 'Eu aprendo alemão.' }
        ]}
      ],
      vocabulary: [
        { word: 'können', meaning: 'poder / conseguir', example: 'Kann ich bezahlen?' }, { word: 'müssen', meaning: 'ter que', example: 'Ich muss arbeiten.' },
        { word: 'möchten', meaning: 'gostaria', example: 'Ich möchte ein Wasser.' }, { word: 'die Rechnung', meaning: 'a conta', example: 'Die Rechnung, bitte.' },
        { word: 'das Gleis', meaning: 'a plataforma / trilho', example: 'Welches Gleis?' }, { word: 'wiederholen', meaning: 'repetir', example: 'Bitte wiederholen.' }
      ],
      summary: ['O modal conjugado fica na posição 2.', 'O infinitivo vai para o final: Ich kann Deutsch sprechen.', 'möchte é uma forma educada de pedir.', 'Können Sie mir helfen? é uma frase-chave.', 'Frases curtas e educadas já resolvem muitas situações.'],
      exercises: [
        { id: 'm1', type: 'multiple', prompt: 'Ich ___ Deutsch sprechen. (consigo)', options: ['kann', 'muss', 'will', 'darf'], answer: 'kann', explanation: 'können na primeira pessoa é ich kann.' },
        { id: 'm2', type: 'multiple', prompt: 'Ich ___ arbeiten. (tenho que)', options: ['möchte', 'muss', 'kann', 'darf'], answer: 'muss', explanation: 'müssen expressa obrigação: ich muss.' },
        { id: 'm3', type: 'multiple', prompt: 'Qual pedido é mais educado?', options: ['Ich will einen Kaffee.', 'Ich möchte einen Kaffee.', 'Ich muss einen Kaffee.', 'Ich kann einen Kaffee.'], answer: 'Ich möchte einen Kaffee.', explanation: 'möchte significa “gostaria” e é uma forma educada de pedir.' },
        { id: 'm4', type: 'order', prompt: 'Ordene: kann / ich / mit Karte / bezahlen', answer: ['Ich', 'kann', 'mit Karte', 'bezahlen'], explanation: 'O modal kann fica na posição 2; bezahlen vai para o final.' },
        { id: 'm5', type: 'translate', prompt: 'Traduza: “Você pode me ajudar?” (formal)', answers: ['Können Sie mir helfen?', 'können sie mir helfen'], answer: 'Können Sie mir helfen?', explanation: 'Use können + Sie + mir helfen para o pedido formal.' },
        { id: 'm6', type: 'truefalse', prompt: 'Verdadeiro ou falso: em “Ich muss arbeiten”, o infinitivo fica no final.', options: ['Verdadeiro', 'Falso'], answer: 'Verdadeiro', explanation: 'Com um modal, o segundo verbo permanece no infinitivo e vai para o final.' }
      ]
    },
    {
      id: 'connectors-prepositions', number: 11, title: 'Conectores e preposições',
      description: 'Ligue ideias, indique lugar e diga para onde você vai com palavras pequenas que organizam a frase.',
      duration: '42 min', focus: 'Ligar ideias e indicar relações',
      introduction: 'Conectores unem ideias; preposições mostram relações como lugar, direção, tempo, companhia e finalidade. Nesta aula, vamos separar os dois papéis e praticar cada um com frases curtas.',
      objectives: ['Distinguir conectores de preposições', 'Usar und, aber, oder, denn e weil', 'Escolher in, im, ins, am, mit, zu e für em frases simples'],
      sections: [
        { type: 'compare', title: 'Conectores não são preposições', items: [
          { label: 'Conectores', description: 'Unem duas palavras ou frases e mostram como as ideias se relacionam.', examples: ['Ich lerne Deutsch und ich arbeite.', 'Ich bleibe zu Hause, weil ich müde bin.'] },
          { label: 'Preposições', description: 'Vêm antes de um nome ou pronome e indicam lugar, direção, tempo, companhia ou finalidade.', examples: ['Ich bin im Büro.', 'Ich gehe ins Büro.'] }
        ]},
        { type: 'table', title: 'Conectores: uma ideia leva à outra', lede: 'Os quatro primeiros mantêm o verbo na posição 2. Weil também significa “porque”, mas leva o verbo da sua oração para o final.', headers: ['Palavra', 'Significado', 'Uso'], rows: [
          ['und', 'e', 'adiciona informação: Ich lerne und ich arbeite.'],
          ['aber', 'mas', 'mostra contraste: Ich arbeite, aber ich bin müde.'],
          ['oder', 'ou', 'apresenta uma escolha: Tee oder Kaffee?'],
          ['denn', 'pois / porque', 'apresenta um motivo; o verbo continua na posição 2.'],
          ['weil', 'porque', 'apresenta um motivo; o verbo vai para o final da oração.']
        ]},
        { type: 'examples', title: 'Conectores: und, aber, oder e denn', lede: 'Observe a relação entre as ideias e a posição do verbo em cada frase.', items: [
          { de: 'Ich lerne Deutsch und ich höre Musik.', pt: 'Eu estudo alemão e ouço música.' },
          { de: 'Ich arbeite am Montag und ich lerne am Abend.', pt: 'Eu trabalho na segunda-feira e estudo à noite.' },
          { de: 'Ich bin müde, aber ich arbeite.', pt: 'Estou cansado, mas trabalho.' },
          { de: 'Das ist klein, aber es ist praktisch.', pt: 'Isso é pequeno, mas é prático.' },
          { de: 'Möchtest du Tee oder Kaffee?', pt: 'Você quer chá ou café?' },
          { de: 'Gehen wir zu Fuß oder mit dem Bus?', pt: 'Vamos a pé ou de ônibus?' },
          { de: 'Ich lerne Deutsch, denn ich wohne in Deutschland.', pt: 'Eu estudo alemão, pois moro na Alemanha.' },
          { de: 'Ich gehe nach Hause, denn ich bin müde.', pt: 'Vou para casa, pois estou cansado.' }
        ]},
        { type: 'examples', title: 'Weil: o verbo vai para o final', lede: 'Weil também significa “porque”, mas a oração que começa com weil termina com o verbo conjugado.', items: [
          { de: 'Ich lerne Deutsch, weil ich in Deutschland wohne.', pt: 'Eu estudo alemão porque moro na Alemanha.', note: 'wohne fica no final da oração com weil.' },
          { de: 'Ich bleibe zu Hause, weil ich krank bin.', pt: 'Eu fico em casa porque estou doente.', note: 'bin fica no final da oração com weil.' }
        ]},
        { type: 'callout', title: 'A diferença de ordem', text: '<strong>und, aber, oder e denn</strong> deixam o verbo na posição 2 em cada frase. <strong>weil</strong> manda o verbo da sua oração para o final: Ich lerne Deutsch, weil ich in Deutschland <strong>wohne</strong>.' },
        { type: 'table', title: 'Preposições: lugar, direção, tempo e relações', lede: 'Preposições vêm antes de um nome ou pronome. A forma depende do significado e, às vezes, do artigo que vem depois.', headers: ['Palavra', 'Significado', 'Uso'], rows: [
          ['in', 'em / dentro de', 'preposição base: in der Stadt, in Berlin'],
          ['im', 'em / no / na', 'in + dem; lugar ou período: im Park, im Sommer'],
          ['ins', 'para dentro de / para o(a)', 'in + das; movimento: ins Kino'],
          ['am', 'em / no / na', 'an + dem; dias e momentos: am Montag'],
          ['mit', 'com / de', 'companhia ou meio: mit Freunden, mit dem Bus'],
          ['zu', 'para / na casa de', 'destino ou pessoa: zum Arzt, zu Hause'],
          ['für', 'para', 'destinatário ou finalidade: für dich']
        ]},
        { type: 'compare', title: 'in × im × ins', items: [
          { label: 'in', description: 'É a preposição base. Use com nomes próprios e com artigos que não formam contração; o artigo pode mudar quando há movimento.', examples: ['Ich wohne in Berlin.', 'Ich bin in der Stadt.', 'Ich gehe in die Stadt.'] },
          { label: 'im', description: 'É a contração de in + dem. Indica localização ou período, sem movimento para dentro.', examples: ['Ich bin im Park.', 'Im Sommer arbeite ich.'] },
          { label: 'ins', description: 'É a contração de in + das. Indica movimento para dentro de um lugar neutro.', examples: ['Ich gehe ins Kino.', 'Wir fahren ins Büro.'] }
        ]},
        { type: 'examples', title: 'Outras preposições em frases', lede: 'Estas frases mostram usos separados de am, mit, zu e für.', items: [
          { de: 'Am Montag arbeite ich.', pt: 'Na segunda-feira eu trabalho.' },
          { de: 'Am Abend lerne ich Deutsch.', pt: 'À noite eu estudo alemão.' },
          { de: 'Ich fahre mit dem Bus.', pt: 'Eu vou de ônibus.' },
          { de: 'Ich spreche mit meiner Freundin.', pt: 'Eu falo com minha amiga.' },
          { de: 'Ich gehe zum Arzt.', pt: 'Eu vou ao médico.' },
          { de: 'Ich bin zu Hause.', pt: 'Eu estou em casa.' },
          { de: 'Das ist für dich.', pt: 'Isso é para você.' },
          { de: 'Das Geschenk ist für meine Mutter.', pt: 'O presente é para minha mãe.' }
        ]},
        { type: 'callout', title: 'Contrações importantes', text: '<strong>im</strong> não é um tipo diferente de “in”: <strong>im = in + dem</strong>. Da mesma forma, <strong>ins = in + das</strong> e <strong>am = an + dem</strong>. Não transforme todo <em>in</em> em <em>im</em>: compare <strong>in der Stadt</strong>, <strong>im Park</strong> e <strong>ins Kino</strong>.' }
      ],
      vocabulary: [
        { word: 'und', meaning: 'e', example: 'Ich lerne und ich arbeite.', example_en: 'I study and I work.' },
        { word: 'aber', meaning: 'mas', example: 'Ich bin müde, aber ich arbeite.', example_en: 'I am tired, but I work.' },
        { word: 'weil', meaning: 'porque', example: 'Ich lerne, weil ich Zeit habe.', example_en: 'I study because I have time.' },
        { word: 'in', meaning: 'em / dentro de', example: 'Ich wohne in Berlin.', example_en: 'I live in Berlin.' },
        { word: 'im', meaning: 'em / no / na; in + dem', example: 'Ich bin im Park.', example_en: 'I am in the park.' },
        { word: 'ins', meaning: 'para dentro de; in + das', example: 'Ich gehe ins Kino.', example_en: 'I go to the cinema.' },
        { word: 'am Montag', meaning: 'na segunda-feira', example: 'Am Montag arbeite ich.', example_en: 'On Monday I work.' },
        { word: 'mit dem Bus', meaning: 'de ônibus', example: 'Ich fahre mit dem Bus.', example_en: 'I go by bus.' },
        { word: 'zu Hause', meaning: 'em casa', example: 'Ich bin zu Hause.', example_en: 'I am at home.' },
        { word: 'für dich', meaning: 'para você', example: 'Das ist für dich.', example_en: 'This is for you.' }
      ],
      summary: ['Conectores unem ideias; preposições ligam nomes a relações como lugar e tempo.', 'und, aber, oder e denn mantêm o verbo na posição 2.', 'weil significa “porque” e leva o verbo para o final da oração.', 'im = in + dem; ins = in + das; am = an + dem.', 'Use in para a preposição base, im para localização/período e ins para movimento para dentro.'],
      exercises: [
        { id: 'cp1', type: 'multiple', prompt: 'Ich lerne Deutsch ___ ich arbeite.', options: ['und', 'aber', 'oder', 'weil'], answer: 'und', explanation: 'Und adiciona uma segunda informação: Ich lerne Deutsch und ich arbeite.' },
        { id: 'cp2', type: 'translate', prompt: 'Traduza: “Eu moro em Berlim e trabalho.”', answer: 'Ich wohne in Berlin und ich arbeite.', answers: ['Ich wohne in Berlin und ich arbeite.'], explanation: 'Use und para juntar as duas ideias.' },
        { id: 'cp3', type: 'multiple', prompt: 'Ich bin müde, ___ ich arbeite.', options: ['und', 'aber', 'oder', 'weil'], answer: 'aber', explanation: 'Aber mostra contraste: estou cansado, mas trabalho.' },
        { id: 'cp4', type: 'translate', prompt: 'Traduza: “Eu quero ir, mas estou cansado.”', answer: 'Ich will gehen, aber ich bin müde.', answers: ['Ich will gehen, aber ich bin müde.'], explanation: 'Aber liga duas ideias em contraste; o verbo continua na posição 2 em cada oração.' },
        { id: 'cp5', type: 'multiple', prompt: 'Möchtest du Tee ___ Kaffee?', options: ['und', 'aber', 'oder', 'denn'], answer: 'oder', explanation: 'Oder apresenta uma escolha entre chá e café.' },
        { id: 'cp6', type: 'translate', prompt: 'Traduza: “Você quer chá ou café?”', answer: 'Möchtest du Tee oder Kaffee?', answers: ['Möchtest du Tee oder Kaffee?'], explanation: 'Use oder quando oferece uma alternativa.' },
        { id: 'cp7', type: 'multiple', prompt: 'Ich bleibe zu Hause, ___ ich bin krank.', options: ['und', 'aber', 'denn', 'oder'], answer: 'denn', explanation: 'Denn significa “pois / porque” e mantém o verbo na posição 2: ich bin.' },
        { id: 'cp8', type: 'translate', prompt: 'Traduza: “Eu vou para casa, pois estou cansado.”', answer: 'Ich gehe nach Hause, denn ich bin müde.', answers: ['Ich gehe nach Hause, denn ich bin müde.'], explanation: 'Depois de denn, a frase continua com o verbo na posição 2: ich bin müde.' },
        { id: 'cp9', type: 'multiple', prompt: 'Ich lerne Deutsch, weil ich in Deutschland ___.', options: ['wohne', 'wohnen', 'wohnst', 'gehe'], answer: 'wohne', explanation: 'Com weil, o verbo conjugado vai para o final: weil ich in Deutschland wohne.' },
        { id: 'cp10', type: 'translate', prompt: 'Traduza: “Eu fico em casa porque estou cansado.”', answer: 'Ich bleibe zu Hause, weil ich müde bin.', answers: ['Ich bleibe zu Hause, weil ich müde bin.'], explanation: 'A oração com weil termina com o verbo: weil ich müde bin.' },
        { id: 'cp11', type: 'multiple', prompt: 'Ich wohne ___ Berlin.', options: ['in', 'im', 'ins', 'am'], answer: 'in', explanation: 'Com o nome próprio Berlin, usamos a preposição base in: in Berlin.' },
        { id: 'cp12', type: 'translate', prompt: 'Traduza: “Eu moro em Berlim.”', answer: 'Ich wohne in Berlin.', answers: ['Ich wohne in Berlin.'], explanation: 'In indica o lugar onde você mora: in Berlin.' },
        { id: 'cp13', type: 'multiple', prompt: 'Ich bin ___ Park.', options: ['in', 'im', 'ins', 'am'], answer: 'im', explanation: 'Im é a contração de in + dem: Ich bin im Park.' },
        { id: 'cp14', type: 'translate', prompt: 'Traduza: “Eu trabalho no verão.”', answer: 'Im Sommer arbeite ich.', answers: ['Im Sommer arbeite ich.'], explanation: 'Para um período, usamos im: im Sommer.' },
        { id: 'cp15', type: 'multiple', prompt: 'Ich gehe ___ Kino.', options: ['in', 'im', 'ins', 'am'], answer: 'ins', explanation: 'Ins é a contração de in + das e indica movimento para dentro: Ich gehe ins Kino.' },
        { id: 'cp16', type: 'translate', prompt: 'Traduza: “Nós vamos para o escritório.”', answer: 'Wir fahren ins Büro.', answers: ['Wir fahren ins Büro.', 'Wir gehen ins Büro.'], explanation: 'Büro é neutro; com movimento para dentro, in + das vira ins.' },
        { id: 'cp17', type: 'multiple', prompt: '___ Montag arbeite ich.', options: ['Am', 'Im', 'In', 'Ins'], answer: 'Am', explanation: 'Para dias da semana, usamos am: am Montag.' },
        { id: 'cp18', type: 'translate', prompt: 'Traduza: “Na segunda-feira eu estudo alemão.”', answer: 'Am Montag lerne ich Deutsch.', answers: ['Am Montag lerne ich Deutsch.'], explanation: 'Am é a contração de an + dem e aparece com dias da semana.' },
        { id: 'cp19', type: 'multiple', prompt: 'Ich fahre ___ dem Bus.', options: ['mit', 'zu', 'für', 'in'], answer: 'mit', explanation: 'Mit indica companhia ou meio de transporte: mit dem Bus.' },
        { id: 'cp20', type: 'translate', prompt: 'Traduza: “Eu falo com minha amiga.”', answer: 'Ich spreche mit meiner Freundin.', answers: ['Ich spreche mit meiner Freundin.'], explanation: 'Mit significa “com” quando falamos da companhia de alguém.' },
        { id: 'cp21', type: 'multiple', prompt: 'Ich gehe ___ Arzt.', options: ['zum', 'im', 'ins', 'für'], answer: 'zum', explanation: 'Para ir ao médico, usamos zu + dem: zum Arzt.' },
        { id: 'cp22', type: 'fill', prompt: 'Ich bin ___ Hause.', answer: 'zu', explanation: 'A expressão fixa “em casa” é zu Hause.' },
        { id: 'cp23', type: 'multiple', prompt: 'Das ist ___ dich.', options: ['für', 'mit', 'zu', 'in'], answer: 'für', explanation: 'Für indica para quem algo é destinado: für dich.' },
        { id: 'cp24', type: 'translate', prompt: 'Traduza: “O presente é para minha mãe.”', answer: 'Das Geschenk ist für meine Mutter.', answers: ['Das Geschenk ist für meine Mutter.'], explanation: 'Für introduz a pessoa que recebe ou para quem algo é destinado.' }
      ]
    }
  ];

  const englishTranslations = {
    'first-sentences': {
      title: 'First sentences',
      description: 'Learn your first German sentences for greetings, introductions, daily routines, simple questions, and everyday situations.',
      focus: 'Building everyday sentences',
      introduction: 'In this lesson, you will translate short, useful sentences one at a time. We start with greetings and introductions, move through home, work, and times, and finish with basic questions.',
      objectives: ['Greet people and introduce yourself in German', 'Talk about places, routines, family, and times', 'Ask and understand simple A1 questions'],
      sections: [],
      vocabulary: [
        { meaning: 'hello' },
        { meaning: 'good morning' },
        { meaning: 'the name' },
        { meaning: 'to be called' },
        { meaning: 'to come from' },
        { meaning: 'to live' },
        { meaning: 'to speak' },
        { meaning: 'the train station' },
        { meaning: 'the family' },
        { meaning: 'the train' }
      ],
      summary: ['Greetings and introductions help you start a conversation.', 'Short sentences can talk about origin, city, routine, family, and times.', 'The conjugated verb appears early in German statements and questions.', 'Learn each sentence as a useful block and notice the words that repeat.', 'Sequential practice reinforces translating from Portuguese into German.'],
      exercises: [
        { prompt: 'Translate into German: “Hello!”', explanation: 'Hallo! is a simple and common way to say “Hello!” in German.' },
        { prompt: 'Translate into German: “Good morning!”', explanation: 'Guten Morgen! means “Good morning!” and is used in the morning.' },
        { prompt: 'Translate into German: “My name is Ana.”', explanation: 'Mein Name ist Ana. introduces your name literally as “My name is Ana.”' },
        { prompt: 'Translate into German: “My name is Bruno.”', explanation: 'Ich heiße Bruno. uses heiße to say “my name is” or “I am called”.' },
        { prompt: 'Translate into German: “I come from Brazil.”', explanation: 'Ich komme aus means “I come from” or “I am from”.' },
        { prompt: 'Translate into German: “I live in Berlin.”', explanation: 'Ich wohne in Berlin. means “I live in Berlin.”' },
        { prompt: 'Translate into German: “I speak Portuguese.”', explanation: 'Ich spreche Portugiesisch. uses spreche for “speak” and Portugiesisch for “Portuguese”.' },
        { prompt: 'Translate into German: “Nice to meet you.”', explanation: 'Freut mich. is the short, natural way to say “Nice to meet you” or “My pleasure”.' },
        { prompt: 'Translate into German: “This is a book.”', explanation: 'Das ist means “This is” or “That is”; ein Buch means “a book”.' },
        { prompt: 'Translate into German: “This is a bag.”', explanation: 'Tasche is feminine, so German uses eine: eine Tasche.' },
        { prompt: 'Translate into German: “The book is new.”', explanation: 'Das Buch means “the book” and neu means “new”.' },
        { prompt: 'Translate into German: “The door is open.”', explanation: 'Die Tür means “the door” and offen means “open”.' },
        { prompt: 'Translate into German: “I have a key.”', explanation: 'Ich habe means “I have”; Schlüssel is masculine and appears as einen Schlüssel here.' },
        { prompt: 'Translate into German: “You have a telephone.”', explanation: 'With du, haben becomes hast: Du hast ein Telefon.' },
        { prompt: 'Translate into German: “The cat is in the garden.”', explanation: 'Im is the contraction of in dem; im Garten means “in the garden”.' },
        { prompt: 'Translate into German: “I do not have a car.”', explanation: 'Kein negates a noun; kein Auto means “no car” or “do not have a car”.' },
        { prompt: 'Translate into German: “I get up at seven o’clock.”', explanation: 'Stehe ... auf comes from the separable verb aufstehen, “to get up”.' },
        { prompt: 'Translate into German: “I have breakfast at eight o’clock.”', explanation: 'Frühstücken means “to have breakfast”; um acht Uhr means “at eight o’clock”.' },
        { prompt: 'Translate into German: “I go to work.”', explanation: 'Zur is the contraction of zu der; zur Arbeit means “to work”.' },
        { prompt: 'Translate into German: “I work in the morning.”', explanation: 'Am Morgen means “in the morning”, literally “in the morning”.' },
        { prompt: 'Translate into German: “I learn German every day.”', explanation: 'Jeden Tag means “every day”; Deutsch means “German”.' },
        { prompt: 'Translate into German: “I drink water.”', explanation: 'Ich trinke Wasser. means “I drink water.”' },
        { prompt: 'Translate into German: “She reads a book.”', explanation: 'With sie, lesen becomes liest: Sie liest ein Buch.' },
        { prompt: 'Translate into German: “We cook in the evening.”', explanation: 'Wir kochen means “we cook”; am Abend means “in the evening”.' },
        { prompt: 'Translate into German: “You go to sleep early.”', explanation: 'With du, schlafen becomes schläfst; früh means “early”.' },
        { prompt: 'Translate into German: “Today I am tired.”', explanation: 'When Heute comes first, the verb follows it: Heute bin ich müde.' },
        { prompt: 'Translate into German: “Where is the train station?”', explanation: 'Wo asks “where”; der Bahnhof means “the train station”.' },
        { prompt: 'Translate into German: “The school is here.”', explanation: 'Die Schule means “the school” and hier means “here”.' },
        { prompt: 'Translate into German: “I am at home.”', explanation: 'Zu Hause is the fixed expression for “at home”.' },
        { prompt: 'Translate into German: “We are in the office.”', explanation: 'Wir sind means “we are”; im Büro means “in the office”.' },
        { prompt: 'Translate into German: “The supermarket is nearby.”', explanation: 'Nah means “near” or “nearby”, and der Supermarkt means “the supermarket”.' },
        { prompt: 'Translate into German: “I go to the bank.”', explanation: 'Zur Bank means “to the bank”, with the contraction of zu der.' },
        { prompt: 'Translate into German: “Do you work in Munich?”', explanation: 'In a yes-or-no question, the verb comes first: Arbeitest du ...?' },
        { prompt: 'Translate into German: “They live in Germany.”', explanation: 'Sie can mean “they” in this context; wohnen means “live”.' },
        { prompt: 'Translate into German: “What time is it?”', explanation: 'Wie spät ist es? is the common question for asking the time.' },
        { prompt: 'Translate into German: “It is three o’clock.”', explanation: 'To tell the time, German uses Es ist ... Uhr.' },
        { prompt: 'Translate into German: “Today is Monday.”', explanation: 'Montag means “Monday”, and days of the week begin with a capital letter.' },
        { prompt: 'Translate into German: “Tomorrow is Tuesday.”', explanation: 'Morgen means “tomorrow” and Dienstag means “Tuesday”.' },
        { prompt: 'Translate into German: “The class starts at nine o’clock.”', explanation: 'Unterricht means “class” or “lesson”; beginnt means “starts”.' },
        { prompt: 'Translate into German: “When does the train arrive?”', explanation: 'Wann asks “when”; der Zug means “the train”.' },
        { prompt: 'Translate into German: “I have time today.”', explanation: 'Ich habe Zeit means “I have time”; heute adds “today”.' },
        { prompt: 'Translate into German: “This is my mother.”', explanation: 'Meine Mutter means “my mother”; Das ist introduces the person.' },
        { prompt: 'Translate into German: “My father works at home.”', explanation: 'Mein Vater means “my father” and zu Hause means “at home”.' },
        { prompt: 'Translate into German: “I have a brother.”', explanation: 'Bruder is masculine and is the object of haben, so German uses einen Bruder.' },
        { prompt: 'Translate into German: “She has two sisters.”', explanation: 'With sie, haben becomes hat; zwei Schwestern means “two sisters”.' },
        { prompt: 'Translate into German: “We are a small family.”', explanation: 'Wir sind means “we are”; eine kleine Familie means “a small family”.' },
        { prompt: 'Translate into German: “What is your name?”', explanation: 'Wie heißt du? is the informal way to ask someone’s name.' },
        { prompt: 'Translate into German: “Where do you come from?”', explanation: 'Woher asks about origin; kommst du means “do you come”.' },
        { prompt: 'Translate into German: “What do you do?”', explanation: 'Was means “what” and machst du means “do you do”.' },
        { prompt: 'Translate into German: “Do you speak English?”', explanation: 'Sprichst du Englisch? is an informal question about speaking English.' }
      ]
    },
    pronunciation: {
      title: 'Pronunciation and reading',
      description: 'Learn the sounds you will hear every day and gain confidence reading your first words.',
      focus: 'Listen and recognize',
      introduction: 'German becomes much easier when you stop trying to guess the sounds. In this lesson, we will build a practical pronunciation map: notice the combination, listen to the word, and repeat it aloud.',
      objectives: ['Recognize ä, ö, ü, and ß', 'Read common combinations', 'Use audio to train your ear'],
      sections: [
        {
          title: 'The four special sounds',
          lede: 'They are not decorations: they change pronunciation and sometimes change the meaning of a word.',
          items: [
            { title: 'ä / Ä', pronunciation: 'similar to an open “eh” sound', translation: 'girl' },
            { title: 'ö / Ö', pronunciation: 'make an “eh” sound with rounded “oh” lips', translation: 'beautiful' },
            { title: 'ü / Ü', pronunciation: 'make an “ee” sound with “oo” lips', translation: 'tired' },
            { title: 'ß (Eszett)', pronunciation: 'sounds like “ss”', translation: 'street' }
          ]
        },
        {
          title: 'Combinations that appear all the time',
          lede: 'Use these approximations only as a starting point. The Listen button plays the real German sound.',
          headers: ['Writing', 'Approximate sound', 'Example', 'Translation'],
          rows: [
            ['ch', 'a soft breath', 'ich', 'I'], ['sch', '“sh”', 'Schule', 'school'], ['sp', '“shp” at the beginning', 'Sport', 'sport'], ['st', '“sht” at the beginning', 'Stein', 'stone'], ['z', '“ts”', 'Zeit', 'time'], ['w', '“v”', 'Wasser', 'water'], ['v', 'usually “f”', 'Vater', 'father'], ['j', '“y”', 'ja', 'yes']
          ]
        },
        {
          title: 'Vowels in pairs',
          lede: 'These combinations are great shortcuts for reading new words.',
          headers: ['Combination', 'Read it as', 'Example', 'Translation'],
          rows: [
            ['ei', '“eye”', 'mein', 'my'], ['ie', 'long “ee”', 'Liebe', 'love'], ['eu', '“oy”', 'Deutsch', 'German'], ['äu', '“oy”', 'Häuser', 'houses']
          ]
        },
        {
          title: 'Read, listen, repeat',
          lede: 'Click the speaker and repeat each word twice.',
          items: [
            { en: 'girl' }, { en: 'beautiful' }, { en: 'tired' }, { en: 'street' }, { en: 'German' }, { en: 'houses' }
          ]
        }
      ],
      vocabulary: [
        { meaning: 'the school' }, { meaning: 'the street' }, { meaning: 'the water' },
        { meaning: 'the sport' }, { meaning: 'my' }, { meaning: 'love' }
      ],
      summary: ['ä, ö, and ü have their own sounds.', 'ß sounds like “ss”.', 'sch sounds like “sh”; z starts with “ts”.', 'ei sounds like “eye”; ie is a long “ee” sound.', 'Listening and repeating is more important than memorizing an approximation in Portuguese.'],
      exercises: [
        { prompt: 'Which combination usually sounds like “eye”?', options: ['ie', 'ei', 'eu', 'äu'], explanation: 'In German, ei usually sounds like “eye”: mein, Stein, drei.' },
        { prompt: 'Which word begins with the “sh” sound?', options: ['Vater', 'Schule', 'Zeit', 'Liebe'], explanation: 'sch at the beginning of Schule produces a sound like “sh”.' },
        { prompt: 'What is the approximate pronunciation of Zeit?', options: ['“zait”', '“ziet”', '“xait”', '“tsait”'], explanation: 'The German letter z starts with “ts”. Zeit means “time”.' },
        { prompt: 'How do you say “water” in German? (include the article)', explanation: 'Water is das Wasser. Learn the noun together with its article.' }
      ]
    },
    pronouns: {
      title: 'Personal pronouns',
      description: 'Find out who performs the action and start building sentences about yourself, other people, and formal address.',
      focus: 'Talking about people',
      introduction: 'Pronouns are the small words that take the place of nouns. They appear before the verb and determine the form the verb will take.',
      objectives: ['Use the nine basic pronouns', 'Distinguish sie from Sie', 'Introduce people with simple sentences'],
      sections: [
        {
          title: 'The pronoun map',
          lede: 'Context and capitalization help you understand sie and Sie.',
          headers: ['German', 'English', 'Quick clue'],
          rows: [
            ['ich', 'I', 'the speaker'], ['du', 'you (informal)', 'someone close'], ['er', 'he', 'masculine'], ['sie', 'she', 'lowercase'], ['es', 'it / he / she (neuter)', 'neuter'], ['wir', 'we', 'ich + other people'], ['ihr', 'you (informal plural)', 'more than one person'], ['sie', 'they', 'lowercase'], ['Sie', 'you (formal singular/plural)', 'always capitalized']
          ]
        },
        {
          title: 'Watch out for “Sie”',
          text: '<strong>sie</strong> can mean “she” or “they”. <strong>Sie</strong>, with a capital S, is the formal form of address. In speech, the verb and context help; in writing, capitalization is an important clue.'
        },
        {
          title: 'Introducing yourself',
          items: [
            { en: 'I am Leonardo.' }, { en: 'You are here.' }, { en: 'He works.' },
            { en: 'She is learning German.' }, { en: 'We live in Germany.' }, { en: 'Do you speak German? (formal)' }
          ]
        }
      ],
      vocabulary: [
        { meaning: 'I' }, { meaning: 'you (informal)' }, { meaning: 'we' },
        { meaning: 'you (informal plural)' }, { meaning: 'she / they' }, { meaning: 'you (formal singular/plural)' }
      ],
      summary: ['ich means “I”; du is informal “you”.', 'er, sie, and es mean he, she, and neuter it.', 'Lowercase sie can mean she or they.', 'Capitalized Sie is formal and takes the plural verb form.', 'The pronoun normally comes before the verb in a simple sentence.'],
      exercises: [
        { prompt: '___ lernt Deutsch. (she)', options: ['Er', 'Sie', 'Wir', 'Ihr'], explanation: '“She” is sie. At the beginning of a sentence, it appears as Sie because every first word is capitalized.' },
        { prompt: 'Which pronoun means “we”?', options: ['ihr', 'sie', 'wir', 'du'], explanation: 'wir means “we”.' },
        { prompt: 'Complete: ___ bin Leonardo. (I)', explanation: 'The first-person singular is ich: Ich bin Leonardo.' },
        { prompt: 'Translate into German: “We live in Germany.”', explanation: 'wir = we, wohnen = live / to live, and Deutschland = Germany.' }
      ]
    },
    'sein-haben': {
      title: 'Sein and haben',
      description: 'Master the two most important German verbs: to be and to have, with useful sentences from day one.',
      focus: 'Bin, bist, habe',
      introduction: 'Sein and haben appear in introductions, descriptions, needs, and everyday situations. Learn their forms by heart, always connected to a short sentence.',
      objectives: ['Conjugate sein in the present tense', 'Conjugate haben in the present tense', 'Describe states and needs'],
      sections: [
        {
          title: 'SEIN — to be',
          headers: ['Pronoun', 'Form', 'Example'],
          rows: [
            ['ich', 'bin', 'Ich bin müde.'], ['du', 'bist', 'Du bist nett.'], ['er / sie / es', 'ist', 'Er ist im Büro.'], ['wir', 'sind', 'Wir sind hier.'], ['ihr', 'seid', 'Ihr seid pünktlich.'], ['sie / Sie', 'sind', 'Sie sind freundlich.']
          ]
        },
        {
          title: 'HABEN — to have',
          headers: ['Pronoun', 'Form', 'Example'],
          rows: [
            ['ich', 'habe', 'Ich habe Zeit.'], ['du', 'hast', 'Du hast ein Auto.'], ['er / sie / es', 'hat', 'Er hat eine Frage.'], ['wir', 'haben', 'Wir haben Arbeit.'], ['ihr', 'habt', 'Ihr habt Hunger.'], ['sie / Sie', 'haben', 'Sie haben Zeit.']
          ]
        },
        {
          title: 'Sentences you will use',
          lede: 'Listen to the complete sentence. The rhythm helps you lock in the verb form.',
          items: [
            { en: 'I am tired.' }, { en: 'I am happy.' }, { en: 'I am at home.' },
            { en: 'You are kind.' }, { en: 'He is in the office.' }, { en: 'I have time.' },
            { en: 'I am hungry.' }, { en: 'You have a car.' }, { en: 'He has a question.' }, { en: 'We have work.' }
          ]
        },
        {
          title: 'A clue to remember',
          text: 'The forms of <strong>sein</strong> are more irregular: bin, bist, ist, sind, seid. <strong>haben</strong> keeps “hab-” through most of its conjugation, but changes to hast and hat in the singular.'
        }
      ],
      vocabulary: [
        { meaning: 'tired' }, { meaning: 'happy' }, { meaning: 'at home' },
        { meaning: 'time' }, { meaning: 'hunger' }, { meaning: 'the question' }
      ],
      summary: ['bin, bist, ist, sind, seid are forms of sein.', 'habe, hast, hat, haben, habt are forms of haben.', 'In German, hunger and time are expressed with haben.', 'Learn the verb form together with a short sentence.', 'The verb changes according to the pronoun.'],
      exercises: [
        { prompt: 'Ich ___ müde.', options: ['bin', 'bist', 'ist', 'sind'], explanation: 'With ich, sein becomes bin: Ich bin müde.' },
        { prompt: 'Du ___ nett.', options: ['bin', 'bist', 'ist', 'seid'], explanation: 'With du, we use bist.' },
        { prompt: 'Er ___ im Büro.', options: ['bin', 'bist', 'ist', 'sind'], explanation: 'er/sie/es uses ist.' },
        { prompt: 'Wir ___ hier.', options: ['ist', 'seid', 'sind', 'bin'], explanation: 'wir uses sind.' },
        { prompt: 'Ihr ___ pünktlich.', options: ['sind', 'seid', 'ist', 'habt'], explanation: 'ihr uses seid.' },
        { prompt: 'Ich ___ Zeit.', options: ['hat', 'hast', 'habe', 'haben'], explanation: 'With ich, haben becomes habe.' },
        { prompt: 'Du ___ ein Auto.', options: ['habe', 'hast', 'hat', 'habt'], explanation: 'du uses hast.' },
        { prompt: 'Er ___ eine Frage.', options: ['hat', 'hast', 'haben', 'habe'], explanation: 'er/sie/es uses hat.' },
        { prompt: 'Wir ___ Arbeit.', options: ['habt', 'hat', 'haben', 'habe'], explanation: 'wir uses haben.' },
        { prompt: 'Translate: “I am at home.”', explanation: 'The sentence is Ich bin zu Hause. Zu Hause is the expression “at home”.' }
      ]
    },
    'sentence-structure': {
      title: 'Basic sentence structure',
      description: 'Understand verb position 2 and build clear sentences even when you start with today, tomorrow, or another element.',
      focus: 'Verb in position 2',
      introduction: 'German sentences become predictable when you find the conjugated verb. In a statement, it usually occupies second position—the second element of the sentence, not necessarily the second word.',
      objectives: ['Identify the conjugated verb', 'Build declarative sentences', 'Start sentences with time or place'],
      sections: [
        {
          title: 'The rule that organizes the sentence',
          segments: ['Position 1', 'VERB', 'Rest of the sentence'],
          caption: 'The conjugated verb normally comes in the second element.'
        },
        {
          title: 'Subject first',
          items: [
            { en: 'I work at Bosch.', note: 'Ich = position 1 · arbeite = verb' }, { en: 'I learn German.' }, { en: 'I live in Stuttgart.' }
          ]
        },
        {
          title: 'Another element first',
          lede: 'When Heute occupies position 1, the subject comes after the verb.',
          items: [
            { en: 'Today I work.', note: 'Heute = position 1 · arbeite = verb · ich = subject' }, { en: 'Today I learn German.' }, { en: 'On Monday I work.' }
          ]
        },
        {
          title: 'Second element, not second word',
          text: 'In <strong>Am Montag arbeite ich</strong>, “Am Montag” functions as a time block. That is why arbeite remains in position 2, even though it appears as the third word.'
        }
      ],
      vocabulary: [
        { meaning: 'today' }, { meaning: 'on Monday' }, { meaning: 'to work' },
        { meaning: 'to learn' }, { meaning: 'to live' }, { meaning: 'at / for a company' }
      ],
      summary: ['A statement usually has the conjugated verb in position 2.', 'Position 2 means the second syntactic element.', 'The subject can come after the verb.', 'Today = heute; on Monday = am Montag.', 'Do not translate Portuguese word order word for word.'],
      exercises: [
        { prompt: 'Put the words in order: Deutsch / ich / lerne', explanation: 'The sentence is Ich lerne Deutsch. The verb lerne occupies position 2.' },
        { prompt: 'Put the words in order: Heute / ich / arbeite', explanation: 'Heute is the first element; arbeite remains in position 2.' },
        { prompt: 'Which sentence is correct?', options: ['Heute ich lerne Deutsch.', 'Heute lerne ich Deutsch.', 'Heute Deutsch ich lerne.', 'Lerne heute ich Deutsch.'], explanation: 'After Heute comes the conjugated verb: Heute lerne ich Deutsch.' },
        { prompt: 'True or false: in a German sentence, the conjugated verb must always be the second word.', options: ['True', 'False'], answer: 'False', explanation: 'It is usually the second element. A block such as Am Montag can contain two words and occupy position 1.' }
      ]
    },
    questions: {
      title: 'Questions in German',
      description: 'Learn the essential question words and build questions that solve real-life situations in Germany.',
      focus: 'Ask and understand',
      introduction: 'Asking a good question is one of the fastest ways to gain independence. First, recognize the question word; then let the verb do the work.',
      objectives: ['Recognize the main W-questions', 'Ask about places, prices, and times', 'Use survival phrases'],
      sections: [
        {
          title: 'The words that open doors',
          headers: ['Question', 'Meaning', 'Example'],
          rows: [
            ['Was?', 'what?', 'Was ist das?'], ['Wer?', 'who?', 'Wer ist das?'], ['Wo?', 'where?', 'Wo ist der Bahnhof?'], ['Woher?', 'where from?', 'Woher kommst du?'], ['Wohin?', 'where to?', 'Wohin gehst du?'], ['Wann?', 'when?', 'Wann kommt der Zug?'], ['Warum?', 'why?', 'Warum lernst du Deutsch?'], ['Wie?', 'how?', 'Wie heißt du?'], ['Wie viel?', 'how much?', 'Wie viel kostet das?'], ['Wie lange?', 'how long?', 'Wie lange dauert das?']
          ]
        },
        {
          title: 'Truly useful questions',
          items: [
            { en: 'Where is the train station?' }, { en: 'How much does that cost?' }, { en: 'When does the train arrive?' },
            { en: 'Where are you from?' }, { en: 'Why are you learning German?' }, { en: 'What is your name?' }, { en: 'Do you speak English? (formal)' }
          ]
        },
        {
          title: 'Pocket phrases',
          scenarios: [
            { title: 'When you need help', phrases: ['Entschuldigung, wo ist der Bahnhof?', 'Können Sie mir helfen?', 'Sprechen Sie Englisch?'] },
            { title: 'When you are paying', phrases: ['Wie viel kostet das?', 'Kann ich mit Karte bezahlen?'] }
          ]
        }
      ],
      vocabulary: [
        { meaning: 'the train station' }, { meaning: 'the train' }, { meaning: 'how much' },
        { meaning: 'why' }, { meaning: 'to help' }, { meaning: 'to pay' }
      ],
      summary: ['Wo asks about a place; wohin asks about a destination.', 'Woher asks where someone comes from.', 'Wie viel is used to ask about prices and quantities.', 'Entschuldigung is a polite way to get someone’s attention.', 'Formal questions use Sie.'],
      exercises: [
        { prompt: '___ ist der Bahnhof? (where)', options: ['Was', 'Wo', 'Wann', 'Warum'], explanation: 'Wo means “where”.' },
        { prompt: '___ kostet das? (how much)', options: ['Wie viel', 'Woher', 'Wer', 'Wie lange'], explanation: 'Wie viel means “how much” and appears often in price questions.' },
        { prompt: '___ kommt der Zug? (when)', options: ['Warum', 'Wohin', 'Wann', 'Was'], explanation: 'Wann asks “when”.' },
        { prompt: 'Translate: “Do you speak English?” (formal)', explanation: 'With formal Sie, the question is Sprechen Sie Englisch?' }
      ]
    },
    'present-verbs': {
      title: 'Present-tense verbs',
      description: 'Use the logic of regular verbs to talk about work, study, housing, shopping, and routine.',
      focus: 'Everyday actions',
      introduction: 'Most regular verbs follow a clear pattern. Remove -en to find the stem and add the ending that matches the pronoun.',
      objectives: ['Find the verb stem', 'Conjugate machen and common verbs', 'Talk about your routine'],
      sections: [
        {
          title: 'machen as a model',
          segments: ['mach-', 'ending', 'sentence'],
          caption: 'Stem + ending. In the present tense, the ending follows the pronoun.'
        },
        {
          title: 'The regular endings',
          headers: ['Pronoun', 'Ending', 'machen'],
          rows: [
            ['ich', '-e', 'ich mache'], ['du', '-st', 'du machst'], ['er / sie / es', '-t', 'er macht'], ['wir', '-en', 'wir machen'], ['ihr', '-t', 'ihr macht'], ['sie / Sie', '-en', 'sie machen']
          ]
        },
        {
          title: 'Verbs for your first week',
          headers: ['Infinitive', 'Meaning', 'Example'],
          rows: [
            ['machen', 'to do', 'Ich mache Sport.'], ['arbeiten', 'to work', 'Ich arbeite heute.'], ['lernen', 'to learn', 'Wir lernen Deutsch.'], ['wohnen', 'to live', 'Ich wohne in Stuttgart.'], ['kommen', 'to come', 'Ich komme aus Brasilien.'], ['kaufen', 'to buy', 'Wir kaufen Brot.'], ['brauchen', 'to need', 'Ich brauche Hilfe.'], ['spielen', 'to play', 'Die Kinder spielen.'], ['fragen', 'to ask', 'Ich frage den Lehrer.']
          ]
        },
        {
          title: 'A small detail',
          text: 'Verbs whose stem ends in -t or -d can gain a supporting “e” in some forms: <strong>arbeiten → du arbeitest</strong>. Do not try to apply the pattern mechanically to every verb.'
        }
      ],
      vocabulary: [
        { meaning: 'to do' }, { meaning: 'to work' }, { meaning: 'to learn' },
        { meaning: 'to live' }, { meaning: 'to buy' }, { meaning: 'to need' }
      ],
      summary: ['Remove -en to find the stem of a regular verb.', 'ich gets -e; du gets -st.', 'er/sie/es gets -t; ihr also gets -t.', 'wir and sie/Sie get -en.', 'Some stems need a supporting “e”, such as arbeiten.'],
      exercises: [
        { prompt: 'Ich ___ Deutsch. (lernen)', explanation: 'ich gets the -e ending: lernen → ich lerne.' },
        { prompt: 'Du ___ in Berlin. (wohnen)', explanation: 'du gets -st: wohnen → du wohnst.' },
        { prompt: 'Er ___ bei Bosch. (arbeiten)', explanation: 'arbeiten has a supporting “e”: er arbeitet.' },
        { prompt: 'What is the correct form for wir + machen?', options: ['wir macht', 'wir machen', 'wir machst', 'wir mache'], explanation: 'wir gets -en: wir machen.' },
        { prompt: 'Translate: “I need help.”', explanation: 'brauchen → ich brauche; Hilfe means help.' }
      ]
    },
    articles: {
      title: 'Articles and gender',
      description: 'Learn to treat each noun as a set: article + word. This makes your speech much more natural.',
      focus: 'Der, die, das',
      introduction: 'Every German noun has grammatical gender. For Portuguese speakers, the best strategy is never to memorize the word alone: learn der Tisch, die Stadt, das Haus.',
      objectives: ['Recognize the definite articles', 'Use ein and eine', 'Memorize nouns with their article'],
      sections: [
        {
          title: 'The definite articles',
          headers: ['Article', 'Gender / number', 'Example'],
          rows: [
            ['der', 'masculine', 'der Mann · the man'], ['die', 'feminine', 'die Frau · the woman'], ['das', 'neuter', 'das Auto · the car'], ['die', 'plural', 'die Kinder · the children']
          ]
        },
        {
          title: 'Grouped vocabulary',
          scenarios: [
            { title: 'Masculine · der', phrases: ['der Mann — the man', 'der Tisch — the table', 'der Bahnhof — the train station', 'der Zug — the train'] },
            { title: 'Feminine · die', phrases: ['die Frau — the woman', 'die Stadt — the city', 'die Arbeit — the work', 'die Schule — the school'] },
            { title: 'Neuter · das', phrases: ['das Auto — the car', 'das Haus — the house', 'das Kind — the child', 'das Wasser — the water'] }
          ]
        },
        {
          title: 'One / a',
          lede: 'The indefinite article follows the gender. In the plural, there is no direct equivalent of “a/an”.',
          headers: ['Definite', 'Indefinite', 'Example'],
          rows: [
            ['der', 'ein', 'ein Mann'], ['die', 'eine', 'eine Frau'], ['das', 'ein', 'ein Auto']
          ]
        },
        {
          title: 'The golden rule',
          text: 'Do not memorize <strong>Tisch = table</strong>. Memorize <strong>der Tisch = the table</strong>. The article is part of the word and will help you in the next lessons.'
        }
      ],
      vocabulary: [
        { meaning: 'the man' }, { meaning: 'the woman' }, { meaning: 'the child' },
        { meaning: 'the table' }, { meaning: 'the city' }, { meaning: 'the house' }
      ],
      summary: ['der is masculine; die is feminine and plural; das is neuter.', 'German gender does not always match gender in Portuguese.', 'Learn nouns with their article.', 'ein goes with der and das; eine goes with die.', 'The plural uses die as the definite article.'],
      exercises: [
        { prompt: '___ Auto', options: ['der', 'die', 'das'], explanation: 'Car is das Auto.' },
        { prompt: '___ Frau', options: ['der', 'die', 'das'], explanation: 'Woman is die Frau.' },
        { prompt: '___ Bahnhof', options: ['der', 'die', 'das'], explanation: 'Train station is der Bahnhof.' },
        { prompt: 'Which form means “a house”?', options: ['ein Haus', 'eine Haus', 'der Haus', 'ein Hause'], explanation: 'Haus is neuter, so we use ein Haus.' },
        { prompt: 'Translate: “the school”', explanation: 'School is die Schule. Keep the article with it.' }
      ]
    },
    negation: {
      title: 'Negation: nicht and kein',
      description: 'Say that something is not happening, is not expensive, or that you do not have something without freezing when you speak.',
      focus: 'Saying “no”',
      introduction: 'In German, there are two main ways to negate. First think about what you are negating: an action or characteristic takes nicht; a noun without a definite article takes kein.',
      objectives: ['Use nicht for actions and adjectives', 'Use kein for nouns', 'Negate everyday sentences'],
      sections: [
        {
          title: 'nicht × kein',
          items: [
            { description: 'negates an action, adjective, or entire sentence', examples: ['Ich verstehe nicht. — I do not understand.', 'Das ist nicht teuer. — That is not expensive.'] },
            { description: 'negates a noun: no / not a', examples: ['Ich habe kein Auto. — I do not have a car.', 'Ich habe keine Zeit. — I do not have time.'] }
          ]
        },
        {
          title: 'Compare them in context',
          items: [
            { en: 'I do not work today.', note: 'not + action' }, { en: 'I do not understand.', note: 'not + action' },
            { en: 'That is not expensive.', note: 'not + adjective' }, { en: 'That is not a problem.', note: 'kein + noun' },
            { en: 'I do not have time.', note: 'keine + noun' }
          ]
        },
        {
          title: 'A safe first approximation',
          text: 'If you are denying the existence or possession of something, use <strong>kein</strong>: Ich habe kein Auto. If you are denying what someone does or a quality, use <strong>nicht</strong>: Ich arbeite nicht.'
        }
      ],
      vocabulary: [
        { meaning: 'not' }, { meaning: 'none / not a' }, { meaning: 'no time' },
        { meaning: 'expensive' }, { meaning: 'to understand' }, { meaning: 'the problem' }
      ],
      summary: ['nicht negates actions, adjectives, or the sentence.', 'kein negates a noun.', 'At this level, kein goes with neuter and masculine nouns.', 'keine appears with feminine nouns and in the plural.', 'Learn whole sentences, not just the isolated rule.'],
      exercises: [
        { prompt: 'Ich verstehe ___.', options: ['nicht', 'kein', 'keine'], explanation: 'Verstehen is an action; use nicht.' },
        { prompt: 'Ich habe ___ Auto.', options: ['nicht', 'kein', 'keine'], explanation: 'Auto is a neuter noun: kein Auto.' },
        { prompt: 'Ich habe ___ Zeit.', options: ['nicht', 'kein', 'keine'], explanation: 'Zeit is feminine: keine Zeit.' },
        { prompt: 'Das ist ___ teuer. (not)', explanation: 'Teuer is an adjective; use nicht.' },
        { prompt: 'Translate: “That is not a problem.”', explanation: 'Problem is neuter and appears without a definite article in the expression: kein Problem.' },
        { prompt: 'True or false: “kein” is used to negate an action.', options: ['True', 'False'], answer: 'False', explanation: 'kein negates a noun. Actions are negated with nicht.' },
        { prompt: 'Which sentence is correct?', options: ['Ich habe nicht Auto.', 'Ich habe kein Auto.', 'Ich habe keine Auto.', 'Ich kein habe Auto.'], explanation: 'Auto is neuter: Ich habe kein Auto.' },
        { prompt: 'Translate: “I do not work today.”', explanation: 'Here we are negating the action arbeiten, so we use nicht.' }
      ]
    },
    accusative: {
      title: 'Accusative',
      description: 'A gentle introduction to the direct object: notice why der changes to den and ein to einen.',
      focus: 'Who acts · what receives',
      introduction: 'You can already form sentences. Now let’s look at what happens to the person or thing that directly receives the action. For now, focus on the masculine change.',
      objectives: ['Distinguish subject and object', 'Recognize der → den', 'Use ein → einen with masculine nouns'],
      sections: [
        {
          title: 'Who acts and who receives',
          segments: ['Who acts', 'VERB', 'Direct object'],
          caption: 'Nominative = the one who acts. Accusative = the direct object of the action.'
        },
        {
          title: 'The basic change',
          headers: ['Gender / number', 'Nominative', 'Accusative'],
          rows: [
            ['masculine', 'der', 'den'], ['feminine', 'die', 'die'], ['neuter', 'das', 'das'], ['plural', 'die', 'die']
          ]
        },
        {
          title: 'With the indefinite article',
          headers: ['Gender', 'Nominative', 'Accusative'],
          rows: [
            ['masculine', 'ein', 'einen'], ['feminine', 'eine', 'eine'], ['neuter', 'ein', 'ein']
          ]
        },
        {
          title: 'See the change in real sentences',
          items: [
            { en: 'The man is here.', note: 'der Mann = subject' }, { en: 'I see the man.', note: 'den Mann = object' },
            { en: 'I buy a coffee.' }, { en: 'I have an appointment.' }, { en: 'I need a doctor.' },
            { en: 'I buy the bread.' }, { en: 'I see the woman.' }
          ]
        },
        {
          title: 'Do not try to learn everything now',
          text: 'At this stage, keep one mental picture: when a masculine noun directly receives the action, <strong>der → den</strong> and <strong>ein → einen</strong>. die and das stay the same in this basic overview.'
        }
      ],
      vocabulary: [
        { meaning: 'to see' }, { meaning: 'to buy' }, { meaning: 'the coffee' },
        { meaning: 'the appointment' }, { meaning: 'the doctor' }, { meaning: 'the bread' }
      ],
      summary: ['Nominative is who performs the action.', 'Accusative is the direct object.', 'With masculine nouns: der becomes den.', 'With masculine nouns: ein becomes einen.', 'die and das stay the same in this introduction.'],
      exercises: [
        { prompt: 'Ich sehe ___ Mann.', options: ['der', 'den', 'die', 'das'], explanation: 'Mann receives the action of seeing: masculine accusative = den Mann.' },
        { prompt: 'Ich kaufe ___ Kaffee.', options: ['ein', 'einen', 'eine', 'der'], explanation: 'Kaffee is masculine and is the direct object: einen Kaffee.' },
        { prompt: 'Ich sehe ___ Frau.', options: ['der', 'den', 'die', 'das'], explanation: 'Feminine stays die in the accusative.' },
        { prompt: 'Ich kaufe ___ Brot.', options: ['den', 'ein', 'das', 'einen'], explanation: 'Brot is neuter: das stays das.' },
        { prompt: 'Ich habe ___ Termin. (ein, masculine)', explanation: 'Termin is masculine and the direct object: einen Termin.' },
        { prompt: 'Translate: “I need a doctor.”', explanation: 'Arzt is masculine and is in the accusative: einen Arzt.' }
      ]
    },
    'modals-real-life': {
      title: 'Modal verbs and real-life German',
      description: 'Finish the A1 Starter with kann, muss, and möchte—and take ready-made sentences to the supermarket, restaurant, transport, and work.',
      focus: 'Getting by in Germany',
      introduction: 'Modal verbs express what you can, need to, want, or would like to do. They make your sentences much more useful: the conjugated modal stays in position 2 and the infinitive goes to the end.',
      objectives: ['Use können, müssen, wollen, möchten, and dürfen', 'Build sentences with two verbs', 'Handle practical situations'],
      sections: [
        {
          title: 'Essential modals',
          headers: ['Verb', 'Idea', '1st person'],
          rows: [
            ['können', 'can / be able to', 'ich kann'], ['müssen', 'need to / have to', 'ich muss'], ['wollen', 'want to', 'ich will'], ['möchten', 'would like', 'ich möchte'], ['dürfen', 'may / be allowed to', 'ich darf']
          ]
        },
        {
          title: 'Two verbs, two positions',
          segments: ['Ich', 'kann', 'Deutsch', 'sprechen'],
          caption: 'The conjugated modal goes in position 2; the infinitive closes the sentence.'
        },
        {
          title: 'Sentences to remember',
          items: [
            { en: 'I can speak German.' }, { en: 'I have to work.' }, { en: 'I would like a coffee.' },
            { en: 'I want to go home.' }, { en: 'May I sit here?' }, { en: 'Can I pay by card?' }, { en: 'Can you help me? (formal)' }
          ]
        },
        {
          title: 'Real-life German',
          scenarios: [
            { title: 'Supermarket', phrases: ['Wo finde ich ...?', 'Wie viel kostet das?', 'Kann ich mit Karte bezahlen?', 'Brauchen Sie eine Tüte?'] },
            { title: 'Restaurant', phrases: ['Ich möchte ...', 'Die Rechnung, bitte.', 'Ein Wasser, bitte.', 'Ich hätte gerne ...'] },
            { title: 'Transportation', phrases: ['Wo ist der Bahnhof?', 'Wann kommt der Zug?', 'Fährt dieser Zug nach Stuttgart?', 'Welches Gleis?'] },
            { title: 'Work', phrases: ['Guten Morgen.', 'Ich habe eine Frage.', 'Können Sie mir helfen?', 'Können Sie das bitte wiederholen?'] }
          ]
        },
        {
          title: 'Mini-dialogue: first contact',
          lines: [
            ['A', 'Guten Morgen!'], ['B', 'Guten Morgen!'], ['A', 'Sprechen Sie Englisch?'], ['B', 'Ja, ein bisschen.']
          ]
        },
        {
          title: 'Personal introduction',
          items: [
            { en: 'My name is Leonardo.' }, { en: 'I come from Brazil.' }, { en: 'I live in Stuttgart.' },
            { en: 'I work at Bosch.' }, { en: 'I am learning German.' }
          ]
        }
      ],
      vocabulary: [
        { meaning: 'can / be able to' }, { meaning: 'have to' }, { meaning: 'would like' },
        { meaning: 'the bill' }, { meaning: 'the platform / track' }, { meaning: 'to repeat' }
      ],
      summary: ['The conjugated modal goes in position 2.', 'The infinitive goes to the end: Ich kann Deutsch sprechen.', 'möchte is a polite way to ask for something.', 'Können Sie mir helfen? is a key phrase.', 'Short, polite sentences already solve many situations.'],
      exercises: [
        { prompt: 'Ich ___ Deutsch sprechen. (can)', options: ['kann', 'muss', 'will', 'darf'], explanation: 'können in the first person is ich kann.' },
        { prompt: 'Ich ___ arbeiten. (have to)', options: ['möchte', 'muss', 'kann', 'darf'], explanation: 'müssen expresses obligation: ich muss.' },
        { prompt: 'Which request is more polite?', options: ['Ich will einen Kaffee.', 'Ich möchte einen Kaffee.', 'Ich muss einen Kaffee.', 'Ich kann einen Kaffee.'], explanation: 'möchte means “would like” and is a polite way to ask for something.' },
        { prompt: 'Put in order: kann / ich / mit Karte / bezahlen', explanation: 'The modal kann is in position 2; bezahlen goes to the end.' },
        { prompt: 'Translate: “Can you help me?” (formal)', explanation: 'Use können + Sie + mir helfen for the formal request.' },
        { prompt: 'True or false: in “Ich muss arbeiten”, the infinitive is at the end.', options: ['True', 'False'], answer: 'True', explanation: 'With a modal, the second verb stays in the infinitive and goes to the end.' }
      ]
    },
    'connectors-prepositions': {
      title: 'Connectors and prepositions',
      description: 'Connect ideas, indicate place, and say where you are going with small words that organize the sentence.',
      focus: 'Connecting ideas and showing relationships',
      introduction: 'Connectors join ideas; prepositions show relationships such as place, direction, time, company, and purpose. In this lesson, we will keep the two roles separate and practice each one with short sentences.',
      objectives: ['Distinguish connectors from prepositions', 'Use und, aber, oder, denn, and weil', 'Choose in, im, ins, am, mit, zu, and für in simple sentences'],
      sections: [
        { title: 'Connectors are not prepositions', items: [
          { label: 'Connectors', description: 'They join two words or sentences and show how the ideas relate.', examples: ['Ich lerne Deutsch und ich arbeite.', 'Ich bleibe zu Hause, weil ich müde bin.'] },
          { label: 'Prepositions', description: 'They come before a noun or pronoun and show place, direction, time, company, or purpose.', examples: ['Ich bin im Büro.', 'Ich gehe ins Büro.'] }
        ]},
        { title: 'Connectors: one idea leads to another', lede: 'The first four keep the verb in position 2. Weil also means “because”, but it moves the verb in its clause to the end.', headers: ['Word', 'Meaning', 'Use'], rows: [
          ['und', 'and', 'adds information: Ich lerne und ich arbeite.'],
          ['aber', 'but', 'shows contrast: Ich arbeite, aber ich bin müde.'],
          ['oder', 'or', 'presents a choice: Tee oder Kaffee?'],
          ['denn', 'because / for', 'gives a reason; the verb stays in position 2.'],
          ['weil', 'because', 'gives a reason; the verb goes to the end of the clause.']
        ]},
        { title: 'Connectors: und, aber, oder, and denn', lede: 'Notice the relationship between the ideas and the verb position in each sentence.', items: [
          { en: 'I study German and I listen to music.' },
          { en: 'I work on Monday and I study in the evening.' },
          { en: 'I am tired, but I work.' },
          { en: 'It is small, but it is practical.' },
          { en: 'Would you like tea or coffee?' },
          { en: 'Shall we walk or take the bus?' },
          { en: 'I study German because I live in Germany.' },
          { en: 'I am going home because I am tired.' }
        ]},
        { title: 'Weil: the verb goes to the end', lede: 'Weil also means “because”, but the clause that starts with weil ends with the conjugated verb.', items: [
          { en: 'I study German because I live in Germany.', note: 'wohne is at the end of the clause with weil.' },
          { en: 'I stay at home because I am ill.', note: 'bin is at the end of the clause with weil.' }
        ]},
        { title: 'The word-order difference', text: '<strong>und, aber, oder, and denn</strong> keep the verb in position 2 in each sentence. <strong>weil</strong> sends the verb in its clause to the end: Ich lerne Deutsch, weil ich in Deutschland <strong>wohne</strong>.' },
        { title: 'Prepositions: place, direction, time, and relationships', lede: 'Prepositions come before a noun or pronoun. The form depends on the meaning and sometimes on the article that follows.', headers: ['Word', 'Meaning', 'Use'], rows: [
          ['in', 'in / inside', 'base preposition: in der Stadt, in Berlin'],
          ['im', 'in / in the', 'in + dem; place or period: im Park, im Sommer'],
          ['ins', 'into / to the', 'in + das; movement: ins Kino'],
          ['am', 'on / on the', 'an + dem; days and moments: am Montag'],
          ['mit', 'with / by', 'company or means: mit Freunden, mit dem Bus'],
          ['zu', 'to / at someone’s place', 'destination or person: zum Arzt, zu Hause'],
          ['für', 'for', 'recipient or purpose: für dich']
        ]},
        { title: 'in × im × ins', items: [
          { label: 'in', description: 'It is the base preposition. Use it with proper names and with articles that do not form a contraction; the article can change when there is movement.', examples: ['Ich wohne in Berlin.', 'Ich bin in der Stadt.', 'Ich gehe in die Stadt.'] },
          { label: 'im', description: 'It is the contraction of in + dem. It indicates a place or period, without movement into it.', examples: ['Ich bin im Park.', 'Im Sommer arbeite ich.'] },
          { label: 'ins', description: 'It is the contraction of in + das. It indicates movement into a neuter place.', examples: ['Ich gehe ins Kino.', 'Wir fahren ins Büro.'] }
        ]},
        { title: 'Other prepositions in sentences', lede: 'These sentences show separate uses of am, mit, zu, and für.', items: [
          { en: 'I work on Monday.' },
          { en: 'I study German in the evening.' },
          { en: 'I go by bus.' },
          { en: 'I speak with my friend.' },
          { en: 'I am going to the doctor.' },
          { en: 'I am at home.' },
          { en: 'This is for you.' },
          { en: 'The gift is for my mother.' }
        ]},
        { title: 'Important contractions', text: '<strong>im</strong> is not a different kind of “in”: <strong>im = in + dem</strong>. Likewise, <strong>ins = in + das</strong> and <strong>am = an + dem</strong>. Do not turn every <em>in</em> into <em>im</em>: compare <strong>in der Stadt</strong>, <strong>im Park</strong>, and <strong>ins Kino</strong>.' }
      ],
      vocabulary: [
        { meaning: 'and' }, { meaning: 'but' }, { meaning: 'because' }, { meaning: 'in / inside' }, { meaning: 'in / in the; in + dem' },
        { meaning: 'into; in + das' }, { meaning: 'on Monday' }, { meaning: 'by bus' }, { meaning: 'at home' }, { meaning: 'for you' }
      ],
      summary: ['Connectors join ideas; prepositions connect nouns to relationships such as place and time.', 'und, aber, oder, and denn keep the verb in position 2.', 'weil means “because” and moves the verb to the end of the clause.', 'im = in + dem; ins = in + das; am = an + dem.', 'Use in as the base preposition, im for place or periods, and ins for movement into a place.'],
      exercises: [
        { prompt: 'I study German ___ I work.', options: ['und', 'aber', 'oder', 'weil'], explanation: 'Choose und to add a second piece of information.' },
        { prompt: 'Translate: “I live in Berlin and I work.”', explanation: 'Use und to join the two ideas.' },
        { prompt: 'I am tired, ___ I work.', options: ['und', 'aber', 'oder', 'weil'], explanation: 'Choose aber to show contrast.' },
        { prompt: 'Translate: “I want to go, but I am tired.”', explanation: 'Aber joins two contrasting ideas; the verb stays in position 2 in each clause.' },
        { prompt: 'Möchtest du Tee ___ Kaffee?', options: ['und', 'aber', 'oder', 'denn'], explanation: 'Choose oder when you offer an alternative.' },
        { prompt: 'Translate: “Would you like tea or coffee?”', explanation: 'Use oder when you present a choice.' },
        { prompt: 'Ich bleibe zu Hause, ___ ich bin krank.', options: ['und', 'aber', 'denn', 'oder'], explanation: 'Denn means “because / for” and keeps the verb in position 2: ich bin.' },
        { prompt: 'Translate: “I am going home because I am tired.”', explanation: 'After denn, the sentence still has the verb in position 2: ich bin müde.' },
        { prompt: 'Ich lerne Deutsch, weil ich in Deutschland ___.', options: ['wohne', 'wohnen', 'wohnst', 'gehe'], explanation: 'With weil, the conjugated verb goes to the end: weil ich in Deutschland wohne.' },
        { prompt: 'Translate: “I stay at home because I am tired.”', explanation: 'The clause with weil ends with the verb: weil ich müde bin.' },
        { prompt: 'Ich wohne ___ Berlin.', options: ['in', 'im', 'ins', 'am'], explanation: 'With the proper name Berlin, use the base preposition in: in Berlin.' },
        { prompt: 'Translate: “I live in Berlin.”', explanation: 'In indicates the place where you live: in Berlin.' },
        { prompt: 'Ich bin ___ Park.', options: ['in', 'im', 'ins', 'am'], explanation: 'Im is the contraction of in + dem: Ich bin im Park.' },
        { prompt: 'Translate: “I work in summer.”', explanation: 'For a period, use im: im Sommer.' },
        { prompt: 'Ich gehe ___ Kino.', options: ['in', 'im', 'ins', 'am'], explanation: 'Ins is the contraction of in + das and indicates movement into a place: Ich gehe ins Kino.' },
        { prompt: 'Translate: “We are going to the office.”', explanation: 'Büro is neuter; with movement into it, in + das becomes ins.' },
        { prompt: '___ Montag arbeite ich.', options: ['Am', 'Im', 'In', 'Ins'], explanation: 'For days of the week, use am: am Montag.' },
        { prompt: 'Translate: “On Monday I study German.”', explanation: 'Am is the contraction of an + dem and appears with days of the week.' },
        { prompt: 'Ich fahre ___ dem Bus.', options: ['mit', 'zu', 'für', 'in'], explanation: 'Mit indicates company or means of transportation: mit dem Bus.' },
        { prompt: 'Translate: “I speak with my friend.”', explanation: 'Mit means “with” when we talk about someone’s company.' },
        { prompt: 'Ich gehe ___ Arzt.', options: ['zum', 'im', 'ins', 'für'], explanation: 'To go to the doctor, use zu + dem: zum Arzt.' },
        { prompt: 'Complete: Ich bin ___ Hause.', explanation: 'The fixed expression for “at home” is zu Hause.' },
        { prompt: 'Das ist ___ dich.', options: ['für', 'mit', 'zu', 'in'], explanation: 'Für indicates who something is intended for: für dich.' },
        { prompt: 'Translate: “The gift is for my mother.”', explanation: 'Für introduces the person who receives something or who it is intended for.' }
      ]
    }
  };

  function applyEnglishTranslations(lesson, translation) {
    ['title', 'description', 'focus', 'introduction'].forEach((field) => {
      lesson[field + '_en'] = translation[field];
    });
    lesson.objectives_en = translation.objectives;
    lesson.summary_en = translation.summary;

    lesson.sections.forEach((section, sectionIndex) => {
      const translated = translation.sections[sectionIndex] || {};
      ['title', 'lede', 'text', 'caption'].forEach((field) => {
        if (translated[field] !== undefined) section[field + '_en'] = translated[field];
      });
      ['headers', 'rows', 'segments'].forEach((field) => {
        if (translated[field] !== undefined) section[field + '_en'] = translated[field];
      });
      if (translated.items && section.items) {
        section.items.forEach((item, itemIndex) => {
          const itemTranslation = translated.items[itemIndex] || {};
          Object.keys(itemTranslation).forEach((field) => {
            if (field === 'en') item.en = itemTranslation[field];
            else if (field === 'examples') item.examples_en = itemTranslation[field];
            else item[field + '_en'] = itemTranslation[field];
          });
        });
      }
      if (translated.scenarios && section.scenarios) {
        section.scenarios.forEach((scenario, scenarioIndex) => {
          const scenarioTranslation = translated.scenarios[scenarioIndex] || {};
          if (scenarioTranslation.title !== undefined) scenario.title_en = scenarioTranslation.title;
          if (scenarioTranslation.phrases !== undefined) scenario.phrases_en = scenarioTranslation.phrases;
        });
      }
      if (translated.lines !== undefined) section.lines_en = translated.lines;
    });

    lesson.vocabulary.forEach((item, itemIndex) => {
      const itemTranslation = translation.vocabulary[itemIndex] || {};
      if (itemTranslation.meaning !== undefined) item.meaning_en = itemTranslation.meaning;
    });

    lesson.exercises.forEach((exercise, exerciseIndex) => {
      const exerciseTranslation = translation.exercises[exerciseIndex] || {};
      if (exerciseTranslation.prompt !== undefined) exercise.prompt_en = exerciseTranslation.prompt;
      if (exerciseTranslation.options !== undefined) exercise.options_en = exerciseTranslation.options;
      if (exerciseTranslation.explanation !== undefined) exercise.explanation_en = exerciseTranslation.explanation;
      exercise.answer_en = exerciseTranslation.answer !== undefined ? exerciseTranslation.answer : exercise.answer;
      if (exercise.answers) exercise.answers_en = exercise.answers.slice();
    });
  }

  lessons.forEach((lesson) => applyEnglishTranslations(lesson, englishTranslations[lesson.id]));

  window.KlarExerciseOnly = lessons.filter((lesson) => lesson.exerciseOnly);
  window.KlarLessons = lessons.filter((lesson) => !lesson.exerciseOnly);
}());
