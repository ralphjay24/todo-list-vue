export const state = () => ({
  todos: [],
});
export const mutations = {
  SET_TODOS(state, todos) {
    state.todos = todos
  },
  SAVE_TODOS(state, todo) {
    state.todos.push(todo)
  },
};
export const actions = {};
export const strict = false;
