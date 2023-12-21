import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from '../store/actions';
import './Home.scss';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            totalStaff: ''
        }
    }

    async componentDidMount() {
    }

    render() {
        const { isLoggedIn } = this.props;
        let linkToRedirect = isLoggedIn ? '/' : '/login';
        return (
            <div className='container text-center'>
                <Redirect to={linkToRedirect} />
                <div className='title'><FormattedMessage id="common.titleHome" /></div>
                <div className="container">

                    {/* <form className="row g-3">
                        <div className="col-lg-3 col-md-3 col-xs-auto statistic">
                            <label className="form-label text-title">
                                <i className='icon fas fa-user-alt'></i>
                                <FormattedMessage id="menu.admin.manage-staff.header" />
                            </label>
                            <span className='form-control-sta'>{totalStaff}</span>
                        </div>
                        <div className="col-lg-3 col-md-3 col-xs-auto statistic">
                            <label className="form-label text-title">
                                <i className='icon fas fa-user-alt'></i>
                                <FormattedMessage id="menu.admin.manage-customer.header" />
                            </label>
                            <span className='form-control-sta'>{totalCustomer}</span>
                        </div>
                        <div className="col-lg-3 col-md-3 col-xs-auto statistic">
                            <label className="form-label text-title">
                                <i className='icon fas fa-bars'></i>
                                <FormattedMessage id="menu.admin.manage-service.header" />
                            </label>
                            <span className='form-control-sta'>{totalService}</span>
                        </div>
                        <div className="col-lg-3 col-md-3 col-xs-auto statistic">
                            <label className="form-label text-title">
                                <i className='icon fab fa-product-hunt' aria-hidden="true"></i>
                                <FormattedMessage id="menu.admin.manage-product.header" />
                            </label>
                            <span className='form-control-sta'>{totalProduct}</span>
                        </div>
                    </form> */}
                </div>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
