async function dummyJsonDataFetch() {
    try {
        const res = await fetch('https://dummyjson.com/products?limit=999999999')
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