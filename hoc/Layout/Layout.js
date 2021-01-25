import React, {Component} from 'react';

import Aux from '../Auxiliary/Auxilary';
import NavigationBar from '../../components/NavigationBar/NavigationBar';

import classes from './Layout.module.css';


class Layout extends Component {

    sideDrawerToggleHandler = () => {
        this.setState({
            showSideDraw: !this.state.showSideDraw
        })
    }


    componentDidUpdate() {
        //this.props.onAuthCheckState();
    }

    render(props) {

        return (
            <Aux>
                <NavigationBar authenticated={this.props.authenticated}/>

                <div className={[classes.Content, 'container'].join(' ')}>
                    {this.props.children}
                </div>
            </Aux>

         
        );
    }
}


export default Layout;