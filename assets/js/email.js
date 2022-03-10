class Email {

    constructor() {
        this._data = this._getView()

        this._solicitacao = {
            "agendamento": "AGENDAMENTO",
            "validacao": "VALIDAÇÃO",
            "escalonamento": "ESCALONAMENTO",
            "posicionamento": "POSICIONAMENTO",
        }
    }

    _getView() {
        let data = {}

        data["cliente"] = document.querySelector("#emailCliente").value.toUpperCase()
        data["circuto"] = document.querySelector("#emailCircuito").value.toUpperCase()
        data["protocoloOi"] = document.querySelector("#emailProtocoloOi").value.toUpperCase()
        data["protocoloCliente"] = document.querySelector("#emailProtocoloCliente").value.toUpperCase()
        data["complemento"] = document.querySelector("#emailComplemento").value.toUpperCase()

        return data
    }

    agendamento() {
        this._makeMascara(this._data, this._solicitacao.agendamento)
    }

    validacao() {
        this._makeMascara(this._data, this._solicitacao.validacao)
    }

    escalonamento() {
        this._makeMascara(this._data, this._solicitacao.escalonamento)
    }

    posicionamento() {
        this._makeMascara(this._data, this._solicitacao.posicionamento)
    }

    limpar() {

        document.querySelector("#emailCliente").value = ""
        document.querySelector("#emailCircuito").value = ""
        document.querySelector("#emailProtocoloOi").value = ""
        document.querySelector("#emailProtocoloCliente").value = ""
        document.querySelector("#emailComplemento").value = ""

    }

    _makeMascara(data, solicitacao) {
        let mascara = `[OI][${data.cliente}][${solicitacao}] - ${data.circuto} - PROTOCOLO OI : ${data.protocoloOi}`

        if (data.protocoloCliente) {
            mascara = mascara + ` - CHAMADO INTERNO : ${data.protocoloCliente}`
        }

        if (data.complemento) {
            mascara = mascara + ` - ${data.complemento}`
        }

        copyToClipboard(mascara)
    }
}


// ===  ===


// === BUTTONS ===


function buttonEmailAgendamento() {
    e = new Email()
    e.agendamento()
}

function buttonEmailValidacao() {
    e = new Email()
    e.validacao()
}

function buttonEmailEscalonamento() {
    e = new Email()
    e.escalonamento()
}

function buttonEmailPosicionamento() {
    e = new Email()
    e.posicionamento()
}

function buttonEmailLimpar() {
    e = new Email()
    e.limpar()
}


// === BUTTONS ===