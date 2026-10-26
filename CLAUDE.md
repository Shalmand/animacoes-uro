# Animações URO — instruções de produção (Claude)

Este repositório é a base das animações explicativas do cliente **URO** — médico urologista
(saúde masculina). **Todas as animações daqui são para esse mesmo cliente**, e o padrão é exatamente
o do modelo aprovado `src/videos/Testosterona.jsx` + as regras abaixo: toda animação nova sai nele.

## Padrão x pedido do usuário

- Se o usuário só mandar o vídeo (ou pedir "no padrão"), siga **tudo** deste arquivo, sem inventar
  variações de estilo.
- Se o usuário pedir algo diferente — outra estrutura de cenas, outro formato (9:16, 1:1…), outras
  cores, legenda, sem efeitos, outro fundo, outro tipo de desenho —, **faça o que ele pediu**, mudando
  só aquilo e mantendo o resto do padrão. O pedido explícito do usuário vale mais que o padrão.
- Mudanças pontuais de um vídeo ficam no arquivo do vídeo (`src/videos/<Tema>.jsx`). Só altere
  `src/kit.jsx` se o usuário disser que a mudança vale para os próximos vídeos também.
- As **regras médicas do CFM/CRM** (mais abaixo) não são estilo: valem sempre, em todo vídeo.

Quem vai te pedir as animações é um editor de vídeo, **não programador**. Fale em português simples,
faça você mesmo todos os comandos e só peça a ele o que só ele pode fazer (mandar o vídeo, aprovar).

## O que é a entrega

- Um **.mp4 só com a animação** (não é o vídeo editado), **5:3 — 1800×1080, 30 fps**, com o
  **áudio do vídeo original** + **efeitos sonoros**.
- O editor coloca essa animação na parte de cima do vídeo vertical (9:16). O vídeo já tem **legenda
  normal embaixo** — por isso a animação **não legenda**: ela só mostra **desenhos + palavras-chave**.
- Salve em `out/<Tema> - animacao 5x3 com efeitos.mp4` e diga ao editor onde ficou.

## Fluxo de trabalho (siga nesta ordem)

1. **Primeira vez na máquina** (confira antes; só instale o que faltar):
   - Node 18+ → `npm install` na raiz do repositório.
   - Python 3.10+ → `pip install faster-whisper pillow numpy`.
     O modelo de transcrição (~1,6 GB) baixa sozinho na primeira transcrição.
   - Se o render reclamar do navegador, use o Chrome instalado:
     `--browser-executable="C:/Program Files/Google/Chrome/Application/chrome.exe"`.
2. **Transcrever**: `python ferramentas/transcrever.py "<video.mp4>" <nome_curto>`
   → cria `public/audios/<nome_curto>.mp3` e a lista `palavra@segundo`.
   Corrija o que o Whisper errar (ex.: no modelo saiu "lóbulos vermelhos" = **glóbulos vermelhos**,
   "atesto de fora" = **testosterona de fora**). Na etiqueta vai sempre o termo correto.
3. **Roteiro de cenas**: divida a fala em blocos de ideia (≈ 2 a 6 s cada). Para cada bloco, escolha
   **1 a 3 desenhos** que mostrem a ideia de forma explícita e **1 a 3 palavras-chave**.
   Os tempos de entrada (`a`) são o segundo em que a palavra é dita (pode adiantar ~0,1–0,3 s).
4. **Código**: copie `src/videos/Testosterona.jsx` para `src/videos/<Tema>.jsx`, troque as cenas e o
   áudio, e registre a `<Composition>` em `src/Root.jsx`
   (`durationInFrames = Math.ceil(duracao * 30)`). Use as peças de `src/kit.jsx`; se precisar de um
   desenho novo, crie-o **no mesmo estilo** e, se servir para outros vídeos, adicione ao kit.
5. **Conferir antes de renderizar**:
   `python ferramentas/folha_previa.py <Id> <frames...>` (um frame no meio de cada cena = segundo×30)
   e **olhe a imagem gerada**: nada sobreposto, nada cortado, etiquetas legíveis, palco respeitado.
