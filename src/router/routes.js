const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', name:'Dash Board', component: () => import('pages/DashBoard/DashBoard') },
      { path: '/pond-detail', name:'Pond Detail', component: () => import('pages/Pond/PondDetail') }
    ]
  },
  {
    path: '/login',
    component: () => import('pages/LoginPage.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
]

export default routes
