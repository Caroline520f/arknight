<template>
    <div class="baseMsg">
        <div class="thefinal">
            <div v-for="(a, b) in saveData" :key="b" class="final">
                {{ b }}
                <div class="theBtns">
                    <button @click="judege(b)">{{ a.time }}</button>
                </div>
                <div>
                    <section v-for="(c, d) in a.children" :key="d">
                        <section>
                            <span>{{ c.title }}</span>
                        </section>
                        <section>
                            <span>收集场景</span>
                            <span>{{ c.scene }}</span>
                            <span>收集目的</span>
                            <span>{{ c.target }}</span>
                            <span>信息内容及数量</span>
                            <span>{{ c.item }}</span>
                        </section>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import { getDevice } from '@/api/arknights/list/list'
import { Request } from '@/hooks/request'
import basMsg from '@/public/baseMsg/baseMsg.scss'
import list from '@/public/list/thelist.scss'
import { ref, reactive, onBeforeMount } from 'vue'
import url from '@/api/url'
export default {
    name: "InfoDevice",
    setup() {
        let isShow = ref(false)
        let saveData = reactive([{
        }])
        onBeforeMount(() => {
            Request.get(url.centerPage.selfList.infoDevice).then(res => {
                saveData = res.data.infoDevice;
                console.log(saveData)
            })
        })
        function judege(i) {
            switch (i) {
                case 0:
                    console.log(i)
                    break;
                case 1:
                    console.log(i)
                    break;
                case 2:
                    console.log(i)
                    break;
                case 3:
                    console.log(i)
                    break;
            }
        }
        // switch (i.time) {
        //         case "当月":
        //             console.log(i)
        //             break;
        //         case "近6个月":
        //             console.log(i)
        //             break;
        //         case "近6个月":
        //             console.log(i)
        //             break;
        //         case "近12个月":
        //             console.log(i)
        //             break;
        //         default:
        //             break;
        //     }
        return {
            saveData,
            basMsg, list, judege, isShow
        }
    }
}
</script>

<style lang="scss" scoped></style>
