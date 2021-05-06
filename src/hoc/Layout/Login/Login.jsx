import React from "react";
import {Grid, TextField, Typography} from "@material-ui/core";
// import Logo from '../img/login-logo.png';
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Paper
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import {yupResolver}  from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useHistory } from 'react-router-dom';

// import { addLogin } from '../../actions/login'
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

const useStyles = makeStyles((theme) => ({
	root: {
	  height: '100vh'
	},
	image: {
	  backgroundColor: '#011747',
	},
	paper: {
	  margin: theme.spacing(8, 4),
	  display: 'flex',
	  flexDirection: 'column',
		alignItems: 'center',
		padding: '30px 50px',
		fontSize: 16,
		textAlign: 'center',
	},
	avatar: {
	  marginTop: theme.spacing(8),
	},
	form: {
	  width: '100%', // Fix IE 11 issue.
	  // marginTop: 20,
	  paddingTop: 25
	},
	textField: {
	  [`& fieldset`]: {
		borderRadius: 100,
	  },
	},
	submit: {
	  margin: theme.spacing(3, 0, 2),
	  backgroundColor: '#AFE47C',
	  '&:hover': {
			backgroundColor: '#a6f55b'
	  },
	  color: '#FFFFFF',
	  borderRadius: 20
	},
	contentName: {
	  // padding: '200px 20px 0px',
	  padding: theme.spacing(25, 6)
	},
	center: {
	  color: '#FFFFFF',
	  fontSize: 50,
	  paddingBottom: 15
	},
	center2: {
	  color: '#FFFFFF',
	  fontSize: 60
	}, 
	logoClub: {
		width: 113,
		height: 'auto',
	},
	welcome: {
		fontSize: 20,
		fontWeight: 'bold',
		paddingBottom: 10,
	},
	btnForget: {
		display: 'flex',
		justifyContent: 'flex-end',
		width: '100%',
		marginBottom: 15,
	},
	footer: {
		fontSize: 14
	},
	mainContent: {
		width: '100%',
		overflow: 'hidden',
		// textAlign: 'center',
		background: 'url('+require('../../../assets/images/background.png').default+')bottom center no-repeat',
		backgroundSize: 'cover',
		/* background-attachment: fixed !important; */
		backgroundPosition: 'bottom',
		bottom: '0',
		willChange: 'transform',
	},
	signinContent: {
		height: '790px'
	},
	bgColor: {
		background: 'transparent linear-gradient(96deg, #569AD3 0%, #488CC7 100%) 0% 0% no-repeat padding-box',
		overflow: 1
	},
	headerTop: {
		margin: '40px 80px 5px auto'
	},
	leftContent: {
		padding: '120px 90px'
	},
	formHeader:{
		color: '#FFFFFF',
		opacity: '1',
		fontSize: 45,
		fontWeight: 800
	},
	formSection: {
		textAlign: 'center',
		// font: 'normal normal 300 22px/42px Lato',
		fontSize: 15,
		letterSpacing: '0px',
		color: '#FFFFFF',
		opacity: 1
	},
	floatingLabelFocusStyle: {
		color: '#FFFFFF'
	}
}))

const SignInSchema = yup.object().shape({
  username: yup.string().required("username harus diisi"),
	password: yup.string().required("Password harus diisi"),
});

