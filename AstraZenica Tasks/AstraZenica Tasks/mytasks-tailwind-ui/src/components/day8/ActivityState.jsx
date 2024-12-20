import { atom } from 'recoil';

export const activeTasksState = atom({
  key: 'activeTasksState',
  default: [],
});

export const inProgressTasksState = atom({
  key: 'inProgressTasksState',
  default: [],
});

export const completedTasksState = atom({
  key: 'completedTasksState',
  default: [],
});
