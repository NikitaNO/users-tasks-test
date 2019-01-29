import * as R from 'ramda';
import toReducer from 'type-to-reducer';
import { createSelector } from 'reselect';
import { GET_USERS_FULFILLED } from './users';
import { action } from '../../helpers';

export const SWITCH_SELECTED_TASK = 'tasks/SWITCH_SELECTED_TASK';

const getInitial =
  R.always({
    map: {},
    selectedMap: {}
  });

const usersToTasksMap =
  R.compose(
    R.reduce((acc, task) => {
      acc[task.id] = task;

      return acc;
    }, {}),
    R.chain(R.prop('tasks'))
  );

export default toReducer({
  [GET_USERS_FULFILLED]:
    (state, { payload }) => ({
      ...state,
      map: usersToTasksMap(payload)
    }),

  [SWITCH_SELECTED_TASK]:
    (state, { payload: taskId }) =>
      R.evolve({
        selectedMap: map =>
          map[taskId]
            ? R.dissoc(taskId, map)
            : R.assoc(taskId, true, map)
      }, state),
}, getInitial());

export const switchSelectedTask = action(SWITCH_SELECTED_TASK);

export const selectAverage =
  createSelector(
    R.path(['tasks', 'map']),
    R.path(['tasks', 'selectedMap']),
    (all, selected) =>
      R.isEmpty(selected)
        ? 'N/A'
        : Math.round(R.mean(
          Object.keys(selected)
            .map(key =>
              all[key].score
            )
        ) * 100) / 100
  );
