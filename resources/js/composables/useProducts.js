import {ref} from "vue";
import {useRoute} from "vue-router";
import {useToast} from "./useToast";

export function useProducts()
{
    const errors = ref('');
    const products = ref([]);
    const pagination = ref([]);
    const route = useRoute();
    const {successToast, errorToast} = useToast();

    const getProducts = async (conditon = 'name',search = '') => {
        let res = await axios.get(`/api/product?page=${ route.query.page || 1}&condition=${conditon}&search=${ search }`);
        products.value = res.data.data;
        pagination.value = res.data;
        delete pagination.value.data;
    };

    const saveProduct = async (data) => {
        try {
            errors.value = '';
            await axios.post('/api/product', data);
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

    const updateProduct = async (data) => {
        try{
            errors.value = '';
            let res = await axios.put(`/api/product/${ data.id }`, data);
            products.value = res.data.data;
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

    const deleteProduct = async (data) => {
        await axios.delete(`/api/product/${data}`);
    }

    return {products, errors, pagination, route, getProducts, saveProduct, updateProduct, deleteProduct};
}
