import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Copyright from './Copyright';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      borderTop: `1px solid ${theme.palette.divider}`,
      marginTop: theme.spacing(8),
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      [theme.breakpoints.up('sm')]: {
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
      },
    },
  })
);

interface FooterProps {
  links: FooterLink[];
}

interface FooterLink {
  title: string;
  url: string;
  subLinks?: FooterLink[];
}

export default function Footer(props: FooterProps) {
  const { links } = props;
  const classes = useStyles();
  return(
    <Container maxWidth="md" component="footer" className={classes.footer}>
      <Grid container spacing={4} justify="space-evenly">
        {links.map((link) => (
          <Grid item xs={6} sm={3} key={link.title}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              {link.title}
            </Typography>
            <ul>
              {link.subLinks && link.subLinks.map((sublink) => (
                <li key={sublink.title}>
                  <Link href={sublink.url} variant="subtitle1" color="textSecondary">
                    {sublink.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Grid>
        ))}
      </Grid>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );

}