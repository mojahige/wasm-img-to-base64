type ModuleType = typeof import("../wasm/pkg");

export const encodeWasm = (): Promise<ModuleType> => {
  return import('../wasm/pkg').then(mod => {
    return mod;
  });
};