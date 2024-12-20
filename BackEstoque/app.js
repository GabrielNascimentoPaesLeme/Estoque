import dotenv from "dotenv";
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import cors from 'cors';
import {User} from './models/User.js'
import { Product } from "./models/Product.js";

dotenv.config()

const app = express()
app.use(express.json())

app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: false,
}));

//variáveis de ambiente
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS

//conexão com o db utilizando mongoose
mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@estoque.fqxeb.mongodb.net/?retryWrites=true&w=majority&appName=Estoque`).then(() => {
  app.listen(3000);
  console.log("Conectado ao Banco")
}).catch((error) => console.log(error))

//Rota publica
app.get('/', (req,res) => {
  res.status(200).json({message: "API rodando"})
})

//Rota privada
app.get('/user/:id', checkToken, async (req, res) => {
  const id = req.params.id;

  const existingUser = await User.findById(id, '-password');

  if(!existingUser){
    return res.status(404).json({message: "Usuário não encontrado"})
  }

  res.status(200).json({existingUser})
})

//Função para verificação do token
function checkToken(req, res, next) {
  const header = req.headers['authorization'];
  const token = header && header.split(" ")[1];

  if(!token){
    return res.status(401).json({message: "Acesso negado!"})
  }

  try {
    const secretKey = process.env.SECRET_KEY
    jwt.verify(token, secretKey)

    next()

  } catch (error) {
    res.status(400).json({message: 'Token inválido!'})
  }
}

//Rota para Registro
app.post("/register", async (req,res) => {
  const {email, password, confirmePassword, username} = req.body

  if(!username || !password || !email){
    return res.status(422).json({message: "Dados Obrigatórios"})
  }

  if(password !== confirmePassword){
    return res.status(422).json({message: "Senhas não conferem"})
  }

  const existingUser = await User.findOne({email: email})

  if(existingUser){
    return res.status(422).json({message: "E-mail já cadastrado, prossiga para o login"})
  }

  const hashPassword = await bcrypt.hash(password, 12)

  const user = new User({
    username,
    email,
    password: hashPassword,
  })

  try {
    await user.save()
    res.status(201).json({message: `${username} cadastrado/a`})
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Ocorreu um erro no servidor"
    });
  }
})

//Rota para Login
app.post("/login", async (req, res) => {
  const {email, password} = req.body;
  if(!email || !password){
    return res.status.apply(422).json({message: "e-mail e senha necessários para login"})
  }

  try { 
    const existingUser = await User.findOne({email: email})
    if(existingUser &&(await bcrypt.compare(password, existingUser.password))){
      const secretKey = process.env.SECRET_KEY;
      const nameExistingUser = existingUser.username;
      const token = jwt.sign(
        {
          id: existingUser.id,
        },
        secretKey
      )
      res.status(200).json({message: "autenticação realizada com sucesso",existingUser, token, nameExistingUser})
    }else{
      res.status(404).json({message: "Credenciais inválidas"})
    }
  } catch (error) {
    res.status(500).json({message: "erro no servidor"})
  }
})

//Rota para adicionar produtos
app.post('/adicionar', async (req, res) => {
  const { ref, descricao, nome, categoria, sizes } = req.body;

  const existingProduct = await Product.findOne({ref: ref})
  const total = sizes.reduce((total, size) => total + size.quantidade, 0)

  if(existingProduct){
    return res.status(422).json({message: "Produto já inserido no banco de dados", total: total})
  }
  
  const product = new Product({
    ref,
    descricao,
    nome,
    categoria,
    sizes,
    total
  })

  try {
    await product.save()
    res.status(201).json({message: 'Produto cadastrado', product})
  } catch (error) {
    res.status(500).json({message: "Ocorreu um erro no servidor", error});
  }
})

//Rota para listagem de produtos
app.get('/listar', async (req, res) => {
  let products = []

  products = await Product.find()

  res.status(200).json(products)  
})

app.put('/editar', async (req, res) => {
  if (Array.isArray(req.body)){
    for (const obj of req.body) {
      const {ref, cor, size, quantidade} = obj;
      const existingProduct = await Product.findOne({ref: ref});
      if (existingProduct){
        const {sizes} = existingProduct.toObject();
        for(const {cor: sizeColor, size: sizeValue, quantidade: sizeQuantidade} of sizes) {
          if(obj.cor === sizeColor && obj.size === sizeValue) {
            console.log(quantidade)
            const updateProduct = await Product.updateOne(
              { ref, sizes: { $elemMatch: { cor: sizeColor, size: sizeValue } } },
              { $set: { 'sizes.$[element].quantidade': quantidade } },
              { arrayFilters: [{ 'element.cor': sizeColor, 'element.size': sizeValue }] }
            );
            if (updateProduct){
              /* console.log(`Updated product: ${JSON.stringify(updateProduct.toObject())}`); */
              const updatedExistingProduct = await Product.findOne({ ref: ref });
              console.log(`Quantidade atualizada: ${updatedExistingProduct.sizes.find(size => size.cor === sizeColor && size.size === sizeValue).quantidade}`);
              console.log(quantidade)
            }
          }
        }
      }
    }
  }
})