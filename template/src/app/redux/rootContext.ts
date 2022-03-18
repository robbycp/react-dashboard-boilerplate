import todoContexts from 'features/todo/redux/contexts'

export enum RootContextName {
  CONSTANT = 'constant',
}

const rootContext = {
  ...todoContexts,
  [RootContextName.CONSTANT]: { nani: 'nani' },
};

export type RootContext = typeof rootContext;

export default rootContext;
