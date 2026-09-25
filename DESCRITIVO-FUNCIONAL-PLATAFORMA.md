# Descritivo funcional completo da plataforma KlarDeutsch

## 1. Objetivo deste documento

Este documento descreve o funcionamento da plataforma KlarDeutsch com base na implementação atual do projeto. O foco é exclusivamente funcional: telas, rotas, conteúdos, regras, estados, validações, persistência e navegação.

Não fazem parte deste documento decisões de design visual, paleta de cores, tipografia, espaçamentos, composição estética ou direção de arte.

## 2. Visão geral da plataforma

KlarDeutsch é uma plataforma web estática para ensino inicial de alemão nível A1, voltada principalmente a pessoas que falam português.

Características funcionais:

- curso guiado com 10 aulas;
- interface disponível em português e inglês;
- alemão apresentado com tradução e explicações;
- vocabulário de consulta rápida;
- reprodução de pronúncia pelo recurso de voz do navegador;
- exercícios interativos com correção imediata;
- prática específica dos verbos `sein` e `haben`;
- acompanhamento local de progresso;
- revisão automática baseada nas aulas concluídas;
- funcionamento sem conta, sem backend e sem instalação;
- progresso salvo somente no navegador e no dispositivo atual.

## 3. Escopo funcional atual

### 3.1. Tecnologia e execução

| Item | Regra atual |
|---|---|
| Tipo de aplicação | Single-page application estática |
| Entrada | `index.html` |
| Renderização | JavaScript puro, sem framework |
| Dados de curso | Estruturas estáticas em `js/lessons.js` |
| Dados de vocabulário | Estruturas estáticas em `js/app.js` |
| Persistência | `localStorage` |
| Áudio | Web Speech API do navegador |
| Backend | Não existe |
| Conta de usuário | Não existe |
| Banco de dados | Não existe |
| Build obrigatório | Não existe |
| Instalação | Não existe |
| URLs internas | Não há roteamento por URL; a rota fica no estado JavaScript |

### 3.2. Público e nível

- pessoa iniciante absoluto ou iniciante em alemão;
- foco em alemão A1;
- explicações de apoio em português ou inglês;
- exemplos curtos e situações do cotidiano;
- prioridade para pronúncia, apresentação pessoal, perguntas, rotina, compras, transporte, restaurante e trabalho.

## 4. Inventário de telas e rotas

Cada rota abaixo é renderizada dentro do elemento `#app-view`. A aplicação não navega para páginas HTML diferentes; ela troca o conteúdo da área principal conforme o estado da rota.

| Rota | Tela funcional | Conteúdo |
|---|---|---|
| `dashboard` | Visão geral | Progresso, próximo passo, caminho de aulas, conquistas e ritmo de estudo |
| `review` | Revisar | Até 6 exercícios sorteados entre as aulas concluídas |
| `vocabulary-words` | Vocabulário: palavras | 64 palavras alemãs com significado e áudio |
| `vocabulary-phrases` | Vocabulário: frases | 28 frases úteis com tradução e áudio |
| `vocabulary-numbers` | Vocabulário: números | Números de 1 a 20, regras para números maiores e exemplos |
| `vocabulary-weekdays` | Vocabulário: dias da semana | 7 dias, uso com `am` e áudio |
| `vocabulary-months` | Vocabulário: meses | 12 meses, uso com `im` e áudio |
| `lesson` + `activeLessonId` | Aula | Uma das 10 aulas do curso, com teoria, vocabulário, exercícios e resumo |
| `verbs-starter` | Primeiros verbos | Usos comuns, conjugação e treino de frases com `lernen`, `machen` e `spielen` |
| `exercises` | Prática de `sein` | Conjugação e tradução de frases com `sein` |
| `exercises-haben` | Prática de `haben` | Conjugação e tradução de frases com `haben` |

As aulas são identificadas pelos seguintes IDs:

1. `pronunciation`
2. `pronouns`
3. `sein-haben`
4. `sentence-structure`
5. `questions`
6. `present-verbs`
7. `articles`
8. `negation`
9. `accusative`
10. `modals-real-life`

## 5. Regras gerais do projeto

### 5.1. Idioma

- O idioma inicial é português (`pt`).
- O idioma alternativo é inglês (`en`).
- O seletor de idioma fica disponível no shell global.
- A preferência é salva em `localStorage` com a chave `klar-deutsch-language-v1`.
- Ao trocar de idioma, textos estáticos, textos das aulas, exercícios, mensagens e atributos de acessibilidade são atualizados.
- O atributo `lang` do documento muda para `pt-BR` ou `en`.
- O alemão dos exemplos não é traduzido; ele permanece como conteúdo de estudo.
- Se uma tradução inglesa específica não existir, o sistema usa o conteúdo original disponível.

### 5.2. Navegação

- A navegação é feita por cliques em elementos com `data-route` ou `data-open-lesson`.
- Abrir uma aula altera `activeLessonId` e define a rota como `lesson`.
- A navegação anterior/próxima dentro de uma aula abre a aula correspondente.
- A primeira aula não permite voltar.
- A décima aula não permite avançar.
- A aplicação volta para o topo ao trocar de tela ou de aula.
- Em telas estreitas, a navegação lateral é fechada automaticamente após uma seleção.
- Não existem bloqueios de acesso por nível: o usuário pode abrir qualquer aula ou tela diretamente.

### 5.3. Progresso do curso

O progresso principal é salvo com a chave `klar-deutsch-progress-v1`.

O objeto persistido contém:

| Campo | Finalidade |
|---|---|
| `completedLessons` | IDs das aulas marcadas como concluídas |
| `lessonScores` | Últimos resultados registrados por aula e exercício |
| `totalAnswered` | Quantidade global de respostas registradas |
| `totalCorrect` | Quantidade global de respostas corretas |
| `achievements` | IDs das conquistas desbloqueadas |
| `lastLessonId` | Última aula associada a uma resposta ou conclusão |
| `startedAt` | Data de criação inicial do progresso |

Regras:

- o percentual geral é calculado por aulas concluídas: aulas concluídas / 10;
- responder exercícios não conclui automaticamente uma aula;
- a aula só entra em `completedLessons` quando o usuário aciona o botão de concluir;
- uma aula concluída vale 100% no caminho do curso;
- uma aula não concluída usa a quantidade de exercícios verificados para calcular o andamento;
- a pontuação da aula usa respostas por ID de exercício;
- novas tentativas do mesmo exercício atualizam o registro do exercício, mas incrementam os contadores globais de respostas;
- a precisão geral é `totalCorrect / totalAnswered`;
- o progresso da prática específica de `sein` e `haben` não é salvo no `localStorage`;
- o estado das sessões da tela atual existe somente enquanto a aplicação está aberta;
- recarregar a página preserva o progresso principal, mas não preserva respostas temporárias de sessões abertas.

