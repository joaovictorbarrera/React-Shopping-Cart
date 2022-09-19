const express = require("express")
const path = require("path")
const fs = require("fs")
const app = express()

console.log("Server Started")

app.use(require("./logger"))

const dummyJsonDataFetch = require("./products-alternatives/dummyJson.js")
const fakeStoreDataFetch = require("./products-alternatives/fakeStore.js")

app.use(
    require("cors")({
        origin:"*"
    })
)
const buildFolder = path.resolve('../client/build')
app.use(express.static(buildFolder, {index: false}))
app.set('views', buildFolder);
app.set('view engine', 'ejs');

function fixIds(data) {
    data.forEach((item, index) => item.id = index)
    return data
}

function injectVariablesIntoHTML(filepath, outputFilePath, vars) {
    if (!fs.existsSync(outputFilePath)) {
        const indexHTML = fs.readFileSync(filepath).toString()
        const endOfBody = indexHTML.indexOf("</body>")
        const newContent = (
            indexHTML.substring(0, endOfBody) + 
            `<script>${Object.keys(vars).map(variableName => `window.${variableName} = \"${vars[variableName]}\"`)}</script>` + 
            indexHTML.substring(endOfBody)
        )
        fs.writeFileSync(outputFilePath, newContent)
        console.log("saved ejs file")
    }
}

const ITEMS_API_URL = process.env.REACT_APP_ITEMS_API_URL
injectVariablesIntoHTML(
    buildFolder + "/index.html", 
    buildFolder + "/app.html", 
    {ITEMS_API_URL}
)

app.get('/', (req, res) => {
    res.sendFile(buildFolder + "/app.html")
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