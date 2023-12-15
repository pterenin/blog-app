import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormModal from './index';
import { Post } from '../../Types/types';

describe('FormModal', () => {
  const handleClose = jest.fn();
  const addPost = jest.fn();
  const updatePost = jest.fn();

  it('renders with correct title for new post', () => {
    render(<FormModal show={true} handleClose={handleClose} addPost={addPost} updatePost={updatePost} />);
    expect(screen.getByText('New Post')).toBeInTheDocument();
  });

  it('renders with correct title for editing post', () => {
    const mockPost: Post = { id: '1', title: 'Test Title', body: 'Test Body' };
    render(<FormModal show={true} handleClose={handleClose} addPost={addPost} updatePost={updatePost} post={mockPost} />);
    expect(screen.getByText('Update Post')).toBeInTheDocument();
  });

  it('updates title and body fields when typing', () => {
    render(<FormModal show={true} handleClose={handleClose} addPost={addPost} updatePost={updatePost} />);
    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'New Title' } });
    fireEvent.change(screen.getByLabelText('Post Body'), { target: { value: 'New Body' } });
    expect(screen.getByDisplayValue('New Title')).toBeInTheDocument();
    expect(screen.getByDisplayValue('New Body')).toBeInTheDocument();
  });

  it('calls addPost when save button clicked for new post', () => {
    render(<FormModal show={true} handleClose={handleClose} addPost={addPost} updatePost={updatePost} />);
    fireEvent.click(screen.getByText('Add Post'));
    expect(addPost).toHaveBeenCalled();
  });

  it('calls updatePost when save button clicked for existing post', () => {
    const mockPost: Post = { id: '1', title: 'Test Title', body: 'Test Body' };
    render(<FormModal show={true} handleClose={handleClose} addPost={addPost} updatePost={updatePost} post={mockPost} />);
    fireEvent.click(screen.getByText('Update'));
    expect(updatePost).toHaveBeenCalledWith(mockPost.title, mockPost.body);
  });

  it('calls handleClose when cancel button is clicked', () => {
    render(<FormModal show={true} handleClose={handleClose} addPost={addPost} updatePost={updatePost} />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(handleClose).toHaveBeenCalled();
  });

});
