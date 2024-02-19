import Terminal from "../util/Terminal";
import Api from "../../api/Api";
import { BASE_URL } from "../../../constants";
import Session from "../../../data/Session";

export async function loginUser(){
  Terminal.title("Login User")

  const email = await Terminal.requiredInput("Email:")
  const password = await Terminal.requiredInput("Password:", { echo: false })

  try {
    const api = new Api(BASE_URL)
    const response = await api.post<{token: string}>('/user/login', { email, password })

    Terminal.success("User logged in successfully!")
    Session.init(response.token)
  } catch (error) {
    Terminal.error(JSON.stringify(error, null, 2))
  } finally {
    await Terminal.awaitEnterToContinue()
  }
}
