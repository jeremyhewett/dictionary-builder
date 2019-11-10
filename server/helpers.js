const constructors = {
  Book: require('./database/types/Book'),
  Periodical: require('./database/types/Periodical'),
  Website: require('./database/types/Website'),
  Utterance: require('./database/types/Utterance'),
  Citation: require('./database/types/Citation'),
  CitationMeaningLink: require('./database/types/CitationMeaningLink'),
  Content: require('./database/types/Content'),
  Entry: require('./database/types/Entry'),
  EntryReferenceLink: require('./database/types/EntryReferenceLink'),
  Image: require('./database/types/Image'),
  Meaning: require('./database/types/Meaning'),
  MeaningEntryLink: require('./database/types/MeaningEntryLink'),
  Reference: require('./database/types/Reference'),
  Role: require('./database/types/Role'),
  UsageNote: require('./database/types/UsageNote'),
  User: require('./database/types/User'),
  UserRoleLink: require('./database/types/UserRoleLink'),
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
