const fs = require("fs")
const path = require("path")

async function fakeStoreDataFetch() {
    try {
        const data = await (await fetch('https://fakestoreapi.com/products')).json()
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