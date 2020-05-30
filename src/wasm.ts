type ModuleType = typeof import("../wasm/pkg");

export const runWasm = (): Promise<ModuleType> => {
  return import('../wasm/pkg').then(mod => {
    return mod;
  });
};