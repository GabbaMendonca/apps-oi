var editorTextArea = document.querySelector("#editorTextarea")
class Editor {

    mauisculo(palavra) {
        return palavra.toUpperCase()
    }

    minusculo(palavra) {
        return palavra.toLowerCase()
    }

    removerAcento(palavra) {

        let com_acento = 'áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ´`^¨~';
        let sem_acento = 'aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC     ';

        for (let l in palavra) {

            for (let l2 in com_acento) {

                if (palavra[l] == com_acento[l2]) {

                    palavra = palavra.replace(palavra[l], sem_acento[l2]);

                }
            }
        }
        return palavra
    }

    removerUnderline(palavra) {
        return palavra.replace(/_/g, '')
    }

    posicionar(palavra) {
        return `& ${palavra} &`
    }

    stc(palavra) {

        let linha = 1
        let pagina = 1

        for (let letra in palavra) {

            if (letra == (75 * linha)) {

                linha += 1

                if (palavra[letra] == " ") {
                    palavra = palavra.substr(0, letra) + "\n" + palavra.substr(letra);
                } else {

                    let letra_ = letra

                    while (palavra[letra_] != " ") {
                        letra_ = letra_ - 1
                        if (letra_ == 0) {
                            break
                        }
                    }

                    if (linha == (8 * pagina)) {
                        pagina += 1
                        palavra = palavra.substr(0, letra_) + "\n >>>> F8 <<<< \n\n" + palavra.substr(letra_ + 1);
                    } else {
                        palavra = palavra.substr(0, letra_) + "\n" + palavra.substr(letra_ + 1);
                    }
                }
            }
        }
        return palavra
    }
}

function editorMauisculo() {

    e = new Editor()
    editorTextArea.value = e.mauisculo(editorTextArea.value)

}

function editorMinusculo() {

    e = new Editor()
    editorTextArea.value = e.minusculo(editorTextArea.value)

}

function editorRemoverAcento() {

    e = new Editor()
    editorTextArea.value = e.removerAcento(editorTextArea.value)

}

function editorUnderline() {

    e = new Editor()
    editorTextArea.value = e.removerUnderline(editorTextArea.value)

}

function editorPosicionar() {

    e = new Editor()
    editorTextArea.value = e.posicionar(editorTextArea.value)

}

function editorSTC() {

    e = new Editor()
    editorTextArea.value = e.stc(e.posicionar(editorTextArea.value))

}

function editorCopiar() {

    copyToClipboard(editorTextArea.value)

}

function editorLimpar() {

    editorTextArea.value = ""

}