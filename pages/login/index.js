import React from 'react';
import { wrapper } from "../../redux";
import { checkServerSideCookie } from "../../redux/actions/auth";

import LoginWithRouter from '../../containers/Auth/Login/LoginWithRouter';

import Layout from "../../hoc/Layout/Layout";

const login = (props) => (
       <Layout autenticated={props.token ? true : false}><LoginWithRouter/></Layout>
)

export const getServerSideProps = wrapper.getServerSideProps(
	async (context) => {
	  checkServerSideCookie(context);
	  const token = context.store.getState().token;
	  
	  return {
		props: {
		  token,
		},
	  };
	}
  );
  

  
export default login;