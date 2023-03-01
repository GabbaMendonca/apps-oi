// === ADD EVENTO DE ABRIR E FECHAR A LISTA ===

const inputValidation = document.getElementById("enValidation")

inputValidation.addEventListener("focus", () => {
    document.getElementById("enValidationList").classList.add("open-list")
})

inputValidation.addEventListener("blur", () => {
    document.getElementById("enValidationList").classList.remove("open-list")
})

// === /ADD EVENTO DE ABRIR E FECHAR A LISTA ===

// === CARREGAR OS DADOS SALVOS DA LISTA ===

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

// === /CARREGAR OS DADOS SALVOS DA LISTA ===


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

// === /CALCULO DO ROUTER ===

// ===  ===

function verificaRadioValidacao(data) {
    let opcoes = {
        "0": "CPD",
        "1": "RESIDENTE",
        "2": "CEC",
    }

    let opc = verificaRadio(data.radioValidacao)
    return opcoes[`${opc}`]
}

// === / ===

// === VIEW ENCWRRAMENTO ===

class ViewEncerramento {
    constructor() {
        this.data = this.getView()

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

    clearView() {
        document.querySelector("#dataAbertura").value = ""
        document.querySelector("#dataNormalizacao").value = ""
        document.querySelector("#router").value = ""
        document.querySelector("#enValidation").value = ""
        document.querySelector("#senha").value = ""
        document.querySelector("#outraCausa").value = ""
        document.querySelector("#enCircuito").value = ""
        document.querySelector("#enChamadoOi").value = ""
        document.querySelector("#checkboxCausaCliente").checked = false
        document.querySelector("#checkboxAguardandoValidacao").checked = false
        document.querySelector("#checkboxChamadoManual").checked = false
    }
    getView() {
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
        data["circuito"] = document.querySelector("#enCircuito").value.toUpperCase()
        data["chamadoOi"] = document.querySelector("#enChamadoOi").value.toUpperCase()
            // Checkbox
        data["checkboxCausaCliente"] = document.querySelector("#checkboxCausaCliente").checked
        data["checkboxMensagemRapida"] = document.querySelector("#checkboxAguardandoValidacao").checked
        data["checkboxMensagemValidacao"] = document.querySelector("#checkboxMensagemValidacao").checked
        data["checkboxChamadoManual"] = document.querySelector("#checkboxChamadoManual").checked
            // Radio
        data["radioPendenteCliente"] = document.getElementsByName("radioPendenteCliente")
        data["radioValidacao"] = document.getElementsByName("radioValidacao")
            // Log
        data["log"] = textareaLog.value
        return data
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

// === /VIEW ENCWRRAMENTO ===

// === FACTORY MENSAGENS ===

class MascaraEncerramento {
    constructor(data) {
        this._data = data
    }

    _senha() {
        if (this._data.checkboxChamadoManual) return ` - SENHA : MANUAL, NAO POSSUI SENHA\n`
        return this._data.senha ? ` - SENHA : ${this._data["senha"]}\n` : '\n'
    }
    _colaborador() { return `COLABORADOR : CEC SP - ${this._data.nome} - OI${this._data.oi}\n` }
    _abertura() { return `FALHA INICIO : ${this._data.abertura}\n` }
    _normalizacao() { return `NORMALIZACAO: ${this._data.normalizacao}\n` }
    _validacao() { return `CLIENTE AUTORIZADOR: ${this._data.validacao}` }
    _radioValidacao() { return verificaRadioValidacao(this._data) }
    _causa() {
        let solucao = this._data.solucao ? this._data.solucao : ''
        return `CAUSA/SOLUCAO : [${this._data.causa}] ${solucao}\n`
    }
    _log() { return this._data.log ? "LOG: \n" + `${this._data.log}\n` : '' }

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

class MensagensRapidas {
    constructor(data) {
        this._data = data
        this._dataValidacao = moment().add(1, 'days').format("DD/MM/YYYY") + " 09:00 H"
    }

    _radioMensagens() {
        let opcoes = {
            '0': "PENDENTE VALIDAR COM CPD/RESIDENTE " + this._dataValidacao,
            '1': "SOLICITADO VALIDAÇÃO AO CPD/RESIDENTE",
            '2': "EM MONITORAÇÃO POR 24 H",
            '3': "PENDENTE BAIXA DO POSTO",
            '4': "PENDENTE DIAGNOSTICO",
        }

        let opc = verificaRadio(this._data.radioPendenteCliente)
        return opcoes[`${opc}`]
    }

    build() {
        return `& NORMALIZADO. UP DESDE AS ${this._data.normalizacao}.\n` +
            `${this._data.solucao}.` +
            `\n${this._radioMensagens()}. &`
    }
}

class MensagensValidacao{
    constructor(data) {
        this._data = data
    }

    build(){
        return `*VALIDAÇÃO*\n` +
        `Boa Tarde !\n` +
        `Poderia validar por gentileza ?\n\n` +
        `Chamado OI : ${this._data.chamadoOi}.\n` +
        `Circuito : ${this._data.circuito}.\n\n` +
        `Causa : ${this._data.solucao}.`
    }
}

class FactoryEncerramento {
    constructor(data) {
        this._data = data
    }

    _mascaraEncerramento() {
        return new MascaraEncerramento(this._data).build()
    }
    _mensagemRapida() {
        return new MensagensRapidas(this._data).build()
    }
    _mensagemValidacao() {
        return new MensagensValidacao(this._data).build()
    }

    build(){
        if (this._data.checkboxMensagemRapida){
            return this._mensagemRapida()
        }
        if (this._data.checkboxMensagemValidacao){
            return this._mensagemValidacao()
        }
        return this._mascaraEncerramento()
    }
}

// === /FACTORY MENSAGENS ===

// === BUTTONS/ROUTES/CONTROLLERS ===

function buttonLimpar() {
    let viewEncerramento = new ViewEncerramento()
    viewEncerramento.clearView()
    modalButtonLimpar()
}

function buttonCalcularRouter() {
    let calcDateRouter = new CalculateDateRouter()
    let screen = new ViewEncerramento()

    let timeRouterSplit = calcDateRouter.splitTime(screen.data.router)
    let dateRouterUp = calcDateRouter.calculateNormalizationDate(timeRouterSplit)

    document.querySelector("#dataNormalizacao").value = dateRouterUp
}

function buttonCopyDataNormalizacao() {
    let screen = new ViewEncerramento()
    copyToClipboard(screen.data.normalizacao)
}

function buttonCopyValidacao() {
    let screen = new ViewEncerramento()
    copyToClipboard(
        screen.data.validacao + " " + verificaRadioValidacao(screen.data)
    )
}

function buttonCopySenha() {
    let screen = new ViewEncerramento()
    copyToClipboard("SENHA : " + screen.data.senha)
}

function buttonReclamacaoIndevida() {
    let factoryEncenrramento = new FactoryEncerramento(new ViewEncerramento().aberturaIndevida())
    copyToClipboard(factoryEncenrramento.build())
}

function buttonLocalSemEnergia() {
    let factoryEncenrramento = new FactoryEncerramento(new ViewEncerramento().localSemEnergia())
    copyToClipboard(factoryEncenrramento.build())
}

function buttonCausaNaoDetectada() {
    let factoryEncenrramento = new FactoryEncerramento(new ViewEncerramento().causaNaoDetectada())
    copyToClipboard(factoryEncenrramento.build())
}

function buttonGabineteQueimado() {
    let factoryEncenrramento = new FactoryEncerramento(new ViewEncerramento().gabineteQueimado())
    copyToClipboard(factoryEncenrramento.build())
}

function buttonModemQueimado() {
    let factoryEncenrramento = new FactoryEncerramento(new ViewEncerramento().modemQueimado())
    copyToClipboard(factoryEncenrramento.build())
}

function buttonFibraRompimento() {
    let factoryEncenrramento = new FactoryEncerramento(new ViewEncerramento().fibraRompimento())
    copyToClipboard(factoryEncenrramento.build())
}

function buttonRedeaRompimento() {
    let factoryEncenrramento = new FactoryEncerramento(new ViewEncerramento().redeaRompimento())
    copyToClipboard(factoryEncenrramento.build())
}

function buttonRedeaManobra() {
    let factoryEncenrramento = new FactoryEncerramento(new ViewEncerramento().redeaManobra())
    copyToClipboard(factoryEncenrramento.build())
}

function buttonFalhaPABX() {
    let factoryEncenrramento = new FactoryEncerramento(new ViewEncerramento().buttonFalhaPABX())
    copyToClipboard(factoryEncenrramento.build())
}

function buttonOutraCausa() {
    let factoryEncenrramento = new FactoryEncerramento(new ViewEncerramento().outraCausa())
    copyToClipboard(factoryEncenrramento.build())
}

function buttonComutadoNaRota() {
    let factoryEncenrramento = new FactoryEncerramento(new ViewEncerramento().comutadoNaRota())
    copyToClipboard(factoryEncenrramento.build())
}

function buttonCasoNovo() {
    copyToClipboard("CASO NOVO. EM ANALISE.\n& CASO EM TRIAGEM NA REDE. &")
}

function buttonEncerrado() {
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

// === BUTTONS/ROUTES/CONTROLLERS ===