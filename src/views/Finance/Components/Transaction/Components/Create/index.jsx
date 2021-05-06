import React, {Fragment, useState} from "react";
import {Card, CardContent, Grid, TextField, makeStyles, Button} from "@material-ui/core";
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as actions from '../../../../../../store/actions';
import {connect} from "react-redux";

const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  type: yup.string().required(),
});

const useStyles = makeStyles((theme) => ({
  btnSuccess: {
    color: "#FFFFFF",
    backgroundColor: '#27AE60',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#18944c'
    },
  }
}));

const Create = props => {
  const classes = useStyles();
  const {
    onStoreAccount
  } = props;

  const [formState, setFormState] = useState({
    name : '',
    description : '',
    type : ''
  });

  const handleChange = (event) => {
    const target = event.target.name
    event.persist()

    if(event.target.type === 'checkbox'){
      setFormState((formState) => ({
        ...formState,
        [target]: event.target.checked
      }))
    }else{
      setFormState((formState) => ({
        ...formState,
        [target]: event.target.value
      }))
    }
  }

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = data => {
    onStoreAccount(data);
  }

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Grid container spacing={2}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Card>
                  <CardContent>
                    <div>
                      <TextField
                        label="Account Name"
                        variant="outlined"
                        name="name"
                        defaultValue={formState.name}
                        onChange={handleChange}
                        fullWidth
                        inputRef={register}
                        error={!!errors.name}
                        helperText={errors.name && errors.name.message}
                      />
                    </div>
                    <br/>

                    <div>
                      <TextField
                        label="Type"
                        variant="outlined"
                        name="type"
                        defaultValue={formState.type}
                        onChange={handleChange}
                        fullWidth
                        inputRef={register}
                        error={!!errors.type}
                        helperText={errors.type && errors.type.message}
                      />
                    </div>
                    <br/>

                    <div>
                      <TextField
                        label="Description"
                        variant="outlined"
                        name="description"
                        defaultValue={formState.description}
                        onChange={handleChange}
                        fullWidth
                        inputRef={register}
                        error={!!errors.description}
                        helperText={errors.description && errors.description.message}
                      />
                    </div>
                    <br/>

                    <div>
                      <Grid container spacing={2}>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                          <Grid container spacing={2}>
                            <Grid item lg={10} md={10} sm={12} xs={12}>

                            </Grid>
                            <Grid item lg={2} md={2} sm={12} xs={12}>
                              <Button type={"submit"} variant="contained" fullWidth className={classes.btnSuccess}>
                                Simpan
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </div>

                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onStoreAccount: (storeDate) => dispatch(actions.storeAccount(storeDate))
  }
}

export default connect(null, mapDispatchToProps)(Create);