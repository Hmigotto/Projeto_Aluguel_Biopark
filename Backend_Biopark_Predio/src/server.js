const express = require("express");
const cors = require("cors")
const prediosRoutes = require("./predios.routes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(prediosRoutes);

app.get("/saude", (req, res) => {
    return res.json("rodando !");
});

app.listen(3333, () => console.log("Server up in 3333"))