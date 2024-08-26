import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import path from 'path'

const typesArray = loadFilesSync(path.join(__dirname, 'modules', '**'), { extensions: ['gql'] })
const resolversArray = loadFilesSync(path.join(__dirname, 'modules', '**', 'resolvers.ts'))

export const typeDefs = mergeTypeDefs(typesArray)
export const resolvers = mergeResolvers(resolversArray)