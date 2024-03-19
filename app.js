const express = require('express');
const app = express();

const db = require('./db/connection');
const PORT = 1000;

app.listen(PORT,function(){
    console.log(`O Express está rodando na porta ${PORT}`)
});
//db connection

db
.authenticate()
.then(()=>
{
    console.log("Conectou com sucesso")
    
})
.catch(err=>{
    console.log("Ocorreu um erro ao conectar",err)
});

//rotas
app.get('/',(req,res)=>{
    res.send("Está funcionando 2")
});