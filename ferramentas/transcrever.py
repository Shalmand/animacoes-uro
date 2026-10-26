"""Extrai o áudio do vídeo e transcreve com o tempo de cada palavra.

Uso:  python ferramentas/transcrever.py "caminho/do/video.mp4" nome_curto
Gera: public/audios/<nome_curto>.mp3  e  ferramentas/palavras_<nome_curto>.json
Imprime a transcrição por frase e a lista palavra@segundo (é dela que saem os tempos das cenas).
"""
import json, subprocess, sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
video, nome = sys.argv[1], sys.argv[2]
mp3 = RAIZ / "public" / "audios" / f"{nome}.mp3"
mp3.parent.mkdir(parents=True, exist_ok=True)
npx = "npx.cmd" if sys.platform == "win32" else "npx"
subprocess.run([npx, "remotion", "ffmpeg", "-y", "-v", "error", "-i", video, "-vn", "-ac", "1", "-ar", "44100", "-b:a", "192k", str(mp3)], check=True, cwd=RAIZ)

from faster_whisper import WhisperModel  # pip install faster-whisper
modelo = WhisperModel("mobiuslabsgmbh/faster-whisper-large-v3-turbo", device="cpu", compute_type="int8")
segs, info = modelo.transcribe(str(mp3), language="pt", word_timestamps=True)
palavras = []
for s in segs:
    print(f"[{s.start:6.2f}-{s.end:6.2f}] {s.text}")
    for w in s.words:
        palavras.append({"w": w.word.strip(), "s": round(w.start, 2), "e": round(w.end, 2)})
saida = RAIZ / "ferramentas" / f"palavras_{nome}.json"
saida.write_text(json.dumps({"duracao": info.duration, "palavras": palavras}, ensure_ascii=False), encoding="utf-8")
print(f"\nduração: {info.duration:.2f}s")
print(" ".join(f"{p['w']}@{p['s']}" for p in palavras))
