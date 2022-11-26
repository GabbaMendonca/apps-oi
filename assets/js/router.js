const hp = document.getElementsByClassName("js-hp")
const datacom = document.getElementsByClassName("js-datacom")


function toogleHP() {
    for (x of hp) {
        x.classList.toggle('is-hidden')
    }
}

function toogleDatacom() {
    for (x of datacom) {
        x.classList.toggle('is-hidden')
    }
}