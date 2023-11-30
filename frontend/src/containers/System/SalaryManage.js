import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import moment from 'moment';
// import { emitter } from '../../utils/emitter';
import * as actions from '../../store/actions';
import { LANGUAGES, CRUD_ACTIONS } from "../../utils";
import TableManageSalary from './TableManageSalary';
import { startCase } from 'lodash';

class SalaryManage extends Component {
    /*  Life cycle
    * Run component
    * 1. Run construc -> init state
    * 2. Did mount (set state)
    * 3. Render
    * */

    constructor(props) {
        super(props);
        this.state = {
            startDate: '', endDate: '', staffId: '', tax: '', receivedCard: '', receivedCash: '',
            total: '', totalCash: '', totalCard: '', note: '', receivedStaff: '', receivedStore: '',
            receivedByCardAfterTax: '', bonus: '',
            arrInput: [],
            userEdit: {},
            isMenu: "STAFF",
            pageStaff: 0,
            disabledInfo: false,
            disabled: true,
            currentPage: 1,
            staffArr: [],
            actions: CRUD_ACTIONS.CREATE,

        }
    }

    async componentDidMount() {
        await this.props.fetchStaffRedux(this.state.isMenu, this.state.pageStaff);
    }

    handleCancel = () => {
        this.setState({
            startDate: '', endDate: '', staffId: '', tax: '', receivedCard: '', receivedCash: '',
            total: '', totalCash: '', totalCard: '', note: '', receivedStaff: '', receivedStore: '',
            receivedByCardAfterTax: '', bonus: '', staffName: '',
            actions: CRUD_ACTIONS.CREATE, disabledInfo: false,
        })
    }

