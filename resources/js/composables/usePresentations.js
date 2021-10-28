import {ref} from 'vue';
import { useRoute } from 'vue-router';
export function usePresentations() {
    const presentations = ref([]);
    const pagination = ref([]);
    const route = useRoute();

    const getAll = async () => {
        let res = await axios.get(`/api/presentations?page=${ route.query.page || 1}`);
        pagination.value = res.data;
        presentations.value = res.data.data;
        delete pagination.value.data;
    };

    const savePresentation = async (data) => {
        let res = await axios.post('/api/presentions', data);
        console.log(res)
    }

    return { presentations, pagination, route, getAll, savePresentation };
}