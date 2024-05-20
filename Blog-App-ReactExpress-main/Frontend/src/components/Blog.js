import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  useEffect(() => {
    fetchPosts();
  }, []);
 
  const fetchPosts = async () => {
    try {
      const response=await axios.get('http://127.0.0.1:3000/posts');
      setPosts(response.data);
         } catch (error) {
      console.error(error);
    }
  };

  const handleCreatePost = async () => {
    try {
      await axios.post('http://127.0.0.1:3000/posts', { title, content });
      fetchPosts();
      setTitle('');
      setContent('');
      alert('Post created successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to create post');
    }
  };
  const handleEditPost = async (postId) => {
    try {
      const response=await axios.get(`http://127.0.0.1:3000/posts/${postId}`);
      let {title,content}=response.data;
      setTitle(title);
      setContent(content);
    } catch (error) {
      console.error(error);
      alert('Failed to edit post');
    }
  };
  const handleUpdatePost = async (postId) => {
    try {
      await axios.put(`http://127.0.0.1:3000/posts/${postId}`,{ title, content });
      fetchPosts();
      setTitle('');
      setContent('');
      alert('Post updated successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to update post');
    }
  };
  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`http://127.0.0.1:3000/posts/${postId}`);
      fetchPosts();
      alert('Post deleted successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to delete post');
    }
  };
  return (
    <div>
      <h3><center>Blog Application</center></h3> 
      <form>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} /><br></br>
      </div>
      <div className="mb-3">
        <label className="form-label">Content</label>
        <textarea className="form-control" value={content} onChange={(e) => setContent(e.target.value)}></textarea><br></br>
        <center><Button variant="primary" onClick={handleCreatePost}>Create Post</Button></center>
      </div>
      </form>
      <div>
         <CardGroup>
        {posts.map(post => (
          <div key={post.id} style={{margin:'20px'}}>
          <Card className="bg-dark text-white" style={{ width: '18rem',height:'15rem' }}>
            <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.content}</Card.Text>
            <Button style={{margin:'5px'}} variant="primary" onClick={() => handleEditPost(post.id)}>Edit</Button>
            <Button style={{margin:'5px'}} variant="primary" onClick={() => handleUpdatePost(post.id)}>Update</Button>
            <Button style={{margin:'5px'}} variant="primary" onClick={() => handleDeletePost(post.id)}>Delete</Button>
          </Card.Body>
        </Card>

</div>

     ))}
        </CardGroup>
      </div>



    </div>
  )
}
