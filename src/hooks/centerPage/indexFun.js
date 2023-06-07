import { useRoute, useRouter } from "vue-router";
import { toRefs, computed, provide, reactive } from "vue";
import { Img } from "@/api/arknights/indexImg/index";
import allBtns from '@/hooks/theBottons'

export function indexFun() {
    const route = useRoute();
    const router = useRouter();

    let bool = computed(() => route.fullPath != "/center" && route.fullPath != "/center/user/login" && route.fullPath != "/center/buffer");
}