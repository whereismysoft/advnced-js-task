const { expect, it } = require('@jest/globals');
const MySet = require('./solution')

it('set have unique values', () => {
    const set = new MySet([4, 8, 15, 15, 16, 23, 42])
    console.log([...set])
    expect([...set]).toEqual([4, 8, 15, 16, 23, 42])
})

it('set is iterable with for of construction', () => {
    const arr = []
    const set = new MySet([4, 8, 15, 15, 16, 23, 42])

    for (const item of set) {
        arr.push(item); // 4 8 15 16 23 42
    }
    console.log(arr)
    expect(arr).toEqual([4, 8, 15, 16, 23, 42])
})

it('set entries method returns iterator object of [value, value] for each element', () => {
    const arr = []
    const set = new MySet([4, 8, 15, 15, 16])

    for (const item of set.entries()) {
        arr.push(item);
    }
    console.log(arr)
    expect(arr).toEqual([[4, 4], [8, 8], [15, 15], [16, 16]])
})

it('set value should be empty after clear method call', () => {
    const set = new MySet([4, 8, 15, 15, 16])

    set.clear()
    console.log([...set])
    expect([...set]).toEqual([])
})

it('set have a correct size', () => {
    const set = new MySet([4, 8, 23, 15, 15, 16, 23, 42])

    expect(set.size).toBe(6)
    set.clear()
    expect(set.size).toBe(0)
})

it('set have a correct size', () => {
    const set = new MySet([4, 8, 23, 15, 15, 16, 23, 42])

    expect(set.size).toBe(6)
    set.clear()
    expect(set.size).toBe(0)
})

it('can chain set add method', () => {
    const set = new MySet([])

    set.add(20).add(30).add(40).add(30).add(40)

    expect([...set]).toEqual([20, 30, 40])
})

it('set delete method removes element', () => {
    const set = new MySet([])
    const obj = { 'hey': 'ho' }

    set.add(20).add(30).add(40).add(30).add(40).add(obj)
    set.delete(40)
    set.delete(obj)

    expect([...set]).toEqual([20, 30])
})

it('has method return true if set contains element', () => {
    const set = new MySet([])
    const obj = { 'hey': 'ho' }

    set.add(20).add(30).add(40).add(30).add(40).add(obj).add(obj)

    console.log([...set])
    expect(set.has(40)).toBeTruthy()
    expect(set.has(obj)).toBeTruthy()
})

it('has method return false if set not contains element', () => {
    const set = new MySet([5, 5, 6, 9, {}, {}])
    const obj = {}

    console.log([...set])
    expect(set.has(40)).toBeFalsy()
    expect(set.has(obj)).toBeFalsy()
})

it('properly transforms to boolean primitive', () => {
    const set = new MySet([5, 5, 6, 9, {}, {}])

    expect(set === set.valueOf()).toBeTruthy()

})

it('properly transforms to string primitive', () => {
    const set = new MySet([5, 5, 6, 9, {}, {}])

    expect(String(set)).toBe('[object ^_^]')
    expect(Object.prototype.toString.call(set)).toBe('[object ^_^]')
})

it('set forEach method working properly', () => {
    const object = {
        getValue() { return this.value }
    }

    const object2 = {
        getValue() { return this.value }
    }

    const object3 = {
        getCount() { return this.count + 20 }
    }

    const data = {
        value: '123'
    }

    const data2 = {
        count: 7
    }

    const set = new MySet([object, object2])
    const arr = []
    const arr2 = []

    set.forEach(function (item) {
        arr.push(item.getValue.call(this)); // 42
    }, data)

    expect(arr).toEqual(['123', '123'])

    set.clear()
    set.add(object3)

    set.forEach(function (item) {
        arr2.push(item.getCount.call(this)); // 42
    }, data2)
    expect(arr2).toEqual([27])

})

// set.forEach(function (item) {
//     console.log(item.getValue.call(this)); // 42
// }, data)