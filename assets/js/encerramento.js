// === CALCULO DO ROUTER ===

class CalculateDateRouter {

    /**
     * Recede a tempo que o BGP esta up e devolve um dicionario com as informações splitadas.
     * @param {string} timeRouterUp Tempo que o BGP esta up.
     * @returns Dicionario com as informações splitadas.
     */
    splitTime(timeRouterUp) {

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

    }

    /**
     * Faz o calculo e converte para o formato data e hora
     * @param {string} timeRouter Recebe um dicionario com o tempo que o BGP esta UP.
     * @returns Retora uma dtring com a data - "DD/MM/YYYY kk:mm:ss"
     */
    calculateNormalizationDate(timeRouter) {

        return moment().subtract(timeRouter).format("DD/MM/YYYY kk:mm:ss");
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
    data["validacao"] = document.querySelector("#enValidation").value.toUpperCase()
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

    dataValidacao = moment().add(1, 'days').format("DD/MM/YYYY") + " 09:00 H"

    // Com checkbox setado vamos verificar agora qual opcão do radiocheck esta setada
    // Para isso usamos um for onde percorremos as opções

    for (var i = 0, length = data.radioPendenteCliente.length; i < length; i++) {

        // Conforme corremos com o for verificamos se a opção esta setada

        if (data["radioPendenteCliente"][i].checked) {

            // Se sim verificamos qual é essa opção com o switch

            switch (data["radioPendenteCliente"][i].value) {
                case '0':

                    return "\nPENDENTE VALIDAR COM CPD/RESIDENTE " + dataValidacao

                case '1':

                    return "\nPENDENTE VALIDAR COM RESIDENTE " + dataValidacao

                case '2':

                    return "\nSOLICITADO VALIDAÇÃO AO CPD/RESIDENTE"

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
    let opcoes = {
        "0": "CPD",
        "1": "RESIDENTE",
        "2": "CEC",
    }

    let opc = verificaRadio(data.radioValidacao)
    return opcoes[`${opc}`]
}

class BuildMascaraEncerramento {
    constructor(data) {
        this.data = data
    }

    _radioValidacao() {
        return verificaRadioValidacao(this.data)
    }

    _senha() {
        if (this.data.checkboxChamadoManual) return ` - SENHA : MANUAL, NAO POSSUI SENHA\n`
        return this.data.senha ? ` - SENHA : ${this.data["senha"]}\n` : '\n'
    }
    _colaborador() { return `COLABORADOR : CEC SP - ${this.data.nome} - OI${this.data.oi}\n` }
    _validacao() { return `CLIENTE AUTORIZADOR: ${this.data.validacao}` }
    _abertura() { return `FALHA INICIO : ${this.data.abertura}\n` }
    _normalizacao() { return `NORMALIZACAO: ${this.data.normalizacao}\n` }
    _causa() { return `CAUSA/SOLUCAO : [${this.data.causa}] ${this.data.solucao}\n` }
    _log() { return this.data.log ? "LOG: \n" + `${this.data.log}\n` : '' }

    build() {
        return `MASCARA DE ENCERRAMENTO${this._senha()}` +
            `${this._colaborador()}` +
            'ATENDIMENTO PERSONALIZADO\n' +
            `${this._abertura()}` +
            `${this._normalizacao()}` +
            `${this._validacao()}` + ` ${this._radioValidacao()}` + ` TEL: ${this.data.telefone}\n` +
            `${this._causa()}` +
            `${this._log()}`
    }
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
        m = new BuildMascaraEncerramento(data).build()
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

        let calcDateRouter = new CalculateDateRouter()

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
        document.querySelector("#enValidation").value = ""
        document.querySelector("#telefone").value = ""
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
    copyToClipboard("CASO NOVO. EM ANALISE.\n& CASO EM TRIAGEM NA REDE. &")
}

function buttonEncerrado() {
    copyToClipboard("ENCERRADO.")
}

function buttonAgendadoPara() {
    copyToClipboard("ENCERRADO.")
}

// === BUTTONS ===

function enButtonAddClientList() {
    const name = document.getElementById("enValidation").value

    if (!name) return

    const list = new List("enValidationList")
    list.addLine(name)

    const storage = LocalStorageSingleton.getInstance()
    storage.addLocalStorage("enValidationList", list.idLine, name)
    storage.updateLocalStorage()
}

function loadScreenEncerramento() {
    const storage = LocalStorageSingleton.getInstance()
    storage.downloadBrowserLocalStorage()

    const abClientListStorage = storage.getListLocalStorage("enValidationList")

    if (abClientListStorage) {
        const abClientList = new List("enValidationList")

        for (const key in abClientListStorage) {

            const nameLine = abClientListStorage[key]
            const idLine = key

            abClientList.addLine(nameLine, idLine)
        }
    }

}

const inputValidation = document.getElementById("enValidation")

inputValidation.addEventListener("focus", () => {
    document.getElementById("enValidationList").classList.add("open-list")
})

inputValidation.addEventListener("blur", () => {
    document.getElementById("enValidationList").classList.remove("open-list")

})