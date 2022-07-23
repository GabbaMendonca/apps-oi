/**
 * Notification.js
 * 
 * Here we have the functions responsible for generating and
 * displaying a notification on the screen.
 * 
 * Just use the addNotification function passing as a
 * parameter the message you want to display on the screen.
 * 
 * --
 * 
 * Aqui temos as funções responsaveis por gerar e exibir 
 * uma notificação na tela.
 * 
 * Basta usar a função addNotificacao passando como paramentro a
 * mensagem que deseja exibir na tela.
 */

/**
 * Display a notification screen
 * @param {string} content Receives the text to display in the notification
 */
function addNotification(content) {
    const notification = createNotification(content)
    gridNotification.appendChild(notification)
    autoCloseNotification(notification)
}

/**
 * Create the basic HTML structure for the notification
 * @returns object - node - Create a notification
 */
function Notification_() {
    let myself = {}
    myself.notification = document.createElement('div')
    myself.buttonClose = document.createElement('button')

    myself.getNotification = () => {
        myself.notification.appendChild(myself.buttonClose)
        return myself.notification
    }

    return myself
}

/**
 * Add CCS styles class to notification
 * @param {string} content Receives the text to display in the notification
 * @returns object - node - Notification HTML structure
 */
function createNotification(content) {
    const notification = Notification_()
    notification.notification.classList.add("notification", "is-info")
    notification.notification.innerText = content

    notification.buttonClose.classList.add("delete")
    notification.buttonClose.addEventListener("click", buttonCloseNotification)

    return notification.getNotification()
}

/**
 * Close automitic a notification
 * @param {object} notification object - node - Notification HTML structure
 */
function autoCloseNotification(notification) {
    const fadeOutNotification = () => notification.classList.add("fadeOutNotification")
    const removeGridNotification = () => notification.remove()

    setTimeout(() => {
        fadeOutNotification()
        setTimeout(removeGridNotification, 500)
    }, 3000)
}

/**
 * Close a notification
 * @param {event} event Receives the DOM returned event
 */
function buttonCloseNotification(event) {
    event.target.parentNode.remove()
}