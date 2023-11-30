import React, { Component, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
// import { emitter } from '../../utils/emitter';
import * as actions from '../../store/actions';
import { CRUD_ACTIONS } from "../../utils";
import TableRestSchedule from './TableRestSchedule';

class RestSchedule extends Component {
    /*  Life cycle
    * Run component
    * 1. Run construc -> init state
    * 2. Did mount (set state)
    * 3. Render
    * */

    constructor(props) {
        super(props);
        this.state = {
            staffId: '', date: '', note: '', dateStart: '', dateEnd: '',
            isDisabled: true,
            arrInput: [],
            staffArr: [],
            arrDate: [],
            // selectedItems: [],
            // setSelectedItems: [],
            // arrTimeType: [],
            currentPage: 1,
            pageStaff: 0,
            isMenu: "STAFF",
            actions: CRUD_ACTIONS.CREATE
        }
    }

    async componentDidMount() {
        this.props.getTimeTypeStart();
        this.props.fetchUserRedux(this.state.isMenu, this.state.pageStaff);
    }

    handleCancel = () => {
        this.setState({
            staffId: this.state.staffId, date: '', note: '',
            actions: CRUD_ACTIONS.CREATE
        })
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        if (copyState['dateStart'] !== this.state.dateStart) {
            if (this.state.dateEnd !== "") {
                let startDate = new Date(copyState['dateStart']);
                let endDate = new Date(this.state.dateEnd);
                let date = [];

                while (startDate <= endDate) {
                    date.push(startDate.toLocaleDateString("en-US"));
                    startDate.setDate(startDate.getDate() + 1);
                }

                copyState['arrDate'] = date;
                copyState['isDisabled'] = 'false'
            }
        }
        this.setState({
            ...copyState
        });
    }


    checkValidateInput = () => {
        let isValid = true;
        let arrInput = [
            'staffId', 'date'
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

    handleSaveSchedule = async (e) => {
        try {
            let isValid = this.checkValidateInput();
            if (isValid === true) {
                let { actions } = this.state;
                let userIdCreate = this.props.userInfo.id;
                if (actions === CRUD_ACTIONS.CREATE) {
                    this.props.createNewSchedule({
                        userIdCreate: userIdCreate,
                        staffId: this.state.staffId,
                        date: this.state.date,
                        // timeType: this.state.timeType,
                        note: this.state.note,
                        currentPage: 1,
                        action: 1
                    })
                }
                if (actions === CRUD_ACTIONS.EDIT) {
                    this.props.editScheduleRedux({
                        id: this.state.id,
                        staffId: this.state.staffId,
                        date: this.state.date,
                        // timeType: this.state.timeType,
                        note: this.state.note,
                        page: this.state.page,
                        action: 1
                    })
                }
            }

        } catch (e) {
            console.log(e);
        }
    }

    handleEditScheduleFromParent = (schedule, currentPage) => {
        this.setState({
            id: schedule.id,
            staffId: schedule.staffId,
            date: schedule.date,
            // timeType: schedule.timeType,
            note: schedule.note,
            actions: CRUD_ACTIONS.EDIT,
            page: currentPage
        })
    }

    handleSelectedRestDate = async (e) => {

        let isSelected = e.target.checked;
        let value = e.target.value;
        console.log("selected", isSelected)
        console.log("value", value)

    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        //after run render => run didUpdate
        if (prevProps.staffRedux !== this.props.staffRedux) {
            let arrStaff = this.props.staffRedux.users;
            let staffId = arrStaff && arrStaff.length > 0 ? arrStaff[0].id : '';
            this.setState({
                staffArr: arrStaff,
                staffId: staffId
            })
        }
        // if (prevProps.timeTypeRedux !== this.props.timeTypeRedux) {
        //     let arrTimeType = this.props.timeTypeRedux;
        //     let timeType = arrTimeType && arrTimeType.length > 0 ? arrTimeType[0].key : '';
        //     this.setState({
        //         arrTimeType: arrTimeType,
        //         timeType: timeType
        //     })
        // }
        if (prevProps.scheduleRedux !== this.props.scheduleRedux) {
            this.setState({
                staffId: this.state.staffId,
                date: '',
                // timeType: this.state.timeType,
                note: '',
                actions: CRUD_ACTIONS.CREATE
            })
        }
    }

    render() {
        let staffs = this.state.staffArr;
        // let timeTypes = this.state.arrTimeType;
        // // let isLoadingGender = this.props.isLoadingGender;
        let { staffId, isDisabled, note, actions, dateStart, dateEnd, arrDate }
            = this.state;
        console.log(arrDate)
        return (
            <div className="overflow-auto user-redux-container">
                <div className="title py-3">
                    <FormattedMessage id="manage-staff.header-schedule" />
                </div>
                <div className="user-redux-body">
                    <div className="container">
                        <form className="row g-3">
                            {/* <div className="col-12">{isLoadingGender ? 'Loading genders' : ''}</div> */}
                            <div className="col-lg-4 col-md-4 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-staff.staffName" />
                                </label>
                                <select
                                    name="staffId"
                                    className="form-select"
                                    value={staffId}
                                    onChange={(event) => { this.handleOnChangeInput(event, "staffId") }}
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
                            {/* <div className="col-lg-4 col-md-4 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-staff.restDate" />
                                </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="date"
                                    value={date}
                                    onChange={(event) => { this.handleOnChangeInput(event, "date") }}
                                />
                            </div> */}
                            <div className="col-lg-4 col-md-4 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-salary.startDay" />
                                </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="dateStart"
                                    value={dateStart}
                                    onChange={(event) => { this.handleOnChangeInput(event, "dateStart") }}
                                />
                            </div>
                            <div className="col-lg-4 col-md-4 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-salary.endDay" />
                                </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="dateEnd"
                                    value={dateEnd}
                                    onChange={(event) => { this.handleOnChangeInput(event, "dateEnd") }}
                                />
                            </div>
                            <div aria-disabled={isDisabled} className='col-lg-4 col-md-4 col-xs-auto'>
                                {arrDate && arrDate.length > 0 &&
                                    arrDate.map(async (item, index) => {
                                        return (
                                            // <div key={index}>
                                            <input type="checkbox"
                                                name='restDate'
                                                checked
                                                value={item}
                                                onChange={(event) => { this.handleSelectedRestDate(event, "restDate") }}
                                            />
                                            // <span>{item}</span>
                                            // </div>
                                        )
                                    }
                                    )}
                            </div>
                            {/* <div className="col-lg-4 col-md-4 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-staff.timeType" />
                                </label>
                                <select
                                    name="timeType"
                                    className="form-select"
                                    value={timeType}
                                    onChange={(event) => { this.handleOnChangeInput(event, "timeType") }}
                                >
                                    <option></option>
                                    {timeTypes && timeTypes.length > 0 &&
                                        timeTypes.map((item, index) => {
                                            return (
                                                <option value={item.key} key={index}>
                                                    {language === LANGUAGES.VI ? item.valueVI : item.valueEN}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div> */}
                            <div className="col-lg-12 col-md-12 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-product.description" />
                                </label>
                                <input
                                    type="text-aria"
                                    className="form-control"
                                    name="note"
                                    value={note}
                                    onChange={(event) => { this.handleOnChangeInput(event, "note") }}
                                />
                            </div>
                            <div className="col-12 my-3">
                                <button
                                    type="button"
                                    className={actions === CRUD_ACTIONS.CREATE ?
                                        "btn btn-primary px-3" : "btn btn-warning px-3"}
                                    onClick={() => { this.handleSaveSchedule() }}
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
                    <TableRestSchedule
                        handleEditScheduleFromParent={this.handleEditScheduleFromParent}
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
        userInfo: state.user.userInfo,
        timeTypeRedux: state.schedule.timeTypes,
        scheduleRedux: state.schedule.schedules,
        staffRedux: state.user.users
        // isLoadingGender: state.user.isLoadingGender,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTimeTypeStart: () => dispatch(actions.fetchTimeTypeStart()),
        createNewSchedule: (data) => dispatch(actions.createNewSchedule(data)),
        editScheduleRedux: (data) => dispatch(actions.editSchedule(data)),
        fetchUserRedux: (isMenu, pageStaff) => dispatch(actions.fetchAllUsersStart(isMenu, pageStaff)),
        fetchSchedulesRedux: (currentPage) => dispatch(actions.fetchAllSchedulesStart(currentPage))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RestSchedule);
