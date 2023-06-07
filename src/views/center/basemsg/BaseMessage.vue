<template>
    <div class="baseMsg">
        <div style="height: 6%;"></div>
        <div style="height: 90.5%;" class="mainDiv">
            <div v-for="(a, b) in baseInfo.users" :key="b">
                <section class="who">
                    <img :src="a.title.img" alt="">
                    <span>{{ a.title.word }}</span>
                </section>
                <section v-for="(c, d) in a.inputs" :key="d" class="what">
                    <p class="firtTitle">{{ c.inputTitle }}</p>
                    <p>
                        <input type="text" :value="c.inputItem" readonly v-if="d < 2">
                        <button v-if="d < 2 ? (b == 1 ? (d == 1 ? false : true) : true) : false" @click="jump(b,d,c.name)">变更</button>
                        <button v-if="d == 2" style="width: 100%;">清除其他设备的登入状态</button>
                        <span v-if="d == 2">{{ c.inputItem }}</span>
                    </p>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
import baseMsg from '@/public/baseMsg/baseMsg.scss'
import { toRefs, reactive } from "vue"
import { getBaseMsg } from '@/api/arknights/baseMsg/getInfo'
import { useRouter } from "vue-router"
export default {
    name: "BaseMessage",
    setup() {
        const router = useRouter()
        let user = reactive({
            userId: JSON.parse(localStorage.getItem("users")).userId,
            telephone: JSON.parse(localStorage.getItem("users")).telephone
        })
        function jump(inde,inde2,name) {
            router.push({
                name: "changeUserinfoPage",
                query:{
                    position:[inde,inde2],
                    name
                },
                params: {
                    userId: user.userId,
                }
            })
        }
        console.log(user.userId)
        return {
            baseMsg,
            ...toRefs(getBaseMsg(user)),
            jump
        }
    }
}
</script>

<style lang="scss" scoped></style>