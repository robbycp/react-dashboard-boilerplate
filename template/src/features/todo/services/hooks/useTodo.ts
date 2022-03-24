import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useSnackbar } from 'notistack';
import type { AxiosError, AxiosResponse } from 'axios';

import apiTodo from '../apiTodo';
import type {Todo} from '../apiTodo';

enum ServerStateKeysTodo {
  TodosGet = 'todos-get',
  TodoGet = 'todo-get'
}
export const useTodosGet = () => {
  return useQuery(ServerStateKeysTodo.TodosGet, () => apiTodo.todoTaskAllGet());
};
export const useTodoGetById = () => {
  return useQuery(ServerStateKeysTodo.TodoGet, () => apiTodo.todoTaskByIdGet());
};

export const useTodoAdd = () => {
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse<Todo>, AxiosError, { description : string }>(
    newTodo => {
      return apiTodo.todoTaskAdd({
        data: {
          description: newTodo.description,
        },
      });
    },
    {
      onSuccess: () => {
        enqueueSnackbar('Success create todo')
        queryClient.invalidateQueries(ServerStateKeysTodo.TodosGet);
      },
      onError: () => {
        enqueueSnackbar('Error create todo')
      },
    },
  );
};
export const useTodoUpdate = () => {
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse<{ data: Todo, success: boolean }>, AxiosError, Todo>(
    updatedTodo => {
      return apiTodo.todoTaskByIdUpdate({
        paramsUrl: {id: updatedTodo._id},
        data: {
          completed: updatedTodo.completed
        },
      });
    },
    {
      onSuccess: data => {
        enqueueSnackbar('Success update todo')
        queryClient.invalidateQueries(ServerStateKeysTodo.TodosGet);
      },
      onError: data => {
        enqueueSnackbar('Error update todo')
      },
    },
  );
};
export const useTodoDelete = () => {
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient();
  return useMutation<unknown, AxiosResponse, {id: string}>(
    todoId =>
      apiTodo.todoTaskByIdDelete({
        paramsUrl: {id: todoId},
      }),
    {
      onSuccess: (data, todoId) => {
        enqueueSnackbar('Success delete todo')
        queryClient.invalidateQueries(ServerStateKeysTodo.TodosGet);
      },
      onError: (data, todoId) => {
        enqueueSnackbar('Error update todo')
      },
    },
  );
};
