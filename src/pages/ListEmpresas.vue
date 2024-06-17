<template>
  <div>
    <!-- Barra de pesquisa -->
    <form @submit.prevent="searchFornecedores" class="form-inline my-2 my-lg-0 justify-content-end">
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

    <!-- Lista de fornecedores filtrados -->
    <div
      class="d-flex justify-content-center"
      v-for="fornecedor in filteredFornecedores"
      :key="fornecedor.id"
    >
      <div class="card col-6 mt-3">
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <div>
              <h6>Nome Empresarial:</h6>
              <p>{{ fornecedor.nomeEmpresarial }}</p>
            </div>
            <div class="text-muted">
              <small>ID: {{ fornecedor.id }}</small>
            </div>
          </div>

          <h6>Nome Fantasia:</h6>
          <p>{{ fornecedor.nomeFantasia }}</p>

          <h6>CNPJ</h6>
          <p>{{ fornecedor.cnpj }}</p>

          <button
            type="button"
            class="btn btn-primary m-2"
            @click="updateTask(fornecedor.id)"
          >
            Editar
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="confirmDeleteTask(fornecedor.id)"
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
      fornecedor: [],
      searchQuery: "", // Adiciona a query de pesquisa
    };
  },
  computed: {
    filteredFornecedores() {
      // Filtra fornecedores com base na query de pesquisa
      return this.fornecedor.filter((fornecedor) =>
        fornecedor.nomeEmpresarial.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        fornecedor.nomeFantasia.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        fornecedor.cnpj.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  created() {
    this.getTasks();
  },
  methods: {
    async getTasks() {
      this.fornecedor = [];
      const querySnapshot = await getDocs(collection(db, "fornecedor"));
      querySnapshot.forEach((doc) => {
        const objectTask = {
          id: doc.id,
          nomeEmpresarial: doc.data().nomeEmpresarial,
          nomeFantasia: doc.data().nomeFantasia,
          cnpj: doc.data().cnpj,
        };
        this.fornecedor.push(objectTask);
      });
    },
    updateTask(idTaks){
      this.$router.push({name:'FormFornecedor', query:{id: idTaks}})
    },
    confirmDeleteTask(id) {
      if (confirm("Você tem certeza que deseja excluir este Fornecedor?")) {
        this.deleteTask(id);
      }
    },
    async deleteTask(id) {
      try {
        const docRef = doc(db, "fornecedor", id);
        await deleteDoc(docRef);
        this.getTasks(); 
      } catch (error) {
        console.error("Erro ao excluir o cliente:", error);
      }
    },
    searchFornecedores() {
      // Método vazio, pois a busca é reativa e feita através de computed property
    },
  },
};
</script>
