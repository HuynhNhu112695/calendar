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

class DangKyCongViec extends Component {
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
            nhactruoc: '', douutien: '', trangthai: '', nhaclai: '', count1: 0,
            count2: 0, count3: 0, count4: 0, count5: 0, count6: 0, count7: 0,
            count8: 0, count9: 0, count: 0, chukylap: 0, ngaynhac: '', chukylap1: '',
            ngaynhac1: '', chukylap2: '', ngaynhac2: '', chukylap3: '', ngaynhac3: '',
            chukylap4: '', ngaynhac4: '', chukylap5: '', ngaynhac5: '', chukylap6: '',
            ngaynhac6: '', chukylap7: '', ngaynhac7: '', chukylap8: '', ngaynhac8: '',
            chukylap9: '', ngaynhac9: '', hiddenAdd: false, motlan: '', moithang: '',
            sauthang: '', chinthang: '', quyI: '', quyII: '', quyIII: '', quyIV: '',
            moinam: '', disabaled: false, disabled1: false, disabled2: false, disabled3: false,
            disabled4: false, disabled5: false, disabled6: false, disabled7: false, disabled8: false,
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
            nhactruoc: '', douutien: '', trangthai: '', nhaclai: '', count1: 0,
            count2: 0, count3: 0, count4: 0, count5: 0, count6: 0, count7: 0,
            count8: 0, count9: 0, count: 0, chukylap: 0, ngaynhac: '', chukylap1: '',
            ngaynhac1: '', chukylap2: '', ngaynhac2: '', chukylap3: '', ngaynhac3: '',
            chukylap4: '', ngaynhac4: '', chukylap5: '', ngaynhac5: '', chukylap6: '',
            ngaynhac6: '', chukylap7: '', ngaynhac7: '', chukylap8: '', ngaynhac8: '',
            chukylap9: '', ngaynhac9: '', hiddenAdd: false, motlan: '', moithang: '',
            sauthang: '', chinthang: '', quyI: '', quyII: '', quyIII: '', quyIV: '',
            moinam: '',
            arrInput: [],
            disabled: false,
            actions: CRUD_ACTIONS.CREATE
        })
    }

    handleOnChangeInput = async (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        // if (copyState['chukylap'] !== this.state.chukylap) {
        //     alert(copyState['chukylap'])
        // }
        // if (copyState['ngaynhac'] !== this.state.ngaynhac) {
        //     await this.setNgayNhac(this.state.chukylap, copyState['ngaynhac']);
        //     console.log("setNN", this.state)
        // }
        this.setState({
            ...copyState
        });
    }

    xulyThemChuKyNhac = async () => {
        let count = this.state.count + 1;
        await this.setState({
            count: count
        })
        if (count === 1) {
            this.setState({
                count1: 1
            })
        } else if (count === 2) {
            this.setState({
                count2: 2
            })
        } else if (count === 3) {
            this.setState({
                count3: 3
            })
        } else if (count === 4) {
            this.setState({
                count4: 4
            })
        } else if (count === 5) {
            this.setState({
                count5: 5
            })
        } else if (count === 6) {
            this.setState({
                count6: 6
            })
        } else if (count === 7) {
            this.setState({
                count7: 7
            })
        } else if (count === 8) {
            this.setState({
                count8: 8
            })
        } else if (count === 9) {
            this.setState({
                count9: 9
            })
        }
        // console.log(this.state)
    }

    handleRemoveService = async (event, id) => {
        let remove = id;
        if (remove === "xoadong1") {
            let count1 = 0;
            this.setState({
                count1: count1,
                chukylap1: '',
                ngaynhac1: ''
            })
        }
        if (remove === "xoadong2") {
            let count2 = 0;
            this.setState({
                count2: count2,
                chukylap2: '',
                ngaynhac2: ''
            })
        }
        if (remove === "xoadong3") {
            let count3 = 0;
            this.setState({
                count3: count3,
                chukylap3: '',
                ngaynhac3: ''
            })
        }
        if (remove === "xoadong4") {
            let count4 = 0;
            this.setState({
                count4: count4,
                chukylap4: '',
                ngaynhac4: ''
            })
        }
        if (remove === "xoadong5") {
            let count5 = 0;
            this.setState({
                count5: count5,
                chukylap5: '',
                ngaynhac5: ''
            })
        }
        if (remove === "xoadong6") {
            let count6 = 0;
            this.setState({
                count6: count6,
                chukylap6: '',
                ngaynhac6: ''
            })
        }
        if (remove === "xoadong7") {
            let count7 = 0;
            this.setState({
                count7: count7,
                chukylap7: '',
                ngaynhac7: ''
            })
        }
        if (remove === "xoadong8") {
            let count8 = 0;
            this.setState({
                count8: count8,
                chukylap8: '',
                ngaynhac8: ''
            })
        }
        if (remove === "xoadong9") {
            let count9 = 0;
            this.setState({
                count9: count9,
                chukylap9: '',
                ngaynhac9: ''
            })
        }
        let arrChuKy = [];
        let n = 0;
        let obj = {};
        for (let index = 0; index <= 9; index++) {
            if (index === 0) {
                n = n + 1;
                let valueChuKy = this.state.chukylap;
                let valueNgayNhac = this.state.ngaynhac;
                obj = {
                    chukylap: valueChuKy,
                    ngaynhac: valueNgayNhac
                }
                await arrChuKy.push(obj);
            }
            if (index === 1) {
                if (this.state.count1 !== 0) {
                    n = n + 1;
                    let valueChuKy = this.state.chukylap1;
                    let valueNgayNhac = this.state.ngaynhac1;
                    obj = {
                        chukylap: valueChuKy,
                        ngaynhac: valueNgayNhac
                    }
                    await arrChuKy.push(obj);
                }
            }
            if (index === 2) {
                if (this.state.count2 !== 0) {
                    n = n + 1;
                    let valueChuKy = this.state.chukylap2;
                    let valueNgayNhac = this.state.ngaynhac2;
                    obj = {
                        chukylap: valueChuKy,
                        ngaynhac: valueNgayNhac
                    }
                    await arrChuKy.push(obj);
                }
            }
            if (index === 3) {
                if (this.state.count3 !== 0) {
                    n = n + 1;
                    let valueChuKy = this.state.chukylap3;
                    let valueNgayNhac = this.state.ngaynhac3;
                    obj = {
                        chukylap: valueChuKy,
                        ngaynhac: valueNgayNhac
                    }
                    await arrChuKy.push(obj);
                }
            }
            if (index === 4) {
                if (this.state.count4 !== 0) {
                    n = n + 1;
                    let valueChuKy = this.state.chukylap4;
                    let valueNgayNhac = this.state.ngaynhac4;
                    obj = {
                        chukylap: valueChuKy,
                        ngaynhac: valueNgayNhac
                    }
                    await arrChuKy.push(obj);
                }
            }
            if (index === 5) {
                if (this.state.count5 !== 0) {
                    n = n + 1;
                    let valueChuKy = this.state.chukylap5;
                    let valueNgayNhac = this.state.ngaynhac5;
                    obj = {
                        chukylap: valueChuKy,
                        ngaynhac: valueNgayNhac
                    }
                    await arrChuKy.push(obj);
                }
            }
            if (index === 6) {
                if (this.state.count6 !== 0) {
                    n = n + 1;
                    let valueChuKy = this.state.chukylap6;
                    let valueNgayNhac = this.state.ngaynhac6;
                    obj = {
                        chukylap: valueChuKy,
                        ngaynhac: valueNgayNhac
                    }
                    await arrChuKy.push(obj);
                }
            }
            if (index === 7) {
                if (this.state.count7 !== 0) {
                    n = n + 1;
                    let valueChuKy = this.state.chukylap7;
                    let valueNgayNhac = this.state.ngaynhac7;
                    obj = {
                        chukylap: valueChuKy,
                        ngaynhac: valueNgayNhac
                    }
                    await arrChuKy.push(obj);
                }
            }
            if (index === 8) {
                if (this.state.count8 !== 0) {
                    n = n + 1;
                    let valueChuKy = this.state.chukylap8;
                    let valueNgayNhac = this.state.ngaynhac8;
                    obj = {
                        chukylap: valueChuKy,
                        ngaynhac: valueNgayNhac
                    }
                    await arrChuKy.push(obj);
                }
            }
            if (index === 9) {
                if (this.state.count9 !== 0) {
                    n = n + 1;
                    let valueChuKy = this.state.chukylap9;
                    let valueNgayNhac = this.state.ngaynhac9;
                    obj = {
                        chukylap: valueChuKy,
                        ngaynhac: valueNgayNhac
                    }
                    await arrChuKy.push(obj);
                }
            }
        }
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['nguoithuchien', 'noidungyeucau', 'ngaynhac'];
        for (let i = 0; i < arrInput.length; i++) {
            if (this.state[arrInput[2]] === 0) {
                isValid = true;
            } else if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
            // if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state[arrInput[2]]))) {
            //     isValid = false;
            //     alert("You have entered an invalid email address! Example: abc123@gmail.com")
            //     break;
            // }
        }
        return isValid;
    }

    // setNgayNhac = async (chukylap, ngaynhac) => {
    //     console.log(chukylap, ngaynhac)
    //     switch (chukylap) {
    //         case 0: await this.setState({ motlan: ngaynhac }); break;
    //         case 1: await this.setState({ moithang: ngaynhac }); break;
    //         case 2: await this.setState({ sauthang: ngaynhac }); break;
    //         case 3: await this.setState({ chinthang: ngaynhac }); break;
    //         case 4: await this.setState({ quyI: ngaynhac }); break;
    //         case 5: await this.setState({ quyII: ngaynhac }); break;
    //         case 6: await this.setState({ quyIII: ngaynhac }); break;
    //         case 7: await this.setState({ quyIV: ngaynhac }); break;
    //         case 8: await this.setState({ moinam: ngaynhac }); break;
    //     }
    // }

    handleSaveUser = async (e) => {
        try {
            let isValid = this.checkValidateInput();
            if (isValid === true) {
                let { actions, chukylap,
                    // chukylap1, chukylap2, chukylap3, chukylap4,
                    // chukylap5, chukylap6, chukylap7, chukylap8, 
                    ngaynhac,
                    // ngaynhac1, ngaynhac2, ngaynhac3, ngaynhac4, ngaynhac5, ngaynhac6, ngaynhac7,
                    // ngaynhac8 
                } = this.state;
                // await this.setNgayNhac(chukylap, ngaynhac);
                // await this.setNgayNhac(chukylap1, ngaynhac1);
                // await this.setNgayNhac(chukylap2, ngaynhac2);
                // await this.setNgayNhac(chukylap3, ngaynhac3);
                // await this.setNgayNhac(chukylap4, ngaynhac4);
                // await this.setNgayNhac(chukylap5, ngaynhac5);
                // await this.setNgayNhac(chukylap6, ngaynhac6);
                // await this.setNgayNhac(chukylap7, ngaynhac7);
                // await this.setNgayNhac(chukylap8, ngaynhac8);
                let userIdCreate = this.props.userRedux.id;
                if (actions === CRUD_ACTIONS.CREATE) {
                    await this.props.createNewCalendar({
                        sovanban: this.state.sovanban,
                        ngayphathanh: this.state.ngayphathanh,
                        donviphathanh: this.state.donviphathanh,
                        trichyeunoidung: this.state.trichyeunoidung,
                        chutheyeucau: this.state.chutheyeucau,
                        nguoithuchien: this.state.nguoithuchien,
                        trangthai: 0,
                        noidungyeucau: this.state.noidungyeucau,
                        nhactruoc: this.state.nhactruoc,
                        douutien: this.state.douutien,
                        userIdCreate: userIdCreate,
                        motlan: this.state.ngaynhac,
                        // moithang: this.state.moithang,
                        // sauthang: this.state.sauthang,
                        // chinthang: this.state.chinthang,
                        // quyI: this.state.quyI,
                        // quyII: this.state.quyII,
                        // quyIII: this.state.quyIII,
                        // quyIV: this.state.quyIV,
                        // moinam: this.state.moinam,
                        currentPage: 1
                    })
                }
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
                        motlan: this.state.ngaynhac,
                        userIdCreate: userIdCreate,
                        // moithang: this.state.moithang,
                        // sauthang: this.state.sauthang,
                        // chinthang: this.state.chinthang,
                        // quyI: this.state.quyI,
                        // quyII: this.state.quyII,
                        // quyIII: this.state.quyIII,
                        // quyIV: this.state.quyIV,
                        // moinam: this.state.moinam,
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
            trangthai: work.dataCalendar.trangthai,
            noidungyeucau: work.dataCalendar.noidungyeucau,
            nhactruoc: work.dataCalendar.nhactruoc,
            douutien: work.dataCalendar.douutien,
            chukylap: work.chukylap,
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
                nhactruoc: '', douutien: '', trangthai: '', nhaclai: '', count1: 0,
                count2: 0, count3: 0, count4: 0, count5: 0, count6: 0, count7: 0,
                count8: 0, count9: 0, count: 0, chukylap: 0, ngaynhac: '', chukylap1: '',
                ngaynhac1: '', chukylap2: '', ngaynhac2: '', chukylap3: '', ngaynhac3: '',
                chukylap4: '', ngaynhac4: '', chukylap5: '', ngaynhac5: '', chukylap6: '',
                ngaynhac6: '', chukylap7: '', ngaynhac7: '', chukylap8: '', ngaynhac8: '',
                chukylap9: '', ngaynhac9: '', hiddenAdd: false, motlan: '', moithang: '',
                sauthang: '', chinthang: '', quyI: '', quyII: '', quyIII: '', quyIV: '',
                moinam: '',
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
        let { sovanban, ngayphathanh, donviphathanh, trichyeunoidung, chukylap,
            chutheyeucau, noidungyeucau, nguoithuchien, nhactruoc, douutien, nhaclai,
            ngaynhac, count1, count2, count3, count4, count5, count6, count7, count8,
            count9, hiddenAdd, chukylap1, ngaynhac1, chukylap2, ngaynhac2, chukylap3,
            ngaynhac3, chukylap4, ngaynhac4, chukylap5, ngaynhac5, chukylap6, ngaynhac6,
            chukylap7, ngaynhac7, chukylap8, ngaynhac8, chukylap9, ngaynhac9,
            disabled, disabled1, disabled2, disabled3, disabled4, disabled5, disabled6,
            disabled7, disabled8, disabledDetail, trangthai, actions
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
                            {/* <div className="col-lg-3 col-md-3 col-xs-auto">
                                <label className="form-label">
                                    Chu kỳ lặp
                                </label>
                                <select
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-select is-disabled" : "form-select"}
                                    name="chukylap"
                                    value={chukylap}
                                    onChange={(event) => { this.handleOnChangeInput(event, "chukylap") }}
                                >
                                    <option></option>
                                    <option value={0}>Một lần</option>
                                    <option value={1}>Mỗi tháng</option>
                                    <option value={2}>6 tháng</option>
                                    <option value={3}>9 tháng</option>
                                    <option value={4}>Quý I</option>
                                    <option value={5}>Quý II</option>
                                    <option value={6}>Quý III</option>
                                    <option value={7}>Quý IV</option>
                                    <option value={8}>Mỗi năm</option>
                                </select>
                            </div> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(DangKyCongViec);
