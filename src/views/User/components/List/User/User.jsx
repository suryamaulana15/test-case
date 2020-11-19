import React,{Fragment} from "react";
import {TableRow, TableCell, Tooltip, IconButton} from "@material-ui/core";
import { Edit as EditIcon } from '@material-ui/icons';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme=>({
  btnEdit: {
    color: theme.palette.success.main
  }
}))

const User = props => {
  const {user} = props;
  const classes = useStyles();
  return (
    <Fragment>
      <TableRow key={user.id}>
        <TableCell>
          {user.name}
        </TableCell>
        <TableCell>
          {user.email}
        </TableCell>
        <TableCell align="right">
          <Tooltip title="Edit User">
            <IconButton aria-label="edit" onClick={props.edited}>
              <EditIcon className={classes.btnEdit}/>
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

export default User;