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

class TableManageBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookingsRedux: [],
            pageCount: 0,
            currentPage: this.props.currentPage,
            page: null,
        }
    }

    componentDidMount() {
        this.props.fetchBookingsRedux(this.state.currentPage);
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        if (this.state.search !== copyState['search']) {
            let key = copyState['search'];
            let arrBookingFind = [];
            let bookings = this.props.bookings.bookings;
            bookings.filter((item) => {
                if (key && item && item.customerOrder) {
                    if (item.customerName.toLowerCase().includes(key)) {
                        arrBookingFind.push(item)
                    }
                }
            })
            if (copyState['search'] !== "") {
                copyState['bookingsRedux'] = arrBookingFind;
            } else {
                copyState['bookingsRedux'] = bookings;
            }
        }
        this.setState({
            ...copyState
        });
    }

    handleDeleteBooking = (user) => {
        this.props.deleteBookingRedux(user.id, this.state.page);
    }

    handleEditBooking = (booking) => {
        this.props.handleEditBookingFromParent(booking, this.state.page);
    }

    handleDetailBooking = (detail) => {
        this.props.handleDetailBookingFromParent(detail, this.state.page);
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        //after run render => run didUpdate
        if (prevProps.bookings !== this.props.bookings) {
            let booking = this.props.bookings;
            let bookingArr = booking.bookings;
            let pageCount = booking.pageCount;
            let startIndex = booking.startIndex;
            let currentPage = booking.currentPage;
            this.setState({
                bookingsRedux: bookingArr,
                pageCount: pageCount,
                startIndex: startIndex,
                page: currentPage
            })
        }
    }

    handlePageClick = (e) => {
        let page = e.selected + 1;
        this.props.fetchBookingsRedux(page);
    }

    render() {
        let language = this.props.language;
        let bookings = this.state.bookingsRedux;
        if (!bookings) { bookings = []; }
        let pageCount = this.state.pageCount;
        let startIndex = this.state.startIndex;
        let bookArr = {};
        let rowSpan = bookings.reduce((result, item, key) => {
            if (bookArr[item.date] === undefined) {
                bookArr[item.date] = key;
                result[key] = 1;
            } else {
                let firstIndex = bookArr[item.date];
                if (
                    firstIndex === key - 1 ||
                    (item.date === bookings[key - 1].date && result[key - 1] === 0)
                ) {
                    result[firstIndex]++;
                    result[key] = 0;
                } else {
                    result[key] = 1;
                    bookArr[item.date] = key;
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
                                <th className='widthDate'><FormattedMessage id="manage-order.dateWork" /></th>
                                <th><FormattedMessage id="manage-order.customerName" /></th>
                                <th><FormattedMessage id="manage-staff.staffName" /></th>
                                <th><FormattedMessage id="manage-service.theme" /></th>
                                <th><FormattedMessage id="manage-service.serviceName" /></th>
                                <th><FormattedMessage id="manage-order.total" /></th>
                                <th><FormattedMessage id="manage-user.action" /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.length === 0 &&
                                <tr>
                                    <td className='text-center' colSpan={8}>
                                        <FormattedMessage id="manage-user.dataEmpty" />
                                    </td>
                                </tr>
                            }
                            {bookings.length !== 0 && bookings.map((item, index) => {
                                let day = moment(item.date).format("MM-DD-YYYY");
                                return (
                                    <tr key={item.id}>
                                        {/* {rowSpan[index] > 0 && <td className={rowSpan[index] > 1 ? 'styleRow' : ''} rowSpan={rowSpan[index]}><span className={rowSpan[index] > 1 ? 'spanRow' : ''}>{startIndex + index + 1}</span></td>} */}
                                        {rowSpan[index] > 0 && <td className={rowSpan[index] > 1 ? 'styleRow' : ''} rowSpan={rowSpan[index]}><span className={rowSpan[index] > 1 ? 'spanRow' : ''}>{day}</span></td>}
                                        <td>{item.customerName ? item.customerName : "No name"}</td>
                                        <td>{item.staffOrder.firstname} {item.staffOrder.lastname}</td>
                                        <td>{language === LANGUAGES.VI ? item.themeOrder.valueVi : item.themeOrder.valueEn}</td>
                                        <td>{item.serviceOrder.serviceName}</td>
                                        <td>{item.total}</td>
                                        <td>
                                            <button className='btn-detail' value={item.id}
                                                onClick={(e) => this.handleDetailBooking(item)}>
                                                <i className="fas fa-info-circle"></i>
                                            </button>
                                            <button className='btn-edit' value={item.id}
                                                onClick={(e) => this.handleEditBooking(item)}>
                                                <i className="fas fa-pencil-alt"></i>
                                            </button>
                                            <button className='btn-delete' value={item.id}
                                                onClick={(e) => {
                                                    window.confirm('Are you sure you want to delete it?',)
                                                        && this.handleDeleteBooking(item)
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
        bookings: state.booking.bookings,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchBookingsRedux: (currentPage) => dispatch(actions.fetchAllBookingsStart(currentPage)),
        deleteBookingRedux: (id, currentPage) => dispatch(actions.deleteBooking(id, currentPage)),
        editBookingRedux: (data) => dispatch(actions.editBooking(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageBooking);