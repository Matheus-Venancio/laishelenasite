import useRevelar from './hooks/useRevelar'
import Cabecalho from './componentes/Cabecalho'
import Hero from './componentes/Hero'
import Credenciais from './componentes/Credenciais'
import Sobre from './componentes/Sobre'
import Trajetoria from './componentes/Trajetoria'
import Bandeiras from './componentes/Bandeiras'
import Leis from './componentes/Leis'
import Brasilia from './componentes/Brasilia'
import Regiao from './componentes/Regiao'
import Livro from './componentes/Livro'
import Galeria from './componentes/Galeria'
import PedidoDeVoto from './componentes/PedidoDeVoto'
import ComoVotar from './componentes/ComoVotar'
import Participe from './componentes/Participe'
import Rodape from './componentes/Rodape'
import BarraFixa from './componentes/BarraFixa'

export default function App() {
  // revela as seções conforme o visitante rola a página
  useRevelar()

  return (
    <>
      <a className="pular-links" href="#conteudo">
        Pular para o conteúdo
      </a>

      <Cabecalho />

      <main id="conteudo">
        <Hero />
        <Credenciais />
        <Sobre />
        <Trajetoria />
        <Bandeiras />
        <Leis />
        <Brasilia />
        <Regiao />
        <Livro />
        <Galeria />
        <PedidoDeVoto />
        <ComoVotar />
        <Participe />
      </main>

      <Rodape />
      <BarraFixa />
    </>
  )
}
