import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import moment from 'moment';
// import { emitter } from '../../utils/emitter';
import * as actions from '../../store/actions';
import { LANGUAGES } from "../../utils";
// import { constant } from 'lodash';
import ReactPaginate from 'react-paginate';

class TableManageSalary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            salaryRedux: [],
            pageCount: 0,
            currentPage: this.props.currentPage,
            page: null,
        }
    }

    componentDidMount() {
        this.props.fetchSalaryRedux(this.state.currentPage);
    }

    handleDeleteSalary = (user) => {
        this.props.deleteSalaryRedux(user.id, this.state.page);
    }

    handleEditSalary = (salary) => {
        this.props.handleEditSalaryFromParent(salary, this.state.page);
    }

    handleDetailSalary = (detail) => {
        this.props.handleDetailSalaryFromParent(detail, this.state.page);
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        //after run render => run didUpdate
        if (prevProps.salary !== this.props.salary) {
            let salary = this.props.salary;
            let salaryArr = salary.salary;
            let pageCount = salary.pageCount;
            let startIndex = salary.startIndex;
            let currentPage = salary.currentPage;
            this.setState({
                salaryRedux: salaryArr,
                pageCount: pageCount,
                startIndex: startIndex,
                page: currentPage
            })
        }
    }

    handlePageClick = (e) => {
        let page = e.selected + 1;
        this.props.fetchSalaryRedux(page);
    }

    render() {
        // let language = this.props.language;
        let salary = this.state.salaryRedux;
        if (!salary) { salary = []; }
        let pageCount = this.state.pageCount;
        let startIndex = this.state.startIndex;
        let saArr = {};
        let rowSpan = salary.reduce((result, item, key) => {
            if (saArr[item.dateStart] === undefined) {
                saArr[item.dateStart] = key;
                result[key] = 1;
            } else {
                let firstIndex = saArr[item.dateStart];
                if (
                    firstIndex === key - 1 ||
                    (item.dateStart === salary[key - 1].dateStart && result[key - 1] === 0)
                ) {
                    result[firstIndex]++;
                    result[key] = 0;
                } else {
                    result[key] = 1;
                    saArr[item.dateStart] = key;
                }
            }
            return result;
        }, []);
        return (
            <div className="container">
                <div className='users-table mt-4 mb-4 table-responsive'>
                    <table className='table table-bordered' id="customers">
                        <thead>
                            <tr>
                                {/* <th></th> */}
                                <th className='size-text'>From <FormattedMessage id="manage-salary.startDay" /> To <FormattedMessage id="manage-salary.endDay" /></th>
                                {/* <th className='size-text'><FormattedMessage id="manage-salary.endDay" /></th> */}
                                <th className='size-text'><FormattedMessage id="manage-staff.staffName" /></th>
                                <th className='reStaff size-text'><FormattedMessage id="manage-salary.receivedStaff" /></th>
                                <th className='afterTax size-text'><FormattedMessage id="manage-salary.staffReceivedAfterTax" /></th>
                                <th className='byCash size-text'><FormattedMessage id="manage-salary.receivedCash" /></th>
                                <th className='reStore size-text'><FormattedMessage id="manage-salary.receivedStore" /></th>
                                <th className='size-text'><FormattedMessage id="manage-user.action" /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {salary.length === 0 &&
                                <tr>
                                    <td className='text-center' colSpan={9}>
                                        <FormattedMessage id="manage-user.dataEmpty" />
                                    </td>
                                </tr>
                            }
                            {salary.length !== 0 && salary.map((item, index) => {
                                let dateStart = moment(item.dateStart).format("MM-DD-YYYY");
                                let dateEnd = moment(item.dateEnd).format("MM-DD-YYYY");
                                return (
                                    <tr key={item.id}>
                                        {/* {rowSpan[index] > 0 && <td className={rowSpan[index] > 1 ? 'styleRow' : ''} rowSpan={rowSpan[index]}><span className={rowSpan[index] > 1 ? 'spanRow' : ''}>{startIndex + index + 1}</span></td>} */}
                                        {rowSpan[index] > 0 && <td className={rowSpan[index] > 1 ? 'styleRow' : ''} rowSpan={rowSpan[index]}><span className={rowSpan[index] > 1 ? 'spanRow' : ''}>From {dateStart} To {dateEnd}</span></td>}
                                        {/* <td>{dateEnd}</td> */}
                                        <td>{item.staffSalary.firstname} {item.staffSalary.lastname}</td>
                                        <td>{item.receivedStaff}</td>
                                        <td>{item.receivedAfterTax}</td>
                                        <td>{item.receivedByCash}</td>
                                        <td>{item.receivedStore}</td>
                                        <td>
                                            <button className='btn-detail' value={item.id}
                                                onClick={(e) => this.handleDetailSalary(item)}>
                                                <i className="fas fa-info-circle"></i>
                                            </button>
                                            <button className='btn-edit' value={item.id}
                                                onClick={(e) => this.handleEditSalary(item)}>
                                                <i className="fas fa-pencil-alt"></i>
                                            </button>
                                            <button className='btn-delete' value={item.id}
                                                onClick={(e) => {
                                                    window.confirm('Are you sure you want to delete it?',)
                                                        && this.handleDeleteSalary(item)
                                                }}>
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
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
        salary: state.salary.salary,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchSalaryRedux: (currentPage) => dispatch(actions.fetchAllSalaryStart(currentPage)),
        deleteSalaryRedux: (id, currentPage) => dispatch(actions.deleteSalary(id, currentPage)),
        editSalaryRedux: (data) => dispatch(actions.editSalary(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageSalary);