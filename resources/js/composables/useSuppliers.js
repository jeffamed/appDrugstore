import {ref} from "vue";
import {useRoute} from "vue-router";
import {useToast} from "./useToast";

export function useSuppliers(){
    const errors = ref('');
    const suppliers = ref([]);
    const supplier = ref([]);
    const pagination = ref([]);
    const route = useRoute();
    const {successToast, errorToast} = useToast();

    const getSuppliers = async (conditon = 'name',search = '') => {
        let res = await axios.get(`/api/supplier?page=${ route.query.page || 1}&condition=${conditon}&search=${ search }`);
        suppliers.value = res.data.data;
        pagination.value = res.data;
        delete pagination.value.data;
    };

    const getSupplier = async(data) => {
        let res = await axios.get(`/api/supplier/${data}`);
        supplier.value = res.data;
    }

    const allSuppliers = async() => {
        let res = await axios.get('/api/supplier-all');
        suppliers.value = res.data;
    }

    const saveSupplier = async (data) => {
        try {
            errors.value = '';
            await axios.post('/api/supplier', data);
            await successToast('Registrado');
        }catch (e) {
            errors.value = '';
            errorToast();
            if (e.response.status == 422){
                for (const key in e.response.data.errors) {
                    errors.value += e.response.data.errors[key][0]+' ';
                }
            }
        }
    }

    const updateSupplier = async (data) => {
        try{
            errors.value = '';
            let res = await axios.put(`/api/supplier/${ data.id }`, data);
            suppliers.value = res.data.data;
            await successToast('Actualizado');
        }catch (e) {
            errors.value = '';
            errorToast();
            if (e.response.status == 422){
                for (const key in e.response.data.errors) {
                    errors.value += e.response.data.errors[key][0] + ' ';
                }
            }
        }
    }

    const deleteSupplier = async (data) => {
        await axios.delete(`/api/supplier/${data}`);
    }

    return {suppliers, pagination, supplier, getSupplier, getSuppliers, errors, route, saveSupplier, updateSupplier, deleteSupplier, allSuppliers};
}