### 5.4. Conquistas

As conquistas são derivadas da quantidade de aulas concluídas:

| ID | Regra |
|---|---|
| `first-step` | Pelo menos 1 aula concluída |
| `guten-tag` | Pelo menos 5 aulas concluídas |
| `a1-starter` | 10 aulas concluídas |

### 5.5. Reset

- O comando “Resetar progresso” solicita confirmação nativa do navegador.
- Se confirmado, o progresso persistido volta ao estado inicial.
- Sessões locais de aulas, revisão e exercícios verbais são limpas.
- A rota volta para `dashboard`.
- A ação não pode ser desfeita pela própria aplicação.
- O idioma selecionado não é resetado pelo reset de progresso, pois usa uma chave de armazenamento separada.

### 5.6. Áudio

- Todo conteúdo alemão que possui ação de áudio usa `speakGerman(text)`.
- A voz é solicitada com idioma `de-DE`.
- A velocidade é `0.82`.
- O tom é `1`.
- Uma nova fala cancela a fala anterior antes de iniciar.
- Se o navegador não oferecer `speechSynthesis` ou `SpeechSynthesisUtterance`, o sistema exibe uma mensagem informando que o áudio não está disponível.
- O áudio depende das vozes instaladas no navegador/dispositivo.

### 5.7. Acessibilidade funcional

- A navegação principal usa elementos semânticos de navegação e botões.
- Componentes interativos têm rótulos ARIA ou texto acessível.
- Resultados de exercícios e toasts usam regiões com atualização anunciável.
- O menu lateral pode ser controlado por botão e pela tecla `Escape`.
- Abas de vocabulário e prática verbal informam estado selecionado.
- Campos de resposta têm rótulos e atributos `aria-label`.

## 6. Shell global da aplicação

O shell aparece em todas as rotas e é composto funcionalmente pelos elementos abaixo.

### 6.1. Identificação da plataforma

- Nome: KlarDeutsch.
- Curso: A1, do zero.
- Marca textual da plataforma não altera o fluxo de uso.

### 6.2. Seletor de idioma

Contém:

- opção Português (`PT`);
- opção English (`EN`);
- estado ativo;
- atributo `aria-pressed` atualizado;
- persistência da escolha.

### 6.3. Resumo de progresso lateral

Exibe:

- percentual geral do curso;
- barra de progresso correspondente;
- mensagem inicial quando o progresso é zero;
- quantidade de aulas concluídas quando o progresso é parcial;
- mensagem de conclusão quando as 10 aulas estão concluídas.

### 6.4. Navegação principal

Opções:

- Visão geral;
- Revisar, com badge numérico igual à quantidade de aulas concluídas.

### 6.5. Grupo Vocabulário

Contém cinco rotas:

1. Palavras;
2. Frases;
3. Números;
4. Dias da semana;
5. Meses do ano.

O grupo pode ser expandido ou recolhido localmente. O estado de expansão não é persistido.

### 6.6. Grupo Aulas

- Lista dinâmica das 10 aulas.
- Cada aula exibe número, título e estado.
- Estados: não iniciada, em andamento ou concluída.
- O estado é derivado do progresso salvo e da sessão atual.

### 6.7. Grupo Exercícios

Contém:

- Ser ou estar: rota `exercises`;
- Conjugação de `haben`: rota `exercises-haben`.

### 6.8. Barra superior

Contém:

- botão para abrir/fechar o menu lateral;
- breadcrumb funcional que informa a seção atual;
- breadcrumb específico para dashboard, revisão, vocabulário, aulas e exercícios.

### 6.9. Mensagens temporárias

O sistema usa uma região de toast para informar:

- áudio indisponível;
- resposta vazia;
- resposta duplicada;
- progresso resetado;
- exercício de aula resetado;
- prática verbal resetada;
- conclusão de aula;
- exercício verbal conferido;
- exercício verbal perfeito.

## 7. Tela 1 — Visão geral (`dashboard`)

### 7.1. Finalidade

É a tela inicial e o ponto central de acompanhamento do curso.

### 7.2. Conteúdo exibido

1. Introdução da plataforma e proposta do curso A1.
2. Resumo geral de progresso:
   - aulas concluídas de um total de 10;
   - percentual geral;
   - quantidade de exercícios respondidos;
   - taxa de acerto.
3. Quatro indicadores:
   - aulas concluídas;
   - aulas no caminho;
   - exercícios feitos;
   - taxa de acerto.
4. Bloco “continuar”:
   - abre a próxima aula não concluída;
   - se todas estiverem concluídas, aponta para a última aula para continuidade/revisão.
5. Caminho das 10 aulas:
   - número da aula;
   - título;
   - foco da aula quando não concluída;
   - status “em andamento” quando aplicável;
   - status “concluída” quando aplicável;
   - percentual calculado para aquela aula.
6. Atalho para a tela Revisar.
7. Lista de conquistas:
   - primeiro passo;
   - Guten Tag;
   - A1 Starter.
8. Indicador de ritmo de estudo por dias da semana.

### 7.3. Regras

- O dashboard sempre lê o progresso atual do `localStorage` antes de renderizar.
- O próximo passo é a primeira aula que não estiver em `completedLessons`.
- A precisão é zero quando ainda não existem respostas.
- O ritmo de estudo é uma representação estática de acompanhamento; não é calculado a partir de datas reais de estudo.
- Os indicadores são informativos e não editáveis.

## 8. Tela 2 — Revisar (`review`)

### 8.1. Finalidade

Permitir revisão rápida de conteúdo já concluído.

### 8.2. Estado sem aulas concluídas

Exibe:

- mensagem explicando que ainda não há conteúdo disponível para revisão;
- ação para iniciar a primeira aula;
- nenhum exercício de revisão.

### 8.3. Estado com aulas concluídas

Exibe:

- quantidade de perguntas selecionadas;
- quantidade de aulas disponíveis para revisão;
- lista de exercícios reutilizados das aulas concluídas;
- resultado parcial da revisão;
- ação para gerar uma nova seleção;
- ação para voltar ao dashboard.

### 8.4. Regras de seleção

- somente exercícios de aulas presentes em `completedLessons` entram no conjunto;
- o conjunto é embaralhado aleatoriamente;
- no máximo 6 exercícios são exibidos;
- a seleção é refeita ao renderizar a tela ou ao solicitar nova seleção;
- a resposta da revisão não altera a pontuação específica da aula;
- a resposta da revisão incrementa os contadores globais de respostas e acertos.

### 8.5. Resultado da revisão

