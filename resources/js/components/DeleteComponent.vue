<template>
    <div class="modal fade" id="modalEliminar" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: none;" aria-hidden="true">
        <div class="modal-dialog modal-danger" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Eliminar {{ title }}</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>¿Estás seguro de eliminar {{ body.length ? body : title.toLowerCase() }} {{ typeof data === 'string' ? data : (data.full_name ?? data.name) ?? data.description }}?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" id="btnClose">Cerrar</button>
                    <button type="button" class="btn btn-danger" @click="btnDelete">Eliminar</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
</template>

<script>
import {reactive, inject} from "vue";
export default {
    name: "DeleteComponent",
    props:{
        title:{
            type: String,
            default: ''
        },
        body: {
            type: String,
            default: '',
        },
        data: {
            type: Object,
            default: name
        },
    },
    setup(props,context){
        const form = reactive({
            name: '',
            id: 0,
        })

        const btnDelete = () =>{
            context.emit('delete', props.data.id);
            $('#btnClose').click();
        }
        return {form, btnDelete}
    }
}
</script>

<style scoped>

</style>
