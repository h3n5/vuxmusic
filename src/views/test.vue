<template>
  <div>
    <children
      url="/profile"
      :list="list"
    >
      Logged in as {{ user.name }}
      <template slot="head">
        <h1>Here might be a page title</h1>
      </template>
    </children>
    <todo-list v-bind:todos="todos">
      <template slot-scope="{ todo }">
        <span v-if="todo.isComplete">✓</span>
        {{ todo.text }}
      </template>
    </todo-list>
    <ul>
      <li
        v-for="todo in todos"
        v-bind:key="todo.id"
      >
        <!-- 我们为每个 todo 准备了一个插槽，-->
        <!-- 将 `todo` 对象作为一个插槽的 prop 传入。-->
        <slot v-bind:todo="todo">
          <!-- 回退的内容 -->
          {{ todo.text }}
        </slot>
      </li>
    </ul>
  </div>
</template>

<script>
import children from './children'
export default {
  name: 'test',
  components: { children },
  data() {
    return {
      user: {
        name: 'cc'
      },
      list: [{ type: 1 }, { type: 2 }],
      todos: [{ id: 1, text: '123' }]
    }
  },

  methods: {}
}
</script>

<style lang='less' scoped>
</style>
