class SavedContacts {
    constructor(name, number, id) {
        this.name = name
        this.number = number
        this.id = id
        this.interactions = 0
    }

    interacted() {
        this.interactions ++;
    }
}