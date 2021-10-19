/*  HOC for components that use PwApiService
    Just extends these components to include an instanсe of PwApiService.
*/

import React from 'react';
import { PwApiConsumer } from '../contexts/pwApiContext';

const withPwApi = (Wrapped) => {
  return (props) => {
    return (
      <PwApiConsumer>
        {(pwApi) => {
            return(
              <Wrapped {...props} pwApi={pwApi} />
            )
        }}
      </PwApiConsumer>
    )
  }
};

export default withPwApi;