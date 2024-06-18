const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/SplashScreen.vue') },
      { path: 'menu', component: () => import('pages/MenuPage.vue') },
      { path: 'comprar-recarga', component: () => import('pages/ComprarRecarga.vue') },
      { path: 'recarga-details', component: () => import('pages/RecargaDetails.vue') },
      { path: 'meio-de-pagamento', component: () => import('pages/MeioDePagamento.vue') },
      { path: 'compra-com-sucesso', component: () => import('pages/CompraComSucesso.vue') },
      { path: 'ultima-recarga', component: () => import('pages/UltimaRecarga.vue') },
      { path: 'resultado-ultima-compra', component: () => import('pages/ResultadoUltimaCompra.vue') },
      { path: 'no-internet', component: () => import('pages/NoInternet.vue') }

    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
