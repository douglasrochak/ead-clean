import { terminal } from "terminal-kit";
import { InputFieldOptions } from "terminal-kit/Terminal";

export default class Terminal {
  constructor() { }
  
  static title(text: string) {
    terminal.clear()
    terminal.bold.magenta(`${text}\n`)
    terminal.bold.magenta("-".repeat(text.length))
  }

  static async menu(title: string, options: string[]):Promise <[number, string]> {
    Terminal.title(title)
    const response = await terminal.singleColumnMenu(options).promise
    return [response.selectedIndex, response.selectedText]
  }

  static async requiredInput(label: string, options?: InputFieldOptions): Promise<string> {
    terminal.gray(`\n${label}`)
    const value = await terminal.inputField(options).promise
    if(value?.trim()) return value
    return Terminal.requiredInput(label, options)
  }

  static async confirmInput(label: string, options?: InputFieldOptions): Promise<boolean> {
    terminal.gray(`\n${label}`)
    const value = await terminal.singleLineMenu(["Yes", "Not"]).promise
    return value.selectedIndex === 0
  }

  static async awaitEnterToContinue() {
    terminal.white("\nPress ENTER to continue...")
    await terminal.inputField({echo: false}).promise
  }

  static success(text: string, newLine = true) {
    terminal.green(`${newLine ? '\n' : ''}${text}`)
  }

  static error(text: string, newLine = true) {
    terminal.red(`${newLine ? '\n' : ''}${text}`)
  }
}
