import { createRouter, createWebHistory }  from  "vue-router"

const routes = [
    {
      path: '/',
      redirect: {name: 'login'}
    },
    {
        path:'/login',
        name:'login',
        meta : { requiresAuth: false },
        component : import(/* webpackChunkName: "routes"*/'../views/Login')
    },
    {
        path:'/home',
        name:'home',
        component : import(/* webpackChunkName: "routes"*/'../views/Main'),
        meta : { requiresAuth: true },
        children:[
            {
                path:'/dashboard',
                name:'dashboard',
                component : import(/* webpackChunkName: "routes"*/'../components/ExampleComponent'),
                meta : { requiresAuth: false },
            },
            {
                path:'/cliente',
                name:'customer',
                component : import(/* webpackChunkName: "routes"*/'../views/Customer'),
                meta : { requiresAuth: true },
            },
            {
                path:'/laboratorio',
                name:'laboratory',
                component : import(/* webpackChunkName: "routes"*/'../views/Laboratory'),
                meta : { requiresAuth: true },
            },
            {
                path:'/ubicacion',
                name:'location',
                component : import(/* webpackChunkName: "routes"*/'../views/Location'),
                meta : { requiresAuth: true },
            },
            {
                path:'/compras',
                name:'order',
                component : import(/* webpackChunkName: "routes"*/'../views/Order'),
                meta : { requiresAuth: true },
            },
            {
                path:'/compras/crear',
                name:'order.create',
                component : import(/* webpackChunkName: "routes"*/'../components/Order/CreateComponent'),
                meta : { requiresAuth: true },
            },
            {
                path:'/compras/detalles/:id',
                name:'order.show',
                props: true,
                component : import(/* webpackChunkName: "routes"*/'../components/Order/ShowComponent'),
                meta : { requiresAuth: false }
            },
            {
                path:'/presentacion',
                name:'presentation',
                component : import(/* webpackChunkName: "routes"*/'../views/Presentation'),
                meta : { requiresAuth: true },
            },
            {
                path:'/productos',
                name:'product',
                component : import(/* webpackChunkName: "routes"*/'../views/Product'),
                meta : { requiresAuth: true },
            },
            {
                path:'/productos/crear',
                name:'product.create',
                component : import(/* webpackChunkName: "routes"*/'../components/Product/CreateComponent'),
                meta : { requiresAuth: true },
            },
            {
                path:'/productos/:id/editar',
                name:'product.update',
                props: true,
                component : import(/* webpackChunkName: "routes"*/'../components/Product/EditComponent'),
                meta : { requiresAuth: true },
            },
            {
                path:'/productos/detalle/:id',
                name:'product.show',
                props: true,
                component : import(/* webpackChunkName: "routes"*/'../components/Product/ShowComponent'),
                meta : { requiresAuth: false },
            },
            {
                path:'/ventas',
                name:'sale',
                component : import(/* webpackChunkName: "routes"*/'../views/Sale'),
                meta : { requiresAuth: true },
            },
            {
                path:'/ventas/crear',
                name:'sale.create',
                component : import(/* webpackChunkName: "routes"*/'../components/Sale/CreateComponent'),
                meta : { requiresAuth: true },
            },
            {
                path:'/ventas/detalles/:id',
                name:'sale.show',
                props: true,
                component : import(/* webpackChunkName: "routes"*/'../components/Sale/ShowComponent'),
                meta : { requiresAuth: false },
            },
            {
                path:'/proveedor',
                name:'supplier',
                component : import(/* webpackChunkName: "routes"*/'../views/Supplier'),
                meta : { requiresAuth: true },
            },
            {
                path:'/tipo-producto',
                name:'type',
                component : import(/* webpackChunkName: "routes"*/'../views/Type'),
                meta : { requiresAuth: true },
            },
            {
                path:'/uso',
                name:'usage',
                component : import(/* webpackChunkName: "routes"*/'../views/Usage'),
                meta : { requiresAuth: true },
            },
            {
                path:'/usuario',
                name:'user',
                component : import(/* webpackChunkName: "routes"*/'../views/User'),
                meta : { requiresAuth: true },
            },
            {
                path:'/roles',
                name:'role',
                component : import(/* webpackChunkName: "routes"*/'../views/Role'),
                meta : { requiresAuth: true },
            },
            {
                path:'/devolucion',
                name:'reimbursement',
                component : import(/* webpackChunkName: "routes"*/'../views/Reimbursement'),
                meta : { requiresAuth: false },
            },
            {
                path:'/devolucion/crear',
                name:'reimbursement.create',
                component : import(/* webpackChunkName: "routes"*/'../components/Reimbursement/CreateComponent'),
                meta : { requiresAuth: false },
            },
            {
                path:'/devolucion/:id',
                name:'reimbursement.show',
                props: true,
                component : import(/* webpackChunkName: "routes"*/'../components/Reimbursement/ShowComponent'),
                meta : { requiresAuth: false },
            },
        ]
    },
    {
        path:'/:pathMatch(.*)*',
        redirect: { name : 'login'}
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    if (to.name === 'login' && localStorage.getItem("user")) {
        router.push({
            name: 'dashboard'
        })
    } else if (to.meta.requiresAuth) {
        let user = localStorage.getItem('user')
        if (!user) {
            router.push({
                name: 'login'
            })
        } else {
            if (!hasAccess(to.name)) {
                router.push({
                    name: 'page-not-authorized'
                })
            }
        }
    }
    return next()
});

function hasAccess(name) {
    let permissions = localStorage.getItem("permissions")
    switch (name) {
        case "home":
            return true;

        case "customer":
            return permissions.includes("customer")

        case "laboratory":
            return permissions.includes("laboratory")

        case "location":
            return permissions.includes("location")

        case "order":
            return permissions.includes("order")

        case "order.create":
            return permissions.includes("order.create")

        case "presentation":
            return permissions.includes("presentation")

        case "product":
            return permissions.includes("product")

        case "product.create":
            return permissions.includes("product.create")

        case "product.update":
            return permissions.includes("product.update")

        case "sale":
            return permissions.includes("sale")

        case "sale.create":
            return permissions.includes("sale.create")

        case "supplier":
            return permissions.includes("supplier")

        case "type":
            return permissions.includes("type")

        case "usage":
            return permissions.includes("usage")

        case "user":
            return permissions.includes("user")

        case "user.create":
            return permissions.includes("user.create")

        case "user.edit":
            return permissions.includes("user.edit")

        case "user.delete":
            return permissions.includes("user.delete")

        case "role":
            return permissions.includes("user")

        case "role.create":
            return permissions.includes("user.create")

        case "role.edit":
            return permissions.includes("user.edit")

        case "role.delete":
            return permissions.includes("user.delete")

        default:
            return false;
    }
}


export default router;
