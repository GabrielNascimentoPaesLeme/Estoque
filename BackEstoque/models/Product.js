import mongoose from "mongoose";

//Subdocumento para variar os tamanhos
const modelSize = new mongoose.Schema({
  cor: {
    type: String,
    required: true,
    enum: ['azul', 'amarela', 'vermelha', 'branca', 'preta']
  },
  size: {
    type: String,
    required: true,
    enum: ['2 anos', '4 anos', '6 anos', '8 anos', '10 anos', '12 anos']
  },
  quantidade: {
    type: Number,
    required: true,
    min: [0, 'A quantidade não pode ser negativa']
  },
});

export const Product = mongoose.model('Product', {
  ref: {
    type: String,
    required: true
  },
  descricao: String,
  name: String,
  categoria: {
    type: String,
    required: true,
    enum: ['vestidos estampados', 'vestidos lisos']
  },
  cor: {
    type: String,
    validate: {
      validator: function(value) {
        if (this.categoria === 'vestidos lisos' && !value) {
          return false;
        }
        return true;
      },
      message: 'Cor é obrigatória para vestidos lisos',
    },
  },
  sizes: [modelSize],
  total: Number
})