function indexIncluded(included = []) {
  return included.reduce((index, resource) => {
    index[`${resource.type}:${resource.id}`] = resource;
    return index;
  }, {});
}

function normalizeAttributes(resource) {
  return {
    id: Number(resource.id),
    ...(resource.attributes || {})
  };
}

function normalizeRelationshipData(data, includedIndex) {
  if (Array.isArray(data)) {
    return data.map((item) => normalizeRelationshipResource(item, includedIndex));
  }

  return normalizeRelationshipResource(data, includedIndex);
}

function normalizeRelationshipResource(resource, includedIndex) {
  if (!resource) {
    return null;
  }

  const fullResource = includedIndex[`${resource.type}:${resource.id}`] || resource;
  return normalizeResource(fullResource, includedIndex);
}

function normalizeResource(resource, includedIndex) {
  if (!resource) {
    return null;
  }

  const normalized = normalizeAttributes(resource);
  const relationships = resource.relationships || {};

  for (const [name, relationship] of Object.entries(relationships)) {
    normalized[name] = normalizeRelationshipData(relationship.data, includedIndex);
  }

  return normalized;
}

export function deserializeResource(document) {
  const includedIndex = indexIncluded(document.included);

  return {
    data: Array.isArray(document.data)
      ? document.data.map((resource) => normalizeResource(resource, includedIndex))
      : normalizeResource(document.data, includedIndex),
    meta: document.meta || {},
    links: document.links || {}
  };
}

export function errorMessageFromDocument(document) {
  const errors = document?.errors;
  if (!Array.isArray(errors) || errors.length === 0) {
    return "Something went wrong";
  }

  return errors.map((error) => error.detail || error.title).filter(Boolean).join(", ");
}
