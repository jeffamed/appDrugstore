<template>
    <breadcrumb-component folder="Almacén" subfolder="Compras   /   Crear"/>
    <div class="row col-md-12 justify-content-center">
        <h5>Registrar Compra</h5>
    </div>
    <!--Formulario de proveedor-->
    <div class="container pb-1 pt-2 shadow b-white">
        <p>Información del Proveedor</p>
        <div class="row form-group">
            <div class="col-md-12">
                <label class="ml-3 form-control-label" for="name">Número de Factura</label>
                <input type="text" class="form-control" placeholder="00000000X" v-model="form.numOrder">
            </div>
        </div>
        <div class="row form-group">
            <div class="col-md-8">
                <label class="ml-3 form-control-label" for="name">Nombre</label>
                <vue-select v-model="supplier" :options="suppliers" label-by="name" placeholder="Seleccione el proveedor" clear-on-select close-on-select searchable class="form-control" style="width: 100%"></vue-select>
            </div>
            <div class="col-md-4">
                <label class="ml-3 form-control-label" for="name">Teléfono</label>
                <input type="text" name="name" class="form-control bg-white" placeholder="Telefono del proveedor" disabled v-model="detailsSupplier.phone">
            </div>
        </div>
        <div class="row form-group">
            <div class="col-md-12">
                <label class="ml-3 form-control-label" for="name">Dirección</label>
                <input type="text" name="name" class="form-control bg-white" placeholder="Dirección del proveedor" disabled v-model="detailsSupplier.address">
            </div>
        </div>
        <div v-show="reimbursements.length">
            <div class="row form-group">
                <div class="col-md-8">
                    <label class="ml-3 form-control-label" for="name">Nota de Crédito (Devolución) $</label>
                </div>
                <div class="col-md-12">
                    <Multiselect
                        v-model="form.reimbursement"
                        placeholder="Seleccione una opción"
                        valueProp="id"
                        noOptionsText="La lista esta vacía"
                        :searchable="true"
                        :options="reimbursements"
                        trackBy="total"
                        label="total"
                    />
                </div>
            </div>
        </div>
    </div>
    <!--Formulario de producto-->
    <div class="container pb-1 pt-2 mb-3 shadow mt-1 bg-white">
        <p>Información del Producto</p>
        <div class="row form-group">
            <div class="col-md-3">
                <label class="ml-3 form-control-label" for="product">Buscar por Código</label>
                <div class="d-flex">
                    <input type="text" name="product" id="txtpCode" class="form-control" placeholder="00000X + Enter" v-model.trim="search" @keydown.enter="search == null || search === '' ? modalProduct() : searchProd('code')" >
                    <button class="btn btn-sm btn-success" data-toggle="modal" data-target="#modalProducto" id="modalProduct"><i class="icon-settings"></i></button>
                </div>
                <span class="help-block text-danger" id="errorCode" style="display: none">(*) Busque un producto según el codigo.</span>
            </div>
            <div class="col-md-7">
                <label class="ml-3 form-control-label" for="product">Nombre</label>
                <input type="text" name="product" id="txtPName" class="form-control bg-white" placeholder="Nombre del Producto * Presentación" disabled>
            </div>
            <div class="col-md-2">
                <label class="ml-3 form-control-label" for="product">Stock Act.</label>
                <input type="text" name="product" id="txtPStock" class="form-control bg-white" placeholder="00" disabled>
            </div>
        </div>
        <div class="row form-group">
            <div class="col-md-3">
                <label class="ml-3 form-control-label" for="fecha">Fecha de Venc.</label>
                <input type="date" name="fecha" id="txtExpire" class="form-control" v-model="form.expire_at">
                <span class="help-block text-danger" id="errorExpire" style="display: none">(*) Fecha de vencimiento es requerido</span>
            </div>
            <div class="col-md-3">
                <label class="ml-3 form-control-label" for="cantidad">Cant. Comprada</label>
                <input type="number" name="cantidad" id="txtOrderQty" class="form-control" placeholder="00" v-model.number="form.orderQty">
                <span class="help-block text-danger" id="errorQty" style="display: none">(*) La cantidad no puede ser cero</span>
            </div>
            <div class="col-md-4">
                <label class="ml-3 form-control-label" for="cost">Precio Compra $</label>
                <input type="number" name="cost" id="cost" step="0.01" class="form-control" placeholder="00.00" v-model.number="form.unitPrice" disabled>
                <span class="help-block text-danger" id="errorPrice" style="display: none">(*) La precio no puede ser cero</span>
            </div>
            <div class="col-md-2">
                <label class="ml-3 form-control-label" for="price">Precio Venta $</label>
                <input type="number" name="comprada" id="price" step="0.01" class="form-control" placeholder="00.00" v-model.number="form.priceSuggest" disabled>
            </div>
            <div class="col-md-3 mt-2">
                <label class="ml-3 form-control-label" for="descuento">Descuento %</label>
                <input type="number" name="descuento" id="descuento" step="0.01" max="100" min="0" class="form-control" placeholder="00.00" v-model.number="form.discount">
            </div>
            <div class="col-md-1 d-flex align-items-end">
                <button class="btn btn-success" @click="addDetails">Agregar</button>
            </div>
            <!--table-->
            <div class="col-md-12 mt-3">
                <table class="table table-bordered table-striped table-sm m-0">
                    <thead>
                        <tr>
                            <th width="5%">Eliminar</th>
                            <th class="text-center">Código</th>
                            <th>Producto</th>
                            <th class="text-center">F.Venc</th>
                            <th class="text-center">Cantidad</th>
                            <th class="text-center">Precio $</th>
                            <th class="text-center">Desc. %</th>
                            <th class="text-center">Total $</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="detailsOrder.length" v-for="(detail, index) in detailsOrder" :key="index">
                            <td width="5%" class="text-center">
                                <button type="button" class="btn btn-danger btn-sm" @click="remove(index)">
                                    <i class="icon-close"></i>
                                </button>
                            </td>
                            <td class="text-center">{{ detail.code }}</td>
                            <td width="40%">{{ detail.product }}</td>
                            <td class="text-center">{{ detail.expire_at }}</td>
                            <td class="text-center">{{ detail.orderQty }}</td>
                            <td class="text-center"> {{ detail.unitPrice }}</td>
                            <td class="text-center">{{ detail.discount }}</td>
                            <td class="text-center"> {{ parseFloat((detail.unitPrice * detail.orderQty) - ((detail.unitPrice * detail.orderQty) * (detail.discount/100))).toFixed(2) }}</td>
                        </tr>
                        <tr v-else>
                            <td colspan="8" class="text-center">No se ha registrado ningun producto...</td>
                        </tr>
                    </tbody>
                    <tfoot class="border-top" v-show="detailsOrder.length">
                        <tr >
                            <td colspan="4" class="font-weight-bold">Total Productos Registrados: {{ total }}</td>
                            <td class="text-center">{{ totalQty }}</td>
                            <td class="text-center"></td>
                            <td class="text-center"></td>
                            <td class="text-center font-weight-bold">$ {{ subtotalOrder }}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div class="col-md-8"></div>
            <div class="col-md-4" v-show="detailsOrder.length">
                <table class="table table-bordered table-striped table-sm">
                    <tr>
                        <td colspan="7" class="text-center font-weight-bold">SubTotal: </td>
                        <td class="text-center font-weight-bold">$ {{ subtotalOrder }}</td>
                    </tr>
                    <tr>
                        <td colspan="7" class="text-center">
                            <input type="checkbox" id="checkbox" v-model.number="form.iva" class="form-check-input" true-value="12" false-value="0">
                            <label class="form-check-label pl-1" for="checkbox">IVA {{ form.iva }}%: </label>
                        </td>
                        <td class="text-center">$ {{ calcIva }}</td>
                    </tr>
                    <tr><td colspan="7" class="text-center font-weight-bold">Total:</td>
                        <td class="text-center font-weight-bold bg-success text-white">$ {{ totalOrder }}</td>
                    </tr>
                </table>
            </div>
        </div>
        <span class="help-block text-danger" v-show="errors.length">(*) {{ errors }}</span>
        <div class="form-group d-flex justify-content-end">
            <button class="btn btn-success mr-2" @click="save">Guardar</button>
            <router-link class="btn btn-danger" :to="{ name : 'order' }">Cancelar</router-link>
        </div>
    </div>

    <!--Modal Buscar producto por nombre-->
    <div class="modal fade" id="modalProducto" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: none;" aria-hidden="true">
        <div class="modal-dialog modal-success modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title">Buscar Producto</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="clearProduct">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row form-group">
                        <div class="col-md-12">
                            <label class="form-control-label" for="name">Producto</label>
                            <div class="d-flex">
                                <input type="text" name="name" class="form-control" placeholder="Buscar por nombre" id="txtSearchProd" v-model.trim="search" @keydown.enter="searchProd('name')">
                                <button class="btn btn-sm btn-outline-secondary" @click="searchProd('name')"><i class="icon-magnifier"></i></button>
                            </div>

                        </div>
                        <div class="col-md-12 mt-3" style="overflow: auto; max-height: 40%">
                            <table class="table table-bordered table-striped table-sm">
                                <thead>
                                <tr>
                                    <th>Cod</th>
                                    <th>Producto</th>
                                    <th class="text-center">F.Venc</th>
                                    <th class="text-center">Cant.</th>
                                    <th class="text-center">P.Vnt</th>
                                    <th class="text-center">P.Comp</th>
                                    <th class="text-center">Desc.</th>
                                    <th class="text-center">Agr.</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="products.length" v-for="(product, index) in products" :key="index">
                                        <td>{{ product.code }}</td>
                                        <td width="40%">{{ product.name }} * {{ product.presentation.name }}</td>
                                        <td width="10%" height="42px" class="p-0"><input class="border-0 inputTable bg-transparent" type="date" v-model="product.expireOrder"> </td>
                                        <td width="10%" height="42px" class="p-0"><input class="border-0 inputTable bg-transparent" type="number" v-model="product.qtyOrder"></td>
                                        <td width="10%" height="42px" class="p-0 text-center"> {{ parseFloat(product.cost).toFixed(2) }} </td>
                                        <td width="10%" height="42px" class="p-0 text-center"> {{ parseFloat(product.price).toFixed(2) }} </td>
                                        <td width="5%" height="42px" class="p-0"><input class="border-0 inputTable bg-transparent" type="number" step="0.01" v-model="product.discountOrder"></td>
                                        <td class="text-center">
                                            <button type="button" class="btn btn-success btn-sm" @click="addProd(product)">
                                                <i class="icon-plus"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr v-else>
                                        <td colspan="8" class="text-center">Producto no encontrado</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <span class="help-block text-danger" id="errorTable" style="display: none">(*) La cantidad y/o fecha de expiración del producto que desea registrar no puede estar vacío.</span>
                    </div>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!--Fin del modal-->
</template>
<script>
import Swal from "sweetalert2";
import {computed, reactive, ref, watch} from "vue";
import VueSelect from 'vue-next-select';
import Multiselect from "@vueform/multiselect";
import 'vue-next-select/dist/index.min.css';
import {useSuppliers} from "../../composables/useSuppliers";
import {useProducts} from "../../composables/useProducts";
import {useToast} from "../../composables/useToast";
import {useOrder} from "../../composables/useOrder";
import {useReimbursement} from "../../composables/useReimbursement";
export default {
    name: "CreateComponent",
    components:{
        VueSelect,
        Multiselect
    },
    setup(){
        const form = reactive({
            numOrder: '',
            orderQty: 0,
            unitPrice: 0,
            discount: 0,
            expire_at: '',
            priceSuggest: 0,
            iva: 0,
            reimbursement: 0,
        });
        const order = reactive({
            num_order: '',
            supplier_id : 0,
            iva : 0,
            subtotal : 0,
            total : 0,
            discount : 0,
            reimbursement : 0
        });
        const detailsSupplier = reactive({
            phone: '',
            address: ''
        })
        const supplier = ref([]);
        const detailsOrder = ref([]);
        const search = ref('');
        const errorForm = ref(false);
        const total = computed(()=>{
            let sum = 0;
            sum = sum + detailsOrder.value.length;
            return sum;
        });
        const subtotalOrder = computed(() => {
            let sum = 0;
            for (let i = 0; i < detailsOrder.value.length; i++) {
                let calc = parseFloat(detailsOrder.value[i].orderQty * detailsOrder.value[i].unitPrice).toFixed(2)
                let desc = parseFloat((detailsOrder.value[i].discount/100) * calc);
                sum += parseFloat(calc) - parseFloat(desc);
            }
            return sum.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        });
        const calcIva = computed(() => {
            let sum = 0;
            for (let i = 0; i < detailsOrder.value.length; i++) {
                let calc = parseFloat(detailsOrder.value[i].orderQty * detailsOrder.value[i].unitPrice).toFixed(2)
                let desc = parseFloat((detailsOrder.value[i].discount/100) * calc);
                sum += parseFloat(calc) - parseFloat(desc);
            }
            let iva = sum * (parseInt(form.iva) / 100);

            return iva.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        });
        const totalOrder = computed(() => {
            let sum = 0;
            for (let i = 0; i < detailsOrder.value.length; i++) {
                let calc = parseFloat(detailsOrder.value[i].orderQty * detailsOrder.value[i].unitPrice).toFixed(2)
                let desc = parseFloat((detailsOrder.value[i].discount/100) * calc);
                sum += parseFloat(calc) - parseFloat(desc);
            }
            let iva = sum * (parseInt(form.iva) / 100);
            let total = parseFloat(sum + iva);

            return parseFloat(total).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        });
        const totalQty = computed(() => {
            let sum = 0;
            for (let i = 0; i < detailsOrder.value.length; i++) {
                sum = parseFloat(sum) + parseFloat(detailsOrder.value[i].orderQty);
            }
            return sum;
        });

        const {allSuppliers, suppliers} = useSuppliers();
        const {searchProduct, products} = useProducts();
        const {getReimbursementSupplier, reimbursements} = useReimbursement();
        const {errors, saveOrder} = useOrder();
        const {errorToast} = useToast();

        const modalProduct = () => {
            $('#modalProducto').on('shown.bs.modal', function () {
                $("#txtSearchProd").focus();
            })
            $("#modalProduct").click();
        }

        const searchProd = async (condition) => {
            await searchProduct(condition, search.value);
            await products;
            if (condition != 'name'){
                if (products.value["code"] !== undefined){
                    $("#txtPName").val(products.value.name+" *  "+ products.value.presentacion);
                    $("#txtPStock").val(products.value.stock);
                    form.unitPrice = products.value.cost;
                    form.priceSuggest = products.value.price;
                    $("#txtExpire").focus().select();
                }else{
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Producto no fue encontrado, verifique.',
                        showConfirmButton: false,
                        timer: 1000
                    })
                    $("#txtPName").val('');
                    $("#txtPStock").val('');
                }
            }
        }

        const addDetails = () => {
            if (validateForm()){
                return;
            }
            if(verify(products.value.id)){
                Swal.fire({
                    title: 'Error...',
                    text: "Lo sentimos, ya tiene registrado el producto",
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 1000,
                })
            }else{
                form.product_id = products.value.id;
                form.code = products.value.code;
                form.product = $("#txtPName").val();
                detailsOrder.value.push( { ...form } );
                clearProduct();
                $("#txtpCode").focus();
            }
        }

        const addProd = (product) => {
            $("#errorTable").hide();

            if(product.qtyOrder === 0 || product.expireOrder === ''){
                $("#errorTable").show();
                return;
            }

            if (verify(product.id)){
                Swal.fire({
                    title: 'Error...',
                    text: "Lo sentimos, ya tiene registrado el producto",
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 1000,
                })
            }else{
                let data = {
                    'product_id': product.id,
                    'code' : product.code,
                    'discount' : product.discountOrder,
                    'orderQty' : product.qtyOrder,
                    'unitPrice' : product.cost,
                    'priceSuggest' : product.price,
                    'expire_at': product.expireOrder,
                    'product' : product.name + " * " + product.presentation.name
                };

                detailsOrder.value.push( data );
                search.value = '';
                $("#txtSearchProd").focus();
                products.value = [];
            }
        }

        const remove = (index) => {
            Swal.fire({
                title: '¿Estas Seguro?',
                text: "No se podra recuperar los datos",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Eliminar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    detailsOrder.value.splice(index, 1);
                    Swal.fire(
                        'Eliminado',
                        'El producto fue eliminado de su compra',
                        'success'
                    )
                }
            })
        }

        const clearProduct = () => {
            search.value = '';
            form.orderQty = 0;
            form.unitPrice = 0;
            form.discount = 0;
            form.priceSuggest = 0;
            form.expire_at = '';
            form.reimbursement = 0;
            $("#txtPName").val('');
            $("#txtPStock").val('');
        }

        const verify = (id) => {
            var temp = false;
            for (let i = 0; i < detailsOrder.value.length; i++) {
                if (detailsOrder.value[i].product_id == id) {
                    return temp=true;
                }
            }
            return temp;
        }

        const validateForm = () => {
            let error = false;
            hideError();

            let product =  $("#txtPName").val();
            if (product == ""){
                errorToast();
                $("#errorCode").show();
                error = true;
            }else if (form.orderQty == 0){
                errorToast();
                $("#errorQty").show();
                error = true;
            }else if (form.unitPrice == 0){
                errorToast();
                $("#errorPrice").show();
                error = true;
            }else if (form.expire_at == ''){
                errorToast();
                $("#errorExpire").show();
                error = true;
            }

            errorForm.value = error;

            return errorForm.value;
        }

        const hideError = () => {
            $("#errorCode").hide();
            $("#errorQty").hide();
            $("#errorPrice").hide();
        }

        const validationReimbursement = () => {
            let correct = true;
            if (form.reimbursement !== 0){
                let total = parseInt(totalOrder.value.replace(',',''));
                let temp = reimbursements.value.find(item => item.id);
                if(parseInt(temp.total) > total){
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Nota de Crédito',
                        text:'La nota de crédito supera al total',
                        showConfirmButton: false,
                        timer: 1000
                    })
                    form.reimbursement = 0;
                    correct = false;
                } else {
                    correct =  true;
                }
            }
            return correct;
        }

        const save = async () => {
            let user = JSON.parse(localStorage.getItem('user'));
            order.num_order = form.numOrder;
            order.supplier_id = supplier.value.id;
            order.subtotal = parseFloat(subtotalOrder.value.replace(',','')).toFixed(2);
            order.total = parseFloat(totalOrder.value.replace(',','')).toFixed(2);
            order.iva = parseFloat(calcIva.value.replace(',','')).toFixed(2);
            order.discount = 0;
            order.details = detailsOrder.value;
            order.user_id = user.id;
            order.reimbursement = form.reimbursement;
            if(validationReimbursement()){
                await saveOrder(order);
                await errors;
                if (errors.value.length === 0){
                    detailsOrder.value = [];
                    supplier.value = [];
                    form.numOrder = '';
                    clearProduct();
                }
            }
        }

        allSuppliers();

        watch(supplier, () => {
            detailsSupplier.phone = supplier.value.phone,
            detailsSupplier.address = supplier.value.address,
            getReimbursementSupplier(supplier.value.id)
            $('#txtpCode').focus();
        });

        return {form, products, detailsOrder, suppliers, supplier, detailsSupplier, search, clearProduct, modalProduct, searchProd, addDetails, addProd, remove, subtotalOrder, totalQty, total, errors, save, calcIva, totalOrder, reimbursements}
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
    .breadcrumb{
        margin-bottom: 0.5rem;
    }
    .inputTable{
        width:100%;
        height: 100%;
        background: #f2f2f2;
        text-align: center;
    }
</style>
