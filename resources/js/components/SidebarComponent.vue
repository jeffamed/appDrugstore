<template>
    <div class="sidebar">
        <nav class="sidebar-nav">
            <ul class="nav">
                <li class="nav-item">
                    <router-link :to="{ name : 'dashboard' }" class="nav-link active" ><i class="icon-speedometer"></i> Dashboard</router-link>
                </li>
                <li class="nav-title">
                    Mantenimiento
                </li>
                <li class="nav-item nav-dropdown" id="ddAlmacen" @click="openAlmacen">
                    <a class="nav-link nav-dropdown-toggle" href="#"><i class="icon-social-dropbox"></i> Almacén</a>
                    <ul class="nav-dropdown-items">
                        <li class="nav-item">
                            <router-link v-if="enableProduct" :to="{ name : 'product' }" class="nav-link"><i class="icon-bag"></i> Productos</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link v-if="enableLocation" :to="{ name : 'location' }" class="nav-link"><i class="icon-location-pin"></i> Ubicación</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link v-if="enableType" :to="{ name : 'type' }" class="nav-link"><i class="icon-folder"></i> Tipos</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link v-if="enablePresentation" :to="{ name : 'presentation' }" class="nav-link"><i class="icon-present"></i> Presentación</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link v-if="enableUsage" :to="{ name : 'usage' }" class="nav-link"><i class="icon-list"></i> Usos</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link v-if="enableLaboratory" :to="{ name : 'laboratory' }" class="nav-link"><i class="icon-chemistry"></i> Laboratorios</router-link>
                        </li>
                    </ul>
                </li>
                <li class="nav-item nav-dropdown" id="ddCompras" @click="openCompras">
                    <a class="nav-link nav-dropdown-toggle" href="#"><i class="icon-wallet"></i> Compras</a>
                    <ul class="nav-dropdown-items">
                        <li class="nav-item">
                            <router-link v-if="enableOrder" :to="{ name : 'order' }" class="nav-link"><i class="icon-wallet"></i> Compras</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link v-if="enableSupplier" :to="{ name : 'supplier' }" class="nav-link"><i class="icon-notebook"></i> Proveedores</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link v-if="enableReimbursement" :to="{ name : 'reimbursement' }" class="nav-link"><i class="icon-tag"></i> Devoluciones</router-link>
                        </li>
                    </ul>
                </li>
                <li class="nav-item nav-dropdown" id="ddVentas" @click="openVentas">
                    <a class="nav-link nav-dropdown-toggle" href="#"><i class="icon-basket"></i> Ventas</a>
                    <ul class="nav-dropdown-items">
                        <li class="nav-item">
                            <router-link v-if="enableSales" :to="{ name : 'sale' }" class="nav-link"><i class="icon-basket-loaded"></i> Ventas</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link v-if="enableCustomer" :to="{ name : 'customer' }" class="nav-link"><i class="icon-people"></i> Clientes</router-link>

                        </li>
                    </ul>
                </li>
                <li class="nav-item nav-dropdown" id="ddAcceso" @click="openAcceso">
                    <a class="nav-link nav-dropdown-toggle" href="#"><i class="icon-people"></i> Acceso</a>
                    <ul class="nav-dropdown-items">
                        <li class="nav-item">
                            <router-link v-if="enableUser" class="nav-link" :to="{ name : 'user' }"><i class="icon-user"></i> Usuarios</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link v-if="enableRole" class="nav-link" :to="{ name : 'role' }"><i class="icon-user-following"></i> Roles</router-link>
                        </li>
                    </ul>
                </li>
                <li class="nav-item nav-dropdown" id="ddReportes" @click="openReportes">
                    <a class="nav-link nav-dropdown-toggle" href="#"><i class="icon-pie-chart"></i> Reportes</a>
                    <ul class="nav-dropdown-items">
                        <li class="nav-item">
                            <a class="nav-link" v-if="enableReportOrder" href="#" @click.prevent="reportOrder"><i class="icon-chart"></i> Reporte Ingresos</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" v-if="enableReportSales" href="#" @click.prevent="reportSale"><i class="icon-chart"></i> Reporte Ventas</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" v-if="enableReportStock" href="#" @click.prevent="download"><i class="icon-chart"></i> Reporte Inventarios</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
        <button class="sidebar-minimizer brand-minimizer d-none" type="button"></button>
    </div>
