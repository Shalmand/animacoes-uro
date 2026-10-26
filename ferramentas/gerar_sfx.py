"""Gera os efeitos sonoros do padrão (sintetizados, sem baixar nada) em public/sfx/.

Os .wav já estão no repositório — só rode isto se precisar recriá-los.
Uso:  python ferramentas/gerar_sfx.py      (precisa de numpy)
"""
import wave
from pathlib import Path
import numpy as np

SR = 44100
OUT = Path(__file__).resolve().parent.parent / "public" / "sfx"
OUT.mkdir(parents=True, exist_ok=True)
rng = np.random.default_rng(3)


def env(n, a=0.004, dec=8):
    t = np.arange(n) / SR
    e = np.exp(-t * dec)
    k = max(1, int(a * SR))
    e[:k] *= np.linspace(0, 1, k)
    return e


def lp(x, c):
    y = np.zeros_like(x)
    s = 0
    for i, v in enumerate(x):
        s += c * (v - s)
        y[i] = s
    return y


def save(nome, x, g=0.8):
    x = x / np.max(np.abs(x)) * g
    with wave.open(str(OUT / nome), "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes((x * 32767).astype(np.int16).tobytes())


def tom(f0, f1, dur, dec, harm=(1,)):
    n = int(dur * SR)
    f = np.geomspace(f0, f1, n)
    ph = 2 * np.pi * np.cumsum(f) / SR
    return sum(np.sin(ph * h) / h for h in harm) * env(n, 0.003, dec)


def pad(x, n):
    return np.pad(x, (0, n - len(x)))


# pop — entrada de adesivo/desenho
save("pop.wav", tom(900, 380, 0.12, 28, (1, 2)))
# fita — etiqueta grudando
n = int(0.09 * SR)
save("fita.wav", (lp(rng.standard_normal(n), 0.35) - lp(rng.standard_normal(n), 0.05)) * env(n, 0.002, 45), 0.6)
# whoosh — troca de cena
n = int(0.42 * SR)
t = np.arange(n) / SR
x = rng.standard_normal(n)
y = np.zeros(n)
s = 0
for i in range(n):
    c = 0.02 + 0.25 * np.sin(np.pi * i / n) ** 2
    s += c * (x[i] - s)
    y[i] = s
save("whoosh.wav", y * np.sin(np.pi * t / t[-1]) ** 1.5, 0.55)
# ding — check / confirmação
n = int(0.9 * SR)
save("ding.wav", tom(1320, 1320, 0.9, 5) + 0.5 * tom(1980, 1980, 0.9, 7) + 0.25 * pad(tom(2640, 2640, 0.6, 9), n))
# erro — X
save("erro.wav", np.concatenate([tom(330, 300, 0.16, 10, (1, 2, 3)), tom(250, 220, 0.24, 8, (1, 2, 3))]), 0.6)
# alerta — dois bipes (riscos)
b1 = tom(880, 880, 0.11, 18, (1, 3))
save("alerta.wav", np.concatenate([b1, np.zeros(int(0.06 * SR)), b1]), 0.55)
# click — botão
m = int(0.03 * SR)
save("click.wav", rng.standard_normal(m) * env(m, 0.0005, 160) + tom(2200, 1800, 0.03, 120)[:m], 0.6)
# sobe / desce — setas
save("sobe.wav", tom(400, 900, 0.25, 6, (1, 2)))
save("desce.wav", tom(900, 380, 0.28, 6, (1, 2)))
print("efeitos gerados em", OUT)
