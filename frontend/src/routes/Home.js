import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from '../store/actions';
import './Home.scss';
import { countStaff } from '../services/userService';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            totalStaff: ''
        }
    }

    async componentDidMount() {
        await this.props.countCustomer("CUSTOMER", this.state.currentPage);
        await this.props.countService(this.state.currentPage);
        await this.props.countProduct(this.state.currentPage);
        await this.props.countStaff();
        // let totalStaff = await countStaff();
        // this.setState({
        //     totalStaff: totalStaff.totalStaff
        // })
    }

    render() {
        const { isLoggedIn } = this.props;
        let totalCustomer = this.props.totalCustomer;
        let totalStaff = this.props.totalStaff;
        let totalService = this.props.totalService;
        let totalProduct = this.props.totalProduct;
        let linkToRedirect = isLoggedIn ? '/' : '/login';
        return (
            <div className='container text-center'>
                <Redirect to={linkToRedirect} />
                <div className='title'><FormattedMessage id="common.titleHome" /></div>
                <div className="container">
                    <form className="row g-3">
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
                    </form>
                </div>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        totalStaff: state.user.countStaff.totalStaff,
        totalCustomer: state.user.users.totalUser,
        totalProduct: state.product.products.totalProduct,
        totalService: state.service.services.totalService,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        countStaff: () => dispatch(actions.countStaffStart()),
        countProduct: (currentPage) => dispatch(actions.fetchAllProductsStart(currentPage)),
        countCustomer: (isMenu, currentPage) => dispatch(actions.fetchAllUsersStart(isMenu, currentPage)),
        countService: (currentPage) => dispatch(actions.fetchAllServicesStart(currentPage))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
