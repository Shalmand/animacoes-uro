import React from "react";
import { Composition } from "remotion";
import { Testosterona } from "./videos/Testosterona";

// Todas as animações: 1800x1080 (5:3), 30 fps. durationInFrames = ceil(duração do áudio em segundos * 30).
// Para um vídeo novo: importe o componente de src/videos/ e adicione uma <Composition> abaixo.
export const Root = () => (
  <>
    <Composition id="Testosterona" component={Testosterona} durationInFrames={Math.ceil(40.71 * 30)} fps={30} width={1800} height={1080} />
  </>
);
