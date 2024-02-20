export default class CourseNames {

  static random(): string {
      const index = Math.floor(Math.random() * CourseNames.names.length)
      return CourseNames.names[index]!
  }

  static readonly names = [
      'Arquitetura Limpa',
      'Banco de Dados',
      'Casos de Uso',
      'Código Limpo',
      'Design Patterns',
      'Express.js',
      'Fundamentos de React',
      'HTML, CSS e JavaScript',
      'Iniciando na Programação',
      'Introdução ao JavaScript',
      'Introdução ao TypeScript',
      'Lógica de Programação',
      'MongoDB',
      'Next.js',
      'Node.js',
      'React com Tailwind CSS',
      'SOLID',
      'TDD',
      'Testes de Software',
      'TypeORM',
      'TypeScript',
  ]
}
