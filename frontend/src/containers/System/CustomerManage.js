import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
// import { emitter } from '../../utils/emitter';
import * as actions from '../../store/actions';
import { LANGUAGES, CRUD_ACTIONS } from "../../utils";
// import TableManageCustomer from './TableManageCustomer';

class CustomerManage extends Component {
    /*  Life cycle
    * Run component
    * 1. Run construc -> init state
    * 2. Did mount (set state)
    * 3. Render
    * */

    constructor(props) {
        super(props);
        this.state = {
            firstname: '', lastname: '', email: '', password: '', action: 1,
            birthday: '', phonenumber: '', address: '', gender: '', role: '', note: '',
            arrInput: [],
            genderArr: [],
            roleArr: [],
            arrUsers: [],
            userEdit: {},
            disabaled: false,
            isMenu: 'CUSTOMER',
            currentPage: 1,
            actions: CRUD_ACTIONS.CREATE,
            isShowPassword: false,
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getRoleStart(this.state.isMenu);
    }

    handleCancel = () => {
        this.setState({
            email: '', password: '', firstname: '', lastname: '',
            phonenumber: '', address: '', gender: '', note: '',
            role: '', birthday: '',
            isMenu: 'CUSTOMER',
            disabled: false,
            actions: CRUD_ACTIONS.CREATE
        })
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        try {
            if (this.state.phonenumber !== copyState['phonenumber']) {
                let input = copyState['phonenumber'].replace(/\D/g, '');
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
                copyState['phonenumber'] = input;
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
            'firstname', 'lastname', 'email', 'role',
            'birthday', 'phonenumber', 'gender', 'address'
        ];

        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
            if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state[arrInput[2]]))) {
                isValid = false;
                alert("You have entered an invalid email address! Example: abc123@gmail.com")
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
                if (actions === CRUD_ACTIONS.CREATE) {
                    this.props.createNewUser({
                        email: this.state.email,
                        password: '',
                        roleId: this.state.role,
                        firstname: this.state.firstname,
                        lastname: this.state.lastname,
                        birthday: this.state.birthday,
                        address: this.state.address,
                        phonenumber: this.state.phonenumber,
                        gender: this.state.gender,
                        isMenu: 'CUSTOMER',
                        currentPage: 1,
                        percentOfStaff: 0,
                        note: this.state.note,
                        action: this.state.action
                    })
                }
                if (actions === CRUD_ACTIONS.EDIT) {
                    this.props.editUserRedux({
                        id: this.state.id,
                        email: this.state.email,
                        roleId: this.state.role,
                        firstname: this.state.firstname,
                        lastname: this.state.lastname,
                        birthday: this.state.birthday,
                        address: this.state.address,
                        phonenumber: this.state.phonenumber,
                        gender: this.state.gender,
                        isMenu: 'CUSTOMER',
                        percentOfStaff: 0,
                        note: this.state.note,
                        page: this.state.page,
                        action: this.state.action
                    })
                }
            }

        } catch (e) {
            console.log(e);
        }
    }

    handleEditUserFromParent = async (user, currentPage) => {
        await document.getElementById("firstname").focus();
        await this.setState({
            id: user.id,
            email: user.email,
            password: '',
            firstname: user.firstname,
            lastname: user.lastname,
            phonenumber: user.phonenumber,
            address: user.address,
            gender: user.gender,
            role: user.roleId,
            birthday: user.birthday,
            note: user.note,
            isMenu: 'CUSTOMER',
            currentPage: 1,
            disabled: false,
            actions: CRUD_ACTIONS.EDIT,
            page: currentPage
        })
    }

    handleDetailUserFromParent = async (user, currentPage) => {
        await document.getElementById("firstname").focus();
        await this.setState({
            id: user.id,
            email: user.email,
            password: '',
            firstname: user.firstname,
            lastname: user.lastname,
            phonenumber: user.phonenumber,
            address: user.address,
            gender: user.gender,
            role: user.roleId,
            birthday: user.birthday,
            note: user.note,
            isMenu: 'CUSTOMER',
            currentPage: 1,
            disabled: true,
            actions: CRUD_ACTIONS.CREATE,
            page: currentPage
        })
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        //after run render => run didUpdate 
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: arrGenders,
                // gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : ''
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux;
            this.setState({
                roleArr: arrRoles,
                // role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : ''
            })
        }
        if (prevProps.users !== this.props.users) {
            this.setState({
                email: '',
                password: '',
                firstname: '',
                lastname: '',
                phonenumber: '',
                address: '',
                gender: '',
                role: '',
                birthday: '',
                isMenu: 'CUSTOMER',
                note: '',
                currentPage: 1,
                actions: CRUD_ACTIONS.CREATE
            })
        }
    }

    render() {
        let language = this.props.language;
        let genders = this.state.genderArr;
        // let isLoadingGender = this.props.isLoadingGender;
        let roles = this.state.roleArr;
        let { email, firstname, lastname, phonenumber, address,
            gender, role, birthday, actions, disabled, note
        } = this.state;

        return (
            <div className="overflow-auto user-redux-container">
                <div className="title py-3">
                    <FormattedMessage id="manage-customer.header" />
                </div>
                <div className="user-redux-body">
                    <div className="container">
                        <form className="row g-3">
                            {/* <div className="col-12">{isLoadingGender ? 'Loading genders' : ''}</div> */}
                            <div className="col-lg-3 col-md-3 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-user.firstname" />
                                </label>
                                <input
                                    type="text"
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-control is-disabled" : "form-control"}
                                    name="firstname"
                                    id="firstname"
                                    value={firstname}
                                    onChange={(event) => { this.handleOnChangeInput(event, "firstname") }}
                                />
                            </div>
                            <div className="col-lg-3 col-md-3 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-user.lastname" />
                                </label>
                                <input
                                    type="text"
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-control is-disabled" : "form-control"}
                                    name="lastname"
                                    value={lastname}
                                    onChange={(event) => { this.handleOnChangeInput(event, "lastname") }}
                                />
                            </div>
                            <div className="col-lg-6 col-md-6 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-user.email" />
                                </label>
                                <input
                                    type="email"
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-control is-disabled" : "form-control"}
                                    name="email"
                                    value={email}
                                    onChange={(event) => { this.handleOnChangeInput(event, "email") }}
                                />
                            </div>

                            <div className="col-lg-3 col-md-3 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-user.birthday" />
                                </label>
                                <input
                                    type="date"
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-control is-disabled" : "form-control"}
                                    name="birthday"
                                    value={birthday}
                                    onChange={(event) => { this.handleOnChangeInput(event, "birthday") }}
                                />
                            </div>
                            <div className="col-lg-3 col-md-3 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-user.phonenumber" />
                                </label>
                                <input
                                    type="text"
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-control is-disabled" : "form-control"}
                                    name="phonenumber"
                                    value={phonenumber}
                                    onChange={(event) => { this.handleOnChangeInput(event, "phonenumber") }}
                                />
                            </div>
                            <div className="col-lg-3 col-md-3 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-user.gender" />
                                </label>
                                <select
                                    name="gender"
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-select is-disabled" : "form-select"}
                                    value={gender}
                                    onChange={(event) => { this.handleOnChangeInput(event, "gender") }}
                                >
                                    <option></option>
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
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
                                    <FormattedMessage id="manage-user.role" />
                                </label>
                                <select
                                    name="role"
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-select is-disabled" : "form-select"}
                                    value={role}
                                    onChange={(event) => { this.handleOnChangeInput(event, "role") }}
                                >
                                    <option></option>
                                    {roles && roles.length > 0 &&
                                        roles.map((item, index) => {
                                            return (
                                                <option value={item.key} key={index}>
                                                    {language === LANGUAGES.VI ? item.valueVI : item.valueEN}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-lg-12 col-md-12 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-user.address" />
                                </label>
                                <input
                                    type="text"
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-control is-disabled" : "form-control"}
                                    name="address"
                                    value={address}
                                    onChange={(event) => { this.handleOnChangeInput(event, "address") }}
                                />
                            </div>
                            <div className="col-lg-12 col-md-12 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-product.description" />
                                </label>
                                <textarea
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-control is-disabled" : "form-control"}
                                    name="note"
                                    value={note}
                                    onChange={(event) => { this.handleOnChangeInput(event, "note") }}
                                ></textarea>
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
                    {/* <TableManageCustomer
                        handleEditUserFromParent={this.handleEditUserFromParent}
                        handleDetailUserFromParent={this.handleDetailUserFromParent}
                        isMenu={this.state.isMenu}
                        currentPage={this.state.currentPage}
                    /> */}
                </div>
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.user.genders,
        // isLoadingGender: state.user.isLoadingGender,
        roleRedux: state.user.roles,
        users: state.user.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getRoleStart: (isMenu) => dispatch(actions.fetchRoleStart(isMenu)),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: (isMenu, currentPage) => dispatch(actions.fetchAllUsersStart(isMenu, currentPage)),
        editUserRedux: (data) => dispatch(actions.editUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerManage);
