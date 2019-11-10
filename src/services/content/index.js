import api from 'services/api';

let content = {};

export const getContent = async (section) => {
  if (!content[section]) {
    let data = await api.get(`content/${section}`);
    content[section] = data.attributes.text;
  }
  return content[section];
};

export const updateContent = async(section, text) => {
  let data = await api.put(`content/${section}`, {
    type: 'contents',
    id: section,
    attributes: { text }
  });
  content[section] = data.attributes.text;
  return content[section];
};