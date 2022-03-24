import {createAxios, createExportedEndpoint} from 'app/lib/api';
import type {Endpoint} from 'app/types/api';

export interface Todo {
  _id: string;
  description: string;
  completed: boolean;
  createdAt: string;
  owner: string;
  updatedAt: string;
  __v: number;
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
  completed: false,
  createdAt: '',
  owner: '',
  updatedAt: '',
  __v: 0,
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
  todoTaskAdd: Endpoint<Pick<Todo, 'description'>, Todo>;
  todoTaskAllGet: Endpoint<{}, { data: Todo[], count: number }>;
  todoTaskByIdGet: Endpoint<{}, Todo>;
  todoTaskByIdUpdate: Endpoint<{}, { data: Todo, success: boolean }>;
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
    response: {
      count: 0,
      data: [],
    },
  },
  todoTaskByIdGet: {
    method: 'get',
    path: '/task/:id',
    response: {...initialTodo},
  },
  todoTaskByIdUpdate: {
    method: 'put',
    path: '/task/:id',
    response: {
      data: {
        ...initialTodo,
      },
      success: true,
    },
  },
  todoTaskByIdDelete: {
    method: 'delete',
    path: '/task/:id',
    response: {},
  }
};

export default createExportedEndpoint(apiCrudBase, endpoints);
