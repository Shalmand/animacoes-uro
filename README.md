# Animações URO

Base para criar as animações explicativas dos vídeos do cliente **URO** (urologista — saúde masculina).
A animação sai em **5:3, com o áudio do vídeo e efeitos sonoros**, para ser colocada na parte de cima
do Reels. Você não precisa saber programar: o **Claude Code** faz tudo seguindo as regras do arquivo
`CLAUDE.md`.

Modelo aprovado: a animação **"3 coisas antes de usar a testosterona"** (`src/videos/Testosterona.jsx`).
Esse é o **padrão base**. Se você quiser algo diferente (outra estrutura, cores, formato, sem efeitos…), é só pedir: o Claude parte do padrão e muda o que você pediu.

O modelo vem **sem o áudio original** (é a voz do URO). Ao abrir o modelo no estúdio, a animação roda em silêncio. Nos seus vídeos, o áudio entra normalmente.

## Como funciona (o que você manda e o que o Claude faz)

**Você só precisa mandar o vídeo.** O resto é com o Claude:

| Etapa | Quem faz | O que acontece |
|---|---|---|
| 1. Mandar o vídeo | **Você** | O vídeo do URO já gravado (pode ser o bruto ou o editado, com a fala completa). Basta o arquivo `.mp4` no computador — arraste para a conversa. |
| 2. Tirar o áudio e transcrever | Claude | Ele separa o áudio e transcreve a fala com o tempo exato de cada palavra (Whisper, roda no seu PC). |
| 3. Planejar as cenas | Claude | Divide a fala em blocos de ideia e escolhe, para cada um, os desenhos e as palavras-chave em azul-marinho — sempre dentro das regras do CFM/CRM. |
| 4. Montar a animação | Claude | Escreve a animação no **Remotion** (programa que transforma código em vídeo), usando as peças prontas do kit e os efeitos sonoros. |
| 5. Conferir | Claude | Gera uma folha com um quadro de cada cena e confere se nada está sobreposto, cortado ou no topo da tela. |
| 6. Renderizar | Claude | Gera o `.mp4` 5:3 (1800×1080) com o áudio do vídeo + efeitos, na pasta `out/`. |
| 7. Aprovar ou pedir ajuste | **Você** | Assista. Peça ajustes em português normal; ele corrige no mesmo arquivo. |
| 8. Usar no Reels | **Você** | Coloque a animação na parte de cima do vídeo vertical, no seu editor (CapCut, Premiere…), alinhada com o início da fala. |

Opcional, mas ajuda: se você já souber o que quer destacar (*"na parte dos riscos, mostra uma
seringa"*), escreva junto quando mandar o vídeo.

## Preparar o computador (uma vez só)

1. Instale o **Node.js** (versão LTS): https://nodejs.org
2. Instale o **Python 3**: https://www.python.org/downloads (marque *"Add Python to PATH"*)
3. Instale o **Google Chrome**, se ainda não tiver.
4. Instale o **Claude Code** (app Claude para desktop, aba *Code*) e entre com a sua conta.
5. Baixe este repositório: no GitHub, botão verde **Code → Download ZIP**, e descompacte
   (ou peça ao Claude: *"clone o repositório Shalmand/animacoes-uro"*).

## Fazer uma animação nova

1. Abra a pasta do repositório no Claude Code.
2. Na primeira vez, escreva:
   > Prepare este projeto para rodar no meu computador.
3. Para cada vídeo, escreva algo como:
   > Faça a animação deste vídeo seguindo o padrão do CLAUDE.md: `D:\Downloads\nome do video.mp4`

   Dica: arraste o arquivo do vídeo para a conversa que o caminho aparece sozinho.
4. O Claude transcreve o áudio, monta as cenas, confere e renderiza. No fim ele diz onde ficou o
   arquivo (pasta `out/`).
5. Para ajustar, peça normalmente: *"aumente a etiqueta da cena 3"*, *"troque o desenho do frasco por
   uma seringa"*, *"o efeito sonoro do X está alto"*.

## O que já vem pronto

- Estilo visual: papel liso, figuras tipo adesivo, palavras-chave em azul-marinho, espaço livre em
  cima (para a interface do Instagram não cobrir nada).
- Efeitos sonoros (pop, fita, whoosh, ding, erro, alerta, clique, setas) que tocam sozinhos quando
  cada coisa aparece.
- Regras do CFM/CRM para conteúdo médico (sem promessas, sem superlativos).

## Ver o resultado enquanto ajusta (opcional)

Peça ao Claude *"abra o estúdio do Remotion"* — ele roda `npm run estudio` e você vê a animação no
navegador, com uma linha do tempo para passar cena por cena.
