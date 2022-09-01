const express = require("express")

const app = express()

app.use(require("./logger"))

const cors = require("cors")
app.use(
    cors({
        origin:"http://localhost:3000"
    })
)
app.use(express.static('public'))

app.get('/items', (req, res) => {
    res.json({"items": [
        {name:"Phone", price:900, picture:"http://localhost:4000/products/galaxys22.jpg"},
        {name:"Mouse", price:60, picture:"http://localhost:4000/products/g403.jpg"},
        {name:"Keyboard", price:100, picture:"http://localhost:4000/products/g810.jpg"},
        {name:"Monitor", price:300, picture:"http://localhost:4000/products/samsung-monitor-32.jpg"},
        {name:"Monitor2", price:300, picture:"http://localhost:4000/products/samsung-monitor-32.jpg"},
        {name:"Keyboard2", price:100, picture:"http://localhost:4000/products/g810.jpg"},
        {name:"Phone2", price:900, picture:"http://localhost:4000/products/galaxys22.jpg"},
        {name:"Mouse2", price:60, picture:"http://localhost:4000/products/g403.jpg"},
    ]})
})

app.get('/productshttp://localhost:4000/products/samsung-monitor-32.jpg/:id', (req, res) => {
    try {
        res.sendFile("./public/products/" + req.params.id)
    }
    catch(e) {
        res.sendStatus(404)
    }
})

app.listen(4000)