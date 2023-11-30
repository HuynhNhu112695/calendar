import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import moment from 'moment';
// import { emitter } from '../../utils/emitter';
import * as actions from '../../store/actions';
import { LANGUAGES, CRUD_ACTIONS } from "../../utils";
import TableManageBooking from './TableManageBooking';

class BookingManage extends Component {
    /*  Life cycle
    * Run component
    * 1. Run construc -> init state
    * 2. Did mount (set state)
    * 3. Render
    * */

    constructor(props) {
        super(props);
        this.state = {
            customerName: '', staffId1: '', staffId2: '', staffId3: '', serviceId3: '',
            serviceId1: '', serviceId2: '', themeId3: '', themeId1: '', themeId2: '',
            price1: '', price2: '', price3: '', discount: '', total: '', cashPay: '',
            cardPay: '', note: '', dateWork: '', hiddenAdd: false,
            count: 0,
            count1: 0,
            count2: 0,
            arrInput: [],
            themeArr: [],
            userEdit: {},
            isMenuCus: "CUSTOMER",
            // type: 'S1',
            disabled: false,
            userPage: 0,
            currentPage: 1,
            staffArr: [],
            serviceArr1: [],
            serviceArr2: [],
            serviceArr3: [],
            customerArr: [],
            actions: CRUD_ACTIONS.CREATE,

        }
    }

    async componentDidMount() {
        await this.props.getThemeStart();
        await this.props.fetchCustomerRedux(this.state.isMenuCus, this.state.userPage);
    }

    handleCancel = () => {
        this.setState({
            customerName: '', staffId1: '', staffId2: '', staffId3: '', serviceId1: '',
            serviceId2: '', themeId1: '', themeId2: '', serviceId3: '', themeId3: '',
            price1: '', price2: '', price3: '', discount: '', total: '', cashPay: '',
            cardPay: '', note: '', dateWork: '', hiddenAdd: false, count: 0, count1: 0, count2: 0,
            disabled: false,
            serviceArr1: [],
            serviceArr2: [],
            serviceArr3: [],
            staffArr: [],
            actions: CRUD_ACTIONS.CREATE
        })
    }