6. **Renderizar**:
   `npx remotion render src/index.js <Id> "out/<Tema> - animacao 5x3 com efeitos.mp4" --codec=h264 --crf=18`
7. Entregue o caminho do arquivo e um resumo cena a cena (o que aparece em cada momento).

## O padrão visual (não mude sem o Victor/editor pedir)

- **Fundo**: papel bege liso (`Fundo`) — **sem piso/chão**, sem grade, sem cor de fundo diferente.
- **Respiro grande em cima** (a interface do Instagram cobre o topo):
  - título/etiqueta principal em `y = TY (420)`;
  - desenhos em torno de `y = CY (720)`;
  - rótulos embaixo dos desenhos em `y = RY (935)`;
  - laterais: conteúdo entre `x ≈ 450` e `x ≈ 1350`. **Nada acima de y ≈ 360.**
- **Figuras "adesivo"**: chapadas, contorno escuro grosso (`K.linha`, `SW = 5`), borda branca e
  sombra (`ADESIVO`, já aplicado pelo `Item`). Nada de traço de lápis, degradê, 3D ou foto.
- **Destaques em azul-marinho** (`K.navy #1b2a5c`): todas as etiquetas (`Tag`), números de tópico
  (`Numero`), setas, X e coração. Outras cores só dentro dos desenhos (pele, rosa, âmbar, amarelo do
  alerta, verde do check).
- **Etiquetas = palavras-chave**, nunca frases de legenda: 1 a 4 palavras, MAIÚSCULAS (automático),
  levemente inclinadas (`rot` entre −3 e 3), com o pedaço de fita no canto. Tamanho 40 para o título
  da cena, 32 para os rótulos dos desenhos.
- **Movimento**: tudo entra com salto (`Item`/`Tag`), no tempo da palavra. Cada cena é um `<Quadro>`
  que some com leve encolhida ao terminar. Personagens (`Pessoa`) piscam, respiram e mexem a boca;
  `jaleco` = o médico; `acena` = acenando no final.
- **Listas numeradas** ("3 coisas…"): use `Numero` (círculo azul-marinho) ao lado do título de cada tópico.
- Máximo de ~4 elementos ao mesmo tempo na tela. Espaço vazio é parte do estilo.

## Efeitos sonoros (já automáticos)

- `Item` toca **pop**, `Tag` toca **fita**, cada `Quadro` toca **whoosh** na troca de cena.
- `Check` → **ding**, `XGrande` → **erro**, `Seta` para cima/baixo → **sobe/desce**.
- Para alerta/risco use `som="alerta"` no `Item`; para clique, `som="click"`.
- Se dois sons caem juntos (ex.: desenho + etiqueta no mesmo instante), passe `som={null}` em um deles.
- Volumes em `VOL` (kit) — a voz do médico tem que ficar sempre na frente. Não use música.

## Regras médicas (CFM/CRM — Resolução CFM nº 2.336/2023) — obrigatórias

- Nunca prometer ou garantir resultado; nada de "cura", "garantido", "100%", "o melhor".
- Sem comparação com outros médicos/clínicas; sem antes/depois de paciente; sem sensacionalismo.
- As etiquetas só **repetem o que o médico fala**; não invente dado, número ou benefício.
- Desenhos anatômicos são **esquemáticos e educativos** (como o testículo do kit), nunca explícitos
  de forma vulgar.

## Peças disponíveis no kit (`src/kit.jsx`)

Estrutura: `Fundo`, `Quadro`, `Item`, `Tag`, `Numero`, `Check`, `XGrande`, `Seta` (dir/cima/baixo),
`Simbolo` (ex.: "≠", "="), `Som`.
Desenhos: `Pessoa` (paciente / `jaleco` médico / `acena`), `Ampola` (frasco de testosterona "T"),
`Seringa`, `Pote` (suplemento), `Medidor` (`alvo`: −90 = normal, −148 = baixo, −32 = alto),
`Prancheta` (`marcado` = nº de checks), `Calendario` (`marcados`), `Alerta`, `Testiculo`, `Esperma`,
`GotaSangue` (`n` glóbulos), `Carrinho` (bebê / filhos), `Coracao`.
