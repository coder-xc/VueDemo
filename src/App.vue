<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <!-- <Header @addTodo="addTodo"></Header> -->
      <Header ref="header"></Header>
      <List :todos="todos">
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
  import PubSub from 'pubsub-js'
  import Header from "./components/Header.vue";
  import List from "./components/List.vue";
  import Footer from "./components/Footer.vue";

  export default {
    data() {
      return {
        todos: JSON.parse(localStorage.getItem('todos_key') || '[]')
      };
    },

    mounted() {
      this.$refs.header.$on('addTodo', this.addTodo)
      // 通过事件总线来绑定自定义事件监听
      this.$globalEventBus.$on('deleteTodo', this.deleteTodo)
      // 订阅消息
      this.token = PubSub.subscribe('updateTodo', (msg, {todo, complete}) => {
        this.updateTodo(todo, complete)
      })
    },

    beforeDestroy() {
      this.$refs.header.$off('addTodo')
      this.$globalEventBus.$off('deleteTodo')
      PubSub.unsubscribe(this.token)
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
