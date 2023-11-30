import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
// import { emitter } from '../../utils/emitter';
import * as actions from '../../store/actions';
import { LANGUAGES } from "../../utils";
// import { constant } from 'lodash';
import ReactPaginate from 'react-paginate';

class TableManageTax extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taxsRedux: [],
            pageCount: 0,
            currentPage: this.props.currentPage,
            page: null,
        }
    }

    componentDidMount() {
        this.props.fetchTaxsRedux(this.state.currentPage);
    }

    handleDeleteTax = (user) => {
        this.props.deleteTaxRedux(user.id, this.state.page);
    }

    handleEditTax = (user) => {
        this.props.handleEditTaxFromParent(user, this.state.page);
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        //after run render => run didUpdate
        if (prevProps.taxs !== this.props.taxs) {
            let tax = this.props.taxs;
            let taxArr = tax.taxs;
            let pageCount = tax.pageCount;
            let startIndex = tax.startIndex;
            let currentPage = tax.currentPage;
            this.setState({
                taxsRedux: taxArr,
                pageCount: pageCount,
                startIndex: startIndex,
                page: currentPage
            })
        }
    }

    handlePageClick = (e) => {
        let page = e.selected + 1;
        this.props.fetchTaxsRedux(page);
    }

    render() {
        // let language = this.props.language;
        let taxs = this.state.taxsRedux;
        if (!taxs) { taxs = []; }
        let pageCount = this.state.pageCount;
        let startIndex = this.state.startIndex;
        return (
            <div className="container">
                <div className='users-table mt-4 mb-4 table-responsive'>
                    <table className='table table-bordered' id="customers">
                        <thead>
                            <tr>
                                <th></th>
                                <th><FormattedMessage id="manage-salary.startDay" /></th>
                                <th><FormattedMessage id="manage-salary.endDay" /></th>
                                <th><FormattedMessage id="manage-salary.tax" /></th>
                                <th><FormattedMessage id="manage-user.action" /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {taxs.length === 0 &&
                                <tr>
                                    <td className='text-center' colSpan={9}>
                                        <FormattedMessage id="manage-user.dataEmpty" />
                                    </td>
                                </tr>
                            }
                            {taxs.length !== 0 && taxs.map((item, index) => {
                                // console.log('check map: ', item, index)
                                return (
                                    <tr key={item.id}>
                                        <td>{startIndex + index + 1}</td>
                                        <td>{item.startDateTax}</td>
                                        <td>{item.endDateTax}</td>
                                        <td>{item.tax}</td>
                                        <td>
                                            <button className='btn-edit' value={item.id}
                                                onClick={(e) => this.handleEditTax(item)}>
                                                <i className="fas fa-pencil-alt"></i>
                                            </button>
                                            {/* <button className='btn-delete' value={item.id}
                                                onClick={(e) => {
                                                    window.confirm('Are you sure you want to delete it?',)
                                                        && this.handleDeleteTax(item)
                                                }}>
                                                <i className="fas fa-trash-alt"></i>
                                            </button> */}
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
        taxs: state.tax.taxs,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTaxsRedux: (currentPage) => dispatch(actions.fetchAllTaxsStart(currentPage)),
        deleteTaxRedux: (id, currentPage) => dispatch(actions.deleteTax(id, currentPage)),
        editTaxRedux: (user) => dispatch(actions.editTax(user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageTax);