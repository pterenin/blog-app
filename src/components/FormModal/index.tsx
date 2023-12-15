
import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Post } from '../../Types/types';
import "./styles.scss";

interface LayoutProps {
  show: boolean;
  handleClose: () => void;
  addPost: Function;
  updatePost: Function;
  post?: Post;
}

function FormModal({ show, handleClose, addPost, updatePost, post }: LayoutProps) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("")

  useEffect(() => {
    if (!post) return;
    setTitle(post.title);
    setBody(post.body);
  }, [post]);

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }
  const changeBody = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBody(e.target.value);
  }

  const closeModal = () => {
    setTitle("");
    setBody("");
    handleClose();
  }

  const onSaveClick = () => {
    if (post) {
      updatePost(title, body);
    } else {
      addPost({ title, body });
    }
    closeModal();

  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{post ? 'Update Post' : 'New Post'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" value={title} onChange={changeTitle} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Post Body</Form.Label>
            <Form.Control as="textarea" value={body} onChange={changeBody} rows={3} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onSaveClick}>
          {post ? 'Update' : 'Add Post'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FormModal;