- percentual calculado sobre os exercícios respondidos;
- mensagem positiva para desempenho a partir de 80%;
- mensagem de construção de base abaixo de 80%;
- opção de criar uma nova seleção.

## 9. Tela 3 — Vocabulário: Palavras (`vocabulary-words`)

### 9.1. Conteúdo

A tela contém 64 palavras alemãs, cada uma com:

- palavra em alemão;
- significado em português ou inglês;
- ação para ouvir a palavra.

Lista de palavras:

`Guten`, `Morgen`, `Tag`, `Abend`, `Gute`, `Nacht`, `Tschüss`, `Tschau`, `Bis`, `später`, `dann`, `bald`, `Auf`, `Wiedersehen`, `Mein`, `Name`, `ist`, `Leo`, `Ich`, `heiße`, `bin`, `25`, `Jahre`, `alt`, `komme`, `aus`, `Brasilien`, `Brasilianer/in`, `wohne`, `in`, `München`, `spreche`, `Portugiesisch`, `und`, `Deutsch`, `Meine`, `Hobbys`, `sind`, `Fußball`, `spielen`, `lesen`, `Single`, `habe`, `einen`, `Freund`, `eine`, `Freundin`, `verheiratet`, `Student/in`, `Schüler/in`, `Lehrer/in`, `Frage`, `Antwort`, `Wie`, `dein`, `bist`, `du`, `Woher`, `kommst`, `Was`, `deine`, `Welche`, `Sprachen`, `sprichst`.

### 9.2. Regras

- Não há exercício nesta tela.
- O áudio é acionado individualmente por palavra.
- O conteúdo depende do idioma da interface somente na tradução.

## 10. Tela 4 — Vocabulário: Frases (`vocabulary-phrases`)

### 10.1. Conteúdo

A tela contém 28 frases práticas:

1. `Guten Morgen` — bom dia.
2. `Guten Tag` — bom dia / boa tarde.
3. `Guten Abend` — boa noite.
4. `Gute Nacht` — boa noite.
5. `Bis später / bis dann` — até mais.
6. `Bis bald` — até breve.
7. `Auf Wiedersehen` — até mais.
8. `Mein Name ist Leo` — meu nome é Leonardo.
9. `Ich heiße Leo` — chamo-me Leo.
10. `Ich bin Leo` — eu sou Leo.
11. `Ich bin 25 Jahre alt` — tenho 25 anos de idade.
12. `Ich komme aus Brasilien` — venho do Brasil.
13. `Ich bin Brasilianer/in` — eu sou brasileiro/a.
14. `Ich wohne in München` — moro em Munique.
15. `Ich spreche Portugiesisch und Deutsch` — falo português e alemão.
16. `Meine Hobbys sind Fußball spielen und lesen` — meus passatempos são jogar futebol e ler.
17. `Ich bin Single` — eu sou solteiro/a.
18. `Ich habe einen Freund` — eu tenho namorado.
19. `Ich habe eine Freundin` — eu tenho namorada.
20. `Ich bin verheiratet` — sou casado/a.
21. `Ich bin Student/in` — eu sou estudante universitário.
22. `Ich bin Schüler/in` — eu sou aluno/a.
23. `Ich bin Lehrer/in` — eu sou professor/a.
24. `Wie ist dein Name?` — qual é o seu nome?
25. `Wie alt bist du?` — quantos anos você tem?
26. `Woher kommst du?` — de onde você é?
27. `Was sind deine Hobbys?` — quais são os seus passatempos?
28. `Welche Sprachen sprichst du?` — quais idiomas você fala?

### 10.2. Regras

- Cada frase mostra alemão e tradução.
- Cada frase tem ação de áudio.
- A tradução alterna entre português e inglês conforme o idioma selecionado.

## 11. Tela 5 — Vocabulário: Números (`vocabulary-numbers`)

### 11.1. Conteúdo base

Exibe os números de 1 a 20:

| Número | Alemão |
|---:|---|
| 1 | eins |
| 2 | zwei |
| 3 | drei |
| 4 | vier |
| 5 | fünf |
| 6 | sechs |
| 7 | sieben |
| 8 | acht |
| 9 | neun |
| 10 | zehn |
| 11 | elf |
| 12 | zwölf |
| 13 | dreizehn |
| 14 | vierzehn |
| 15 | fünfzehn |
| 16 | sechzehn |
| 17 | siebzehn |
| 18 | achtzehn |
| 19 | neunzehn |
| 20 | zwanzig |

Cada número possui ação de áudio.

### 11.2. Regras para números maiores

#### De 20 a 100

- a unidade vem antes da dezena;
- usa-se `und` entre unidade e dezena;
- exemplos: `einundzwanzig`, `zweiunddreißig`, `siebenundvierzig`, `neunundneunzig`.

#### De 100 a 1.000

- usa-se `hundert` depois da centena;
- a lógica das dezenas continua sendo aplicada;
- `100` pode ser `hundert` ou `einhundert`;
- exemplos: `einhunderteins`, `zweihundertfünfundvierzig`, `neunhundertneunundneunzig`.

#### De 1.000 a 1.000.000

- usa-se `tausend` depois do bloco dos milhares;
- `1.000.000` é `eine Million`;
- `Million` é substantivo;
- exemplos: `eintausendzweihundertvierunddreißig`, `zwölftausendfünfhundert`, `eine Million`.

## 12. Tela 6 — Vocabulário: Dias da semana (`vocabulary-weekdays`)

### 12.1. Conteúdo

| Alemão | Português | Uso apresentado |
|---|---|---|
| Montag | segunda-feira | `am Montag` |
| Dienstag | terça-feira | `am Dienstag` |
| Mittwoch | quarta-feira | `am Mittwoch` |
| Donnerstag | quinta-feira | `am Donnerstag` |
| Freitag | sexta-feira | `am Freitag` |
| Samstag | sábado | `am Samstag` |
| Sonntag | domingo | `am Sonntag` |

### 12.2. Regras

- são 7 itens;
- cada item tem áudio;
- a tela ensina a preposição `am` para uso com dias;
- o nome do dia pode aparecer em inglês quando a interface estiver em inglês.

## 13. Tela 7 — Vocabulário: Meses (`vocabulary-months`)

### 13.1. Conteúdo

| Alemão | Português | Uso apresentado |
|---|---|---|
| Januar | janeiro | `im Januar` |
| Februar | fevereiro | `im Februar` |
| März | março | `im März` |
| April | abril | `im April` |
| Mai | maio | `im Mai` |
| Juni | junho | `im Juni` |
| Juli | julho | `im Juli` |
| August | agosto | `im August` |
| September | setembro | `im September` |
| Oktober | outubro | `im Oktober` |
| November | novembro | `im November` |
| Dezember | dezembro | `im Dezember` |

