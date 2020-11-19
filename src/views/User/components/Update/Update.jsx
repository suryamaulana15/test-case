import React, {Fragment, useState} from "react";
import {Button, Card, CardContent, Grid, TextField} from "@material-ui/core";
import * as actions from '../../../../store/actions';
import {connect} from "react-redux";
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

const schema = yup.object().shape({
});

const Update = props => {
  const {user,onUpdateUser,page} = props;
  const [formState, setFormState] = useState({
    name: user.name,
  });

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

  const token = sessionStorage.getItem('access_token');
  const onSubmit = data => {
    onUpdateUser(data, user.id,token, page);
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
                  // error={!!errors.name}
                  // helperText={errors.name && errors.name.message}
                  // className={classes.textField}
                  onChange={handleChange}
                  defaultValue={formState.name}
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

const mapDispatchToProps = dispatch => {
  return {
    onUpdateUser: (storeData, id, token, page) => dispatch(actions.updateUser(storeData, id, token, page))
  }
}

export default connect(null,mapDispatchToProps)(Update);