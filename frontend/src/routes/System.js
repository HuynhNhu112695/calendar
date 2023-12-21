import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import DangKyCongViec from '../containers/System/DangKyCongViec';
import ViecSapDenHan from '../containers/System/ViecSapDenHan';
import ViecTreHan from '../containers/System/ViecTreHan';
import Home from '../routes/Home';

class System extends Component {
    render() {
        const { systemMenuPath } = this.props;
        return (
            <div className="system-container">
                <div className="system-list">
                    <Switch>
                        <Route path="/home" component={Home} />
                        <Route path="/system/user-manage" component={UserManage} />
                        <Route path="/system/calendar-manage" component={DangKyCongViec} />
                        <Route path="/system/deadline-manage" component={ViecSapDenHan} />
                        <Route path="/system/late-manage" component={ViecTreHan} />
                        <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
