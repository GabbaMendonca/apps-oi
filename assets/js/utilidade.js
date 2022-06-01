/** 
 * Este arquivo (utilidade) contem funções
 * usadas globalmente por todas a classes do projeto.
 * */

// === CLIPBOARD ===

// recebe um valor e coloca na area de transferencia
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

    console.log(text);
    addNotification(`A mascara foi copiada para a área de transferência. (Ctrl + C) \n\n ${text}`)
        // alert("A mascara foi copiada para a área de transferência. (Ctrl + C)\n\n" + text)
}


// === CLIPBOARD ===


// verifica qual opç do radio esta marcada e retorna o valor.
// OBS.: os radios devem conter a propriedade value='numero'
function verificaRadio(data) {
    for (var i = 0, length = data.length; i < length; i++) {

        if (data[i].checked) {

            return data[i].value

        }
    }
    return false
}