<template>
    <div class="baseMsg">
        <div class="realname">
            <section class="ttile">
                <span>{{ dataInfo.title }}</span>
            </section>
            <section class="realNN iinfo">
                <section>
                    <span>证件类型</span>
                    <span>{{ dataInfo.type }}</span>
                </section>
                <section>
                    <span>证件姓名 </span>
                    <span>{{ dataInfo.name }}</span>
                </section>
                <section>
                    <span>证件号码</span>
                    <span>{{ dataInfo.number }}</span>
                </section>
            </section>
        </div>
    </div>
</template>

<script>
import { getRealname } from '@/api/arknights/list/list'
import basMsg from '@/public/baseMsg/baseMsg.scss'
import list from '@/public/list/thelist.scss'
import { toRefs } from 'vue'
export default {
    name: "InfoRealname",
    setup() {


        return {
            ...toRefs(getRealname()),
            basMsg, list
        }
    }
}
</script>

<style lang="scss" scoped></style>