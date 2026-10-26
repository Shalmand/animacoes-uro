"""Monta uma folha com vários quadros parados da animação para conferir todas as cenas de uma vez.

Uso:  python ferramentas/folha_previa.py <IdDaComposicao> <frame1> <frame2> ...
      (frame = segundo * 30; escolha 1 frame no meio de cada cena)
Gera: previa/<Id>_folha.png
"""
import subprocess, sys
from pathlib import Path
from PIL import Image  # pip install pillow

RAIZ = Path(__file__).resolve().parent.parent
comp, frames = sys.argv[1], sys.argv[2:]
(RAIZ / "previa").mkdir(exist_ok=True)
npx = "npx.cmd" if sys.platform == "win32" else "npx"
extra = []
chrome = Path("C:/Program Files/Google/Chrome/Application/chrome.exe")
if chrome.exists():
    extra = [f"--browser-executable={chrome}"]
imgs = []
for f in frames:
    out = RAIZ / "previa" / f"{comp}_{f}.png"
    subprocess.run([npx, "remotion", "still", "src/index.js", comp, str(out), f"--frame={f}", "--scale=0.4", "--log=error", *extra], check=True, cwd=RAIZ)
    imgs.append(Image.open(out))
w, h = imgs[0].size
cols = 2
linhas = (len(imgs) + cols - 1) // cols
folha = Image.new("RGB", (w * cols, h * linhas), "white")
for i, im in enumerate(imgs):
    folha.paste(im, ((i % cols) * w, (i // cols) * h))
destino = RAIZ / "previa" / f"{comp}_folha.png"
folha.save(destino)
print(destino)
