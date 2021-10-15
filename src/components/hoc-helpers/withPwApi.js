/*  HOC for components that use  PwApiService (<App>, <Main>, <Transaction>)
    Just extends these components to include an instanсe of PwApiService.
*/

import React from 'react';
import PwApiService from '../../services/pw-api-service';

const withPwApi = (Wrapped) => {
  const pwApi = new PwApiService();
  return (props) => {
    return(
      <Wrapped {...props} pwApi={pwApi} />
    )
  }
};

export default withPwApi;