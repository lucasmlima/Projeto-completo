<template>
    <div class="d-flex justify-content-center">
      <div class="card col-6 mt-3">
        <form>
          <div class="card-header">
            <span v-if="form.id">Editar</span><span v-else>Cadastro</span>
          </div>
          <div class="card-body">

            <div class="mb-3">
              <label for="title" class="form-label">Nome Completo:</label>
              <input
                type="text"
                class="form-control"
                id="title"
                name="title"
                v-model="form.nomeCompleto"/>
            </div>

            <div class="mb-3">
              <label for="title" class="form-label">Nascimento:</label>
              <input
                type="text"
                class="form-control"
                id="title"
                name="title"
                v-mask="'##/##/####'"
                placeholder="__/__/____"
                v-model="form.nascimento"/>
            </div>

            <div class="mb-3">
              <label for="title" class="form-label">CPF:</label>
              <input
                type="text"
                class="form-control"
                id="title"
                name="title"
                v-model="form.cpf"
                v-mask="'###.###.###-##'"
                placeholder="000.000.000-00"
                required/>
            </div>

            <div class="mb-3">
              <label for="title" class="form-label">Telefone:</label>
              <input
                type="text"
                class="form-control"
                id="title"
                name="title"
                v-mask="'(##)#####-####'"
                v-model="form.telefone"/>
            </div>

            <div class="mb-3">
              <label for="title" class="form-label">Email:</label>
              <input
                type="text"
                class="form-control"
                id="title"
                name="title"
                v-model="form.email"
                @blur="validateEmail"/>
              <small id="emailHelp" class="form-text text-danger" v-if="emailError">{{ emailError }}</small>
            </div>

            <div class="mb-3">
              <label for="cep" class="form-label">CEP:</label>
              <input
                type="text"
                class="form-control"
                id="cep"
                name="cep"
                v-mask="'#####-###'"
                v-model="form.cep"
                @blur="fetchAddress"/>
            </div>

            <div class="mb-3">
              <label for="title" class="form-label">Endereço:</label>
              <input
              class="form-control"
              id="description"
              name="description"
              v-model="form.Endereço"/>
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

  
  export default {
    name: "Form",
    directives: { mask },
    data() {
      return {
        form: {
          id: null,
          nomeCompleto: "",
          nascimento: "",
          cpf: "",
          telefone: "",
          email: "",
          cep: "",
          Endereço: "",
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
        const docRef = doc(db, "cliente", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          this.form.nomeCompleto = docSnap.data().nomeCompleto;
          this.form.nascimento = docSnap.data().nascimento;
          this.form.cpf = docSnap.data().cpf;
          this.form.telefone = docSnap.data().telefone;
          this.form.email = docSnap.data().email;
          this.form.cep = docSnap.data().cep;
          this.form.Endereço = docSnap.data().Endereço;
          this.validateEmail();
        }
      },

      async fetchAddress() {
    const cep = this.form.cep.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (!response.ok) throw new Error('CEP não encontrado');
        const data = await response.json();
        if (data.erro) {
          this.form.Endereço = 'CEP não encontrado';
        } else {
          this.form.Endereço = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
        }
      } catch (error) {
        this.form.Endereço = 'Erro ao buscar endereço';
      }
    } else {
      this.form.Endereço = 'CEP inválido';
    }
  },
        validateEmail() {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
           if (!this.form.email.match(emailRegex)) {
              this.emailError = 'Por favor, insira um email válido.';
            } else {
          this.emailError = ' ';
          this.emailValid = true;
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
        await setDoc(doc(db, "cliente", newId), {
          id: newId,
          nomeCompleto: this.form.nomeCompleto,
          nascimento: this.form.nascimento,
          cpf: this.form.cpf,
          telefone: this.form.telefone,
          email: this.form.email,
          cep: this.form.cep,
          Endereço: this.form.Endereço,
        });
  
        this.clearForm();
        this.$router.push({ name: "ListClientes" });
      },
      async updateTask() {
        const docRef = doc(db, "cliente", this.form.id);
        await updateDoc(docRef, {
          nomeCompleto: this.form.nomeCompleto,
          nascimento: this.form.nascimento,
          cpf: this.form.cpf,
          telefone: this.form.telefone,
          email: this.form.email,
          cep: this.form.cep,
          Endereço: this.form.Endereço,
        });
        this.clearForm();
        this.$router.push({ name: "ListClientes" });
      },
      confirmDeleteTask() {
      if (confirm("Você tem certeza que deseja excluir este cliente?")) {
        this.deleteTask(this.form.id);
      }
    },
    async deleteTask() {
      const docRef = doc(db, "cliente", this.form.id);
      await deleteDoc(docRef);
      this.clearForm();
      this.$router.push({ name: "ListClientes" });
    },
      clearForm() {
        this.form.id = null;
        this.form.nomeCompleto = "";
        this.form.nascimento = "";
        this.form.cpf = "";
        this.form.telefone = "";
        this.form.email = "";
        this.form.cep = "";
        this.form.Endereço = "";
      },
    },
  };
  </script>
  