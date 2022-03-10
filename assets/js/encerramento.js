// === CALCULO DO ROUTER ===

function CalculateDateRouter() {

    return {

        splitTime: (timeRouterUp) => {

            /* Recede a tempo que o BGP esta up e devolve um dicionario com as informações splitadas.  */

            let timeRouter = {}

            timeRouterUp = timeRouterUp.toUpperCase()

            if (timeRouterUp.includes("D")) {

                let timeRouterSplit = timeRouterUp.split("D")
                let timeRouterDay = timeRouterSplit[0]

                timeRouterSplit = timeRouterSplit[1].split("H")
                let timeRouterHour = timeRouterSplit[0]

                timeRouterSplit = timeRouterSplit[1].split("M")
                let timeRouterMin = timeRouterSplit[0]

                timeRouter["day"] = timeRouterDay
                timeRouter["hour"] = timeRouterHour
                timeRouter["minute"] = timeRouterMin

                return timeRouter

            }

            if (timeRouterUp.includes("H")) {

                let timeRouterSplit = timeRouterUp.split("H")
                let timeRouterHour = timeRouterSplit[0]

                timeRouterSplit = timeRouterSplit[1].split("M")
                let timeRouterMin = timeRouterSplit[0]

                timeRouter["hour"] = timeRouterHour
                timeRouter["minute"] = timeRouterMin

                return timeRouter

            }

            if (timeRouterUp.includes(":")) {

                timeRouterUp = timeRouterUp.split(":")

                timeRouter["hour"] = timeRouterUp[0]
                timeRouter["minute"] = timeRouterUp[1]

                return timeRouter

            }

        },

        calculateNormalizationDate: (timeRouter) => {

            /* Recebe um dicionario com o tempo que o BGP esta UP,
            faz a conta e converte para o formato data e hora */

            return moment().subtract(timeRouter).format("DD/MM/YYYY kk:mm:ss");
        }
    }
}

// === CALCULO DO ROUTER ===


// === VIEW  ===


function getViewEncerramento() {
    let data = {}

    // Input
    data["oi"] = document.querySelector("#oi").value
    data["nome"] = document.querySelector("#nome").value.toUpperCase()
    data["abertura"] = document.querySelector("#dataAbertura").value
    data["encerramento"] = document.querySelector("#dataEncerramento").value
    data["normalizacao"] = document.querySelector("#dataNormalizacao").value
    data["router"] = document.querySelector("#router").value
    data["validacao"] = document.querySelector("#validacao").value.toUpperCase()
    data["telefone"] = document.querySelector("#telefone").value.toUpperCase()
    data["senha"] = document.querySelector("#senha").value.toUpperCase()
    data["outraCausa"] = document.querySelector("#outraCausa").value.toUpperCase()

    // Checkbox
    data["checkboxCausaCliente"] = document.querySelector("#checkboxCausaCliente").checked
    data["checkboxAguardandoValidacao"] = document.querySelector("#checkboxAguardandoValidacao").checked
    data["checkboxChamadoManual"] = document.querySelector("#checkboxChamadoManual").checked

    // Radio
    data["radioPendenteCliente"] = document.getElementsByName("radioPendenteCliente")
    data["radioValidacao"] = document.getElementsByName("radioValidacao")

    // Select
    // let select = document.querySelector('#falha');
    // data["falha"] = select.options[select.selectedIndex].text;

    // Log
    data["log"] = textareaLog.value

    return data
}


// === VIEW ===


// === MAKE MASCARA ===

function verificaRadioPendenteValidar(data) {

    date = getDate()
    dataValidacao = (date.dia + 1) + "/" + date.mes + "/" + date.ano + " 09:00 H"

    // Com checkbox setado vamos verificar agora qual opcão do radiocheck esta setada
    // Para isso usamos um for onde percorremos as opções

    for (var i = 0, length = data.radioPendenteCliente.length; i < length; i++) {

        // Conforme corremos com o for verificamos se a opção esta setada

        if (data["radioPendenteCliente"][i].checked) {

            // Se sim verificamos qual é essa opção com o switch

            switch (data["radioPendenteCliente"][i].value) {
                case '0':

                    return "\nPENDENTE VALIDAR COM CPD " + dataValidacao

                case '1':

                    return "\nPENDENTE VALIDAR COM RESIDENTE " + dataValidacao

                case '2':

                    return "\nSOLICITADO VALIDAÇÃO AO CPD"

                case '3':

                    return "\nEM MONITORAÇÃO POR 24 H"

                case '5':

                    return "\nPENDENTE BAIXA DO POSTO"

                case '4':

                    return "\nPENDENTE DIAGNOSTICO"

                default:
                    alert("Esse não tem !!!");
            }

            // Apenas um rádio pode ser verificado logicamente,
            // interrompemos o resto
            break;
        }
    }
}


function verificaRadioValidacao(data) {
    for (var i = 0, length = data["radioValidacao"].length; i < length; i++) {

        if (data["radioValidacao"][i].checked) {

            switch (data["radioValidacao"][i].value) {
                case '0':

                    return " CPD"

                case '1':

                    return " RESIDENTE"

                case '2':

                    return " CGS"

                default:
                    alert("Esse não tem !!!");
            }

            break;
        }
    }
}

function makeEncerramento(data) {

    // Monta as linha por linha a mascara de encerramento.

    let mascara = "MASCARA DE ENCERRAMENTO\n"

    mascara += "PREMIUM | PERIMETRO: VTAL\n"


    // Campo  CLIENTE AUTORIZADOR:   TEL:
    // Valida o Radio Button : CPD - RESIDENTE - CGS
    mascara += `CLIENTE AUTORIZADOR: ${data.validacao}`
    mascara += verificaRadioValidacao(data)
    mascara += ` TEL: ${data.telefone}\n`


    mascara += `FALHA INICIO : ${data.abertura}\n`


    // Verifica se o campo "FALHA FIM" esta prenchido, se estiver usa a data do campo.
    // Se não estiver prenche com a data atual.
    if (data.encerramento == "") {

        d = getDate()
        mascara += `FALHA FIM: ${d.dia}/${d.mes}/${d.ano} ${d.hora}:${d.minuto}\n`

    } else {
        mascara += `FALHA FIM: ${data.encerramento}\n`
    }


    mascara += `NORMALIZACAO: ${data.normalizacao}\n`
    mascara += `CAUSA/SOLUCAO : [${data.causa}] ${data.solucao}\n`

    // Verifica o campo LOG esta vazio
    if (data.log) {

        mascara = mascara + "LOG: \n" +
            `${data.log}\n`

    }


    mascara += `COLABORADOR : CGS SP - ${data["nome"]} - OI${data["oi"]}\n`


    // Verifcia se tem senha de enceramento a ser anexada
    if (data["checkboxChamadoManual"]) {
        mascara = mascara + `SENHA : MANUAL, NAO POSSUI SENHA\n`

    } else {

        if (data["senha"] != "") {
            mascara = mascara + `SENHA : ${data["senha"]}\n`
        }

    }


    return mascara
}

function makeValidacao(data) {



    let mascara = `NORMALIZADO. UP DESDE AS ${data["normalizacao"]}\n` +
        `${data["solucao"]}`

    mascara += verificaRadioPendenteValidar(data)

    e = new Editor()
    mascara = e.posicionar(mascara)

    return mascara
}

function makeMascara(data, causa, solucao) {

    data["causa"] = causa
    data["solucao"] = solucao

    // Verifica se o Checkbox "Aguardando Validação ?" esta setado.
    // Se estiver muda a mensagem a ser copiada para a area de transferencia,
    // ao inves da mascara de enceramento, copia a mensagem, 
    // aguardando a validação do cliente.
    // Caso contrario copia a mascara de encerramento.

    if (data["checkboxAguardandoValidacao"]) {

        m = makeValidacao(data)

    } else {

        m = makeEncerramento(data)
    }

    copyToClipboard(m)

}


// === MAKE MASCARA ===


// ===  ===


class Mascara {

