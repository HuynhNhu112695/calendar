import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import moment from 'moment';
import './UserManage.scss';
// import { emitter } from '../../utils/emitter';
import * as actions from '../../store/actions';
// import { constant } from 'lodash';
import ReactPaginate from 'react-paginate';

class TableManageFinished extends Component {
    constructor(props) {
        super(props);
        this.state = {
            calendarFinished: [],
            pageCount: 0,
            page: null,
            search: '',
            currentPage: this.props.currentPage
        }
    }

    componentDidMount() {
        this.props.fetchAllFinished(this.state.currentPage, this.props.userRedux.id);
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

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        if (this.state.search !== copyState['search']) {
            let key = copyState['search'];
            let arrCalendarFind = [];
            let calendar = this.props.calendarFinished.calendar;
            calendar.filter((item) => {
                if (key && item && item.dataCalendar.noidungyeucau && item.dataCalendar.noidungyeucau.toLowerCase().includes(key)
                    || item && item.dataCalendar.nguoithuchien && item.dataCalendar.nguoithuchien.toLowerCase().includes(key)
                    || item && item.dataCalendar.chutheyeucau && item.dataCalendar.chutheyeucau.toLowerCase().includes(key)) {
                    console.log(item)
                    arrCalendarFind.push(item)
                }
            })
            if (copyState['search'] !== "") {
                copyState['calendarFinished'] = arrCalendarFind;
            } else {
                copyState['calendarFinished'] = calendar;
            }
        }
        this.setState({
            ...copyState
        });
    }

    handleDeleteCalendar = (user) => {
        this.props.deleteCalendarRedux(user.id, this.state.page);
    }

    handleEditCalendar = (user) => {
        this.props.handleEditFinishedFromParent(user, this.state.page);
    }

    handleDetailCalendar = (user) => {
        this.props.handleDetailFinishedFromParent(user, this.state.page);
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        //after run render => run didUpdate 
        if (prevProps.calendarFinished !== this.props.calendarFinished) {
            let calendarFinished = this.props.calendarFinished.calendar;
            let pageCount = this.props.calendarFinished.pageCount;
            let startIndex = this.props.calendarFinished.startIndex;
            let currentPage = this.props.calendarFinished.currentPage;
            this.setState({
                calendarFinished: calendarFinished,
                pageCount: pageCount,
                startIndex: startIndex,
                page: currentPage
            })
        }
    }

    handlePageClick = (e) => {
        let page = e.selected + 1;
        this.props.fetchAllFinished(page, this.props.userRedux.id);
    }

    render() {
        let calendarFinished = this.state.calendarFinished;
        if (!calendarFinished) { calendarFinished = []; }
        let pageCount = this.state.pageCount;
        let importArr = {};
        let rowSpanImport = calendarFinished.reduce((result, item, key) => {
            if (importArr[item.idcongviec] === undefined) {
                importArr[item.idcongviec] = key;
                result[key] = 1;
            } else {
                let firstIndex = importArr[item.idcongviec];
                if (
                    firstIndex === key - 1 ||
                    (item.idcongviec === calendarFinished[key - 1].idcongviec && result[key - 1] === 0)
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
                                <th>Chủ thể yêu cầu</th>
                                <th>Nội dung yêu cầu</th>
                                <th>Người thực hiện</th>
                                {/* <th>Nhắc trước</th> */}
                                <th>Tiến độ</th>
                                {/* <th>Chu kỳ nhắc</th> */}
                                <th>Ngày nhắc</th>
                                <th>Ngày hoàn thành</th>
                                {/* <th>Trạng thái</th> */}
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {calendarFinished.length === 0 &&
                                <tr>
                                    <td className='text-center' colSpan={9}>
                                        <FormattedMessage id="manage-user.dataEmpty" />
                                    </td>
                                </tr>
                            }
                            {calendarFinished.length !== 0 && calendarFinished.map((item, index) => {
                                let day = moment(item.ngaylap).format("DD/MM/YYYY");
                                let ngayhoanthanh = moment(item.updatedAt).format("DD/MM/YYYY");
                                return (
                                    <tr key={item.id}>
                                        {/* <td>{startIndex + index + 1}</td> */}
                                        {rowSpanImport[index] > 0 && <td className={rowSpanImport[index] > 1 ? 'styleRow' : ''} rowSpan={rowSpanImport[index]}><span className={rowSpanImport[index] > 1 ? 'spanRow' : ''}>{item.dataCalendar.chutheyeucau}</span></td>}
                                        {rowSpanImport[index] > 0 && <td className={rowSpanImport[index] > 1 ? 'styleRow' : ''} rowSpan={rowSpanImport[index]}><span className={rowSpanImport[index] > 1 ? 'spanRow' : ''}>{(item.dataCalendar.noidungyeucau.length > 30) ? item.dataCalendar.noidungyeucau.slice(0, 30 - 1) + '...' : item.dataCalendar.noidungyeucau}</span></td>}
                                        {rowSpanImport[index] > 0 && <td className={rowSpanImport[index] > 1 ? 'styleRow' : ''} rowSpan={rowSpanImport[index]}><span className={rowSpanImport[index] > 1 ? 'spanRow' : ''}>{item.dataCalendar.nguoithuchien}</span></td>}
                                        {/* {rowSpanImport[index] > 0 && <td className={rowSpanImport[index] > 1 ? 'styleRow' : ''} rowSpan={rowSpanImport[index]}><span className={rowSpanImport[index] > 1 ? 'spanRow' : ''}>{item.dataCalendar.nhactruoc}</span></td>} */}
                                        {rowSpanImport[index] > 0 && <td className={rowSpanImport[index] > 1 ? 'styleRow' : ''} rowSpan={rowSpanImport[index]}><span className={rowSpanImport[index] > 1 ? 'spanRow' : ''}>{item.trangthai === 0 ? "Đang thực hiện" : "Đã hoàn thành"}</span></td>}
                                        {/* <td>{chukylap}</td> */}
                                        <td>{day}</td>
                                        {/* <td><span className='texttrangthai'>{trangthai}</span></td> */}
                                        <td>{ngayhoanthanh}</td>
                                        <td>
                                            <button className='btn-detail' value={item.id}
                                                onClick={(e) => this.handleDetailCalendar(item)}>
                                                <i className="fas fa-info-circle"></i>
                                            </button>
                                            {/* <button className='btn-edit' value={item.id}
                                                onClick={(e) => this.handleEditCalendar(item)}>
                                                <i className="fas fa-pencil-alt"></i>
                                            </button> */}
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
        userRedux: state.user.userInfo,
        calendarFinished: state.calendar.calendarFinished,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllFinished: (currentPage, userIdCreate) => dispatch(actions.fetchAllFinishedStart(currentPage, userIdCreate)),
        deleteCalendarRedux: (id, currentPage) => dispatch(actions.deleteCalendar(id, currentPage)),
        editCalendarRedux: (user) => dispatch(actions.editCalendar(user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageFinished);