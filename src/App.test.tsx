import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { render, screen } from '@testing-library/react';
import { GET_POSTS } from './querirs/queries'
import App from './App';
const mocks = [
  {
    request: {
      query: GET_POSTS,
      variables: {
        options: {
          paginate: {
            page: 1,
            limit: 20
          }
        }
      },
    },
    result: {
      data: {
        posts: {
          data: [{ id: '1', title: 'Post 1', body: 'Body 1' }],
          meta: { totalCount: 1 },
        },
      },
    },
  },
];

const renderComponent = () => render(
  <MockedProvider mocks={mocks} addTypename={false}>
    <App />
  </MockedProvider>
);


test('renders react app', () => {
  const { container } = renderComponent();
  const element = container.getElementsByClassName('App');
  expect(element.length).toBe(1);
});
