import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useToast} from "./useToast";

export function useOrder(){
    const errors = ref('');
    const orders = ref([]);
    const sup = ref([]);
    const pagination = ref([]);
    const route = useRoute();
    const router = useRouter();
    const {successToast, errorToast} = useToast();

    const getOrders = async (search = '', condition = 'supplier_id') => {
        let res = await axios.get(`/api/order?page=${ route.query.page || 1}&search=${ search } &condition=${ condition }`);
        orders.value = res.data.data;
        pagination.value = res.data;
        delete pagination.value.data;
    };

    const getOrder = async(data) => {
        let res = await axios.get(`/api/order/${data}`);
        orders.value = res.data;
        sup.value = orders.value.supplier;
    }

    const getOrderSupplier = async(data) => {
        let res = await axios.get(`/api/find-orders/${data}`);
        orders.value = res.data;
    }

    const saveOrder = async (data) => {
        errors.value = '';
        try {
            await axios.post('/api/order', data);
            await successToast('Registrado');
            router.push({ name : 'order'});
        }catch (e) {
            errorToast();
            if (e.response.status == 422){
                for (const key in e.response.data.errors) {
                    errors.value += e.response.data.errors[key][0] + ' / ';
                }
            }
        }
    }

    const deleteOrder = async (data) => {
        await axios.delete(`/api/order/${data}`);
    }

    return { orders, pagination, route, getOrders, saveOrder, deleteOrder, errors, getOrder, getOrderSupplier, sup };
}
