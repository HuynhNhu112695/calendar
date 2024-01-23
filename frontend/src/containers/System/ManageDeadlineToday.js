import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import moment from 'moment';
import './UserManage.scss';
// import { emitter } from '../../utils/emitter';
import * as actions from '../../store/actions';
// import { constant } from 'lodash';
import ReactPaginate from 'react-paginate';

class ManageDeadlineToday extends Component {
    constructor(props) {
        super(props);
        this.state = {
            calendarDead: [],
            pageCount: 0,
            page: null,
            search: '',
            currentPage: this.props.currentPage
        }
    }

    componentDidMount() {
        if (this.props.isLoggedIn) {
            this.props.fetchDeadlineToday(this.state.currentPage, this.props.userRedux.id, "");
        }
    }

    handleOnChangeInput = async (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
        if (copyState['search'] !== this.state.search) {
            await this.props.fetchDeadlineToday(1, this.props.userRedux.id, copyState['search']);
        }
        if (copyState['dateSearch'] !== this.state.dateSearch) {
            await this.props.fetchSearchDeadline(1, this.props.userRedux.id, copyState['dateSearch']);
        }
    }

    handleDeleteCalendar = (user) => {
        this.props.deleteCalendarRedux(user.id, this.state.page);
    }

    handleEditCalendar = (user) => {
        this.props.handleEditDeadlineFromParent(user, this.state.page);
    }

    handleDetailCalendar = (user) => {
        this.props.handleDetailDeadlineFromParent(user, this.state.page);
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        //after run render => run didUpdate 
        if (prevProps.calendarDead !== this.props.calendarDead) {
            let calendarDead = this.props.calendarDead.calendar;
            let pageCount = this.props.calendarDead.pageCount;
            let startIndex = this.props.calendarDead.startIndex;
            let currentPage = this.props.calendarDead.currentPage;
            this.setState({
                calendarDead: calendarDead,
                pageCount: pageCount,
                startIndex: startIndex,
                page: currentPage
            })
        }
    }

    handlePageClick = (e) => {
        let page = e.selected + 1;
        let searchText = this.state?.search || '';
        this.props.fetchAllDeadline(page, this.props.userRedux.id, searchText);
    }

    render() {
        let calendarDead = this.state.calendarDead;
        if (!calendarDead) { calendarDead = []; }
        let pageCount = this.state.pageCount;
        let startIndex = this.state.startIndex;
        let importArr = {};
        let rowSpanImport = calendarDead.reduce((result, item, key) => {
            if (importArr[item.idcongviec] === undefined) {
                importArr[item.idcongviec] = key;
                result[key] = 1;
            } else {
                let firstIndex = importArr[item.idcongviec];
                if (
                    firstIndex === key - 1 ||
                    (item.idcongviec === calendarDead[key - 1].idcongviec && result[key - 1] === 0)
                ) {
                    result[firstIndex]++;
                    result[key] = 0;
                } else {
                    result[key] = 1;
                    importArr[item.idcongviec] = key;
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
                                <th>Chủ đề công việc</th>
                                <th>Nội dung yêu cầu</th>
                                <th>Người thực hiện</th>
                                <th>Ngày nhắc</th>
                                <th>Trạng thái</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {calendarDead.length === 0 &&
                                <tr>
                                    <td className='text-center' colSpan={9}>
                                        <FormattedMessage id="manage-user.dataEmpty" />
                                    </td>
                                </tr>
                            }
                            {calendarDead.length !== 0 && calendarDead.map((item, index) => {
                                let day = moment(item.ngaylap).format("DD/MM/YYYY");
                                // let chukylap = "";
                                let trangthai = "";
                                if (item.ngayconlai > 0) {
                                    trangthai = "Còn " + item.ngayconlai + " ngày nữa đến hạn";
                                } else if (item.ngayconlai === 0) {
                                    trangthai = "Đã đến ngày hết hạn";
                                } else {
                                    trangthai = "Trễ hạn";
                                }
                                return (
                                    <tr key={item.id}>
                                        <td>{item.tieude}</td>
                                        <td>{(item.dataCalendar.noidungyeucau.length > 30) ? item.dataCalendar.noidungyeucau.slice(0, 30 - 1) + '...' : item.dataCalendar.noidungyeucau}</td>
                                        <td>{item.dataCalendar.nguoithuchien}</td>
                                        <td>{day}</td>
                                        <td><span className={trangthai === "Đã đến ngày hết hạn" ? "style-late" : "style-deadline"}>{trangthai}</span></td>
                                        <td>
                                            <button className='btn-detail' value={item.id}
                                                onClick={(e) => this.handleDetailCalendar(item)}>
                                                <i className="fas fa-info-circle"></i>
                                            </button>
                                            <button className='btn-edit' value={item.id}
                                                onClick={(e) => this.handleEditCalendar(item)}>
                                                <i className="fas fa-pencil-alt"></i>
                                            </button>
                                            <button className='btn-delete' value={item.id}
                                                onClick={(e) => {
                                                    window.confirm('Are you sure you want to delete it?',)
                                                        && this.handleDeleteCalendar(item)
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
        isLoggedIn: state.user.isLoggedIn,
        userRedux: state.user.userInfo,
        calendarDead: state.calendar.calendarDeadToday,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDeadlineToday: (currentPage, userIdCreate, searchText) => dispatch(actions.fetchDeadlineTodayStart(currentPage, userIdCreate, searchText)),
        fetchSearchDeadline: (currentPage, userIdCreate, searchText) => dispatch(actions.fetchSearchDeadlineStart(currentPage, userIdCreate, searchText)),
        deleteCalendarRedux: (id, currentPage) => dispatch(actions.deleteCalendar(id, currentPage)),
        editCalendarRedux: (user) => dispatch(actions.editCalendar(user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDeadlineToday);