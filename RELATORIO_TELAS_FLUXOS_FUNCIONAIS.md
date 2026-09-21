# Relatório funcional da plataforma KlarDeutsch

## 1. Escopo e critério de leitura

Este relatório descreve exclusivamente telas, rotas lógicas, fluxos funcionais, regras, estados de interface, conteúdo e dependências observadas no workspace. Não cobre identidade visual, layout detalhado ou decisões de design.

As evidências foram lidas em `index.html`, `js/app.js`, `js/lessons.js`, `js/exercises.js`, `js/verb-exercises.js`, `js/storage.js`, `js/i18n.js`, `js/speech.js`, `README.md` e nos testes em `tests/`.

- **Fato observado:** comportamento diretamente implementado nos arquivos.
- **Inferência:** conclusão derivada da implementação, mas não declarada explicitamente como requisito de produto.
- **Lacuna:** comportamento não implementado ou não verificável no código disponível.

Não foram alterados arquivos de código nem conteúdo da aplicação. O único arquivo criado é este relatório.

## 2. Visão geral da plataforma

### 2.1 Objetivo funcional

**Fato observado:** KlarDeutsch é um curso introdutório de alemão A1 para falantes de português, com aulas guiadas, vocabulário, exercícios, áudio de pronúncia e acompanhamento local de progresso (`README.md:11-22`).

### 2.2 Arquitetura funcional

**Fato observado:** a aplicação é uma página estática composta por HTML semântico, CSS e JavaScript vanilla. Não há manifestos de dependência, backend, banco remoto, autenticação, contas, build pipeline ou instalação obrigatória (`README.md:54-75`).

**Fato observado:** `index.html` contém o shell permanente da aplicação e o conteúdo de cada tela é renderizado dentro de `#app-view` (`index.html:16-169`; `js/app.js:137-145`).

**Fato observado:** os scripts são carregados em ordem de dependência: armazenamento, internacionalização, áudio, conteúdo das aulas, ícones, exercícios, prática verbal e aplicação (`index.html:175-183`).

**Fato observado:** a navegação é uma máquina de estado interna baseada em `ui.route` e `ui.activeLessonId` (`js/app.js:10-18`). Não foi encontrado uso de URL, hash, History API, `pushState`, `replaceState` ou `popstate`.

**Inferência:** as telas não são URLs independentes. São estados de uma única página e não devem ser tratadas como rotas server-side.

### 2.3 Dependências funcionais

| Dependência | Uso | Evidência |
|---|---|---|
| `localStorage` | Idioma e progresso | `js/i18n.js:4-5,612-653`; `js/storage.js:4,18-36` |
| Web Speech API | Leitura de palavras e frases em alemão | `js/speech.js:4-17` |
| Lucide via CDN | Ícones renderizados no shell e nas telas | `index.html:180`; `js/icons.js` |
| Conteúdo estático JS | Aulas, vocabulário, perguntas e respostas | `js/lessons.js`; `js/app.js:21-133`; `js/verb-exercises.js` |
| Navegador | Execução, armazenamento, fala e eventos | `README.md:54-75` |

**Lacuna:** embora a documentação descreva a plataforma como offline-friendly, a biblioteca Lucide é carregada de `https://unpkg.com/...`; se ela não estiver disponível, os ícones podem não ser renderizados. O conteúdo e a lógica principal continuam empacotados localmente.

## 3. Regras gerais do projeto

### 3.1 Idioma

**Fato observado:** existem somente dois idiomas suportados: português (`pt`) e inglês (`en`) (`js/i18n.js:4-6`). O idioma inicial é português quando não existe valor válido salvo (`js/i18n.js:615-620`).

**Fato observado:** ao trocar o idioma, a aplicação:

1. valida se o idioma está em `['pt', 'en']`;
2. salva o valor em `klar-deutsch-language-v1`;
3. atualiza `document.documentElement.lang`;
4. notifica os listeners;
5. re-renderiza a aplicação por meio da inscrição feita em `js/app.js:1037-1039`.

**Fato observado:** textos estáticos usam `data-i18n`, `data-i18n-content`, `data-i18n-aria-label`, `data-i18n-title` e `data-i18n-placeholder` (`js/i18n.js:680-701`). Conteúdo de aulas e exercícios possui campos bilíngues validados pelos testes (`tests/content-localization.test.js:20-62`).

**Regra:** não há seletor para alemão como idioma de interface. Alemão é conteúdo de aprendizagem, não idioma de navegação.

### 3.2 Progresso

**Fato observado:** o progresso é salvo em `klar-deutsch-progress-v1` com esta estrutura inicial (`js/storage.js:4-15`):

- `completedLessons`: IDs das aulas concluídas;
- `lessonScores`: respostas e pontuação por aula;
- `totalAnswered` e `totalCorrect`;
- `achievements`;
- `lastLessonId`;
- `startedAt`.

**Fato observado:** completar uma aula adiciona seu ID apenas uma vez, atualiza `lastLessonId` e recalcula conquistas (`js/storage.js:49-55`).

**Fato observado:** as conquistas são determinadas pelo número de aulas concluídas:

- 1 aula: `first-step`;
- 5 aulas: `guten-tag`;
- 10 aulas: `a1-starter` (`js/storage.js:39-46`).

**Fato observado:** cada resposta corrigida incrementa o total global, registra se está correta e atualiza a pontuação da aula (`js/storage.js:57-72`). Uma nova tentativa do mesmo exercício substitui o registro daquele exercício dentro da pontuação da aula, mas o contador global de respostas continua incrementando.

**Fato observado:** o progresso persiste no navegador; sessões temporárias de respostas, revisão e prática verbal ficam apenas em memória de JavaScript (`js/app.js:10-18,194-251`).

**Inferência:** ao recarregar a página, o progresso concluído permanece, mas respostas parcialmente preenchidas, ordem atual das frases e estado visual dos exercícios são perdidos.

### 3.3 Conclusão de aula

**Fato observado:** o botão de concluir chama `storage.markLessonComplete` e não verifica se todos os exercícios foram respondidos (`js/app.js:758-766`).

**Regra funcional efetiva:** o usuário pode marcar uma aula como concluída mesmo sem responder todos os exercícios.

**Fato observado:** depois de concluída, a aula aparece como completa, sua porcentagem é 100% e o botão de conclusão fica desabilitado (`js/app.js:175-187,373-387`). O usuário ainda pode navegar e refazer os exercícios.

### 3.4 Correção de respostas

**Fato observado:** há cinco tipos de exercício: múltipla escolha, completar, ordenar palavras, tradução e verdadeiro/falso (`js/exercises.js:6-12,79-95`).

**Fato observado:** respostas textuais são normalizadas removendo espaços periféricos, ignorando maiúsculas/minúsculas, removendo pontuação final e aceitando `ä/ö/ü/ß` também como `a/o/u/ss` (`js/exercises.js:34-57`).

**Fato observado:** não responder gera toast e não registra tentativa; verificar exatamente a mesma resposta novamente gera toast de resposta duplicada (`js/app.js:650-670`).

**Fato observado:** respostas corretas exibem feedback positivo; respostas incorretas exibem feedback negativo e permitem abrir a explicação (`js/app.js:672-716`).

### 3.5 Áudio

**Fato observado:** todos os controles de áudio chamam `speakGerman`, que cancela a fala anterior, usa `SpeechSynthesisUtterance`, define `de-DE`, velocidade `0.82` e pitch `1` (`js/speech.js:4-14`).

**Fato observado:** se `speechSynthesis` ou `SpeechSynthesisUtterance` não existir, o controle retorna `false` e a aplicação mostra o toast de áudio indisponível (`js/app.js:849-853`).

### 3.6 Permissões

**Fato observado:** não há login, cadastro, papéis, permissões, ACL, conteúdo protegido, perfil ou separação entre administrador e aluno.

**Regra:** qualquer visitante do navegador possui o mesmo acesso a todas as telas e conteúdos.

**Inferência:** “permissão” na plataforma significa apenas disponibilidade da função no cliente; não existe controle de autorização no servidor.

## 4. Shell comum a todas as telas

### Tela comum — estrutura permanente

**O que existe:**

- sidebar com marca KlarDeutsch;
- seletor PT/EN;
- progresso geral do curso;
- navegação para Visão geral e Revisar;
- grupos recolhíveis de Vocabulário, Aulas e Exercícios;
- botão de reset do progresso;
- breadcrumb no topbar;
- botão de menu para viewport móvel;
- área dinâmica `#app-view`;
- região de toast com `aria-live="polite"` (`index.html:16-173`).

**Componentes funcionais:**

- seções laterais podem abrir/fechar (`js/app.js:841-847`);
- sidebar fecha pelo overlay, botão ou tecla `Escape` (`js/app.js:802-817,938-940`);
- em largura até 800px, a sidebar funciona como painel móvel (`js/app.js:143-145,931-936`);
- o foco é movido para a área principal após a renderização (`js/app.js:819-833`);
- breadcrumb muda conforme a rota (`js/app.js:311-325`).

**Estados:**

- progresso 0%, parcial ou 100%;
- badge de Revisar igual ao número de aulas concluídas;
- seções expandidas ou recolhidas;
- sidebar aberta ou fechada;
- toast presente temporariamente ou ausente.

## 5. Inventário completo de telas e rotas lógicas

> O projeto tem 19 telas lógicas: 1 dashboard, 1 revisão, 5 telas de vocabulário, 10 telas de aula e 2 telas de prática verbal. As 10 telas de aula usam o mesmo `ui.route = 'lesson'` com `ui.activeLessonId` diferente.

### Tela 1 — Visão geral

- **Rota lógica:** `dashboard`.
- **Entrada:** inicialização da aplicação ou reset geral (`js/app.js:11,776-785,819-833`).
- **Conteúdo visível:** hero do curso, cópia introdutória, progresso geral, aulas concluídas, total do caminho, exercícios respondidos, acurácia, próxima aula, caminho completo das 10 aulas, conquistas e ritmo semanal (`js/app.js:327-347`).
- **Ações:** abrir a próxima aula, abrir qualquer aula do caminho, ir para Revisar.
- **Regra da próxima aula:** primeira aula cujo ID não aparece em `completedLessons`; se todas estiverem concluídas, usa a última aula (`js/app.js:190-192`).
- **Estados:** 0% inicial; progresso parcial; caminho completo; cards de aulas não iniciadas, em andamento ou concluídas (`js/app.js:175-187,354-369`).
- **Dependências:** `KlarStorage`, `KlarLessons`, i18n e ícones.

### Tela 2 — Revisar

- **Rota lógica:** `review`.
- **Entrada:** item Revisar da sidebar ou botão “Revisar aulas concluídas” do dashboard (`index.html:74-80`; `js/app.js:345,857-858`).
- **Estado vazio:** antes da primeira aula concluída, mostra mensagem explicando que a revisão será criada depois da primeira aula e botão para iniciar a primeira aula (`js/app.js:509-515`).
- **Estado populado:** seleciona aleatoriamente até 6 exercícios pertencentes exclusivamente a aulas concluídas (`js/app.js:499-506,517`).
- **Conteúdo:** hero de revisão, quantidade de perguntas, quantidade de aulas disponíveis, lista de exercícios, resultado e botão de voltar ao dashboard.
- **Ações:** responder e verificar, abrir explicações, gerar nova seleção, voltar ao dashboard.
- **Regra:** ao abrir a tela, a seleção é reconstruída; o texto da interface informa que as perguntas são escolhidas novamente ao abrir (`js/app.js:510-517`).
- **Persistência:** respostas da revisão incrementam os totais globais, mas não gravam score de uma aula (`js/app.js:628-638,664-670`; `js/storage.js:87-92`).
- **Resultado:** percentual da sessão; a partir de 80% exibe mensagem de boa memória, abaixo disso exibe mensagem de construção da base (`js/app.js:521-526`).

### Tela 3 — Vocabulário: Palavras

- **Rota lógica:** `vocabulary-words`.
- **Conteúdo:** lista de palavras alemãs com tradução; cada card tem botão de áudio (`js/app.js:448-472`).
- **Fonte:** `vocabulary.words` em `js/app.js:21-87`.
- **Ações:** ouvir cada palavra; navegar pelas abas do vocabulário.
- **Estado:** lista estática sempre preenchida; não há estado vazio, loading ou erro próprio.

### Tela 4 — Vocabulário: Frases

- **Rota lógica:** `vocabulary-phrases`.
- **Conteúdo:** frases completas em alemão, tradução e áudio (`js/app.js:469-472`).
- **Fonte:** `vocabulary.phrases` em `js/app.js:88-117`.
- **Temas observados:** saudações, apresentação pessoal, origem, moradia, hobbies, estado civil, profissão e perguntas básicas.
- **Ações:** ouvir frase e trocar de aba.
- **Estado:** lista estática sempre preenchida; não há estado vazio, loading ou erro próprio.

### Tela 5 — Vocabulário: Números

- **Rota lógica:** `vocabulary-numbers`.
- **Conteúdo:** números de 1 a 20, cards com áudio e três blocos de regra: 20–100, 100–1.000 e 1.000–1.000.000 (`js/app.js:473-479`).
- **Regras ensinadas:** unidade antes da dezena com `und`, formação de centenas com `hundert`, milhares com `tausend` e `eine Million` para um milhão.
- **Ações:** ouvir números e trocar de aba.
- **Estado:** conteúdo estático preenchido; não há loading, erro ou vazio específico.

### Tela 6 — Vocabulário: Dias da semana

- **Rota lógica:** `vocabulary-weekdays`.
- **Conteúdo:** sete dias, tradução, uso com `am` e exemplo de rotina (`js/app.js:480-481`; `js/app.js:124-127`).
- **Ações:** ouvir cada dia e trocar de aba.
- **Regra de conteúdo:** usa `am + dia`, por exemplo `am Montag`.

### Tela 7 — Vocabulário: Meses do ano

- **Rota lógica:** `vocabulary-months`.
- **Conteúdo:** doze meses, tradução, uso com `im` e exemplo de data/aniversário (`js/app.js:482-483`; `js/app.js:128-132`).
- **Ações:** ouvir cada mês e trocar de aba.
- **Regra de conteúdo:** usa `im + mês`, por exemplo `im Januar`.

### Regras comuns das cinco telas de vocabulário

**Fato observado:** todas exibem hero contextual, abas com contadores, título, descrição e conteúdo específico (`js/app.js:448-487`).

**Fato observado:** as abas são botões com `role="tab"`, `aria-selected` e `data-route`; trocar a aba apenas altera `ui.route`, re-renderiza e rola para o topo (`js/app.js:461-487,857-858`).

**Lacuna:** não existe marcação de vocabulário visto, progresso de vocabulário, exercícios próprios ou persistência de áudio.

## 6. Telas de aula

### Estrutura funcional comum às 10 aulas

Cada tela usa a mesma renderização `renderLesson` (`js/app.js:373-389`) e apresenta, nesta ordem funcional:

1. cabeçalho com número, foco, título e descrição;
2. duração, quantidade de exercícios e status;
3. percentual e quantidade de exercícios verificados;
4. objetivos da aula;
5. seções didáticas específicas da aula;
6. vocabulário da aula com áudio;
7. exercícios interativos;
8. card de resultado;
9. resumo dos pontos principais;
10. botões de aula anterior, próxima aula e concluir.

**Fato observado:** os tipos de seção didática implementados são `soundGrid`, `table`, `examples`, `rule`, `callout`, `compare`, `scenario` e `dialogue` (`js/app.js:391-419`).

**Ações comuns:** ouvir exemplos, responder exercícios, verificar, abrir explicação, limpar ordenação, tentar novamente, navegar anterior/próxima e concluir aula.

**Estados comuns:** não iniciada, em andamento, concluída, exercício sem resposta, correto, incorreto, resultado vazio, resultado parcial e resultado completo.

**Regra de navegação:** anterior/próxima usa a posição do item em `lessons`; os botões ficam desabilitados no primeiro e no último item (`js/app.js:743-756,380-387`).

### Tela 8 — Aula 01: Pronúncia e leitura

- **ID/rota:** `lesson` + `pronunciation`.
- **Duração/foco:** 18 min; ouvir e reconhecer (`js/lessons.js:6-8`).
- **Conteúdo:** quatro sons especiais `ä`, `ö`, `ü`, `ß`; tabelas de combinações consonantais e vogais; exemplos para ler, ouvir e repetir (`js/lessons.js:12-32`).
- **Exercícios:** 4; múltipla escolha e tradução (`js/lessons.js:35-38`).
- **Regra funcional:** os exemplos e tabelas podem ter botão de áudio; respostas são verificadas pelo motor compartilhado.

### Tela 9 — Aula 02: Pronomes pessoais

- **ID/rota:** `lesson` + `pronouns`.
- **Duração/foco:** 20 min; falar sobre pessoas (`js/lessons.js:42-44`).
- **Conteúdo:** mapa de pronomes, distinção de `sie`/`Sie`, bloco de atenção e frases de apresentação (`js/lessons.js:48-62`).
- **Exercícios:** 4; múltipla escolha, preenchimento e tradução (`js/lessons.js:64-67`).
- **Regra de conteúdo:** a capitalização de `Sie` é ensinada como pista do tratamento formal.

### Tela 10 — Aula 03: Sein e haben

- **ID/rota:** `lesson` + `sein-haben`.
- **Duração/foco:** 24 min; `bin`, `bist`, `habe` (`js/lessons.js:71-73`).
- **Conteúdo:** tabelas de conjugação de `sein` e `haben`, frases de uso e callout comparando a irregularidade dos verbos (`js/lessons.js:77-88`).
- **Exercícios:** 10 (`js/lessons.js:97-106`).
- **Regra de conteúdo:** `sein` usa formas irregulares; `haben` mantém `hab-` em grande parte, com `hast` e `hat` no singular.

### Tela 11 — Aula 04: Estrutura básica das frases

- **ID/rota:** `lesson` + `sentence-structure`.
- **Duração/foco:** 20 min; verbo na posição 2 (`js/lessons.js:110-112`).
- **Conteúdo:** regra visual de posição 1/verbo/resto, exemplos com sujeito primeiro, exemplos com outro bloco primeiro e callout sobre “segundo elemento” (`js/lessons.js:116-123`).
- **Exercícios:** 4; ordenação, múltipla escolha e verdadeiro/falso (`js/lessons.js:132-135`).
- **Regra de conteúdo:** o verbo é o segundo elemento, não necessariamente a segunda palavra.

### Tela 12 — Aula 05: Perguntas em alemão

- **ID/rota:** `lesson` + `questions`.
- **Duração/foco:** 21 min; perguntar e entender (`js/lessons.js:139-141`).
- **Conteúdo:** palavras interrogativas, perguntas úteis e cenários para pedir ajuda e pagar (`js/lessons.js:145-153`).
- **Exercícios:** 4; múltipla escolha e tradução (`js/lessons.js:163-166`).
- **Conteúdo prático:** estação, ajuda formal, inglês, preços e pagamento com cartão.

### Tela 13 — Aula 06: Verbos no presente

- **ID/rota:** `lesson` + `present-verbs`.
- **Duração/foco:** 24 min; ações do dia a dia (`js/lessons.js:170-172`).
- **Conteúdo:** `machen` como modelo, tabela de terminações regulares, verbos da primeira semana e observação sobre `-t/-d` (`js/lessons.js:176-183`).
- **Exercícios:** 5; preenchimento, múltipla escolha e tradução (`js/lessons.js:192-196`).
- **Regra de conteúdo:** `ich -e`, `du -st`, `er/sie/es -t`, `wir/sie/Sie -en`, `ihr -t`.

### Tela 14 — Aula 07: Artigos e gênero

- **ID/rota:** `lesson` + `articles`.
- **Duração/foco:** 22 min; `der`, `die`, `das` (`js/lessons.js:200-202`).
- **Conteúdo:** tabela de artigos definidos, vocabulário agrupado por gênero, tabela `ein/eine` e regra de memorizar artigo com substantivo (`js/lessons.js:206-217`).
- **Exercícios:** 5; múltipla escolha e tradução (`js/lessons.js:226-230`).
- **Regra de conteúdo:** `die` serve para feminino e plural; `ein` acompanha masculino/neutro; `eine` acompanha feminino.

### Tela 15 — Aula 08: Negação

- **ID/rota:** `lesson` + `negation`.
- **Duração/foco:** 19 min; dizer “não” (`js/lessons.js:234-236`).
- **Conteúdo:** comparação `nicht × kein`, exemplos em contexto e aproximação inicial segura (`js/lessons.js:240-247`).
- **Exercícios:** 8; múltipla escolha, preenchimento, tradução e verdadeiro/falso (`js/lessons.js:256-263`).
- **Regra de conteúdo:** `nicht` nega ação/adjetivo/frase; `kein/keine` nega substantivo.

### Tela 16 — Aula 09: Acusativo

- **ID/rota:** `lesson` + `accusative`.
- **Duração/foco:** 22 min; quem faz e o que recebe (`js/lessons.js:267-269`).
- **Conteúdo:** sujeito e objeto direto, tabela nominativo/acusativo, tabela de artigos indefinidos, frases reais e callout sobre a mudança masculina (`js/lessons.js:273-283`).
- **Exercícios:** 6; múltipla escolha, preenchimento e tradução (`js/lessons.js:292-297`).
- **Regra de conteúdo:** no masculino direto, `der → den` e `ein → einen`; `die` e `das` permanecem iguais nesta introdução.

### Tela 17 — Aula 10: Modais e alemão da vida real

- **ID/rota:** `lesson` + `modals-real-life`.
- **Duração/foco:** 28 min; se virar na Alemanha (`js/lessons.js:301-303`).
- **Conteúdo:** tabela de `können`, `müssen`, `wollen`, `möchten`, `dürfen`; regra de dois verbos; frases para memorizar; cenários de supermercado, restaurante, transporte e trabalho; diálogo inicial e apresentação pessoal (`js/lessons.js:307-323`).
- **Exercícios:** 6; múltipla escolha, ordenação, tradução e verdadeiro/falso (`js/lessons.js:334-339`).
- **Regra de conteúdo:** modal conjugado fica na posição 2 e infinitivo vai ao final; `möchte` é apresentado como pedido educado.

## 7. Telas de prática verbal

### Tela 18 — Prática de `sein`

- **Rota lógica:** `exercises`.
- **Fonte:** `KlarVerbPractice.pages.sein` (`js/verb-exercises.js:6-109`).
- **Cabeçalho:** título, significado, introdução, meta de presente, quantidade de desafios e dica de prática (`js/app.js:612-624`).
- **Modo Conjugação:** 8 prompts para escrever as formas de `sein` (`js/verb-exercises.js:23-43`).
- **Modo Frases rápidas:** 50 frases de tradução (`js/verb-exercises.js:45-106`; também validado em `tests/verb-practice.test.js:72-105`).
- **Interação:** campo de texto, verificar, feedback, resposta correta em caso de erro, passar para a próxima frase, tentar novamente e reiniciar.
- **Regra de sessão:** no modo de frases, os 50 itens são embaralhados ao iniciar a sessão (`js/app.js:210-220,223-233`).
- **Regra de streak:** acerto incrementa a sequência; erro zera a sequência (`js/app.js:977-1000`).
- **Estado concluído:** após o último item correto, exibe conclusão, total praticado, streak final e botão de reinício (`js/app.js:572-597`).

### Tela 19 — Prática de `haben`

- **Rota lógica:** `exercises-haben`.
- **Fonte:** `KlarVerbPractice.pages.haben` (`js/verb-exercises.js:110-214`).
- **Modo Conjugação:** 8 prompts para escrever as formas de `haben` (`js/verb-exercises.js:127-147`).
- **Modo Frases rápidas:** 50 frases de tradução (`js/verb-exercises.js:149-210`).
- **Conteúdo:** posse, tempo, família, trabalho, compromissos, dinheiro, objetos, negação com `kein/keine` e situações do dia a dia.
- **Regras e estados:** iguais aos da tela de `sein`; o conteúdo, respostas e mensagens são específicos do verbo.

### Regras comuns das duas telas verbais

**Fato observado:** o modo de conjugação mostra todos os itens ao mesmo tempo e calcula o resultado por item; o modo de frases mostra uma frase por vez (`js/app.js:569-624`).

**Fato observado:** não é permitido verificar sem pelo menos uma resposta no modo de conjugação, nem sem texto no modo de frases; nesses casos há toast de resposta obrigatória (`js/app.js:977-985,1009-1014`).

**Fato observado:** a normalização aceita grafia sem diacríticos, validada explicitamente para `ä/ö/ü/ß` nos testes (`tests/verb-practice.test.js:106-126`).

**Fato observado:** a prática verbal não grava resultados em `localStorage`; o estado desaparece ao recarregar ou sair da tela.

## 8. Estados de interface

### Estados de carregamento

**Fato observado:** há uma classe `.loading-state` no CSS, mas não há renderização dessa classe em `js/app.js` nem fluxo assíncrono de carregamento (`css/styles.css:602` conforme inspeção; renderizações em `js/app.js:327-827`).

**Conclusão:** não existe tela funcional de loading, skeleton ou progresso de carregamento.

### Estados vazios

- Dashboard inicial: progresso zero, sem aulas concluídas e sem exercícios respondidos.
- Revisão sem aula concluída: estado vazio com CTA para a primeira aula (`js/app.js:512-515`).
- Resultado de aula sem resposta: card com traço, contagem vazia e instrução para continuar (`js/app.js:490-496`).
- Resultado da prática verbal antes da correção: mensagem para preencher e verificar (`js/app.js:600-609`).
- Prática de frases sem itens: fallback textual defensivo (`js/app.js:569-573`), embora os dados atuais possuam itens.

### Estados de sucesso

- exercício correto;
- aula marcada como concluída;
- todos os itens da conjugação verbal corretos;
- conclusão das 50 frases;
- reset efetuado;
- revisão com desempenho de pelo menos 80%.

### Estados de erro ou falha recuperável

- resposta vazia;
- resposta duplicada;
- resposta incorreta;
- áudio indisponível;
- falha de leitura do `localStorage`;
- falha de gravação no `localStorage`.

**Fato observado:** falhas de armazenamento são capturadas e substituídas por progresso novo em memória; não existe mensagem visual específica para o usuário (`js/storage.js:18-36`).

**Lacuna:** não há rota ou tela de erro global, 404, falha de carregamento de script, falha de CDN, falha de conteúdo ou exceção de renderização.

## 9. Fluxos funcionais completos

### Fluxo A — Primeiro acesso

1. O navegador carrega `index.html`.
2. O estado inicial define `route = dashboard` e a primeira aula como ativa (`js/app.js:10-18`).
3. `localStorage` é lido para idioma e progresso.
4. Dashboard, sidebar e breadcrumb são renderizados.
5. O usuário vê progresso zero e a próxima aula como a aula 01.

### Fluxo B — Iniciar uma aula

1. Usuário seleciona um card do dashboard ou uma aula na sidebar.
2. `openLesson(id)` valida o ID, salva `activeLessonId`, muda `route` para `lesson`, renderiza e rola ao topo (`js/app.js:743-756`).
3. A tela mostra o conteúdo estático da aula e cria a sessão de respostas em memória.
4. O usuário pode ouvir conteúdo e responder exercícios.

### Fluxo C — Responder exercício de aula

1. Usuário escolhe alternativa, escreve texto ou monta palavras.
2. A interação invalida o feedback anterior, se houver (`js/app.js:869-929`).
3. Usuário seleciona Verificar.
4. O motor lê a resposta, valida vazio/duplicidade, normaliza e compara.
5. A tentativa é registrada no `localStorage`.
6. O card recebe estado correto/incorreto e o resultado da aula é atualizado.

### Fluxo D — Concluir aula

1. Usuário aciona Concluir aula.
2. O ID é adicionado a `completedLessons` sem exigir 100% dos exercícios.
3. Conquistas e progresso geral são recalculados.
4. O botão fica desabilitado e um toast de sucesso é exibido.
5. A aula passa a alimentar a tela Revisar.

### Fluxo E — Revisar

1. Usuário abre Revisar.
2. Se não há aula concluída, recebe estado vazio e CTA para a primeira aula.
3. Caso contrário, até seis exercícios de aulas concluídas são selecionados aleatoriamente.
4. O usuário responde e recebe resultado da sessão.
5. Nova seleção descarta o estado visual anterior e sorteia novamente.

### Fluxo F — Praticar `sein` ou `haben`

1. Usuário abre uma das duas telas.
2. Escolhe o modo Conjugação ou Frases rápidas.
3. No modo Conjugação, preenche uma ou mais linhas e verifica o conjunto.
4. No modo Frases rápidas, responde uma frase por vez.
5. Acerto leva ao próximo item e mantém/aumenta streak; erro mostra comparação e permite tentar novamente.
6. Depois do último acerto, a sessão é marcada como concluída.

### Fluxo G — Resetar progresso

1. Usuário aciona Resetar progresso.
2. O navegador solicita confirmação (`js/app.js:776-779`).
3. Se confirmado, o progresso é substituído por uma estrutura nova, sessões em memória são limpas e a rota volta ao dashboard.
4. O idioma salvo não é resetado, pois usa outra chave de armazenamento.

## 10. Navegação e dependências entre telas

