"""Pipeline de tratamento das fotos da campanha.

- corrige orientacao (EXIF ou rotacao manual)
- remove fundo verde (chroma key) com despill e antialias
- recorta no bounding box do sujeito
- exporta PNG transparente + WebP em varias larguras
"""
import os
import numpy as np
from PIL import Image, ImageOps, ImageFilter
from scipy import ndimage

Image.MAX_IMAGE_PIXELS = None

SRC = r"C:\Users\mathe\Downloads\SITE LAIS"
DEST = r"C:\Users\mathe\sitelais\public\fotos"
os.makedirs(DEST, exist_ok=True)


def load(name, rotate_ccw=False):
    im = Image.open(os.path.join(SRC, name))
    im = ImageOps.exif_transpose(im)
    if rotate_ccw:
        im = im.transpose(Image.ROTATE_90)
    return im.convert("RGB")


def chroma_key(im, lo=14.0, hi=48.0, feather=1.2):
    """Remove fundo verde. Retorna RGBA.

    Combina duas metricas de "verdice": uma absoluta (bom para o verde chapado
    e bem iluminado) e uma relativa ao brilho (bom para as sombras do fundo,
    onde a diferenca absoluta cai mas a dominancia do verde continua alta).
    """
    a = np.asarray(im).astype(np.float32)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]

    rb_max = np.maximum(r, b)
    gn = g - rb_max

    bg_abs = np.clip((gn - lo) / (hi - lo), 0.0, 1.0)
    rel = gn / (g + 8.0)
    bg_rel = np.clip((rel - 0.06) / 0.14, 0.0, 1.0) * (gn > 10.0)
    # a metrica relativa so vale onde ha verde de verdade, para nao comer
    # cabelo escuro e outros tons neutros de baixa luminancia
    alpha = 1.0 - np.maximum(bg_abs, bg_rel)

    # limpeza topologica: mantem o maior componente opaco e tapa buracos
    solid = alpha > 0.55
    solid = ndimage.binary_opening(solid, structure=np.ones((3, 3)), iterations=2)
    lbl, n = ndimage.label(solid)
    if n > 1:
        sizes = ndimage.sum(solid, lbl, range(1, n + 1))
        solid = lbl == (int(np.argmax(sizes)) + 1)
    solid = ndimage.binary_fill_holes(solid)
    # dilata um pouco para nao comer a borda semi-transparente do cabelo
    region = ndimage.binary_dilation(solid, structure=np.ones((3, 3)), iterations=3)
    alpha = np.where(region, alpha, 0.0)

    # despill: neutraliza o verde refletido nas bordas do sujeito
    spill = np.clip(gn, 0, None)
    mix = np.clip(spill / 30.0, 0.0, 1.0) * (alpha > 0.02)
    g_fix = np.minimum(g, (r + b) * 0.5 + 6.0)
    g = g * (1 - mix) + g_fix * mix

    out = np.stack([r, g, b], axis=-1)
    rgba = np.dstack([out, alpha * 255.0]).clip(0, 255).astype(np.uint8)
    img = Image.fromarray(rgba, "RGBA")

    if feather:
        ach = img.getchannel("A").filter(ImageFilter.GaussianBlur(feather))
        img.putalpha(ach)
    return img


def crop_to_subject(img, pad=0.02, keep_bottom=True):
    alpha = np.asarray(img.getchannel("A"))
    ys, xs = np.where(alpha > 12)
    if len(xs) == 0:
        return img
    x0, x1, y0, y1 = xs.min(), xs.max(), ys.min(), ys.max()
    w, h = img.size
    px, py = int(w * pad), int(h * pad)
    x0 = max(0, x0 - px)
    x1 = min(w, x1 + px)
    y0 = max(0, y0 - py)
    y1 = h if keep_bottom else min(h, y1 + py)
    return img.crop((int(x0), int(y0), int(x1), int(y1)))


def export(img, base, widths, quality=86, png=False):
    for wdt in widths:
        if img.width < wdt:
            continue
        ratio = wdt / img.width
        rz = img.resize((wdt, max(1, round(img.height * ratio))), Image.LANCZOS)
        suffix = "" if wdt == widths[0] else f"-{wdt}"
        rz.save(os.path.join(DEST, f"{base}{suffix}.webp"), "WEBP",
                quality=quality, method=6)
        if png:
            rz.save(os.path.join(DEST, f"{base}{suffix}.png"), "PNG", optimize=True)
        print(f"  {base}{suffix} -> {rz.size}")


