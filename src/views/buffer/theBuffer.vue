<template>
    <div>
        <h1>buffer</h1>
        <router-view />

    </div>
</template>

<script>
import { createMenu } from '@/api/arknights/route/router';
export default {
    name: "theBuffer",
    setup() {
        createMenu()

        return {}
    }
}
</script>

<style lang="scss" scoped></style>