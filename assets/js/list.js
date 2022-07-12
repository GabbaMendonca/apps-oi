function List() {

    function _getList(IdNameList) {
        return document.getElementById(IdNameList)
    }

    function addLine(IdNameList, nameLine) {
        const list = _getList(IdNameList)
        const lineList = LineList(IdNameList, nameLine)
        list.appendChild(lineList.createLineList())
    }

    function removeLine(idLine) {
        const lineList = document.getElementById(idLine)
        lineList.remove()
    }

    return { addLine, removeLine }
}

function LineList(nameList, nameLine) {

    const id = `${nameList}.${generateID()}`
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

    return { createLineList, id }
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
    const lineList = List()
    lineList.removeLine(event.target.id)
}