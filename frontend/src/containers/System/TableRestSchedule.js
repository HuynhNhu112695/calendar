import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import moment from 'moment';
import './UserManage.scss';
// import { emitter } from '../../utils/emitter';
import * as actions from '../../store/actions';
import { LANGUAGES } from "../../utils";
// import { constant } from 'lodash';
import ReactPaginate from 'react-paginate';

class TableRestSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schedulesRedux: [],
            pageCount: 0,
            currentPage: this.props.currentPage,
            page: null,
        }
    }

    componentDidMount() {
        this.props.fetchSchedulesRedux(this.state.currentPage);
    }

    handleDeleteSchedule = (schedule) => {
        this.props.deleteScheduleRedux(schedule.id, this.state.page);
    }

    handleEditSchedule = (schedule) => {
        this.props.handleEditScheduleFromParent(schedule, this.state.page);
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        //after run render => run didUpdate
        if (prevProps.schedules !== this.props.schedules) {
            let schedule = this.props.schedules;
            let scheduleArr = schedule.schedules;
            let pageCount = schedule.pageCount;
            let startIndex = schedule.startIndex;
            let currentPage = schedule.currentPage;
            this.setState({
                schedulesRedux: scheduleArr,
                pageCount: pageCount,
                startIndex: startIndex,
                page: currentPage
            })
        }
    }

    handlePageClick = (e) => {
        let page = e.selected + 1;
        this.props.fetchSchedulesRedux(page);
    }

    render() {
        // let language = this.props.language;
        let schedules = this.state.schedulesRedux;
        if (!schedules) { schedules = []; }
        let pageCount = this.state.pageCount;
        let startIndex = this.state.startIndex;
        return (
            <div className="container">
                <div className='users-table mt-4 mb-4 table-responsive'>
                    <table className='table' id="customers">
                        <thead>
                            <tr>
                                <th></th>
                                <th><FormattedMessage id="manage-staff.staffName" /></th>
                                <th><FormattedMessage id="manage-staff.restDate" /></th>
                                {/* <th><FormattedMessage id="manage-staff.timeType" /></th> */}
                                <th><FormattedMessage id="manage-product.description" /></th>
                                <th><FormattedMessage id="manage-user.action" /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {schedules.length === 0 &&
                                <tr>
                                    <td className='text-center' colSpan={5}>
                                        <FormattedMessage id="manage-user.dataEmpty" />
                                    </td>
                                </tr>
                            }
                            {schedules.length !== 0 && schedules.map((item, index) => {
                                let day = moment(item.date).format("MM-DD-YYYY");
                                return (
                                    <tr key={item.id}>
                                        <td>{startIndex + index + 1}</td>
                                        <td>{item.staffInfo.firstname} {item.staffInfo.lastname}</td>
                                        <td>{day}</td>
                                        {/* <td>{language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn}</td> */}
                                        <td>{item.note}</td>
                                        <td>
                                            <button className='btn-edit' value={item.id}
                                                onClick={(e) => this.handleEditSchedule(item)}>
                                                <i className="fas fa-pencil-alt"></i>
                                            </button>
                                            <button className='btn-delete' value={item.id}
                                                onClick={(e) => {
                                                    window.confirm('Are you sure you want to delete it?',)
                                                        && this.handleDeleteSchedule(item)
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
        schedules: state.schedule.schedules,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchSchedulesRedux: (currentPage) => dispatch(actions.fetchAllSchedulesStart(currentPage)),
        deleteScheduleRedux: (id, currentPage) => dispatch(actions.deleteSchedule(id, currentPage)),
        editScheduleRedux: (data) => dispatch(actions.editSchedule(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableRestSchedule);