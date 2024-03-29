<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        sm="12"
        md="6"
        offset-md="3"
      >
        <v-card>
          <v-card-text style="height: 100px; position: relative">
            <v-chip
              class="ma-2"
              color="primary"
              text-color="white"
            >
              <v-avatar
                left
                class="white black--text"
              >
                {{ total }}
              </v-avatar>
              Total
            </v-chip>
            <v-chip
              class="ma-2"
              color="success"
              text-color="white"
            >
              <v-avatar
                left
                class="white black--text"
              >
                {{ doneTotal }}
              </v-avatar>
              Total Done
            </v-chip>
          </v-card-text>
          <v-card-text
            style="height: 300px;position: relative;"
            class="lighten-5 text-center overflow-auto"
          >
            <v-list-item
              v-for="(item, idx) in todos"
              :key="`${item.label}-${item.completed}-${idx}`"
              link
            >
              <v-checkbox
                :input-value="item.completed"
                color="success"
                @change="clickTodo(item, idx)"
              />

              <v-list-item-content @click="clickTodo(item, idx)">
                <v-list-item-title
                  :class="{
                    'text-decoration-line-through': item.completed,
                    'font-weight-bold': item.completed
                  }"
                >{{ item.label }}</v-list-item-title>
              </v-list-item-content>

              <v-list-item-action class="flex-row">
                <v-btn
                  icon
                  @click.prevent="editForm(item, idx)"
                >
                  <v-icon>
                    mdi-pencil
                  </v-icon>
                </v-btn>
                <v-btn
                  icon
                  color="error"
                  @click.prevent="deleteTodo(idx)"
                >
                  <v-icon>
                    mdi-close-circle
                  </v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-card-text>
          <v-fab-transition>
            <v-btn
              color="blue"
              fab
              large
              dark
              bottom
              left
              class="ml-2 mb-2"
              @click="saveOpen = !saveOpen"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-fab-transition>
        </v-card>
      </v-col>
    </v-row>
    <SaveTodoModal
      v-model="saveOpen"
      :todo="editTodo"
      @onSave="saveTodo"
    />
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Main',
  data() {
    return {
      saveOpen: false,
      editTodo: null,
      defTodos: [],
    }
  },
  async asyncData({ $repository }) {
    return $repository.todos.index().then(res => ({
      defTodos: res
    }))
  },
  computed: {
    ...mapState({
      todos: state => state.todos,
    }),
    total() {
      return this.todos.length
    },
    doneTotal() {
      return this.todos.filter(t => t.completed).length
    },
  },
  mounted() {
    if (this.todos.length == 0) {
      this.$store.commit('SET_TODOS', this.defTodos)
    }
  },
  methods: {
    saveTodo(label, idx) {
      let data = {
        label,
        completed: false,
      }
      if (idx != null && idx != undefined) {
        this.todos[idx].label = label
      } else {
        this.$store.commit('SAVE_TODOS', data)
      }
      this.saveOpen = false
      this.editTodo = null
    },
    clickTodo(todo, idx) {
      let items = this.todos
      todo.completed = !todo.completed
      items.splice(idx, 1)
      if (todo.completed) {
        this.$store.commit('SET_TODOS', [todo].concat(items))
      } else {
        items.push(todo)
        this.$store.commit('SET_TODOS', items)
      }
    },
    editForm(item, idx) {
      this.saveOpen = true
      this.editTodo = {
        idx,
        ...item
      }
    },
    deleteTodo(idx) {
      let todos = this.todos.filter((t, i) => i != idx)
      if (confirm('Are you sure you want to delete this todo?')) {
        this.$store.commit('SET_TODOS', todos)
      }
    }
  }
}
</script>