### 13.2. Regras

- são 12 itens;
- cada item tem áudio;
- a tela ensina a preposição `im` para uso com meses;
- o nome do mês pode aparecer em inglês quando a interface estiver em inglês.

## 14. Estrutura comum das telas de aula

Todas as 10 aulas usam o mesmo fluxo funcional.

### 14.1. Cabeçalho da aula

Contém:

- número da aula;
- foco da aula;
- título;
- descrição;
- duração estimada;
- quantidade de exercícios;
- status da aula;
- percentual de progresso da aula;
- quantidade de exercícios verificados.

### 14.2. Objetivos

Cada aula apresenta uma introdução e uma lista de objetivos de aprendizagem.

### 14.3. Conteúdo didático

As seções didáticas podem ser dos seguintes tipos:

| Tipo interno | Conteúdo funcional |
|---|---|
| `soundGrid` | Sons, símbolos, explicação, exemplo e tradução |
| `table` | Cabeçalho, linhas, exemplos e áudio em células aplicáveis |
| `examples` | Frases em alemão, tradução, observações e áudio |
| `rule` | Regra sequenciada com segmentos e frase explicativa |
| `callout` | Aviso ou regra de memorização |
| `compare` | Comparação de conceitos com descrição e exemplos |
| `scenario` | Situações reais com frases e áudio |
| `dialogue` | Diálogo com interlocutores, falas e áudio |

### 14.4. Vocabulário da aula

- Cada aula possui 6 itens de vocabulário.
- Cada item apresenta palavra, significado, exemplo quando disponível e áudio.

### 14.5. Exercícios da aula

- Os exercícios aparecem depois do conteúdo didático e do vocabulário.
- Cada exercício informa número e tipo.
- Cada exercício tem botão para conferir.
- Cada exercício tem botão para exibir explicação e resposta esperada.
- Tipos disponíveis: múltipla escolha, completar, ordenar, traduzir e verdadeiro/falso.

### 14.6. Resultado da aula

O resultado mostra:

- quantidade de respostas corretas;
- quantidade respondida;
- percentual;
- mensagem de desempenho;
- ação para ir ao resumo quando há respostas;
- ação para tentar novamente quando todos os exercícios foram respondidos.

Faixas de mensagem:

- 90% ou mais: excelente;
- 70% a 89%: muito bom;
- 50% a 69%: avançando;
- abaixo de 50%: recomendar revisão.

### 14.7. Resumo e encerramento

- Cada aula possui uma lista de pontos principais.
- O botão de conclusão marca a aula como concluída independentemente da pontuação.
- Uma aula já concluída mostra o botão desabilitado com estado concluído.

## 15. Tela 8 — Aula 1: Pronúncia e leitura

| Campo | Conteúdo |
|---|---|
| ID | `pronunciation` |
| Duração | 18 min |
| Foco | Ouvir e reconhecer |
| Objetivos | Reconhecer `ä`, `ö`, `ü` e `ß`; ler combinações frequentes; usar o áudio para treinar o ouvido |
| Exercícios | 4 |

### 15.1. Seções e regras

1. **Os quatro sons especiais**
   - `ä`: parecido com “é” aberto; exemplo `Mädchen`.
   - `ö`: “ê” com os lábios de “ô”; exemplo `schön`.
   - `ü`: “i” com os lábios de “u”; exemplo `müde`.
   - `ß`: som de “ss”; exemplo `Straße`.
2. **Combinações frequentes**
   - `ch`: sopro suave;
   - `sch`: “x”;
   - `sp`: “xp” no início;
   - `st`: “x t” no início;
   - `z`: “ts”;
   - `w`: “v”;
   - `v`: geralmente “f”;
   - `j`: “i”.
3. **Vogais em dupla**
   - `ei`: “ai”;
   - `ie`: “i” longo;
   - `eu` e `äu`: “ói”.
4. **Leia, ouça, repita**
   - `Mädchen`, `schön`, `müde`, `Straße`, `Deutsch`, `Häuser`.

### 15.2. Exercícios

1. Múltipla escolha: combinação com som de “ai” → `ei`.
2. Múltipla escolha: palavra que começa com som de “x” → `Schule`.
3. Múltipla escolha: pronúncia aproximada de `Zeit` → `tsait`.
4. Tradução: “água”, incluindo artigo → `das Wasser`.

## 16. Tela 9 — Aula 2: Pronomes pessoais

| Campo | Conteúdo |
|---|---|
| ID | `pronouns` |
| Duração | 20 min |
| Foco | Falar sobre pessoas |
| Objetivos | Usar os nove pronomes básicos; distinguir `sie` de `Sie`; apresentar pessoas com frases simples |
| Exercícios | 4 |

### 16.1. Seções e regras

1. **Mapa dos pronomes**
   - `ich`: eu;
   - `du`: você informal;
   - `er`: ele;
   - `sie`: ela;
   - `es`: neutro;
   - `wir`: nós;
   - `ihr`: vocês informais;
   - `sie`: eles/elas;
   - `Sie`: você/vocês formal, sempre com maiúscula.
2. **Atenção ao `Sie`**
   - `sie` pode significar ela ou eles/elas;
   - `Sie` com maiúscula indica tratamento formal;
   - verbo e contexto ajudam na fala; a maiúscula ajuda na escrita.
3. **Frases de apresentação**
   - `Ich bin Leonardo.`
   - `Du bist hier.`
   - `Er arbeitet.`
   - `Sie lernt Deutsch.`
   - `Wir wohnen in Deutschland.`
   - `Sprechen Sie Deutsch?`

### 16.2. Exercícios

1. Múltipla escolha: “ela” em `___ lernt Deutsch.` → `Sie`.
2. Múltipla escolha: “nós” → `wir`.
3. Completar: `___ bin Leonardo.` → `ich`.
4. Tradução: “Nós moramos na Alemanha.” → `Wir wohnen in Deutschland.`

## 17. Tela 10 — Aula 3: Sein e haben

| Campo | Conteúdo |
|---|---|
| ID | `sein-haben` |
| Duração | 24 min |
| Foco | `bin`, `bist`, `habe` |
| Objetivos | Conjugar `sein`; conjugar `haben`; descrever estados e necessidades |
| Exercícios | 10 |

### 17.1. Regras

`sein`:

| Pronome | Forma |
|---|---|
| ich | bin |
| du | bist |
| er/sie/es | ist |
| wir | sind |
| ihr | seid |
| sie/Sie | sind |

`haben`:

| Pronome | Forma |
|---|---|
| ich | habe |
| du | hast |
| er/sie/es | hat |
| wir | haben |
| ihr | habt |
| sie/Sie | haben |

