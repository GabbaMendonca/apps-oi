var editorTextarea = document.querySelector("#editorTextarea")

function editorMauisculo() {

    editorTextarea.value = editorTextarea.value.toUpperCase()

}

function editorMinusculo() {

    editorTextarea.value = editorTextarea.value.toLowerCase()

}

function editorRemoverAcento() {

    var com_acento = 'áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ´`^¨~';
    var sem_acento = 'aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC     ';

    var palavra = editorTextarea.value

    for (l in palavra) {

        for (l2 in com_acento) {

            if (palavra[l] == com_acento[l2]) {

                palavra = palavra.replace(palavra[l], sem_acento[l2]);

            }

        }

    }

    editorTextarea.value = palavra

}

function editorUnderline() {

    editorTextarea.value = editorTextarea.value.replace(/_/g, '')

}

function editorCopiar() {

    copyToClipboard(editorTextarea.value)

}

function editorLimpar() {

    editorTextarea.value = ""

}