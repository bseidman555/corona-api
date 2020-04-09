let express = require("express");
let app = express();
let api = require("./api.js");


app.use('/', api );
app.listen(8080, () => {
    console.log("Server running on port 3000")
})