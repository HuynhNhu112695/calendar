import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
// import { emitter } from '../../utils/emitter';
import * as actions from '../../store/actions';
import { LANGUAGES, CRUD_ACTIONS } from "../../utils";
import TableManageService from './TableManageService';

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
            serviceName: '', theme: '', price: '', description: '', addServiceType: '',
            arrInput: [],
            themeArr: [],
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
            serviceName: '', theme: this.state.theme, price: '', description: '',
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
            'theme', 'serviceName', 'price'
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

    handleSaveService = async (e) => {
        try {
            let isValid = this.checkValidateInput();
            if (isValid === true) {
                let { actions } = this.state;
                if (actions === CRUD_ACTIONS.CREATE) {
                    this.props.createNewService({
                        serviceThemeId: this.state.theme,
                        serviceName: this.state.serviceName,
                        price: this.state.price,
                        description: this.state.description,
                        currentPage: 1,
                        action: 1
                    })
                }
                if (actions === CRUD_ACTIONS.EDIT) {
                    this.props.editServiceRedux({
                        id: this.state.id,
                        serviceName: this.state.serviceName,
                        serviceThemeId: this.state.theme,
                        price: this.state.price,
                        description: this.state.description,
                        page: this.state.page,
                        action: 1
                    })
                }
            }

        } catch (e) {
            console.log(e);
        }
    }

    handleSaveServiceType = async (e) => {
        try {
            let addServiceType = this.state.addServiceType;
            let arrThemes = this.props.themeRedux;
            let countTheme = arrThemes.length + 1;
            if (addServiceType !== "") {
                let { actions } = this.state;
                if (actions === CRUD_ACTIONS.CREATE) {
                    this.props.createNewServiceType({
                        key: "S" + countTheme,
                        type: "SERVICE",
                        valueEN: this.state.addServiceType.toUpperCase(),
                        valueVI: this.state.addServiceType.toUpperCase()
                    })
                }
            } else {
                alert("Please, enter service type name!")
            }

        } catch (e) {
            console.log(e);
        }
    }

    handleEditServiceFromParent = async (service, currentPage) => {
        await document.getElementById("serviceName").focus();
        await this.setState({
            id: service.id,
            serviceName: service.serviceName,
            theme: service.serviceThemeId,
            price: service.price,
            description: service.description,
            actions: CRUD_ACTIONS.EDIT,
            page: currentPage
        })
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        //after run render => run didUpdate
        if (prevProps.themeRedux !== this.props.themeRedux) {
            let arrThemes = this.props.themeRedux;
            // let theme = arrThemes && arrThemes.length > 0 ? arrThemes[0].key : '';
            this.setState({
                themeArr: arrThemes,
                // theme: theme
                addServiceType: ''
            })
        }
        if (prevProps.services !== this.props.services) {
            this.setState({
                serviceName: '',
                theme: '',
                price: '',
                description: '',
                actions: CRUD_ACTIONS.CREATE
            })
        }
    }

    render() {
        let language = this.props.language;
        let themes = this.state.themeArr;
        let { serviceName, theme, price, description, actions }
            = this.state;
        return (
            <div className="overflow-auto user-redux-container">
                <div className="title py-3">
                    <FormattedMessage id="manage-service.header" />
                </div>
                <div className="user-redux-body">
                    <div className="container">
                        <form className="row g-3">
                            <div className="col-lg-4 col-md-4 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-service.theme" />
                                </label>
                                <select
                                    name="theme"
                                    className="form-select"
                                    value={theme}
                                    onChange={(event) => { this.handleOnChangeInput(event, "theme") }}
                                >
                                    <option></option>
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
                            <div className="col-lg-4 col-md-4 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-service.serviceName" />
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="serviceName"
                                    id="serviceName"
                                    value={serviceName}
                                    onChange={(event) => { this.handleOnChangeInput(event, "serviceName") }}
                                />
                            </div>
                            <div className="col-lg-4 col-md-4 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-product.price" />
                                </label>
                                <input
                                    type="number"
                                    step={0.01}
                                    className="form-control"
                                    name="price"
                                    value={price}
                                    onChange={(event) => { this.handleOnChangeInput(event, "price") }}
                                />
                            </div>
                            <div className="col-lg-12 col-md-12 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-product.description" />
                                </label>
                                <input
                                    type="text-aria"
                                    className="form-control"
                                    name="description"
                                    value={description}
                                    onChange={(event) => { this.handleOnChangeInput(event, "description") }}
                                />
                            </div>
                            <div className="col-12 my-3">
                                <button
                                    type="button"
                                    className={actions === CRUD_ACTIONS.CREATE ?
                                        "btn btn-primary px-3" : "btn btn-warning px-3"}
                                    onClick={() => { this.handleSaveService() }}
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
                    <TableManageService
                        handleEditServiceFromParent={this.handleEditServiceFromParent}
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
        themeRedux: state.service.themes,
        services: state.service.services,
        // isLoadingGender: state.user.isLoadingGender,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getThemeStart: () => dispatch(actions.fetchThemeStart()),
        createNewService: (data) => dispatch(actions.createNewService(data)),
        editServiceRedux: (data) => dispatch(actions.editService(data)),
        createNewServiceType: (data) => dispatch(actions.createNewServiceType(data)),
        fetchServicesRedux: (currentPage) => dispatch(actions.fetchAllServicesStart(currentPage))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceManage);
