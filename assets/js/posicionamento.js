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
    data["proxStatus"] = document.querySelector("#poProxStatus").value.toUpperCase()
    data["detalhes"] = document.querySelector("#poDetalhes").value.toUpperCase()
    data["log"] = document.querySelector("#poLog").value

    return data
}


function poCabecalhoPosicionamento(data) {
    if (data.posto == "CLD") return `${data.posto} - & TECNICO DE CAMPO\n`
    if (data.posto == "FIBRA") return `${data.posto} - ${data.perimetro} - BA ${data.ba} - & FALHA DE FIBRA\n`
    if (data.posto == "TRANSMISSÃO") return `${data.posto} - ${data.perimetro} - BA ${data.ba} - & FALHA DE TRANSMISSÃO\n`
    if (data.posto == "REDEA") return 'REDEA - & REDE METALICA ROMPIDA/COM DEFEITO\n'
}

function poCausa(data) {
    return data.causa == "" ? '' : `CAUSA : ${data.causa}\n`
}

function poLocalidade(data) {
    return data.localidade == "" ? '' : `LOCALIDADE : ${data.localidade}\n`
}

function poEscalonado(data) {
    return data.escalonamento == "" ? '' : `ESCALONADO : ${data.escalonamento}\n`
}

function poEscalonado(data) {
    return data.escalonamento == "" ? '' : `ESCALONADO : ${data.escalonamento}\n`
}

function poProxStatus(data) {
    return data.proxStatus == "" ? '' : `/ ${data.proxStatus}`
}

function poDetalhes(data) {
    return data.detalhes == "" ? '' : `\nDETALHES :  ${data.detalhes}`
}

function poLog(data) {
    return data.log == "" ? '' : `\nLOG'S :  ${data.log}`
}

function poPosicionamento(data) {
    return `${poCabecalhoPosicionamento(data)}` +
        `${poCausa(data)}` +
        `${poLocalidade(data)}` +
        `DESCRIÇÃO : ${data.descricao}\n` +
        `${poEscalonado(data)}` +
        `PREVISÃO ESTIMADA/PROX. STATUS : ${data.previsao} ${poProxStatus(data)} &` +
        `${poDetalhes(data)}` +
        `${poLog(data)}`
}

function poButtonGerarTexto() {
    data = getScreenPosicionamento()
    texto = poPosicionamento(data)
    console.log(texto)
    copyToClipboard(texto)
}