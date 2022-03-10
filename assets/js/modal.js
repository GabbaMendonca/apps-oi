var modal = document.getElementById("myModal");
var textareaLog = document.querySelector("#textareaLog")

function buttonLog() {
    modal.style.display = "block";    
}

function modalClose() {
    modal.style.display = "none";
}

function modalButtonLimpar() {
    textareaLog.value = ""
}

function modalButtonLog() {
    copyToClipboard( textareaLog.value )
}