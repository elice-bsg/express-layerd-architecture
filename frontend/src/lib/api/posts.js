import client from './client';

export const writePost = ({ title, body }) =>
  client.post('/api/posts', { title, body });

export const readPost = (id) => client.get(`/api/posts/${id}`);

export const listPosts = ({ page, username }) => {
  return client.get(`/api/posts`, {
    params: { page, username },
  });
};

export const updatePost = ({ id, title, body }) =>
  client.patch(`/api/posts/${id}`, {
    title,
    body,
  });

export const removePost = (id) => client.delete(`/api/posts/${id}`);
