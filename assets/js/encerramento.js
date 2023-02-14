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

    _senha() {
        if (this.data.checkboxChamadoManual) return ` - SENHA : MANUAL, NAO POSSUI SENHA\n`
        return this.data.senha ? ` - SENHA : ${this.data["senha"]}\n` : '\n'
    }
    _colaborador() { return `COLABORADOR : CEC SP - ${this.data.nome} - OI${this.data.oi}\n` }
    _abertura() { return `FALHA INICIO : ${this.data.abertura}\n` }
    _normalizacao() { return `NORMALIZACAO: ${this.data.normalizacao}\n` }
    _validacao() { return `CLIENTE AUTORIZADOR: ${this.data.validacao}` }
    _radioValidacao() { return verificaRadioValidacao(this.data) }
    _causa() {
        let solucao = this.data.solucao ? this.data.solucao : ''
        return `CAUSA/SOLUCAO : [${this.data.causa}] ${solucao}\n`
    }
    _log() { return this.data.log ? "LOG: \n" + `${this.data.log}\n` : '' }

    build() {
        return `MASCARA DE ENCERRAMENTO${this._senha()}` +
            `${this._colaborador()}` +
            'ATENDIMENTO PERSONALIZADO\n' +
            `${this._abertura()}` +
            `${this._normalizacao()}` +
            `${this._validacao()}` + ` ${this._radioValidacao()}\n` +
            `${this._causa()}` +
            `${this._log()}`
    }
}

class BuildMensagensRapidas {
    constructor(data) {
        this.data = data
        this.dataValidacao = moment().add(1, 'days').format("DD/MM/YYYY") + " 09:00 H"
    }

    _radioMensagens() {
        let opcoes = {
            '0': "PENDENTE VALIDAR COM CPD/RESIDENTE " + this.dataValidacao,
            '1': "SOLICITADO VALIDAÇÃO AO CPD/RESIDENTE",
            '2': "EM MONITORAÇÃO POR 24 H",
            '3': "PENDENTE BAIXA DO POSTO",
            '4': "PENDENTE DIAGNOSTICO",
        }

        let opc = verificaRadio(this.data.radioPendenteCliente)
        return opcoes[`${opc}`]
    }

    build() {
        return `& NORMALIZADO. UP DESDE AS ${this.data.normalizacao}.\n` +
            `${this.data.solucao}.` +
            `\n${this._radioMensagens()}. &`
    }
}

class Encerramento {
    constructor(data) {
        this.data = data
        this.data.checkboxMensagemRapida ? this._mensagemRapida() : this._encerramento()
    }

    _encerramento() {
        copyToClipboard(
            new BuildMascaraEncerramento(this.data).build()
        )
    }
    _mensagemRapida() {
        copyToClipboard(
            new BuildMensagensRapidas(this.data).build()
        )
    }
}

function getScrenEncerramento() {
    let data = {}
        // Input
    data["oi"] = document.querySelector("#oi").value
    data["nome"] = document.querySelector("#nome").value.toUpperCase()
    data["abertura"] = document.querySelector("#dataAbertura").value
    data["normalizacao"] = document.querySelector("#dataNormalizacao").value
    data["router"] = document.querySelector("#router").value
    data["validacao"] = document.querySelector("#enValidation").value.toUpperCase()
    data["senha"] = document.querySelector("#senha").value.toUpperCase()
    data["outraCausa"] = document.querySelector("#outraCausa").value.toUpperCase()
        // Checkbox
    data["checkboxCausaCliente"] = document.querySelector("#checkboxCausaCliente").checked
    data["checkboxMensagemRapida"] = document.querySelector("#checkboxAguardandoValidacao").checked
    data["checkboxChamadoManual"] = document.querySelector("#checkboxChamadoManual").checked
        // Radio
    data["radioPendenteCliente"] = document.getElementsByName("radioPendenteCliente")
    data["radioValidacao"] = document.getElementsByName("radioValidacao")
        // Log
    data["log"] = textareaLog.value
    return data
}

class ScrenEncerramento {
    constructor() {
        this.data = getScrenEncerramento()

        this._causa = {
            "cliente": "CLIENTE",
            "operadora": "OPERADORA",
        }

        this._solucao = {
            "aberturaIndevida": "ABERTURA INDEVIDA",
            "localSemEnergia": "LOCAL SEM ENERGIA",
            "causaNaoDetectada": "CAUSA NAO DETECTADA",

            "gabineteQueimado": "GABINETE QUEIMADO, SUBSTITUIDO",
            "modemQueimado": "MODEM QUEIMADO, SUBSTITUIDO",
            "fibraRompimento": "ROMPIMENTO DE FIBRA, RECUPERADO",
            "redeaRompimento": "REDE METALICA COM DEFEITO, RECUPERADO",
            "redeaManobra": "REDE METALICA COM DEFEITO, MANOBRADO",
            "comutadoNaRota": "COMUTADO NA ROTA",
            "falhaPABX": "FALHA NO PABX DO CLIENTE",
        }
    }

