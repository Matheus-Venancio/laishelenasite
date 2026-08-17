import { galeria } from '../dados/conteudo'

export default function Galeria() {
  return (
    <section className="secao" id="galeria">
      <div className="container">
        <div className="cabecalho-secao revelar">
          <p className="olho">Campanha na rua</p>
          <h2 className="titulo-secao">Perto de quem vive o problema.</h2>
        </div>

        <div className="galeria revelar">
          {galeria.map((foto) => (
            <figure className={foto.classe} key={foto.id}>
              <img
                src={foto.src}
                srcSet={foto.srcSet}
                sizes="(max-width: 620px) 92vw, (max-width: 960px) 46vw, 30vw"
                alt={foto.alt}
                loading="lazy"
                decoding="async"
              />
              <figcaption>{foto.legenda}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
