import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/client/testing';
import AppContainer from './index';
import { GET_POSTS } from '../../querirs/queries';

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
        <AppContainer />
    </MockedProvider>
);

describe('AppContainer', () => {
    it('renders without error', () => {
        renderComponent();
        expect(screen.getByText('Blog Post App')).toBeInTheDocument();
    });

    it('opens the modal when the add button is clicked', async () => {
        renderComponent();
        fireEvent.click(screen.getByText('+'));
        expect(await screen.findByText('Add Post')).toBeInTheDocument();
    });

    it('adds a new post when the create post form is submitted', async () => {
        renderComponent();
        fireEvent.click(screen.getByText('+'));
        const titleInput = await screen.findByLabelText('Title');
        const bodyInput = await screen.findByLabelText('Post Body');
        fireEvent.change(titleInput, { target: { value: 'New Post' } });
        fireEvent.change(bodyInput, { target: { value: 'New Body' } });
        fireEvent.click(screen.getByText('Add Post'));
        await waitFor(() => {
            expect(screen.getByText('New Post')).toBeInTheDocument();
        });
    });
});
