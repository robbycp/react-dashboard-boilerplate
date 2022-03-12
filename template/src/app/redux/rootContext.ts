export enum ContextName {
  CONSTANT = 'constant',
}

const rootContext = {
  [ContextName.CONSTANT]: { nani: 'nani' }
};

export type RootContext = typeof rootContext;

export default rootContext;
