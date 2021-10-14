class Abertura {

    constructor() {
        this._data = this._getView()
    }

    _getView() {
        let data = {}

        // input
        data["oi"] = document.querySelector("#oi").value
        data["nome"] = document.querySelector("#nome").value.toUpperCase()
            // esquerda
        data["abCircuito"] = document.querySelector("#abCircuito").value
            //centro
        data["abCPD"] = document.querySelector("#abTextareaCPD").value
        data["abContatoLocal"] = document.querySelector("#abTextareaContatoLocal").value
        data["abAcesso"] = document.querySelector("#abAcesso").value
        data["abEmail"] = document.querySelector("#abEmail").value
            //direita
        data["abChamadoInterno"] = document.querySelector("#abChamadoInterno").value
        data["abChamadoInterno"] = document.querySelector("#abChamadoInterno").value

        //checkbox
        data["checkboxCausaCliente"] = document.querySelector("#checkboxCausaCliente").checked

        // Radio
        // esquerda
        data["abCritico"] = document.getElementsByName("abRadioCritico")
        data["abProativo"] = document.getElementsByName("abRadioProativo")
        data["abReincidente"] = document.getElementsByName("abRadioReincidente")
            //esqueda
        data["abTs"] = document.getElementsByName("abTs")
        data["abBackup"] = document.getElementsByName("abBackup")
        data["abEletrica"] = document.getElementsByName("abEletrica")
        data["abReset"] = document.getElementsByName("abReset")

        // Select
        let select = document.querySelector('#abFalha');
        data["abFalha"] = select.options[select.selectedIndex].text;

        // Log
        data["log"] = textareaLog.value

        return data
    }

    limpar() {

        // input
        document.querySelector("#oi").value = ''
        document.querySelector("#nome").value = ''
            // esquerda
        document.querySelector("#abCircuito").value = ''
            //centro
        document.querySelector("#abTextareaCPD").value = ''
        document.querySelector("#abTextareaContatoLocal").value = ''
        document.querySelector("#abAcesso").value = ''
        document.querySelector("#abEmail").value = ''
            //direita
        document.querySelector("#abChamadoInterno").value = ''
        document.querySelector("#abChamadoInterno").value = ''

        textareaLog.value = ''

    }

    gerarMascara() {
        this._makeMascara(this._data)
    }

    _makeMascara(data) {

        // radio do proativo e reincidente
        let radio1 = {
            '0': 'Sim',
            '1': 'Não',
            'false': '',
        }

        // radio do TS
        let radio2 = {
            '0': 'OK',
            '1': 'Pendente',
            '2': 'Sem Sucesso',
            'false': '',
        }

        //radio com backup, eletrica e reset
        let radio3 = {
            '0': 'Sim',
            '1': 'Não',
            '2': 'Sem Confirmação',
            'false': '',
        }

        // let opcCritico = radio1[verificaRadio(this._data["abCritico"])]
        let opcProativo = radio1[verificaRadio(data["abProativo"])]
        let opcReincidente = radio1[verificaRadio(data["abReincidente"])]

        let opcTS = radio2[verificaRadio(data["abTs"])]

        let opcBackup = radio3[verificaRadio(data["abBackup"])]
        let opcEletrica = radio3[verificaRadio(data["abEletrica"])]
        let opcReset = radio3[verificaRadio(data["abReset"])]



        let mascara =
            `COLABORADOR : CGS SP - ${data["nome"]} - OI${data["oi"]}
Proativo : ${opcProativo}
Reincidente : ${opcReincidente}
Cicuito : ${data["abCPD"]}

CPD : ${data["abCPD"]}
Contato Local : ${data["abContatoLocal"]}
Horario de Acesso : ${data["abAcesso"]}
Chamado Interno  : ${data["abChamadoInterno"]}
Email  : ${data["abEmail"]}

Reclamacao : ${data["abFalha"]}
TS : ${opcTS}
Possui Backup : ${opcBackup}
Energia Eletrica : ${opcEletrica}
Reset Nos Equipamentos : ${opcReset}`

        if (data["log"] != '') {
            mascara += `\n--- LOG --- \n${data["log"]}`
        }

        console.log(mascara)
    }
}

function abButtonLimpar() {
    a = new Abertura()
    a.limpar()
}

function abGerarMascara() {
    a = new Abertura()
    a.gerarMascara()
}