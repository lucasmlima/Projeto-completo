<template>
  <div>
    <nav style="background-color: #3852B1;" class="navbar navbar-expand-lg border-bottom">
      <div class="container-fluid">
        <img src="/src/assets/frp.png" alt="Link 1" style="width: 100px; height: auto;">
        <a class="navbar-brand" href="#"><strong>Lindi Ateliê</strong></a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link " to="/">Inicio</router-link>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Lista
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link class="nav-link" to="/listClientes" href="#">Clientes</router-link>
                <router-link class="nav-link" to="/listEmpresas" href="#">Empresas</router-link>
                <div class="dropdown-divider"></div>
                <router-link class="nav-link" to="/listProdutos" href="#">Produtos</router-link>
              </div>
            </li>
            
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Cadastrar
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link class="nav-link" to="/formCliente" href="#">Clientes</router-link>
                <router-link class="nav-link" to="/FormFornecedor">Empresas</router-link>
                <div class="dropdown-divider"></div>
                <router-link class="nav-link" to="/FormProduto">Produtos</router-link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>

</script>


