function getScreenPosicionamento() {
    let data = {}

    data["posto"] = document.querySelector("#poPosto").value
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
            `PREVISÃO ESTIMADA/PROX. STATUS : ${this.data.previsao}.` +
            `${this._poDetalhes(this.data)}` +
            `${this._poLog(this.data)} &`
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
    let posicionamento = new Posicionamento(dataScreenPosicionamento)
    editorTextArea.value = posicionamento.posicionamento() + editorTextArea.value
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