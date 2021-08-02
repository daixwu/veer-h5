<template>
  <div
    id="app"
    class="App"
  >
    <div
      v-if="!$route.meta.hide"
      id="nav"
    >
      <router-link to="/">
        Home
      </router-link>|
      <router-link to="/about">
        About
      </router-link>
    </div>
    <keep-alive>
      <router-view
        v-if="$route.meta.keepAlive"
        class="router"
      />
    </keep-alive>
    <router-view
      v-if="!$route.meta.keepAlive"
      class="router"
    />
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    const store = useStore()
    return {
      title: computed(() => store.state.title)
    }
  }
})
</script>
<style lang="scss" src='./assets/style/app.scss'></style>
