import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
// import { emitter } from '../../utils/emitter';
import * as actions from '../../store/actions';
import { LANGUAGES } from "../../utils";
// import { constant } from 'lodash';
import ReactPaginate from 'react-paginate';

class TableManageService extends Component {
    constructor(props) {
        super(props);
        this.state = {
            servicesRedux: [],
            pageCount: 0,
            search: '',
            currentPage: this.props.currentPage,
            page: null,
        }
    }

    componentDidMount() {
        this.props.fetchServicesRedux(this.state.currentPage);
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        if (this.state.search !== copyState['search']) {
            let key = copyState['search'];
            let arrserviceFind = [];
            let services = this.props.services.allService;
            services.filter((item) => {
                if (key && item && item.serviceName && item.serviceName.toLowerCase().includes(key)) {
                    arrserviceFind.push(item)
                }
            })
            if (copyState['search'] !== "") {
                copyState['servicesRedux'] = arrserviceFind;
            } else {
                copyState['servicesRedux'] = this.props.services.allService;
            }
        }
        this.setState({
            ...copyState
        });
    }

    handleDeleteService = (user) => {
        this.props.deleteServiceRedux(user.id, this.state.page);
    }

    handleEditService = (user) => {
        this.props.handleEditServiceFromParent(user, this.state.page);
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        //after run render => run didUpdate
        if (prevProps.services !== this.props.services) {
            let service = this.props.services;
            let serviceArr = service.listService;
            let pageCount = service.pageCount;
            let startIndex = service.startIndex;
            let currentPage = service.currentPage;
            this.setState({
                servicesRedux: serviceArr,
                pageCount: pageCount,
                startIndex: startIndex,
                page: currentPage
            })
        }
    }

    handlePageClick = (e) => {
        let page = e.selected + 1;
        this.props.fetchServicesRedux(page);
    }

    render() {
        let language = this.props.language;
        let services = this.state.servicesRedux;
        if (!services) { services = []; }
        let pageCount = this.state.pageCount;
        let startIndex = this.state.startIndex;
        let typeArr = {};
        let rowSpan = services.reduce((result, item, key) => {
            if (typeArr[item.serviceThemeId] === undefined) {
                typeArr[item.serviceThemeId] = key;
                result[key] = 1;
            } else {
                let firstIndex = typeArr[item.serviceThemeId];
                if (
                    firstIndex === key - 1 ||
                    (item.serviceThemeId === services[key - 1].serviceThemeId && result[key - 1] === 0)
                ) {
                    result[firstIndex]++;
                    result[key] = 0;
                } else {
                    result[key] = 1;
                    typeArr[item.serviceThemeId] = key;
                }
            }
            return result;
        }, []);
        return (
            <div className="container">
                <form className="row g-3">
                    <div className='col-lg-8 col-md-8 col-xs-auto text-search'>
                        <FormattedMessage id="manage-user.search" />
                    </div>
                    <div className='col-lg-4 col-md-4 col-xs-auto search'>
                        <input
                            type="text"
                            className="form-control"
                            name="search"
                            value={this.state.search}
                            onChange={(event) => { this.handleOnChangeInput(event, "search") }}
                        />
                    </div>
                </form>
                <div className='users-table mt-4 mb-4 table-responsive'>
                    <table className='table table-bordered' id="customers">
                        <thead>
                            <tr>
                                {/* <th></th> */}
                                <th><FormattedMessage id="manage-service.theme" /></th>
                                <th><FormattedMessage id="manage-service.serviceName" /></th>
                                <th><FormattedMessage id="manage-product.price" /></th>
                                <th><FormattedMessage id="manage-product.description" /></th>
                                <th><FormattedMessage id="manage-user.action" /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.length === 0 &&
                                <tr>
                                    <td className='text-center' colSpan={9}>
                                        <FormattedMessage id="manage-user.dataEmpty" />
                                    </td>
                                </tr>
                            }
                            {services.length !== 0 && services.map((it, index) => {
                                // console.log('check map: ', item, index)
                                return (
                                    <tr key={it.id}>
                                        {/* {rowSpan[index] > 0 && <td className={rowSpan[index] > 1 ? 'styleRow' : ''} rowSpan={rowSpan[index]}><span className={rowSpan[index] > 1 ? 'spanRow' : ''}>{startIndex + index + 1}</span></td>} */}
                                        {rowSpan[index] > 0 && <td className={rowSpan[index] > 1 ? 'styleRow' : ''} rowSpan={rowSpan[index]}><span className={rowSpan[index] > 1 ? 'spanRow' : ''}>{language === LANGUAGES.VI ? it.themeData.valueVi : it.themeData.valueEn}</span></td>}
                                        <td>{it.serviceName}</td>
                                        <td>{it.price}</td>
                                        <td>{it.description}</td>
                                        <td>
                                            <button className='btn-edit' value={it.id} onClick={(e) => this.handleEditService(it)}><i className="fas fa-pencil-alt"></i></button>
                                            <button className='btn-delete' value={it.id} onClick={(e) => {
                                                window.confirm('Are you sure you want to delete it?',)
                                                    && this.handleDeleteService(it)
                                            }}><i className="fas fa-trash-alt"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                    {pageCount <= 1 &&
                        <div className='mt-5'></div>
                    }
                    {pageCount > 1 &&
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel=">>"
                            onPageChange={this.handlePageClick}
                            renderOnZeroPageCount={null}
                            pageRangeDisplayed={5}
                            pageCount={pageCount}
                            previousLabel="<<"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            containerClassName="pagination"
                            activeClassName="active"
                            forcePage={parseInt(this.state.page - 1)}
                        />
                    }
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        language: state.app.language,
        services: state.service.services,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchServicesRedux: (currentPage) => dispatch(actions.fetchAllServicesStart(currentPage)),
        deleteServiceRedux: (id, currentPage) => dispatch(actions.deleteService(id, currentPage)),
        editServiceRedux: (data) => dispatch(actions.editService(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageService);