// === POSICIONAMENTO ===

function getScreenPosicionamento() {
    let data = {}

    data["posto"] = document.querySelector("#poPosto").value
    data["outroPosto"] = document.querySelector("#poOutroPosto").value.toUpperCase()
    data["descricaoPosto"] = document.querySelector("#poDescricaoPosto").value.toUpperCase()
    data["perimetro"] = document.querySelector("#poPerimetro").value
    data["ba"] = document.querySelector("#poBa").value
    data["causa"] = document.querySelector("#poCausa").value.toUpperCase()
    data["localidade"] = document.querySelector("#poLocalidade").value.toUpperCase()
    data["descricao"] = document.querySelector("#poDescricao").value.toUpperCase()
    data["escalonamento"] = document.querySelector("#poEscalonamento").value.toUpperCase()
    data["previsao"] = document.querySelector("#poPrevisao").value.toUpperCase()
    data["detalhes"] = document.querySelector("#poDetalhes").value.toUpperCase()
    data["log"] = document.querySelector("#poLog").value

    return data
}

class Posicionamento {
    constructor(data) {
        this.data = data
    }

    _poCabecalhoPosicionamento(data) {
        if (data.posto == "CLD") return `${data.posto} - & TECNICO DE CAMPO.\n`
        if (data.posto == "FIBRA") return `${data.posto} - ${data.perimetro} - BA ${data.ba} - & FALHA DE FIBRA.\n`
        if (data.posto == "TRANSMISSÃO") return `${data.posto} - ${data.perimetro} - BA ${data.ba} - & FALHA DE TRANSMISSÃO.\n`
        if (data.posto == "REDEA") return 'REDEA - & REDE METALICA ROMPIDA/COM DEFEITO.\n'
        if (data.posto == "OUTRO") return `${data.outroPosto} - & ${data.descricaoPosto}.\n`
    }

    _poCausa(data) {
        return data.causa == "" ? '' : `CAUSA : ${data.causa}.\n`
    }

    _poLocalidade(data) {
        return data.localidade == "" ? '' : `LOCALIDADE : ${data.localidade}.\n`
    }

    _poEscalonado(data) {
        return data.escalonamento == "" ? '' : `ESCALONADO : ${data.escalonamento}.\n`
    }

    _poDetalhes(data) {
        return data.detalhes == "" ? '' : `\nDETALHES :  ${data.detalhes}.`
    }

    _poLog(data) {
        return data.log == "" ? '' : `\nLOG'S :  ${data.log}.`
    }

    build() {
        return `${this._poCabecalhoPosicionamento(this.data)}` +
            
            `${this._poCausa(this.data)}` +
            `${this._poLocalidade(this.data)}` +
            `DESCRIÇÃO : ${this.data.descricao}.\n` +
            `${this._poEscalonado(this.data)}` +
            `PREVISÃO ESTIMADA/PROX. STATUS : ${this.data.previsao}. &` +
            `${this._poDetalhes(this.data)}` +
            `${this._poLog(this.data)}`
    }
}

function poButtonGerarPosicionamento() {
    let dataScreenPosicionamento = getScreenPosicionamento()
    let pos = new Posicionamento(dataScreenPosicionamento)
    copyToClipboard(
        pos.build()
    )
}

function poButtonEnviarEditor() {
    let dataScreenPosicionamento = getScreenPosicionamento()
    let pos = new Age(dataScreenPosicionamento)
    editorTextArea.value = pos.build() + "\n\n" + editorTextArea.value
    editor()
}

function poButtonLimpar() {
    document.querySelector("#poBa").value = ""
    document.querySelector("#poCausa").value = ""
    document.querySelector("#poLocalidade").value = ""
    document.querySelector("#poDescricao").value = ""
    document.querySelector("#poEscalonamento").value = ""
    document.querySelector("#poPrevisao").value = ""
    document.querySelector("#poDetalhes").value = ""
    document.querySelector("#poLog").value = ""
}



function mudarVisibilidadeOutroPosto () {   
    const selectPosicionamento = document.querySelector("#poPosto")
    const outroPosto = document.querySelector("#poCampoOutroPosto")
    
    if (selectPosicionamento.value == 'OUTRO') {
        outroPosto.classList.remove('is-hidden')
    } else {
        outroPosto.classList.add('is-hidden')
    }
}

// === /POSICIONAMENTO ===

// === AGENDAMENTO ===

function getScreenAgendamento() {
    let data = {}
    
    data["nomeDoTecnico"] = document.querySelector("#poNomeDoTecnico").value.toUpperCase()
    data["dataAgendamento"] = document.querySelector("#poDataAgendamento").value.toUpperCase()

    return data
}

class Agendamento {
    constructor(data) {
        this.data = data
    }

    _poNomeDoTecnico(data) {
        return `${data.nomeDoTecnico}.`
    }

    _poDataAgendamento(data) {
        let dateSplitDateHour = data.dataAgendamento.split("T")
        let dateSplitDate = dateSplitDateHour[0].split("-")

        return `${dateSplitDate[2]}/${dateSplitDate[1]}/${dateSplitDate[0]} AS ${dateSplitDateHour[1]}.`
    }

    build() {
        if (!this.data.nomeDoTecnico) return false
        if (!this.data.dataAgendamento) return false

        return `& AGENDADO PARA ${this._poDataAgendamento(this.data)}\n` +
        `DADOS DOS TECNICOS : \n` +
        `${this._poNomeDoTecnico(this.data)} &`
    }
}

function poButtonGerarTextoAgendamento() {
    let dataScreenAgendamento = getScreenAgendamento()
    let agenda = new Agendamento(dataScreenAgendamento)
    let agendaBuild = agenda.build()
    if (!agendaBuild){
        alert('Nome do tecnico ou data vazios !!!')
        return
    }
    copyToClipboard(agendaBuild)
}

function poButtonLimparAgendamento() {
    document.querySelector("#poNomeDoTecnico").value = ''
}

// === /AGENDAMENTO ===