    aberturaIndevida() {
        this.data.causa = this._causa.cliente
        this.data.solucao = this._solucao.aberturaIndevida
        return this.data
    }
    localSemEnergia() {
        this.data.causa = this._causa.cliente
        this.data.solucao = this._solucao.localSemEnergia
        return this.data
    }
    causaNaoDetectada() {
        this.data.causa = this._causa.operadora
        this.data.solucao = this._solucao.causaNaoDetectada
        return this.data
    }
    gabineteQueimado() {
        this.data.causa = this._causa.operadora
        this.data.solucao = this._solucao.gabineteQueimado
        return this.data
    }
    modemQueimado() {
        this.data.causa = this._causa.operadora
        this.data.solucao = this._solucao.modemQueimado
        return this.data
    }
    fibraRompimento() {
        this.data.causa = this._causa.operadora
        this.data.solucao = this._solucao.fibraRompimento
        return this.data
    }
    redeaRompimento() {
        this.data.causa = this._causa.operadora
        this.data.solucao = this._solucao.redeaRompimento
        return this.data
    }
    redeaManobra() {
        this.data.causa = this._causa.operadora
        this.data.solucao = this._solucao.redeaManobra
        return this.data
    }
    comutadoNaRota() {
        this.data.causa = this._causa.operadora
        this.data.solucao = this._solucao.comutadoNaRota
        return this.data
    }
    buttonFalhaPABX() {
        this.data.causa = this._causa.operadora
        this.data.solucao = this._solucao.falhaPABX
        return this.data
    }
    outraCausa() {
        this.data.causa = this.data.checkboxCausaCliente ? this._causa.cliente : this._causa.operadora
        this.data.solucao = this.data.outraCausa
        return this.data
    }
}

// === BUTTONS ===

function buttonLimpar() {
    document.querySelector("#dataAbertura").value = ""
    document.querySelector("#dataNormalizacao").value = ""
    document.querySelector("#router").value = ""
    document.querySelector("#enValidation").value = ""
    document.querySelector("#senha").value = ""
    document.querySelector("#outraCausa").value = ""
    document.querySelector("#checkboxCausaCliente").checked = false
    document.querySelector("#checkboxAguardandoValidacao").checked = false
    document.querySelector("#checkboxChamadoManual").checked = false
    modalButtonLimpar()
}

function buttonCalcularRouter() {
    let calcDateRouter = new CalculateDateRouter()
    let screen = new ScrenEncerramento()

    let timeRouterSplit = calcDateRouter.splitTime(screen.data.router)
    let dateRouterUp = calcDateRouter.calculateNormalizationDate(timeRouterSplit)

    document.querySelector("#dataNormalizacao").value = dateRouterUp
}

function buttonCopyDataNormalizacao() {
    let screen = new ScrenEncerramento()
    copyToClipboard(screen.data.normalizacao)
}

function buttonCopyValidacao() {
    let screen = new ScrenEncerramento()
    copyToClipboard(
        screen.data.validacao + " " + verificaRadioValidacao(screen.data)
    )
}

function buttonCopySenha() {
    let screen = new ScrenEncerramento()
    copyToClipboard("SENHA : " + screen.data.senha)
}

function buttonReclamacaoIndevida() {
    new Encerramento(
        new ScrenEncerramento().aberturaIndevida()
    )
}

function buttonLocalSemEnergia() {
    new Encerramento(
        new ScrenEncerramento().localSemEnergia()
    )
}

function buttonCausaNaoDetectada() {
    new Encerramento(
        new ScrenEncerramento().causaNaoDetectada()
    )
}

function buttonGabineteQueimado() {
    new Encerramento(
        new ScrenEncerramento().gabineteQueimado()
    )
}

function buttonModemQueimado() {
    new Encerramento(
        new ScrenEncerramento().modemQueimado()
    )
}

function buttonFibraRompimento() {
    new Encerramento(
        new ScrenEncerramento().fibraRompimento()
    )
}

function buttonRedeaRompimento() {
    new Encerramento(
        new ScrenEncerramento().redeaRompimento()
    )
}

function buttonRedeaManobra() {
    new Encerramento(
        new ScrenEncerramento().redeaManobra()
    )
}

function buttonFalhaPABX() {
    new Encerramento(
        new ScrenEncerramento().buttonFalhaPABX()
    )
}

function buttonOutraCausa() {
    new Encerramento(
        new ScrenEncerramento().outraCausa()
    )
}

function buttonComutadoNaRota() {
    new Encerramento(
        new ScrenEncerramento().comutadoNaRota()
    )
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

function enButtonAddClientList() {
    const name = document.getElementById("enValidation").value

    if (!name) return

    const list = new List("enValidationList")
    list.addLine(name)

    const storage = LocalStorageSingleton.getInstance()
    storage.addLocalStorage("enValidationList", list.idLine, name)
    storage.updateLocalStorage()
}

// === /BUTTONS ===

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