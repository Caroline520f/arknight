<template>
    <div class="baseMsg">
        <div class="realname">
            <section class="ttile">
                <span>{{ dataInfo.title }}</span>
            </section>
            <section class="realNN iinfo">
                <section>
                    <span>收集场景</span>
                    <span>{{ dataInfo.scene }}</span>
                </section>
                <section>
                    <span>收集目的 </span>
                    <span>{{ dataInfo.target }}</span>
                </section>
                <section>
                    <span>信息内容及数量</span>
                    <span>{{ dataInfo.item }}</span>
                </section>
            </section>
        </div>
    </div>
</template>

<script>
import { getBehavior } from '@/api/arknights/list/list'
import basMsg from '@/public/baseMsg/baseMsg.scss'
import list from '@/public/list/thelist.scss'
import { toRefs } from 'vue'
export default {
    name: "InfoBehavior",
    setup() {


        return {
            ...toRefs(getBehavior()),
            basMsg, list
        }
    }
}
</script>

<style lang="scss" scoped></style>