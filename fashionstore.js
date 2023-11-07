//requisitando os modulos
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

//configurando o express para o postman e para usar a pagina
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = 3000;

//configurando o banco de dados
mongoose.connect("mongodb://127.0.0.1:27017/fashionstore", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//criando a model usuario do meu projeto
const UsuarioSchema = new mongoose.Schema({
    email : {type : String, required : true},
    senha : {type : String}
});

const ProdutoroupaSchema = new mongoose.Schema({
    id_produtoroupa : {type : String, required : true},
    descricao : {type : String},
    marca : {type : String},
    data_fabricacao : {type : Date},
    quantidade_estoque : {type : Number}
})

const Usuario = mongoose.model("Usuario", UsuarioSchema);

const Produtoroupa = mongoose.model("Produtoroupa", ProdutoroupaSchema)

//configuração dos roteamendos
//cadastrousuario
app.post("/cadastrousuario", async (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;
  
   
  const usuario = new Usuario({
    email: email,
    senha: senha
});

  try {
    const newUsuario = await usuario.save();
    res.json({ error: null, msg: "Cadastro ok", UsuarioId: newUsuario._id });
  } catch (error) {}

});


//rota de cadastro especifico
app.post("/produtoroupa", async (req, res) => {
    
    
    const id_produtoroupa = req.body.id_produtoroupa;
    const descricao = req.body.descricao;
    const marca = req.body.id_marca;
    const data_fabricacao = req.body.data_fabricacao;
    const quantidade_estoque = req.body.quantidade_estoque;
     
    const produtocabelo = new Produtocabelo({
      id_produtoroupa: id_produtoroupa,
      descricao: descricao,
      marca: marca,
      data_fabricacao: data_fabricacao,
      quantidade_estoque: quantidade_estoque
    });
  
    try {
      const newProdutoroupa = await produtoroupa.save();
      res.json({ error: null, msg: "Cadastro ok", produtoroupaId: newprodutoroupa._id });
    } catch (error) {}
  
  });

//rota padrao
app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//tem que ter o comando de listen
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});