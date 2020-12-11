import React, {Fragment, useEffect, useState} from "react";

import * as actions from '../../../../store/actions';
import {connect} from "react-redux";
import {Loading} from "../../../../components/UI";
import FormUserAkses from "./FormUserAkses/FormUserAkses";

const UserAkses = props => {
  const {userId, onGetUserAkses, userAkses, loading,page} = props;
  const token = sessionStorage.getItem("access_token");

  useEffect(() => {
    onGetUserAkses(userId, token);
  },[onGetUserAkses, userId, token]);

  function isEmpty(obj) {
    for(var key in obj) {
      if(obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  const [tmpUserAkses] = useState({
    start_used_date: null,
    end_used_date: null,
    expiredable: 1,
    switch: true
  })

  let formAkses = <FormUserAkses userAkses={tmpUserAkses} userId={userId} token={token} page={page}/>;
  if(!isEmpty(userAkses)){
    formAkses = <FormUserAkses userAkses={userAkses} userId={userId} token={token} page={page}/>;
  }

  return (loading ? <Loading/>:
    <Fragment>
      {formAkses}
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    userAkses: state.user.userAkses,
    loading: state.user.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetUserAkses : (id, token) => dispatch(actions.getUserAkses(id, token)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAkses);