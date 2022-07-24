import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { PostContext } from "../../contexts/PostContext";

const AddPostModal = () => {
  //Context
  const { showAddPostModal, setShowAddPostModal, addPost, setShowToast } =
    useContext(PostContext);

  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    url: "",
    status: "TO LEARN",
  });
  const closeDialog = () => {
    setNewPost({ title: "", description: "", url: "", status: "TO LEARN" });
    setShowAddPostModal(false);
  };

  const { title, description, url } = newPost;
  const onChangeNewPostForm = (e) =>
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    const { success, message } = await addPost(newPost);
    setNewPost({
      title: "",
      description: "",
      url: "",
      status: "TO LEARN",
    });
    setShowAddPostModal(false);
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
  };

  return (
    <Modal show={showAddPostModal} animation={true}>
      <Modal.Header closeButton onHide={closeDialog}>
        <Modal.Title>What do you want to learn?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              required
              aria-describedby="title-help"
              value={title}
              onChange={onChangeNewPostForm}
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              placeholder="Description"
              name="description"
              row={3}
              value={description}
              onChange={onChangeNewPostForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="URL"
              name="url"
              value={url}
              onChange={onChangeNewPostForm}
            ></Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Learn It!
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddPostModal;
