import React,{Fragment} from "react";
import {connect} from "react-redux";
import {Card, CardContent, Grid, IconButton, TableHead, Tooltip} from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {Delete as DeleteIcon} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import * as actions from '../../../../store/actions';

const columns = [
  { id: 'nama', label: 'Nama' },
  { id: 'harga', label: 'Harga' },
  { id: 'diskon', label: 'Diskon' },
  { id: 'diskon', label: 'Ukuran' },
  { id: 'foto', label: 'Foto' },
  { id: 'aksi', label: 'Aksi'},
]

const useStyles = makeStyles(theme => ({
  btnDanger : {
    color: theme.palette.error.main,
    '&:hover': {
      color: theme.palette.error.dark
    },
  }
}))

const ListVariant = props => {
  const {
    product_variant, onDeleteVariant
  } = props;
  const classes = useStyles();

  let tableBody = '';
  if(product_variant.length > 0){
    tableBody = (
      <Fragment>
        <TableBody>
          {product_variant.map((variant, index) => (

              <TableRow key={variant.index}>
                <TableCell>
                  {variant.nama}
                </TableCell>
                <TableCell>
                  {variant.harga}
                </TableCell>
                <TableCell>
                  {variant.diskon.persentasi} %
                </TableCell>
                <TableCell>
                  {variant.ukuran}
                </TableCell>
                <TableCell>
                  {variant.preview.path}
                </TableCell>
                <TableCell>
                  <Tooltip title="Hapus Variant">
                    <IconButton aria-label="edit" onClick={() => onDeleteVariant(index)}>
                      <DeleteIcon className={classes.btnDanger}/>
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>

          ))}
        </TableBody>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Card>
            <CardContent>
              <TableContainer component={Paper}>
                <Table aria-label="custom pagination table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  {tableBody}
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    product_variant: state.product.product_variant
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDeleteVariant: (index) => dispatch(actions.deleteVariant(index))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListVariant);