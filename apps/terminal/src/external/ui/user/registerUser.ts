import Terminal from "../util/Terminal";
import Api from "../../api/Api";
import { BASE_URL } from "../../../constants";

export async function registerUser() {
  Terminal.title("Register User")

  const name = await Terminal.requiredInput("Name:")
  const email = await Terminal.requiredInput("Email:")
  const password = await Terminal.requiredInput("Password:", { echo: false })
  const admin = await Terminal.confirmInput("Admin?")

  
  try {
    const api = new Api(BASE_URL)
    await api.post('/user/register', { name, email, password, admin})
    Terminal.success("User registered successfully!")
  } catch (error) {
    Terminal.error(JSON.stringify(error, null, 2))
  } finally {
    await Terminal.awaitEnterToContinue()
  }

}
