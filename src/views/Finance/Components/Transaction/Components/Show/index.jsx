import React, {Fragment, useEffect, useState} from "react";
import {
  Card,
  CardContent,
  Grid,
  TextField,
  makeStyles,
  FormControl,
  InputLabel,
  Select, FormHelperText
} from "@material-ui/core";
import * as actions from '../../../../../../store/actions';
import {connect} from "react-redux";
import {isEmpty} from "../../../../../../shared/utility";
import {Loading} from "../../../../../../components/UI";
import NumberFormat from 'react-number-format';
import Paper from "@material-ui/core/Paper";


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
  const {finance, onGetAllAccount, allAccount, loadingAccount} = props;

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

  return (loadingAccount ? <Loading/> :
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
                        label="Finance Name"
                        variant="outlined"
                        name="title"
                        defaultValue={formState.title}
                        // onChange={handleChange}
                        fullWidth
                        disabled
                        // inputRef={register}
                        // error={!!errors.title}
                        // helperText={errors.title && errors.title.message}
                      />
                    </div>
                    <br/>

                    <div>
                      <Paper component="form" className={classes.searchSelectRoot} fullWidth>
                        <FormControl
                          // error={errors.finance_account_id && true}
                          variant="outlined" className={classes.formControl} fullWidth>
                          <InputLabel htmlFor="outlined-age-native-simple">Finance Account</InputLabel>
                          <Select
                            fullWidth
                            native
                            defaultValue={formState.finance_account_id}
                            // onChange={handleChange}
                            label="Finance Account"
                            inputProps={{
                              name: 'finance_account_id',
                              id: 'outlined-age-native-simple'
                            }}
                            name="finance_account_id"
                            disabled
                            // inputRef={register}
                          >
                            <option aria-label="None" value="" />
                            {/*<option value='62'>LINK AJA</option>*/}
                            {optionAccount}
                            {/*<option value="title">Reference</option>*/}
                          </Select>
                          {/*<FormHelperText>{errors.finance_account_id && errors.finance_account_id.message}</FormHelperText>*/}
                        </FormControl>
                      </Paper>
                    </div>
                    <br/>

                    <div>
                      <FormControl
                        // error={errors.amount ? true : false}
                        variant="outlined" className={classes.formControl} fullWidth>
                        <NumberFormat
                          style={{ padding: '18.5px 14px', width: '90%' }}
                          allowLeadingZeros={false}
                          thousandSeparator="."
                          decimalSeparator={','}
                          prefix={'Rp.'}
                          name="amount"
                          // getInputRef={register}
                          isNumericString={true}
                          defaultValue={formState.amount}
                          // onChange={handleChange}
                          placeholder="Amount"
                          disabled
                        />
                        {/*<FormHelperText>{errors.amount && errors.amount.message}</FormHelperText>*/}
                      </FormControl>
                    </div>
                    <br/>

                    <div>
                      <TextField
                        label="Description"
                        variant="outlined"
                        name="description"
                        defaultValue={formState.description}
                        // onChange={handleChange}
                        fullWidth
                        disabled
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

const mapStateToProps = state => {
  return {
    allAccount: state.account.allAccount,
    loadingAccount: state.account.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetAllAccount: () => dispatch(actions.getAllAccount())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Show);