export default () => ({
  async index() {
    return await fetch('https://dummyjson.com/todos?limit=3')
      .then(res => res.json())
      .then(arr => arr.todos.map(v => ({
          ...v,
          label: v.todo,
        }))
      )
  }
})
