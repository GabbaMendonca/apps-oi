class Storage {
    constructor() {
        this.storage;
        this._initialize()
    }

    _initialize() {
        this.downloadBrowserLocalStorage()
        if (!this.storage) this.storage = new Object({})
    }

    addLocalStorage(key, id, value) {
        if (this.storage[`${key}`]) {
            this.storage[`${key}`][`${id}`] = value
        } else {
            this.storage[`${key}`] = {}
            this.storage[`${key}`][`${id}`] = value
        }
    }

    removeLocalStorage(key, id) {
        delete this.storage[`${key}`][`${id}`]
    }

    updateLocalStorage() {
        localStorage.setItem("app_oi", JSON.stringify(this.storage))
    }

    getListLocalStorage(key) {
        return this.storage[`${key}`]
    }

    downloadBrowserLocalStorage() {
        this.storage = JSON.parse(localStorage.getItem("app_oi"))
    }
}


var LocalStorageSingleton = (function() {
    var instance;

    function createInstance() {
        var object = new Storage();
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