export default class Action {
    constructor(type, description, amount, date) {
        this.id = Math.round(Math.random() * 1000);
        this.type = type;
        this.description = description;
        let parts = date.split("-");
        this.date = `${parts[2]}/${parts[1]}/${parts[0]}`;
        this.amount = type == "expense" ? -amount : amount;
    }

    get(propName) {
        return this[propName];
    }

    set(propName, value) {
        this[propName] = value;
    }
}