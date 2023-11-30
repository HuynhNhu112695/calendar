import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import moment from 'moment';
// import { emitter } from '../../utils/emitter';
import * as actions from '../../store/actions';
import { LANGUAGES, CRUD_ACTIONS } from "../../utils";
import TableManageTax from './TableManageTax';

class TaxManage extends Component {
    /*  Life cycle
    * Run component
    * 1. Run construc -> init state
    * 2. Did mount (set state)
    * 3. Render
    * */

    constructor(props) {
        super(props);
        this.state = {
            startDateTax: '', endDateTax: '', tax: '',
            arrInput: [],
            currentPage: 1,
            taxArr: [],
            actions: CRUD_ACTIONS.CREATE,

        }
    }

    async componentDidMount() {
        await this.props.fetchTaxRedux(this.state.currentPage);
    }

    handleCancel = () => {
        this.setState({
            startDateTax: '', endDateTax: '', tax: '',
            taxArr: [],
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
        let arrInput = ['startDateTax', 'endDateTax', 'tax'];

        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
            if (this.state[arrInput[1]] <= this.state[arrInput[0]]) {
                isValid = false;
                alert('The end date must be after the start date!');
                break;
            }
        }
        return isValid;
    }

    handleSaveTax = async (e) => {
        try {
            let isValid = this.checkValidateInput();
            if (isValid === true) {
                let { actions } = this.state;
                if (actions === CRUD_ACTIONS.CREATE) {
                    await this.props.createNewTax({
                        startDateTax: this.state.startDateTax,
                        endDateTax: this.state.endDateTax,
                        tax: this.state.tax,
                        currentPage: 1
                    })
                }
                if (actions === CRUD_ACTIONS.EDIT) {
                    await this.props.editTaxRedux({
                        id: this.state.id,
                        startDateTax: this.state.startDateTax,
                        endDateTax: this.state.endDateTax,
                        tax: this.state.tax,
                        page: this.state.currentPage
                    })
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    handleEditTaxFromParent = (tax, currentPage) => {
        this.setState({
            id: tax.id,
            startDateTax: tax.startDateTax,
            endDateTax: tax.endDateTax,
            tax: tax.tax,
            actions: CRUD_ACTIONS.EDIT,
            page: currentPage
        })
    }

    componentDidUpdate = async (prevProps, prevState, snapshot) => {
        //after run render => run didUpdate
        if (prevProps.taxs !== this.props.taxs) {
            this.setState({
                startDateTax: '',
                endDateTax: '',
                tax: '',
                actions: CRUD_ACTIONS.CREATE
            })
        }
    }

    render() {
        let { startDateTax, endDateTax, tax, actions } = this.state;
        // // let isLoadingGender = this.props.isLoadingGender;
        return (
            <div className="overflow-auto user-redux-container">
                <div className="title py-3">
                    <FormattedMessage id="menu.admin.manage-tax.crud-tax" />
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
                                    className="form-control"
                                    name="startDateTax"
                                    value={startDateTax}
                                    onChange={(event) => { this.handleOnChangeInput(event, "startDateTax") }}
                                />
                            </div>
                            <div className="col-lg-3 col-md-3 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-salary.endDay" />
                                </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="endDateTax"
                                    value={endDateTax}
                                    onChange={(event) => { this.handleOnChangeInput(event, "endDateTax") }}
                                />
                            </div>
                            <div className="col-lg-3 col-md-3 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-salary.tax" />
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="tax"
                                    value={tax}
                                    onChange={(event) => { this.handleOnChangeInput(event, "tax") }}
                                />
                            </div>
                            <div className="col-12 my-3">
                                <button
                                    type="button"
                                    className={actions === CRUD_ACTIONS.CREATE ?
                                        "btn btn-primary px-3" : "btn btn-warning px-3"}
                                    onClick={() => { this.handleSaveTax() }}
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
                    <TableManageTax
                        handleEditTaxFromParent={this.handleEditTaxFromParent}
                        currentPage={this.state.currentPage}
                    />
                </div >
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        taxs: state.tax.taxs,
        // isLoadingGender: state.user.isLoadingGender,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createNewTax: (data) => dispatch(actions.createNewTax(data)),
        editTaxRedux: (data) => dispatch(actions.editTax(data)),
        fetchTaxRedux: (currentPage) => dispatch(actions.fetchAllUsersStart(currentPage))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaxManage);
