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
            typeArr: [],
            pageCount: 0,
            search: '',
            currentPage: this.props.currentPage,
            page: null,
        }
    }

    componentDidMount() {
        this.props.fetchServicesTypeRedux(this.state.currentPage);
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        if (this.state.search !== copyState['search']) {
            let key = copyState['search'];
            let arrTypeFind = [];
            let type = this.props.typeRedux.type;
            type.filter((item) => {
                if (key && item && item.valueEN.toLowerCase().includes(key)) {
                    arrTypeFind.push(item)
                }
            })
            if (copyState['search'] !== "") {
                copyState['typeArr'] = arrTypeFind;
            } else {
                copyState['typeArr'] = this.props.typeRedux.type;
            }
        }
        this.setState({
            ...copyState
        });
    }

    handleDeleteType = (user) => {
        this.props.deleteTypeRedux(user.id, 1);
    }

    handleEditType = (user) => {
        this.props.handleEditTypeFromParent(user, this.state.page);
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        //after run render => run didUpdate
        if (prevProps.typeRedux !== this.props.typeRedux) {
            let type = this.props.typeRedux.type;
            let pageCount = this.props.typeRedux.pageCount;
            let startIndex = this.props.typeRedux.startIndex;
            let currentPage = this.props.typeRedux.currentPage;
            this.setState({
                typeArr: type,
                pageCount: pageCount,
                startIndex: startIndex,
                page: currentPage
            })
        }
    }

    handlePageClick = (e) => {
        let page = e.selected + 1;
        this.props.fetchServicesTypeRedux(page);
        this.setState({
            page: page
        })
    }

    render() {
        let language = this.props.language;
        let serviceType = this.state.typeArr;
        if (!serviceType) { serviceType = []; }
        let pageCount = this.props.typeRedux.pageCount;
        let startIndex = this.props.typeRedux.startIndex;
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
                                <th></th>
                                <th><FormattedMessage id="manage-service.theme" /></th>
                                <th><FormattedMessage id="manage-user.action" /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {serviceType.length === 0 &&
                                <tr>
                                    <td className='text-center' colSpan={3}>
                                        <FormattedMessage id="manage-user.dataEmpty" />
                                    </td>
                                </tr>
                            }
                            {serviceType.length !== 0 && serviceType.map((item, index) => {
                                // console.log('check map: ', item, index)
                                return (
                                    <tr key={item.id}>
                                        <td>{startIndex + index + 1}</td>
                                        <td>{language === LANGUAGES.VI ? item.valueVI : item.valueEN}</td>
                                        <td>
                                            <button className='btn-edit' value={item.id} onClick={(e) => this.handleEditType(item)}><i className="fas fa-pencil-alt"></i></button>
                                            <button className='btn-delete' value={item.id} onClick={(e) => {
                                                window.confirm('Are you sure you want to delete it?',)
                                                    && this.handleDeleteType(item)
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
        typeRedux: state.service.serviceType,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchServicesTypeRedux: (currentPage) => dispatch(actions.fetchServicesTypeStart(currentPage)),
        deleteTypeRedux: (id, currentPage) => dispatch(actions.deleteServiceType(id, currentPage)),
        editTypeRedux: (data) => dispatch(actions.editServiceType(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageService);