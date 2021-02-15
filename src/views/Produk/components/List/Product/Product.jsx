import React,{Fragment} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {IconButton, TableCell, TableRow, Tooltip} from "@material-ui/core";
import {Edit as EditIcon, Delete as DeleteIcon, Search as ShowIcon} from "@material-ui/icons";
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles(theme=>({
  btnShow: {
    color: theme.palette.success.main
  },
  btnEdit: {
    color: theme.palette.warning.main
  },
  btnDelete: {
    color: theme.palette.error.main
  }
}))

const Product = props => {
  const classes = useStyles();
  const {product,index,from} = props;
  console.log(props);
  return (
    <Fragment>
      <TableRow key={product.id}>
        <TableCell>
          {index+from}
        </TableCell>
        <TableCell>
          {product.nama}
        </TableCell>
        <TableCell>
          {product.deskripsi}
        </TableCell>
        <TableCell align={"center"}>
          <NavLink to={"produk/" +product.id} >
          <Tooltip title="Show Produk">
            <IconButton aria-label="edit" onClick={props.detailed}>
              <ShowIcon className={classes.btnShow}/>
            </IconButton>
          </Tooltip>
          </NavLink>
          <NavLink to={"produk/" +product.id+ "/edit"} >
          <Tooltip title="Edit Produk">
            <IconButton aria-label="edit" onClick={props.edited}>
              <EditIcon className={classes.btnEdit}/>
            </IconButton>
          </Tooltip>
          </NavLink>
          <Tooltip title="Delete Produk">
            <IconButton aria-label="user-akses" onClick={props.deleted}>
              <DeleteIcon className={classes.btnDelete}/>
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

export default Product;