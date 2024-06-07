import { mergeTypeDefs  } from '@graphql-tools/merge'

import transactionTypeDef from './transaction.typeDef'
import userTypeDef from './user.typeDef'

const mergedTypeDef = mergeTypeDefs ([userTypeDef, transactionTypeDef])

export default mergedTypeDef