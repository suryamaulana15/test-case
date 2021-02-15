import React, {Fragment, useEffect, useState} from "react";
import {Button, Card, CardContent, Grid, TextField, Typography} from "@material-ui/core";
import * as actions from '../../../../store/actions';
import {
  AddVariant,
  ListVariant,
} from '../../components'
import {connect} from "react-redux";
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {Modal} from "../../../../components/UI";
import {addVariant} from "../../../../store/actions";
import {makeStyles} from "@material-ui/core/styles";
import { useHistory } from 'react-router-dom';

const schema = yup.object().shape({
  nama: yup.string().required(),
  deskripsi: yup.string().required(),
});

const useStyles = makeStyles(theme => ({
  contentPaddingBottom: {
    paddingBottom: theme.spacing(3)
  },
  nonTransform: {
    textDecoration: 'none'
  },
  btnWarning: {
    textTransform: 'none',
    color: '#FFFFFF',
    backgroundColor: theme.palette.warning.main,
    '&:hover': {
      backgroundColor: theme.palette.warning.dark
    }
  }
}))

const Store = props => {
  // const {onStoreUser, errors, onClearErrorUser} = props;

  const history = useHistory();

  const {varian,onClearVariant,changingVariant,onStoreProduct} = props;
  const classes = useStyles();

  useEffect(() => {
    onClearVariant()
  },[onClearVariant])

  useEffect(() => {
    closedModalDialog()
  },[changingVariant]);

  const [formState, setFormState] = useState({
    nama: '', deskripsi: ''
  });

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
    setForm(<AddVariant/>)
  }

  // console.log(errors);

  const handleChange = (event) => {
    const target = event.target.name
    event.persist()

    if(event.target.type === 'checkbox'){
      setFormState((formState) => ({
        ...formState,
        [target]: {
          value: event.target.checked
        }
      }))
    }else{
      setFormState((formState) => ({
        ...formState,
        [target]: {
          value: event.target.value
        }
      }))
    }
  }

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = data => {
    // onStoreUser(data, token)
    data.varian = varian;
    onStoreProduct(data, history);
  }

  let button = (varian.length > 0 ?
    <Button type={"submit"} variant={"contained"} color={"primary"} size={"medium"} fullWidth>Simpan</Button>
    :
    <Button variant={"contained"} size={"medium"} fullWidth disabled>Simpan</Button>
  )


  return (
    <Fragment>
      <Modal
        maxWidth={modalState.maxWidth}
        open={modalState.open}
        title={modalState.title}
        onCloseModal={closedModalDialog}
        contentModal={form}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardContent>
            <Grid container>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="nama"
                  label="nama"
                  inputRef={register}
                  error={!!errors.nama}
                  helperText={errors.nama && errors.nama.message}
                  className={classes.textField}
                  onChange={handleChange}
                  defaultValue={formState.nama}
                />
              </Grid>

              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="deskripsi"
                  label="deskripsi"
                  inputRef={register}
                  error={!!errors.deskripsi}
                  helperText={errors.deskripsi && errors.deskripsi.message}
                  className={classes.textField}
                  onChange={handleChange}
                  defaultValue={formState.deskripsi}
                />
              </Grid>

            </Grid>
            <br/>
            <Grid container spacing={2}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Card>
                  <CardContent>
                    <Grid container justify="space-between">
                      <Grid item>
                        <Typography variant="h5">List Variant</Typography>
                      </Grid>
                      <Grid item>
                        <Button variant="contained" className={classes.btnWarning} onClick={addVariant}>
                          Tambah Variant
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardContent>
                    <ListVariant/>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <br/>
            <Grid container justify="flex-end">
              <Grid item lg={3} md={3} sm={4} xs={4}>
                {button}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </form>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    // errors: state.user.error,
    // loading: state.user.loading,
    varian: state.product.product_variant,
    changingVariant: state.product.changingVariant
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // onStoreUser: (storeData, token) => dispatch(actions.storeUser(storeData, token)),
    // onClearErrorUser: () => dispatch(actions.clearErrorUser())
    onClearVariant: () => dispatch(actions.clearVariant()),
    onStoreProduct: (storeData, history) => dispatch(actions.storeProduct(storeData, history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Store);