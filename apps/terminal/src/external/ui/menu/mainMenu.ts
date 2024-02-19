import Session from "../../../data/Session";
import { loginUser } from "../user/loginUser";
import { registerUser } from "../user/registerUser";
import Terminal from "../util/Terminal";

export default async function mainMenu() {

  while(true) {
    const openOptions = {
      register: 'Register',
      login: 'Login',
      exit: 'Exit'
    }

    const closedOptions = {
      logout: 'Logout',
    }

    const options: any = {
      ...(Session.user ? closedOptions : openOptions)
    }

    const user = Session.user
    const [_, response] = await Terminal.menu(
      `Main Menu ${user ? `(${user.email})` : ''}`,
      ["Register", "Login", "Exit"]
    )

    switch(response) {
      case options.register:
        await registerUser()
        break
      case options.login:
        await loginUser()
        break
      case options.logout:
          await loginUser()
          break
      case options.exit:
        process.exit(0)
    }

  }

}
