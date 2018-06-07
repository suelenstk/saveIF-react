import React, {Component} from 'react';
import {Grid} from 'react-bootstrap';
import MyGroupsRoute from './MyGroupsRoute';

class MyGroups extends Component {

    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <MyGroupsRoute rota="MyGroups"
                                   user={this.props.user}/>
                </Grid>
            </div>
        );
    }
}

export default MyGroups