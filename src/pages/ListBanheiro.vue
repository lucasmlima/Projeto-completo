<template>
    <div class="container">
      <!-- Barra de pesquisa -->
      <form @submit.prevent="searchProdutos" class="form-inline my-2 my-lg-0 justify-content-center">
        <input
          v-model="searchQuery"
          class="form-control mr-sm-2"
          type="search"
          placeholder="Pesquisar"
          aria-label="Pesquisar"
        />
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
          Pesquisar
        </button>
      </form>
  
      <!-- Lista de produtos filtrados -->
      <div class="row mt-3">
        <div v-for="produto in filteredProdutos" :key="produto.id" class="col-lg-4">
          <div class="card mb-3">
            <div class="card-body">
              <h5 class="card-title">Nome: {{ produto.nome }}</h5>
              <p class="card-text">Informações do Produto: {{ produto.infoProduto }}</p>
              <img :src="produto.imageUrl" alt="Imagem do Produto" class="card-img-top img-thumbnail">
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { collection, getDocs } from "firebase/firestore";
  import db from "../firebaseDB";
  
  export default {
    data() {
      return {
        produtos: [],
        searchQuery: "", // Adiciona a query de pesquisa
      };
    },
    computed: {
      filteredProdutos() {
        // Filtra produtos com base na query de pesquisa e se selectedOption é 3
        return this.produtos.filter((produto) =>
          (produto.nome.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
           produto.infoProduto.toLowerCase().includes(this.searchQuery.toLowerCase())) &&
           produto.selectedOption === 3
        );
      },
    },
    created() {
      this.getProdutos();
    },
    methods: {
      async getProdutos() {
        const querySnapshot = await getDocs(collection(db, "produto"));
        querySnapshot.forEach((doc) => {
          const produto = {
            id: doc.id,
            ...doc.data()
          };
          this.produtos.push(produto);
        });
      },
      searchProdutos() {
        // Método vazio, pois a busca é reativa e feita através de computed property
      },
    },
  };
  </script>
  
  <style>
  .container {
    margin-left: auto;
    margin-right: auto;
  }
  
  .card {
    margin-bottom: 20px;
  }
  
  .card-img-top {
    width: 50%;
    margin-left: auto;
    margin-right: auto;
  }
  </style>
  