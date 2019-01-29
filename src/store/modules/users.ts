import * as R from 'ramda';
import toReducer from 'type-to-reducer';
import { createSelector } from 'reselect';
import { action } from '../../helpers';

export const GET_USERS = 'users/GET_USERS';
export const GET_USERS_PENDING = `${GET_USERS}_PENDING`;
export const GET_USERS_FULFILLED = `${GET_USERS}_FULFILLED`;
export const GET_USERS_REJECTED = `${GET_USERS}_REJECTED`;

const getInitial =
  R.always({
    list: [],
    selectedMap: {},
    isLoading: false
  });

export default toReducer({
  [GET_USERS]: {
    PENDING: R.mergeLeft({ isLoading: true }),

    FULFILLED: (state, { payload }) => ({
      ...state,
      isLoading: false,
      list: payload.map(R.evolve({
        tasks: R.pluck('id')
      }))
    }),

    REJECTED: R.mergeLeft({ isLoading: false })
  }
}, getInitial())

export const getUsers = action(GET_USERS_PENDING);

export const getTasksScoreMean =
  R.compose(
    R.mean,
    R.pluck('score')
  );

const isUserGreat =
  R.anyPass([
    (user, mean) =>
      user.age < 30 && mean >= 4,
    (user, mean) =>
      user.age >= 30 && mean >= 4.33
  ]);

export const selectUsers =
  createSelector(
    R.path(['users', 'list']),
    R.path(['tasks', 'map']),
    (users, tasksMap) =>
      R.map(user => {
        const tasks =
          R.map(
            R.prop(R.__, tasksMap),
            user.tasks
          );

        return {
          ...user,
          tasks,
          isGreat: isUserGreat(
            user,
            getTasksScoreMean(tasks)
          )
        };
      }, users)
  );
