import api from 'services/api';

const getCitations = async (limit) => {
  return await api.get(`citations`);
};

const getCitation = async (citationId) => {
  return await api.get(`citations/${citationId}`);
};

const updateCitation = async (citation) => {
  return await api.put(`citations/${citation.id}`, citation);
};

const createCitation = async (citation) => {
  return await api.post(`citations`, citation);
};

export default { getCitations, getCitation, updateCitation, createCitation };