    handleOnChangeInput = async (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        try {
            if (this.state.startDate !== copyState['startDate']) {
                if (copyState['startDate'] !== "") {
                    this.setState({
                        startDate: moment(copyState['startDate']).format("YYYY-MM-DD")
                    });
                } else {
                    this.setState({
                        startDate: copyState['startDate']
                    });
                }
                let startDate = copyState['startDate'];
                // await this.props.getTaxNow(startDate);
                // let tax = this.props.taxRedux;
                // if (tax.length === 0) {
                //     alert("Please, add a new tax suitable for the time!")
                // } else if (parseFloat(tax) !== 0) {
                //     copyState['tax'] = tax;
                // }
            }
            if (this.state.endDate !== copyState['endDate']) {
                if (copyState['endDate'] !== "") {
                    this.setState({
                        endDate: moment(copyState['endDate']).format("YYYY-MM-DD")
                    });
                } else {
                    this.setState({
                        endDate: copyState['endDate']
                    });
                }
                if (copyState['endDate'] <= this.state.startDate) {
                    copyState['endDate'] = "";
                    alert("The end date must be after the start date!")
                }
            }
            if (this.state.staffName !== copyState['staffName']) {
                if (this.state.startDate !== "" && this.state.endDate !== "") {
                    await this.props.getBookingSalary(this.state.startDate, this.state.endDate, copyState['staffName']);
                    let totalCard = this.props.bookingSala.totalCard;
                    let totalCash = this.props.bookingSala.totalCash;
                    let total = this.props.bookingSala.total;
                    let receivedStaff = this.props.bookingSala.receivedStaff;
                    let receivedStore = this.props.bookingSala.receivedStore;
                    copyState['totalCard'] = totalCard.toFixed(2);
                    copyState['totalCash'] = totalCash.toFixed(2);
                    copyState['total'] = total.toFixed(2);
                    copyState['receivedStore'] = receivedStore.toFixed(2);
                    copyState['receivedStaff'] = receivedStaff.toFixed(2);
                }
            }
            if (this.state.receivedCard !== copyState['receivedCard']) {
                let received = parseFloat(copyState['receivedCard']) + parseFloat(copyState['receivedCash']);
                if (parseFloat(copyState['receivedCard']) > parseFloat(this.state.receivedStaff) ||
                    parseFloat(received) > parseFloat(this.state.receivedStaff)) {
                    copyState['receivedCard'] = '';
                    copyState['receivedByCardAfterTax'] = '';
                    alert("The amount received exceeds the total. Please, Enter a avalid amount!")
                } else {
                    let card = parseFloat(copyState['receivedCard']);
                    let tax = 0;
                    if (this.state.tax !== "") {
                        tax = parseFloat(this.state.tax);
                    }
                    let receivedByCardAfterTax = parseFloat(card) - (parseFloat(card) * (parseFloat(tax) / 100));
                    copyState['receivedByCardAfterTax'] = parseFloat(receivedByCardAfterTax).toFixed(2);
                }
            }
            if (this.state.tax !== copyState['tax']) {
                let tax = 0.00;
                if (copyState['tax'] !== "") {
                    tax = parseFloat(copyState['tax']);
                }
                let card = parseFloat(copyState['receivedCard']);
                let receivedByCardAfterTax = card - card * tax / 100;
                copyState['receivedByCardAfterTax'] = parseFloat(receivedByCardAfterTax).toFixed(2);
            }
            if (this.state.receivedCash !== copyState['receivedCash']) {
                let received = parseFloat(copyState['receivedCard']) + parseFloat(copyState['receivedCash']);
                if (parseFloat(copyState['receivedCash']) > parseFloat(this.state.receivedStaff) ||
                    parseFloat(received) > parseFloat(this.state.receivedStaff)) {
                    copyState['receivedCash'] = '';
                    alert("The amount received exceeds the total. Please, Enter a valid amount!")
                }
            }
            if (this.state.bonus !== copyState['bonus']) {
                if (parseFloat(copyState['bonus']) > parseFloat(this.state.receivedStaff)) {
                    copyState['bonus'] = '';
                    alert("The amount received exceeds the total. Please, Enter a valid amount!")
                } else {
                    let receivedStaff = this.props.bookingSala.receivedStaff.toFixed(2);
                    let receivedStore = this.props.bookingSala.receivedStore.toFixed(2);
                    if (copyState['bonus'] !== "") {
                        receivedStore = parseFloat(receivedStore) - parseFloat(copyState['bonus']);
                        receivedStaff = parseFloat(receivedStaff) + parseFloat(copyState['bonus']);
                    }
                    copyState['receivedStaff'] = parseFloat(receivedStaff).toFixed(2);
                    copyState['receivedStore'] = parseFloat(receivedStore).toFixed(2);

                }
            }
        } catch (e) {
            console.log(e);
        }
        this.setState({
            ...copyState
        });
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = [
            'startDate', 'endDate', 'staffName', 'totalCard', 'totalCash',
            'receivedStore', 'receivedStaff',
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

    handleSaveSalary = async (e) => {
        try {
            let cash = parseFloat(this.state.receivedStaff) - parseFloat(this.state.receivedCard);
            this.setState({
                receivedCash: cash
            })
            let isValid = this.checkValidateInput();
            // console.log(this.state)
            let { startDate, endDate, staffName, totalCard, totalCash, tax,
                receivedStore, receivedStaff, receivedCash, receivedCard, note,
                receivedByCardAfterTax, bonus, actions } = this.state;
            // if (parseFloat(receivedCash) + parseFloat(receivedCard) !== parseFloat(receivedStaff)) {
            //     alert("Please choose the number money need your payment suitably!")
            // }
            if (isValid === true) {
                if (receivedCard === "") { receivedCard = 0; }
                if (receivedCash === "") { receivedCash = 0; }
                if (totalCard === "") { totalCard = 0; }
                if (totalCash === "") { totalCash = 0; }
                if (bonus === "") { bonus = 0; }
                if (tax === "") { tax = 0; }
                if (receivedByCardAfterTax === "") { receivedByCardAfterTax = 0; }
                if (actions === CRUD_ACTIONS.CREATE) {
                    let userIdCreate = this.props.userRedux.id;
                    await this.props.createNewSalary({
                        userIdCreate: userIdCreate,
                        staffId: staffName,
                        tax: parseFloat(tax),
                        cardTotal: parseFloat(totalCard),
                        cashTotal: parseFloat(totalCash),
                        bonus: parseFloat(bonus),
                        receivedByCard: parseFloat(receivedCard),
                        receivedByCash: parseFloat(receivedCash),
                        receivedStore: parseFloat(receivedStore),
                        receivedStaff: parseFloat(receivedStaff),
                        receivedAfterTax: parseFloat(receivedByCardAfterTax),
                        dateStart: startDate,
                        dateEnd: endDate,
                        note: note,
                        action: 1,
                        currentPage: 1
                    })
                }
                if (actions === CRUD_ACTIONS.EDIT) {
                    await this.props.editSalaryRedux({
                        id: this.state.id,
                        staffId: staffName,
                        tax: parseFloat(tax),
                        cardTotal: parseFloat(totalCard),
                        cashTotal: parseFloat(totalCash),
                        bonus: parseFloat(bonus),
                        receivedByCard: parseFloat(receivedCard),
                        receivedByCash: parseFloat(receivedCash),
                        receivedStore: parseFloat(receivedStore),
                        receivedStaff: parseFloat(receivedStaff),
                        receivedAfterTax: parseFloat(receivedByCardAfterTax),
                        dateStart: startDate,
                        dateEnd: endDate,
                        note: note,
                        action: 1,
                        page: this.state.currentPage
                    })
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    handleEditSalaryFromParent = async (salary, currentPage) => {
        let staffArr = await this.props.staffRedux.users;
        this.setState({
            id: salary.id,
            staffName: salary.staffId,
            tax: salary.tax,
            totalCard: salary.cardTotal,
            totalCash: salary.cashTotal,
            bonus: salary.bonus,
            total: parseFloat(salary.cardTotal) + parseFloat(salary.cashTotal),
            receivedCard: salary.receivedByCard,
            receivedCash: salary.receivedByCash,
            receivedStore: salary.receivedStore,
            receivedStaff: salary.receivedStaff,
            receivedByCardAfterTax: salary.receivedAfterTax,
            startDate: salary.dateStart,
            endDate: salary.dateEnd,
            note: salary.note,
            disabledInfo: false,
            actions: CRUD_ACTIONS.EDIT,
            currentPage: currentPage,
            staffArr: staffArr
        })
    }

    handleDetailSalaryFromParent = async (salary, currentPage) => {
        let staffArr = await this.props.staffRedux.users;
        console.log(salary)
        this.setState({
            id: salary.id,
            customerId: salary.customerId,
            staffName: salary.staffId,
            tax: salary.tax,
            totalCard: salary.cardTotal,
            totalCash: salary.cashTotal,
            bonus: salary.bonus,
            total: parseFloat(salary.cardTotal) + parseFloat(salary.cashTotal),
            receivedCard: salary.receivedByCard,
            receivedCash: salary.receivedByCash,
            receivedStore: salary.receivedStore,
            receivedStaff: salary.receivedStaff,
            receivedByCardAfterTax: salary.receivedAfterTax,
            startDate: salary.dateStart,
            endDate: salary.dateEnd,
            note: salary.note,
            actions: CRUD_ACTIONS.CREATE,
            page: currentPage,
            disabledInfo: true,
            staffArr: staffArr
        })
    }

    componentDidUpdate = async (prevProps, prevState, snapshot) => {
        //after run render => run didUpdate
        if (prevProps.staffRedux !== this.props.staffRedux) {
            let arrStaff = this.props.staffRedux.users;
            this.setState({
                staffArr: arrStaff
            })
        }
        if (prevProps.salary !== this.props.salary) {
            this.setState({
                startDate: '', endDate: '', staffId: '', tax: '', receivedCard: '', receivedCash: '',
                total: '', totalCash: '', totalCard: '', note: '', receivedStaff: '', receivedStore: '',
                receivedByCardAfterTax: '', bonus: '', staffName: '',
                actions: CRUD_ACTIONS.CREATE,
                disabledInfo: false,
            })
        }
    }

    render() {
        let language = this.props.language;
        let staffs = this.state.staffArr;
        let {
            startDate, endDate, staffName, totalCard, totalCash, tax, receivedStore,
            receivedStaff, receivedCash, receivedCard, note, actions, disabled, total,
            receivedByCardAfterTax, bonus, disabledInfo
        }
            = this.state;
        // // let isLoadingGender = this.props.isLoadingGender;
        return (
            <div className="overflow-auto user-redux-container">
                <div className="title py-3">
                    <FormattedMessage id="menu.admin.manage-staff.salary-staff" />
                </div>
                <div className="user-redux-body">
                    <div className="container">
                        <form className="row g-3">
                            <div className="col-lg-3 col-md-3 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-salary.startDay" />
                                </label>
                                <input
                                    type="date"
                                    aria-disabled={disabledInfo}
                                    className={disabledInfo === true ? "form-control is-disabled" : "form-control"}
                                    name="startDate"
                                    value={startDate}
                                    onChange={(event) => { this.handleOnChangeInput(event, "startDate") }}
                                />
                            </div>
                            <div className="col-lg-3 col-md-3 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-salary.endDay" />
                                </label>
                                <input
                                    type="date"
                                    aria-disabled={disabledInfo}
                                    className={disabledInfo === true ? "form-control is-disabled" : "form-control"}
                                    name="endDate"
                                    value={endDate}
                                    onChange={(event) => { this.handleOnChangeInput(event, "endDate") }}
                                />
                            </div>
                            <div className="col-lg-3 col-md-3 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-staff.staffName" />
                                </label>
                                <select
                                    name="staffName"
                                    aria-disabled={disabledInfo}
                                    className={disabledInfo === true ? "form-select is-disabled" : "form-select"}
                                    value={staffName}
                                    onChange={(event) => { this.handleOnChangeInput(event, "staffName") }}
                                >
                                    <option></option>
                                    {staffs.length === 0 &&
                                        <option>
                                            Data empty, please add a new data!
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
                            <div className="col-lg-3 col-md-3 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-salary.total" />
                                </label>
                                <input
                                    type="text"
                                    disabled
                                    className="form-control"
                                    name="total"
                                    value={total}
                                />
                            </div>
                            <div className="col-lg-3 col-md-3 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-salary.totalCard" />
                                </label>
                                <input
                                    type="text"
                                    disabled
                                    className="form-control"
                                    name="totalCard"
                                    value={totalCard}
                                />
                            </div>
                            <div className="col-lg-3 col-md-3 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-salary.totalCash" />
                                </label>
                                <input
                                    type="text"
                                    disabled
                                    className="form-control"
                                    name="totalCash"
                                    value={totalCash}
                                />
                            </div>
                            <div className="col-lg-3 col-md-3 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-salary.bonus" />
                                </label>
                                <input
                                    type="number"
                                    step={0.01}
                                    aria-disabled={disabledInfo}
                                    className={disabledInfo === true ? "form-control is-disabled" : "form-control"}
                                    name="bonus"
                                    value={bonus}
                                    onChange={(event) => { this.handleOnChangeInput(event, "bonus") }}
                                />
                            </div>
                            <div className="col-lg-3 col-md-3 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-salary.receivedStore" />
                                </label>
                                <input
                                    type="text"
                                    disabled
                                    className="form-control"
                                    name="receivedStore"
                                    value={receivedStore}
                                />
                            </div>
                            <div className="col-lg-3 col-md-3 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-salary.receivedStaff" />
                                </label>
                                <input
                                    type="text"
                                    disabled
                                    className="form-control"
                                    name="receivedStaff"
                                    value={receivedStaff}
                                />
                            </div>
                            <div className="col-lg-3 col-md-3 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-salary.receivedCard" />
                                </label>
                                <input
                                    type="number"
                                    step={0.01}
                                    aria-disabled={disabledInfo}
                                    className={disabledInfo === true ? "form-control is-disabled" : "form-control"}
                                    name="receivedCard"
                                    value={receivedCard}
                                    onChange={(event) => { this.handleOnChangeInput(event, "receivedCard") }}
                                />
                            </div>
                            <div className="col-lg-3 col-md-3 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-salary.tax" />
                                </label>
                                <input
                                    type="number"
                                    aria-disabled={disabledInfo}
                                    className={disabledInfo === true ? "form-control is-disabled" : "form-control"}
                                    name="tax"
                                    value={tax}
                                    onChange={(event) => { this.handleOnChangeInput(event, "tax") }}
                                />
                            </div>
                            <div className="col-lg-3 col-md-3 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-salary.receivedCash" />
                                </label>
                                <input
                                    type="number"
                                    step={0.01}
                                    aria-disabled={disabledInfo}
                                    className={disabledInfo === true ? "form-control is-disabled" : "form-control"}
                                    name="receivedCash"
                                    value={receivedCash}
                                    onChange={(event) => { this.handleOnChangeInput(event, "receivedCash") }}
                                />
                            </div>
                            <div className="col-lg-3 col-md-3 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-salary.staffReceivedAfterTax" />
                                </label>
                                <input
                                    type="number"
                                    disabled
                                    className="form-control"
                                    name="receivedByCardAfterTax"
                                    value={receivedByCardAfterTax}
                                />
                            </div>
                            <div className="col-lg-9 col-md-9 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-salary.note" />
                                </label>
                                <input
                                    type="text"
                                    aria-disabled={disabledInfo}
                                    className={disabledInfo === true ? "form-control is-disabled" : "form-control"}
                                    name="note"
                                    value={note}
                                    onChange={(event) => { this.handleOnChangeInput(event, "note") }}
                                />
                            </div>
                            <div className="col-12 my-3">
                                <button
                                    type="button"
                                    aria-disabled={disabledInfo === true ? "true" : "false"}
                                    className={actions === CRUD_ACTIONS.CREATE ?
                                        "btn btn-primary px-3" : "btn btn-warning px-3"}
                                    onClick={() => { this.handleSaveSalary() }}
                                >
                                    {actions === CRUD_ACTIONS.CREATE ?
                                        <FormattedMessage id="manage-user.save" />
                                        :
                                        <FormattedMessage id="manage-user.edit" />
                                    }
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary px-3 mx-2"
                                    onClick={() => { this.handleCancel() }}
                                >
                                    <FormattedMessage id="manage-user.cancel" />
                                </button>
                            </div>
                        </form>
                    </div>
                    <TableManageSalary
                        handleEditSalaryFromParent={this.handleEditSalaryFromParent}
                        handleDetailSalaryFromParent={this.handleDetailSalaryFromParent}
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
        staffRedux: state.user.users,
        salary: state.salary.salary,
        userRedux: state.user.userInfo,
        taxRedux: state.tax.taxNow,
        bookingSala: state.booking.bookingSala
        // isLoadingGender: state.user.isLoadingGender,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTaxNow: (startDate) => dispatch(actions.getTaxNowStart(startDate)),
        getBookingSalary: (startDate, endDate, staffId) => dispatch(actions.getBookingSalaryStart(startDate, endDate, staffId)),
        createNewSalary: (data) => dispatch(actions.createNewSalary(data)),
        editSalaryRedux: (data) => dispatch(actions.editSalary(data)),
        fetchStaffRedux: (isMenu, pageStaff) => dispatch(actions.fetchAllUsersStart(isMenu, pageStaff)),
        fetchSalarysRedux: (currentPage) => dispatch(actions.fetchAllSalaryStart(currentPage))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SalaryManage);
