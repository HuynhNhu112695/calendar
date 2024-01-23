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

class TableManageCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            calendarRedux: [],
            pageCount: 0,
            page: null,
            dateSearch: '',
            search: '',
            currentPage: this.props.currentPage
        }
    }

    componentDidMount() {
        this.props.fetchCalendarRedux(this.state.currentPage, this.props.userRedux.id);
    }

    setChuKyLap = async (chukylap) => {
        switch (chukylap) {
            case "0": await "Một lần"; break;
            case "1": await "Mỗi tháng"; break;
            case "2": await "Sáu tháng"; break;
            case "3": await "Chín tháng"; break;
            case "4": await "Quý I"; break;
            case "5": await "Quý II"; break;
            case "6": await "Quý III"; break;
            case "7": await "Quý IV"; break;
            case "8": await "Mỗi năm"; break;
        }
    }

    handleOnChangeInput = async (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        // if (this.state.search !== copyState['search']) {
        //     let key = copyState['search']
        //     // console.log(key)
        //     let arrCalendarFind = [];
        //     let calendar = this.props.calendar.calendar;
        //     calendar.filter((item) => {
        //         if (key && item && item.dataCalendar.noidungyeucau && item.dataCalendar.noidungyeucau.toLowerCase().includes(key)
        //             || item && item.dataCalendar.nguoithuchien && item.dataCalendar.nguoithuchien.toLowerCase().includes(key)
        //             || item && item.dataCalendar.chutheyeucau && item.dataCalendar.chutheyeucau.toLowerCase().includes(key)) {
        //             arrCalendarFind.push(item)
        //         }
        //     })
        //     if (copyState['search'] !== "") {
        //         copyState['calendarRedux'] = arrCalendarFind;
        //     } else {
        //         copyState['calendarRedux'] = calendar;
        //     }
        // }

        this.setState({
            ...copyState
        });
        if (copyState['search'] !== this.state.search) {
            await this.props.fetchCalendarRedux(1, this.props.userRedux.id, copyState['search']);
        }
        if (copyState['dateSearch'] !== this.state.dateSearch) {
            await this.props.fetchSearchDeadline(1, this.props.userRedux.id, copyState['dateSearch']);
        }
    }

    handleDeleteCalendar = (user) => {
        this.props.deleteCalendarRedux(user.id, this.state.page, this.props.userRedux.id);
    }

    handleEditCalendar = (user) => {
        this.props.handleEditCalendarFromParent(user, this.state.page);
    }

    handleDetailCalendar = (user) => {
        this.props.handleDetailCalendarFromParent(user, this.state.page);
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        //after run render => run didUpdate 
        if (prevProps.calendar !== this.props.calendar) {
            let calendar = this.props.calendar.calendar;
            let pageCount = this.props.calendar.pageCount;
            let startIndex = this.props.calendar.startIndex;
            let currentPage = this.props.calendar.currentPage;
            this.setState({
                calendarRedux: calendar,
                pageCount: pageCount,
                startIndex: startIndex,
                page: currentPage
            })
        }
    }

    handlePageClick = (e) => {
        let page = e.selected + 1;
        let searchText = this.state?.search || '';
        this.props.fetchCalendarRedux(page, this.props.userRedux.id, searchText);
    }

    render() {
        let calendar = this.state.calendarRedux;
        if (!calendar) { calendar = []; }
        let pageCount = this.state.pageCount;
        let startIndex = this.state.startIndex;
        let importArr = {};
        let rowSpanImport = calendar.reduce((result, item, key) => {
            if (importArr[item.idcongviec] === undefined) {
                importArr[item.idcongviec] = key;
                result[key] = 1;
            } else {
                let firstIndex = importArr[item.idcongviec];
                if (
                    firstIndex === key - 1 ||
                    (item.idcongviec === calendar[key - 1].idcongviec && result[key - 1] === 0)
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
                    <div className='col-lg-8 col-md-8 col-xs-auto text-search'>
                        <FormattedMessage id="manage-order.dateWork" />
                    </div>
                    <div className='col-lg-4 col-md-4 col-xs-auto search'>
                        <input
                            type="date"
                            className="form-control"
                            name="dateSearch"
                            value={this.state.dateSearch}
                            onChange={(event) => { this.handleOnChangeInput(event, "dateSearch") }}
                        />
                    </div>
                </form>
                <div className='users-table mt-4 mb-4 table-responsive'>
                    <table className='table table-bordered' id="customers">
                        <thead>
                            <tr>
                                {/* <th></th> */}
                                <th>Đơn vị yêu cầu</th>
                                <th>Nội dung yêu cầu</th>
                                <th>Người thực hiện</th>
                                {/* <th>Độ ưu tiên</th> */}
                                <th>Tiến độ</th>
                                <th>Trạng thái</th>
                                {/* <th>Chu kỳ nhắc</th> */}
                                <th>Ngày nhắc</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {calendar.length === 0 &&
                                <tr>
                                    <td className='text-center' colSpan={9}>
                                        <FormattedMessage id="manage-user.dataEmpty" />
                                    </td>
                                </tr>
                            }
                            {calendar.length !== 0 && calendar.map((item, index) => {
                                let day = moment(item.ngaylap).format("DD/MM/YYYY");
                                let dayNow = "";
                                let monthNow = "";
                                let getDateNow = new Date();
                                if (getDateNow.getDate() < 10) {
                                    dayNow = "0" + getDateNow.getDate();
                                } else {
                                    dayNow = getDateNow.getDate();
                                }
                                if ((getDateNow.getMonth() + 1) < 10) {
                                    monthNow = "0" + (getDateNow.getMonth() + 1);
                                } else {
                                    monthNow = (getDateNow.getMonth() + 1);
                                }
                                let dateNow = getDateNow.getFullYear() + '-' + monthNow + '-' + dayNow;
                                let updated = new Date(item.updatedAt);
                                let updatedAt = updated.getTime();
                                let setNow = new Date(dateNow);
                                let setNgaylap = new Date(item.ngaylap);
                                let ms1 = setNow.getTime();
                                let ms2 = setNgaylap.getTime();
                                let trangthai = "";
                                if (dateNow < item.ngaylap && item.trangthai === 0) {
                                    let ngayconlai = 0;
                                    ngayconlai = Math.ceil((ms2 - ms1) / (24 * 60 * 60 * 1000));
                                    trangthai = "Còn " + ngayconlai + " ngày nữa đến hạn";
                                } else if (item.ngaylap === dateNow && item.trangthai === 0) {
                                    trangthai = "Đã đến ngày hết hạn";
                                } else if (item.trangthai === 1 && updatedAt <= ms2) {
                                    trangthai = "Đã hoàn thành";
                                } else {
                                    trangthai = "Trễ hạn";
                                }
                                return (
                                    <tr key={item.id}>
                                        {/* <td>{startIndex + index + 1}</td> */}
                                        <td>{item.dataCalendar.chutheyeucau}</td>
                                        <td>{(item.dataCalendar.noidungyeucau.length > 30) ? item.dataCalendar.noidungyeucau.slice(0, 30 - 1) + '...' : item.dataCalendar.noidungyeucau}</td>
                                        <td>{item.dataCalendar.nguoithuchien}</td>
                                        {/* <td>{item.dataCalendar.douutien === 0 ? "Thông thường" : "Quan trọng"}</td> */}
                                        <td><span className={item.trangthai === 0 ? "" : "style-finish"}>{item.trangthai === 0 ? "Đang thực hiện" : "Đã hoàn thành"}</span></td>
                                        <td><span className={trangthai === "Đã đến ngày hết hạn" ? "style-deadline" : trangthai === "Đã hoàn thành" ? "style-finish" : trangthai === "Trễ hạn" ? "style-late" : "style-normal"}>{trangthai}</span></td>
                                        <td>{day}</td>
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
        language: state.app.language,
        userRedux: state.user.userInfo,
        calendar: state.calendar.calendar,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchCalendarRedux: (currentPage, userIdCreate, searchText) => dispatch(actions.fetchAllCalendarStart(currentPage, userIdCreate, searchText)),
        fetchSearchDeadline: (currentPage, userIdCreate, searchText) => dispatch(actions.fetchSearchDeadlineStart(currentPage, userIdCreate, searchText)),
        deleteCalendarRedux: (id, currentPage) => dispatch(actions.deleteCalendar(id, currentPage)),
        editCalendarRedux: (user) => dispatch(actions.editCalendar(user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageCalendar);