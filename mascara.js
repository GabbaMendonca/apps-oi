// === CLIPBOARD ===


function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    // to avoid breaking orgain page when copying more words
    // cant copy when adding below this code
    // dummy.style.display = 'none'
    document.body.appendChild(dummy);
    //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}


// === CLIPBOARD ===

// === CALCULO DO ROUTER ===


function getDate() {
    
    let currentDate = {}
    
    let date = new Date()

    currentDate.hora = date.getHours()
    currentDate.minuto = date.getMinutes()
    currentDate.dia = date.getDate()
    currentDate.mes = date.getMonth() + 1
    currentDate.ano = date.getFullYear()

    return currentDate
}


function splitTime(routerUp) {
    
    timeRouter = {}
    
    let router = routerUp.toUpperCase()

    router = router.split(":")

    if (router.length >= 3) {

        timeRouter["hora"] = router[0]
        timeRouter["minuto"] = router[1]

    }
    else {

        router = router[0].split("H")
        timeRouter["hora"] = router[0]

        router = router[1].split("M")
        timeRouter["minuto"] = router[0]

    }
    
    return timeRouter
}


function calculaTimeRouter(date, timeRouter) {
    
    while (timeRouter.minuto >= 60) {        
        
        // Sempre que o valor em minutos up do router for maior 60 min
        // vamos dropar 1 hora e subtrair estes 60 min do tempo up do router.
        // Isso nos permite calcular tempo escritos no formato 00h90m00s
        
        timeRouter.minuto = timeRouter.minuto - 60
        date.hora = date.hora - 1

    }
    if (date.minuto < timeRouter.minuto) {
        
        // Se minutos do router é maior que o minuto atual,
        // logo a conta sera a seguinte :
        // -10 = 10(minuto atual) - 20(tempo up do router)
        let min = date.minuto - timeRouter.minuto

        // resta -10 que sera subitraido de 60 min referente a hora anterior
        // usando a propriedade matematica (+ com - igual -)
        date.minuto = 60 + min

        // e dropamos uma hora da atual
        date.hora = date.hora - 1

    }
    else{
        
        // Se não o resultado não sera negativo
        // 5 = 10 - 5
        // Então faremos somente a subtração dos minutos

        date.minuto = date.minuto - timeRouter.minuto
        
    }


    while (timeRouter.hora >= 24) {        
    
        timeRouter.hora = timeRouter.hora - 60
        date.dia = date.dia - 1

    }    
    if (date.hora < timeRouter.hora) {
        
        let hora = date.hora - timeRouter.hora
        date.hora = 24 + hora
        date.dia = date.dia - 1

    }
    else{

        date.hora = date.hora - timeRouter.hora
        
    }

    // Inserimos um zero a esquerda caso o numero se menor que 10
    date.hora = ("0" + date.hora).slice(-2)
    date.minuto = ("0" + date.minuto).slice(-2)
    date.dia = ("0" + date.dia).slice(-2)

    let dataNormalizacao =  date.dia + "/" + date.mes + "/" + date.ano + " " + date.hora + ":" + date.minuto + ":00"

    return dataNormalizacao
}

function router(data) {

    date = getDate()
    timeRouter = splitTime(data.router)

    return calculaTimeRouter(date, timeRouter)
}


// === CALCULO DO ROUTER ===

// ===  ===


function getView() {
    let data = {}

    data["oi"] = document.querySelector("#oi").value
    data["nome"] = document.querySelector("#nome").value.toUpperCase()
    data["abertura"] = document.querySelector("#dataAbertura").value
    data["normalizacao"] = document.querySelector("#dataNormalizacao").value
    data["router"] = document.querySelector("#router").value
    data["validacao"] = document.querySelector("#validacao").value
    data["senha"] = document.querySelector("#senha").value
    data["outraCausa"] = document.querySelector("#outraCausa").value.toUpperCase()
    data["checkboxCausaCliente"] = document.querySelector("#checkboxCausaCliente").checked

    let select = document.querySelector('#falha');
    data["falha"] = select.options[select.selectedIndex].text;

    return data
}