Ponto de memorização:

- `sein` é mais irregular: `bin`, `bist`, `ist`, `sind`, `seid`;
- `haben` mantém `hab-` na maior parte das formas, mas muda para `hast` e `hat` no singular.

### 17.2. Conteúdo de exemplos

`Ich bin müde.`, `Ich bin glücklich.`, `Ich bin zu Hause.`, `Du bist nett.`, `Er ist im Büro.`, `Ich habe Zeit.`, `Ich habe Hunger.`, `Du hast ein Auto.`, `Er hat eine Frage.`, `Wir haben Arbeit.`

### 17.3. Exercícios

1. `Ich ___ müde.` → `bin`.
2. `Du ___ nett.` → `bist`.
3. `Er ___ im Büro.` → `ist`.
4. `Wir ___ hier.` → `sind`.
5. `Ihr ___ pünktlich.` → `seid`.
6. `Ich ___ Zeit.` → `habe`.
7. `Du ___ ein Auto.` → `hast`.
8. `Er ___ eine Frage.` → `hat`.
9. `Wir ___ Arbeit.` → `haben`.
10. Tradução: “Eu estou em casa.” → `Ich bin zu Hause.`

## 18. Tela 11 — Aula 4: Estrutura básica das frases

| Campo | Conteúdo |
|---|---|
| ID | `sentence-structure` |
| Duração | 20 min |
| Foco | Verbo na posição 2 |
| Objetivos | Identificar verbo conjugado; montar frases declarativas; começar frases com tempo ou lugar |
| Exercícios | 4 |

### 18.1. Regras

- O verbo conjugado normalmente fica no segundo elemento.
- O segundo elemento não significa necessariamente a segunda palavra.
- Um bloco como `Am Montag` ocupa a primeira posição.
- Exemplo: `Am Montag arbeite ich.`
- O verbo `arbeite` continua na posição 2.

### 18.2. Exemplos

- `Ich arbeite bei Bosch.`
- `Ich lerne Deutsch.`
- `Ich wohne in Stuttgart.`
- `Heute arbeite ich.`
- `Heute lerne ich Deutsch.`
- `Am Montag arbeite ich.`

### 18.3. Exercícios

1. Ordenação: `Deutsch / ich / lerne` → `Ich lerne Deutsch`.
2. Ordenação: `Heute / ich / arbeite` → `Heute arbeite ich`.
3. Múltipla escolha: frase correta → `Heute lerne ich Deutsch.`
4. Verdadeiro/falso: o verbo é sempre a segunda palavra → falso.

## 19. Tela 12 — Aula 5: Perguntas em alemão

| Campo | Conteúdo |
|---|---|
| ID | `questions` |
| Duração | 21 min |
| Foco | Perguntar e entender |
| Objetivos | Reconhecer W-Fragen; perguntar sobre lugares, preços e horários; usar frases de sobrevivência |
| Exercícios | 4 |

### 19.1. Regras e conteúdo

| Pergunta | Significado | Exemplo |
|---|---|---|
| `Was?` | o quê? | `Was ist das?` |
| `Wer?` | quem? | `Wer ist das?` |
| `Wo?` | onde? | `Wo ist der Bahnhof?` |
| `Woher?` | de onde? | `Woher kommst du?` |
| `Wohin?` | para onde? | `Wohin gehst du?` |
| `Wann?` | quando? | `Wann kommt der Zug?` |
| `Warum?` | por quê? | `Warum lernst du Deutsch?` |
| `Wie?` | como? | `Wie heißt du?` |
| `Wie viel?` | quanto? | `Wie viel kostet das?` |
| `Wie lange?` | quanto tempo? | `Wie lange dauert das?` |

Frases de bolso:

- para ajuda: `Entschuldigung, wo ist der Bahnhof?`, `Können Sie mir helfen?`, `Sprechen Sie Englisch?`;
- para pagar: `Wie viel kostet das?`, `Kann ich mit Karte bezahlen?`.

### 19.2. Exercícios

1. Onde fica a estação → `Wo`.
2. Quanto custa → `Wie viel`.
3. Quando chega o trem → `Wann`.
4. Tradução formal: “Você fala inglês?” → `Sprechen Sie Englisch?`.

## 20. Tela 13 — Aula 6: Verbos no presente

| Campo | Conteúdo |
|---|---|
| ID | `present-verbs` |
| Duração | 24 min |
| Foco | Ações do dia a dia |
| Objetivos | Encontrar radical; conjugar `machen` e verbos frequentes; falar sobre rotina |
| Exercícios | 5 |

### 20.1. Regras

- Remove-se `-en` do infinitivo para encontrar o radical.
- O modelo usa `mach-` + terminação.

| Pronome | Terminação | Exemplo |
|---|---|---|
| ich | `-e` | `ich mache` |
| du | `-st` | `du machst` |
| er/sie/es | `-t` | `er macht` |
| wir | `-en` | `wir machen` |
| ihr | `-t` | `ihr macht` |
| sie/Sie | `-en` | `sie machen` |

Verbos da primeira semana:

- `machen` — fazer;
- `arbeiten` — trabalhar;
- `lernen` — aprender;
- `wohnen` — morar;
- `kommen` — vir;
- `kaufen` — comprar;
- `brauchen` — precisar;
- `spielen` — jogar/brincar;
- `fragen` — perguntar.

Regra especial: radicais terminados em `-t` ou `-d` podem receber um “e” de apoio, como `arbeiten → du arbeitest`.

### 20.2. Exercícios

1. `Ich ___ Deutsch. (lernen)` → `lerne`.
2. `Du ___ in Berlin. (wohnen)` → `wohnst`.
3. `Er ___ bei Bosch. (arbeiten)` → `arbeitet`.
4. `wir + machen` → `wir machen`.
5. Tradução: “Eu preciso de ajuda.” → `Ich brauche Hilfe.`

## 21. Tela 14 — Aula 7: Artigos e gênero

| Campo | Conteúdo |
|---|---|
| ID | `articles` |
| Duração | 22 min |
| Foco | `der`, `die`, `das` |
| Objetivos | Reconhecer artigos definidos; usar `ein` e `eine`; memorizar substantivos com artigo |
| Exercícios | 5 |

### 21.1. Regras

| Artigo | Gênero/número | Exemplo |
|---|---|---|
| `der` | masculino | `der Mann` |
| `die` | feminino | `die Frau` |
| `das` | neutro | `das Auto` |
| `die` | plural | `die Kinder` |

Artigo indefinido:

- `der` → `ein`;
- `die` → `eine`;
- `das` → `ein`;
- no plural não há equivalente direto de “um/uma”.

