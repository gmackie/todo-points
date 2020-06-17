import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import { Link } from "react-router-dom";

export interface MenuItemProps {
  icon: string;
  text: string;
  url: string;
}

export default function MenuItem(props: MenuItemProps) {
  const { icon, text, url } = props;

  const CustomLink = (props: any) => {
    return (<Link to={url} {...props}/>);
  };

  return (
    <ListItem button key={text} component={CustomLink}>
      <ListItemIcon><Icon>{icon}</Icon></ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  ); 
};