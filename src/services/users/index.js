import api from 'services/api';

const getUsers = async (skip, limit) => {
  return await api.get(`users`);
};

const getUser = async (userId) => {
  return await api.get(`users/${userId}`);
};

const createUser = async (user) => {
  return await api.post(`users/${user.id}`, user);
};

const updateUser = async (user) => {
  return await api.put(`users/${user.id}`, user);
};

export default { getUsers, getUser, createUser, updateUser };
