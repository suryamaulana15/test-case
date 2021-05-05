import React,{Fragment} from "react";
import { Chip, IconButton, makeStyles, TableCell, TableRow, Tooltip } from '@material-ui/core'
import {Delete, Edit as EditIcon} from '@material-ui/icons'
// import NumberFormat from 'react-number-format';
import { NavLink } from 'react-router-dom';
import palette from '../../../../../../../../theme/palette';

const useStyles = makeStyles(theme => ({
  chipError: {
    color : palette.error.main,
    border: '1px solid'+palette.error.main,
    width: 150
  },
  chipSuccess: {
    color : palette.success.main,
    border: '1px solid'+palette.success.main,
    width: 150
  },
  chipWarning: {
    color : palette.warning.main,
    border: '1px solid'+palette.warning.main,
    width: 150
  },
  chipBlur: {
    color : '#707070',
    border: '1px solid #707070',
    width: 150
  },
  chipBlue: {
    color : '#0277BD',
    border: '1px solid #0277BD',
    width: 150
  },
  chipBlack: {
    color: '#231E2E',
    border: '1px solid #231E2E',
    width: 150
  },
  btnDelete: {
    color: theme.palette.error.main,
  },
  btnEdit: {
    color: theme.palette.warning.main,
  }
}))

const TableBodyComponent = props => {
  const { account } = props
  const classes = useStyles();

  return (
    <Fragment>
      <TableRow key={account.id}>
        <TableCell>
          {account.name}
        </TableCell>
        <TableCell>
          {account.Description}
        </TableCell>
        <TableCell>
          {account.type}
        </TableCell>
        <TableCell>
          <Tooltip title="Edit Account">
            <IconButton aria-label="edit" onClick={props.edited}>
              <EditIcon className={classes.btnEdit}/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Account">
            <IconButton aria-label="Delete Account" onClick={props.deleted}>
              <Delete className={classes.btnDelete} />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
    </Fragment>
  )
};

export default TableBodyComponent;