function makeMascara(data) {
    let mascara = " --- ENCERRAMENTO ---"

    if (data["senha"] != "") {
        mascara = mascara + ` > SENHA : ${data["senha"]}`
    }

    mascara = mascara + `\nCOLABORADOR : CGS SP - ${data["nome"]} - OI${data["oi"]}\n` +
        `FALHA : ${data["falha"]}\n` +
        `HORARIO DA FALHA : ${data["abertura"]}\n` +
        `HARARIO DE NORMALIZACAO : ${data["normalizacao"]}\n` +
        `CAUSA / SOLUCAO : ${data["causa"]} - ${data["solucao"]}\n` +
        `VALIDADO POR : ${data["validacao"]}`

    return mascara
}

function make(data, causa, solucao) {

    data["causa"] = causa
    data["solucao"] = solucao

    let m = makeMascara(data)
    copyToClipboard(m)
    console.log(m)
    
}


// ===  ===


class Mascara {

    constructor(){
        this._data = getView()

        this._causa = {
            "cliente":"CLIENTE",
            "operadora":"OPERADORA",
        }

        this._solucao = {
            "indevida":"ABERTURA INDEVIDA",
            "energia":"LOCAL SEM ENERGIA",
            "naoDetectada":"CAUSA NAO DETECTADA",

            "gabinete":"GABINETE QUEIMADO",
            "modem":"MODEM QUEIMADO, SUBSTITUIDO",
            "fibraRompimento":"ROMPIMENTO DE FIBRA, RECUPERADO",
            "redeaRompimento":"ROMPIMENTO DE FIBRA, RECUPERADO",
            "redeaManobra":"REDE METALICA COM DEFEITO, RECUPERADO",
        }
    }
    
    calcularRouter() {
        document.querySelector("#dataNormalizacao").value = router(this._data)
    }

    copyValidacao() {
        copyToClipboard(this._data["validacao"].toUpperCase() + " CPD")
    }
    copySenha() {
        copyToClipboard("SENHA : " + this._data["senha"])
    }


    limpar(){
        document.querySelector("#dataAbertura").value = ""
        document.querySelector("#dataNormalizacao").value = ""
        document.querySelector("#router").value = ""
        document.querySelector("#validacao").value = ""
        document.querySelector("#senha").value = ""
        document.querySelector("#outraCausa").value = ""
    }


    // Causa Cliente
    reclamacaoIndevida() {
        make(this._data, this._causa.cliente, this._solucao.indevida)
    }
    localSemEnergia() {
        make(this._data, this._causa.cliente, this._solucao.energia)
    }

    // Causa Operadora
    causaNaoDetectada(){
        make(this._data, this._causa.operadora, this._solucao.naoDetectada)
    }
    gabineteQueimado(){
        make(this._data, this._causa.operadora, this._solucao.gabinete)
    }
    modemQueimado(){
        make(this._data, this._causa.operadora, this._solucao.modem)
    }
    fibraRompimento(){
        make(this._data, this._causa.operadora, this._solucao.fibraRompimento)
    }
    redeaRompimento(){
        make(this._data, this._causa.operadora, this._solucao.redeaRompimento)
    }
    redeaManobra(){
        make(this._data, this._causa.operadora, this._solucao.redeaManobra)
    }
    outraCausa(){
        if ( this._data["checkboxCausaCliente"] ){
            make(this._data, this._causa.cliente, this._data.outraCausa)
        }else{
            make(this._data, this._causa.operadora, this._data.outraCausa)
        }
    }

}



// === BUTTONS ===

function buttonLimpar() {
    m = new Mascara()
    m.limpar()
}

function buttonCalcularRouter() {
    m = new Mascara()
    m.calcularRouter()
}

function buttonCopyValidacao() {
    m = new Mascara()
    m.copyValidacao()
}

function buttonCopySenha() {
    m = new Mascara()
    m.copySenha()
}

function buttonReclamacaoIndevida() {
    m = new Mascara()
    m.reclamacaoIndevida()
}

function buttonLocalSemEnergia() {
    m = new Mascara()
    m.localSemEnergia()

}
function buttonCausaNaoDetectada() {
    m = new Mascara()
    m.causaNaoDetectada()
}

function buttonGabineteQueimado() {
    m = new Mascara()
    m.gabineteQueimado()
}

function buttonModemQueimado() {
    m = new Mascara()
    m.modemQueimado()
}

function buttonFibraRompimento() {
    m = new Mascara()
    m.fibraRompimento()
}

function buttonRedeaRompimento() {
    m = new Mascara()
    m.redeaRompimento()
}

function buttonRedeaManobra() {
    m = new Mascara()
    m.redeaManobra()
}

function buttonOutraCausa() {
    m = new Mascara()
    m.outraCausa()
}

// === BUTTONS ===