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
    // return res.json()
    return res.json(
        {items:
            [
                ...(await dummyJsonDataFetch()), 
                ...(await fakeStoreDataFetch())
            ]
        }
    )
})

app.listen(4000)