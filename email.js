class Email {

    constructor() {
        this._data = this.getView()

        this._solicitacao = {
            "agendamento": "AGENDAMENTO",
            "validacao": "VALIDAÇÃO",
            "escalonamento": "ESCALONAMENTO",
            "posicionamento": "POSICIONAMENTO",
        }
    }

    getView() {
        let data = {}

        data["cliente"] = document.querySelector("#emailCliente").value.toUpperCase()
        data["circuto"] = document.querySelector("#emailCircuito").value.toUpperCase()
        data["protocoloOi"] = document.querySelector("#emailProtocoloOi").value.toUpperCase()
        data["protocoloCliente"] = document.querySelector("#emailProtocoloCliente").value.toUpperCase()
        data["complemento"] = document.querySelector("#emailComplemento").value.toUpperCase()

        return data
    }

    agendamento() {
        this.makeMascara(this._data, this._solicitacao.agendamento)
    }

    validacao() {
        this.makeMascara(this._data, this._solicitacao.validacao)
    }

    escalonamento() {
        this.makeMascara(this._data, this._solicitacao.escalonamento)
    }

    posicionamento() {
        this.makeMascara(this._data, this._solicitacao.posicionamento)
    }

    makeMascara(data, solicitacao) {
        let mascara = `[OI][${data.cliente}][${solicitacao}] - ${data.circuto} - PROTOCOLO OI : ${data.protocoloOi}`
        
        if(data.protocoloCliente){
            mascara = mascara + ` - CHAMADO INTERNO : ${data.protocoloCliente}`
        }

        if(data.complemento){
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


// === BUTTONS ===