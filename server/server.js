const express = require("express")
const fs = require("fs")
const app = express()

app.use(require("./logger"))

const cors = require("cors")
app.use(
    cors({
        origin:"*"
    })
)
app.use(express.static('public'))

app.get('/items', async (req, res) => {
    const data =  JSON.parse((fs.readFileSync("./data.json")).toString())
    res.json({"items": data})
})

app.listen(4000)

/*

    // res.json({"items": [
    //     {name:"Phone", price:900, picture:"http://localhost:4000/products/galaxys22.jpg"},
    //     {name:"Mouse", price:60, picture:"http://localhost:4000/products/g403.jpg"},
    //     {name:"Keyboard", price:100, picture:"http://localhost:4000/products/g810.jpg"},
    //     {name:"Monitor", price:300, picture:"http://localhost:4000/products/samsung-monitor-32.jpg"},
    //     {name:"Monitor2", price:300, picture:"http://localhost:4000/products/samsung-monitor-32.jpg"},
    //     {name:"Keyboard2", price:100, picture:"http://localhost:4000/products/g810.jpg"},
    //     {name:"Phone2", price:900, picture:"http://localhost:4000/products/galaxys22.jpg"},
    //     {name:"Mouse2", price:60, picture:"http://localhost:4000/products/g403.jpg"},
    // ]})
*/