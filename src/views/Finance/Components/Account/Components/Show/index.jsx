import React, {Fragment, useState} from "react";
import {Card, CardContent, Grid, TextField, makeStyles} from "@material-ui/core";

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

const Show = props => {
  const classes = useStyles();
  const {account} = props;

  const [formState, setFormState] = useState({
    name : account.name,
    description : account.Description,
    type : account.type
  });

  return (
    <Fragment>
      <form>
        <Grid container spacing={2}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Grid container spacing={2}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Card>
                  <CardContent>
                    <div>
                      <TextField
                        label="Account Name"
                        disabled
                        variant="outlined"
                        name="name"
                        defaultValue={formState.name}
                        // onChange={handleChange}
                        fullWidth
                        // inputRef={register}
                        // error={!!errors.name}
                        // helperText={errors.name && errors.name.message}
                      />
                    </div>
                    <br/>

                    <div>
                      <TextField
                        label="Type"
                        variant="outlined"
                        disabled
                        name="type"
                        defaultValue={formState.type}
                        // onChange={handleChange}
                        fullWidth
                        // inputRef={register}
                        // error={!!errors.type}
                        // helperText={errors.type && errors.type.message}
                      />
                    </div>
                    <br/>

                    <div>
                      <TextField
                        label="Description"
                        variant="outlined"
                        disabled
                        name="description"
                        defaultValue={formState.description}
                        // onChange={handleChange}
                        fullWidth
                        // inputRef={register}
                        // error={!!errors.description}
                        // helperText={errors.description && errors.description.message}
                      />
                    </div>
                    <br/>

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


export default (Show);