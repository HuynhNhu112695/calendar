import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import moment from 'moment';
import './UserManage.scss';
// import { emitter } from '../../utils/emitter';
import * as actions from '../../store/actions';
import { LANGUAGES, CRUD_ACTIONS } from "../../utils";
import TableManageCalendar from './TableManageCalendar';

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
            nhactruoc: '', douutien: '', trangthai: '', nhaclai: '', ngaynhac: '',
            disabled1: true, disabled2: true, disabled3: true, disabled4: true,
            disabled5: true, disabled6: true, disabled7: true, disabled8: true,
            disabled9: true, disabled10: true, disabled11: true, disabled12: true,
            disabledDetail: false, hiddenAdd: false, disabledAll: true, isCheckedAllThang: false,
            isCheckedThang1: false, isCheckedThang2: false, isCheckedThang3: false, isCheckedThang4: false,
            isCheckedThang5: false, isCheckedThang6: false, isCheckedThang7: false, isCheckedThang8: false,
            isCheckedThang9: false, isCheckedThang10: false, isCheckedThang11: false, isCheckedThang12: false,
            isCheckedMot: false, isCheckedThang: false, isCheckedQuy: false, isCheckedNam: false,
            disabledMot: true, disabledThang: true, disabledQuy: true, disabledNam: true,
            disabledQuy1: true, disabledQuy2: true, disabledQuy3: true, disabledQuy4: true,
            month1: 1, month2: 2, month3: 3, month4: 4,
            month5: 5, month6: 6, month7: 7, month8: 8,
            month9: 9, month10: 10, month11: 11, month12: 12, all: "all",
            quy1: "quy1", quy2: "quy2", quy3: "quy3", quy4: "quy4",
            motlan: "motlan", thang: "thang", quy: "quy", nam: "nam",
            ngaynhacThang: "", ngaynhacQuy: "", ngaynhacNam: "", ngaynhacEdit: "",
            tieudeMot: "", tieudeThang: "", tieudeQuy: "", tieudeNam: "", tieudeEdit: "",
            arrNgayNhac: [],
            arrInput: [],
            arrUsers: [],
            userEdit: {},
            disabled: false,
            disabledEdit: false,
            currentPage: 1,
            actions: CRUD_ACTIONS.CREATE,
        }
    }

    async componentDidMount() {

    }

    handleCancel = async () => {
        await document.getElementById("sovanban").focus();
        this.setState({
            sovanban: '', ngayphathanh: '', donviphathanh: '', trichyeunoidung: '',
            action: 1, chutheyeucau: '', nguoithuchien: '', noidungyeucau: '',
            nhactruoc: '', douutien: '', trangthai: '', nhaclai: '', ngaynhac: '',
            disabled1: true, disabled2: true, disabled3: true, disabled4: true,
            disabled5: true, disabled6: true, disabled7: true, disabled8: true,
            disabled9: true, disabled10: true, disabled11: true, disabled12: true,
            disabledDetail: false, hiddenAdd: false, disabledAll: true, isCheckedAllThang: false,
            isCheckedThang1: false, isCheckedThang2: false, isCheckedThang3: false, isCheckedThang4: false,
            isCheckedThang5: false, isCheckedThang6: false, isCheckedThang7: false, isCheckedThang8: false,
            isCheckedThang9: false, isCheckedThang10: false, isCheckedThang11: false, isCheckedThang12: false,
            isCheckedMot: false, isCheckedThang: false, isCheckedQuy: false, isCheckedNam: false,
            disabledMot: true, disabledThang: true, disabledQuy: true, disabledNam: true,
            disabledQuy1: true, disabledQuy2: true, disabledQuy3: true, disabledQuy4: true,
            month1: 1, month2: 2, month3: 3, month4: 4,
            month5: 5, month6: 6, month7: 7, month8: 8,
            month9: 9, month10: 10, month11: 11, month12: 12, all: "all",
            quy1: "quy1", quy2: "quy2", quy3: "quy3", quy4: "quy4",
            motlan: "motlan", thang: "thang", quy: "quy", nam: "nam",
            ngaynhacThang: "", ngaynhacQuy: "", ngaynhacNam: "", ngaynhacEdit: "",
            tieudeMot: "", tieudeThang: "", tieudeQuy: "", tieudeNam: "", tieudeEdit: "",
            arrNgayNhac: [],
            arrInput: [],
            arrUsers: [],
            userEdit: {},
            disabled: false,
            disabledEdit: false,
            currentPage: 1,
            actions: CRUD_ACTIONS.CREATE,
        })
    }

    handleOnChangeInput = async (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        if (copyState['ngaynhacThang'] !== this.state.ngaynhacThang) {
            let ngaynhacThang = event.target.value;
            let ngaynhacNow = this.state.ngaynhacThang;
            let setNow = new Date(ngaynhacNow);
            let nowMonth = setNow.getMonth() + 1;
            let setVal = new Date(ngaynhacThang);
            let getMonth = setVal.getMonth() + 1;
            if (nowMonth !== getMonth) {
                switch (getMonth) {
                    case 1: copyState["disabled1"] = true; copyState["isCheckedThang1"] = true; break;
                    case 2: copyState["disabled2"] = true; copyState["isCheckedThang2"] = true; break;
                    case 3: copyState["disabled3"] = true; copyState["isCheckedThang3"] = true; break;
                    case 4: copyState["disabled4"] = true; copyState["isCheckedThang4"] = true; break;
                    case 5: copyState["disabled5"] = true; copyState["isCheckedThang5"] = true; break;
                    case 6: copyState["disabled6"] = true; copyState["isCheckedThang6"] = true; break;
                    case 7: copyState["disabled7"] = true; copyState["isCheckedThang7"] = true; break;
                    case 8: copyState["disabled8"] = true; copyState["isCheckedThang8"] = true; break;
                    case 9: copyState["disabled9"] = true; copyState["isCheckedThang9"] = true; break;
                    case 10: copyState["disabled10"] = true; copyState["isCheckedThang10"] = true; break;
                    case 11: copyState["disabled11"] = true; copyState["isCheckedThang11"] = true; break;
                    case 12: copyState["disabled12"] = true; copyState["isCheckedThang12"] = true; break;
                }
                switch (nowMonth) {
                    case 1: copyState["isCheckedThang1"] = false; copyState["disabled1"] = false; break;
                    case 2: copyState["isCheckedThang2"] = false; copyState["disabled2"] = false; break;
                    case 3: copyState["isCheckedThang3"] = false; copyState["disabled3"] = false; break;
                    case 4: copyState["isCheckedThang4"] = false; copyState["disabled4"] = false; break;
                    case 5: copyState["isCheckedThang5"] = false; copyState["disabled5"] = false; break;
                    case 6: copyState["isCheckedThang6"] = false; copyState["disabled6"] = false; break;
                    case 7: copyState["isCheckedThang7"] = false; copyState["disabled7"] = false; break;
                    case 8: copyState["isCheckedThang8"] = false; copyState["disabled8"] = false; break;
                    case 9: copyState["isCheckedThang9"] = false; copyState["disabled9"] = false; break;
                    case 10: copyState["isCheckedThang10"] = false; copyState["disabled10"] = false; break;
                    case 11: copyState["isCheckedThang11"] = false; copyState["disabled11"] = false; break;
                    case 12: copyState["isCheckedThang12"] = false; copyState["disabled12"] = false; break;
                }
            }
        }
        if (copyState['ngaynhacQuy'] !== this.state.ngaynhacQuy) {
            let ngaynhacQuy = event.target.value;
            let ngaynhacNow = this.state.ngaynhacQuy;
            let setNow = new Date(ngaynhacNow);
            let nowMonth = setNow.getMonth() + 1;
            let setVal = new Date(ngaynhacQuy);
            let getMonth = setVal.getMonth() + 1;
            if (nowMonth !== getMonth) {
                switch (getMonth) {
                    case 3: copyState["isCheckedQuy1"] = true; copyState["disabledQuy1"] = true; break;
                    case 6: copyState["isCheckedQuy2"] = true; copyState["disabledQuy2"] = true; break;
                    case 9: copyState["isCheckedQuy3"] = true; copyState["disabledQuy3"] = true; break;
                    case 12: copyState["isCheckedQuy4"] = true; copyState["disabledQuy4"] = true; break;
                }
                switch (nowMonth) {
                    case 3: copyState["isCheckedQuy1"] = false; copyState["disabledQuy1"] = false; break;
                    case 6: copyState["isCheckedQuy2"] = false; copyState["disabledQuy2"] = false; break;
                    case 9: copyState["isCheckedQuy3"] = false; copyState["disabledQuy3"] = false; break;
                    case 12: copyState["isCheckedQuy4"] = false; copyState["disabledQuy4"] = false; break;
                }
            }
        }
        this.setState({
            ...copyState
        });
    }

    toggleChange = async (event, id) => {
        let getTitle = event.target.value;
        switch (getTitle) {
            case "motlan":
                let disMot = "";
                let checkedMot = !this.state.isCheckedMot;
                if (checkedMot === true) {
                    disMot = false;
                } else {
                    disMot = true;
                    this.setState({
                        ngaynhac: "",
                        tieudeMot: ""
                    })
                }
                await this.setState({
                    isCheckedMot: checkedMot,
                    disabledMot: disMot,
                });
                break;
            case "thang":
                let disThang = "";
                let checkedThang = !this.state.isCheckedThang;
                if (checkedThang === true) {
                    disThang = false;
                    this.setState({
                        disabledAll: false,
                        disabled1: false, disabled2: false,
                        disabled3: false, disabled4: false,
                        disabled5: false, disabled6: false,
                        disabled7: false, disabled8: false,
                        disabled9: false, disabled10: false,
                        disabled11: false, disabled12: false,
                    })
                } else {
                    disThang = true;
                    this.setState({
                        ngaynhacThang: "",
                        tieudeThang: "", isCheckedAllThang: false,
                        isCheckedThang1: false, isCheckedThang2: false,
                        isCheckedThang3: false, isCheckedThang4: false,
                        isCheckedThang5: false, isCheckedThang6: false,
                        isCheckedThang7: false, isCheckedThang8: false,
                        isCheckedThang9: false, isCheckedThang10: false,
                        isCheckedThang11: false, isCheckedThang12: false,
                        disabled1: true, disabled2: true, disabledAll: true,
                        disabled3: true, disabled4: true,
                        disabled5: true, disabled6: true,
                        disabled7: true, disabled8: true,
                        disabled9: true, disabled10: true,
                        disabled11: true, disabled12: true,
                    })
                }
                await this.setState({
                    isCheckedThang: checkedThang,
                    disabledThang: disThang,
                });
                break;
            case "quy":
                let disQuy = "";
                let checkedQuy = !this.state.isCheckedQuy;
                if (checkedQuy === true) {
                    disQuy = false;
                    this.setState({
                        disabledQuy1: false, disabledQuy2: false,
                        disabledQuy3: false, disabledQuy4: false,
                    })
                } else {
                    disQuy = true;
                    this.setState({
                        ngaynhacQuy: "",
                        tieudeQuy: "",
                        disabledQuy1: true, disabledQuy2: true,
                        disabledQuy3: true, disabledQuy4: true,
                        isCheckedQuy1: false, isCheckedQuy2: false,
                        isCheckedQuy3: false, isCheckedQuy4: false,
                    })
                }
                await this.setState({
                    isCheckedQuy: checkedQuy,
                    disabledQuy: disQuy,
                });
                break;
            case "nam":
                let disNam = "";
                let checkedNam = !this.state.isCheckedNam;
                if (checkedNam === true) {
                    disNam = false;
                } else {
                    disNam = true;
                    this.setState({
                        ngaynhacNam: "",
                        tieudeNam: ""
                    })
                }
                await this.setState({
                    isCheckedNam: checkedNam,
                    disabledNam: disNam
                });
                break;
            case "1":
                await this.setState({
                    isCheckedThang1: !this.state.isCheckedThang1
                });
                break;
            case "2":
                await this.setState({
                    isCheckedThang2: !this.state.isCheckedThang2
                });
                break;
            case "3":
                await this.setState({
                    isCheckedThang3: !this.state.isCheckedThang3
                });
                break;
            case "4":
                await this.setState({
                    isCheckedThang4: !this.state.isCheckedThang4
                });
                break;
            case "5":
                await this.setState({
                    isCheckedThang5: !this.state.isCheckedThang5
                });
                break;
            case "6":
                await this.setState({
                    isCheckedThang6: !this.state.isCheckedThang6
                });
                break;
            case "7":
                await this.setState({
                    isCheckedThang7: !this.state.isCheckedThang7
                });
                break;
            case "8":
                await this.setState({
                    isCheckedThang8: !this.state.isCheckedThang8
                });
                break;
            case "9":
                await this.setState({
                    isCheckedThang9: !this.state.isCheckedThang9
                });
                break;
            case "10":
                await this.setState({
                    isCheckedThang10: !this.state.isCheckedThang10
                });
                break;
            case "11":
                await this.setState({
                    isCheckedThang11: !this.state.isCheckedThang11
                });
                break;
            case "12":
                await this.setState({
                    isCheckedThang12: !this.state.isCheckedThang12
                });
                break;
            case "quy1":
                await this.setState({
                    isCheckedQuy1: !this.state.isCheckedQuy1
                });
                break;
            case "quy2":
                await this.setState({
                    isCheckedQuy2: !this.state.isCheckedQuy2
                });
                break;
            case "quy3":
                await this.setState({
                    isCheckedQuy3: !this.state.isCheckedQuy3
                });
                break;
            case "quy4":
                await this.setState({
                    isCheckedQuy4: !this.state.isCheckedQuy4
                });
                break;
            case "all":
                await this.setState({
                    isCheckedAllThang: !this.state.isCheckedAllThang,
                    isCheckedThang1: !this.state.isCheckedThang1,
                    isCheckedThang2: !this.state.isCheckedThang2,
                    isCheckedThang3: !this.state.isCheckedThang3,
                    isCheckedThang4: !this.state.isCheckedThang4,
                    isCheckedThang5: !this.state.isCheckedThang5,
                    isCheckedThang6: !this.state.isCheckedThang6,
                    isCheckedThang7: !this.state.isCheckedThang7,
                    isCheckedThang8: !this.state.isCheckedThang8,
                    isCheckedThang9: !this.state.isCheckedThang9,
                    isCheckedThang10: !this.state.isCheckedThang10,
                    isCheckedThang11: !this.state.isCheckedThang11,
                    isCheckedThang12: !this.state.isCheckedThang12
                })
        }
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['nguoithuchien', 'noidungyeucau'];
        if (this.state.isCheckedMot === true) {
            arrInput.push('ngaynhac');
        }
        if (this.state.isCheckedThang === true) {
            arrInput.push('ngaynhacThang');
        }
        if (this.state.isCheckedQuy === true) {
            arrInput.push('ngaynhacQuy');
        }
        if (this.state.isCheckedNam === true) {
            arrInput.push('ngaynhacNam');
        }
        if (this.state.actions === CRUD_ACTIONS.EDIT) {
            arrInput.push('ngaynhacEdit');
        }
        if (this.state.actions === CRUD_ACTIONS.CREATE) {
            if (this.state.isCheckedMot === false &&
                this.state.isCheckedThang === false &&
                this.state.isCheckedQuy === false &&
                this.state.isCheckedNam === false) {
                arrInput.push('ngaynhac');
            }
        }
        // console.log(arrInput)
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                console.log(this.state[arrInput[i]])
                isValid = false;
                alert('Vui lòng nhập ' + arrInput[i]);
                document.getElementById(arrInput[i]).focus();
                break;
            }
        }
        return isValid;
    }

    setObjThang = async (ngaynhac, tieudeThang, trangthai) => {
        let obj = {};
        obj = {
            chukylap: "thang",
            ngaynhac: ngaynhac,
            tieude: tieudeThang,
            trangthai: trangthai
        }
        return obj;
    }

    setObjQuy = async (ngaynhac, tieudeQuy, trangthai) => {
        let obj = {};
        obj = {
            chukylap: "quy",
            ngaynhac: ngaynhac,
            tieude: tieudeQuy,
            trangthai: trangthai
        }
        return obj;
    }

    handleSaveUser = async (e) => {
        try {
            let isValid = this.checkValidateInput();
            console.log("is", isValid)
            if (isValid === true) {
                console.log("vào true", isValid)
                let objMot = {};
                let objNam = {};
                let { actions, sovanban, ngayphathanh, donviphathanh, trichyeunoidung,
                    chutheyeucau, noidungyeucau, nguoithuchien, nhactruoc, douutien, ngaynhac,
                    trangthai, motlan, ngaynhacThang, ngaynhacQuy, nam, ngaynhacNam,
                    isCheckedQuy, isCheckedMot, isCheckedThang, isCheckedNam, arrNgayNhac,
                    isCheckedThang1, isCheckedThang2, isCheckedThang3, isCheckedThang4,
                    isCheckedThang5, isCheckedThang6, isCheckedThang7, isCheckedThang8,
                    isCheckedThang9, isCheckedThang10, isCheckedThang11, isCheckedThang12,
                    isCheckedQuy1, isCheckedQuy2, isCheckedQuy3, isCheckedQuy4,
                    tieudeMot, tieudeThang, tieudeQuy, tieudeNam
                } = this.state;
                if (isCheckedMot === true) {
                    if (ngaynhac !== "") {
                        objMot = {
                            chukylap: motlan,
                            ngaynhac: ngaynhac,
                            tieude: tieudeMot,
                            trangthai: trangthai
                        }
                        await arrNgayNhac.push(objMot);
                    }
                }
                if (isCheckedThang === true) {
                    if (ngaynhacThang !== "") {
                        let setNNThang = new Date(ngaynhacThang);
                        let getDate = setNNThang.getDate();
                        let getYear = setNNThang.getFullYear();
                        if (isCheckedThang1 === true) {
                            let t1 = getYear + "-" + "01" + "-" + getDate;
                            let data = await this.setObjThang(t1, tieudeThang, trangthai);
                            await arrNgayNhac.push(data);
                        }
                        if (isCheckedThang2 === true) {
                            let t2 = getYear + "-" + "02" + "-" + getDate;
                            let data = await this.setObjThang(t2, tieudeThang, trangthai);
                            await arrNgayNhac.push(data);
                        }
                        if (isCheckedThang3 === true) {
                            let t3 = getYear + "-" + "03" + "-" + getDate;
                            let data = await this.setObjThang(t3, tieudeThang, trangthai);
                            await arrNgayNhac.push(data);
                        }
                        if (isCheckedThang4 === true) {
                            let t4 = getYear + "-" + "04" + "-" + getDate;
                            let data = await this.setObjThang(t4, tieudeThang, trangthai);
                            await arrNgayNhac.push(data);
                        }
                        if (isCheckedThang5 === true) {
                            let t5 = getYear + "-" + "05" + "-" + getDate;
                            let data = await this.setObjThang(t5, tieudeThang, trangthai);
                            await arrNgayNhac.push(data);
                        }
                        if (isCheckedThang6 === true) {
                            let t6 = getYear + "-" + "06" + "-" + getDate;
                            let data = await this.setObjThang(t6, tieudeThang, trangthai);
                            await arrNgayNhac.push(data);
                        }
                        if (isCheckedThang7 === true) {
                            let t7 = getYear + "-" + "07" + "-" + getDate;
                            let data = await this.setObjThang(t7, tieudeThang, trangthai);
                            await arrNgayNhac.push(data);
                        }
                        if (isCheckedThang8 === true) {
                            let t8 = getYear + "-" + "08" + "-" + getDate;
                            let data = await this.setObjThang(t8, tieudeThang, trangthai);
                            await arrNgayNhac.push(data);
                        }
                        if (isCheckedThang9 === true) {
                            let t9 = getYear + "-" + "09" + "-" + getDate;
                            let data = await this.setObjThang(t9, tieudeThang, trangthai);
                            await arrNgayNhac.push(data);
                        }
                        if (isCheckedThang10 === true) {
                            let t10 = getYear + "-" + "10" + "-" + getDate;
                            let data = await this.setObjThang(t10, tieudeThang, trangthai);
                            await arrNgayNhac.push(data);
                        }
                        if (isCheckedThang11 === true) {
                            let t11 = getYear + "-" + "11" + "-" + getDate;
                            let data = await this.setObjThang(t11, tieudeThang, trangthai);
                            await arrNgayNhac.push(data);
                        }
                        if (isCheckedThang12 === true) {
                            let t12 = getYear + "-" + "12" + "-" + getDate;
                            let data = await this.setObjThang(t12, tieudeThang, trangthai);
                            await arrNgayNhac.push(data);
                        }
                    }
                }
                if (isCheckedQuy === true) {
                    if (ngaynhacQuy !== "") {
                        let setNNQuy = new Date(ngaynhacQuy);
                        let getDate = setNNQuy.getDate();
                        let getYear = setNNQuy.getFullYear();
                        if (isCheckedQuy1 === true) {
                            let t1 = getYear + "-" + "03" + "-" + getDate;
                            let data = await this.setObjQuy(t1, tieudeQuy, trangthai);
                            await arrNgayNhac.push(data);
                        }
                        if (isCheckedQuy2 === true) {
                            let t2 = getYear + "-" + "06" + "-" + getDate;
                            let data = await this.setObjQuy(t2, tieudeQuy, trangthai);
                            await arrNgayNhac.push(data);
                        }
                        if (isCheckedQuy3 === true) {
                            let t3 = getYear + "-" + "09" + "-" + getDate;
                            let data = await this.setObjQuy(t3, tieudeQuy, trangthai);
                            await arrNgayNhac.push(data);
                        }
                        if (isCheckedQuy4 === true) {
                            let t4 = getYear + "-" + "12" + "-" + getDate;
                            let data = await this.setObjQuy(t4, tieudeQuy, trangthai);
                            await arrNgayNhac.push(data);
                        }
                    }
                }
                if (isCheckedNam === true) {
                    if (ngaynhacNam !== "") {
                        objNam = {
                            chukylap: nam,
                            ngaynhac: ngaynhacNam,
                            tieude: tieudeNam,
                            trangthai: trangthai
                        }
                        await arrNgayNhac.push(objNam);
                    }
                }
                let userIdCreate = this.props.userRedux.id;
                if (actions === CRUD_ACTIONS.CREATE) {
                    await this.props.createNewCalendar({
                        sovanban: sovanban,
                        ngayphathanh: ngayphathanh,
                        donviphathanh: donviphathanh,
                        trichyeunoidung: trichyeunoidung,
                        chutheyeucau: chutheyeucau,
                        nguoithuchien: nguoithuchien,
                        trangthai: trangthai,
                        noidungyeucau: noidungyeucau,
                        nhactruoc: nhactruoc,
                        douutien: douutien,
                        userIdCreate: userIdCreate,
                        arrNgayNhac: arrNgayNhac,
                        currentPage: 1
                    })
                }
                if (actions === CRUD_ACTIONS.EDIT) {
                    let dateNow = new Date();
                    console.log("edit:", this.state)
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
                        ngaynhac: this.state.ngaynhacEdit,
                        tieude: this.state.tieudeEdit,
                        userIdCreate: userIdCreate,
                        updatedAt: dateNow,
                        currentPage: this.state.page
                    })
                }
            } else {
                alert("error")
            }

        } catch (e) {
            console.log(e);
        }
    }

    handleEditCalendarFromParent = async (work, currentPage) => {
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
            tieudeEdit: work.tieude,
            ngaynhacEdit: work.ngaylap,
            disabled: false,
            disabledDetail: true,
            disabledEdit: false,
            actions: CRUD_ACTIONS.EDIT,
            page: currentPage
        })
    }

    handleDetailCalendarFromParent = async (work, currentPage) => {
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
            tieudeEdit: work.tieude,
            ngaynhacEdit: work.ngaylap,
            disabledDetail: true,
            disabled: true,
            disabledEdit: true,
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
                nhactruoc: '', douutien: '', trangthai: '', nhaclai: '',
                ngaynhac: '', hiddenAdd: false, disabledDetail: false,
                disabled1: true, disabled2: true, disabled3: true, disabled4: true,
                disabled5: true, disabled6: true, disabled7: true, disabled8: true,
                disabled9: true, disabled10: true, disabled11: true, disabled12: true,
                isCheckedThang1: false, isCheckedThang2: false, isCheckedThang3: false,
                isCheckedThang4: false, isCheckedThang5: false, isCheckedThang6: false,
                isCheckedThang7: false, isCheckedThang8: false, isCheckedThang9: false,
                isCheckedThang10: false, isCheckedThang11: false, isCheckedThang12: false,
                isCheckedMot: false, isCheckedThang: false, isCheckedQuy: false, isCheckedNam: false,
                disabledMot: true, disabledThang: true, disabledQuy: true, disabledNam: true,
                disabledQuy1: true, disabledQuy2: true, disabledQuy3: true, disabledQuy4: true,
                quy1: "quy1", quy2: "quy2", quy3: "quy3", quy4: "quy4",
                motlan: "motlan", thang: "thang", quy: "quy", nam: "nam",
                ngaynhacThang: "", ngaynhacNam: "", ngaynhacQuy: "", ngaynhacEdit: "",
                tieudeMot: "", tieudeThang: "", tieudeQuy: "", tieudeNam: "", tieudeEdit: "",
                month1: 1, month2: 2, month3: 3, month4: 4,
                month5: 5, month6: 6, month7: 7, month8: 8,
                month9: 9, month10: 10, month11: 11, month12: 12,
                arrInput: [],
                arrUsers: [],
                userEdit: {},
                disabled: false,
                disabledEdit: false,
                currentPage: 1,
                actions: CRUD_ACTIONS.CREATE
            })
        }
    }

    render() {
        console.log(this.state)
        let { sovanban, ngayphathanh, donviphathanh, trichyeunoidung,
            chutheyeucau, noidungyeucau, nguoithuchien, nhactruoc, douutien, ngaynhac,
            disabled, disabled1, disabled2, disabled3, disabled4, disabled5, disabled6,
            disabled7, disabled8, disabled9, disabled10, disabled11, disabled12,
            disabledMot, disabledThang, disabledQuy, disabledNam, disabledEdit,
            disabledQuy1, disabledQuy2, disabledQuy3, disabledQuy4, ngaynhacEdit,
            quy1, quy2, quy3, quy4, month1, month2, month3, month4, month5, month6,
            month7, month8, month9, month10, month11, month12,
            trangthai, actions, motlan, thang, ngaynhacThang, all, quy, ngaynhacQuy,
            nam, ngaynhacNam, tieudeMot, tieudeThang, tieudeNam, tieudeEdit,
            isCheckedQuy, isCheckedMot, isCheckedThang, disabledAll, isCheckedAllThang,
            isCheckedThang1, isCheckedThang2, isCheckedThang3, isCheckedThang4,
            isCheckedThang5, isCheckedThang6, isCheckedThang7, isCheckedThang8,
            isCheckedThang9, isCheckedThang10, isCheckedThang11, isCheckedThang12,
            isCheckedQuy1, isCheckedQuy2, isCheckedQuy3, isCheckedQuy4
        } = this.state;
        let dateNow = new Date();
        return (
            <div className="overflow-auto user-redux-container">
                <div className="title py-3">
                    Quản lý công việc
                </div>
                <div className="user-redux-body">
                    <div className="container">
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
                                    id="nguoithuchien"
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
                                    id="noidungyeucau"
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
                                    <option value={0}>Thông thường</option>
                                    <option value={1}>Quan trọng</option>
                                </select>
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
                            <div className="col-lg-4 col-md-4 col-xs-auto">
                                <div className={actions === CRUD_ACTIONS.EDIT ? "" : "hidden"}>
                                    <label className="form-label">
                                        Ngày nhắc
                                    </label>
                                    <input
                                        type="date"
                                        aria-disabled={disabledEdit}
                                        className={disabledEdit === true ? "form-control is-disabled" : "form-control"}
                                        name="ngaynhacEdit"
                                        id="ngaynhacEdit"
                                        value={ngaynhacEdit}
                                        onChange={(event) => { this.handleOnChangeInput(event, "ngaynhacEdit") }}
                                    />
                                </div>
                            </div>
                            <div className={actions === CRUD_ACTIONS.EDIT ? "col-lg-12 col-md-12 col-xs-auto" : "col-lg-12 col-md-12 col-xs-auto hidden"}>
                                <label className="form-label">
                                    Tiêu đề nhắc việc
                                </label>
                                <input type="text" name='tieudeEdit'
                                    className={disabledEdit === true ? "form-control is-disabled" : "form-control"}
                                    value={tieudeEdit}
                                    onChange={(event) => { this.handleOnChangeInput(event, "tieudeEdit") }}
                                />
                            </div>

                            <div className={actions === CRUD_ACTIONS.EDIT ? "col-lg-2 col-md-2 col-xs-auto hidden" : "col-lg-2 col-md-2 col-xs-auto"}>
                                <label>
                                    <input className='input-checkbox' type="checkbox"
                                        name='motlan'
                                        value={motlan}
                                        defaultChecked={isCheckedMot}
                                        onChange={(event) => { this.toggleChange(event, "motlan") }}
                                    />
                                    Nhắc việc một lần
                                </label>
                            </div>
                            <div className={actions === CRUD_ACTIONS.EDIT ? "col-lg-3 col-md-3 col-xs-auto hidden" : "col-lg-3 col-md-3 col-xs-auto"}>
                                <input
                                    type="date"
                                    aria-disabled={disabledMot}
                                    className={disabledMot === true ? "form-control is-disabled" : "form-control"}
                                    name="ngaynhac"
                                    id="ngaynhac"
                                    value={ngaynhac}
                                    onChange={(event) => { this.handleOnChangeInput(event, "ngaynhac") }}
                                />
                            </div>
                            <div className="col-lg-7 col-md-7 col-xs-auto"></div>
                            <div className={actions === CRUD_ACTIONS.EDIT ? "col-lg-2 col-md-2 col-xs-auto hidden" : "col-lg-2 col-md-2 col-xs-auto"}>
                                <label>Tiêu đề nhắc việc một lần</label>
                            </div>
                            <div className={actions === CRUD_ACTIONS.EDIT ? "col-lg-10 col-md-10 col-xs-auto hidden" : "col-lg-10 col-md-10 col-xs-auto"}>
                                <input type="text" name='tieudeMot'
                                    className={disabledMot === true ? "form-control is-disabled" : "form-control"}
                                    value={tieudeMot}
                                    onChange={(event) => { this.handleOnChangeInput(event, "tieudeMot") }}
                                />
                            </div>
                            {/* Nhắc theo tháng */}
                            <div className={actions === CRUD_ACTIONS.EDIT ? "col-lg-2 col-md-2 col-xs-auto hidden" : "col-lg-2 col-md-2 col-xs-auto"}>
                                <label className="form-label">
                                    <input className='input-checkbox' type="checkbox"
                                        name='thang'
                                        value={thang}
                                        defaultChecked={isCheckedThang}
                                        onChange={(event) => { this.toggleChange(event, "thang") }}
                                    />
                                    Nhắc việc theo tháng
                                </label>
                            </div>
                            <div className={actions === CRUD_ACTIONS.EDIT ? "col-lg-3 col-md-3 col-xs-auto hidden" : "col-lg-3 col-md-3 col-xs-auto"}>
                                <input
                                    type="date"
                                    aria-disabled={disabledThang}
                                    className={disabledThang === true ? "form-control is-disabled" : "form-control"}
                                    name="ngaynhacThang"
                                    id="ngaynhacThang"
                                    value={ngaynhacThang}
                                    onChange={(event) => { this.handleOnChangeInput(event, "ngaynhacThang") }}
                                />
                            </div>
                            <div className={actions === CRUD_ACTIONS.EDIT ? "col-lg-7 col-md-7 col-xs-auto hidden" : "col-lg-7 col-md-7 col-xs-auto"}>
                                <label className='style-month'>
                                    <input className='input-checkbox' type="checkbox"
                                        name='month1'
                                        value={month1}
                                        disabled={disabled1}
                                        defaultChecked={isCheckedThang1}
                                        onChange={(event) => { this.toggleChange(event, "month1") }}
                                    />
                                    01
                                </label>
                                <label className='style-month'>
                                    <input className='input-checkbox' type="checkbox"
                                        name='month2'
                                        value={month2}
                                        disabled={disabled2}
                                        defaultChecked={isCheckedThang2}
                                        onChange={(event) => { this.toggleChange(event, "month2") }}
                                    />
                                    02
                                </label>
                                <label className='style-month'>
                                    <input className='input-checkbox' type="checkbox"
                                        name='month3'
                                        value={month3}
                                        disabled={disabled3}
                                        defaultChecked={isCheckedThang3}
                                        onChange={(event) => { this.toggleChange(event, "month3") }}
                                    />
                                    03
                                </label>
                                <label className='style-month'>
                                    <input className='input-checkbox' type="checkbox"
                                        name='month4'
                                        value={month4}
                                        disabled={disabled4}
                                        defaultChecked={isCheckedThang4}
                                        onChange={(event) => { this.toggleChange(event, "month4") }}
                                    />
                                    04
                                </label>
                                <label className='style-month'>
                                    <input className='input-checkbox' type="checkbox"
                                        name='month5'
                                        value={month5}
                                        disabled={disabled5}
                                        defaultChecked={isCheckedThang5}
                                        onChange={(event) => { this.toggleChange(event, "month5") }}
                                    />
                                    05
                                </label>
                                <label className='style-month'>
                                    <input className='input-checkbox' type="checkbox"
                                        name='month6'
                                        value={month6}
                                        disabled={disabled6}
                                        defaultChecked={isCheckedThang6}
                                        onChange={(event) => { this.toggleChange(event, "month6") }}
                                    />
                                    06
                                </label>
                                <label className='style-month'>
                                    <input className='input-checkbox' type="checkbox"
                                        name='month7'
                                        value={month7}
                                        disabled={disabled7}
                                        defaultChecked={isCheckedThang7}
                                        onChange={(event) => { this.toggleChange(event, "month7") }}
                                    />
                                    07
                                </label>
                                <label className='style-month'>
                                    <input className='input-checkbox' type="checkbox"
                                        name='month8'
                                        value={month8}
                                        disabled={disabled8}
                                        defaultChecked={isCheckedThang8}
                                        onChange={(event) => { this.toggleChange(event, "month8") }}
                                    />
                                    08
                                </label>
                                <label className='style-month'>
                                    <input className='input-checkbox' type="checkbox"
                                        name='month9'
                                        value={month9}
                                        disabled={disabled9}
                                        defaultChecked={isCheckedThang9}
                                        onChange={(event) => { this.toggleChange(event, "month9") }}
                                    />
                                    09
                                </label>
                                <label className='style-month'>
                                    <input className='input-checkbox' type="checkbox"
                                        name='month10'
                                        value={month10}
                                        disabled={disabled10}
                                        defaultChecked={isCheckedThang10}
                                        onChange={(event) => { this.toggleChange(event, "month10") }}
                                    />
                                    10
                                </label>
                                <label className='style-month'>
                                    <input className='input-checkbox' type="checkbox"
                                        name='month11'
                                        value={month11}
                                        disabled={disabled11}
                                        defaultChecked={isCheckedThang11}
                                        onChange={(event) => { this.toggleChange(event, "month11") }}
                                    />
                                    11
                                </label>
                                <label className='style-month'>
                                    <input className='input-checkbox' type="checkbox"
                                        name='month12'
                                        value={month12}
                                        disabled={disabled12}
                                        defaultChecked={isCheckedThang12}
                                        onChange={(event) => { this.toggleChange(event, "month12") }}
                                    />
                                    12
                                </label>
                                <label className='style-month'>
                                    <input className='input-checkbox' type="checkbox"
                                        name='all'
                                        value={all}
                                        disabled={disabledAll}
                                        defaultChecked={isCheckedAllThang}
                                        onChange={(event) => { this.toggleChange(event, "all") }}
                                    />
                                    Tất cả các tháng
                                </label>
                            </div>
                            <div className={actions === CRUD_ACTIONS.EDIT ? "col-lg-2 col-md-2 col-xs-auto hidden" : "col-lg-2 col-md-2 col-xs-auto"}>
                                <label>Tiêu đề nhắc việc tháng</label>
                            </div>
                            <div className={actions === CRUD_ACTIONS.EDIT ? "col-lg-10 col-md-10 col-xs-auto hidden" : "col-lg-10 col-md-10 col-xs-auto"}>
                                <input type="text" name='tieudeThang'
                                    className={disabledThang === true ? "form-control is-disabled" : "form-control"}
                                    value={tieudeThang}
                                    onChange={(event) => { this.handleOnChangeInput(event, "tieudeThang") }}
                                />
                            </div>
                            {/* Nhắc theo quý */}
                            <div className={actions === CRUD_ACTIONS.EDIT ? "col-lg-2 col-md-2 col-xs-auto hidden" : "col-lg-2 col-md-2 col-xs-auto"}>
                                <label className="form-label">
                                    <input className='input-checkbox' type="checkbox"
                                        name='quy'
                                        value={quy}
                                        defaultChecked={isCheckedQuy}
                                        onChange={(event) => { this.toggleChange(event, "quy") }}
                                    />
                                    Nhắc việc theo quý
                                </label>
                            </div>
                            <div className={actions === CRUD_ACTIONS.EDIT ? "col-lg-3 col-md-3 col-xs-auto hidden" : "col-lg-3 col-md-3 col-xs-auto"}>
                                <input
                                    type="date"
                                    aria-disabled={disabledQuy}
                                    className={disabledQuy === true ? "form-control is-disabled" : "form-control"}
                                    name="ngaynhacQuy"
                                    id="ngaynhacQuy"
                                    value={ngaynhacQuy}
                                    onChange={(event) => { this.handleOnChangeInput(event, "ngaynhacQuy") }}
                                />
                            </div>
                            <div className={actions === CRUD_ACTIONS.EDIT ? "col-lg-7 col-md-7 col-xs-auto hidden" : "col-lg-7 col-md-7 col-xs-auto"}>
                                <label className='style-month'>
                                    <input className='input-checkbox' type="checkbox"
                                        name='quy1'
                                        value={quy1}
                                        disabled={disabledQuy1}
                                        defaultChecked={isCheckedQuy1}
                                        onChange={(event) => { this.toggleChange(event, "quy1") }}
                                    />
                                    03
                                </label>
                                <label className='style-month'>
                                    <input className='input-checkbox' type="checkbox"
                                        name='quy2'
                                        value={quy2}
                                        disabled={disabledQuy2}
                                        defaultChecked={isCheckedQuy2}
                                        onChange={(event) => { this.toggleChange(event, "quy2") }}
                                    />
                                    06
                                </label>
                                <label className='style-month'>
                                    <input className='input-checkbox' type="checkbox"
                                        name='quy3'
                                        value={quy3}
                                        disabled={disabledQuy3}
                                        defaultChecked={isCheckedQuy3}
                                        onChange={(event) => { this.toggleChange(event, "quy3") }}
                                    />
                                    09
                                </label>
                                <label className='style-month'>
                                    <input className='input-checkbox' type="checkbox"
                                        name='quy4'
                                        value={quy4}
                                        disabled={disabledQuy4}
                                        defaultChecked={isCheckedQuy4}
                                        onChange={(event) => { this.toggleChange(event, "quy4") }}
                                    />
                                    12
                                </label>
                            </div>
                            <div className={actions === CRUD_ACTIONS.EDIT ? "col-lg-2 col-md-2 col-xs-auto hidden" : "col-lg-2 col-md-2 col-xs-auto"}>
                                <label>Tiêu đề nhắc việc quý</label>
                            </div>
                            <div className={actions === CRUD_ACTIONS.EDIT ? "col-lg-10 col-md-10 col-xs-auto hidden" : "col-lg-10 col-md-10 col-xs-auto"}>
                                <input type="text" name='tieudeQuy'
                                    className={disabledQuy === true ? "form-control is-disabled" : "form-control"} />
                            </div>
                            {/* nhắc theo năm */}
                            <div className={actions === CRUD_ACTIONS.EDIT ? "col-lg-2 col-md-2 col-xs-auto hidden" : "col-lg-2 col-md-2 col-xs-auto"}>
                                <label>
                                    <input className='input-checkbox' type="checkbox"
                                        name='nam'
                                        value={nam}
                                        defaultChecked={isCheckedMot}
                                        onChange={(event) => { this.toggleChange(event, "nam") }}
                                    />
                                    Nhắc việc tổng kết năm
                                </label>
                            </div>
                            <div className={actions === CRUD_ACTIONS.EDIT ? "col-lg-3 col-md-3 col-xs-auto hidden" : "col-lg-3 col-md-3 col-xs-auto"}>
                                <input
                                    type="date"
                                    aria-disabled={disabledNam}
                                    className={disabledNam === true ? "form-control is-disabled" : "form-control"}
                                    name="ngaynhacNam"
                                    id="ngaynhacNam"
                                    value={ngaynhacNam}
                                    onChange={(event) => { this.handleOnChangeInput(event, "ngaynhacNam") }}
                                />
                            </div>
                            <div className="col-lg-7 col-md-7 col-xs-auto"></div>
                            <div className={actions === CRUD_ACTIONS.EDIT ? "col-lg-2 col-md-2 col-xs-auto hidden" : "col-lg-2 col-md-2 col-xs-auto"}>
                                <label>Tiêu đề tổng kết năm</label>
                            </div>
                            <div className={actions === CRUD_ACTIONS.EDIT ? "col-lg-10 col-md-10 col-xs-auto hidden" : "col-lg-10 col-md-10 col-xs-auto"}>
                                <input type="text" name='tieudeNam'
                                    className={disabledNam === true ? "form-control is-disabled" : "form-control"}
                                    value={tieudeNam}
                                    onChange={(event) => { this.handleOnChangeInput(event, "tieudeNam") }}
                                />
                            </div>

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
                    <TableManageCalendar
                        handleEditCalendarFromParent={this.handleEditCalendarFromParent}
                        handleDetailCalendarFromParent={this.handleDetailCalendarFromParent}
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
        fetchCalendarRedux: (currentPage) => dispatch(actions.fetchAllCalendarStart(currentPage)),
        editCalendarRedux: (data) => dispatch(actions.editCalendar(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DangKyCongViec);
