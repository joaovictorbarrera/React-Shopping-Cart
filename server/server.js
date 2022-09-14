const express = require("express")
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

app.get('/items', async (req, res) => {
    const dummyJson = await dummyJsonDataFetch()
    console.log('dummy json ready')
    const fakeStore = await fakeStoreDataFetch()
    console.log('fake store ready')
    return res.json(
        {items:
            [
                ...dummyJson, 
                ...fakeStore
            ]
        }
    )
})

app.listen(4000)