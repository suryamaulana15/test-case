import React, {Fragment, useEffect, useState} from "react";

import {makeStyles} from "@material-ui/core/styles";
import { Loading, Modal } from "../../../../components/UI";
import * as actions from '../../../../store/actions';
import {connect} from "react-redux";
import {useParams} from 'react-router-dom';
import {CardContent, CardHeader, Card, Grid, TextField, CardMedia, Avatar, Typography, Button} from "@material-ui/core";
import clsx from "clsx";
import {AddVariant, AddVariantTable, UpdateProduct, UpdateVariantTable} from "../index";

const useStyles = makeStyles(theme=> ({
  contentPaddingBottom: {
    paddingBottom: 20,
  },
  avatarSize: {
    width: '80%',
    height: 'auto',
    margin: 'auto'
  },
  contentCenter: {
    textAlign: "center",
  },
  media: {
    height: 140,
  },
  btnWarning: {
    textTransform: 'none',
    color: '#FFFFFF',
    backgroundColor: theme.palette.warning.main,
    '&:hover': {
      backgroundColor: theme.palette.warning.dark
    }
  },
  btnDanger: {
    textTransform: 'none',
    marginTop: 5,
    color: '#FFFFFF',
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.dark
    }
  }
}))

const columns = [
  { id: 'nomor', label: 'NO' },
  { id: 'name', label: 'Nama' },
  { id: 'email', label: 'Deskripsi' },
  { id: 'action', label: 'Action', align: 'center' }
]

const Edit = props => {
  const classes = useStyles();
  // const {products, loading, onFetchProducts,changing} = props;
  const {onShowProduk, detail_product, loading,changing,onDeleteVariant} = props;
  const {id} = useParams();
  useEffect(()=> {
    // onClearUserAkses()
    closedModalDialog();
    onShowProduk(id);
  },[onShowProduk,changing]);

  const {} = props;

  function isEmpty(obj) {
    for(var key in obj) {
      if(obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  let cardVarian = '';
  if(!isEmpty(detail_product)){
    if(detail_product.varian.length > 0){
      cardVarian =
        detail_product.varian.map(varian => (
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <Card>
              <CardContent>
                <div className={classes.contentPaddingBottom}>
                  <CardMedia
                    square
                    className={classes.media}
                    image={varian.foto}
                  />
                </div>
                <div className={clsx(classes.contentPaddingBottom, classes.contentCenter)}>
                  <table>
                    <tr>
                      <td align={"right"} >Nama Varian</td>
                      <td align={"left"} >: {varian.nama}</td>
                    </tr>
                    <tr>
                      <td align={"right"}>Harga</td>
                      <td align={"left"}>: {varian.harga}</td>
                    </tr>
                    <tr>
                      <td align={"right"}>Diskon</td>
                      <td align={"left"}>: {varian.diskon.persentasi} %</td>
                    </tr>
                    <tr>
                      <td align={"right"}>Total</td>
                      <td align={"left"}>: {varian.harga - ((varian.harga*varian.diskon.persentasi)/100)}</td>
                    </tr>
                    <tr>
                      <td align={"right"}>Ukuran</td>
                      <td align={"left"}>: {varian.ukuran}</td>
                    </tr>
                  </table>
                </div>
                <div>
                  <Button variant={"contained"} className={classes.btnWarning} size={"medium"} fullWidth onClick={() => updateVariant(varian)}>Edit Varian</Button>
                  <Button variant={"contained"} className={classes.btnDanger} size={"medium"} fullWidth onClick={() => onDeleteVariant(varian.id, detail_product.id)}>Hapus Varian</Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))
    }
  }

  const [form, setForm] = useState('');

  const [modalState, setModalState] = useState({
    open: false,
    title: '',
    maxWidth: 'sm',
  });

  const closedModalDialog = () => {
    setModalState({
      maxWidth: 'sm',
      title: '',
      open: false,
    });
    setForm('');
  }

  const addVariant = () => {
    setModalState({
      open: true,
      title: 'Tambah Variant',
      maxWidth: 'sm'
    });
    setForm(<AddVariantTable id_produk={detail_product.id} closedModalDialog={closedModalDialog}/>)
  }

  const updateVariant = (varian) => {
    setModalState({
      open: true,
      title: 'Edit Variant',
      maxWidth: 'sm'
    });
    setForm(<UpdateVariantTable varian={varian} closedModalDialog={closedModalDialog}/>);
  }

  const updateProduct = (produk) => {
    setModalState({
      open: true,
      title: 'Edit Produk',
      maxWidth: 'sm'
    });
    setForm(<UpdateProduct produk={produk} closedModalDialog={closedModalDialog}/>);
  }

  return (loading ? <Loading/> :
    <Fragment>
      <Modal
        maxWidth={modalState.maxWidth}
        open={modalState.open}
        title={modalState.title}
        onCloseModal={closedModalDialog}
        contentModal={form}
      />

      <Grid container justify={"space-between"}>
        <Grid item>
          Edit Produk
        </Grid>
        <Grid item >
          <Grid container spacing={2}>
            <Grid item>
              <Button variant={"contained"} className={classes.btnWarning} onClick={() => updateProduct(detail_product)}>Edit Produk</Button>
            </Grid>
            <Grid item>
              <Button variant={"contained"} color={"primary"} onClick={() => addVariant()}>Tambah Varian</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <br/>
      <Card>
        <CardContent>
          <Grid container>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Grid container>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Grid container>
                    <Grid item lg={4} md={4} sm={6} xs={6}>
                      Nama
                    </Grid>
                    <Grid item lg={4} md={4} sm={6} xs={6}>
                      :{detail_product.nama}
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item lg={4} md={4} sm={6} xs={6}>
                      Deskripsi
                    </Grid>
                    <Grid item lg={4} md={4} sm={6} xs={6}>
                      :{detail_product.deskripsi}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} />
              </Grid>
            </Grid>
          </Grid>
          <hr/>
          Varian
          <br/><br/>
          <Grid container spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Grid container spacing={2}>
                {cardVarian}

              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.product.loading,
    changing: state.product.changing,
    detail_product: state.product.detail_product,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // onFetchProducts: (page) => dispatch(actions.fetchProducts(page)),
    // // onClearUserAkses: () => dispatch(actions.clearUserAkses()),
    onDeleteVariant: (id, id_produk) => dispatch(actions.deleteVariantData(id,id_produk)),
    onShowProduk: (id) => dispatch(actions.showProduct(id))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Edit);