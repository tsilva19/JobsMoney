const express = require("express");
const server = express();


//habilitar arquivos estaticos
server.use(express.static("public"));


server.get('/', (request, response) =>{
    console.log('Acessando index')

    return response.sendFile(__dirname + "/views/index.html")
})
server.listen(3000, ()=> console.log("Servidor ativo"))