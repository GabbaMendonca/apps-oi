function pegarDadosMascaraAbertura() {
    let data = {}

    // cabeçalho
    data["oi"] = document.querySelector("#oi").value
    data["nome"] = document.querySelector("#nome").value.toUpperCase()

    // Coluna da Esquerda da Mascara de Abertura
    // Select
    let select = document.querySelector('#abFalha');
    data["abFalha"] = select.options[select.selectedIndex].text.toUpperCase();

    // Radio Buttons
    data["abReset"] = document.getElementsByName("abReset")
    data["abEnergia"] = document.getElementsByName("abEnergia")
    data["abTestes"] = document.getElementsByName("abTestes")
    data["ab103"] = document.getElementsByName("ab103")
    data["ab104"] = document.getElementsByName("ab104")
    data["ab109"] = document.getElementsByName("ab109")

    // Coluna do Centro da Mascara de Abertura
    data["abPerimetro"] = document.getElementsByName("abPerimetro")
    data["abCliente"] = document.querySelector("#abCliente").value.toUpperCase()
    data["abCPD"] = document.querySelector("#abCPD").value
    data["abAcesso"] = document.querySelector("#abAcesso").value
    data["abChamadoInterno"] = document.querySelector("#abChamadoInterno").value
    data["abEmail"] = document.querySelector("#abEmail").value
    data["abDescricao"] = document.querySelector("#abDescricao").value.toUpperCase()
    data["abEventoMassivo"] = document.querySelector("#abEventoMassivo").value.toUpperCase()

    // Coluna da Direita da Mascara de Abertura
    // Radio Buttons
    data["abProativo"] = document.getElementsByName("abRadioProativo")
    data["abReincidente"] = document.getElementsByName("abRadioReincidente")
    data["abBackup"] = document.getElementsByName("abBackup")

    // Log
    data["log"] = textareaLog.value

    return data
}

// ================================

function abVerificaStausRadiosAbertura(data) {

    let radio = { '0': 'SIM', '1': 'NAO', '2': 'N/A', 'false': '' }
    let radio2 = { '0': 'VTAL', '1': 'OI', 'false': '' }

    data.abPerimetro = radio2[verificaRadio(data.abPerimetro)]
    data.abReset = radio[verificaRadio(data.abReset)]
    data.abEnergia = radio[verificaRadio(data.abEnergia)]
    data.abTestes = radio[verificaRadio(data.abTestes)]
    data.ab103 = radio[verificaRadio(data.ab103)]
    data.ab104 = radio[verificaRadio(data.ab104)]
    data.ab109 = radio[verificaRadio(data.ab109)]
    data.abProativo = radio[verificaRadio(data.abProativo)]
    data.abReincidente = radio[verificaRadio(data.abReincidente)]
    data.abBackup = radio[verificaRadio(data.abBackup)]

    return data
}

function abVerificaChamadoInterno(data) {
    data.abChamadoInterno = data.abChamadoInterno == '' ? "N/A" : data.abChamadoInterno
    return data
}

function abVerificaEmailCliente(data) {
    data.abEmail = data.abEmail == '' ? "N/A" : data.abEmail
    return data
}

function abVerificaHorarioAcesso(data) {
    data.abAcesso = data.abAcesso == '' ? '08:00 AS 18:00 HS' : data.abAcesso.toUpperCase()
    return data
}

function abVerificaEventoMassivo(data) {
    data.abDescricao += data.abEventoMassivo == '' ? '' : `--- CIRCUTOS ASSOCIADOS ---\n${ data.abEventoMassivo }`
    return data
}

function abVerificaLog(data) {
    data.log = data.log == '' ? '' : `--- LOG ---\n${ data.log }`
    return data
}

function abMascaraDeAbertura(data) {

    let mascara = `MASCARA DE ABERTURA
PREMIUM | PERIMETRO: ${data.abPerimetro} - PROTOCOLO DO CLIENTE: ${data.abChamadoInterno}
CLIENTE: ${data.abCliente} - TEL: ${data.abCPD}
EMAIL DO CLIENTE: ${data.abEmail}
RECLAMANTE: CEC-SP OI ${data.oi} - ${data.nome}
ACESSO: ${data.abAcesso} - RECLAMACAO: ${data.abFalha}
CHECKLIST: REALIZADO RESET?:${data.abReset}/SEM ENERGIA?:${data.abEnergia}/AUTORIZA PARAR TESTES?:${data.abTestes}
CHECKLIST: SINAL 103?${data.ab103}/SINAL 104?${data.ab104}/SINAL 109?${data.ab109}
DESCRICAO: PROATIVO:${data.abProativo} / REINCIDENTE:${data.abReincidente} / POSSUI BACKUP ATIVO:${data.abBackup}
ENCERRAMENTO/AGENDAMENTO : 0800 282 5231 1/5/5
${data.abDescricao}`

    return mascara
}

function abGerarMascaraAbertura(data) {

    data = abVerificaStausRadiosAbertura(data)
    data = abVerificaChamadoInterno(data)
    data = abVerificaEmailCliente(data)
    data = abVerificaHorarioAcesso(data)
    data = abVerificaEventoMassivo(data)
    data = abVerificaLog(data)

    return abMascaraDeAbertura(data)
}

// ================================

function abButtonGerarMascaraAbertura() {
    data = pegarDadosMascaraAbertura()
    mascara = abGerarMascaraAbertura(data)
    copyToClipboard(mascara)
}

function abButtonEnviarParaEditor() {
    data = pegarDadosMascaraAbertura()
    mascara = abGerarMascaraAbertura(data)
    editorTextArea.value = mascara + editorTextArea.value
    editor()
}

function abButtonLimpar() {
    // Coluna da Esquerda da Mascara de Abertura
    document.getElementsByName("abReset")[1].checked = true
    document.getElementsByName("abEnergia")[2].checked = true
    document.getElementsByName("abTestes")[0].checked = true
    document.getElementsByName("ab103")[1].checked = true
    document.getElementsByName("ab104")[1].checked = true
    document.getElementsByName("ab109")[1].checked = true

    // Coluna do Centro da Mascara de Abertura
    document.querySelector("#abCliente").value = ''
    document.querySelector("#abCPD").value = ''
    document.querySelector("#abAcesso").value = ''
    document.querySelector("#abChamadoInterno").value = ''
    document.querySelector("#abEmail").value = ''
    document.querySelector("#abDescricao").value = ''
    document.querySelector("#abEventoMassivo").value = ''

    // Coluna da Direita da Mascara de Abertura
    document.getElementsByName("abRadioProativo")[0].checked = true
    document.getElementsByName("abRadioReincidente")[1].checked = true
    document.getElementsByName("abBackup")[2].checked = true

    textareaLog.value = ''
}