Vocabulário agrupado:

- masculino: `der Mann`, `der Tisch`, `der Bahnhof`, `der Zug`;
- feminino: `die Frau`, `die Stadt`, `die Arbeit`, `die Schule`;
- neutro: `das Auto`, `das Haus`, `das Kind`, `das Wasser`.

Regra de memorização: aprender `der Tisch`, e não apenas `Tisch`.

### 21.2. Exercícios

1. `___ Auto` → `das`.
2. `___ Frau` → `die`.
3. `___ Bahnhof` → `der`.
4. “uma casa” → `ein Haus`.
5. Tradução: “a escola” → `die Schule`.

## 22. Tela 15 — Aula 8: Negação

| Campo | Conteúdo |
|---|---|
| ID | `negation` |
| Duração | 19 min |
| Foco | Dizer “não” |
| Objetivos | Usar `nicht` para ações/adjetivos; usar `kein` para substantivos; negar frases cotidianas |
| Exercícios | 8 |

### 22.1. Regras

`nicht`:

- nega ação, adjetivo ou frase inteira;
- exemplos: `Ich verstehe nicht.`, `Das ist nicht teuer.`.

`kein`:

- nega substantivo;
- exemplos: `Ich habe kein Auto.`, `Ich habe keine Zeit.`.

Regra prática:

- negar existência ou posse de coisa → `kein`;
- negar o que alguém faz ou uma qualidade → `nicht`.

### 22.2. Exercícios

1. `Ich verstehe ___.` → `nicht`.
2. `Ich habe ___ Auto.` → `kein`.
3. `Ich habe ___ Zeit.` → `keine`.
4. `Das ist ___ teuer.` → `nicht`.
5. “Isso não é um problema.” → `Das ist kein Problem.`
6. `kein` nega uma ação → falso.
7. Frase correta → `Ich habe kein Auto.`
8. “Eu não trabalho hoje.” → `Ich arbeite heute nicht.`

## 23. Tela 16 — Aula 9: Acusativo

| Campo | Conteúdo |
|---|---|
| ID | `accusative` |
| Duração | 22 min |
| Foco | Quem faz · o que recebe |
| Objetivos | Diferenciar sujeito e objeto; reconhecer `der → den`; usar `ein → einen` no masculino |
| Exercícios | 6 |

### 23.1. Regras

- nominativo: quem realiza a ação;
- acusativo: objeto direto que recebe a ação.

| Gênero/número | Nominativo | Acusativo |
|---|---|---|
| masculino | `der` | `den` |
| feminino | `die` | `die` |
| neutro | `das` | `das` |
| plural | `die` | `die` |

Com artigo indefinido:

| Gênero | Nominativo | Acusativo |
|---|---|---|
| masculino | `ein` | `einen` |
| feminino | `eine` | `eine` |
| neutro | `ein` | `ein` |

Exemplos:

- `Der Mann ist hier.`;
- `Ich sehe den Mann.`;
- `Ich kaufe einen Kaffee.`;
- `Ich habe einen Termin.`;
- `Ich brauche einen Arzt.`;
- `Ich kaufe das Brot.`;
- `Ich sehe die Frau.`.

### 23.2. Exercícios

1. `Ich sehe ___ Mann.` → `den`.
2. `Ich kaufe ___ Kaffee.` → `einen`.
3. `Ich sehe ___ Frau.` → `die`.
4. `Ich kaufe ___ Brot.` → `das`.
5. `Ich habe ___ Termin.` → `einen`.
6. “Eu preciso de um médico.” → `Ich brauche einen Arzt.`

## 24. Tela 17 — Aula 10: Verbos modais e alemão da vida real

| Campo | Conteúdo |
|---|---|
| ID | `modals-real-life` |
| Duração | 28 min |
| Foco | Se virar na Alemanha |
| Objetivos | Usar `können`, `müssen`, `wollen`, `möchten` e `dürfen`; construir frases com dois verbos; resolver situações práticas |
| Exercícios | 6 |

### 24.1. Regras

| Verbo | Ideia | Primeira pessoa |
|---|---|---|
| `können` | poder/conseguir | `ich kann` |
| `müssen` | precisar/ter que | `ich muss` |
| `wollen` | querer | `ich will` |
| `möchten` | gostaria | `ich möchte` |
| `dürfen` | poder/ter permissão | `ich darf` |

Com dois verbos:

- o modal conjugado fica na posição 2;
- o infinitivo vai para o final;
- exemplo: `Ich kann Deutsch sprechen.`.

### 24.2. Frases e situações

Frases principais:

- `Ich kann Deutsch sprechen.`;
- `Ich muss arbeiten.`;
- `Ich möchte einen Kaffee.`;
- `Ich will nach Hause gehen.`;
- `Darf ich hier sitzen?`;
- `Kann ich mit Karte bezahlen?`;
- `Können Sie mir helfen?`.

Supermercado:

- `Wo finde ich ...?`;
- `Wie viel kostet das?`;
- `Kann ich mit Karte bezahlen?`;
- `Brauchen Sie eine Tüte?`.

Restaurante:

- `Ich möchte ...`;
- `Die Rechnung, bitte.`;
- `Ein Wasser, bitte.`;
- `Ich hätte gerne ...`.

Transporte:

- `Wo ist der Bahnhof?`;
- `Wann kommt der Zug?`;
- `Fährt dieser Zug nach Stuttgart?`;
- `Welches Gleis?`.

Trabalho:

- `Guten Morgen.`;
- `Ich habe eine Frage.`;
- `Können Sie mir helfen?`;
- `Können Sie das bitte wiederholen?`.

Mini diálogo:

- A: `Guten Morgen!`
- B: `Guten Morgen!`
- A: `Sprechen Sie Englisch?`
- B: `Ja, ein bisschen.`

Apresentação pessoal:

- `Ich heiße Leonardo.`;
- `Ich komme aus Brasilien.`;
- `Ich wohne in Stuttgart.`;
- `Ich arbeite bei Bosch.`;
- `Ich lerne Deutsch.`

### 24.3. Exercícios

1. `Ich ___ Deutsch sprechen.` → `kann`.
2. `Ich ___ arbeiten.` → `muss`.
3. Pedido mais educado → `Ich möchte einen Kaffee.`
4. Ordenação → `Ich kann mit Karte bezahlen`.
5. “Você pode me ajudar?” formal → `Können Sie mir helfen?`
6. Em `Ich muss arbeiten`, o infinitivo fica no final → verdadeiro.

## 25. Tela 18 — Prática de `sein` (`exercises`)

### 25.1. Finalidade

Praticar o verbo `sein` em duas modalidades independentes:

1. completar as formas de conjugação;
2. traduzir frases curtas para alemão.

