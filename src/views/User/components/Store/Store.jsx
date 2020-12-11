import React, {Fragment, useEffect, useState} from "react";
import {Button, Card, CardContent, Grid, TextField} from "@material-ui/core";
import * as actions from '../../../../store/actions';
import {connect} from "react-redux";
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

const schema = yup.object().shape({
});

const Store = props => {
  const {onStoreUser, errors, onClearErrorUser} = props;

  useEffect(() => {
    onClearErrorUser()
  },[onClearErrorUser])

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    phone: 0,
  });

  console.log(errors);

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

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema)
  })

  const token = sessionStorage.getItem('access_token');
  const onSubmit = data => {
    onStoreUser(data, token)
  }

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardContent>
            <Grid container>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="name"
                  label="Name"
                  inputRef={register}
                  error={!!errors.name}
                  helperText={errors.name && errors.name.msg}
                  // className={classes.textField}
                  onChange={handleChange}
                  defaultValue={formState.name}
                />
              </Grid>

              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="email"
                  label="Email"
                  inputRef={register}
                  error={!!errors.email}
                  helperText={errors.email && errors.email.msg}
                  // className={classes.textField}
                  onChange={handleChange}
                  defaultValue={formState.email}
                />
              </Grid>

              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="phone"
                  label="Phone"
                  inputRef={register}
                  error={!!errors.phone}
                  helperText={errors.phone && errors.phone.msg}
                  // className={classes.textField}
                  onChange={handleChange}
                  defaultValue={formState.phone}
                />
              </Grid>

              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  type="password"
                  name="password"
                  label="Password"
                  inputRef={register}
                  error={!!errors.password}
                  helperText={errors.password && errors.password.msg}
                  // className={classes.textField}
                  onChange={handleChange}
                  defaultValue={formState.password}
                />
              </Grid>
            </Grid>
            <Grid container justify="flex-end">
              <Grid item lg={3} md={3} sm={4} xs={4}>
                <Button type={"submit"} variant={"contained"} color={"primary"} size={"medium"} fullWidth>Simpan</Button>
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
    errors: state.user.error,
    loading: state.user.loading,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onStoreUser: (storeData, token) => dispatch(actions.storeUser(storeData, token)),
    onClearErrorUser: () => dispatch(actions.clearErrorUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Store);