def cover(im, target_ratio, xanchor=0.5, yanchor=0.12, zoom=1.0):
    """Recorta para uma proporcao (largura/altura), com ancoragem e zoom."""
    w, h = im.size
    cur = w / h
    if cur > target_ratio:
        nw, nh = h * target_ratio, h
    else:
        nw, nh = w, w / target_ratio
    nw, nh = nw / zoom, nh / zoom
    x0 = (w - nw) * xanchor
    y0 = (h - nh) * yanchor
    return im.crop((int(x0), int(y0), int(x0 + nw), int(y0 + nh)))


print("1/6 recorte principal (hero)")
principal = load("FOTO PRIINCIPAL.JPG")
rec = crop_to_subject(chroma_key(principal))
export(rec, "lais-recorte", [1400, 1000, 700], png=True)

print("2/6 recorte bracos cruzados")
bracos = load("BRACO FELIZ.JPG")
rec2 = crop_to_subject(chroma_key(bracos))
export(rec2, "lais-bracos", [1200, 800, 560], png=True)

print("3/6 retrato sentada")
feliz = load("FELIZ.JPG")
export(cover(feliz, 3 / 4, yanchor=0.34, zoom=1.28), "lais-retrato", [1200, 800, 560])

print("4/6 conversando com eleitoras")
conv = load("FOTO CONVERSANDO.JPG")
export(conv, "lais-conversando", [1800, 1200, 800])

print("5/6 valinhos close")
export(load("FOTO VALINHOS.JPG"), "lais-cidade", [1800, 1200, 800])

print("6/6 valinhos corpo inteiro")
export(load("FOTO AMPLIADA VALINHOS.JPG"), "lais-regiao", [1800, 1200, 800])

print("7/7 imagem de compartilhamento (og)")


def font(size, weight="black"):
    from PIL import ImageFont
    cands = {
        "black": ["seguibl.ttf", "arialbd.ttf", "impact.ttf"],
        "bold": ["segoeuib.ttf", "arialbd.ttf"],
        "regular": ["segoeui.ttf", "arial.ttf"],
    }[weight]
    for c in cands:
        p = os.path.join(r"C:\Windows\Fonts", c)
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default(size)


def make_og():
    from PIL import ImageDraw
    W, H = 1200, 630
    # fundo em degrade rosa (cor principal -> cor secundaria)
    xs = np.linspace(0, 1, W, dtype=np.float32)[None, :, None]
    ys = np.linspace(0, 1, H, dtype=np.float32)[:, None, None]
    t = np.clip(xs * 0.75 + ys * 0.25, 0, 1)
    c1 = np.array([0xE6, 0x07, 0x6C], dtype=np.float32)
    c2 = np.array([0xFF, 0x47, 0xC6], dtype=np.float32)
    bg = (c1 * (1 - t) + c2 * t).astype(np.uint8)
    og = Image.fromarray(bg, "RGB").convert("RGBA")

    d = ImageDraw.Draw(og)
    d.rectangle([0, H - 14, W, H], fill=(0xF7, 0xCF, 0x0D, 255))

    # recorte da candidata a direita
    cut = Image.open(os.path.join(DEST, "lais-recorte.png")).convert("RGBA")
    ch = 640
    cut = cut.resize((round(cut.width * ch / cut.height), ch), Image.LANCZOS)
    og.alpha_composite(cut, (W - cut.width - 10, H - ch + 40))

    d = ImageDraw.Draw(og)
    d.text((70, 132), "PROFESSORA", font=font(46), fill=(255, 255, 255, 235))
    d.text((70, 182), "LAÍS HELENA", font=font(78), fill=(255, 255, 255, 255))
    d.text((70, 282), "DEPUTADA FEDERAL", font=font(34, "bold"),
           fill=(0xF7, 0xCF, 0x0D, 255))
    d.text((70, 344), "2098", font=font(140), fill=(0xF7, 0xCF, 0x0D, 255))
    d.text((72, 508), "Firme para defender,", font=font(30, "bold"),
           fill=(255, 255, 255, 240))
    d.text((72, 546), "preparada para fazer.", font=font(30, "bold"),
           fill=(255, 255, 255, 240))

    og.convert("RGB").save(os.path.join(DEST, "og-lais-helena.jpg"),
                           "JPEG", quality=90, optimize=True)
    print("  og-lais-helena.jpg -> (1200, 630)")


make_og()
print("OK")