### 25.2. Cabeçalho funcional

Exibe:

- título da prática: Ser ou estar;
- significado: `ser · estar`;
- indicação de presente;
- quantidade de desafios do modo ativo;
- aviso de que o usuário pode praticar sem pressa;
- abas de modo: Conjugação e Frases.

### 25.3. Modo Conjugação

- 8 itens;
- o enunciado aparece em português;
- o usuário escreve a forma alemã completa;
- cada item informa pessoa e número;
- a conferência acontece em lote;
- o resultado mostra acertos e percentual.

Formas esperadas:

| Enunciado | Resposta |
|---|---|
| Eu sou | `ich bin` |
| Você é | `du bist` |
| Ele é | `er ist` |
| Ela é | `sie ist` |
| Isso é | `es ist` |
| Nós somos | `wir sind` |
| Vocês são | `ihr seid` |
| Eles são / Você é formal | `sie sind` / `Sie sind` |

### 25.4. Modo Frases

- exatamente 50 frases A1;
- uma frase por vez;
- ordem embaralhada a cada nova sessão;
- cada frase tem prompt em português, dica, placeholder e resposta aceita;
- a resposta correta avança para a próxima;
- resposta errada mostra comparação entre o que foi escrito e a forma correta;
- erro zera a sequência;
- acerto incrementa a sequência;
- a régua de sequência mostra no máximo 10 segmentos visíveis, mas o número textual pode continuar acima de 10;
- ao completar a 50ª frase, a tela mostra conclusão e sequência final;
- é possível reiniciar todas as frases;
- resposta vazia não é conferida.

Conteúdo representativo das frases: estados, localização, idade, origem, trabalho, estudos, família, clima, rotina, necessidades, negação e situações simples com `sein`.

## 26. Tela 19 — Prática de `haben` (`exercises-haben`)

### 26.1. Finalidade

Praticar o verbo `haben` em duas modalidades:

1. completar as formas de conjugação;
2. traduzir frases curtas para alemão.

### 26.2. Cabeçalho funcional

Exibe:

- título da prática: Conjugação de haben;
- significado: `ter`;
- indicação de presente;
- quantidade de desafios do modo ativo;
- abas de Conjugação e Frases.

### 26.3. Modo Conjugação

- 8 itens;
- resposta completa em alemão;
- correção em lote;
- resultado com quantidade de acertos, percentual e mensagem.

Formas esperadas:

| Enunciado | Resposta |
|---|---|
| Eu tenho | `ich habe` |
| Você tem | `du hast` |
| Ele tem | `er hat` |
| Ela tem | `sie hat` |
| Isso tem | `es hat` |
| Nós temos | `wir haben` |
| Vocês têm | `ihr habt` |
| Eles têm / Você tem formal | `sie haben` / `Sie haben` |

### 26.4. Modo Frases

- exatamente 50 frases A1;
- uma frase por vez;
- ordem embaralhada a cada nova sessão;
- resposta correta avança;
- resposta errada permite tentar novamente;
- acerto incrementa a sequência;
- erro zera a sequência;
- a prática termina após a 50ª frase;
- é possível reiniciar a sequência;
- resposta vazia não é conferida.

### 26.5. Tela de estudo e prática de `lernen`, `machen` e `spielen`

- Cada verbo apresenta a conjugação no presente e exemplos em português e inglês.
- Um botão em cada cartão abre uma janela modal independente com usos comuns e frases-modelo traduzidas. O conteúdo tem rolagem própria; a janela fecha pelo botão, por `Escape` ou ao clicar fora dela.
- O modo Conjugação mantém as 20 questões guiadas existentes, em sequência fixa e com feedback imediato.
- O modo Treino de frases apresenta 75 traduções curtas, com exatamente 25 frases por verbo.
- As 75 frases são embaralhadas a cada nova sessão e aparecem uma por vez, com tentativa novamente, sequência de acertos e conclusão ao final.
- O treino inclui vocabulário cotidiano simples e aceita a normalização alemã já usada nas outras práticas.

Conteúdo representativo das frases: tempo, objetos, família, animais, alimentação, dinheiro, trabalho, compromissos, férias, sorte, posse e negação com `haben`.

## 27. Regras dos exercícios das aulas

### 27.1. Múltipla escolha e verdadeiro/falso

- o usuário seleciona uma opção;
- somente uma opção pode ficar selecionada por exercício;
- selecionar nova opção remove o estado anterior de correção;
- a resposta é considerada somente ao clicar em conferir;
- os valores internos permanecem nos termos alemães/portugueses originais mesmo quando o rótulo é localizado.

### 27.2. Completar e traduzir

- o usuário escreve em um campo de texto;
- espaços nas extremidades são removidos;
- o campo não usa autocomplete;
- o campo não usa spellcheck;
- campo vazio gera toast e não registra resposta.

### 27.3. Ordenação

- as palavras ficam em um banco de palavras;
- clicar em uma palavra move-a para a área da resposta;
- clicar novamente move-a de volta;
- há ação para limpar a ordenação;
- a resposta é comparada na mesma ordem esperada;
- campo vazio ou ordem incompleta não é considerada correta.

### 27.4. Normalização de respostas alemãs

Para exercícios de texto e prática verbal, a comparação:

- ignora diferença entre maiúsculas e minúsculas;
- remove pontuação final simples;
- normaliza espaços repetidos;
- aceita `ä` como `a`;
- aceita `ö` como `o`;
- aceita `ü` como `u`;
- aceita `ß` como `ss`.

Exemplos aceitos como equivalentes:

- `glücklich` e `glucklich`;
- `schön` e `schon`;
- `für` e `fur`;
- `Straße` e `Strasse`.

### 27.5. Feedback

- acerto recebe estado positivo e explicação;
- erro recebe estado negativo e orientação para tentar novamente;
- a explicação pode ser aberta separadamente;
- ao abrir a explicação, a resposta esperada também é exibida;
- a mesma resposta já conferida não é registrada novamente como nova tentativa se não tiver mudado.

## 28. Modelo de estado funcional

O estado em memória da aplicação inclui:

| Estado | Uso |
|---|---|
| `route` | Tela atual |
| `activeLessonId` | Aula aberta |
| `sessions` | Respostas temporárias dos exercícios de aula |
| `reviewSession` | Respostas temporárias da revisão |
| `reviewQuestions` | Seleção atual da revisão |
| `exerciseModes` | Modo escolhido de `sein` e `haben` |
| `verbSessions` | Sessões temporárias dos exercícios verbais |
| `sidebarSections` | Estado aberto/recolhido dos grupos laterais |

Esse estado não é uma conta de usuário e não é sincronizado entre dispositivos.