const Login =  props => {
	const classes = useStyles();
	const history = useHistory();
	const { register, handleSubmit, errors } = useForm({
		resolver: yupResolver(SignInSchema)
	});
	
	const onSubmit = event => {
		// console.log(event);
		// addLogin(event, history)
		props.onAuth(event, history)
		// console.log(event);
	}

	return (
		<Grid container>
			<Grid lg={12} md={12} sm={12} xs={12}>
				<div className={classes.bgColor}>
					<main className={classes.mainContent}>
						<div className={classes.signinContent}>
							<Grid container justify={"flex-end"}>
								<Grid item>
									<div className={classes.headerTop}>
										<img src={require('../../../assets/images/logo/paperlogowhite.svg').default}/>
									</div>
								</Grid>
							</Grid>

							<Grid container spacing={2}>
								<Grid item lg={6} md={6} sm={12} xs={12}>
									<div className={classes.leftContent}>
										<div className={classes.formLogin}>
											<div>
												<Typography className={classes.formHeader} align={"center"}>
													Masuk ke Paper.id
												</Typography>
											</div>
											<br/>
											<div>
												<Typography className={classes.formSection} align={"center"}>
													Masuk dengan akun yang terdaftar di<br/> Paper.id/PayPer
												</Typography>
											</div>
											<br/>
											<div className={classes.formRoot}>
												<div>
													<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
														<TextField
															// variant="outlined"
															margin="normal"
															fullWidth
															id="username"
															label="Username"
															name="username"
															// autoComplete="username"
															autoFocus
															inputRef={register}
															error={!!errors.username}
															helperText={errors.username && errors.username.message}
															InputLabelProps={{
																className: classes.floatingLabelFocusStyle,
															}}
															// className={classes.textField}
														/>
														<TextField
															// variant="outlined"
															margin="normal"
															fullWidth
															name="password"
															label="Password"
															type="password"
															id="password"
															autoComplete="current-password"
															inputRef={register}
															error={!!errors.password}
															helperText={errors.password && errors.password.message}
															InputLabelProps={{
																className: classes.floatingLabelFocusStyle,
															}}
														/>
														<Button
															type="submit"
															fullWidth
															variant="contained"
															color="primary"
															className={classes.submit}
															>
															Sign In
														</Button>
													</form>
												</div>

												<div className={classes.btnForget}>
													<Button style={{color: '#FFFFFF'}}>
														Lupa Kata Sandi
													</Button>
												</div>
											</div>
										</div>
										{/*<Typography variant={"h1"} align={"center"} color={"secondary"}>*/}
										{/*	Masuk ke Paper.id*/}
										{/*</Typography>*/}
									</div>
								</Grid>
							</Grid>
						</div>
					</main>
				</div>
			</Grid>
			{/*<Grid item lg={12} md={12} sm={12} xs={12}>*/}
			{/*	<Grid container>*/}
			{/*		<Grid item lg={3} md={3} sm={12} xs={12} />*/}
			{/*		<Grid item lg={6} md={6} sm={12} xs={12}>*/}
			{/*			<Paper className={classes.paper}>*/}
			{/*				<div>*/}
			{/*					<img src={require('../../../assets/images/logo/club.png').default} alt="club" className={classes.logoClub} />*/}
			{/*				</div>*/}
			{/*				<div className={classes.welcome}>*/}
			{/*					Selamat Datang Kembali*/}
			{/*				</div>*/}
			{/*				<div>*/}
			{/*					Masuk ke Chat Bot Admin*/}
			{/*				</div>*/}
			{/*				<div>*/}
			{/*					<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>*/}
			{/*						<TextField*/}
			{/*							variant="outlined"*/}
			{/*							margin="normal"*/}
			{/*							fullWidth*/}
			{/*							id="username"*/}
			{/*							label="Username"*/}
			{/*							name="username"*/}
			{/*							// autoComplete="username"*/}
			{/*							autoFocus*/}
			{/*							inputRef={register}*/}
			{/*							error={!!errors.username}*/}
			{/*							helperText={errors.username && errors.username.message}*/}
			{/*							// className={classes.textField}*/}
			{/*						/>*/}
			{/*						<TextField*/}
			{/*							variant="outlined"*/}
			{/*							margin="normal"*/}
			{/*							fullWidth*/}
			{/*							name="password"*/}
			{/*							label="Password"*/}
			{/*							type="password"*/}
			{/*							id="password"*/}
			{/*							autoComplete="current-password"*/}
			{/*							inputRef={register}*/}
			{/*							error={!!errors.password}*/}
			{/*							helperText={errors.password && errors.password.message}*/}
			{/*							// className={classes.textField}*/}
			{/*						/>*/}
			{/*						<Button*/}
			{/*							type="submit"*/}
			{/*							fullWidth*/}
			{/*							variant="contained"*/}
			{/*							color="primary"*/}
			{/*							className={classes.submit}*/}
			{/*							>*/}
			{/*							Sign In*/}
			{/*						</Button>*/}
			{/*					</form>*/}
			{/*				</div>*/}

			{/*				<div className={classes.btnForget}>*/}
			{/*					<Button style={{color: '#0277BD'}}>*/}
			{/*						Lupa Kata Sandi*/}
			{/*					</Button>*/}
			{/*				</div>*/}

			{/*				<div className={classes.footer}>*/}
			{/*					© EOA Tech Team. 2020*/}
			{/*				</div>*/}
			{/*			</Paper>*/}
			{/*		</Grid>*/}
			{/*	</Grid>*/}
			{/*</Grid>*/}
		</Grid>
	);
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (storeData, history) => dispatch(actions.signIn(storeData, history)),
    // onAlert: (message, alertType) => dispatch(actions.setAlert(message, alertType))
  }
}

export default connect(null, mapDispatchToProps)(Login);