export const externalModules = ['sharp'].map(module => ({
  name: module,
  resolveId(source) {
    if (source === module) {
      return { id: module, external: true };
    }
    return null;
  },
}));