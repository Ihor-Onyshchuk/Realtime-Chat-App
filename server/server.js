const http = require("http");
const { createYoga, createSchema } = require('graphql-yoga');

const messages = [];

const schema = createSchema({
   typeDefs: `
    type Message {
      id: ID!
      user: String!
      content: String!
    }

    type Query {
      messages: [Message!]
    }

    type Mutation {
      postMessage(user: String!, content: String!): ID!
    }
  `,
  resolvers: {
    Query: {
      messages: () => messages,
    },
    Mutation: {
      postMessage: (parent, { user, content }) => {
        const id = messages.length;
        messages.push({
          id,
          user,
          content
        });

        return id;
      }
    }
  }
});

const yoga = createYoga({ schema });
const server = http.createServer(yoga);

server.listen(4000, () => {
  console.log(`Server on http://localhost:4000}`);
});