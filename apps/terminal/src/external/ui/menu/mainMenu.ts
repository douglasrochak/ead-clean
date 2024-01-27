import { loginUser } from "../user/loginUser";
import { registerUser } from "../user/registerUser";
import Terminal from "../util/Terminal";

export default async function mainMenu() {

  while(true) {
    const [_, response] = await Terminal.menu("Main Menu", ["User Register", "User Login", "Exit"])

    switch(response) {
      case "User Register":
        await registerUser()
        break
      case "User Login":
        await loginUser()
        break
      case "Exit":
        process.exit(0)
    }

  }

}
