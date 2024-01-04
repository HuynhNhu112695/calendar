import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import moment from 'moment';
import './UserManage.scss';
// import { emitter } from '../../utils/emitter';
import * as actions from '../../store/actions';
import { LANGUAGES, CRUD_ACTIONS } from "../../utils";
// import TableManageCalendar from './TableManageCalendar';
import TableManageDeadline from './TableManageDeadline';

class ViecSapDenHan extends Component {
    /*  Life cycle
    * Run component
    * 1. Run construc -> init state
    * 2. Did mount (set state)
    * 3. Render
    * */

    constructor(props) {
        super(props);
        this.state = {
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
                        ngaylap: this.state.ngaynhac,
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
        if (prevProps.calendar !== this.props.calendar) {
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
        let { sovanban, ngayphathanh, donviphathanh, trichyeunoidung,
            chutheyeucau, noidungyeucau, nguoithuchien, nhactruoc, douutien,
            ngaynhac, disabled, trangthai, actions, tieude
        } = this.state;

        return (
            <div className="overflow-auto user-redux-container">
                <div className="title py-3">
                    Quản lý công việc sắp đến hạn
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
                    <TableManageDeadline
                        handleEditDeadlineFromParent={this.handleEditDeadlineFromParent}
                        handleDetailDeadlineFromParent={this.handleDetailDeadlineFromParent}
                        isMenu={this.state.isMenu}
                        currentPage={this.state.currentPage}
                    />
                </div>
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        userRedux: state.user.userInfo,
        calendar: state.calendar.calendar,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createNewCalendar: (data) => dispatch(actions.createNewCalendar(data)),
        fetchCalendarRedux: (currentPage, userIdCreate) => dispatch(actions.fetchAllCalendarStart(currentPage, userIdCreate)),
        editCalendarRedux: (data) => dispatch(actions.editCalendar(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViecSapDenHan);
