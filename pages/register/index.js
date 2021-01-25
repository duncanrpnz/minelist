import React from 'react';
import RegisterWithRouter from '../../containers/Auth/Register/RegisterWithRouter';
import { wrapper } from "../../redux";
import { checkServerSideCookie } from "../../redux/actions/auth";
import Layout from "../../hoc/Layout/Layout";

const registerIndex = (props) => {
    return <Layout authenticated={props.token ? true : false}><RegisterWithRouter/></Layout>
};

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
  

export default registerIndex;