import Home from "@/pages/Home.vue";
import ListEmpresas from "@/pages/ListEmpresas.vue";
import FormFornecedor from "@/pages/FormFornecedor.vue";

import FormCliente from "@/pages/FormCliente.vue";
import ListClientes from "@/pages/ListClientes.vue";

import ListProdutos from "@/pages/ListProdutos.vue";
import FormProduto from "@/pages/FormProduto.vue";

import ListPinturas from "@/pages/ListPinturas.vue";
import ListArgRej from "@/pages/ListArgRej.vue";
import ListBanheiro from "@/pages/ListBanheiro.vue";
import ListCimentos from "@/pages/ListCimentos.vue";
import ListCoberturas from "@/pages/ListCoberturas.vue";
import ListEsquadrias from "@/pages/ListEsquadrias.vue";
import ListFerramentas from "@/pages/ListFerramentas.vue";
import ListPisos from "@/pages/ListPisos.vue";


const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/FormFornecedor",
    name: "FormFornecedor",
    component: FormFornecedor,
  },
  {
    path: "/FormCliente",
    name: "FormCliente",
    component: FormCliente,
  },
  {
    path: "/FormProduto",
    name: "FormProduto",
    component: FormProduto,
  },

  
  //lists
  {
    path: "/listEmpresas",
    name: "listEmpresas",
    component: ListEmpresas,
  },
  {
    path: "/listClientes",
    name: "ListClientes",
    component: ListClientes,
  },
  {
    path: "/listProdutos",
    name: "listProdutos",
    component: ListProdutos,
  },
  {
    path: "/listPinturas",
    name: "listPinturas",
    component: ListPinturas,
  },
  {
    path: "/listArgRej",
    name: "listArgRej",
    component: ListArgRej,
  },
  {
    path: "/listBanheiro",
    name: "listBanheiro",
    component: ListBanheiro,
  },
  {
  path: "/listCimentos",
  name: "listCimentos",
  component: ListCimentos,
  },
  {
  path: "/listCoberturas",
  name: "listCoberturas",
  component: ListCoberturas,
  },
  {
  path: "/listEsquadrias",
  name: "listEsquadrias",
  component: ListEsquadrias,
  },
  {
  path: "/listFerramentas",
  name: "listFerramentas",
  component: ListFerramentas,
  },
  {
  path: "/listPisos",
  name: "listPisos",
  component: ListPisos,
  },
  



];

export default routes;
