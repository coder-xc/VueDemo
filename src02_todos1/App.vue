<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header :addTodo="addTodo"></Header>
      <List 
        :todos="todos" 
        :deleteTodo="deleteTodo"
        :updateTodo="updateTodo"
      >
      </List>
      <Footer 
        :todos="todos" 
        :selectAll="selectAll"
        :deleteCompleted="deleteCompleted"
      ></Footer>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import List from "./components/List.vue";
import Footer from "./components/Footer.vue";

export default {
  data() {
    return {
      // todos: [
      //   { id: 1, title: "AAA", complete: false },
      //   { id: 3, title: "BBB", complete: true },
      //   { id: 5, title: "CCC", complete: false }
      // ]
      todos: JSON.parse(localStorage.getItem('todos_key') || '[]')
    };
  },

  methods: {
    addTodo(todo) {
      this.todos.unshift(todo);
    },
    deleteTodo(index) {
      this.todos.splice(index, 1)
    },

    updateTodo(todo, complete) {
      todo.complete = complete
    },

    /**
     * 全选/全不选
     */
    selectAll(isCheck) {
        this.todos.forEach(todo => todo.complete = isCheck)
    },

    /**
     * 删除已完成
     */
    deleteCompleted() {
      this.todos = this.todos.filter(todo => !todo.complete)
    }
  },
  watch: {
    todos: {
      deep: true, // 深度监视: 内部发生任何变化都会回调
      handler: function (value) { // todos发生了变化
        // 保存todos
        localStorage.setItem('todos_key', JSON.stringify(value))
      }
    }
  },
  components: {
    Header,
    List,
    Footer
  }
};
</script>
<style scoped>
/*app*/
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
