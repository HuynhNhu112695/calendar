import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
// import moment from 'moment';
// import { emitter } from '../../utils/emitter';
import * as actions from '../../store/actions';
import { LANGUAGES, CRUD_ACTIONS } from "../../utils";
import TableManageProduct from './TableManageProduct';
// import { update } from 'lodash';

class UnitProManage extends Component {
    /*  Life cycle
    * Run component
    * 1. Run construc -> init state
    * 2. Did mount (set state)
    * 3. Render
    * */

    constructor(props) {
        super(props);
        this.state = {
            key: '', quantityMin: '', valueEN: '', valueVI: '',
            arrInput: [],
            unitArr: [],
            userEdit: {},
            disabled: false,
            currentPage: 1,
            actions: CRUD_ACTIONS.CREATE
        }
    }

    async componentDidMount() {
        this.props.getUnitStart();
    }

    handleCancel = () => {
        this.setState({
            key: '', quantityMin: '', valueEN: '', valueVI: '',
            actions: CRUD_ACTIONS.CREATE
        })
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value
        if (this.state.quantityMin !== copyState['quantityMin']) {
            if (copyState['quantityMin'] < 0) {
                copyState["quantityMin"] = "";
                alert("Please enter quantity suitable!");
            }
        }
        this.setState({
            ...copyState
        });
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = [
            'valueEN', 'valueVI',
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

    handleSaveUnit = async (e) => {
        try {
            let isValid = this.checkValidateInput();
            if (isValid === true) {
                let { actions } = this.state;
                if (actions === CRUD_ACTIONS.CREATE) {
                    let arrUnit = await this.props.unitRedux;
                    let key = "U" + (arrUnit.length + 1);
                    this.props.createNewUnit({
                        key: key,
                        type: "UNIT",
                        quantityMin: this.state.quantityMin,
                        valueEN: this.state.valueEN,
                        valueVI: this.state.valueVI
                    })
                }
                if (actions === CRUD_ACTIONS.EDIT) {
                    this.props.editUnitRedux({
                        id: this.state.id,
                        quantityMin: this.state.quantityMin,
                        valueEN: this.state.valueEN,
                        valueVI: this.state.valueVI
                    })
                }
            }

        } catch (e) {
            console.log(e);
        }
    }

    handleEditUnit = (unit) => {
        console.log(unit)
        this.setState({
            id: unit.id,
            quantityMin: unit.note,
            valueEN: unit.valueEN,
            valueVI: unit.valueVI,
            actions: CRUD_ACTIONS.EDIT,
            disabled: false
        })
    }

    handleDetailUnit = (unit) => {
        this.setState({
            id: unit.id,
            quantityMin: unit.note,
            valueEN: unit.valueEN,
            valueVI: unit.valueVI,
            actions: CRUD_ACTIONS.CREATE,
            disabled: true
        })
    }

    handleDeleteUnit = (unit) => {
        this.props.deleteUnitRedux(unit);
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        //after run render => run didUpdate
        if (prevProps.unitRedux !== this.props.unitRedux) {
            let arrUnits = this.props.unitRedux;
            // let unit = arrUnits && arrUnits.length > 0 ? arrUnits[0].key : '';
            this.setState({
                unitArr: arrUnits
                // unit: unit
            })
        }
        if (prevProps.unitRedux !== this.props.unitRedux) {
            this.setState({
                key: '',
                quantityMin: '',
                valueEN: '',
                valueVI: '',
                actions: CRUD_ACTIONS.CREATE
            })
        }
    }

    render() {
        // let language = this.props.language;
        let units = this.state.unitArr;
        let { quantityMin, valueEN, valueVI, actions, disabled }
            = this.state;
        return (
            <div className="overflow-auto user-redux-container">
                <div className="title py-3">
                    <FormattedMessage id="manage-product.unitManage" />
                </div>
                <div className="user-redux-body">
                    <div className="container">
                        <form className="row g-3">
                            {/* <div className="col-12">{isLoadingGender ? 'Loading genders' : ''}</div> */}
                            <div className="col-lg-4 col-md-4 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-product.valueEN" />
                                </label>
                                <input
                                    type="text"
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-control is-disabled" : "form-control"}
                                    name="valueEN"
                                    value={valueEN}
                                    onChange={(event) => { this.handleOnChangeInput(event, "valueEN") }}
                                />
                            </div>
                            <div className="col-lg-4 col-md-4 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-product.valueVI" />
                                </label>
                                <input
                                    type="text"
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-control is-disabled" : "form-control"}
                                    name="valueVI"
                                    value={valueVI}
                                    onChange={(event) => { this.handleOnChangeInput(event, "valueVI") }}
                                />
                            </div>
                            <div className="col-lg-4 col-md-4 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-product.quantityMin" />
                                </label>
                                <input
                                    type="number"
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-control is-disabled" : "form-control"}
                                    name="quantityMin"
                                    value={quantityMin}
                                    onChange={(event) => { this.handleOnChangeInput(event, "quantityMin") }}
                                />
                            </div>
                            <div className="col-12 my-3">
                                <button
                                    type="button"
                                    aria-disabled={disabled === true ? "true" : "false"}
                                    className={actions === CRUD_ACTIONS.CREATE ?
                                        "btn btn-primary px-3" : "btn btn-warning px-3"}
                                    onClick={() => { this.handleSaveUnit() }}
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
                    <div className="container">
                        <div className='users-table mt-4 mb-4 table-responsive'>
                            <table className='table table-bordered' id="customers">
                                <thead>
                                    <tr>
                                        <th><FormattedMessage id="manage-product.valueEN" /></th>
                                        <th><FormattedMessage id="manage-product.valueVI" /></th>
                                        <th><FormattedMessage id="manage-product.quantityMin" /></th>
                                        <th><FormattedMessage id="manage-user.action" /></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {units.length === 0 &&
                                        <tr>
                                            <td className='text-center' colSpan={5}>
                                                <FormattedMessage id="manage-user.dataEmpty" />
                                            </td>
                                        </tr>
                                    }
                                    {units.length !== 0 && units.map((item, index) => {
                                        return (
                                            <tr key={item.id}>
                                                <td>{item.valueEN}</td>
                                                <td>{item.valueVI}</td>
                                                <td>{item.note}</td>
                                                <td>
                                                    <button className='btn-detail' value={item.id}
                                                        onClick={(e) => this.handleDetailUnit(item)}>
                                                        <i className="fas fa-info-circle"></i>
                                                    </button>
                                                    <button className='btn-edit' value={item.id}
                                                        onClick={(e) => this.handleEditUnit(item)}>
                                                        <i className="fas fa-pencil-alt"></i>
                                                    </button>
                                                    <button className='btn-delete' value={item.id}
                                                        onClick={(e) => {
                                                            window.confirm('Are you sure you want to delete it?',)
                                                                && this.handleDeleteUnit(item)
                                                        }}>
                                                        <i className="fas fa-trash-alt"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        unitRedux: state.product.units
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getUnitStart: () => dispatch(actions.fetchUnitStart()),
        createNewUnit: (data) => dispatch(actions.createNewUnit(data)),
        editUnitRedux: (data) => dispatch(actions.editUnit(data)),
        deleteUnitRedux: (data) => dispatch(actions.deleteUnit(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UnitProManage);
