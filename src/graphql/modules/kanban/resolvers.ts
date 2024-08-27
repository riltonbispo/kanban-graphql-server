import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    boards: async () => prisma.board.findMany(),
    tasks: async (_, args) => await prisma.task.findMany()
  },
  Mutation: {
    createBoard: async (_, { data }) => {
      try {
        const board = await prisma.board.findFirst({where: {name: data.name}})
        if (!board) {
          const newBoard = await prisma.board.create({
            data: {
              name: data.name
            }
          })
  
          return newBoard
        }
      } catch (error) {
        console.log(error)
      }
    },
    createTask: async (_, { data }) => {
      console.log(data)

      try {
        const newTask = await prisma.task.create({
          data: {
            title: data.title,
            description: data.description,
            priority: data.priority || false,
            deadline: data.deadline ? new Date(data.deadline) : null,
            status: data.status || 'TO_DO'
          }
        })

        return newTask
      } catch (error) {
        console.log(error)
      }
    }
  }
};