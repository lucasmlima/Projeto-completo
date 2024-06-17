<template>
  <div class="d-flex justify-content-center">
    <div class="card col-6 mt-3">
      <form @submit.prevent="saveTask">
        <div class="card-header">
          <span v-if="form.id">Editar</span><span v-else>Cadastro</span>
        </div>
        <div class="card-body">
          <div class="mb-3">
            <label for="title" class="form-label">Nome do Produto</label>
            <input
              type="text"
              class="form-control"
              id="title"
              name="title"
              v-model="form.nome"
            />
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">Informações do Produto</label>
            <textarea
              class="form-control"
              id="description"
              name="description"
              v-model="form.infoProduto"
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="price" class="form-label">Preço:</label>
            <input
              type="text"
              class="form-control"
              id="price"
              name="price"
              v-mask="'R$: ##.###,###,###,###,###,###,###,###...'"
              v-model="form.preco"
            />
          </div>
          <div class="mb-3">
            <label for="image" class="form-label">Imagem do Produto</label>
            <input
              type="file"
              class="form-control"
              id="image"
              @change="onFileChange"
            />
          </div>

          <div class="mb-3">
            <label for="selectOptions" class="form-label">Selecione uma opção</label>
            <select v-model="form.selectedOption" class="form-select" id="selectOptions">
              <option v-for="option in selectOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
            </select>
          </div>
        </div>
        <div class="card-footer d-flex justify-content-between">
          <button type="submit" class="btn btn-primary">
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
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; 
import { mask } from 'vue-the-mask'; 


export default {
  name: "Form",
  directives: { mask }, 
  data() {
    return {
      form: {
        id: null,
        nome: "",
        preco: "",
        infoProduto: "",
        imageUrl: "", 
        selectedOption: null 
      },
      imageFile: null, 
      selectOptions: [ 
        { label: "Pinturas", value: 1 },
        { label: "Argamassa e Rejunte", value: 2 },
        { label: "Banheiro", value: 3 },
        { label: "Cimentos", value: 4 },
        { label: "Cobertura", value: 5 },
        { label: "Esquadrias", value: 6 },
        { label: "Ferramentas", value: 7 },
        { label: "Pisos", value: 8 },
      ],
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
      const docRef = doc(db, "produto", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.form.infoProduto = docSnap.data().infoProduto;
        this.form.nome = docSnap.data().nome;
        this.form.preco = docSnap.data().preco;
        this.form.imageUrl = docSnap.data().imageUrl; 
        this.form.selectedOption = docSnap.data().selectedOption; 
      }
    },
    onFileChange(e) {
      this.imageFile = e.target.files[0]; 
    },
    async saveTask() {
      if (this.imageFile) {
        const storage = getStorage();
        const storageRef = ref(storage, 'images/' + this.imageFile.name);
        await uploadBytes(storageRef, this.imageFile);
        const imageUrl = await getDownloadURL(storageRef);
        this.form.imageUrl = imageUrl; 
      }
      if (this.form.id) {
        await this.updateTask();
      } else {
        await this.insertTask();
      }
      this.checkSelectedOption();
    },
    async insertTask() {
      const newId = 'id-' + Math.random().toString(36).substr(2, 9);
      await setDoc(doc(db, "produto", newId), {
        id: newId,
        infoProduto: this.form.infoProduto,
        nome: this.form.nome,
        preco: this.form.preco,
        imageUrl: this.form.imageUrl, 
        selectedOption: this.form.selectedOption 
      });
      this.clearForm();
      this.$router.push({ name: "listProdutos" });
    },
    async updateTask() {
      const docRef = doc(db, "produto", this.form.id);
      await updateDoc(docRef, {
        infoProduto: this.form.infoProduto,
        nome: this.form.nome,
        preco: this.form.preco,
        imageUrl: this.form.imageUrl, 
        selectedOption: this.form.selectedOption 
      });
      this.clearForm();
      this.$router.push({ name: "listProdutos" });
    },
    confirmDeleteTask() {
      if (confirm("Você tem certeza que deseja excluir este produto?")) {
        this.deleteTask();
      }
    },
    async deleteTask() {
      const docRef = doc(db, "produto", this.form.id);
      await deleteDoc(docRef);
      this.clearForm();
      this.$router.push({ name: "listProdutos" });
    },
    clearForm() {
      this.form.id = null;
      this.form.infoProduto = "";
      this.form.nome = "";
      this.form.preco = "";
      this.form.imageUrl = "";
      this.form.selectedOption = null;
      this.imageFile = null;
    },
    checkSelectedOption() {
      if (this.form.selectedOption === 7) {
        this.$router.push({ name: "ListFerramentas", query: { id: this.form.id } });
      }
    }
  },
};
</script>
