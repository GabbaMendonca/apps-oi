class Email {

    constructor() {
        this._data = this.getView()

        this._solicitacao = {
            "agendamento": "AGENDAMENTO",
            "validacao": "VALIDAÇÃO",
        }
    }

    getView() {
        let data = {}

        data["cliente"] = document.querySelector("#emailCliente").value.toUpperCase()
        data["circuto"] = document.querySelector("#emailCircuito").value.toUpperCase()
        data["protocoloOi"] = document.querySelector("#emailProtocoloOi").value.toUpperCase()
        data["protocoloCliente"] = document.querySelector("#emailProtocoloCliente").value.toUpperCase()

        return data
    }

    agendamento() {
        this.makeMascara(this._data, this._solicitacao.agendamento)
    }

    validacao() {
        this.makeMascara(this._data, this._solicitacao.validacao)
    }

    makeMascara(data, solicitacao) {
        let mascara = `[OI][${data.cliente}][${solicitacao}] - ${data.circuto} - ${data.protocoloOi} - ${data.protocoloCliente}`

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


// === BUTTONS ===