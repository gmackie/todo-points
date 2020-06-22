import React from 'react';
import { IconButton, Badge, Avatar, Icon } from '@material-ui/core';
import { Link } from 'react-router-dom';

interface AppBarButtonProps {
  avatarSrc?: string;
  icon?: string;
  badgeColor?: 'default' | 'error' | 'primary' | 'secondary';
  count?: number;
  maxCount?: number;
  url?: string;
  onClick?(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}

export default function AppBarButton(props: AppBarButtonProps) {
  const { avatarSrc, icon, badgeColor, count, maxCount, url, onClick} = props;
  
  const Children = React.forwardRef((props: any, ref: any) => {
    if (avatarSrc) {
      if (icon) {
        return <></>;
      }
      return <Avatar src={avatarSrc} ref={ref}/>
    }
    else if (icon) {
      return (
        <Icon fontSize="large" ref={ref}>
          {icon}
        </Icon>
      )
    }
    return <></>;
  });
  const CustomLink = React.forwardRef((props: any, ref: any) => <Link to={url} {...props} ref={ref} />);

  return (
    <>
      {url ? 
        <IconButton component={CustomLink}>
          <Badge badgeContent={count || 0} color={badgeColor} max={maxCount}>
            <Children/>
          </Badge> 
        </IconButton>
      :
        <>
          {onClick ?
            <IconButton onClick={onClick}>
              <Badge badgeContent={count || 0} color={badgeColor} max={maxCount}>
            <Children/>
              </Badge> 
            </IconButton>
          :
            <IconButton>
              <Badge badgeContent={count || 0} color={badgeColor} max={maxCount}>
            <Children/>
              </Badge> 
            </IconButton>
          }
        </>
      }
    </>
  ); 
}