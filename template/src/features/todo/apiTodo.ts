import {createAxios, createExportedEndpoint} from 'app/lib/api';
import type {Endpoint} from 'app/types/api';

export interface Todo {
  _id: string;
  description: string;
}
export interface TodoUser {
  createdAt: string
  updatedAt: string
	name: string,
	email: string,
	age: number,
}
const initialTodo: Todo = {
  _id: '',
  description: '',
};
const initialUser: TodoUser = {
  createdAt: '',
  updatedAt: '',
	name: '',
	email: '',
	age: 0,
}
// Use instant crud api https://documenter.getpostman.com/view/8858534/SW7dX7JG#intro
const apiCrudBase = createAxios({
  baseURL: 'https://api-nodejs-todolist.herokuapp.com',
  baseHeaders: {
    tokenKeyName: 'todo',
    withBearer: true,
  }
});

export interface AxioCrud {
  todoUserRegister: Endpoint<string, {
    user: TodoUser,
    token: string,
  }>;
  todoUserLogin: Endpoint<string, {}>;
  todoUserLogout: Endpoint<{}, {}>;
  todoUserMe: Endpoint<{}, TodoUser>;
  todoTaskAdd: Endpoint<{}, {}>;
  todoTaskAllGet: Endpoint<{}, {}>;
  todoTaskByIdGet: Endpoint<{}, {}>;
  todoTaskByIdUpdate: Endpoint<{}, {}>;
  todoTaskByIdDelete: Endpoint<{}, {}>;
}

const endpoints: AxioCrud = {
  todoUserRegister: {
    method: 'post',
    path: '/user/register',
    response: {
      user: {
        ...initialUser
      },
      token: '',
    },
  },
  todoUserLogin: {
    method: 'post',
    path: '/user/login',
    response: {...initialUser},
  },
  todoUserLogout: {
    method: 'post',
    path: '/user/logout',
    response: {},
  },
  todoUserMe: {
    method: 'get',
    path: '/user/me',
    response: {...initialUser},
  },
  todoTaskAdd: {
    method: 'post',
    path: '/task',
    response: {...initialTodo},
  },
  todoTaskAllGet: {
    method: 'get',
    path: '/task',
    response: [],
  },
  todoTaskByIdGet: {
    method: 'get',
    path: '/task/:taskId',
    response: {...initialTodo},
  },
  todoTaskByIdUpdate: {
    method: 'put',
    path: '/task/:taskId',
    response: {...initialTodo},
  },
  todoTaskByIdDelete: {
    method: 'delete',
    path: '/task/:taskId',
    response: {},
  }
};

export default createExportedEndpoint(apiCrudBase, endpoints);
