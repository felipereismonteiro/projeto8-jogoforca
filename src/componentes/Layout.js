import palavra from "./palavras"
import React from "react"

import forca0 from "../assets/forca0.png"
import forca1 from "../assets/forca1.png"
import forca2 from "../assets/forca2.png"
import forca3 from "../assets/forca3.png"
import forca4 from "../assets/forca4.png"
import forca5 from "../assets/forca5.png"
import forca6 from "../assets/forca6.png"


export default function Layout() {
    const alfabeto = [
        "a", "b", "c", "d", "e", "f", "g", "h",
        "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u",
        "v", "w", "x", "y", "z"]

    const [jogoIniciado, setJogoIniciado] = React.useState(false)
    const [palavraSorteada, setPalavraSorteada] = React.useState([])
    const [letraEscolhida, setLetraEscolhida] = React.useState([])

    let [contadorErros, setContadorErros] = React.useState(0)
    let [contadorAcertos, setContadorAcertos] = React.useState(0)

    const [chute, setChute] = React.useState("")

    function inciarJogo() {
        setJogoIniciado(true)
        palavra.sort(sorteador)
        setPalavraSorteada(...palavraSorteada, palavra[1].split(""))
        console.log(...palavraSorteada, palavra[1].split(""))
    }

    function sorteador() {
        return Math.random() - 0.5;
    }

    function letraAlfabeto(letra) {
        if (letraEscolhida.includes(letra)) {
            return false;
        } else {
            setLetraEscolhida([...letraEscolhida, letra])
            console.log([letra, ...letraEscolhida])
        }
        if(palavraSorteada.includes(letra)) {
            setContadorErros(contadorErros += 1)
        } else {
            setContadorAcertos(contadorAcertos += 1)
        }
    }

    console.log(contadorErros)
    console.log(contadorAcertos)

    function chutou() {
        console.log(chute)
    }

    return (
        <>
            <div className="container">
                <div className="forca">

                    <img src={forca0} alt="forca" />

                    <div className="escolherPalavra">
                        <button onClick={inciarJogo} disabled={jogoIniciado} className="escolherPalavraP">
                            Escolher palavra
                        </button>

                        <div className={jogoIniciado === false ? "hidden" : "jogoIniciado"}>
                            {palavraSorteada.map((i, index) => letraEscolhida.includes(palavraSorteada[index]) ? i : " _ ")}
                        </div>
                    </div>
                </div>

                <div className="alfabeto">
                    {alfabeto.map((letra, index) =>
                        <button key={index}
                            disabled={!jogoIniciado}
                            onClick={() => letraAlfabeto(letra)}
                            className={jogoIniciado === false
                                ? "alfabetoButtonDisable"
                                : "alfabetoButtonEnable"}
                        >{letra}</button>)}
                </div>

                <div className="jaSei">
                    <p>Ja sei a palavra!</p>
                    <input onChange={e => setChute(e.target.value.toLowerCase())} type="text" />
                    <button onClick={chutou} disabled={!jogoIniciado} className="chutar">chutar</button>
                </div>
            </div>
        </>
    )
}