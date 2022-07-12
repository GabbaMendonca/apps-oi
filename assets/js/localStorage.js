function Storage() {
    var storage;

    initialize()

    function initialize() {
        getLocalStorage()
        if (!storage) storage = new Object({})
    }

    function addLocalStorage(key, id, value) {
        if (storage[`${key}`]) {
            storage[`${key}`][`${id}`] = value
        } else {
            storage[`${key}`] = {}
            storage[`${key}`][`${id}`] = value
        }
    }

    function removeLocalStorage(key, id) {
        delete storage[`${key}`][`${id}`]
    }

    function updateLocalStorage() {
        localStorage.setItem("app_oi", JSON.stringify(storage))
    }

    function getLocalStorage() {
        storage = JSON.parse(localStorage.getItem("app_oi"))
    }

    return {
        addLocalStorage,
        removeLocalStorage,
        updateLocalStorage,
        getLocalStorage,
    }
}


var LocalStorageSingleton = (function() {
    var instance;

    function createInstance() {
        var object = Storage();
        return object;
    }

    return {
        getInstance: function() {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();