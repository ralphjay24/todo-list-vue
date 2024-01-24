import { repository } from "../repository/Repository"

export default (context, inject) => {
  // Inject $hello(msg) in Vue, context and store.
  inject('repository', repository())
}
