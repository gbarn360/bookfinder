import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { SEARCH_BOOKS } from "../src/Utility/gql"
import Search from './Pages/Search';

const mocks = [
  {
    request: {
      query: SEARCH_BOOKS,
      variables: { query: 'test', count: 0 },
    },
    result: {
      data: {
        searchBooks: {
          items: [],
          totalItems: 0,
        },
      },
    },
  },
];

test('shows Loading component while loading', () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Search />
    </MockedProvider>
  );

  expect(screen.getByText('Fetching amazing books...')).toBeInTheDocument();
});