</template>

<script>
import {computed, ref} from "vue";

export default {
    name: "SidebarComponent",
    setup(){
        const permissions = localStorage.getItem('permissions');
        const enableSales = computed(() => {return permissions.includes('sale')});
        const enableProduct = computed(() => {return permissions.includes('product')});
        const enableLocation = computed(() => {return permissions.includes('location')});
        const enableType = computed(() => {return permissions.includes('type')});
        const enablePresentation = computed(() => {return permissions.includes('presentation')});
        const enableUsage = computed(() => {return permissions.includes('usage')});
        const enableLaboratory = computed(() => {return permissions.includes('laboratory')});
        const enableOrder = computed(() => {return permissions.includes('order')});
        const enableSupplier = computed(() => {return permissions.includes('supplier')});
        const enableCustomer = computed(() => {return permissions.includes('customer')});
        const enableUser = computed(() => {return permissions.includes('user')});
        const enableRole = computed(() => {return permissions.includes('role')});
        const enableReimbursement = computed(() => {return permissions.includes('reimbursement')});
        const enableReportSales = computed(() => {return permissions.includes('report.sales')});
        const enableReportOrder = computed(() => {return permissions.includes('report.order')});
        const enableReportStock = computed(() => {return permissions.includes('report.stock')});
        function openAlmacen(){
            if ($('#ddAlmacen').hasClass('open')){
                $('#ddAlmacen').removeClass('open');
            }else{
                $('#ddAlmacen').addClass('open');
                $('#ddCompras').removeClass('open');
                $('#ddVentas').removeClass('open');
                $('#ddAcceso').removeClass('open');
                $('#ddReportes').removeClass('open');
            }
        }
        function openCompras(){
            if ($('#ddCompras').hasClass('open')){
                $('#ddCompras').removeClass('open');
            }else{
                $('#ddCompras').addClass('open');
                $('#ddAlmacen').removeClass('open');
                $('#ddVentas').removeClass('open');
                $('#ddAcceso').removeClass('open');
                $('#ddReportes').removeClass('open');
            }
        }
        function openVentas(){
            if ($('#ddVentas').hasClass('open')){
                $('#ddVentas').removeClass('open');
            }else {
                $('#ddVentas').addClass('open');
                $('#ddCompras').removeClass('open');
                $('#ddAlmacen').removeClass('open');
                $('#ddAcceso').removeClass('open');
                $('#ddReportes').removeClass('open');
            }
        }
        function openAcceso(){
            if ($('#ddAcceso').hasClass('open')){
                $('#ddAcceso').removeClass('open');
            }else {
                $('#ddAcceso').addClass('open');
                $('#ddVentas').removeClass('open');
                $('#ddCompras').removeClass('open');
                $('#ddAlmacen').removeClass('open');
                $('#ddReportes').removeClass('open');
            }
        }
        function openReportes(){
            if ($('#ddReportes').hasClass('open')){
                $('#ddReportes').removeClass('open');
            }else {
                $('#ddReportes').addClass('open');
                $('#ddAcceso').removeClass('open');
                $('#ddVentas').removeClass('open');
                $('#ddCompras').removeClass('open');
                $('#ddAlmacen').removeClass('open');
            }
        }

        function reportSale() {
            axios({ url: '/api/report_sale', method: 'GET', responseType: 'blob'})
            .then(response=>{
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'Ventas segun Meses.pdf');
                document.body.appendChild(link);
                link.click();
            });
        }

        function reportOrder() {
            axios({ url: '/api/report_order', method: 'GET', responseType: 'blob'})
                .then(response=>{
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'Compras segun Meses.pdf');
                    document.body.appendChild(link);
                    link.click();
                });
        }

        const download = () => {
            axios({ url: '/api/all_product', method: 'GET', responseType: 'blob'})
                .then(response=>{
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'Inventario.pdf');
                    document.body.appendChild(link);
                    link.click();
                });
        }

        return {openAlmacen, openCompras, openVentas, openAcceso, openReportes, enableSales, enableProduct, enableLocation, enableType, enablePresentation, enableUsage, enableLaboratory, enableOrder, enableSupplier, enableCustomer, enableUser, enableRole, reportSale, reportOrder, enableReimbursement, download, enableReportSales, enableReportOrder, enableReportStock}
    }
}
</script>
<style scoped>

</style>
