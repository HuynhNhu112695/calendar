import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from '../store/actions';
import { LANGUAGES, CRUD_ACTIONS } from "../utils";
import './Home.scss';
import ManageDeadlineToday from "../containers/System/ManageDeadlineToday";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            totalStaff: '',
            sovanban: '', ngayphathanh: '', donviphathanh: '', trichyeunoidung: '',
            action: 1, chutheyeucau: '', nguoithuchien: '', noidungyeucau: '',
            nhactruoc: '', douutien: '', trangthai: '', ngaynhac: '',
            hiddenAdd: false, disabaled: false, tieude: '',
            disabledDetail: false,
            arrInput: [],
            arrUsers: [],
            userEdit: {},
            disabaled: false,
            currentPage: 1,
            actions: CRUD_ACTIONS.CREATE,
        }
    }

    async componentDidMount() {
        if (this.props.isLoggedIn) {
            this.props.fetchDeadlineToday(this.state.currentPage, this.props.userRedux.id, "");
        }
    }

    handleCancel = () => {
        this.setState({
            sovanban: '', ngayphathanh: '', donviphathanh: '', trichyeunoidung: '',
            action: 1, chutheyeucau: '', nguoithuchien: '', noidungyeucau: '',
            nhactruoc: '', douutien: '', trangthai: '', ngaynhac: '',
            hiddenAdd: false, tieude: '', disabledDetail: false,
            arrInput: [],
            disabled: false,
            actions: CRUD_ACTIONS.CREATE
        })
    }

    handleOnChangeInput = async (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['nguoithuchien', 'noidungyeucau', 'ngaynhac'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Vui lòng nhập ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleSaveUser = async (e) => {
        try {
            let isValid = this.checkValidateInput();
            if (isValid === true) {
                let { actions } = this.state;
                let userIdCreate = this.props.userRedux.id;
                if (actions === CRUD_ACTIONS.EDIT) {
                    await this.props.editCalendarRedux({
                        id: this.state.id,
                        idcongviec: this.state.idcongviec,
                        sovanban: this.state.sovanban,
                        ngayphathanh: this.state.ngayphathanh,
                        donviphathanh: this.state.donviphathanh,
                        trichyeunoidung: this.state.trichyeunoidung,
                        chutheyeucau: this.state.chutheyeucau,
                        nguoithuchien: this.state.nguoithuchien,
                        trangthai: this.state.trangthai,
                        noidungyeucau: this.state.noidungyeucau,
                        nhactruoc: this.state.nhactruoc,
                        douutien: this.state.douutien,
                        ngaynhac: this.state.ngaynhac,
                        userIdCreate: userIdCreate,
                        tieude: this.state.tieude,
                        currentPage: this.state.page
                    })
                }
            }

        } catch (e) {
            console.log(e);
        }
    }

    handleEditDeadlineFromParent = async (work, currentPage) => {
        await document.getElementById("sovanban").focus();
        await this.setState({
            id: work.id,
            idcongviec: work.idcongviec,
            sovanban: work.dataCalendar.sovanban,
            ngayphathanh: work.dataCalendar.ngayphathanh,
            donviphathanh: work.dataCalendar.donviphathanh,
            trichyeunoidung: work.dataCalendar.trichyeunoidung,
            chutheyeucau: work.dataCalendar.chutheyeucau,
            nguoithuchien: work.dataCalendar.nguoithuchien,
            trangthai: work.trangthai,
            noidungyeucau: work.dataCalendar.noidungyeucau,
            nhactruoc: work.dataCalendar.nhactruoc,
            douutien: work.dataCalendar.douutien,
            chukylap: work.chukylap,
            tieude: work.tieude,
            ngaynhac: work.ngaylap,
            disabled: false,
            disabledDetail: true,
            actions: CRUD_ACTIONS.EDIT,
            page: currentPage
        })
    }

    handleDetailDeadlineFromParent = async (work, currentPage) => {
        await document.getElementById("sovanban").focus();
        await this.setState({
            id: work.id,
            sovanban: work.dataCalendar.sovanban,
            ngayphathanh: work.dataCalendar.ngayphathanh,
            donviphathanh: work.dataCalendar.donviphathanh,
            trichyeunoidung: work.dataCalendar.trichyeunoidung,
            chutheyeucau: work.dataCalendar.chutheyeucau,
            nguoithuchien: work.dataCalendar.nguoithuchien,
            trangthai: work.trangthai,
            noidungyeucau: work.dataCalendar.noidungyeucau,
            nhactruoc: work.dataCalendar.nhactruoc,
            douutien: work.dataCalendar.douutien,
            chukylap: work.chukylap,
            ngaynhac: work.ngaylap,
            tieude: work.tieude,
            disabledDetail: true,
            disabled: true,
            actions: CRUD_ACTIONS.EDIT,
            page: currentPage
        })
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        //after run render => run didUpdate 
        if (prevProps.calendarDead !== this.props.calendarDead) {
            this.setState({
                sovanban: '', ngayphathanh: '', donviphathanh: '', trichyeunoidung: '',
                action: 1, chutheyeucau: '', nguoithuchien: '', noidungyeucau: '',
                nhactruoc: '', douutien: '', trangthai: '', nhaclai: '', ngaynhac: '',
                hiddenAdd: false, tieude: '',
                arrInput: [],
                arrUsers: [],
                userEdit: {},
                disabaled: false,
                currentPage: 1,
                actions: CRUD_ACTIONS.CREATE
            })
        }
    }

    render() {
        const { isLoggedIn } = this.props;
        let linkToRedirect = isLoggedIn ? '/' : '/login';
        let { sovanban, ngayphathanh, donviphathanh, trichyeunoidung,
            chutheyeucau, noidungyeucau, nguoithuchien, nhactruoc, douutien,
            ngaynhac, disabled, trangthai, actions, tieude
        } = this.state;
        return (
            <div className="overflow-auto user-redux-container">
                <Redirect to={linkToRedirect} />
                <div className='title text-title text-center'><FormattedMessage id="common.titleHome" /></div>
                <div className="title py-3">
                    Công việc đến hạn trong ngày
                </div>
                <div className="user-redux-body">
                    <div className={actions === CRUD_ACTIONS.EDIT ? "container" : "container hidden"}>
                        <form className="row g-3">
                            {/* <div className="col-12">{isLoadingGender ? 'Loading genders' : ''}</div> */}
                            <div className="col-lg-3 col-md-3 col-xs-auto">
                                <label className="form-label">
                                    Số Văn Bản
                                </label>
                                <input
                                    type="text"
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-control is-disabled" : "form-control"}
                                    name="sovanban"
                                    id="sovanban"
                                    value={sovanban}
                                    onChange={(event) => { this.handleOnChangeInput(event, "sovanban") }}
                                />
                            </div>
                            <div className="col-lg-3 col-md-3 col-xs-auto">
                                <label className="form-label">
                                    Ngày phát hành
                                </label>
                                <input
                                    type="date"
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-control is-disabled" : "form-control"}
                                    name="ngayphathanh"
                                    value={ngayphathanh}
                                    onChange={(event) => { this.handleOnChangeInput(event, "ngayphathanh") }}
                                />
                            </div>
                            <div className="col-lg-6 col-md-6 col-xs-auto">
                                <label className="form-label">
                                    Đơn vị phát hành
                                </label>
                                <input
                                    type="text"
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-control is-disabled" : "form-control"}
                                    name="donviphathanh"
                                    value={donviphathanh}
                                    onChange={(event) => { this.handleOnChangeInput(event, "donviphathanh") }}
                                />
                            </div>

                            <div className="col-lg-12 col-md-12 col-xs-auto">
                                <label className="form-label">
                                    Trích yếu nội dung
                                </label>
                                <textarea
                                    type="text"
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-control is-disabled" : "form-control"}
                                    name="trichyeunoidung"
                                    value={trichyeunoidung}
                                    onChange={(event) => { this.handleOnChangeInput(event, "trichyeunoidung") }}
                                ></textarea>
                            </div>
                            <div className="col-lg-4 col-md-4 col-xs-auto">
                                <label className="form-label">
                                    Đơn vị yêu cầu
                                </label>
                                <input
                                    type="text"
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-control is-disabled" : "form-control"}
                                    name="chutheyeucau"
                                    value={chutheyeucau}
                                    onChange={(event) => { this.handleOnChangeInput(event, "chutheyeucau") }}
                                />
                            </div>
                            <div className="col-lg-4 col-md-4 col-xs-auto">
                                <label className="form-label">
                                    Người thực hiện
                                </label>
                                <input
                                    type="text"
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-control is-disabled" : "form-control"}
                                    name="nguoithuchien"
                                    value={nguoithuchien}
                                    onChange={(event) => { this.handleOnChangeInput(event, "nguoithuchien") }}
                                />
                            </div>
                            <div className="col-lg-4 col-md-4 col-xs-auto">
                                <label className="form-label">
                                    Nhắc trước (số ngày)
                                </label>
                                <input
                                    type="number"
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-control is-disabled" : "form-control"}
                                    name="nhactruoc"
                                    value={nhactruoc}
                                    onChange={(event) => { this.handleOnChangeInput(event, "nhactruoc") }}
                                />
                            </div>
                            <div className="col-lg-12 col-md-12 col-xs-auto">
                                <label className="form-label">
                                    Nội dung yêu cầu
                                </label>
                                <textarea
                                    type="text"
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-control is-disabled" : "form-control"}
                                    name="noidungyeucau"
                                    value={noidungyeucau}
                                    onChange={(event) => { this.handleOnChangeInput(event, "noidungyeucau") }}
                                ></textarea>
                            </div>
                            <div className="col-lg-4 col-md-4 col-xs-auto">
                                <label className="form-label">
                                    Độ ưu tiên
                                </label>
                                <select
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-select is-disabled" : "form-select"}
                                    name="douutien"
                                    value={douutien}
                                    onChange={(event) => { this.handleOnChangeInput(event, "douutien") }}
                                >
                                    <option></option>
                                    <option value={0}>Quan trọng</option>
                                    <option value={1}>Thông thường</option>
                                </select>
                            </div>
                            <div className="col-lg-4 col-md-4 col-xs-auto">
                                <label className="form-label">
                                    Ngày hết hạn
                                </label>
                                <input
                                    type="date"
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-control is-disabled" : "form-control"}
                                    name="ngaynhac"
                                    value={ngaynhac}
                                    onChange={(event) => { this.handleOnChangeInput(event, "ngaynhac") }}
                                />
                            </div>
                            <div className="col-lg-4 col-md-4 col-xs-auto">
                                <label className="form-label">
                                    Trạng Thái
                                </label>
                                <select
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-select is-disabled" : "form-select"}
                                    name="trangthai"
                                    value={trangthai}
                                    onChange={(event) => { this.handleOnChangeInput(event, "trangthai") }}
                                >
                                    <option></option>
                                    <option value={0}>Đang thực hiện</option>
                                    <option value={1}>Đã hoàn thành</option>
                                </select>
                            </div>
                            <div className="col-lg-12 col-md-12 col-xs-auto">
                                <label className="form-label">
                                    Tiêu đề nhắc việc
                                </label>
                                <input type="text" name='tieude'
                                    className={disabled === true ? "form-control is-disabled" : "form-control"}
                                    value={tieude}
                                    onChange={(event) => { this.handleOnChangeInput(event, "tieude") }}
                                />
                            </div>
                            {/* ket thuc them chu ky nhac */}
                            <div className="col-12 my-3">
                                <button
                                    type="button"
                                    aria-disabled={disabled === true ? "true" : "false"}
                                    className={actions === CRUD_ACTIONS.CREATE ?
                                        "btn btn-primary px-3" : "btn btn-warning px-3"}
                                    onClick={() => { this.handleSaveUser() }}
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
                    <ManageDeadlineToday
                        handleEditDeadlineFromParent={this.handleEditDeadlineFromParent}
                        handleDetailDeadlineFromParent={this.handleDetailDeadlineFromParent}
                        currentPage={this.state.currentPage}
                    />
                </div>
                {/* <form className="row g-3">
                            <div className="col-lg-3 col-md-3 col-xs-auto statistic">
                                <label className="form-label text-title">
                                    <i className='icon fas fa-user-alt'></i>
                                    <FormattedMessage id="menu.admin.manage-staff.header" />
                                </label>
                                <span className='form-control-sta'>{totalStaff}</span>
                            </div>
                            <div className="col-lg-3 col-md-3 col-xs-auto statistic">
                                <label className="form-label text-title">
                                    <i className='icon fas fa-user-alt'></i>
                                    <FormattedMessage id="menu.admin.manage-customer.header" />
                                </label>
                                <span className='form-control-sta'>{totalCustomer}</span>
                            </div>
                            <div className="col-lg-3 col-md-3 col-xs-auto statistic">
                                <label className="form-label text-title">
                                    <i className='icon fas fa-bars'></i>
                                    <FormattedMessage id="menu.admin.manage-service.header" />
                                </label>
                                <span className='form-control-sta'>{totalService}</span>
                            </div>
                            <div className="col-lg-3 col-md-3 col-xs-auto statistic">
                                <label className="form-label text-title">
                                    <i className='icon fab fa-product-hunt' aria-hidden="true"></i>
                                    <FormattedMessage id="menu.admin.manage-product.header" />
                                </label>
                                <span className='form-control-sta'>{totalProduct}</span>
                            </div>
                        </form> */}
            </div>
        );
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
        createNewCalendar: (data) => dispatch(actions.createNewCalendar(data)),
        fetchCalendarRedux: (currentPage, userIdCreate) => dispatch(actions.fetchAllCalendarStart(currentPage, userIdCreate)),
        editCalendarRedux: (data) => dispatch(actions.editCalendar(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
