import api from 'services/api';
import graphqlApi from 'services/graphqlApi';

let content = {};

export const getContent = async (section) => {
  if (!content[section]) {
    let query = `query($filter: String) {
      contents(filter: $filter) {
        id
        text
      }
    }`;
    let args = { filter: '$section == "home"' };
    let contents = (await graphqlApi.query(query, args)).contents;
    content[section] = contents[0].text;
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