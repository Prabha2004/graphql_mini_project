const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require('graphql');

const app = express();


const users = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 35 },
];


const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  },
});


const RootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    message: {
      type: GraphQLString,
      resolve: () => 'Hello World',
    },
    users: {
      type: new GraphQLList(UserType), 
      resolve: () => users, 
    },
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLInt }, 
      },
      resolve: (parent, args) => users.find(user => user.id === args.id),
    },
  },
});


const schema = new GraphQLSchema({
  query: RootQuery,
});


app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);


const PORT = 8125;
app.listen(PORT, () => {
  console.log(`Server Running at http://localhost:${PORT}/graphql`);
});
