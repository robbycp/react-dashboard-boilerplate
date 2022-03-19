import apiTodo from 'features/todo/services/apiTodo'

export enum ContextNameTodo {
  API_TODO = 'api_todo',
}

const contexts = {
  [ContextNameTodo.API_TODO]: apiTodo
};

export type RootContext = typeof contexts;

export default contexts;
