import React, {Fragment, useState} from "react";
import {Button, Card, CardContent, Grid, TextField} from "@material-ui/core";
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as actions from '../../../../store/actions';
import {connect} from "react-redux";


const schema = yup.object().shape({
});

const UpdateProfile = props => {
  const { onUpdateProfile, userData } = props;

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  })

  const token = sessionStorage.getItem('access_token');
  const onSubmit = data => {
    onUpdateProfile(data, token)
  }

  const [formState, setFormState] = useState({
    name: userData.name,
    // description: entityData.description
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
    onUpdateProfile: (storeData, token) => dispatch(actions.updateProfile(storeData, token))
  }
}

export default connect(null, mapDispatchToProps)(UpdateProfile);