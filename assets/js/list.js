function List(IdNameList) {

    function _getList(IdNameList) {
        return document.getElementById(IdNameList)
    }

    function addLine(nameLine) {
        const list = _getList(IdNameList)

        const lineList = LineList(IdNameList, nameLine)
        list.appendChild(lineList.createLineList())

        const storage = LocalStorageSingleton.getInstance()
        storage.addLocalStorage(IdNameList, lineList.idNumber, nameLine)
        storage.updateLocalStorage()
    }

    function removeLine(idNumber) {
        const lineList = document.getElementById(`${IdNameList}.${idNumber}`)
        lineList.remove()

        const storage = LocalStorageSingleton.getInstance()
        storage.removeLocalStorage(IdNameList, idNumber)
        storage.updateLocalStorage()
    }

    return { addLine, removeLine }
}

function LineList(nameList, nameLine) {

    const idNumber = generateID()
    const id = `${nameList}.${idNumber}`
    const buttonNameLine = ButtonList(nameLine)
    const buttonRemove = ButtonList("-")
    const lineList = document.createElement("div")

    function _buildButtonName() {
        buttonNameLine.button.classList.add("is-small", "is-fullwidth")
        buttonNameLine.p.classList.add("is-expanded")
        return buttonNameLine.getButton()
    }

    function _buildButtonRemove() {
        buttonRemove.button.classList.add("is-small", "is-danger")
        buttonRemove.button.addEventListener("click", removeLineList)
        buttonRemove.button.id = id
        return buttonRemove.getButton()
    }

    function _buildLine() {
        lineList.classList.add("field", "has-addons")
        lineList.style.marginBottom = "0.10rem"
        lineList.id = id
        return lineList
    }

    function createLineList() {
        const buttonName = _buildButtonName()
        const buttonRemove = _buildButtonRemove()
        const line = _buildLine()

        line.appendChild(buttonName)
        line.appendChild(buttonRemove)

        return line
    }

    return { createLineList, id, idNumber }
}

function ButtonList(name) {
    return {
        p: document.createElement("p"),
        button: document.createElement("button"),

        getButton() {
            this.button.innerHTML = name
            this.p.classList.add("control")
            this.button.classList.add("button")
            this.p.appendChild(this.button)
            return this.p
        },
    }
}

function generateID() {
    return Math.round(Math.random() * 1000)
}

function removeLineList(event) {
    event.preventDefault()
    var idSplit = event.target.id.split(".")

    const lineList = List(idSplit[0])
    lineList.removeLine(idSplit[1])
}