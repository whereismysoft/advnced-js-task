class MySet {
    constructor(arr) {
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
        this.set.forEach(item => {
            Object.setPrototypeOf(item, context)
            const binded = cb.bind(context)
            return binded(item)
        })
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

    [Symbol.iterator]() {
        return this.valuesIterator(item => item)
    }
}

// MySet.prototype.valueOf = function () {
//     return this.values;
// };

// const set = new MySet([4, 8, 15, 15, 16, 23, 42, 4, 4]);

// console.log([...set]); // [ 4, 8, 15, 16, 23, 42 ]
// console.log('[size]', set.size) // [4, 8, 15, 15, 16, 23, 42, 4, 4].length

// for (const item of set) {
//     console.log(item); // 4 8 15 16 23 42
// }

// for (const item of set.entries()) {
//     console.log(item); // [ 4, 4 ] [ 8, 8 ] ...
// }

// set.clear()

// console.log('[size]', set.size) // 0

// set.add(20).add(30).add(40);

// console.log([...set]);

// set.delete(30);

// console.log([...set]);

// const obj = {}

// set.add(obj)

// console.log('[has obj]', set.has(obj))

// console.log(set === set.valueOf())

// const object = {
//     getValue() {
//         console.log(this)
//         return this.value
//     }
// }

// const data = {
//     value: 42
// }

// set.clear();

// set.add(object).add(object).add(object);

// set.forEach(function (item) {
//     console.log(item.getValue.call(this)); // 42
// }, data)

module.exports = MySet