<template>
    <div>
      <!-- Barra de pesquisa -->
      <form @submit.prevent="searchProdutos" class="form-inline my-2 my-lg-0 justify-content-end">
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
      <div
        class="d-flex justify-content-center"
        v-for="produto in filteredProdutos"
        :key="produto.id"
      >
        <div class="card col-6 mt-3">
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <div>
                <h6>Nome:</h6>
                <p>{{ produto.nome }}</p>
              </div>
              <div class="text-muted">
                <small>ID: {{ produto.id }}</small>
              </div>
            </div>
  
            <h6>Informações do Produto:</h6>
            <p>{{ produto.infoProduto }}</p>

            <h6>Preço:</h6>
            <p>{{ produto.preco }}</p>
  
            <h6>Imagem do Produto:</h6>
            <img :src="produto.imageUrl" alt="Imagem do Produto" class="img-fluid">
  
            <button
              type="button"
              class="btn btn-primary m-2"
              @click="updateTask(produto.id)"
            >
              Editar
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="confirmDeleteTask(produto.id)"
            >
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import db from "../firebaseDB";
  import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
  
  export default {
    data() {
      return {
        produto: [],
        searchQuery: "", // Adiciona a query de pesquisa
      };
    },
    computed: {
      filteredProdutos() {
        // Filtra produtos com base na query de pesquisa
        return this.produto.filter((produto) =>
          produto.nome.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          produto.infoProduto.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
    },
    created() {
      this.getTasks();
    },
    methods: {
      async getTasks() {
        this.produto = [];
        const querySnapshot = await getDocs(collection(db, "produto"));
        querySnapshot.forEach((doc) => {
          const objectTask = {
            id: doc.id,
            nome: doc.data().nome,
            preco: doc.data().preco,
            infoProduto: doc.data().infoProduto,
            imageUrl: doc.data().imageUrl // Adicione esta linha
          };
          this.produto.push(objectTask);
        });
      },
      updateTask(idTaks){
        this.$router.push({name:'FormProduto', query:{id: idTaks}})
      },
      confirmDeleteTask(id) {
        if (confirm("Você tem certeza que deseja excluir este Produto?")) {
          this.deleteTask(id);
        }
      },
      async deleteTask(id) {
        try {
          const docRef = doc(db, "produto", id);
          await deleteDoc(docRef);
          this.getTasks(); 
        } catch (error) {
          console.error("Erro ao excluir o produto:", error);
        }
      },
      searchProdutos() {
        // Método vazio, pois a busca é reativa e feita através de computed property
      },
    },
  };
  </script>
  