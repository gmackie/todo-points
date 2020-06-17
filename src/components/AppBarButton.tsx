import React, { ReactChild } from 'react';
import { IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';

interface AppBarButtonProps {
  url?: string;
  onClick?(): void;
  children?: ReactChild;
}

export default function AppBarButton(props: AppBarButtonProps) {
  const { url, onClick, children } = props;
  
  const CustomLink = (props: any) => {
    return (<Link to={url} {...props}/>);
  };

  return (
    <>
      {url ? 
        <IconButton component={CustomLink}>
          {children}
        </IconButton>
      :
        <>
          {onClick ?
            <IconButton onClick={onClick}>
              {children}
            </IconButton>
          :
            <IconButton>
              {children}
            </IconButton>
          }
        </>
      }
    </>
  ); 
}