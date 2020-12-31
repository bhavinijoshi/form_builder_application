import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { history } from "../helpers/history";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function AppBarComponent(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link color="inherit" onClick={e => { history.push("/") }} className="cursor-pointer" >
                            Dashbaord
    ]                   </Link>
                        <Link color="inherit" >
                            {props.title}
                        </Link>

                    </Breadcrumbs>
                </Toolbar>

            </AppBar>
        </div>
    );
}
