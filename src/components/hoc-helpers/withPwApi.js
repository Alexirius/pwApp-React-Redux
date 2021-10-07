/*  HOC for components that use  PwApiService (<App>, <Main>, <Transaction>)
    Just extends these components to include an instanсe of PwApiService.

    By the way, I don't actually think that this is the best way to pass
    an instance of service to components in this case. Considering that
    these components are situated sequentially at one and the same branch
    (<App> -> <Main> -> <Transactions>), I'd better create an instance of
    PwApiService in <App> and then simply drill it as prop to <Main> and then
    to <Transactions>. Why not? IMHO, This is better then create an instance in 
    every component, at least.
      But then I desided that probably this is an efficient way to demonstrate
    my acquaintance with React-HOC pattern concept. Where else in this app?
    Silly? Maybe... :) Yeh. let it be.
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