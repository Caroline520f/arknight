<template>
  <div>
      <section>
          <span>to the dataBase</span>
      </section>

      <section @click="toDatabase">
          <span>click to the dataBase</span>
      </section>
  </div>
</template>

<script>
import { useRouter,onBeforeRouteLeave } from 'vue-router';
import { layoutMenu } from '@/api/database/layout/layout';
export default {
  name: 'ToDatabase',
  setup () {
      const router = useRouter();
      function toDatabase () {
          router.push({
              name: 'databasePage'
          })
      }
      onBeforeRouteLeave(() => {
          layoutMenu()
      })
      return {
          toDatabase
      }
  }
}
</script>

<style lang="scss" scoped>

</style>