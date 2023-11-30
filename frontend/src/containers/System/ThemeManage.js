import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
// import { emitter } from '../../utils/emitter';
import * as actions from '../../store/actions';
import { LANGUAGES, CRUD_ACTIONS } from "../../utils";
import TableManageTheme from './TableManageTheme';

class ServiceManage extends Component {
    /*  Life cycle
    * Run component
    * 1. Run construc -> init state
    * 2. Did mount (set state)
    * 3. Render
    * */

    constructor(props) {
        super(props);
        this.state = {
            addServiceType: '',
            userEdit: {},
            currentPage: 1,
            actions: CRUD_ACTIONS.CREATE
        }
    }

    async componentDidMount() {
        this.props.getThemeStart();
    }

    handleCancel = () => {
        this.setState({
            addServiceType: '',
            actions: CRUD_ACTIONS.CREATE
        })
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        });
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = [
            'addServiceType'
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

    handleSaveServiceType = async (e) => {
        try {
            let addServiceType = this.state.addServiceType;
            let arrThemes = this.props.themeRedux;
            let countTheme = arrThemes.length + 1;
            let { actions } = this.state;
            if (actions === CRUD_ACTIONS.CREATE) {
                this.props.createNewServiceType({
                    key: "S" + countTheme,
                    type: "SERVICE",
                    valueEN: addServiceType.toUpperCase(),
                    valueVI: addServiceType.toUpperCase(),
                    currentPage: 1,
                })
            }
            if (actions === CRUD_ACTIONS.EDIT) {
                this.props.editServiceTypeRedux({
                    id: this.state.id,
                    valueEN: addServiceType.toUpperCase(),
                    valueVI: addServiceType.toUpperCase(),
                    page: this.state.currentPage,
                })
            }

        } catch (e) {
            console.log(e);
        }
    }

    handleEditTypeFromParent = async (type, currentPage) => {
        await document.getElementById("addServiceType").focus();
        await this.setState({
            id: type.id,
            addServiceType: type.valueEN,
            valueEN: type.valueEN,
            valueVI: type.valueVI,
            actions: CRUD_ACTIONS.EDIT,
            page: currentPage
        })
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        //after run render => run didUpdate
        if (prevProps.typeRedux !== this.props.typeRedux) {
            this.setState({
                addServiceType: '',
                actions: CRUD_ACTIONS.CREATE
            })
        }
    }

    render() {
        let { actions, addServiceType }
            = this.state;
        return (
            <div className="overflow-auto user-redux-container">
                <div className="title py-3">
                    <FormattedMessage id="manage-service.header" />
                </div>
                <div className="user-redux-body">
                    <div className="container">
                        <form className="row g-3">
                            <div className="col-lg-2 col-md-2 col-xs-auto">
                                <FormattedMessage id="manage-service.addServiceType" />
                            </div>
                            <div className="col-lg-4 col-md-4 col-xs-auto">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="addServiceType"
                                    id="addServiceType"
                                    value={addServiceType}
                                    onChange={(event) => { this.handleOnChangeInput(event, "addServiceType") }}
                                />
                            </div>
                            <div className="col-12 my-3">
                                <button
                                    type="button"
                                    className={actions === CRUD_ACTIONS.CREATE ?
                                        "btn btn-primary px-3" : "btn btn-warning px-3"}
                                    onClick={() => { this.handleSaveServiceType() }}
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
                    <TableManageTheme
                        handleEditTypeFromParent={this.handleEditTypeFromParent}
                        currentPage={this.state.currentPage}
                    />
                </div>
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        themeRedux: state.service.themes,
        typeRedux: state.service.serviceType,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getThemeStart: () => dispatch(actions.fetchThemeStart()),
        editServiceTypeRedux: (data) => dispatch(actions.editServiceType(data)),
        createNewServiceType: (data) => dispatch(actions.createNewServiceType(data)),
        fetchServicesTypeRedux: (currentPage) => dispatch(actions.fetchServicesTypeStart(currentPage))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceManage);
