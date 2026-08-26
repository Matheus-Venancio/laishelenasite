"""Gera o avatar circular da pagina de links a partir do recorte sem fundo."""
import os
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FOTOS = os.path.join(BASE, "public", "fotos")
LADO = 460

rec = Image.open(os.path.join(FOTOS, "lais-recorte.webp")).convert("RGBA")
alpha = np.asarray(rec.getchannel("A"))
ys, xs = np.where(alpha > 20)

# topo do cabelo e centro horizontal da cabeca (faixa superior do recorte)
topo = ys.min()
faixa = ys < topo + (ys.max() - topo) * 0.22
centro_x = int(xs[faixa].mean())

# quadrado enquadrando cabeca e ombros
lado = int((ys.max() - topo) * 0.62)
x0 = max(0, centro_x - lado // 2)
y0 = max(0, topo - int(lado * 0.10))
recorte = rec.crop((x0, y0, x0 + lado, y0 + lado)).resize((LADO, LADO), Image.LANCZOS)

# fundo em degrade rosa dentro do circulo
t = np.linspace(0, 1, LADO, dtype=np.float32)
grad = (t[None, :, None] * 0.65 + t[:, None, None] * 0.35)
c1 = np.array([0xFF, 0xE3, 0xF3], dtype=np.float32)
c2 = np.array([0xFF, 0xB0, 0xDE], dtype=np.float32)
fundo = Image.fromarray((c1 * (1 - grad) + c2 * grad).astype(np.uint8), "RGB").convert("RGBA")

composto = Image.alpha_composite(fundo, recorte)

# mascara circular com borda suave
mascara = Image.new("L", (LADO * 4, LADO * 4), 0)
ImageDraw.Draw(mascara).ellipse((0, 0, LADO * 4 - 1, LADO * 4 - 1), fill=255)
mascara = mascara.resize((LADO, LADO), Image.LANCZOS).filter(ImageFilter.GaussianBlur(0.6))
composto.putalpha(mascara)

saida = os.path.join(FOTOS, "lais-avatar.webp")
composto.save(saida, "WEBP", quality=92, method=6)
print("gerado:", saida, composto.size)
