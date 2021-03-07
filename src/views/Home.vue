<template>
  <section class="app-main">
    <TodoForm />
    <TodoList />
  </section>
</template>

<script>
import TodoForm from '@/components/TodoForm.vue'
import TodoList from '@/components/TodoList.vue'

export default {
  name: 'Home',
  components: {
    TodoForm,
    TodoList
  }
}
</script>
<style lang="scss">
.app-main {
  max-width: 800px;
  margin: auto;
  background-color: white;
  min-height: 100vh;
  height: 100%;
}
</style>
