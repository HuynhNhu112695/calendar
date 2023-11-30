import React, { Component, useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import moment from 'moment';
// import { emitter } from '../../utils/emitter';
import * as actions from '../../store/actions';
import { LANGUAGES, CRUD_ACTIONS } from "../../utils";
import TableManageProduct from './TableManageProduct';
// import { update } from 'lodash';

class ProductManage extends Component {
    /*  Life cycle
    * Run component
    * 1. Run construc -> init state
    * 2. Did mount (set state)
    * 3. Render
    * */

    constructor(props) {
        super(props);
        this.productName = React.createRef();
        this.state = {
            productName: '', quantity: '', unit: '', price: '',
            importDate: '', note: '', productId: '', unit: '',
            nowQuantity: '', exportQuantity: '', remainQuantity: '',
            exportDate: '', noteExport: '', importDateExport: '',
            arrInput: [],
            unitArr: [],
            userEdit: {},
            disabled: false,
            disabledFormExport: true,
            disabledFormImport: false,
            disabledExport: false,
            disabledImport: false,
            currentPage: 1,
            actions: CRUD_ACTIONS.CREATE
        }
    }

    async componentDidMount() {
        // const importDate = useRef();
        this.props.getUnitStart();
    }

    handleCancel = () => {
        this.setState({
            productName: '', quantity: '', unit: '', price: '',
            importDate: '', note: '', disabled: false,
            actions: CRUD_ACTIONS.CREATE,
            disabledFormExport: true,
            disabledFormImport: false,
            disabledExport: false,
            disabledImport: false,
        })
    }

    handleCancelExport = () => {
        this.setState({
            productNameExport: '', nowQuantity: '', exportQuantity: '', remainQuantity: '',
            exportDate: '', noteExport: '', importDateExport: '', disabled: false, disabledFormExport: true,
            disabledFormImport: false, productName: '', importDate: '',
            actions: CRUD_ACTIONS.CREATE,
            disabledFormExport: true,
            disabledFormImport: false,
            disabledExport: false,
            disabledImport: false,
        })
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value
        if (this.state.quantity !== copyState['quantity']) {
            if (copyState['quantity'] <= 0) {
                copyState["quantity"] = "";
                alert("Please enter quantity suitable!");
            }
        }
        if (this.state.exportQuantity !== copyState['exportQuantity']) {
            if (copyState['exportQuantity'] <= 0 || copyState['exportQuantity'] > copyState['nowQuantity']) {
                copyState["exportQuantity"] = "";
                copyState['remainQuantity'] = "";
                alert("Please enter quantity suitable!");
            } else {
                copyState['remainQuantity'] = parseInt(copyState['nowQuantity']) - parseInt(copyState['exportQuantity']);
            }
        }
        this.setState({
            ...copyState
        });
    }

    checkValidateInput = () => {
        let isValid = true;

        let arrInput = [
            'productName', 'importDate', 'quantity', 'unit', 'price'
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

    checkValidateInputExport = () => {
        let isValidExport = true;
        let arrInputExport = [
            'productNameExport', 'importDateExport', 'exportDate', 'nowQuantity', 'exportQuantity'
        ];
        for (let j = 0; j < arrInputExport.length; j++) {
            if (!this.state[arrInputExport[j]]) {
                isValidExport = false;
                alert('Missing parameter: ' + arrInputExport[j]);
                break;
            }
        }
        return isValidExport;
    }

    handleSaveProductExport = async (e) => {
        try {
            let isValid = this.checkValidateInputExport();
            if (isValid === true) {
                let { actions } = this.state;
                if (actions === CRUD_ACTIONS.CREATE) {
                    // alert(this.state.remainQuantity)
                    this.props.createNewProExport({
                        importId: this.state.importId,
                        productId: this.state.productId,
                        productName: this.state.productNameExport,
                        exportQuantity: this.state.exportQuantity,
                        remainQuantity: this.state.remainQuantity,
                        exportDate: this.state.exportDate,
                        note: this.state.noteExport,
                        currentPage: 1
                    })
                    this.setState({
                        disabledFormExport: true,
                        disabledFormImport: false
                    })
                }
            }
        } catch (e) {
            return e;
        }
    }

    handleSaveProduct = async (e) => {
        try {
            let isValid = this.checkValidateInput();
            if (isValid === true) {
                let { actions, productId } = this.state;
                if (actions === CRUD_ACTIONS.CREATE) {
                    if (productId !== "") {
                        let remain = 0;
                        if (!this.state.remainQuantity) { remain = this.state.nowQuantity; }
                        this.props.createNewProduct({
                            productId: this.state.productId,
                            productName: this.state.productName,
                            quantity: this.state.quantity,
                            nowQuantity: parseInt(this.state.quantity) + parseInt(remain),
                            unit: this.state.unit,
                            price: this.state.price,
                            importDate: this.state.importDate,
                            note: '',
                            currentPage: 1
                        })
                        this.setState({
                            disabledImport: false,
                            disabled: false
                        })
                    } else {
                        this.props.createNewProduct({
                            productName: this.state.productName,
                            quantity: this.state.quantity,
                            unit: this.state.unit,
                            price: this.state.price,
                            importDate: this.state.importDate,
                            note: '',
                            currentPage: 1
                        })
                        this.setState({
                            disabledImport: false,
                            disabled: false
                        })
                    }
                }
                if (actions === CRUD_ACTIONS.EDIT) {
                    this.props.editProductRedux({
                        id: this.state.id,
                        productName: this.state.productName,
                        quantity: this.state.quantity,
                        unit: this.state.unit,
                        price: this.state.price,
                        importDate: this.state.importDate,
                        note: '',
                        page: this.state.page
                    })
                    this.setState({
                        disabledImport: false,
                        disabled: false
                    })
                }
            }

        } catch (e) {
            console.log(e);
        }
    }

    handleImportProductFromParent = async (product, currentPage) => {
        // console.log(importDate.current)
        // console.log("im", product)
        await document.getElementById("importDate").focus();
        await this.setState({
            productId: product.productId,
            productName: product.productName,
            nowQuantity: product.nowQuantity,
            remainQuantity: product.remainQuantity,
            actions: CRUD_ACTIONS.CREATE,
            unit: product.unit.key,
            page: currentPage,
            disabledImport: true,
            disabledFormExport: true,
            disabledExportName: false,
            disabledFormImport: false
        })
    }

    handleExportProductFromParent = async (product, currentPage) => {
        // console.log(product)
        await this.setState({
            importId: product.importId,
            productId: product.productId,
            productNameExport: product.productName,
            nowQuantity: product.nowQuantity,
            remainQuantity: '',
            importDateExport: product.importDate,
            actions: CRUD_ACTIONS.CREATE,
            page: currentPage,
            disabledImport: true,
            disabledFormExport: false,
            disabledExportName: true,
            disabledFormImport: true
        })
        await document.getElementById("exportDate").focus();
    }

    handleEditProductFromParent = (product, currentPage) => {
        this.setState({
            id: product.id,
            productName: product.productName,
            quantity: product.quantity,
            unit: product.unit,
            price: product.price,
            importDate: product.importDate,
            note: '',
            actions: CRUD_ACTIONS.EDIT,
            page: currentPage,
            disabled: false,
            disabledImport: true
        })
    }

    handleDetailUpdateFromParent = async (pro) => {
        this.setState({
            productName: '',
            quantity: '',
            unit: '',
            price: '',
            importDate: '',
            expiryDate: '',
            note: '',
            disabledExport: false,
            disabledFormExport: true,
            disabledExportName: false,
            disabledFormImport: false
        })
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        //after run render => run didUpdate
        if (prevProps.unitRedux !== this.props.unitRedux) {
            let arrUnits = this.props.unitRedux;
            // let unit = arrUnits && arrUnits.length > 0 ? arrUnits[0].key : '';
            this.setState({
                unitArr: arrUnits
            })
        }
        if (prevProps.products !== this.props.products) {
            this.setState({
                productName: '',
                productNameExport: '',
                quantity: '',
                exportQuantity: '',
                nowQuantity: '',
                remainQuantity: '',
                unit: '',
                price: '',
                exportDate: '',
                importDateExport: '',
                importDate: '',
                note: '',
                noteExport: '',
                actions: CRUD_ACTIONS.CREATE
            })
        }
    }

    render() {
        // console.log("unit", this.state)
        let language = this.props.language;
        let units = this.state.unitArr;
        let { productName, quantity, unit, price, importDate, disabledExport,
            note, actions, disabled, nowQuantity, exportQuantity, remainQuantity,
            exportDate, noteExport, disabledFormExport, disabledImport, importDateExport,
            disabledExportName, productNameExport, disabledFormImport }
            = this.state;
        return (
            <div className="overflow-auto user-redux-container">
                <div className="title py-3">
                    <FormattedMessage id="manage-product.header" />
                </div>
                <div className="user-redux-body">
                    <div className={disabledFormImport === true ? "container hidden" : "container"}>
                        <form className="row g-3">
                            {/* <div className="col-12">{isLoadingGender ? 'Loading genders' : ''}</div> */}
                            <div className="col-lg-4 col-md-4 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-product.productName" />
                                </label>
                                <input
                                    type="text"
                                    aria-disabled={disabledImport}
                                    className={disabled === true || disabledImport === true ? "form-control is-disabled" : "form-control"}
                                    name="productName"
                                    value={productName}
                                    onChange={(event) => { this.handleOnChangeInput(event, "productName") }}
                                />
                            </div>
                            <div className="col-lg-4 col-md-4 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-product.importDate" />
                                </label>
                                <input
                                    type="date"
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-control is-disabled" : "form-control"}
                                    name="importDate"
                                    id="importDate"
                                    value={importDate}
                                    onChange={(event) => { this.handleOnChangeInput(event, "importDate") }}
                                />
                            </div>
                            <div className="col-lg-4 col-md-4 col-xs-auto"></div>
                            <div className="col-lg-4 col-md-4 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-product.quantity" />
                                </label>
                                <input
                                    type="number"
                                    // aria-disabled={disabled}
                                    className="form-control"
                                    // className={disabled === true ? "form-control is-disabled" : "form-control"}
                                    name="quantity"
                                    id="quantity"
                                    value={quantity}
                                    onChange={(event) => { this.handleOnChangeInput(event, "quantity") }}
                                />
                            </div>
                            <div className="col-lg-4 col-md-4 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-product.unit" />
                                </label>
                                <select
                                    name="unit"
                                    className="form-select"
                                    aria-disabled={disabledImport}
                                    // className={disabled === true ? "form-select is-disabled" : "form-select"}
                                    value={unit}
                                    onChange={(event) => { this.handleOnChangeInput(event, "unit") }}
                                >
                                    <option></option>
                                    {units && units.length > 0 &&
                                        units.map((item, index) => {
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
                                    <FormattedMessage id="manage-product.price" />
                                </label>
                                <input
                                    type="text"
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-control is-disabled" : "form-control"}
                                    name="price"
                                    value={price}
                                    onChange={(event) => { this.handleOnChangeInput(event, "price") }}
                                />
                            </div>
                            {/* <div className="col-lg-12 col-md-12 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-product.description" />
                                </label>
                                <textarea
                                    aria-disabled={disabled}
                                    //className="form-control"
                                    className={disabled === true ? "form-control is-disabled" : "form-control"}
                                    name="note"
                                    value={note}
                                    onChange={(event) => { this.handleOnChangeInput(event, "note") }}
                                ></textarea>
                            </div> */}
                            <div className="col-12 my-3">
                                <button
                                    type="button"
                                    aria-disabled={disabled === true ? "true" : "false"}
                                    className={actions === CRUD_ACTIONS.CREATE ?
                                        "btn btn-primary px-3" : "btn btn-warning px-3"}
                                    onClick={() => { this.handleSaveProduct() }}
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
                    <div className={disabledFormExport === true ? "container hidden" : "container"}>
                        <form className="row g-3">
                            {/* <div className="col-12">{isLoadingGender ? 'Loading genders' : ''}</div> */}
                            <div className="col-lg-4 col-md-4 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-product.productName" />
                                </label>
                                <input
                                    type="text"
                                    aria-disabled={disabledExportName}
                                    className={disabledExportName === true ? "form-control is-disabled" : "form-control"}
                                    name="productNameExport"
                                    value={productNameExport}
                                    readOnly
                                />
                            </div>
                            <div className="col-lg-4 col-md-4 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-product.importDate" />
                                </label>
                                <input
                                    type="date"
                                    aria-disabled={disabledExportName}
                                    className={disabledExportName === true ? "form-control is-disabled" : "form-control"}
                                    name="importDateExport"
                                    value={importDateExport}
                                    readOnly
                                />
                            </div>
                            <div className="col-lg-4 col-md-4 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-product.exportDate" />
                                </label>
                                <input
                                    type="date"
                                    aria-disabled={disabledExport}
                                    className={disabledExport === true ? "form-control is-disabled" : "form-control"}
                                    name="exportDate"
                                    id="exportDate"
                                    value={exportDate}
                                    onChange={(event) => { this.handleOnChangeInput(event, "exportDate") }}
                                />
                            </div>
                            <div className="col-lg-4 col-md-4 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-product.nowQuantity" />
                                </label>
                                <input
                                    type="number"
                                    aria-disabled={disabledExport}
                                    //className="form-control"
                                    className={disabledExport === true ? "form-control is-disabled" : "form-control"}
                                    name="nowQuantity"
                                    value={nowQuantity}
                                    onChange={(event) => { this.handleOnChangeInput(event, "nowQuantity") }}
                                    readOnly
                                />
                            </div>
                            <div className="col-lg-4 col-md-4 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-product.exportQuantity" />
                                </label>
                                <input
                                    type="number"
                                    aria-disabled={disabledExport}
                                    //className="form-control"
                                    className={disabledExport === true ? "form-control is-disabled" : "form-control"}
                                    name="exportQuantity"
                                    id="exportQuantity"
                                    value={exportQuantity}
                                    onChange={(event) => { this.handleOnChangeInput(event, "exportQuantity") }}
                                />
                            </div>
                            <div className="col-lg-4 col-md-4 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-product.remainQuantity" />
                                </label>
                                <input
                                    type="number"
                                    aria-disabled={disabledExport}
                                    //className="form-control"
                                    className={disabledExport === true ? "form-control is-disabled" : "form-control"}
                                    name="remainQuantity"
                                    value={remainQuantity}
                                    onChange={(event) => { this.handleOnChangeInput(event, "remainQuantity") }}
                                    readOnly
                                />
                            </div>
                            <div className="col-lg-12 col-md-12 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-product.description" />
                                </label>
                                <textarea
                                    // aria-disabled={disabled}
                                    className="form-control"
                                    // className={disabled === true ? "form-control is-disabled" : "form-control"}
                                    name="noteExport"
                                    value={noteExport}
                                    onChange={(event) => { this.handleOnChangeInput(event, "noteExport") }}
                                ></textarea>
                            </div>
                            <div className="col-12 my-3">
                                <button
                                    type="button"
                                    aria-disabled={disabled === true ? "true" : "false"}
                                    className={actions === CRUD_ACTIONS.CREATE ?
                                        "btn btn-primary px-3" : "btn btn-warning px-3"}
                                    onClick={() => { this.handleSaveProductExport() }}
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
                                    onClick={() => { this.handleCancelExport() }}
                                >
                                    <FormattedMessage id="manage-user.exit" />
                                </button>
                            </div>
                        </form>
                    </div>
                    <TableManageProduct
                        handleEditProductFromParent={this.handleEditProductFromParent}
                        handleDetailUpdateFromParent={this.handleDetailUpdateFromParent}
                        handleImportProductFromParent={this.handleImportProductFromParent}
                        handleExportProductFromParent={this.handleExportProductFromParent}
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
        unitRedux: state.product.units,
        products: state.product.products
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getUnitStart: () => dispatch(actions.fetchUnitStart()),
        createNewProduct: (data) => dispatch(actions.createNewProduct(data)),
        createNewProExport: (data) => dispatch(actions.createNewProExportStart(data)),
        editProductRedux: (data) => dispatch(actions.editProduct(data)),
        fetchProductsRedux: (currentPage) => dispatch(actions.fetchAllProductsStart(currentPage))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductManage);
