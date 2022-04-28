class Abertura {

    constructor() {
        this._data = this._getView()
    }

    _getView() {
        let data = {}

        // cabeçalho
        data["oi"] = document.querySelector("#oi").value
        data["nome"] = document.querySelector("#nome").value.toUpperCase()

        //=== esquerda ===
        // radio
        data["abCritico"] = document.getElementsByName("abRadioCritico")
        data["abProativo"] = document.getElementsByName("abRadioProativo")
        data["abReincidente"] = document.getElementsByName("abRadioReincidente")

        //=== centro ===
        data["abCliente"] = document.querySelector("#abCliente").value.toUpperCase()
        data["abCPD"] = document.querySelector("#abCPD").value
        data["abAcesso"] = document.querySelector("#abAcesso").value
        data["abChamadoInterno"] = document.querySelector("#abChamadoInterno").value
        data["abEmail"] = document.querySelector("#abEmail").value
        data["abDescricao"] = document.querySelector("#abDescricao").value.toUpperCase()

        //=== direita ===

        // Select
        let select = document.querySelector('#abFalha');
        data["abFalha"] = select.options[select.selectedIndex].text;

        //Radio
        // data["abTs"] = document.getElementsByName("abTs")

        data["abEletrica"] = document.getElementsByName("abEletrica")
        data["abReset"] = document.getElementsByName("abReset")
        data["abTestes"] = document.getElementsByName("abTestes")

        data["ab103"] = document.getElementsByName("ab103")
        data["ab104"] = document.getElementsByName("ab104")
        data["ab109"] = document.getElementsByName("ab109")

        data["abProativo"] = document.getElementsByName("abRadioProativo")
        data["abReincidente"] = document.getElementsByName("abRadioReincidente")
        data["abBackup"] = document.getElementsByName("abBackup")

        data["abPerimetro"] = document.getElementsByName("abPerimetro")

        // Log
        data["log"] = textareaLog.value

        return data
    }

    limpar() {

        // esquerda
        //centro
        document.querySelector("#abCliente").value = ''
        document.querySelector("#abCPD").value = ''
        document.querySelector("#abAcesso").value = ''
        document.querySelector("#abChamadoInterno").value = ''
        document.querySelector("#abEmail").value = ''
        document.querySelector("#abDescricao").value = ''
            //direita

        textareaLog.value = ''

    }

    gerarMascara() {
        this._makeMascara(this._data)
    }

    _makeMascara(data) {

        // radio com reset, eletrica e testes
        let radio = {
            '0': 'SIM',
            '1': 'NAO',
            '2': 'N/A',
            'false': '',
        }

        let radio2 = {
            '0': 'VTAL',
            '1': 'OI',
            'false': '',
        }

        let opcReset = radio[verificaRadio(data.abReset)]
        let opcEletrica = radio[verificaRadio(data.abEletrica)]
        let opcTestes = radio[verificaRadio(data.abTestes)]

        let opc103 = radio[verificaRadio(data.ab103)]
        let opc104 = radio[verificaRadio(data.ab104)]
        let opc109 = radio[verificaRadio(data.ab109)]

        let opcProativo = radio[verificaRadio(data["abProativo"])]
        let opcReincidente = radio[verificaRadio(data["abReincidente"])]
        let opcBackup = radio[verificaRadio(data["abBackup"])]

        let opcPerimetro = radio2[verificaRadio(data.abPerimetro)]

        // let opcCritico = radio1[verificaRadio(this._data["abCritico"])]
        // let opcTS = radio2[verificaRadio(data.abTs)]


        let mascara = `MASCARA DE ABERTURA\n`

        mascara += `PREMIUM | PERIMETRO: ${opcPerimetro} - PROTOCOLO DO CLIENTE: `

        // Verifica se cliente tem chamado interno
        if (data.abChamadoInterno != '') {
            mascara += `${data.abChamadoInterno}\n`
        } else {
            mascara += `N/A\n`
        }

        mascara += `CLIENTE: ${data.abCliente} - TEL: ${data.abCPD}\n`

        // Verifica se cliente tem endereço de email
        mascara += `EMAIL DO CLIENTE: `
        if (data.abEmail != '') {
            mascara += `${data.abEmail}\n`
        } else {
            mascara += `N/A\n`
        }

        mascara += `RECLAMANTE: CEC-SP OI${data.oi} - ${data.nome}\n`

        if (data.abAcesso == "") {
            mascara += `ACESSO: 08:00 AS 18:00 HS - RECLAMACAO: ${data.abFalha.toUpperCase()}\n`
        } else {
            mascara += `ACESSO: ${data.abAcesso} - RECLAMACAO: ${data.abFalha.toUpperCase()}\n`
        }

        mascara += `CHECKLIST: REALIZADO RESET?:${opcReset}/SEM ENERGIA?:${opcEletrica}/AUTORIZA PARAR TESTES?:${opcTestes}\n`
        mascara += `CHECKLIST: SINAL 103?${opc103}/SINAL 104?${opc104}/SINAL 109?${opc109}\n`

        mascara += `DESCRICAO: PROATIVO:${opcProativo} / REINCIDENTE:${opcReincidente} / POSSUI BACKUP ATIVO:${opcBackup}\n`
        mascara += `ENCERRAMENTO/AGENDAMENTO : 0800 282 5231 1/5/5\n`
        mascara += `${data.abDescricao}`

        if (data.log != '') {
            mascara += `\n--- LOG ---\n`
            mascara += `${ data.log }`
        }

        copyToClipboard(mascara)
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