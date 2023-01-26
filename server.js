const app = require("./app/main")


var port = process.env.PORT || 3001

app.listen(port, () => {
    console.log("listen in port ", port)
})