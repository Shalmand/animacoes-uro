import React from "react";
import { AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import {
  ADESIVO, Alerta, Ampola, CELULAS, Calendario, Carrinho, Check, Coracao, Esperma, FPS, Fundo, GotaSangue, Item, K, Medidor, Numero, Pessoa, Pote, Prancheta, Quadro, SW, Seringa, Seta, Simbolo, Som, TY, CY, RY, Tag, Testiculo, VOL, XGrande, cl, gotaD, pula, suave, FONTES
} from "../kit";

// MODELO DE REFERÊNCIA — "3 coisas antes de usar a testosterona" (aprovado em 2026-10-26)
// O áudio original (voz do URO) não vem no repositório: o modelo renderiza em silêncio.
// Nos vídeos novos, passe audio="audios/<nome>.mp3" (gerado por ferramentas/transcrever.py).
// Cada <Quadro> = uma cena; os tempos (a=entrada) vêm de ferramentas/exemplo_palavras_testosterona.json.

export const Testosterona = ({ audio = null }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = f / fps;
  const nCel = Math.round(interpolate(t, [19.1, 20.4], [4, 12], cl));
  const espOp = interpolate(t, [27.3, 28.6], [1, 0.15], cl);
  return (
    <AbsoluteFill>
      <style>{FONTES}</style>
      <Fundo />

      {/* 0–3.3 três coisas que você precisa saber antes de usar a testosterona */}
      <Quadro t={t} a={0} b={3.28} whoosh={false}>
        <Tag t={t} a={0.25} x={900} y={TY} txt="3 coisas antes de usar" />
        {[1, 2, 3].map((n, i) => <Numero key={n} t={t} a={0.6 + i * 0.2} x={600 + i * 170} y={CY} n={n} />)}
        <Item t={t} a={2.5} x={1230} y={CY} rot={6}><Ampola s={0.95} /></Item>
        <Tag t={t} a={2.6} x={1230} y={RY} txt="Testosterona" size={32} rot={2} som={null} />
      </Quadro>

      {/* 3.36–5.6 primeiro: testosterona não é suplemento */}
      <Quadro t={t} a={3.36} b={5.62}>
        <Numero t={t} a={3.4} x={560} y={TY} n={1} som={null} />
        <Tag t={t} a={4.6} x={940} y={TY} txt="Não é suplemento" />
        <Item t={t} a={3.86} x={650} y={CY + 10} rot={-5}><Ampola s={0.95} /></Item>
        <Item t={t} a={4.6} x={900} y={CY} adesivo={false} som={null}><Simbolo txt="≠" /></Item>
        <Item t={t} a={4.96} x={1150} y={CY + 10} rot={4}><Pote /></Item>
        <XGrande t={t} a={5.15} x={1150} y={CY + 10} s={1.1} />
      </Quadro>

      {/* 5.72–12.1 reposição é pra quem tem deficiência, confirmada e com indicação médica */}
      <Quadro t={t} a={5.72} b={12.1}>
        <Tag t={t} a={5.9} x={900} y={TY} txt="Reposição é para quem tem:" />
        <Item t={t} a={7.44} x={560} y={CY} rot={-3}><Medidor t={t} alvo={-148} /></Item>
        <Tag t={t} a={7.6} x={560} y={RY} txt="Deficiência" size={32} rot={-2} />
        <Seta t={t} a={9.3} x={735} y={CY} s={0.6} />
        <Item t={t} a={9.7} x={900} y={CY} rot={3}><Prancheta marcado={t > 10.0 ? 3 : 0} /></Item>
        <Check t={t} a={10.0} x={1010} y={CY - 120} s={0.7} />
        <Tag t={t} a={9.95} x={900} y={RY} txt="Confirmada" size={32} rot={2} som={null} />
        <Seta t={t} a={10.6} x={1075} y={CY} s={0.6} />
        <Item t={t} a={11.0} x={1240} y={CY - 10}><Pessoa t={t} jaleco /></Item>
        <Tag t={t} a={11.1} x={1240} y={RY} txt="Indicação médica" size={32} rot={-2} />
      </Quadro>

      {/* 12.2–15.5 segundo: usar por conta própria pode trazer riscos */}
      <Quadro t={t} a={12.2} b={15.45}>
        <Numero t={t} a={12.3} x={560} y={TY} n={2} />
        <Tag t={t} a={13.5} x={940} y={TY} txt="Por conta própria" />
        <Item t={t} a={12.8} x={700} y={CY}><Pessoa t={t} /></Item>
        <Item t={t} a={13.1} x={820} y={CY + 30} rot={-30} s={0.75}><Seringa /></Item>
        <Item t={t} a={14.75} x={1150} y={CY - 10} rot={4} som="alerta"><Alerta /></Item>
        <Tag t={t} a={14.94} x={1150} y={RY - 40} txt="Riscos" som={null} />
      </Quadro>

      {/* 15.5–20.9 alteração na produção natural ou aumento dos glóbulos vermelhos */}
      <Quadro t={t} a={15.5} b={20.9}>
        <Tag t={t} a={15.6} x={900} y={TY} txt="Riscos" />
        <Item t={t} a={16.3} x={640} y={CY - 10} rot={-3}><Testiculo /></Item>
        <Seta t={t} a={16.6} x={800} y={CY - 90} dir="baixo" s={0.75} />
        <Tag t={t} a={17.5} x={660} y={RY} txt="Produção natural" size={32} rot={-2} />
        <Item t={t} a={19.0} x={1120} y={CY}><GotaSangue n={nCel} /></Item>
        <Seta t={t} a={19.2} x={1290} y={CY - 90} dir="cima" s={0.75} />
        <Tag t={t} a={19.9} x={1150} y={RY} txt="Glóbulos vermelhos" size={32} rot={2} />
      </Quadro>

      {/* 20.98–24.8 terceiro: se pensa em ter filho, mais cuidado ainda */}
      <Quadro t={t} a={20.98} b={24.75}>
        <Numero t={t} a={21.06} x={560} y={TY} n={3} />
        <Tag t={t} a={22.6} x={940} y={TY} txt="Quer ter filhos?" />
        <Item t={t} a={22.68} x={720} y={CY} rot={-3}><Carrinho /></Item>
        <Item t={t} a={23.7} x={1110} y={CY - 10} rot={3} som="alerta"><Alerta /></Item>
        <Tag t={t} a={23.86} x={1110} y={RY - 40} txt="Mais cuidado" som={null} />
      </Quadro>

      {/* 24.84–30.75 testosterona de fora pode reduzir a produção de espermatozoides e comprometer a fertilidade */}
      <Quadro t={t} a={24.84} b={30.75}>
        <Tag t={t} a={25.8} x={900} y={TY} txt="Testosterona de fora" />
        <Item t={t} a={25.4} x={520} y={CY} rot={-5}><Ampola s={0.85} /></Item>
        <Seta t={t} a={26.3} x={670} y={CY} s={0.6} />
        <Item t={t} a={26.6} x={860} y={CY - 10}><Testiculo w={200} /></Item>
        {[0, 1, 2, 3].map((k) => {
          const ini = 26.9 + k * 0.12;
          const p = suave(t, ini, 0.6);
          return t > ini && (
            <svg key={k} width="120" height="60" viewBox="-100 -30 120 60" style={{ position: "absolute", left: 960 + p * 40, top: CY - 120 + k * 50, overflow: "visible", opacity: espOp, filter: ADESIVO }}>
              <Esperma t={t} fase={k} s={0.75} />
            </svg>
          );
        })}
        <Seta t={t} a={27.3} x={1070} y={CY + 120} dir="baixo" s={0.6} />
        <Tag t={t} a={28.38} x={880} y={RY} txt="Espermatozoides" size={32} rot={-2} />
        <Item t={t} a={29.32} x={1290} y={CY} rot={4} op={interpolate(t, [29.8, 30.2], [1, 0.45], cl)}><Carrinho /></Item>
        <Tag t={t} a={30.0} x={1290} y={RY} txt="Fertilidade" size={32} rot={2} />
      </Quadro>

      {/* 30.9–37.1 antes de começar: avaliação médica e acompanhamento */}
      <Quadro t={t} a={30.9} b={37.05}>
        <Tag t={t} a={31.3} x={900} y={TY} txt="Antes de começar" />
        <Item t={t} a={31.8} x={640} y={CY - 10}><Pessoa t={t} jaleco /></Item>
        <Item t={t} a={34.6} x={820} y={CY - 40} rot={4} s={0.7}><Prancheta marcado={t > 35.0 ? 2 : 0} /></Item>
        <Tag t={t} a={34.8} x={700} y={RY} txt="Avaliação médica" size={32} rot={-2} />
        <Item t={t} a={35.86} x={1170} y={CY}><Calendario marcados={Math.round(interpolate(t, [36.1, 36.9], [0, 5], cl))} /></Item>
        <Tag t={t} a={36.16} x={1170} y={RY} txt="Acompanhamento" size={32} rot={2} />
      </Quadro>

      {/* 37.1–40.7 se tiver indicação, estou aqui pra ajudar */}
      <Quadro t={t} a={37.1} b={60}>
        <Tag t={t} a={38.16} x={900} y={TY} txt="Com indicação médica" />
        <Item t={t} a={37.3} x={780} y={CY - 10}><Pessoa t={t} jaleco acena={t > 39.2} /></Item>
        <Item t={t} a={39.4} x={1080} y={CY - 40} rot={-6} som="ding"><Coracao /></Item>
      </Quadro>

      {audio && <Audio src={staticFile(audio)} />}
    </AbsoluteFill>
  );
};
