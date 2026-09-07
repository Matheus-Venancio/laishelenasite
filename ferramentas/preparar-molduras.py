"""Prepara as artes das molduras de apoiador.

Copia as artes oficiais quadradas (1080x1080, com a area da foto transparente)
para public/moldura/ e gera as versoes story (1080x1920) encaixando a arte
quadrada na base da tela — o espaco de cima fica livre para a foto.
"""
import os
import sys
import numpy as np
from PIL import Image

ORIGEM = r"C:\Users\mathe\Downloads"
BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DESTINO = os.path.join(BASE, "public", "moldura")
os.makedirs(DESTINO, exist_ok=True)

# arquivo de origem  ->  nome do modelo no site
ARTES = {
    "LAIS UM.png": "estoucom",
    "LAIS DOIS.png": "euvoto",
    "LAIS TRES.png": "classico",
}

POST = (1080, 1080)
STORY = (1080, 1920)

# Passe --opacar para corrigir artes exportadas com opacidade abaixo de 100%.
# Sem a flag, a arte e usada exatamente como o designer entregou.
OPACAR = "--opacar" in sys.argv


def opacar(im):
    """Deixa a faixa da campanha 100% opaca, preservando o degrade da transicao.

    Algumas artes saem do editor com a area "solida" em ~94% de opacidade.
    Nesse caso a foto do apoiador vaza pela faixa e a cor da campanha muda
    de pessoa para pessoa. O fator normaliza a opacidade pelo topo da escala.
    """
    a = np.asarray(im.getchannel("A")).astype(np.float32)
    alto = np.percentile(a[a > 200], 60) if (a > 200).any() else 255.0
    if alto >= 254:
        return im, 1.0
    fator = 255.0 / alto
    novo = np.clip(a * fator, 0, 255).astype(np.uint8)
    im.putalpha(Image.fromarray(novo, "L"))
    return im, fator


def verificar(im, nome):
    """A area da foto precisa ser transparente, senao a foto fica escondida."""
    a = np.asarray(im.getchannel("A"))
    transparente = (a < 10).mean()
    if transparente < 0.15:
        raise SystemExit(
            f"ERRO em {nome}: so {transparente:.0%} da arte esta transparente.\n"
            "A area onde entra a foto do apoiador precisa ter alpha 0 "
            "(exportar como PNG com fundo transparente)."
        )
    return transparente


for arquivo, modelo in ARTES.items():
    caminho = os.path.join(ORIGEM, arquivo)
    if not os.path.exists(caminho):
        raise SystemExit(f"ERRO: arte nao encontrada: {caminho}")

    im = Image.open(caminho).convert("RGBA")
    if im.size != POST:
        im = im.resize(POST, Image.LANCZOS)

    transparente = verificar(im, arquivo)

    ajuste = ""
    if OPACAR:
        im, fator = opacar(im)
        if fator > 1.0:
            ajuste = f" | opacidade corrigida x{fator:.3f}"

    saida_post = os.path.join(DESTINO, f"{modelo}-post.png")
    im.save(saida_post, "PNG", optimize=True)

    # story: arte quadrada encaixada na base de uma tela 1080x1920
    story = Image.new("RGBA", STORY, (0, 0, 0, 0))
    story.alpha_composite(im, (0, STORY[1] - POST[1]))
    saida_story = os.path.join(DESTINO, f"{modelo}-story.png")
    story.save(saida_story, "PNG", optimize=True)

    kb_post = os.path.getsize(saida_post) // 1024
    kb_story = os.path.getsize(saida_story) // 1024
    print(
        f"{arquivo:16} -> {modelo:9} "
        f"post {kb_post:4}KB | story {kb_story:4}KB | "
        f"area livre p/ foto: {transparente:.0%}{ajuste}"
    )

print("\nOK — artes prontas em public/moldura/")
