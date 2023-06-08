<template>
    <div :style="{ backgroundImage: `url(${imgs.bgImg})` }" class="Gensou"></div>
    <div class="login" :style="{ gridTemplateRows: route.meta.lists }">
        <div></div>
        <header :style="{
            gridTemplateAreas: bool ? 'headerLeft headerCenter headerRight' : 'headerLeft headerRigh',
            gridTemplateColumns: bool ? '1fr 2fr 3fr' : 'repeat(2,1fr)'
        }">

            <nav v-if="bool" style="display: flex;align-items: center;">
                <section class="theAnima" :style="{
                    animation: isPlay ? (isReverse ? 'changeShape 0.15s 0s 1 ease-in forwards' : 'reverseShape 0.15s 0s 1 ease-in forwards') : '',
                }"></section>
                <span v-html="msg.navSvg" style="width: 2rem;margin-left: 1vw;" class="themENUS" @click="showMenu"
                    v-show="!isReverse"></span>
                <div v-show="isReverse" class="Xicon" @click="showMenu"></div>
                <ul v-show="isReverse" class="theNav">
                    <li v-for="(a, b) in msg.nav" :key="b" @click="Jump(b)">
                        <img :src="a.icon" alt="">
                        <span>{{ a.name }}</span>
                    </li>
                </ul>
            </nav>

            <section class="title">
                <img :src="imgs.titleImg">
            </section>
            <div class="right">
                <section style="cursor: pointer;" v-if="bool" @click="loginOut">
                    <img :src="msg.loginOut" alt="faild" style="width:2.25rem;margin-left: 0.5vw;">
                    <section class="rightSection">
                        <span style="font-size: 12px;">登出</span>
                    </section>
                </section>
                <section class="rightSectionParent">
                    <img :src="imgs.toCustomImg" alt="">
                    <section class="rightSection">
                        <span>客服中心</span>
                    </section>
                </section>

            </div>

        </header>
        <main>
            <div v-if="bool">
                <section class="topselfInfo">
                    <span>当前账号</span>
                    <span class="divi">|</span>
                    <span>{{ telephone }}</span>
                </section>
            </div>
            <suspense>
                <template #default>
                    <router-view />
                </template>
                <template #fallback>
                    <div>
                        loading...
                    </div>
                </template>
            </suspense>
        </main>

        <footer>
            <section v-for="( item, index ) in  imgs.bottom " :key="index">
                <img :src="item.img" alt="">
                <span>{{ item.words }}</span>
            </section>
        </footer>
    </div>
    <theDialog>
        <div class="loginOut">
            <div></div>
            <section>确定要登出吗？</section>
            <section>
                <button style="margin-right: 3vw;" @click="confrimLogOout">确定</button>
                <button @click="cancel" style="background-color: white;color: black;">取消</button>
            </section>
        </div>
    </theDialog>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import indexCss from "@/public/centerPage.scss"
import { toRefs, computed, provide, reactive, ref } from "vue";
import { Img } from "@/api/arknights/indexImg/index";
import allBtns from '@/hooks/theBottons'
import TheDialog from "@/components/theDialog.vue";
// import isDialog from "@/components/theDialog.vue"
export default {
    name: "centerPage",
    setup() {
        const route = useRoute();
        const router = useRouter();
        // 计算属性判断是否是白名单
        let bool = computed(() => route.fullPath != "/center" && route.fullPath != "/center/user/login" && route.fullPath != "/center/buffer");
        let msg, page, userId;
        if (bool.value) {
            msg = reactive(JSON.parse(sessionStorage.getItem("menus"))).menusMsg;
            page = reactive(JSON.parse(sessionStorage.getItem("menus"))).routes;
            userId = reactive(JSON.parse(localStorage.getItem("users"))).userId;
        }
        function cancel() {
            allBtns.isDialog.isLogOut = false;
        }
        function loginOut() {
            allBtns.isDialog.isLogOut = true;
        }
        function confrimLogOout() {
            allBtns.isDialog.isLogOut = false;
            localStorage.removeItem("token");
            router.push("/center/user/login");
        }

        function Jump(index) {
            router.push({
                name: page[index].name,
                params: {
                    userId
                }
            });
        }
        let isReverse = ref(false)
        let isPlay = ref(false)

        function showMenu() {
            isReverse.value = !isReverse.value
            isPlay.value = true
            console.log('work?')
        }
        provide("allBtns", "isLogOut");
        return {
            indexCss,
            route,
            ...toRefs(Img()),
            ...toRefs(allBtns),
            ...toRefs(page),
            bool,
            msg,
            cancel,
            confrimLogOout,
            loginOut,
            Jump,
            showMenu,
            isReverse,
            isPlay,
            ...toRefs(JSON.parse(localStorage.getItem("token")))

        };
    },
    components: { TheDialog }
}
</script>

<style lang="scss" scoped></style>