| Origem | Ação | Destino |
|---|---|---|
| Inicialização | carregar app | `dashboard` |
| Dashboard | próxima aula | `lesson` + ID da primeira incompleta |
| Dashboard | card de qualquer aula | `lesson` + ID selecionado |
| Dashboard | Revisar aulas concluídas | `review` |
| Sidebar | Visão geral | `dashboard` |
| Sidebar | Revisar | `review` |
| Sidebar | item de vocabulário | uma das 5 rotas `vocabulary-*` |
| Sidebar | item de aula | `lesson` + ID |
| Sidebar | prática `sein` | `exercises` |
| Sidebar | prática `haben` | `exercises-haben` |
| Tela de aula | anterior/próxima | aula adjacente |
| Tela de aula | concluir | permanece na aula, atualiza progresso |
| Tela de revisão | começar primeira aula | primeira aula |
| Tela de revisão | voltar | `dashboard` |
| Vocabulário | aba | outra rota `vocabulary-*` |
| Prática verbal | aba de modo | mesma rota, outro modo interno |

**Fato observado:** a delegação de eventos é centralizada em `document` e usa atributos `data-*` (`js/app.js:835-901`).

**Lacuna:** não há deep link, histórico do navegador, URL por tela, botão browser-back tratado ou restauração da tela anterior após reload.

## 11. Conteúdo e contratos de dados

### Aulas

**Fato observado:** `js/lessons.js` contém 10 objetos de aula, cada um com ID, número, título, descrição, foco, duração, objetivos, seções, vocabulário, resumo e exercícios. O teste confirma exatamente 10 aulas (`tests/content-localization.test.js:20-22`).

### Vocabulário global

**Fato observado:** o vocabulário global é mantido em `js/app.js:21-133` e contém:

- palavras essenciais;
- frases prontas;
- números de 1 a 20;
- sete dias da semana;
- doze meses.

### Prática verbal

**Fato observado:** cada verbo possui dois modos, oito itens de conjugação e 50 frases rápidas. O teste exige 50 frases por verbo e 100 IDs únicos no total (`tests/verb-practice.test.js:72-105`).

### Testes existentes

**Fato observado:** os testes cobrem ordem de scripts, chaves de tradução, conteúdo bilíngue, normalização de respostas, quantidade de frases, shuffle e streak (`tests/site-integration.test.js`, `tests/content-localization.test.js`, `tests/i18n.test.js`, `tests/verb-practice.test.js`).

**Validação realizada durante a análise:** os quatro testes executados passaram:

- `node tests/site-integration.test.js`;
- `node tests/i18n.test.js`;
- `node tests/content-localization.test.js`;
- `node tests/verb-practice.test.js` — 7/7 cenários aprovados.

## 12. Lacunas e inferências relevantes para requisitos futuros

As seguintes afirmações não são funcionalidades existentes; são limites identificados a partir do código:

1. Não há autenticação, sincronização entre dispositivos ou backend.
2. Não há permissões por perfil.
3. Não há URL pública específica para cada tela.
4. Não há loading funcional.
5. Não há tela global de erro nem tratamento visual para scripts/CDN indisponíveis.
6. O reset é irreversível pela própria interface e atua sobre todo o progresso do navegador.
7. A conclusão de aula não exige responder os exercícios.
8. Prática verbal e respostas parcialmente preenchidas não persistem após reload.
9. O vocabulário não tem progresso próprio nem marcação de item estudado.
10. O contador de acurácia global inclui respostas registradas nas aulas e na revisão, mas não inclui a prática verbal (`js/storage.js:57-92`; `js/app.js:1003-1028`).
11. O app depende de os arquivos JS serem carregados na ordem declarada; uma falha no conteúdo ou na biblioteca de ícones pode impedir a inicialização completa.

## 13. Resumo executivo por tela

| Tela | Regra principal | Ações principais | Estados principais |
|---|---|---|---|
| Dashboard | próxima = primeira aula não concluída | abrir aula, revisar | 0%, parcial, completo |
| Revisar | até 6 exercícios de aulas concluídas | responder, nova seleção | vazio, populado, resultado |
| Palavras | cada item tem tradução e áudio | ouvir, trocar aba | lista estática |
| Frases | frases prontas bilíngues | ouvir, trocar aba | lista estática |
| Números | 1–20 + composição de números grandes | ouvir, trocar aba | lista estática |
| Dias | uso com `am` | ouvir, trocar aba | lista estática |
| Meses | uso com `im` | ouvir, trocar aba | lista estática |
| Aula 01–10 | estudar, praticar e concluir | responder, áudio, navegar | não iniciada, andamento, concluída |
| `sein` | conjugação ou 50 frases | verificar, retry, reset | vazio, acerto, erro, final |
| `haben` | conjugação ou 50 frases | verificar, retry, reset | vazio, acerto, erro, final |

