import palavra from "./palavras"
import React from "react"


export default function Layout() {
    const alfabeto = [
        "a", "b", "c", "d", "e", "f", "g", "h",
        "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u",
        "v", "w", "x", "y", "z"]

    const [jogoIniciado, setJogoIniciado] = React.useState(false)
    const [palavraIniciada, setPalavraIniciada] = React.useState(false)

    const [palavraSorteada, setPalavraSorteada] = React.useState([])
    const [letraEscolhida, setLetraEscolhida] = React.useState([])
    const [palavraRevelada, setPalavraRevelada] = React.useState(null)

    let [contadorErros, setContadorErros] = React.useState(0)
    let [contadorAcertos, setContadorAcertos] = React.useState(0)

    const [imagem, setImagem] = React.useState(<img src={`./assets/forca${contadorErros}.png`} alt="forca" />)
    const [acertouPrompt, setAcertouPrompt] = React.useState("")
    const [chute, setChute] = React.useState("")

    const palavraRenderizada = palavraSorteada.map((i, index) => letraEscolhida.includes(palavraSorteada[index]) ? i : " _ ")

    function inciarJogo() {
        resetandoJogo()

        setJogoIniciado(true)
        palavra.sort(sorteador)
        setPalavraSorteada(...palavraSorteada, palavra[1].split(""))
        console.log(...palavraSorteada, palavra[1].split(""))
    }

    function resetandoJogo() {
        contadorErros = 0
        contadorAcertos = 0
        setContadorAcertos(0)
        setContadorErros(0)

        setChute("")

        setImagem(<img src={`./assets/forca${contadorErros}.png`} alt="forca" />)

        setAcertouPrompt("")
        setPalavraRevelada(null)
        setPalavraIniciada(true)

        setLetraEscolhida([])

    }

    function sorteador() {
        return Math.random() - 0.5;
    }

    function letraAlfabeto(letra) {
        if (letraEscolhida.includes(letra)) {
            return false;
        } else {
            switch (letra) {
                case "a":
                    return setLetraEscolhida([...letraEscolhida, "a", "á", "à", "â", "ã"])
                case "c":
                    return setLetraEscolhida([...letraEscolhida, "c", "ç"])
            }
            setLetraEscolhida([...letraEscolhida, letra])
        }
        if (palavraSorteada.includes(letra)) {
            setContadorAcertos(contadorAcertos += 1)
        } else {
            if(contadorErros === 5) {
                usuarioPerdeu()
            }
            setContadorErros(contadorErros += 1)
            setImagem(<img src={`./assets/forca${contadorErros}.png`} alt="forca" />)
        }
    }

    function chutou() {
        const palavra = palavraSorteada.join("")
        if (chute === palavra) {
            usuarioGanhou()
        } else {
            usuarioPerdeu()
        }
    }

    function usuarioGanhou() {
        setJogoIniciado(false)
        setPalavraSorteada([])
        setPalavraRevelada([...palavraSorteada])

        setContadorAcertos(0)
        setContadorErros(0)

        setAcertouPrompt("green")
    }

    function usuarioPerdeu() {
        setJogoIniciado(false)
        setPalavraSorteada([])
        setPalavraRevelada([...palavraSorteada])

        setContadorAcertos(0)
        setContadorErros(0)

        setAcertouPrompt("red")
        setImagem(<img src={`./assets/forca6.png`} alt="forca" />)
    }

    if(jogoIniciado) {
        if (palavraRenderizada.join("") === palavraSorteada.join("")) {
            return usuarioGanhou()
        }
    }

    return (
        <>
            <div className="container">
                <div className="forca">
                    {imagem}
                    <div className="escolherPalavra">
                        <button onClick={inciarJogo} disabled={jogoIniciado} className="escolherPalavraP">
                            Escolher palavra
                        </button>
                        <div className={palavraIniciada === false ? "hidden" : `jogoIniciado ${acertouPrompt}`}>
                            {palavraRenderizada}
                            {palavraRevelada !== null ? palavraRevelada.map((i) => i) : false}
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