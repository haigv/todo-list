import Vue from 'vue'
import Vuex from 'vuex'
import apiService from '@/api/apiService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todoList: {}
  },
  getters: {
    todoList: state => state.todoList
  },
  mutations: {
    setTodoList(state, data) {
      state.todoList = data
    }
  },
  actions: {
    getTodoList({ commit }, params) {
      return new Promise((resolve, reject) => {
        const data = apiService.getTodoList()
        commit('setTodoList', data)
        resolve({ code: 200, message: 'Ok', data: data })
      })
    },

    addTodo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const data = apiService.addTodo(params)
        resolve({ code: 200, message: 'Ok', data: data })
      })
    },

    updateTodo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const data = apiService.updateTodo(params)
        resolve({ code: 200, message: 'Ok', data: data })
      })
    },

    removeTodo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const data = apiService.removeTodo(params)
        resolve({ code: 200, message: 'Ok', data: data })
      })
    }
  }
})
