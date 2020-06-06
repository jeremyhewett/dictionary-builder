const constructors = {
  Author: require('./database/types/Author'),
  Citation: require('./database/types/Citation'),
  CitationDisplay: require('./database/types/CitationDisplay'),
  Content: require('./database/types/Content'),
  Entry: require('./database/types/Entry'),
  Genre: require('./database/types/Genre'),
  Headword: require('./database/types/Headword'),
  Image: require('./database/types/Image'),
  Meaning: require('./database/types/Meaning'),
  MeaningDisplay: require('./database/types/MeaningDisplay'),
  MeaningDisplayNote: require('./database/types/MeaningDisplayNote'),
  Medium: require('./database/types/Medium'),
  MediumField: require('./database/types/MediumField'),
  Reference: require('./database/types/Reference'),
  ReferenceDisplay: require('./database/types/ReferenceDisplay'),
  RelatedMeaningDisplay: require('./database/types/RelatedMeaningDisplay'),
  Role: require('./database/types/Role'),
  Source: require('./database/types/Source'),
  SourceField: require('./database/types/SourceField'),
  SourceValue: require('./database/types/SourceValue'),
  SpellingVariant: require('./database/types/SpellingVariant'),
  User: require('./database/types/User'),
  UserRole: require('./database/types/UserRole')

};

module.exports.toJsonApi = (instance) => {
  if (!instance) return instance;
  let attributes = Object.assign({}, instance);
  delete attributes.id;
  return {
    type: getTypeName(instance),
    id: instance.id,
    attributes
  }
};

module.exports.fromJsonApi = (data) => {
  let constructor = getConstructor(data.type);
  return new constructor(Object.assign({ id: data.id }, data.attributes));
};

function getTypeName(instance) {
  let name = instance.constructor.name;
  let type = `${name.charAt(0).toLowerCase() + name.slice(1)}s`;
  return type === 'entrys' ? 'entries' : type;
}

function getConstructor(typeName) {
  let constructorName = (typeName.charAt(0).toUpperCase() + typeName.slice(1, typeName.length - 1));
  constructorName = constructorName === 'Entrie' ? 'Entry' : type;
  return constructors[constructorName];
}
