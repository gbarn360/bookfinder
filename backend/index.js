const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const axios = require('axios');

const cors = require('cors');
require('dotenv').config(); 


const app = express();
const port = process.env.PORT || 5000; // Use environment variable or default to 5000



app.use(cors());


const typeDefs = gql`

    type BookResponse{
        totalItems: Int
        items: [Book]
    }
    type Book{
        id: String
        volumeInfo:VolumeInfo
    }
    type VolumeInfo{
        title: String
        authors: [String]
        description: String
        imageLinks : ImageLinks
        publisher: String
        publishedDate: String
        pageCount: Int
        previewLink : String
    }
    type ImageLinks{
        thumbnail: String
    }
    type Query{
    searchBooks(query: String!, count: Int!): BookResponse
    }
`;

const resolvers = {
    Query: {
      searchBooks: async(_,{query,count}) => {
        const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=25&startIndex=${count - 20}&key=${process.env.BOOKS_KEY}`;

        try {
            const response = await axios.get(url);
            console.log(response.data)
            return{
                totalItems:response.data.totalItems,
                items:response.data.items
            }
          } catch (error) {
            console.error("Error fetching data:", error.response ? error.response.data : error.message);
            throw new Error('Error fetching data');
          }
      },
    },
  };

  const server = new ApolloServer({ typeDefs, resolvers });

  async function startServer() {
    // Start Apollo Server
    await server.start();
  
    // Create an Express app
  
    // Apply Apollo GraphQL middleware and set the path to /graphql
    server.applyMiddleware({ app });
  
    // Start the Express server
    app.listen(port, () => {
      console.log(`Server ready at ${port}`);
    });
  }

  startServer();