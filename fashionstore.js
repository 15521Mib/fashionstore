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


//criando a model do seu projeto
const UsuarioSchema = new mongoose.Schema({
  email: { type: String, required: true },
  senha: { type: Number, required: true }
});


const Usuario = mongoose.model("Usuario", UsuarioSchema);

const produtoroupaSchema = new mongoose.Schema({
    id_produtoroupa: { type: String, required: true },
    descricao: { type: String },
    marca: { type: String },
    data_fabricacao: { type: String },
    quantidade_estoque: { type: Number },
  });
const produtoroupa = mongoose.model("produtoroupa", UsuarioSchema);


//configuração dos roteamendos
//cadastrousuario
app.post("/cadastrousuario", async (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;

//produtoroupa
  pp.post("/produtoroupa", async (req, res) => {
    const id_produtoroupa = req.body.id_produtoroupa;
    const descricao = req.body.descricao;
    const marca = req.body.marca;
    const data_fabricacao = req.body.data_fabricacao;
    const quantidade_estoque = req.body.quantidade_estoque;


  //validação de campos
  if(nome == null || email == null || senha == null){
    return res.status(400).json({error : "Preenchar todos os campos!!!"});
  }


  //teste de duplicidade
  const emailExiste = await Usuario.findOne({email : email});

  if(emailExiste){
    return res.status(400).json({error : "O email informado já existe"});
  }

  const id_produtoroupaExiste = await produtoroupa.findOne({id_produtoroupa : id_produtoroupa});

  if(id_produtoroupaExiste){
    return res.status(400).json({error : "O id informado já existe"});
  }
  
  const usuario = new Usuario({
    email: email,
    senha: senha
  });

  const produtoroupa = new produtoroupa({
    id_produtoroupa: id_produtoroupa,
    descricao: descricao,
    marca: marca,
    data_fabricacao: data_fabricacao,
    quantidade_estoque: quantidade_estoque,
  });

  try {
    const newUsuario = await usuario.save();
    res.json({ error: null, msg: "Cadastro ok", UsuarioId: newUsuario._id });
  } catch (error) {}
});

  try {
const newprodutoroupa = await produtoroupa.save();
    res.json({ error: null, msg: "Cadastro ok", UsuarioId: newprodutoroupa._id });
  } catch (error) {}
});

//rota de get de formulario
app.get("/cadastrousuario", async (req, res) => {
  res.sendFile(__dirname + "/cadastrousuario.html");
});


app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/index.html");
});


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});