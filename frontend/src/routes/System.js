import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import StaffManage from '../containers/System/StaffManage';
import CustomerManage from '../containers/System/CustomerManage';
import ProductManage from '../containers/System/ProductManage';
import BuyProManage from '../containers/System/BuyProManage';
import ServiceManage from '../containers/System/ServiceManage';
import ThemeManage from '../containers/System/ThemeManage';
import BookingManage from '../containers/System/BookingManage';
import CallBooking from '../containers/System/CallBooking';
import UnitProManage from '../containers/System/UnitProManage';
import SalaryManage from '../containers/System/SalaryManage';
import DangKyCongViec from '../containers/System/DangKyCongViec';
import ViecSapDenHan from '../containers/System/ViecSapDenHan';
import Home from '../routes/Home';
import RestSchedule from '../containers/System/RestSchedule';

class System extends Component {
    render() {
        const { systemMenuPath } = this.props;
        return (
            <div className="system-container">
                <div className="system-list">
                    <Switch>
                        <Route path="/home" component={Home} />
                        <Route path="/system/user-manage" component={UserManage} />
                        <Route path="/system/staff-manage" component={StaffManage} />
                        <Route path="/system/rest-schedule" component={RestSchedule} />
                        <Route path="/system/customer-manage" component={CustomerManage} />
                        <Route path="/system/product-manage" component={ProductManage} />
                        <Route path="/system/buy-product-manage" component={BuyProManage} />
                        <Route path="/system/unit-manage" component={UnitProManage} />
                        <Route path="/system/service-manage" component={ServiceManage} />
                        <Route path="/system/type-manage" component={ThemeManage} />
                        <Route path="/system/order-manage" component={BookingManage} />
                        <Route path="/system/call-booking" component={CallBooking} />
                        <Route path="/system/salary-manage" component={SalaryManage} />
                        <Route path="/system/calendar-manage" component={DangKyCongViec} />
                        <Route path="/system/deadline-manage" component={ViecSapDenHan} />
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
