/**
 * List.js
 * 
 * Here we have the functions responsible for 
 * managing the lists.
 * 
 * Just use the List function passing the list ID as a
 * parameter and use addLine to pass the contents
 * of the line.
 * 
 * --
 * Aqui temos as funções responsáveis por
 * gerenciar as listas.
 * 
 * Basta usar a função List passando o ID da
 * lista como parâmetro e usar addLine para passar o
 * conteúdo da linha.
 */

/**
 * Managing all application lists
 * @param {string} IdNameList ID of the list.
 * @returns
 */
function List(IdNameList) {

    function _getList(IdNameList) {
        return document.getElementById(IdNameList)
    }

    /**
     * Add line to a list
     * @param {string} nameLine Receive the name of a line
     */
    function addLine(nameLine) {
        const list = _getList(IdNameList)

        const lineList = LineList(IdNameList, nameLine)
        list.appendChild(lineList.createLineList())

        const storage = LocalStorageSingleton.getInstance()
        storage.addLocalStorage(IdNameList, lineList.idNumber, nameLine)
        storage.updateLocalStorage()
    }

    /**
     * Remove line to a list
     * @param {string} idNumber Receive the ID of a line
     */
    function removeLine(idNumber) {
        const lineList = document.getElementById(`${IdNameList}.${idNumber}`)
        lineList.remove()

        const storage = LocalStorageSingleton.getInstance()
        storage.removeLocalStorage(IdNameList, idNumber)
        storage.updateLocalStorage()
    }

    return { addLine, removeLine }
}

/**
 * Create a line for the list 
 * @param {string} nameList Receive  the name of a list
 * @param {string} nameLine Receive  the name of a line
 * @returns 
 */
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

/**
 * Create a button for the line
 * @param {string} name Receive the name of a button
 * @returns 
 */
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

/**
 * Generates random numbers of ID's
 * @returns {number} Number ID
 */
function generateID() {
    return Math.round(Math.random() * 1000)
}

/**
 * Remove a line a the list
 * @param {object} event Receive an object from the DOM
 */
function removeLineList(event) {
    event.preventDefault()
    var idSplit = event.target.id.split(".")

    const lineList = List(idSplit[0])
    lineList.removeLine(idSplit[1])
}