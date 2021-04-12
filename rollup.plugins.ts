export const externalModules = ['sharp', 'fs', 'path', 'worker_threads'].map(module => ({
  name: module,
  resolveId(source) {
    if (source === module) {
      return { id: module, external: true };
    }
    return null;
  },
}));
