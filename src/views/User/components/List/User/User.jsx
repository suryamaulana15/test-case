import React,{Fragment} from "react";
import {TableRow, TableCell, Tooltip, IconButton} from "@material-ui/core";
import { Edit as EditIcon } from '@material-ui/icons';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme=>({
  btnEdit: {
    color: theme.palette.success.main
  },
  btnWarning: {
    color: theme.palette.warning.main
  }
}))

const Produk = props => {
  const {user,index,from} = props;
  const classes = useStyles();
  return (
    <Fragment>
      <TableRow key={user.id}>
        <TableCell>
          {index+from}
        </TableCell>
        <TableCell>
          {user.name}
        </TableCell>
        <TableCell>
          {user.email}
        </TableCell>
        <TableCell>
          {user.phone}
        </TableCell>
        <TableCell align="right">
          <Tooltip title="Edit Produk">
            <IconButton aria-label="edit" onClick={props.edited}>
              <EditIcon className={classes.btnEdit}/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Produk Akses">
            <IconButton aria-label="user-akses" onClick={props.accessed}>
              <EditIcon className={classes.btnWarning}/>
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

export default Produk;