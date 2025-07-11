declare module "react/jsx-runtime" {
  export function jsx(type: any, props: any, key?: any): any;
  export const jsxs: typeof jsx;
  export const Fragment: any;
}
