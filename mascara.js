let dataAbertura = document.querySelector("#dataAbertura").valeu

// --- Clipboard ---

function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    // to avoid breaking orgain page when copying more words
    // cant copy when adding below this code
    // dummy.style.display = 'none'
    document.body.appendChild(dummy);
    //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

// --- Botão Senha ---


function buttonSenha() {
    let senha = document.querySelector("#senha").value

    senha = "SENHA : " + senha

    copyToClipboard(senha)
}

// --- Botão Senha ---


// --- Botão Router ---

function router(params) {

    let horaRouter = null
    let minutoRouter = null

    let router = document.querySelector("#router").value // Pega o valor da caixa input

    router = router.toUpperCase() // Converte para caixa alta

    router = router.split(":") // Separa hora e minuto

    if (router.length >= 3) {

        horaRouter = router[0]
        minutoRouter = router[1]

    }
    else {
        router = router[0].split("H")
        horaRouter = router[0]

        router = router[1].split("M")
        minutoRouter = router[0]
    }

    let dataAtual = new Date()

    let hora = dataAtual.getHours()
    let minuto = dataAtual.getMinutes()
    let dia = dataAtual.getDate()
    let mes = dataAtual.getMonth() + 1
    let ano = dataAtual.getFullYear()

    minuto = minuto - minutoRouter

    if (minuto < 0) {
        hora = hora - 1
        minuto = minuto * (-1)
    }

    minuto = ("0" + minuto).slice(-2)

    hora = hora - horaRouter

    if (hora < 0) {

        do {
            dia = dia - 1
            hora = hora * (-1)
            hora = 24 - hora
        } while (hora < 0)

    }

    hora = ("0" + hora).slice(-2)

    let dataNormalizacao = dia + "/" + mes + "/" + ano + " " + hora + ":" + minuto + ":00"
    document.querySelector("#dataNormalizacao").value = dataNormalizacao
}

// --- Botão Router ---



function getView() {
    let data = {}

    data["oi"] = document.querySelector("#oi").value
    data["nome"] = document.querySelector("#nome").value.toUpperCase()
    data["abertura"] = document.querySelector("#dataAbertura").value
    data["normalizacao"] = document.querySelector("#dataNormalizacao").value
    data["router"] = document.querySelector("#router").value
    data["validacao"] = document.querySelector("#validacao").value
    data["senha"] = document.querySelector("#senha").value
    data["outraCausa"] = document.querySelector("#outraCausa").value.toUpperCase()
    data["checkboxCausaCliente"] = document.querySelector("#checkboxCausaCliente").checked

    let select = document.querySelector('#falha');
    data["falha"] = select.options[select.selectedIndex].text;

    return data
}

function makeMascara(data) {
    let mascara = " --- ENCERRAMENTO ---"

    if (data["senha"] != "") {
        mascara = mascara + ` > SENHA : ${data["senha"]}`
    }

    mascara = mascara + `\nCOLABORADOR : CGS SP - ${data["nome"]} - OI${data["oi"]}\n` +
        `FALHA : ${data["falha"]}\n` +
        `HORARIO DA FALHA : ${data["abertura"]}\n` +
        `HARARIO DE NORMALIZACAO : ${data["normalizacao"]}\n` +
        `CAUSA / SOLUCAO : ${data["causa"]} - ${data["solucao"]}\n` +
        `VALIDADO POR : ${data["validacao"]}`

    return mascara
}

function make(data, causa, solucao) {

    data["causa"] = causa
    data["solucao"] = solucao

    let m = makeMascara(data)
    copyToClipboard(m)
    console.log(m)
    // console.log(data)
    
}


class Mascara {

    constructor(){
        this._data = getView()

        this._causa = {
            "cliente":"CLIENTE",
            "operadora":"OPERADORA",
        }

        this._solucao = {
            "indevida":"ABERTURA INDEVIDA",
            "energia":"LOCAL SEM ENERGIA",
            "naoDetectada":"CAUSA NAO DETECTADA",

            "gabinete":"GABINETE QUEIMADO",
            "modem":"MODEM QUEIMADO, SUBSTITUIDO",
            "fibraRompimento":"ROMPIMENTO DE FIBRA, RECUPERADO",
            "redeaRompimento":"ROMPIMENTO DE FIBRA, RECUPERADO",
            "redeaManobra":"REDE METALICA COM DEFEITO, RECUPERADO",
        }
    }    
    
    // Causa Cliente
    reclamacaoIndevida() {
        make(this._data, this._causa.cliente, this._solucao.indevida)
    }
    localSemEnergia() {
        make(this._data, this._causa.cliente, this._solucao.energia)
    }

    // Causa Operadora
    causaNaoDetectada(){
        make(this._data, this._causa.operadora, this._solucao.naoDetectada)
    }
    gabineteQueimado(){
        make(this._data, this._causa.operadora, this._solucao.gabinete)
    }
    modemQueimado(){
        make(this._data, this._causa.operadora, this._solucao.modem)
    }
    fibraRompimento(){
        make(this._data, this._causa.operadora, this._solucao.fibraRompimento)
    }
    redeaRompimento(){
        make(this._data, this._causa.operadora, this._solucao.redeaRompimento)
    }
    redeaManobra(){
        make(this._data, this._causa.operadora, this._solucao.redeaManobra)
    }
    outraCausa(){
        make(this._data, this._causa.operadora, this._data["outraCausa"])
    }

}

function buttonReclamacaoIndevida() {
    m = new Mascara()
    m.reclamacaoIndevida()
}

function buttonLocalSemEnergia() {
    m = new Mascara()
    m.localSemEnergia()

}
function buttonCausaNaoDetectada() {
    m = new Mascara()
    m.causaNaoDetectada()
}

function buttonGabineteQueimado() {
    m = new Mascara()
    m.gabineteQueimado()
}

function buttonModemQueimado() {
    m = new Mascara()
    m.modemQueimado()
}

function buttonFibraRompimento() {
    m = new Mascara()
    m.fibraRompimento()
}

function buttonRedeaRompimento() {
    m = new Mascara()
    m.redeaRompimento()
}

function buttonRedeaManobra() {
    m = new Mascara()
    m.redeaManobra()
}

function buttonOutraCausa() {
    m = new Mascara()
    m.outraCausa()
}
