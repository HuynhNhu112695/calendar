import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import moment from 'moment';
// import { emitter } from '../../utils/emitter';
import * as actions from '../../store/actions';
import { CRUD_ACTIONS } from "../../utils";

class CallBooking extends Component {
    /*  Life cycle
    * Run component
    * 1. Run construc -> init state
    * 2. Did mount (set state)
    * 3. Render
    * */

    constructor(props) {
        super(props);
        let obj = {
            customerName: "",
            note: "",
            peopleNumber: "",
            phonenumber: "",
            serviceName: "",
            time: ""
        }
        let t = []; let t9 = []; let t10 = [];
        let t11 = []; let t12 = []; let t13 = [];
        let t14 = []; let t15 = []; let t16 = [];
        let t17 = []; let t18 = [];
        for (let index = 0; index < 12; index++) {
            t.push(obj); t12.push(obj);
            t9.push(obj); t13.push(obj);
            t10.push(obj); t14.push(obj);
            t11.push(obj); t15.push(obj);
            t16.push(obj); t17.push(obj);
            t18.push(obj);
        }
        let dayBook = new Date();
        let month = dayBook.getMonth();
        let day = dayBook.getDate();
        if (month < 10) { month = "0" + (month + 1); }
        if (day < 10) { day = "0" + day; }
        let dateBook = dayBook.getFullYear() + "-" + month + '-' + day;
        this.state = {
            customerName: '', peopleNumber: '', phoneNumber: '', search: '',
            serviceName: '', time: '', note: '', dateAdd: '',
            t: t, t9: t9, t10: t10, t11: t11, t17, t18, dateAdd: '',
            t12: t12, t13: t13, t14: t14, t15: t15, t16: t16, dateBook: dateBook,
            disabled: false,
            userPage: 0,
            currentPage: 1,
            callBookingSearch: [],
            actions: CRUD_ACTIONS.CREATE,

        }
    }

    async componentDidMount() {
        this.props.getCallBookingOfDateRedux(this.state.dateBook);
    }

    handleCancel = () => {
        this.setState({
            customerName: '', peopleNumber: '', phoneNumber: '',
            serviceName: '', time: '', note: '', dateAdd: '',
            t: '', t9: '', t10: '', t11: '', t12: '', t13: '', t14: '',
            t15: '', t16: '', t17: '', t18: '',
            disabled: false,
            actions: CRUD_ACTIONS.CREATE
        })
    }

