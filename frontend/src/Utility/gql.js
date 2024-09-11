import {gql } from '@apollo/client';


export const SEARCH_BOOKS = gql`
  query SearchBooks($query: String!, $count: Int!) {
    searchBooks(query: $query, count: $count) {
      totalItems
      items {
        id
        volumeInfo {
          title
          authors
          description
          imageLinks {
            thumbnail
          }
          publisher
          publishedDate
          pageCount
        }
      }
    }
  }
`;