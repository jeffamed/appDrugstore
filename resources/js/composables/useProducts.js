import {ref} from "vue";
import {useRoute} from "vue-router";
import {useRouter} from "vue-router";
import {useToast} from "./useToast";

export function useProducts()
{
    const errors = ref('');
    const products = ref([]);
    const product = ref([]);
    const lab = ref([]);
    const sup = ref([]);
    const pagination = ref([]);
    const route = useRoute();
    const router = useRouter();
    const {successToast, errorToast} = useToast();

    const getProducts = async (conditon = 'name',search = '') => {
        let res = await axios.get(`/api/product?page=${ route.query.page || 1}&condition=${conditon}&search=${ search }`);
        products.value = res.data.data;
        pagination.value = res.data;
        delete pagination.value.data;
    };

    const getProduct = async(data) => {
        let res = await axios.get(`/api/product/${data}`);
        product.value = res.data;
        lab.value = product.value.laboratory
        sup.value = product.value.supplier
        delete product.value.presentation;
        delete product.value.location;
        delete product.value.usage;
        delete product.value.type;
    }

    const searchProduct = async(condition, search) => {
        let res = await axios.get(`/api/product-search?condition=${condition}&search=${search}`);
        products.value = res.data;
    }

    const saveProduct = async (data) => {
        try {
            errors.value = '';
            await axios.post('/api/product', data);
            await successToast('Registrado');
            await router.push({name: 'product'});
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

    const updateProduct = async (id) => {
        try{
            errors.value = '';
            let res = await axios.put(`/api/product/${ id }`, product.value);
            products.value = res.data.data;
            await successToast('Actualizado');
            await router.push({name: 'product'});
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

    return {products, errors, pagination, route, product, lab, sup, getProduct, getProducts, saveProduct, updateProduct, deleteProduct, searchProduct};
}
