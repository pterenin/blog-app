import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import InlinePost from './index';
import { Post } from "../../Types/types";

// Mock the FontAwesomeIcon component to prevent font awesome library complications
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon }: any) => <div>{icon.iconName}</div>,
}));

describe('InlinePost', () => {
  const mockPost: Post = {
    id: '1',
    title: 'Test Title',
    body: 'Test Body',
    updating: false
  };

  it('renders post content', () => {
    render(<InlinePost post={mockPost} index={0} onEdit={() => { }} onDelete={() => { }} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Body')).toBeInTheDocument();
  });

  it('calls onEdit when the edit button is clicked', () => {
    const onEditMock = jest.fn();
    render(<InlinePost post={mockPost} index={0} onEdit={onEditMock} onDelete={() => { }} />);
    fireEvent.click(screen.getByTestId('edit-btn'));
    expect(onEditMock).toHaveBeenCalledWith(mockPost);
  });

  it('calls onDelete when the delete button is clicked', () => {
    const onDeleteMock = jest.fn();
    render(<InlinePost post={mockPost} index={0} onEdit={() => { }} onDelete={onDeleteMock} />);
    fireEvent.click(screen.getByTestId('delete-button'));
    expect(onDeleteMock).toHaveBeenCalledWith(mockPost);
  });

  it('displays pending label for posts without an id', () => {
    const pendingPost = { ...mockPost, id: undefined };
    render(<InlinePost post={pendingPost} index={0} onEdit={() => { }} onDelete={() => { }} />);
    expect(screen.getByText('• Pending')).toBeInTheDocument();
  });

  it('applies the "updating" class to the post container when post is deleting', () => {
    const deletingPost = { ...mockPost, updating: true };
    const { container } = render(<InlinePost post={deletingPost} index={0} onEdit={() => { }} onDelete={() => { }} />);
    expect(container.firstChild).toHaveClass('updating');
  });

});
