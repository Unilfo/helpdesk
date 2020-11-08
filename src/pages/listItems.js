import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import Forum from '@material-ui/icons/Forum';
import {Link} from 'react-router-dom'

export const mainListItems = (
  <div>
    <ListItem button component={ Link } to="/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Главная" />
    </ListItem>
    <ListItem button component={ Link } to="/tasks">
      <ListItemIcon>
        <Forum />
      </ListItemIcon>
      <ListItemText primary="Задачи" />
    </ListItem>
    <ListItem button component={ Link } to="/employee">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Пользователи" />
    </ListItem>
    <ListItem button component={ Link } to="/reports">
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Отчеты" />
    </ListItem>
    <ListItem button component={ Link } to="/instructions">
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Инструкции" />
    </ListItem>
  </div>
);
