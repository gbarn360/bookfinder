import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ReadListProvider } from './Utility/ReadListContext';
import { ApolloClient, InMemoryCache,ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
  });
  
const root = ReactDOM.createRoot(document.getElementById('root'));
const context = React.createContext();
let readList = [];
root.render(
    <ApolloProvider client={client}>
      <ReadListProvider>
        <App />
      </ReadListProvider>
    </ApolloProvider>
  );
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
