const fs = require("fs")
const path = require("path")

async function dummyJsonDataFetch() {
    try {
        const controller = new AbortController()
        const willThrow = setTimeout(() => {controller.abort()}, 3000)

        const signal = controller.signal

        const res = await fetch('https://dummyjson.com/products?limit=999999999', {
            method: 'get',
            signal: signal,
        })

        clearTimeout(willThrow)
        const data = await res.json()
        return data.products
    } catch (e) {
        console.log(`error: ${e}`)
        const data = JSON.parse(
            fs.readFileSync(
                path.join(
                    __dirname, 
                    "dummyJsonBackup.json"
                )
            ).toString()
        )
        return data
    }
}

module.exports = dummyJsonDataFetch