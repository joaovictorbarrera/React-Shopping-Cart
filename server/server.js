const express = require("express")
const path = require("path")
const app = express()

app.use(require("./logger"))

const cors = require("cors")
const dummyJsonDataFetch = require("./products-alternatives/DummyJson")
const fakeStoreDataFetch = require("./products-alternatives/fakeStore")

app.use(
    cors({
        origin:"*"
    })
)
app.use(express.static('public'))

function fixIds(data) {
    data.forEach((item, index) => item.id = index)
    return data
}

app.get('/', (req, res) => {
    res.sendFile(path.resolve("./public/build/index.html"))
})

app.get('/items', async (req, res) => {
    const dummyJson = await dummyJsonDataFetch()
    const fakeStore = await fakeStoreDataFetch()

    let data = [
        ...fakeStore,
        ...dummyJson, 
    ]

    data = fixIds(data)

    return res.json(
        {items: data}
    )
})

app.listen(4000)