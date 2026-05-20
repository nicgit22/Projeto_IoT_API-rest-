//requisitando as bibçiotecas necessarias
const express = require('express');
const cors = require('cors');
const app = express();

//infomando as dependencias utilizadas
app.use(cors());
app.use(express.json());

//criando banco de dados
let historicoSensores = [
    {id:1, tempertura:25,umidade:50,hora:"10:00"},
    {id:2, tempertura:40,umidade:60,hora:"11:00"},
    {id:3, tempertura:35,umidade:55,hora:"12:00"}
];

//metodo GET
app.get('/api/dados', (req,res) => {
    res.json(historicoSensores);
})

//metodo POST
app.post('/api/dados', (req,res) =>{
    const{tempertura,umidade,hora} = req.body;

    if (!tempertura || !umidade || !hora ){
        return res.status(400).json({mensagem:"dados incompletos! verifique novamente!"});
    }

    const novosDados = {
        id: historicoSensores.length + 1,
        tempertura,
        umidade,
        hora
    }

    historicoSensores.push(novosDados);
    res.status(201).json({mensagem:"Dados enviados com sucesso",dados:novosDados})
});

//deifinindo a porta
const PORT = process.env.use || 3000;
app.listen(PORT , () =>{
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log("servidor com metodo post e get");
})
