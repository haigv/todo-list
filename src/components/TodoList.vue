<template>
  <div id="todo-list" class="p4">
    <div>
      <input
        v-model="searchText"
        type="text"
        class="input w-8-of-24"
        placeholder="Search"
      />
    </div>
    <template v-for="(item, id) in filteredData">
      <div :key="id" class="todo-item mt4 p4">
        <div class="my-auto truncate-text">
          <input
            :id="id"
            v-model="checkedValue"
            type="checkbox"
            :value="item.id"
          />
          <label :for="id" class="ml4">{{ item.title }}</label>
        </div>
        <div class="d-flex">
          <button type="primary" @click="onClickDetail(id)">Detail</button>
          <button type="danger" @click="onClickRemove(item.id)">Remove</button>
        </div>
      </div>
      <TodoForm
        v-if="updateState[id]"
        :key="'update' + id"
        :code="item.id"
        :info="item"
        :action="updateAct"
      />
    </template>
    <div v-if="canShowBulkAct" class="bulk-act">
      <div class="todo-item mt4 p4">
        <div class="my-auto truncate-text">
          <label class="ml4">Bulk action:</label>
        </div>
        <div class="d-flex">
          <button type="primary">Done</button>
          <button type="danger" @click="onClickRemove()">Remove</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import _cloneDeep from 'lodash/cloneDeep'
import TodoForm from '@/components/TodoForm.vue'

export default {
  name: 'TodoList',
  components: {
    TodoForm
  },
  props: {},
  data() {
    return {
      checkedValue: [],
      filteredData: [],
      searchText: '',
      onChangeList: false,
      updateAct: 'Update',
      updateState: []
    }
  },
  computed: {
    ...mapGetters({
      todoList: 'todoList'
    }),
    rebuiltListTrigger: function() {
      return [this.onChangeList, this.searchText]
    },
    canShowBulkAct: function() {
      return this.checkedValue.length
    }
  },
  watch: {
    todoList: {
      handler: function() {
        this.onChangeList = !this.onChangeList
      }
    },
    rebuiltListTrigger: {
      handler: function() {
        this.filteredData = _cloneDeep(this.todoList)
        if (this.searchText) {
          this.filteredData = this.filteredData.filter(item =>
            item.title.toLowerCase().includes(this.searchText.toLowerCase())
          )
        }
        this.filteredData.sort(function(a, b) {
          return new Date(b.date) - new Date(a.date)
        })
      }
    }
  },
  created() {
    this.$store.dispatch('getTodoList')
  },
  methods: {
    onClickRemove(idx) {
      let payload = this.checkedValue
      if (idx) {
        payload = [idx]
      }
      this.$store.dispatch('removeTodo', payload).then(() => {
        this.checkedValue = []
        this.$store.dispatch('getTodoList')
      })
    },
    onClickDetail(id) {
      this.updateState[id] = !this.updateState[id]
      this.updateState = [...this.updateState]
    }
  }
}
</script>

<style scoped lang="scss">
#todo-list {
  .todo-item {
    border: 1px solid #ccc;
    display: flex;
    justify-content: space-between;

    .truncate-text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .bulk-act {
    position: sticky;
    background-color: #ccc;
    bottom: 0;
  }
}
</style>
