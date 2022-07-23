class Storage {
    constructor() {
        this.storage;
        this.downloadBrowserLocalStorage()
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
        const browserStorage = JSON.parse(localStorage.getItem("app_oi"))
        browserStorage != null ? this.storage = browserStorage : this.storage = new Object({})
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
            if (!this.instance) {
                this.instance = createInstance();
            }
            return this.instance;
        }
    };
})();