module.exports = class {
    constructor(arr = []) {
        this.set = this.saveUniqueValues(arr)
    }

    get size() {
        return this.set.length
    }

    get [Symbol.toStringTag]() {
        return '^_^';
    }

    saveUniqueValues(arr) {
        return arr.filter((item, idx) => arr.indexOf(item) === idx)
    }

    add(val) {
        if (this.set.indexOf(val) === -1) {
            this.set.push(val)
        }

        return this
    }

    has(val) {
        return this.set.indexOf(val) === -1 ? false : true
    }

    clear() {
        this.set = []
    }

    delete(val) {
        const idx = this.set.indexOf(val);

        if (idx > -1) {
            this.set.splice(idx, 1)
        }
    }

    forEach(cb, context) {
        return this.set.forEach(cb, context)
    }

    valueOf() {
        return this
    }

    *valuesIterator(cb) {
        let index = 0;
        const arr = this.set
        while (index < arr.length) {
            yield cb(arr[index++], arr) // redefine wiht next, done
        }
    }

    entries() {
        return this.valuesIterator(item => [item, item])
    }

    values() {
        return this.valuesIterator(item => item)
    }

    [Symbol.iterator]() {
        return this.valuesIterator(item => item)
    }
}