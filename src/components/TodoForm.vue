<template>
  <div id="todo-form" class="p4">
    <div>
      <label for="textarea">Title</label>
      <input
        id="title"
        v-model="object.title"
        type="text"
        class="input mt2"
        placeholder="Add new task ..."
      />
      <p v-if="rules.title.canShow" class="validation-text m0">
        {{ rules.title.msg }}
      </p>
    </div>
    <div class="mt6">
      <label for="textarea">Textarea</label>
      <textarea
        id="textarea"
        v-model="object.description"
        class="input mt2"
        rows="5"
      />
    </div>
    <div class="mt6 w-24-of-24 d-flex">
      <div class="w-11-of-24">
        <label for="date-input">Due date</label>
        <input
          id="date-input"
          v-model="object.dueDate"
          class="input mt2"
          type="date"
        />
        <p v-if="rules.dueDate.canShow" class="validation-text m0">
          {{ rules.dueDate.msg }}
        </p>
      </div>
      <div class="w-11-of-24 ml-2-of-24">
        <label for="piority">Piority:</label>
        <select id="piority" v-model="object.piority" class="input mt2">
          <option
            v-for="(opt, idx) in piorityOption"
            :key="idx"
            :value="opt.value"
          >
            {{ opt.text }}
          </option>
        </select>
      </div>
    </div>
    <button type="success" class="w-24-of-24 mt6" @click="onSubmitForm">
      {{ action }}
    </button>
  </div>
</template>

<script>
import _cloneDeep from 'lodash/cloneDeep'
import {
  PIORITY_OPTION,
  DEFAULT_DATA,
  DEFAULT_RULES,
  FIELDS
} from '@/constants/constants'

export default {
  name: 'TodoForm',
  props: {
    code: {
      type: Number || null,
      default() {
        return null
      }
    },
    info: {
      type: Object,
      default() {
        return null
      }
    },
    action: {
      type: String,
      default() {
        return 'Add'
      }
    }
  },
  data() {
    return {
      piorityOption: PIORITY_OPTION,
      object: _cloneDeep(DEFAULT_DATA),
      rules: _cloneDeep(DEFAULT_RULES)
    }
  },
  computed: {},
  watch: {
    info: {
      handler: function() {
        const obj = {}
        if (this.info) {
          const fields = FIELDS
          for (const key in fields) {
            const fieldName = fields[key]
            obj[key] = this.info[fieldName]
          }
          Object.assign(this.object, obj)
        }
      },
      immediate: true
    }
  },
  methods: {
    onSubmitForm() {
      this.rules = _cloneDeep(DEFAULT_RULES)
      if (!this.object.title) {
        this.rules.title.canShow = true
        return
      }
      if (new Date(this.object.dueDate) < new Date()) {
        this.rules.dueDate.canShow = true
        return
      }
      if (this.code) {
        this.$store
          .dispatch('updateTodo', { id: this.code, data: this.object })
          .then(() => {
            this.$store.dispatch('getTodoList')
            this.object = _cloneDeep(DEFAULT_DATA)
          })
        return
      }
      this.$store.dispatch('addTodo', this.object).then(() => {
        this.$store.dispatch('getTodoList')
        this.object = _cloneDeep(DEFAULT_DATA)
      })
    }
  }
}
</script>

<style scoped lang="scss"></style>
