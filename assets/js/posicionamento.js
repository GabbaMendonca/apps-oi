function getScreenPosicionamento() {
    let data = {}

    data["posto"] = document.querySelector("#poPosto").value
    data["perimetro"] = document.querySelector("#poPerimetro").value
    data["ba"] = document.querySelector("#poBa").value
    data["causa"] = document.querySelector("#poCausa").value
    data["localidade"] = document.querySelector("#poLocalidade").value
    data["descricao"] = document.querySelector("#poDescricao").value
    data["escalonamento"] = document.querySelector("#poEscalonamento").value
    data["previsao"] = document.querySelector("#poPrevisao").value
    data["proxStatus"] = document.querySelector("#poProxStatus").value
    data["detalhes"] = document.querySelector("#poDetalhes").value
    data["log"] = document.querySelector("#poLog").value

    return data
}


function poPosicionamento(data) {
    return `${data.posto} - ${data.perimetro} - BA ${data.ba} - & FALHA DE TRANSMISSÃO
CAUSA : ${data.causa}
LOCALIDADE : ${data.localidade}
DESCRIÇÃO : ${data.descricao}
ESCALONADO : ${data.escalonamento}
PREVISÃO ESTIMADA/PROX. STATUS : ${data.previsao} / ${data.proxStatus} &
DETALHES : ${data.detalhes}
LOG'S : ${data.log}`

}


function poButtonGerarTexto() {
    data = getScreenPosicionamento()
    texto = poPosicionamento(data)
    console.log(texto)
}