    constructor() {
        this._data = getViewEncerramento()

        this._causa = {
            "cliente": "CLIENTE",
            "operadora": "OPERADORA",
        }

        this._solucao = {
            "indevida": "ABERTURA INDEVIDA",
            "energia": "LOCAL SEM ENERGIA",
            "naoDetectada": "CAUSA NAO DETECTADA",

            "gabinete": "GABINETE QUEIMADO, SUBSTITUIDO",
            "modem": "MODEM QUEIMADO, SUBSTITUIDO",
            "fibraRompimento": "ROMPIMENTO DE FIBRA, RECUPERADO",
            "redeaRompimento": "REDE METALICA COM DEFEITO, RECUPERADO",
            "redeaManobra": "REDE METALICA COM DEFEITO, MANOBRADO",
            "falhaPABX": "FALHA NO PABX DO CLIENTE",
        }
    }

    calcularRouter() {

        let calcDateRouter = CalculateDateRouter()

        let timeRouterUp = calcDateRouter.splitTime(this._data.router)
        return calcDateRouter.calculateNormalizationDate(timeRouterUp)

    }

    CopyDataNormalizacao() {
        copyToClipboard(this._data["normalizacao"])
    }

    copyValidacao() {
        let validado = this._data["validacao"].toUpperCase()
        validado = validado + verificaRadioValidacao(this._data)

        copyToClipboard(validado)
    }
    copySenha() {
        copyToClipboard("SENHA : " + this._data["senha"])
    }


    limpar() {
        document.querySelector("#dataAbertura").value = ""
        document.querySelector("#dataNormalizacao").value = ""
        document.querySelector("#router").value = ""
        document.querySelector("#validacao").value = ""
        document.querySelector("#senha").value = ""
        document.querySelector("#outraCausa").value = ""
        document.querySelector("#checkboxCausaCliente").checked = false
        document.querySelector("#checkboxAguardandoValidacao").checked = false
        document.querySelector("#checkboxChamadoManual").checked = false
        modalButtonLimpar()

    }


    // Causa Cliente
    reclamacaoIndevida() {
        makeMascara(this._data, this._causa.cliente, this._solucao.indevida)
    }
    localSemEnergia() {
        makeMascara(this._data, this._causa.cliente, this._solucao.energia)
    }

    // Causa Operadora
    causaNaoDetectada() {
        makeMascara(this._data, this._causa.operadora, this._solucao.naoDetectada)
    }
    gabineteQueimado() {
        makeMascara(this._data, this._causa.operadora, this._solucao.gabinete)
    }
    modemQueimado() {
        makeMascara(this._data, this._causa.operadora, this._solucao.modem)
    }
    fibraRompimento() {
        makeMascara(this._data, this._causa.operadora, this._solucao.fibraRompimento)
    }
    redeaRompimento() {
        makeMascara(this._data, this._causa.operadora, this._solucao.redeaRompimento)
    }
    redeaManobra() {
        makeMascara(this._data, this._causa.operadora, this._solucao.redeaManobra)
    }

    // Voz
    buttonFalhaPABX() {
        makeMascara(this._data, this._causa.cliente, this._solucao.falhaPABX)
    }

    // Outra Falha
    outraCausa() {

        if (this._data["checkboxCausaCliente"]) {
            makeMascara(this._data, this._causa.cliente, this._data.outraCausa)
        } else {
            makeMascara(this._data, this._causa.operadora, this._data.outraCausa)
        }

    }
}


// ===  ===


// === BUTTONS ===


function buttonLimpar() {
    m = new Mascara()
    m.limpar()
}

function buttonCalcularRouter() {
    m = new Mascara()
    document.querySelector("#dataNormalizacao").value = m.calcularRouter()
}

function buttonCopyDataNormalizacao() {
    m = new Mascara()
    m.CopyDataNormalizacao()
}

function buttonCopyValidacao() {
    m = new Mascara()
    m.copyValidacao()
}

function buttonCopySenha() {
    m = new Mascara()
    m.copySenha()
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

function buttonFalhaPABX() {
    m = new Mascara()
    m.buttonFalhaPABX()
}

function buttonOutraCausa() {
    m = new Mascara()
    m.outraCausa()
}

function buttonCasoNovo() {
    copyToClipboard("CASO NOVO. EM ANALISE.")
}

function buttonEncerrado() {
    copyToClipboard("ENCERRADO.")
}

function buttonAgendadoPara() {
    copyToClipboard("ENCERRADO.")
}

// === BUTTONS ===