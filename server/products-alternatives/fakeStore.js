const fs = require("fs")
const path = require("path")

async function fakeStoreDataFetch() {
    try {
        const controller = new AbortController()
        const willThrow = setTimeout(() => {controller.abort()}, 3000)

        const signal = controller.signal

        const res = await fetch('https://fakestoreapi.com/products', {
            method: 'get',
            signal: signal,
        })

        clearTimeout(willThrow)

        const data = await res.json()
        data.forEach(element => {
            element.thumbnail = element.image
            delete element.image
        });

        return data
    } catch (e) {
        console.log(`error: ${e}`)
        const data = JSON.parse(
            fs.readFileSync(
                path.join(
                    __dirname, 
                    "fakeStoreBackup.json"
                )
            ).toString()
        )
        return data
    }
}

module.exports = fakeStoreDataFetch