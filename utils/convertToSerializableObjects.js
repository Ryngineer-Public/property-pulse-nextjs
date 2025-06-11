export function convertToSerializableObjects(leanDocuments) {
  for (const key of Object.keys(leanDocuments)) {
    // the toJSON below does not invoke the toJSON method but only returns the result of the method, usually used if the function is defined in the schema
    if (leanDocuments[key].toJSON && leanDocuments[key].toString) {
      // Convert ObjectId to string for JSON serialization
      leanDocuments[key] = leanDocuments[key].toString();
    }
  }
  return leanDocuments;
}