    handleOnChangeInput = async (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        try {
            if (this.state.dateWork !== copyState['dateWork']) {
                if (copyState['dateWork'] !== "") {
                    this.setState({
                        dateWork: moment(copyState['dateWork']).format("YYYY-MM-DD")
                    });
                } else {
                    this.setState({
                        dateWork: copyState['dateWork']
                    });
                }
                let dateWork = copyState['dateWork'];
                await this.props.fetchStaffWorkingRedux(dateWork);
                let staffArr = this.props.staffRedux;
                copyState['staffArr'] = staffArr;
            }
            if (this.state.themeId1 !== copyState['themeId1']) {
                this.setState({ ...this.state })
                let type = copyState['themeId1']
                await this.props.serviceWithTypeRedux(type);
                let changeType = await this.props.serviceRedux;
                copyState['serviceArr1'] = changeType;
                // copyState['serviceId'] = changeType.length > 0 ? changeType[0].id : '';
                changeType.map((item) => {
                    if (item.id === parseFloat(copyState['serviceId1'])) {
                        let price = item.price;
                        // let serviceId = item.id;
                        copyState['price1'] = price;
                        // copyState['serviceId'] = serviceId;
                    }
                })
            }
            if (copyState['themeId2'] !== '' && this.state.themeId2 !== copyState['themeId2']) {
                this.setState({ ...this.state })
                let type = copyState['themeId2']
                await this.props.serviceWithTypeRedux(type);
                let changeType = await this.props.serviceRedux;
                copyState['serviceArr2'] = changeType;
                // copyState['serviceId'] = changeType.length > 0 ? changeType[0].id : '';
                changeType.map((item) => {
                    if (item.id === parseFloat(copyState['serviceId2'])) {
                        let price = item.price;
                        // let serviceId = item.id;
                        copyState['price2'] = price;
                        // copyState['serviceId'] = serviceId;
                    }
                })
            }
            if (copyState['themeId3'] && this.state.themeId3 !== copyState['themeId3']) {
                this.setState({ ...this.state })
                let type = copyState['themeId3']
                await this.props.serviceWithTypeRedux(type);
                let changeType = await this.props.serviceRedux;
                copyState['serviceArr3'] = changeType;
                // copyState['serviceId'] = changeType.length > 0 ? changeType[0].id : '';
                changeType.map((item) => {
                    if (item.id === parseFloat(copyState['serviceId3'])) {
                        let price = item.price;
                        // let serviceId = item.id;
                        copyState['price3'] = price;
                        // copyState['serviceId'] = serviceId;
                    }
                })
            }
            if (this.state.serviceId1 !== copyState['serviceId1']) {
                let arrService = await this.props.serviceRedux;
                arrService.map((item) => {
                    if (item.id === parseFloat(copyState['serviceId1'])) {
                        let price = item.price;
                        let total = this.state.total + price;
                        copyState['price1'] = price;
                        // this.state.discount === '' ?
                        //     total = total
                        //     :
                        //     total = parseFloat(total) - parseFloat(this.state.discount);
                        copyState['total'] = total;
                    }
                })
            }
            if (copyState['serviceId2'] && this.state.serviceId2 !== copyState['serviceId2']) {
                let arrService = await this.props.serviceRedux;
                arrService.map((item) => {
                    if (item.id === parseFloat(copyState['serviceId2'])) {
                        let price = item.price;
                        let total = parseFloat(this.state.total) + parseFloat(price);
                        copyState['price2'] = price;
                        // this.state.discount === '' ?
                        //     total = total
                        //     :
                        //     total = parseFloat(total) - parseFloat(this.state.discount);
                        copyState['total'] = total.toFixed(2);
                    }
                })
            }
            if (copyState['serviceId3'] && this.state.serviceId3 !== copyState['serviceId3']) {
                let arrService = await this.props.serviceRedux;
                arrService.map((item) => {
                    if (item.id === parseFloat(copyState['serviceId3'])) {
                        let price = item.price;
                        let total = parseFloat(this.state.total) + parseFloat(price);
                        copyState['price3'] = price;
                        // this.state.discount === '' ?
                        //     total = total
                        //     :
                        //     total = parseFloat(total) - parseFloat(this.state.discount);
                        copyState['total'] = total.toFixed(2);
                    }
                })
            }
            if (this.state.price1 !== '' && this.state.price1 !== copyState['price1']) {
                copyState['total'] = parseFloat(this.state.total) - parseFloat(this.state.price1) + parseFloat(copyState['price1']);
            }
            if (this.state.price2 !== '' && this.state.price2 !== copyState['price2']) {
                copyState['total'] = parseFloat(this.state.total) - parseFloat(this.state.price2) + parseFloat(copyState['price2']);
            }
            if (this.state.price3 !== '' && this.state.price3 !== copyState['price3']) {
                copyState['total'] = parseFloat(this.state.total) - parseFloat(this.state.price3) + parseFloat(copyState['price3']);
            }
            if (copyState['discount'] !== '' && this.state.discount !== copyState['discount']) {
                let discount = copyState['discount'];
                let price1 = this.state.price1
                let price2 = this.state.price2;
                let price3 = this.state.price3;
                if (price1 === "") { price1 = 0; }
                if (price2 === "") { price2 = 0; }
                if (price3 === "") { price3 = 0; }
                let total = parseFloat(price1) + parseFloat(price2) + parseFloat(price3);
                total = parseFloat(total) - parseFloat(discount);
                copyState['total'] = total.toFixed(2);
            } else if (copyState['discount'] === '' && this.state.discount !== copyState['discount']) {
                let price1 = this.state.price1
                let price2 = this.state.price2;
                let price3 = this.state.price3;
                if (price1 === "") { price1 = 0; }
                if (price2 === "") { price2 = 0; }
                if (price3 === "") { price3 = 0; }
                let total = parseFloat(price1) + parseFloat(price2) + parseFloat(price3);
                copyState['total'] = total.toFixed(2);
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
            'dateWork', 'serviceId1',
            'staffId1', 'total', 'themeId1', 'price1'
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

    handleAddService = async () => {
        let count = this.state.count + 1;
        this.setState({
            count: count
        })
        if (count === 1) {
            this.setState({
                count1: 1
            })
        } else if (count === 2 && this.state.count1 === 1) {
            this.setState({
                count2: 2
            })
        } else if (count === 2 && this.state.count1 === 0) {
            this.setState({
                count1: 1
            })
        }
    }

    handleRemoveService = (event, id) => {
        let remove = id;
        if (remove === "remove1") {
            let total = parseFloat(this.state.total) - parseFloat(this.state.price2);
            let count = this.state.count;
            if (this.state.count2 === 0) { count = 0; } else { count = 1; }
            this.setState({
                themeId2: '',
                serviceId2: '',
                price2: '',
                staffId2: '',
                count: count,
                count1: 0,
                total: total
            })
        }
        if (remove === "remove2") {
            let total = parseFloat(this.state.total) - parseFloat(this.state.price3);
            let count = this.state.count;
            if (this.state.count1 === 0) { count = 0; } else { count = 1; }
            this.setState({
                themeId3: '',
                serviceId3: '',
                price3: '',
                staffId3: '',
                count: count,
                count2: 0,
                total: total
            })
        }
    }

    handleSaveBooking = async (e) => {
        try {
            let isValid = this.checkValidateInput();

            let { actions, cardPay, cashPay, total, customerName, staffId1, staffId2,
                staffId3, themeId1, themeId2, themeId3, serviceId2, serviceId3, price2,
                price3, serviceId1, price1, discount, dateWork, note, count } = this.state;
            if (cardPay === '') { cardPay = 0.00; }
            if (cashPay === '') { cashPay = 0.00; }
            if (discount === '') { discount = 0.00; }
            let totalPay = parseFloat(cardPay) + parseFloat(cashPay);
            if (parseFloat(totalPay) !== parseFloat(total)) {
                alert("Please choose the number money need your payment suitably!")
            } else if (isValid === true) {
                let data = [];
                let dataEdit = {};
                let dis = 0;
                if (count !== 0) {
                    dis = parseFloat(discount) / parseFloat(count + 1);
                } else {
                    dis = parseFloat(discount);
                }
                let userIdCreate = this.props.userRedux.id;
                if (themeId1 !== "") {
                    let totalStaff1 = parseFloat(price1) - parseFloat(dis);
                    if (parseFloat(cardPay) !== parseFloat(0)) {
                        cardPay = parseFloat(totalStaff1);
                    }
                    if (parseFloat(cashPay) !== parseFloat(0)) {
                        cashPay = parseFloat(totalStaff1);
                    }
                    if (actions === CRUD_ACTIONS.CREATE) {
                        let obj = {
                            userIdCreate: userIdCreate,
                            customerName: customerName,
                            staffId: staffId1,
                            themeId: themeId1,
                            serviceId: serviceId1,
                            price: parseFloat(price1),
                            discount: parseFloat(dis),
                            total: parseFloat(totalStaff1),
                            cashPay: parseFloat(cashPay),
                            cardPay: parseFloat(cardPay),
                            date: dateWork,
                            note: note,
                            action: 1,
                        }
                        data.push(obj);
                    }
                    if (actions === CRUD_ACTIONS.EDIT) {
                        let objEdit = {
                            id: this.state.id,
                            userIdCreate: userIdCreate,
                            customerName: customerName,
                            staffId: staffId1,
                            themeId: themeId1,
                            serviceId: serviceId1,
                            price: parseFloat(price1),
                            discount: parseFloat(dis),
                            total: parseFloat(totalStaff1),
                            cashPay: parseFloat(cashPay),
                            cardPay: parseFloat(cardPay),
                            date: dateWork,
                            note: note,
                            action: 1,
                            page: this.state.page
                        }
                        dataEdit = objEdit;
                    }
                }
                if (themeId2 !== "") {
                    let totalStaff2 = parseFloat(price2) - parseFloat(dis);
                    if (parseFloat(cardPay) !== parseFloat(0)) {
                        cardPay = parseFloat(totalStaff2);
                    }
                    if (parseFloat(cashPay) !== parseFloat(0)) {
                        cashPay = parseFloat(totalStaff2);
                    }
                    let obj = {
                        userIdCreate: userIdCreate,
                        customerName: customerName,
                        staffId: staffId2,
                        themeId: themeId2,
                        serviceId: serviceId2,
                        price: parseFloat(price2),
                        discount: parseFloat(dis),
                        total: parseFloat(totalStaff2),
                        cashPay: parseFloat(cashPay),
                        cardPay: parseFloat(cardPay),
                        date: dateWork,
                        note: note,
                        action: 1,
                    }
                    data.push(obj);
                }
                if (themeId3 !== "") {
                    let totalStaff3 = parseFloat(price3) - parseFloat(dis);
                    if (parseFloat(cardPay) !== parseFloat(0)) {
                        cardPay = parseFloat(totalStaff3);
                    }
                    if (parseFloat(cashPay) !== parseFloat(0)) {
                        cashPay = parseFloat(totalStaff3);
                    }
                    let obj = {
                        userIdCreate: userIdCreate,
                        customerName: customerName,
                        staffId: staffId3,
                        themeId: themeId3,
                        serviceId: serviceId3,
                        price: parseFloat(price3),
                        discount: parseFloat(dis),
                        total: parseFloat(totalStaff3),
                        cashPay: parseFloat(cashPay),
                        cardPay: parseFloat(cardPay),
                        date: dateWork,
                        note: note,
                        action: 1
                    }
                    data.push(obj);
                }
                // console.log(data[0]["staffId"])
                if (actions === CRUD_ACTIONS.CREATE) {
                    await this.props.createNewBooking(data)
                }
                if (actions === CRUD_ACTIONS.EDIT) {
                    await this.props.editBookingRedux(dataEdit)
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    handleEditBookingFromParent = async (booking, currentPage) => {
        await document.getElementById("dateWork").focus();
        await this.props.fetchStaffWorkingRedux(booking.date);
        let staffArr = await this.props.staffRedux;
        await this.props.serviceWithTypeRedux(booking.themeId);
        let serviceArr = await this.props.serviceRedux;
        await this.setState({
            id: booking.id,
            customerName: booking.customerName,
            staffId1: booking.staffId,
            themeId1: booking.themeId,
            serviceId1: booking.serviceId,
            price1: booking.price,
            discount: booking.discount,
            total: booking.total,
            cashPay: booking.cashPay,
            cardPay: booking.cardPay,
            note: booking.note,
            dateWork: booking.date,
            staffArr1: staffArr,
            serviceArr1: serviceArr,
            disabled: false,
            hiddenAdd: true,
            actions: CRUD_ACTIONS.EDIT,
            page: currentPage
        })
    }

    handleDetailBookingFromParent = async (booking, currentPage) => {
        await document.getElementById("dateWork").focus();
        await this.props.fetchStaffWorkingRedux(booking.date);
        let staffArr = await this.props.staffRedux;
        // console.log(staffArr)
        await this.props.serviceWithTypeRedux(booking.themeId);
        let serviceArr = await this.props.serviceRedux;
        await this.setState({
            id: booking.id,
            customerName: booking.customerName,
            staffId1: booking.staffId,
            themeId1: booking.themeId,
            serviceId1: booking.serviceId,
            price1: booking.price,
            discount: booking.discount,
            total: booking.total,
            cashPay: booking.cashPay,
            cardPay: booking.cardPay,
            dateWork: booking.date,
            note: booking.note,
            staffArr: staffArr,
            serviceArr1: serviceArr,
            actions: CRUD_ACTIONS.CREATE,
            page: currentPage,
            disabled: true,
            hiddenAdd: true
        })
    }

    componentDidUpdate = async (prevProps, prevState, snapshot) => {
        //after run render => run didUpdate
        if (prevProps.themeRedux !== this.props.themeRedux) {
            this.setState({ ...this.state })
            let arrThemes = await this.props.themeRedux;
            this.setState({
                themeArr: arrThemes,
            })
        }
        if (prevProps.customerRedux !== this.props.customerRedux) {
            let arrCustomer = await this.props.customerRedux.users;
            this.setState({
                customerArr: arrCustomer
            })
        }
        if (prevProps.bookings !== this.props.bookings) {
            this.setState({
                customerName: '', staffId1: '', staffId2: '', staffId3: '', serviceId1: '',
                serviceId2: '', themeId1: '', themeId2: '', serviceId3: '', themeId3: '',
                price1: '', price2: '', price3: '', dateWork: '', discount: '', total: '',
                cashPay: '', cardPay: '', note: '',
                staffArr: [], count: 0, count1: 0, count2: 0,
                serviceArr1: [], serviceArr2: [], serviceArr3: [],
                actions: CRUD_ACTIONS.CREATE
            })
        }
    }

    render() {
        let language = this.props.language;
        let themes = this.state.themeArr;
        let staffs = this.state.staffArr;
        let customers = this.state.customerArr;
        let serviceArr1 = this.state.serviceArr1;
        let serviceArr2 = this.state.serviceArr2;
        let serviceArr3 = this.state.serviceArr3;
        let {
            customerName, staffId1, staffId2, staffId3, serviceId3, themeId3, price3, dateWork,
            themeId1, themeId2, serviceId1, serviceId2, price1, price2, count2, hiddenAdd,
            discount, total, cashPay, cardPay, note, actions, disabled, count1,
        }
            = this.state;
        // // let isLoadingGender = this.props.isLoadingGender;
        return (
            <div className="overflow-auto user-redux-container">
                <div className="title py-3">
                    <FormattedMessage id="manage-order.header" />
                </div>
                <div className="user-redux-body">
                    <div className="container table-responsive">
                        <form className="row g-3">
                            <div className="col-lg-4 col-md-4 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-order.dateWork" />
                                </label>
                                <input
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-control is-disabled" : "form-control"}
                                    type="date"
                                    name="dateWork"
                                    id="dateWork"
                                    value={dateWork}
                                    onChange={(event) => { this.handleOnChangeInput(event, "dateWork") }}
                                />
                            </div>
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
                            {/* <div className="col-lg-4 col-md-4 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-order.customerName" />
                                </label>
                                <select
                                    name="customerId"
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-select is-disabled" : "form-select"}
                                    value={customerId}
                                    onChange={(event) => { this.handleOnChangeInput(event, "customerId") }}
                                >
                                    <option value=""></option>
                                    {customers.length === 0 &&
                                        <option>
                                            Data empty, please add a new data!
                                        </option>
                                    }
                                    {customers && customers.length > 0 &&
                                        customers.map((item, index) => {
                                            return (
                                                <option value={item.id} key={index}>
                                                    {item.firstname} {item.lastname}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div> */}
                            <div className="col-lg-4 col-md-4 col-xs-auto">

                            </div>
                            <div className="col-lg-3 col-md-3 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-service.theme" />
                                </label>
                                <select
                                    name="themeId1"
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-select is-disabled" : "form-select"}
                                    value={themeId1}
                                    onChange={(event) => { this.handleOnChangeInput(event, "themeId1") }}
                                >
                                    <option value=""></option>
                                    {themes && themes.length > 0 &&
                                        themes.map((item, index) => {
                                            return (
                                                <option value={item.key} key={index}>
                                                    {language === LANGUAGES.VI ? item.valueVI : item.valueEN}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-lg-3 col-md-3 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-service.serviceName" />
                                </label>
                                <select
                                    name="serviceId1"
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-select is-disabled" : "form-select"}
                                    value={serviceId1}
                                    onChange={(event) => { this.handleOnChangeInput(event, "serviceId1") }}
                                >
                                    <option value=""></option>
                                    {serviceArr1.length === 0 &&
                                        <option>
                                            Data empty, please add a new data!
                                        </option>
                                    }
                                    {serviceArr1 && serviceArr1.length > 0 &&
                                        serviceArr1.map((item, index) => {
                                            return (
                                                <option value={item.id} key={index}>
                                                    {item.serviceName}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-lg-3 col-md-3 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-product.price" />
                                </label>
                                <input
                                    type="number"
                                    step={0.01}
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-control is-disabled" : "form-control"}
                                    name="price1"
                                    value={price1}
                                    onChange={(event) => { this.handleOnChangeInput(event, "price1") }}
                                />
                            </div>
                            <div className="col-lg-3 col-md-3 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-staff.staffName" />
                                </label>
                                <select
                                    name="staffId1"
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-select is-disabled" : "form-select"}
                                    value={staffId1}
                                    onChange={(event) => { this.handleOnChangeInput(event, "staffId1") }}
                                >
                                    <option value=""></option>
                                    {staffs.length === 0 &&
                                        <option>
                                            Data empty, please choose a date!
                                        </option>
                                    }
                                    {staffs && staffs.length > 0 &&
                                        staffs.map((item, index) => {
                                            return (
                                                <option value={item.id} key={index}>
                                                    {item.firstname} {item.lastname}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            {/* Add service */}
                            <div
                                className={count1 === 1 ? "col-lg-3 col-md-3 col-xs-auto" : "col-lg-4 col-md-4 col-xs-auto hidden"}
                            >
                                <label className="form-label">
                                    <FormattedMessage id="manage-service.theme" />
                                </label>
                                <select
                                    name="themeId2"
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-select is-disabled" : "form-select"}
                                    value={themeId2}
                                    onChange={(event) => { this.handleOnChangeInput(event, "themeId2") }}
                                >
                                    <option value=""></option>
                                    {themes && themes.length > 0 &&
                                        themes.map((item, index) => {
                                            return (
                                                <option value={item.key} key={index}>
                                                    {language === LANGUAGES.VI ? item.valueVI : item.valueEN}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className={count1 === 1 ? "col-lg-3 col-md-3 col-xs-auto=" : "col-lg-4 col-md-4 col-xs-auto hidden"}>
                                <label className="form-label">
                                    <FormattedMessage id="manage-service.serviceName" />
                                </label>
                                <select
                                    name="serviceId2"
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-select is-disabled" : "form-select"}
                                    value={serviceId2}
                                    onChange={(event) => { this.handleOnChangeInput(event, "serviceId2") }}
                                >
                                    <option value=""></option>
                                    {serviceArr2.length === 0 &&
                                        <option>
                                            Data empty, please add a new data!
                                        </option>
                                    }
                                    {serviceArr2 && serviceArr2.length > 0 &&
                                        serviceArr2.map((item, index) => {
                                            return (
                                                <option value={item.id} key={index}>
                                                    {item.serviceName}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className={count1 === 1 ? "col-lg-3 col-md-3 col-xs-auto" : "col-lg-4 col-md-4 col-xs-auto hidden"}>
                                <label className="form-label">
                                    <FormattedMessage id="manage-product.price" />
                                </label>
                                <input
                                    type="number"
                                    step={0.01}
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-control is-disabled" : "form-control"}
                                    name="price2"
                                    value={price2}
                                    onChange={(event) => { this.handleOnChangeInput(event, "price2") }}
                                />
                            </div>
                            <div className={count1 === 1 ? "col-lg-3 col-md-3 col-xs-auto" : "col-lg-4 col-md-4 col-xs-auto hidden"}>
                                <label className="form-label">
                                    <FormattedMessage id="manage-staff.staffName" />
                                    <i
                                        className={hiddenAdd === true ? "fa fa-times icon-close hidden" : "fa fa-times icon-close"}
                                        onClick={(event) => { this.handleRemoveService(event, "remove1") }}
                                    ></i>
                                </label>
                                <select
                                    name="staffId2"
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-select is-disabled" : "form-select"}
                                    value={staffId2}
                                    onChange={(event) => { this.handleOnChangeInput(event, "staffId2") }}
                                >
                                    <option value=""></option>
                                    {staffs.length === 0 &&
                                        <option>
                                            Data empty, please choose a date!
                                        </option>
                                    }
                                    {staffs && staffs.length > 0 &&
                                        staffs.map((item, index) => {
                                            return (
                                                <option value={item.id} key={index}>
                                                    {item.firstname} {item.lastname}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            {/* Add service */}
                            <div className={count2 === 2 ? "col-lg-3 col-md-3 col-xs-auto" : "col-lg-4 col-md-4 col-xs-auto hidden"}>
                                <label className="form-label">
                                    <FormattedMessage id="manage-service.theme" />
                                </label>
                                <select
                                    name="themeId3"
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-select is-disabled" : "form-select"}
                                    value={themeId3}
                                    onChange={(event) => { this.handleOnChangeInput(event, "themeId3") }}
                                >
                                    <option value=""></option>
                                    {themes && themes.length > 0 &&
                                        themes.map((item, index) => {
                                            return (
                                                <option value={item.key} key={index}>
                                                    {language === LANGUAGES.VI ? item.valueVI : item.valueEN}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className={count2 === 2 ? "col-lg-3 col-md-3 col-xs-auto" : "col-lg-4 col-md-4 col-xs-auto hidden"}>
                                <label className="form-label">
                                    <FormattedMessage id="manage-service.serviceName" />
                                </label>
                                <select
                                    name="serviceId3"
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-select is-disabled" : "form-select"}
                                    value={serviceId3}
                                    onChange={(event) => { this.handleOnChangeInput(event, "serviceId3") }}
                                >
                                    <option value=""></option>
                                    {serviceArr3.length === 0 &&
                                        <option>
                                            Data empty, please add a new data!
                                        </option>
                                    }
                                    {serviceArr3 && serviceArr3.length > 0 &&
                                        serviceArr3.map((item, index) => {
                                            return (
                                                <option value={item.id} key={index}>
                                                    {item.serviceName}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className={count2 === 2 ? "col-lg-3 col-md-3 col-xs-auto" : "col-lg-4 col-md-4 col-xs-auto hidden"}>
                                <label className="form-label">
                                    <FormattedMessage id="manage-product.price" />
                                </label>
                                <input
                                    type="number"
                                    step={0.01}
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-control is-disabled" : "form-control"}
                                    name="price3"
                                    value={price3}
                                    onChange={(event) => { this.handleOnChangeInput(event, "price3") }}
                                />
                            </div>
                            <div className={count2 === 2 ? "col-lg-3 col-md-3 col-xs-auto" : "col-lg-4 col-md-4 col-xs-auto hidden"}>
                                <label className="form-label">
                                    <FormattedMessage id="manage-staff.staffName" />
                                    <i
                                        className={hiddenAdd === true ? "fa fa-times icon-close hidden" : "fa fa-times icon-close"}
                                        onClick={(event) => { this.handleRemoveService(event, "remove2") }}
                                    ></i>
                                </label>
                                <select
                                    name="staffId3"
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-select is-disabled" : "form-select"}
                                    value={staffId3}
                                    onChange={(event) => { this.handleOnChangeInput(event, "staffId3") }}
                                >
                                    <option value=""></option>
                                    {staffs.length === 0 &&
                                        <option>
                                            Data empty, please choose a date!
                                        </option>
                                    }
                                    {staffs && staffs.length > 0 &&
                                        staffs.map((item, index) => {
                                            return (
                                                <option value={item.id} key={index}>
                                                    {item.firstname} {item.lastname}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            {/* Add service */}

                            <div className={count2 === 2 && count1 !== 0 || hiddenAdd === true ? "col-lg-12 col-md-12 col-xs-auto hidden" : "col-lg-12 col-md-12 col-xs-auto"}>
                                <label className="form-label">
                                    <i
                                        className="fa fa-plus icon-plus"
                                        onClick={() => { this.handleAddService() }}
                                    >
                                        <FormattedMessage id="manage-order.addService" />
                                    </i>
                                </label>
                            </div>
                            <div className="col-lg-12 col-md-12 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-salary.note" />
                                </label>
                                <input
                                    type="text-aria"
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-control is-disabled" : "form-control"}
                                    name="note"
                                    value={note}
                                    onChange={(event) => { this.handleOnChangeInput(event, "note") }}
                                />
                            </div>
                            <div className="col-lg-3 col-md-3 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-order.discount" />
                                </label>
                                <input
                                    type="number"
                                    step={0.01}
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-control is-disabled" : "form-control"}
                                    name="discount"
                                    value={discount}
                                    onChange={(event) => { this.handleOnChangeInput(event, "discount") }}
                                />
                            </div>
                            <div className="col-lg-3 col-md-3 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-order.total" />
                                </label>
                                <input
                                    type="number"
                                    step={0.01}
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-control is-disabled" : "form-control"}
                                    name="total"
                                    value={total}
                                    onChange={(event) => { this.handleOnChangeInput(event, "total") }}
                                />
                            </div>
                            <div className="col-lg-3 col-md-3 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-order.cardPay" />
                                </label>
                                <input
                                    type="number"
                                    step={0.01}
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-control is-disabled" : "form-control"}
                                    name="cardPay"
                                    value={cardPay}
                                    onChange={(event) => { this.handleOnChangeInput(event, "cardPay") }}
                                />
                            </div>
                            <div className="col-lg-3 col-md-3 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-order.cashPay" />
                                </label>
                                <input
                                    type="number"
                                    step={0.01}
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-control is-disabled" : "form-control"}
                                    name="cashPay"
                                    value={cashPay}
                                    onChange={(event) => { this.handleOnChangeInput(event, "cashPay") }}
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
                    <TableManageBooking
                        handleEditBookingFromParent={this.handleEditBookingFromParent}
                        handleDetailBookingFromParent={this.handleDetailBookingFromParent}
                        currentPage={this.state.currentPage}
                    />
                </div>
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        customerRedux: state.user.users,
        staffRedux: state.user.staffs,
        themeRedux: state.service.themes,
        bookings: state.booking.bookings,
        serviceRedux: state.service.servicesWithType,
        userRedux: state.user.userInfo
        // isLoadingGender: state.user.isLoadingGender,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getThemeStart: () => dispatch(actions.fetchThemeStart()),
        serviceWithTypeRedux: (serviceType) => dispatch(actions.getServiceWithType(serviceType)),
        createNewBooking: (data) => dispatch(actions.createNewBooking(data)),
        editBookingRedux: (data) => dispatch(actions.editBooking(data)),
        fetchCustomerRedux: (isMenuCus, customerPage) => dispatch(actions.fetchAllUsersStart(isMenuCus, customerPage)),
        fetchStaffWorkingRedux: (date) => dispatch(actions.fetchAllStaffsWorkingStart(date)),
        fetchBookingsRedux: (currentPage) => dispatch(actions.fetchAllBookingsStart(currentPage))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingManage);
