let express = require("express");
let app = express();
let cors = require('cors');
let api = require("./api.js");

app.use(cors());
app.use('/', api );
app.listen(8080, () => {
    console.log("Server running on port 8080")
})