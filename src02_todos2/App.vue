<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <!-- <Header @addTodo="addTodo"></Header> -->
      <Header ref="header"></Header>
      <List :todos="todos">
      </List>
      <!-- <Footer 
        :todos="todos" 
        :selectAll="selectAll"
        :deleteCompleted="deleteCompleted"
      ></Footer> -->
      <Footer>
        <span slot="middle">
          <span>已完成{{ completeCount }}</span> / 全部{{ todos.length }}
        </span>
        <input type="checkbox" v-model="checkAll" slot="left" />
        <button class="btn btn-danger" v-if="completeCount > 0" @click="deleteCompleted" slot="right">清除已完成任务</button>
      </Footer>
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

    computed: {
      completeCount() {
        return this.todos.reduce((pre, todo) => pre + (todo.complete ? 1 : 0), 0)
      },
      checkAll: {
        get() {
          return this.todos.length === this.completeCount && this.completeCount > 0
        },
        set(value) {
          this.selectAll(value)
        }
      }
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
