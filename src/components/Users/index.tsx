import * as React from 'react';
import { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import LinearProgress from '@material-ui/core/LinearProgress';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { getUsers, selectUsers } from '../../store/modules/users';
import {
  selectAverage,
  switchSelectedTask
} from '../../store/modules/tasks';

import { IFetchedUser } from '../../services/users';

import './styles.css';

export interface ISelectedUser
  extends IFetchedUser {
  isGreat: boolean;
}

export interface IUsersProps {
  isLoading: boolean;
  averageScore: string;
  users: ISelectedUser[];
  selectedTasks: {
    [key: string]: boolean;
  };
  getUsers();
  switchSelectedTask(taskId: number);
}

class Users extends Component<IUsersProps> {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    const {
      users,
      isLoading,
      selectedTasks,
      averageScore,
      switchSelectedTask
    } = this.props;

    return (
      <div className="users">
        <Card className="users-card">
          <CardHeader title="Users" />
          <CardContent className="card-content">
            {
              isLoading
                ? <LinearProgress />
                : (
                  <Fragment>
                    <List>
                      {
                        users
                          .map((user, idx) => (
                            <ListItem
                              key={user.id}
                              className="list-item"
                              divider={idx !== users.length - 1}>
                              <div className="username">
                                <Typography variant="h6">
                                  {`${user.firstName} ${user.lastName}, ${user.age} years old`}
                                </Typography>
                                {
                                  user.isGreat && (
                                    <Chip
                                      className="great-chip"
                                      color="primary"
                                      label="Great!"
                                      icon={<ThumbUpIcon />} />
                                  )
                                }
                              </div>
                              {
                                !!user.tasks.length && (
                                  <Fragment>
                                    <Typography
                                      variant="subtitle1"
                                      color="textSecondary">
                                      Task List:
                                    </Typography>
                                    <List dense>
                                      {
                                        user.tasks.map(task => (
                                          <ListItem
                                            button
                                            key={task.id}
                                            role={undefined}
                                            onClick={() => {
                                              switchSelectedTask(task.id);
                                            }}>
                                            <Checkbox
                                              disableRipple
                                              tabIndex={-1}
                                              className="checkbox"
                                              checked={!!selectedTasks[task.id]} />
                                            <ListItemText
                                              primary={
                                                `${task.title} (${Math.round(task.score * 100) / 100})`
                                              }
                                              secondary={task.description} />
                                          </ListItem>
                                        ))
                                      }
                                    </List>
                                  </Fragment>
                                )
                              }
                            </ListItem>
                          ))
                      }
                    </List>
                    <div className="average">
                      <Typography inline variant="h6" color="textSecondary">
                        Average:&nbsp;
                      </Typography>
                      <Typography inline variant="h6">
                        {averageScore}
                      </Typography>
                    </div>
                  </Fragment>
                )
            }
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapState = state => ({
  users: selectUsers(state),
  isLoading: state.users.isLoading,
  selectedTasks: state.tasks.selectedMap,
  averageScore: selectAverage(state)
});

const enhance =
  connect(mapState, {
    getUsers,
    switchSelectedTask
  });

export default enhance(Users);
