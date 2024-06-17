<template>
  <div>
    <!-- Barra de pesquisa -->
    <form @submit.prevent="searchClients" class="form-inline my-2 my-lg-0 justify-content-end">
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

    <!-- Lista de clientes filtrados -->
    <div
      class="d-flex justify-content-center"
      v-for="tarefa in filteredClients"
      :key="tarefa.id"
    >
      <div class="card col-6 mt-3">
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <div>
              <h6>Nome Completo:</h6>
              <p>{{ tarefa.nomeCompleto }}</p>
            </div>
            <div class="text-muted">
              <small>ID: {{ tarefa.id }}</small>
            </div>
          </div>

          <h6>Nascimento:</h6>
          <p>{{ tarefa.nascimento }}</p>

          <h6>CPF:</h6>
          <p>{{ tarefa.cpf }}</p>

          <h6>Telefone:</h6>
          <p>{{ tarefa.telefone }}</p>

          <h6>Email:</h6>
          <p>{{ tarefa.email }}</p>

          <h6>CEP:</h6>
          <p>{{ tarefa.cep }}</p>

          <h6>Endereço:</h6>
          <p>{{ tarefa.Endereço }}</p>

          <button
            type="button"
            class="btn btn-primary m-2"
            @click="updateTask(tarefa.id)"
          >
            Editar
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="confirmDeleteTask(tarefa.id)"
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
      cliente: [],
      searchQuery: "", // Adiciona a query de pesquisa
    };
  },
  computed: {
    filteredClients() {
      // Filtra clientes com base na query de pesquisa
      return this.cliente.filter((tarefa) =>
        tarefa.nomeCompleto.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  created() {
    this.getTasks();
  },
  methods: {
    async getTasks() {
      this.cliente = [];
      const querySnapshot = await getDocs(collection(db, "cliente"));
      querySnapshot.forEach((doc) => {
        const objectTask = {
          id: doc.id,
          nomeCompleto: doc.data().nomeCompleto,
          nascimento: doc.data().nascimento,
          cpf: doc.data().cpf,
          telefone: doc.data().telefone,
          email: doc.data().email,
          cep: doc.data().cep,
          Endereço: doc.data().Endereço,
        };
        this.cliente.push(objectTask);
      });
    },
    updateTask(idTaks) {
      this.$router.push({ name: 'FormCliente', query: { id: idTaks } });
    },
    confirmDeleteTask(id) {
      if (confirm("Você tem certeza que deseja excluir este cliente?")) {
        this.deleteTask(id);
      }
    },
    async deleteTask(id) {
      try {
        const docRef = doc(db, "cliente", id);
        await deleteDoc(docRef);
        this.getTasks(); // Atualiza a lista de clientes após a exclusão
      } catch (error) {
        console.error("Erro ao excluir o cliente:", error);
      }
    },
    searchClients() {
      // Método vazio, pois a busca é reativa e feita através de computed property
    },
  },
};
</script>
