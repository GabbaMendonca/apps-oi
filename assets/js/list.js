/**
 * List.js
 * 
 * Here we have the functions responsible for 
 * managing the lists.
 * 
 * Just use the List function passing the neme list as a
 * parameter and use addLine to pass the contents
 * of the line.
 * 
 * --
 * Aqui temos as funções responsáveis por
 * gerenciar as listas.
 * 
 * Basta usar a função List passando o nome da lista
 * como parâmetro e usar addLine para passar o
 * conteúdo da linha.
 */

/**
 * Managing all application lists
 */
class List {
    /**
     * 
     * @param {string} nameList ID of the list.
     */
    constructor(nameList) {
        this.nameList = nameList
        this.idLine = 0
    }

    _getList(nameList) {
        return document.getElementById(nameList)
    }

    addLine(nameLine, idLine = false) {
        const list = this._getList(this.nameList)

        !idLine ? this.idLine = generateID() : this.idLine = idLine

        const lineList = new LineList(this.nameList, nameLine, idLine)
        list.appendChild(lineList.createLineList())
    }

    removeLine(idLine) {
        const lineList = document.getElementById(`${this.nameList}.${idLine}`)
        lineList.remove()

        const storage = LocalStorageSingleton.getInstance()
        storage.removeLocalStorage(this.nameList, idLine)
        storage.updateLocalStorage()
    }

}
/**
 * Create a line for the list 
 */
class LineList {
    /**
     * 
     * @param {string} nameList The name of a list
     * @param {string} nameLine The name of a line
     * @param {string} idLine The ID of a line
     */
    constructor(nameList, nameLine, idLine) {
        this.nameList = nameList
        this.nameLine = nameLine
        this.idLine = idLine

        this.id = `${nameList}.${idLine}`
        this.buttonNameLine = new ButtonList(nameLine)
        this.buttonRemove = new ButtonList("-")
        this.lineList = document.createElement("div")
    }

    _buildButtonName() {
        this.buttonNameLine.button.classList.add("is-small", "is-fullwidth")
        this.buttonNameLine.p.classList.add("is-expanded")

        return this.buttonNameLine.getButton()
    }

    _buildButtonRemove() {
        this.buttonRemove.button.classList.add("is-small", "is-danger")
        this.buttonRemove.button.addEventListener("click", this._removeLineList)
        this.buttonRemove.button.id = this.id

        return this.buttonRemove.getButton()
    }

    _buildLine() {
        this.lineList.classList.add("field", "has-addons")
        this.lineList.style.marginBottom = "0.10rem"
        this.lineList.id = this.id

        return this.lineList
    }

    _removeLineList(event) {
        event.preventDefault()
        var idSplit = event.target.id.split(".")

        const lineList = new List(idSplit[0])
        lineList.removeLine(idSplit[1])
    }

    createLineList() {
        const buttonName = this._buildButtonName()
        const buttonRemove = this._buildButtonRemove()
        const line = this._buildLine()

        line.appendChild(buttonName)
        line.appendChild(buttonRemove)

        return line
    }
}
/**
 * Create a button for the line
 */
class ButtonList {
    /**
     * 
     * @param {string} name The name of a button
     */
    constructor(name) {
        this.name = name

        this.p = document.createElement("p")
        this.button = document.createElement("button")
    }

    getButton() {
        this.button.innerHTML = this.name
        this.button.classList.add("button")

        this.p.classList.add("control")
        this.p.appendChild(this.button)

        return this.p
    }

}

/**
 * Generates random numbers of ID's
 * @returns {number} Number ID
 */
function generateID() {
    return Math.round(Math.random() * 1000)
}