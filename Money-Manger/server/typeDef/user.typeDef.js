const userTypeDef = `#graphql
    type User {
        _id: ID!
        username: String!
        name: String!
        password: String!
        profilePicture: String!
        gender: String
    }

    type Query {
        users: [User!]
        user(userId: ID!): User
        authUser: User
    }

    type Mutation {
        signUp(input: SignupInput!): User
        login(input: LoginInput!): User
        logout: LogoutResponse
    }

    type LogoutResponse {
        message: String!
    }

    input SignupInput {
        username: String!
        name: String!
        password: String!
        gender: String!
    }

    input LoginInput {
        username: String!
        password: String!
    }
`

export default userTypeDef