## 29. Fluxos principais

### 29.1. Fluxo de início

1. O navegador abre `index.html`.
2. O sistema carrega progresso e idioma do `localStorage`.
3. A rota inicial é `dashboard`.
4. O dashboard é renderizado com os dados atuais.

### 29.2. Fluxo de estudo de uma aula

1. Usuário abre uma aula pelo menu, dashboard ou botão de continuidade.
2. A aula apresenta objetivos, conteúdo e vocabulário.
3. Usuário responde exercícios.
4. Usuário confere cada resposta.
5. O sistema mostra feedback e atualiza o resultado parcial.
6. Usuário pode consultar explicações.
7. Usuário pode navegar para aula anterior/próxima.
8. Usuário pode marcar a aula como concluída.

### 29.3. Fluxo de revisão

1. Usuário abre Revisar.
2. O sistema verifica aulas concluídas.
3. Sem aulas concluídas, mostra estado vazio.
4. Com aulas concluídas, sorteia até 6 exercícios.
5. Usuário responde e recebe feedback.
6. O resultado parcial é atualizado.
7. Usuário pode gerar nova seleção.

### 29.4. Fluxo de prática verbal

1. Usuário abre uma prática de `sein`, `haben` ou a seção de `lernen`, `machen` e `spielen`.
2. Usuário escolhe uma modalidade de exercício. A tela de primeiros verbos também oferece blocos expansíveis com os usos e exemplos de cada verbo.
3. No modo Conjugação de `sein` ou `haben`, responde todos os 8 itens e confere em lote; na seção de primeiros verbos, mantém as 20 questões guiadas existentes.
4. Nos modos de frases, responde uma frase por vez; a seção de primeiros verbos embaralha 75 traduções, com 25 para cada verbo.
5. Acertos e erros atualizam a sequência.
6. A última frase leva ao estado de conclusão.

## 30. Conteúdo localizado e contratos de dados

Os conteúdos possuem campos em português e, quando aplicável, campos ingleses correspondentes:

- aulas: título, descrição, foco, introdução, objetivos, resumo;
- seções: título, lead, texto, caption, cabeçalhos, linhas, segmentos;
- itens: título, pronúncia, tradução, descrição, exemplos e observações;
- cenários: título e frases;
- exercícios: enunciado, opções, explicação e resposta;
- prática verbal: título, subtítulo, significado, instrução, prompt, dica, placeholder e respostas; o módulo de primeiros verbos também contém usos, exemplos e traduções bilíngues.

Os testes do projeto verificam que os conteúdos bilíngues necessários existem para as 10 aulas e para as práticas verbais.

## 31. Dependências funcionais externas

- `lucide` é carregado por CDN para ícones funcionais da interface;
- Web Speech API é fornecida pelo navegador;
- `localStorage` é fornecido pelo navegador;
- se CDN, voz ou armazenamento falharem, a aplicação tenta continuar utilizável e registra aviso ou exibe feedback apropriado.

## 32. Limitações e lacunas atuais

- não há login ou identificação de usuário;
- não há sincronização entre dispositivos;
- não há painel administrativo para editar aulas;
- não há CMS ou banco de conteúdo;
- não há histórico detalhado de sessões por data;
- o gráfico de ritmo de estudo não representa dados reais de cada dia;
- a prática específica de `sein` e `haben` não alimenta o progresso principal;
- a conclusão da aula não depende de atingir uma nota mínima;
- não há mecanismo de bloqueio ou pré-requisito entre aulas;
- não há roteamento persistente por URL ou deep link;
- a disponibilidade e a qualidade do áudio dependem do dispositivo;
- o reset de progresso é irreversível dentro da aplicação.

## 33. Critérios de aceite funcionais

Uma implementação compatível deve atender aos critérios abaixo:

- abrir o dashboard sem autenticação;
- trocar entre português e inglês e manter a escolha após recarregar;
- acessar todas as 5 telas de vocabulário;
- acessar as 10 aulas;
- exibir objetivos, seções, vocabulário, exercícios, resumo e conclusão em cada aula;
- permitir múltipla escolha, texto, ordenação, tradução e verdadeiro/falso;
- mostrar feedback e explicação após a conferência;
- aceitar respostas sem diacríticos nas regras definidas;
- persistir aulas concluídas e pontuação no navegador;
- mostrar a próxima aula não concluída no dashboard;
- gerar revisão somente a partir de aulas concluídas;
- limitar a revisão a 6 perguntas;
- praticar 8 formas de conjugação de `sein` e 8 de `haben`;
- oferecer 50 frases para `sein` e 50 para `haben`;
- embaralhar as frases a cada nova sessão;
- incrementar e zerar o streak conforme acerto ou erro;
- permitir reset com confirmação;
- usar áudio alemão quando o navegador oferecer suporte;
- manter a aplicação utilizável quando o áudio não estiver disponível.

## 34. Arquivos de referência da implementação

- [index.html](<C:/Users/VLI5CA/Desktop/easy german/index.html>) — shell, navegação global e carregamento dos módulos.
- [js/app.js](<C:/Users/VLI5CA/Desktop/easy german/js/app.js>) — rotas, renderização, vocabulário, eventos e estado da aplicação.
- [js/lessons.js](<C:/Users/VLI5CA/Desktop/easy german/js/lessons.js>) — conteúdo das 10 aulas e traduções.
- [js/exercises.js](<C:/Users/VLI5CA/Desktop/easy german/js/exercises.js>) — tipos, renderização e correção dos exercícios.
- [js/verb-exercises.js](<C:/Users/VLI5CA/Desktop/easy german/js/verb-exercises.js>) — dados de `sein` e `haben`.
- [js/storage.js](<C:/Users/VLI5CA/Desktop/easy german/js/storage.js>) — progresso, pontuação, conquistas e reset.
- [js/speech.js](<C:/Users/VLI5CA/Desktop/easy german/js/speech.js>) — reprodução de áudio alemão.
- [js/i18n.js](<C:/Users/VLI5CA/Desktop/easy german/js/i18n.js>) — português, inglês e localização dinâmica.
- [tests/site-integration.test.js](<C:/Users/VLI5CA/Desktop/easy german/tests/site-integration.test.js>) — integração estática.
- [tests/content-localization.test.js](<C:/Users/VLI5CA/Desktop/easy german/tests/content-localization.test.js>) — cobertura de conteúdo bilíngue.
- [tests/verb-practice.test.js](<C:/Users/VLI5CA/Desktop/easy german/tests/verb-practice.test.js>) — regras da prática verbal.
- [tests/i18n.test.js](<C:/Users/VLI5CA/Desktop/easy german/tests/i18n.test.js>) — comportamento de idioma e persistência.