    handleOnChangeInput = async (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        // this.setState({
        //     ...copyState
        // });
        try {
            if (this.state.dateBook !== copyState['dateBook']) {
                if (copyState['dateBook'] !== "") {
                    this.setState({
                        dateBook: moment(copyState['dateBook']).format("YYYY-MM-DD")
                    });
                    await this.props.getCallBookingOfDateRedux(copyState['dateBook']);
                    let callBookingArr = this.props.callBookingArrRedux;
                    let obj = {
                        customerName: "",
                        note: "",
                        peopleNumber: "",
                        phonenumber: "",
                        serviceName: "",
                        time: ""
                    }
                    let t = [];
                    let t9 = [];
                    t9 = callBookingArr.t9;
                    let t10 = [];
                    t10 = callBookingArr.t10;
                    let t11 = [];
                    t11 = callBookingArr.t11;
                    let t12 = [];
                    t12 = callBookingArr.t12;
                    let t13 = [];
                    t13 = callBookingArr.t13;
                    let t14 = [];
                    t14 = callBookingArr.t14;
                    let t15 = [];
                    t15 = callBookingArr.t15;
                    let t16 = [];
                    t16 = callBookingArr.t16;
                    let t17 = [];
                    t17 = callBookingArr.t17;
                    let t18 = [];
                    t18 = callBookingArr.t18;
                    for (let index = 0; index < 12; index++) {
                        t.push("");
                    }
                    if (t9.length === 0) {
                        for (let index = 0; index < 12; index++) {
                            t9.push(obj);
                        }
                    } else {
                        let length = 12 - parseInt(t9.length);
                        for (let index = 0; index < length; index++) {
                            t9.push(obj);
                        }
                    }
                    if (t10.length === 0) {
                        for (let index = 0; index < 12; index++) {
                            t10.push(obj);
                        }
                    } else {
                        let length = 12 - parseInt(t10.length);
                        for (let index = 0; index < length; index++) {
                            t10.push(obj);
                        }
                    }
                    if (t11.length === 0) {
                        for (let index = 0; index < 12; index++) {
                            t11.push(obj);
                        }
                    } else {
                        let length = 12 - parseInt(t11.length);
                        for (let index = 0; index < length; index++) {
                            t11.push(obj);
                        }
                    }
                    if (t12.length === 0) {
                        for (let index = 0; index < 12; index++) {
                            t12.push(obj);
                        }
                    } else {
                        let length = 12 - parseInt(t12.length);
                        for (let index = 0; index < length; index++) {
                            t12.push(obj);
                        }
                    }
                    if (t13.length === 0) {
                        for (let index = 0; index < 12; index++) {
                            t13.push(obj);
                        }
                    } else {
                        let length = 12 - parseInt(t13.length);
                        for (let index = 0; index < length; index++) {
                            t13.push(obj);
                        }
                    }
                    if (t14.length === 0) {
                        for (let index = 0; index < 12; index++) {
                            t14.push(obj);
                        }
                    } else {
                        let length = 12 - parseInt(t14.length);
                        for (let index = 0; index < length; index++) {
                            t14.push(obj);
                        }
                    }
                    if (t15.length === 0) {
                        for (let index = 0; index < 12; index++) {
                            t15.push(obj);
                        }
                    } else {
                        let length = 12 - parseInt(t15.length);
                        for (let index = 0; index < length; index++) {
                            t15.push(obj);
                        }
                    }
                    if (t16.length === 0) {
                        for (let index = 0; index < 12; index++) {
                            t16.push(obj);
                        }
                    } else {
                        let length = 12 - parseInt(t16.length);
                        for (let index = 0; index < length; index++) {
                            t16.push(obj);
                        }
                    }
                    if (t17.length === 0) {
                        for (let index = 0; index < 12; index++) {
                            t17.push(obj);
                        }
                    } else {
                        let length = 12 - parseInt(t17.length);
                        for (let index = 0; index < length; index++) {
                            t17.push(obj);
                        }
                    }
                    if (t18.length === 0) {
                        for (let index = 0; index < 12; index++) {
                            t18.push(obj);
                        }
                    } else {
                        let length = 12 - parseInt(t18.length);
                        for (let index = 0; index < length; index++) {
                            t18.push(obj);
                        }
                    }
                    copyState['t9'] = t9;
                    copyState['t10'] = t10;
                    copyState['t11'] = t11;
                    copyState['t12'] = t12;
                    copyState['t13'] = t13;
                    copyState['t14'] = t14;
                    copyState['t15'] = t15;
                    copyState['t16'] = t16;
                    copyState['t17'] = t17;
                    copyState['t18'] = t18;
                }
                if (copyState['search'] !== "") {
                    let input = copyState['search'].replace(/\D/g, '');
                    input = input.substring(0, 10);
                    var size = input.length;
                    if (size == 0) {
                        input = input;
                    } else if (size < 4) {
                        input = input;
                    } else if (size < 7) {
                        input = input.substring(0, 3) + '-' + input.substring(3, 6);
                    } else {
                        input = input.substring(0, 3) + '-' + input.substring(3, 6) + '-' + input.substring(6, 10);
                    }
                    copyState['search'] = input;
                }
                if (this.state.search !== "") {
                    let key = copyState['search'];
                    let arrCallFind = [];
                    let callBookArr = [];
                    callBookArr = await this.props.callBookingArrRedux.listCallBooking;
                    callBookArr.filter((item) => {
                        if (key && item && item.phonenumber && item.phonenumber.includes(key)) {
                            arrCallFind.push(item)
                        }
                    })
                    if (copyState['search'] !== "") {
                        copyState['callBookingSearch'] = arrCallFind;
                    }
                }
                // this.setState({
                //     t9: t9, t10: t10, t11: t11,
                //     t12: t12, t13: t13, t14: t14, t18: t18,
                //     t15: t15, t16: t16, t: t, t17: t17,
                // })
            }
            if (this.state.phoneNumber !== copyState['phoneNumber']) {
                if (copyState['phoneNumber'] !== "") {
                    let input = copyState['phoneNumber'].replace(/\D/g, '');
                    input = input.substring(0, 10);
                    var size = input.length;
                    if (size == 0) {
                        input = input;
                    } else if (size < 4) {
                        input = input;
                    } else if (size < 7) {
                        input = input.substring(0, 3) + '-' + input.substring(3, 6);
                    } else {
                        input = input.substring(0, 3) + '-' + input.substring(3, 6) + '-' + input.substring(6, 10);
                    }
                    copyState['phoneNumber'] = input;
                }
            }
            if (this.state.search !== copyState['search']) {
                if (copyState['search'] !== "") {
                    let input = copyState['search'].replace(/\D/g, '');
                    input = input.substring(0, 10);
                    var size = input.length;
                    if (size == 0) {
                        input = input;
                    } else if (size < 4) {
                        input = input;
                    } else if (size < 7) {
                        input = input.substring(0, 3) + '-' + input.substring(3, 6);
                    } else {
                        input = input.substring(0, 3) + '-' + input.substring(3, 6) + '-' + input.substring(6, 10);
                    }
                    copyState['search'] = input;
                }
                let key = copyState['search'];
                let arrCallFind = [];
                let callBookArr = [];
                callBookArr = await this.props.callBookingArrRedux.listCallBooking;
                callBookArr.filter((item) => {
                    if (key && item && item.phonenumber && item.phonenumber.includes(key)) {
                        arrCallFind.push(item)
                    }
                })
                if (copyState['search'] !== "") {
                    copyState['callBookingSearch'] = arrCallFind;
                }
            }
        } catch (e) {
            console.log(e)
        }
        this.setState({
            ...copyState
        });
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = [
            'customerName', 'peopleNumber', 'phoneNumber',
            'serviceName', 'time', 'dateAdd',
        ];

        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    parseTime = (time) => {
        if (time !== "") {
            let hours = time.slice(0, 2);
            let minutes = time.slice(3, 5);
            hours = (parseInt(hours) + 24) % 24;
            let mid = 'AM';
            if (parseInt(hours) === 0 || parseInt(hours) === 12) { //At 00 hours we need to show 12 am
                hours = 12;
            }
            else if (parseInt(hours) > 12) {
                hours = parseInt(hours) % 12;
                mid = 'PM';
            }
            if (parseInt(minutes) > 0) {
                time = hours + ":" + minutes + mid;
            } else {
                time = hours + mid;
            }
            return time;
        }
    }

    handleSaveBooking = async (e) => {
        try {
            let isValid = this.checkValidateInput();
            let { actions, customerName, dateAdd, note, time,
                peopleNumber, phoneNumber, serviceName } = this.state;
            if (isValid === true) {
                if (actions === CRUD_ACTIONS.CREATE) {
                    let userIdCreate = this.props.userRedux.id;
                    await this.props.createNewCallBooking({
                        userIdCreate: userIdCreate,
                        customerName: customerName,
                        peopleNumber: peopleNumber,
                        phonenumber: phoneNumber,
                        serviceName: serviceName,
                        time: time,
                        date: dateAdd,
                        note: note,
                        currentPage: 1
                    })
                }
                if (actions === CRUD_ACTIONS.EDIT) {
                    let userIdCreate = this.props.userRedux.id;
                    await this.props.editCallBookingRedux({
                        id: this.state.id,
                        userIdCreate: userIdCreate,
                        customerName: customerName,
                        peopleNumber: peopleNumber,
                        phonenumber: phoneNumber,
                        serviceName: serviceName,
                        time: time,
                        date: dateAdd,
                        note: note,
                        page: this.state.currentPage
                    })
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    handleEditBookingFromParent = async (booking, currentPage) => {
        this.setState({
            id: booking.id,
            userIdCreate: booking.userIdCreate,
            customerName: booking.customerName,
            peopleNumber: booking.peopleNumber,
            phoneNumber: booking.phoneNumber,
            serviceName: booking.serviceName,
            time: booking.time,
            date: booking.dateAdd,
            note: booking.note,
            disabled: false,
            actions: CRUD_ACTIONS.EDIT,
            currentPage: currentPage
        })
    }

    handleDetailBookingFromParent = async (booking, currentPage) => {
        this.setState({
            id: booking.id,
            customerName: booking.customerName,
            peopleNumber: booking.peopleNumber,
            phoneNumber: booking.phoneNumber,
            serviceName: booking.serviceName,
            time: booking.time,
            date: booking.dateAdd,
            note: booking.note,
            actions: CRUD_ACTIONS.CREATE,
            page: currentPage,
            disabled: true
        })
    }

    handleDeleteCallBooking = (call, dateBook) => {
        this.props.deleteCallBookingRedux(call, dateBook);
    }

    componentDidUpdate = async (prevProps, prevState, snapshot) => {
        // console.log(this.props.callBookingArrRedux)
        if (prevProps.callBookingArrRedux !== this.props.callBookingArrRedux) {
            let callArr = this.props.callBookingArrRedux;
            let dateBook = callArr.dateBook;
            let obj = {
                id: "",
                customerName: "",
                note: "",
                peopleNumber: "",
                phonenumber: "",
                serviceName: "",
                time: ""
            }
            let t = [];
            let t9 = [];
            t9 = callArr.t9;
            let t10 = [];
            t10 = callArr.t10;
            let t11 = [];
            t11 = callArr.t11;
            let t12 = [];
            t12 = callArr.t12;
            let t13 = [];
            t13 = callArr.t13;
            let t14 = [];
            t14 = callArr.t14;
            let t15 = [];
            t15 = callArr.t15;
            let t16 = [];
            t16 = callArr.t16;
            let t17 = [];
            t17 = callArr.t17;
            let t18 = [];
            t18 = callArr.t18;
            for (let index = 0; index < 12; index++) {
                t.push("");
            }
            if (t9.length === 0) {
                for (let index = 0; index < 12; index++) {
                    t9.push(obj);
                }
            } else {
                let length = 12 - parseInt(t9.length);
                for (let index = 0; index < length; index++) {
                    t9.push(obj);
                }
            }
            if (t10.length === 0) {
                for (let index = 0; index < 12; index++) {
                    t10.push(obj);
                }
            } else {
                let length = 12 - parseInt(t10.length);
                for (let index = 0; index < length; index++) {
                    t10.push(obj);
                }
            }
            if (t11.length === 0) {
                for (let index = 0; index < 12; index++) {
                    t11.push(obj);
                }
            } else {
                let length = 12 - parseInt(t11.length);
                for (let index = 0; index < length; index++) {
                    t11.push(obj);
                }
            }
            if (t12.length === 0) {
                for (let index = 0; index < 12; index++) {
                    t12.push(obj);
                }
            } else {
                let length = 12 - parseInt(t12.length);
                for (let index = 0; index < length; index++) {
                    t12.push(obj);
                }
            }
            if (t13.length === 0) {
                for (let index = 0; index < 12; index++) {
                    t13.push(obj);
                }
            } else {
                let length = 12 - parseInt(t13.length);
                for (let index = 0; index < length; index++) {
                    t13.push(obj);
                }
            }
            if (t14.length === 0) {
                for (let index = 0; index < 12; index++) {
                    t14.push(obj);
                }
            } else {
                let length = 12 - parseInt(t14.length);
                for (let index = 0; index < length; index++) {
                    t14.push(obj);
                }
            }
            if (t15.length === 0) {
                for (let index = 0; index < 12; index++) {
                    t15.push(obj);
                }
            } else {
                let length = 12 - parseInt(t15.length);
                for (let index = 0; index < length; index++) {
                    t15.push(obj);
                }
            }
            if (t16.length === 0) {
                for (let index = 0; index < 12; index++) {
                    t16.push(obj);
                }
            } else {
                let length = 12 - parseInt(t16.length);
                for (let index = 0; index < length; index++) {
                    t16.push(obj);
                }
            }
            if (t17.length === 0) {
                for (let index = 0; index < 12; index++) {
                    t17.push(obj);
                }
            } else {
                let length = 12 - parseInt(t17.length);
                for (let index = 0; index < length; index++) {
                    t17.push(obj);
                }
            }
            if (t18.length === 0) {
                for (let index = 0; index < 12; index++) {
                    t18.push(obj);
                }
            } else {
                let length = 12 - parseInt(t18.length);
                for (let index = 0; index < length; index++) {
                    t18.push(obj);
                }
            }
            this.setState({
                t9: t9, t10: t10, t11: t11,
                t12: t12, t13: t13, t14: t14, t18: t18,
                t15: t15, t16: t16, t: t, t17: t17,
                customerName: '', peopleNumber: '', phoneNumber: '',
                serviceName: '', time: '', note: '', dateAdd: '', dateBook: dateBook,
                actions: CRUD_ACTIONS.CREATE
            })
        }
    }

    render() {
        let {
            customerName, peopleNumber, phoneNumber, dateAdd, search,
            serviceName, time, note, dateBook, disabled, actions, callBookingSearch
        }
            = this.state;
        let t = this.state.t;
        let t9 = this.state.t9;
        let t10 = this.state.t10;
        let t11 = this.state.t11;
        let t12 = this.state.t12;
        let t13 = this.state.t13;
        let t14 = this.state.t14;
        let t15 = this.state.t15;
        let t16 = this.state.t16;
        let t17 = this.state.t17;
        let t18 = this.state.t18;
        return (
            <div className="overflow-auto user-redux-container">
                <div className="title py-3">
                    <FormattedMessage id="menu.admin.manage-order.call-booking" />
                </div>
                <div className="user-redux-body">
                    <div className="container table-responsive">
                        <form className="row g-3">
                            <div className="col-lg-4 col-md-4 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-order.customerName" />
                                </label>
                                <input
                                    type="text"
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-control is-disabled" : "form-control"}
                                    name="customerName"
                                    value={customerName}
                                    onChange={(event) => { this.handleOnChangeInput(event, "customerName") }}
                                />
                            </div>
                            <div className="col-lg-4 col-md-4 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-user.phonenumber" />
                                </label>
                                <input
                                    type="text"
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-control is-disabled" : "form-control"}
                                    name="phoneNumber"
                                    value={phoneNumber}
                                    onChange={(event) => { this.handleOnChangeInput(event, "phoneNumber") }}
                                />
                            </div>

                            <div className="col-lg-4 col-md-4 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-order.peopleNumber" />
                                </label>
                                <input
                                    type="number"
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-control is-disabled" : "form-control"}
                                    name="peopleNumber"
                                    value={peopleNumber}
                                    onChange={(event) => { this.handleOnChangeInput(event, "peopleNumber") }}
                                />
                            </div>
                            <div className="col-lg-4 col-md-4 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-order.dateWork" />
                                </label>
                                <input
                                    type="date"
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-control is-disabled" : "form-control"}
                                    name="dateAdd"
                                    value={dateAdd}
                                    onChange={(event) => { this.handleOnChangeInput(event, "dateAdd") }}
                                />
                            </div>
                            <div className="col-lg-4 col-md-4 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-order.time" />
                                </label>
                                <input
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-control is-disabled" : "form-control"}
                                    type="time"
                                    name="time"
                                    value={time}
                                    min="09:00" max="18:00"
                                    onChange={(event) => { this.handleOnChangeInput(event, "time") }}
                                />
                            </div>
                            <div className="col-lg-4 col-md-4 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-service.serviceName" />
                                </label>
                                <input
                                    type="text"
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-control is-disabled" : "form-control"}
                                    name="serviceName"
                                    value={serviceName}
                                    onChange={(event) => { this.handleOnChangeInput(event, "serviceName") }}
                                />
                            </div>
                            <div className="col-lg-12 col-md-12 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-product.description" />
                                </label>
                                <input
                                    type="text"
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-control is-disabled" : "form-control"}
                                    name="note"
                                    value={note}
                                    onChange={(event) => { this.handleOnChangeInput(event, "note") }}
                                />
                            </div>
                            <div className="col-12 my-3">
                                <button
                                    aria-disabled={disabled === true ? "true" : "false"}
                                    type="button"
                                    className={actions === CRUD_ACTIONS.CREATE ?
                                        "btn btn-primary px-3" : "btn btn-warning px-3"}
                                    onClick={() => { this.handleSaveBooking() }}
                                >
                                    {actions === CRUD_ACTIONS.CREATE ?
                                        <FormattedMessage id="manage-user.save" />
                                        :
                                        <FormattedMessage id="manage-user.edit" />
                                    }
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary px-3 mx-2 my-2"
                                    onClick={() => { this.handleCancel() }}
                                >
                                    <FormattedMessage id="manage-user.cancel" />
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="container">
                        <div className='users-table mt-4 mb-4 table-responsive'>
                            <form className="row g-3 mb-2">
                                <div className="col-lg-4 col-md-4 col-xs-auto"></div>
                                <div className="col-lg-4 col-md-4 col-xs-auto">
                                    <label className="form-label">
                                        <FormattedMessage id="manage-order.dateWork" />
                                    </label>
                                    <input
                                        type="date"
                                        aria-disabled={disabled}
                                        className={disabled === true ? "form-control is-disabled" : "form-control"}
                                        name="dateBook"
                                        value={dateBook}
                                        onChange={(event) => { this.handleOnChangeInput(event, "dateBook") }}
                                    />
                                </div>
                                <div className="col-lg-4 col-md-4 col-xs-auto">
                                    <label className="form-label">
                                        <FormattedMessage id="manage-order.searchPhone" />
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="search"
                                        value={search}
                                        onChange={(event) => { this.handleOnChangeInput(event, "search") }}
                                    />
                                </div>
                            </form>
                            {/* table search */}
                            {search !== "" &&
                                <table className='table table-bordered scroll' id="customers">
                                    <thead>
                                        <tr>
                                            <th><FormattedMessage id="manage-order.time" /></th>
                                            <th><FormattedMessage id="manage-order.customerName" /></th>
                                            <th><FormattedMessage id="manage-user.phonenumber" /></th>
                                            <th><FormattedMessage id="manage-service.serviceName" /></th>
                                            <th><FormattedMessage id="manage-order.peopleNumber" /></th>
                                            <th><FormattedMessage id="manage-product.description" /></th>
                                            <th><FormattedMessage id="manage-user.action" /></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {callBookingSearch.length === 0 &&
                                            <tr>
                                                <td className='text-center' colSpan={9}>
                                                    <FormattedMessage id="manage-user.dataEmpty" />
                                                </td>
                                            </tr>
                                        }
                                        {callBookingSearch.length !== 0 && callBookingSearch.map((item, index) => {
                                            // console.log('check map: ', item, index)
                                            return (
                                                <tr key={index}>
                                                    <td className='t-time'>{this.parseTime(item.time)}</td>
                                                    <td>{item.customerName}</td>
                                                    <td>{item.phonenumber}</td>
                                                    <td>{item.serviceName}</td>
                                                    <td>{item.peopleNumber}</td>
                                                    <td>{item.note}</td>
                                                    <td>
                                                        <button className='btn-delete de-call' value={item.id}
                                                            onClick={(e) => {
                                                                window.confirm('Are you sure you want to delete it?',)
                                                                    && this.handleDeleteCallBooking(item, dateBook)
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
                            }
                            {/* table search */}

                            <table className='table table-bordered scroll' id="customers">
                                <thead>
                                    <tr>
                                        <th className='t-time'><FormattedMessage id="manage-order.time" /></th>
                                        <th></th><th></th><th></th><th></th>
                                        <th></th><th></th><th></th><th></th>
                                        <th></th><th></th><th></th><th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr key="9">
                                        <td className='t-time'><label className='s-time'>9AM</label></td>
                                        {t9.map((item, index) => {
                                            return (
                                                <td key={index}>
                                                    {item.customerName !== "" ? "Customer: " : ""}{item.customerName}<br />
                                                    {item.customerName !== "" ? "Phone: " : ""}{item.phonenumber}<br />
                                                    {item.time !== "" ? "Time: " : ""}{this.parseTime(item.time)}<br />
                                                    {item.customerName !== "" ? "Service: " : ""}{item.serviceName}<br />
                                                    {item.customerName !== "" ? "People: " : ""}{item.peopleNumber}<br />
                                                    {item.customerName !== "" ? "Note: " : ""}{item.note}
                                                    {item.customerName !== "" ?
                                                        <button className='btn-delete de-call' value={item.id}
                                                            onClick={(e) => {
                                                                window.confirm('Are you sure you want to delete it?',)
                                                                    && this.handleDeleteCallBooking(item, dateBook)
                                                            }}>
                                                            <i className="fas fa-trash-alt"></i>
                                                        </button> : ""}
                                                </td>
                                            )
                                        })
                                        }
                                    </tr>
                                    <tr key="10">
                                        <td className='t-time'><label className='s-time'>10AM</label></td>
                                        {t10 !== "" && t10.map((item, index) => {
                                            return (
                                                <td key={index}>
                                                    {item.customerName !== "" ? "Customer: " : ""}{item.customerName}<br />
                                                    {item.customerName !== "" ? "Phone: " : ""}{item.phonenumber}<br />
                                                    {item.time !== "" ? "Time: " : ""}{this.parseTime(item.time)}<br />
                                                    {item.customerName !== "" ? "Service: " : ""}{item.serviceName}<br />
                                                    {item.customerName !== "" ? "People: " : ""}{item.peopleNumber}<br />
                                                    {item.customerName !== "" ? "Note: " : ""}{item.note}
                                                    {item.customerName !== "" ?
                                                        <button className='btn-delete de-call' value={item.id}
                                                            onClick={(e) => {
                                                                window.confirm('Are you sure you want to delete it?',)
                                                                    && this.handleDeleteCallBooking(item, dateBook)
                                                            }}>
                                                            <i className="fas fa-trash-alt"></i>
                                                        </button> : ""}
                                                </td>
                                            )
                                        })
                                        }
                                    </tr>
                                    <tr key="11">
                                        <td className='t-time'><label className='s-time'>11AM</label></td>
                                        {t11 !== "" && t11.map((item, index) => {
                                            return (
                                                <td key={index}>
                                                    {item.customerName !== "" ? "Customer: " : ""}{item.customerName}<br />
                                                    {item.customerName !== "" ? "Phone: " : ""}{item.phonenumber}<br />
                                                    {item.time !== "" ? "Time: " : ""}{this.parseTime(item.time)}<br />
                                                    {item.customerName !== "" ? "Service: " : ""}{item.serviceName}<br />
                                                    {item.customerName !== "" ? "People: " : ""}{item.peopleNumber}<br />
                                                    {item.customerName !== "" ? "Note: " : ""}{item.note}
                                                    {item.customerName !== "" ?
                                                        <button className='btn-delete de-call' value={item.id}
                                                            onClick={(e) => {
                                                                window.confirm('Are you sure you want to delete it?',)
                                                                    && this.handleDeleteCallBooking(item, dateBook)
                                                            }}>
                                                            <i className="fas fa-trash-alt"></i>
                                                        </button> : ""}
                                                </td>
                                            )
                                        })
                                        }
                                    </tr>
                                    <tr key="12">
                                        <td className='t-time'><label className='s-time'>12PM</label></td>
                                        {t12 !== "" && t12.map((item, index) => {
                                            return (
                                                <td key={index}>
                                                    {item.customerName !== "" ? "Customer: " : ""}{item.customerName}<br />
                                                    {item.customerName !== "" ? "Phone: " : ""}{item.phonenumber}<br />
                                                    {item.time !== "" ? "Time: " : ""}{this.parseTime(item.time)}<br />
                                                    {item.customerName !== "" ? "Service: " : ""}{item.serviceName}<br />
                                                    {item.customerName !== "" ? "People: " : ""}{item.peopleNumber}<br />
                                                    {item.customerName !== "" ? "Note: " : ""}{item.note}
                                                    {item.customerName !== "" ?
                                                        <button className='btn-delete de-call' value={item.id}
                                                            onClick={(e) => {
                                                                window.confirm('Are you sure you want to delete it?',)
                                                                    && this.handleDeleteCallBooking(item, dateBook)
                                                            }}>
                                                            <i className="fas fa-trash-alt"></i>
                                                        </button> : ""}
                                                </td>
                                            )
                                        })
                                        }
                                    </tr>
                                    <tr key="13">
                                        <td className='t-time'><label className='s-time'>1PM</label></td>
                                        {t13 !== "" && t13.map((item, index) => {
                                            return (
                                                <td key={index}>
                                                    {item.customerName !== "" ? "Customer: " : ""}{item.customerName}<br />
                                                    {item.customerName !== "" ? "Phone: " : ""}{item.phonenumber}<br />
                                                    {item.time !== "" ? "Time: " : ""}{this.parseTime(item.time)}<br />
                                                    {item.customerName !== "" ? "Service: " : ""}{item.serviceName}<br />
                                                    {item.customerName !== "" ? "People: " : ""}{item.peopleNumber}<br />
                                                    {item.customerName !== "" ? "Note: " : ""}{item.note}
                                                    {item.customerName !== "" ?
                                                        <button className='btn-delete de-call' value={item.id}
                                                            onClick={(e) => {
                                                                window.confirm('Are you sure you want to delete it?',)
                                                                    && this.handleDeleteCallBooking(item, dateBook)
                                                            }}>
                                                            <i className="fas fa-trash-alt"></i>
                                                        </button> : ""}
                                                </td>
                                            )
                                        })
                                        }
                                    </tr>
                                    <tr key="14">
                                        <td className='t-time'><label className='s-time'>2PM</label></td>
                                        {t14 !== "" && t14.map((item, index) => {
                                            return (
                                                <td key={index}>
                                                    {item.customerName !== "" ? "Customer: " : ""}{item.customerName}<br />
                                                    {item.customerName !== "" ? "Phone: " : ""}{item.phonenumber}<br />
                                                    {item.time !== "" ? "Time: " : ""}{this.parseTime(item.time)}<br />
                                                    {item.customerName !== "" ? "Service: " : ""}{item.serviceName}<br />
                                                    {item.customerName !== "" ? "People: " : ""}{item.peopleNumber}<br />
                                                    {item.customerName !== "" ? "Note: " : ""}{item.note}
                                                    {item.customerName !== "" ?
                                                        <button className='btn-delete de-call' value={item.id}
                                                            onClick={(e) => {
                                                                window.confirm('Are you sure you want to delete it?',)
                                                                    && this.handleDeleteCallBooking(item, dateBook)
                                                            }}>
                                                            <i className="fas fa-trash-alt"></i>
                                                        </button> : ""}
                                                </td>
                                            )
                                        })
                                        }
                                    </tr>
                                    <tr key="15">
                                        <td className='t-time'><label className='s-time'>3PM</label></td>
                                        {t15 !== "" && t15.map((item, index) => {
                                            return (
                                                <td key={index}>
                                                    {item.customerName !== "" ? "Customer: " : ""}{item.customerName}<br />
                                                    {item.customerName !== "" ? "Phone: " : ""}{item.phonenumber}<br />
                                                    {item.time !== "" ? "Time: " : ""}{this.parseTime(item.time)}<br />
                                                    {item.customerName !== "" ? "Service: " : ""}{item.serviceName}<br />
                                                    {item.customerName !== "" ? "People: " : ""}{item.peopleNumber}<br />
                                                    {item.customerName !== "" ? "Note: " : ""}{item.note}
                                                    {item.customerName !== "" ?
                                                        <button className='btn-delete de-call' value={item.id}
                                                            onClick={(e) => {
                                                                window.confirm('Are you sure you want to delete it?',)
                                                                    && this.handleDeleteCallBooking(item, dateBook)
                                                            }}>
                                                            <i className="fas fa-trash-alt"></i>
                                                        </button> : ""}
                                                </td>
                                            )
                                        })
                                        }
                                    </tr>
                                    <tr key="16">
                                        <td className='t-time'><label className='s-time'>4PM</label></td>
                                        {t16 !== "" && t16.map((item, index) => {
                                            return (
                                                <td key={index}>
                                                    {item.customerName !== "" ? "Customer: " : ""}{item.customerName}<br />
                                                    {item.customerName !== "" ? "Phone: " : ""}{item.phonenumber}<br />
                                                    {item.time !== "" ? "Time: " : ""}{this.parseTime(item.time)}<br />
                                                    {item.customerName !== "" ? "Service: " : ""}{item.serviceName}<br />
                                                    {item.customerName !== "" ? "People: " : ""}{item.peopleNumber}<br />
                                                    {item.customerName !== "" ? "Note: " : ""}{item.note}
                                                    {item.customerName !== "" ?
                                                        <button className='btn-delete de-call' value={item.id}
                                                            onClick={(e) => {
                                                                window.confirm('Are you sure you want to delete it?',)
                                                                    && this.handleDeleteCallBooking(item, dateBook)
                                                            }}>
                                                            <i className="fas fa-trash-alt"></i>
                                                        </button> : ""}
                                                </td>
                                            )
                                        })
                                        }
                                    </tr>
                                    <tr key="17">
                                        <td className='t-time'><label className='s-time'>5PM</label></td>
                                        {t17 !== "" && t17.map((item, index) => {
                                            return (
                                                <td key={index}>
                                                    {item.customerName !== "" ? "Customer: " : ""}{item.customerName}<br />
                                                    {item.customerName !== "" ? "Phone: " : ""}{item.phonenumber}<br />
                                                    {item.time !== "" ? "Time: " : ""}{this.parseTime(item.time)}<br />
                                                    {item.customerName !== "" ? "Service: " : ""}{item.serviceName}<br />
                                                    {item.customerName !== "" ? "People: " : ""}{item.peopleNumber}<br />
                                                    {item.customerName !== "" ? "Note: " : ""}{item.note}
                                                    {item.customerName !== "" ?
                                                        <button className='btn-delete de-call' value={item.id}
                                                            onClick={(e) => {
                                                                window.confirm('Are you sure you want to delete it?',)
                                                                    && this.handleDeleteCallBooking(item, dateBook)
                                                            }}>
                                                            <i className="fas fa-trash-alt"></i>
                                                        </button> : ""}
                                                </td>
                                            )
                                        })
                                        }
                                    </tr>
                                    <tr key="18">
                                        <td className='t-time'><label className='s-time'>6PM</label></td>
                                        {t18 !== "" && t18.map((item, index) => {
                                            return (
                                                <td key={index}>
                                                    {item.customerName !== "" ? "Customer: " : ""}{item.customerName}<br />
                                                    {item.customerName !== "" ? "Phone: " : ""}{item.phonenumber}<br />
                                                    {item.time !== "" ? "Time: " : ""}{this.parseTime(item.time)}<br />
                                                    {item.customerName !== "" ? "Service: " : ""}{item.serviceName}<br />
                                                    {item.customerName !== "" ? "People: " : ""}{item.peopleNumber}<br />
                                                    {item.customerName !== "" ? "Note: " : ""}{item.note}
                                                    {item.customerName !== "" ?
                                                        <button className='btn-delete de-call' value={item.id}
                                                            onClick={(e) => {
                                                                window.confirm('Are you sure you want to delete it?',)
                                                                    && this.handleDeleteCallBooking(item, dateBook)
                                                            }}>
                                                            <i className="fas fa-trash-alt"></i>
                                                        </button> : ""}
                                                </td>
                                            )
                                        })
                                        }
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        userRedux: state.user.userInfo,
        callBookingArrRedux: state.booking.callBooking
        // isLoadingGender: state.user.isLoadingGender,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createNewCallBooking: (data) => dispatch(actions.createNewCallBooking(data)),
        editCallBookingRedux: (data) => dispatch(actions.editCallBooking(data)),
        deleteCallBookingRedux: (call, date) => dispatch(actions.deleteCallBooking(call, date)),
        getCallBookingOfDateRedux: (date) => dispatch(actions.getCallBookingOfDateStart(date)),
        fetchBookingsRedux: (currentPage) => dispatch(actions.fetchAllBookingsStart(currentPage))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CallBooking);
