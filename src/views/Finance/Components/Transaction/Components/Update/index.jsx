import React, {Fragment, useEffect, useState} from "react";
import {
  Card,
  CardContent,
  Grid,
  TextField,
  makeStyles,
  Button,
  FormControl,
  InputLabel,
  Select, FormHelperText
} from "@material-ui/core";
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as actions from '../../../../../../store/actions';
import {connect} from "react-redux";
import {isEmpty} from "../../../../../../shared/utility";
import {Loading} from "../../../../../../components/UI";
import NumberFormat from 'react-number-format';
import Paper from "@material-ui/core/Paper";

const schema = yup.object().shape({
  title: yup.string().required(),
  amount: yup.string().required(),
  finance_account_id: yup.string().required(),
  description: yup.string().required(),
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

const Update = props => {
  const classes = useStyles();
  const {finance, page, onUpdate, onGetAllAccount, allAccount, loadingAccount} = props;

  useEffect(() => {
    onGetAllAccount()
  },[onGetAllAccount]);

  let optionAccount = '';
  if (!isEmpty(allAccount)) {
    optionAccount = (
      <Fragment>
        {allAccount.map((account) => (
          <option key={account.id} value={account.id}>{account.name}</option>
        ))}
      </Fragment>
    )
  }

  const [formState, setFormState] = useState({
    title : finance.title,
    amount : finance.credit_amount,
    finance_account_id : finance.finance_account_id,
    description: finance.description
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
    data.amount = +(data.amount).replace(/[Rp.]/g, '');
    data.credit_amount = data.amount;
    data.debit_amount = data.amount;
    data.finance_account_id = +(formState.finance_account_id);
    onUpdate(finance.id, data, page, finance.formSearch);
    // console.log(data)
  }

  return (loadingAccount ? <Loading/> :
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
                        label="Finance Name"
                        variant="outlined"
                        name="title"
                        defaultValue={formState.title}
                        onChange={handleChange}
                        fullWidth
                        inputRef={register}
                        error={!!errors.title}
                        helperText={errors.title && errors.title.message}
                      />
                    </div>
                    <br/>

                    <div>
                      <Paper component="form" className={classes.searchSelectRoot} fullWidth>
                        <FormControl
                          error={errors.finance_account_id && true}
                          variant="outlined" className={classes.formControl} fullWidth>
                          <InputLabel htmlFor="outlined-age-native-simple">Finance Account</InputLabel>
                          <Select
                            fullWidth
                            native
                            defaultValue={formState.finance_account_id}
                            onChange={handleChange}
                            label="Finance Account"
                            inputProps={{
                              name: 'finance_account_id',
                              id: 'outlined-age-native-simple'
                            }}
                            name="finance_account_id"
                            inputRef={register}
                          >
                            <option aria-label="None" value="" />
                            {/*<option value='62'>LINK AJA</option>*/}
                            {optionAccount}
                            {/*<option value="title">Reference</option>*/}
                          </Select>
                          <FormHelperText>{errors.finance_account_id && errors.finance_account_id.message}</FormHelperText>
                        </FormControl>
                      </Paper>
                    </div>
                    <br/>

                    <div>
                      <FormControl
                        error={errors.amount ? true : false}
                        variant="outlined" className={classes.formControl} fullWidth>
                        <NumberFormat
                          style={{ padding: '18.5px 14px', width: '90%' }}
                          allowLeadingZeros={false}
                          thousandSeparator="."
                          decimalSeparator={','}
                          prefix={'Rp.'}
                          name="amount"
                          getInputRef={register}
                          isNumericString={true}
                          defaultValue={formState.amount}
                          onChange={handleChange}
                          placeholder="Amount"
                        />
                        <FormHelperText>{errors.amount && errors.amount.message}</FormHelperText>
                      </FormControl>
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
                                Update
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

const mapStateToProps = state => {
  return {
    allAccount: state.account.allAccount,
    loadingAccount: state.account.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdate: (id, storeData, page, formSearch) => dispatch(actions.updateFinance(id, storeData, page, formSearch)),
    onGetAllAccount: () => dispatch(actions.getAllAccount())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Update);