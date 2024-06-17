<template>
  <div class="d-flex justify-content-center">
    <div class="card col-6 mt-3">
      <form>
        <div class="card-header">
          <span v-if="form.id">Editar</span><span v-else>Cadastro</span>
        </div>
        <div class="card-body">
          <div class="mb-3">
            <label for="title" class="form-label">Nome Fantasia</label>
            <input
              type="text"
              class="form-control"
              id="title"
              name="title"
              v-model="form.nomeFantasia"/>
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">Nome empresarial</label>
            <textarea
              class="form-control"
              id="description"
              name="description"
              v-model="form.nomeEmpresarial"
            ></textarea>
          </div>
        <div class="mb-3">
          <label for="title" class="form-label">CNPJ</label>
          <input
            type="text"
            class="form-control"
            id="title"
            name="title"
            v-model="form.cnpj"
            v-mask="'##.###.###/####-##'"
            placeholder="00.000.000/0000-00"/>
        </div>
        </div>
        <div class="card-footer d-flex justify-content-between">
          <button type="button" class="btn btn-primary" @click="saveTask">
            {{ form.id ? "Atualizar" : "Cadastrar" }}
          </button>
          <button v-if="form.id" type="button" class="btn btn-danger" @click="confirmDeleteTask">
            Excluir
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import db from "../firebaseDB";
import { collection, doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { mask } from 'vue-the-mask'; 

// import { v4 as uuidv4 } from 'uuid'; // Descomente se estiver usando uuid

export default {
  name: "Form",
  directives: { mask }, // Adicione a diretiva
  data() {
    return {
      form: {
        id: null,
        nomeEmpresarial: "",
        nomeFantasia: "",
        cnpj: "",
      },
    };
  },
  created() {
    const id = this.$route.query.id;
    if (id) {
      this.form.id = id;
      this.loadTask(id);
    }
  },
  methods: {
    async loadTask(id) {
      const docRef = doc(db, "fornecedor", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.form.nomeEmpresarial = docSnap.data().nomeEmpresarial;
        this.form.nomeFantasia = docSnap.data().nomeFantasia;
        this.form.cnpj = docSnap.data().cnpj;
      }
    },
    async saveTask() {
      if (this.form.id) {
        await this.updateTask();
      } else {
        await this.insertTask();
      }
    },
    async insertTask() {
      // Gerar um ID aleatório
      const newId = 'id-' + Math.random().toString(36).substr(2, 9); // Ou use uuidv4()

      // Inserir o novo documento com o ID gerado
      await setDoc(doc(db, "fornecedor", newId), {
        id: newId,
        nomeEmpresarial: this.form.nomeEmpresarial,
        nomeFantasia: this.form.nomeFantasia,
        cnpj: this.form.cnpj,
      });

      this.clearForm();
      this.$router.push({ name: "listEmpresas" });
    },
    async updateTask() {
      const docRef = doc(db, "fornecedor", this.form.id);
      await updateDoc(docRef, {
        nomeEmpresarial: this.form.nomeEmpresarial,
        nomeFantasia: this.form.nomeFantasia,
        cnpj: this.form.cnpj,
      });
      this.clearForm();
      this.$router.push({ name: "listEmpresas" });
    },
    confirmDeleteTask() {
      if (confirm("Você tem certeza que deseja excluir esta fornecedor?")) {
        this.deleteTask();
      }
    },
    async deleteTask() {
      const docRef = doc(db, "fornecedor", this.form.id);
      await deleteDoc(docRef);
      this.clearForm();
      this.$router.push({ name: "listEmpresas" });
    },
    clearForm() {
      this.form.id = null;
      this.form.nomeEmpresarial = "";
      this.form.nomeFantasia = "";
      this.form.cnpj = "";
    },
  },
};
</script>
