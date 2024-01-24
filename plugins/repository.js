import { repository } from "../repository/Repository"

export default (context, inject) => {
  inject('repository', repository())
}
