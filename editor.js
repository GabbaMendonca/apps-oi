var editorTextarea = document.querySelector("#editorTextarea")

function editorMauisculo() {

    editorTextarea.value = editorTextarea.value.toUpperCase()

}

function editorMinusculo() {

    editorTextarea.value = editorTextarea.value.toLowerCase()

}

function editorUnderline() {

    editorTextarea.value = editorTextarea.value.replace(/_/g,'')

}