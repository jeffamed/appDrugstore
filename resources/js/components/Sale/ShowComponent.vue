<template>
    <breadcrumb-component folder="Ventas" subfolder="Ventas   /   Detalles"/>
    <div class="row col-md-12 justify-content-center">
        <h5>Detalle de Venta</h5>
    </div>
    <div class="container pb-1 pt-2 shadow b-white">
        <div class="row">
            <div class="col-md-6">
                <div class="border border-secondary p-1">
                    <div class="row">
                        <div class="col-md-12">
                            <p class="font-weight-bold text-muted">Datos de Venta</p>
                        </div>
                        <div class="col-md-6">
                            <p class="font-weight-bold font-lg mb-0 mr-5">Venta #  {{sales.id}}</p>
                        </div>
                        <div class="col-md-6">
                            <p><span class="text-muted font-weight-bold">Fecha:</span> {{sales.created}}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <p><span class="text-muted font-weight-bold">IVA: </span> {{sales.iva}}</p>
                        </div>
                        <div class="col-md-6">
                            <p><span class="text-muted font-weight-bold">SubTotal: </span>$ {{sales.subtotal_format}}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <p><span class="text-muted font-weight-bold">Descuento:</span> {{sales.discount_format}}</p>
                        </div>
                        <div class="col-md-6">
                            <p><span class="text-muted font-weight-bold">Total:</span>$ {{sales.total_format}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="border border-secondary p-1">
                    <p class="font-weight-bold text-muted">Información del Cliente</p>
                    <p><span class="font-lg font-weight-bold">Nombre: </span>{{ sales.cliente }}</p>
                    <p><span class="font-lg font-weight-bold">Teléfono: </span> {{ sales.customer.phone ?? 'Sin Numero'}}</p>
                    <p><span class="font-lg font-weight-bold">Dirección: </span>{{sales.customer.address}}</p>
                </div>
            </div>
            <div class="col-md-12 my-3">
                <table class="table table-bordered table-hover table-responsive">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio $</th>
                        <th>Descuento</th>
                        <th>Total $</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(detail, index) in sales.details" :key="index">
                            <td>{{index + 1}}</td>
                            <td>{{detail.product.name}}</td>
                            <td>{{detail.orderQty}}</td>
                            <td>{{detail.unitPrice}}</td>
                            <td>{{detail.discount}}</td>
                            <td>{{detail.total}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="row mt-2">
            <div class="col-md-12">
                <router-link :to="{name: 'sale'}" class="btn btn-secondary">Regresar</router-link>
            </div>
        </div>
    </div>
</template>

<script>

import {useSale} from "../../composables/useSale";

export default {
    name: "ShowComponent",
    props: {
        id : {
            required: true,
            type: String,
        }
    },
    setup(props){
        const {getSale, sales} = useSale();

        getSale(props.id);

        return {sales};
    }
}
</script>

<style scoped>
.shadow{
    border: 0.2px solid hsl(0, 10%, 80%);
    border-radius: 5px;
    box-shadow: 7px 6px 6px 1px rgba(0,0,0,0.30);
    -webkit-box-shadow: 7px 6px 6px 1px rgba(0,0,0,0.30);
    -moz-box-shadow: 7px 6px 6px 1px rgba(0,0,0,0.30);
}
.b-white{
    background: #ffffff;
}
</style>
