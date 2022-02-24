import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/Front.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/front/Index.vue')
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import('@/views/front/Products.vue')
      },
      {
        path: 'product/:id',
        name: 'Product',
        component: () => import('../views/front/Product.vue')
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('@/views/front/Cart.vue')
      },
      {
        path: '/question',
        component: () => import('@/views/front/Question.vue')
      },
      {
        path: '/payment',
        name: 'Payment',
        component: () => import('@/views/front/Payment.vue')
      },
      {
        path: '/order/:id',
        name: 'Order',
        component: () => import('@/views/front/Order.vue')
      },
      {
        path: '/login',
        component: () => import('@/views/front/Login.vue')
      }
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/Dashboard.vue'),
    children: [
      {
        path: 'products',
        name: 'dashboardProducts',
        component: () => import('@/views/admin/DashboardProducts')
      },
      {
        path: 'Coupons',
        name: 'dashboardCoupons',
        component: () => import('@/views/admin/DashboardCoupons')
      },
      {
        path: 'orders',
        name: 'dashboardOrders',
        component: () => import('@/views/admin/DashboardOrders')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
