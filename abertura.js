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
        // data["abBackup"] = document.getElementsByName("abBackup")
        data["abEletrica"] = document.getElementsByName("abEletrica")
        data["abReset"] = document.getElementsByName("abReset")
        data["abTestes"] = document.getElementsByName("abTestes")
        data["ab103"] = document.getElementsByName("ab103")
        data["ab104"] = document.getElementsByName("ab104")
        data["ab109"] = document.getElementsByName("ab109")



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

        // radio do proativo e reincidente
        let radio1 = {
            '0': 'SIM',
            '1': 'NAO',
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
            '0': 'SIM',
            '1': 'NAO',
            '2': 'N/A',
            'false': '',
        }


        let opcReset = radio3[verificaRadio(data.abReset)]
        let opcEletrica = radio3[verificaRadio(data.abEletrica)]
        let opcTestes = radio3[verificaRadio(data.abTestes)]

        let opc103 = radio1[verificaRadio(data.ab103)]
        let opc104 = radio1[verificaRadio(data.ab104)]
        let opc109 = radio1[verificaRadio(data.ab109)]

        // let opcCritico = radio1[verificaRadio(this._data["abCritico"])]
        // let opcProativo = radio1[verificaRadio(data["abProativo"])]
        // let opcReincidente = radio1[verificaRadio(data["abReincidente"])]
        // let opcTS = radio2[verificaRadio(data.abTs)]
        // let opcBackup = radio3[verificaRadio(data["abBackup"])]


        let mascara = `MASCARA DE ABERTURA\n`

        mascara += `PREMIUM | PERÍMETRO: VTAL - PROTOCOLO DO CLIENTE: `
        if (data.abChamadoInterno != '') {
            mascara += `${data.abChamadoInterno}\n`
        } else {
            mascara += `Sem Chamado\n`
        }

        mascara += `CLIENTE: ${data.abCliente} - TEL: ${data.abCPD}\n`

        mascara += `EMAIL DO CLIENTE: `
        if (data.abEmail != '') {
            mascara += `${data.abEmail}\n`
        } else {
            mascara += `N/A\n`
        }

        mascara += `RECLAMANTE: CGS-SP OI${data.oi} - ${data.nome} - PROATIVO\n`

        mascara += `ACESSO: ${data.abAcesso} - RECLAMACAO: ${data.abFalha}\n`

        mascara += `CHECKLIST: REALIZADO RESET?: ${opcReset} / SEM ENERGIA?: ${opcEletrica} / AUTORIZA PARA TESTES?: ${opcTestes}\n`
        mascara += `CHECKLIST: SINAL 103? ${opc103} / SINAL 104? ${opc104} / SINAL 109? ${opc109}\n`
        mascara += `DESCRICAO: ${data.abDescricao}`

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