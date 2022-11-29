function init() {
    // abertura()
    // encerramento()
    posicionamento()
    loadScreenAbertura()
    loadScreenEncerramento()
        // getCabecalho()
}

init()

// ====================================================

function updateCabecalho() {
    data = {}
    data["oi"] = document.querySelector("#oi").value
    data["nome"] = document.querySelector("#nome").value

    updateLocalStorage("cabecalho", data)
}

function getCabecalho() {
    data = {}
    data = getLocalStorage("cabecalho")

    document.querySelector("#oi").value = data.oi
    document.querySelector("#nome").value = data.nome
}

// ====================================================


function createButton(value, addClass) {
    const listButton = document.createElement("p")
    const button = document.createElement("button")
    const span = document.createElement("span")

    listButton.appendChild(button)
    button.appendChild(span)
    span.innerHTML = value

    listButton.classList.add("control")
    button.classList.add("button")
    if (addClass != "") button.classList.add(addClass)

    return listButton
}

function addButtonListClient() {
    let inputClient = document.querySelector("#abClient").value
    let clientList = document.querySelector("#clientList")

    if (inputClient == "") return

    let buton1 = createButton(inputClient)
    let buton2 = createButton("-", "is-danger")

    clientList.appendChild(buton1)
    clientList.appendChild(buton2)
}


function abertura() {
    document.getElementById("abertura").hidden = false
    document.querySelector("#tab_abertura").classList.add("is-active")

    document.getElementById("encerramento").hidden = true
    document.querySelector("#tab_encerramento").classList.remove("is-active")

    document.getElementById("email").hidden = true
    document.querySelector("#tab_email").classList.remove("is-active")

    document.getElementById("editor").hidden = true
    document.querySelector("#tab_editor").classList.remove("is-active")

    document.getElementById("posicionamento").hidden = true
    document.querySelector("#tab_posicionamento").classList.remove("is-active")
}

function encerramento() {
    document.getElementById("abertura").hidden = true
    document.querySelector("#tab_abertura").classList.remove("is-active")

    document.getElementById("encerramento").hidden = false
    document.querySelector("#tab_encerramento").classList.add("is-active")

    document.getElementById("email").hidden = true
    document.querySelector("#tab_email").classList.remove("is-active")

    document.getElementById("editor").hidden = true
    document.querySelector("#tab_editor").classList.remove("is-active")

    document.getElementById("posicionamento").hidden = true
    document.querySelector("#tab_posicionamento").classList.remove("is-active")
}

function email() {
    document.getElementById("abertura").hidden = true
    document.querySelector("#tab_abertura").classList.remove("is-active")

    document.getElementById("encerramento").hidden = true
    document.querySelector("#tab_encerramento").classList.remove("is-active")

    document.getElementById("email").hidden = false
    document.querySelector("#tab_email").classList.add("is-active")

    document.getElementById("editor").hidden = true
    document.querySelector("#tab_editor").classList.remove("is-active")

    document.getElementById("posicionamento").hidden = true
    document.querySelector("#tab_posicionamento").classList.remove("is-active")


}

function editor() {
    document.getElementById("encerramento").hidden = true
    document.querySelector("#tab_encerramento").classList.remove("is-active")

    document.getElementById("abertura").hidden = true
    document.querySelector("#tab_abertura").classList.remove("is-active")

    document.getElementById("email").hidden = true
    document.querySelector("#tab_email").classList.remove("is-active")

    document.getElementById("editor").hidden = false
    document.querySelector("#tab_editor").classList.add("is-active")

    document.getElementById("posicionamento").hidden = true
    document.querySelector("#tab_posicionamento").classList.remove("is-active")
}

function posicionamento() {
    document.getElementById("encerramento").hidden = true
    document.querySelector("#tab_encerramento").classList.remove("is-active")

    document.getElementById("abertura").hidden = true
    document.querySelector("#tab_abertura").classList.remove("is-active")

    document.getElementById("email").hidden = true
    document.querySelector("#tab_email").classList.remove("is-active")

    document.getElementById("editor").hidden = true
    document.querySelector("#tab_editor").classList.remove("is-active")

    document.getElementById("posicionamento").hidden = false
    document.querySelector("#tab_posicionamento").classList.add("is-active")
}


function ocultarCabecalho() {
    cabecalho = document.getElementById("cabecalho")
    label_cabecalho = document.getElementById("label-cabecalho")
    seta = document.getElementById("seta")

    if (cabecalho.hidden == false) {
        seta.setAttribute("data-fa-transform", "flip-v")
        cabecalho.hidden = true
        label_cabecalho.innerText = ""

    } else {
        seta.setAttribute("data-fa-transform", "flip-h")
        cabecalho.hidden = false
        label_cabecalho.innerText = "OI"
    }
}