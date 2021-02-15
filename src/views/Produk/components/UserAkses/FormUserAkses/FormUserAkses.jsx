import React, {Fragment, useState} from "react";
import moment from "moment";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid, Switch,
  TextField
} from "@material-ui/core";
import {DateTimePicker} from "@material-ui/pickers";
import * as actions from "../../../../../store/actions";
import {connect} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const useStyles = makeStyles(theme => ({
  contentBottom : {
    marginBottom: 15
  }
}))

const schema = yup.object().shape({
})

const FormAkses = props => {
  const {userAkses, onUpdateUserAkses,userId, token,page} = props;
  const classes = useStyles();

  let status = false;
  if(userAkses.expiredable === 1){
    status = true;
  }
  const [formState,setFormState] = useState({
    start_used_date: userAkses.startUsedDate,
    end_used_date: userAkses.endUsedDate,
    expiredable: userAkses.expiredable,
    switch: status
  });

  const [startUsedDate, handleStartUsedDate] = useState(moment(userAkses.startUsedDate).format());
  const [endUsedDate, handleEndUsedDate] = useState(moment(userAkses.endUsedDate).format());

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
  });

  const onSubmit = data => {
    if(data.expiredable === '1'){
      data.start_used_date = moment(startUsedDate).utc().format();
      data.end_used_date = moment(endUsedDate).utc().format();
    }
    onUpdateUserAkses(data, userId, token,page)
  }

  let formAkases = '';
  if(formState.switch === true){
    formAkases = (
      <Fragment>
        <Grid item lg={12} md={12} sm={12} xs={12} className={classes.contentBottom}>
          <TextField
            variant="standard"
            name="expiredable"
            inputRef={register}
            defaultValue={parseInt("1")}
            type="hidden"
            onChange={handleChange}
          />
          <FormControl fullWidth>
            <DateTimePicker
              label="DateTimePicker"
              inputVariant="outlined"
              value={startUsedDate}
              onChange={handleStartUsedDate}
              autoOk
              ampm={false}
              disablePast
              format="DD/MM/YYYY hh:mm:ss"
            />
          </FormControl>
        </Grid>

        <Grid item lg={12} md={12} sm={12} xs={12} className={classes.contentBottom}>
          <FormControl fullWidth>
            <DateTimePicker
              label="DateTimePicker"
              inputVariant="outlined"
              value={endUsedDate}
              onChange={handleEndUsedDate}
              autoOk
              ampm={false}
              disablePast
              format="DD/MM/YYYY hh:mm:ss"
            />
          </FormControl>
        </Grid>
      </Fragment>
    )
  }else{
    formAkases = (
      <TextField
        variant="standard"
        name="expiredable"
        inputRef={register}
        defaultValue={parseInt("0")}
        type="hidden"
        onChange={handleChange}
      />
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <Grid container>
            <Grid item lg={12} md={12} sm={12} xs={12} className={classes.contentBottom}>
              <FormControl>
                <FormLabel>Atur Periode</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formState.switch}
                        onChange={handleChange}
                        name="switch"
                      />
                    }
                    label="ya tidak"
                  />
                </FormGroup>
              </FormControl>
            </Grid>
            {formAkases}
          </Grid>
          <Grid container justify="flex-end">
            <Grid item lg={3} md={3} sm={4} xs={4}>
              <Button variant="contained" type="submit" color="primary" >Simpan</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </form>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdateUserAkses: (storeData, id, token,page) => dispatch(actions.updateUserAkses(storeData, id, token,page))
  }
}

export default connect(null,mapDispatchToProps)(FormAkses);