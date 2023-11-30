import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import moment from 'moment';
// import { emitter } from '../../utils/emitter';
import * as actions from '../../store/actions';
import { LANGUAGES } from "../../utils";
// import { constant } from 'lodash';
import ReactPaginate from 'react-paginate';

class TableManageProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            productImports: [],
            proExports: [],
            pageCount: 0,
            currentPage: this.props.currentPage,
            page: null,
            search: ''
        }
    }

    componentDidMount() {
        this.props.fetchProductsRedux(this.state.currentPage);
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        if (this.state.search !== copyState['search']) {
            let key = copyState['search'];
            // console.log("key", key)
            let arrProductFind = [];
            let products = this.props.products.products;
            // console.log("search", products)
            products.filter((item) => {
                if (key && item && item.productName && item.productName.toLowerCase().includes(key)) {
                    arrProductFind.push(item)
                }
            })
            if (copyState['search'] !== "") {
                copyState['products'] = arrProductFind;
            } else {
                copyState['products'] = products;
            }

        }
        this.setState({
            ...copyState
        });
    }

    handleDeleteProduct = (product) => {
        this.props.deleteProductRedux(product.importId, product.productId, this.state.page);
    }

    handleDeleteImportProduct = async (importPro) => {
        let nowQuantity = 0;
        if (importPro.exportId) {
            let products = [];
            let sumExport = 0;
            products = this.state.products;
            await products.map((e) => {
                if (importPro.importId === e.importId) {
                    sumExport = sumExport + e.exportQuantity;
                }
            })
            nowQuantity = parseInt(importPro.nowQuantity) + parseInt(sumExport) - parseInt(importPro.importQuantity);
            // console.log("1", nowQuantity)
        } else {
            nowQuantity = parseInt(importPro.nowQuantity) - parseInt(importPro.importQuantity)
            // console.log("2", nowQuantity)
        }
        this.props.deleteImportProductRedux(importPro.importId, this.state.page, nowQuantity, importPro.productId);
    }

    handleEditProduct = (user) => {
        this.props.handleEditProductFromParent(user, this.state.page);
    }

    handleImportProduct = (user) => {
        // window.scrollTo({ top: 0, behavior: 'smooth' });
        this.props.handleImportProductFromParent(user, this.state.page);
    }

    handleExportProduct = (user) => {
        this.props.handleExportProductFromParent(user, this.state.page);
    }

    handleDetailUpdate = (pro) => {
        this.props.handleDetailUpdateFromParent(pro);
    }


    componentDidUpdate = (prevProps, prevState, snapshot) => {
        //after run render => run didUpdate
        if (prevProps.products !== this.props.products) {
            let productArr = this.props.products.products;
            let productImport = this.props.products.productImports;
            let pageCount = this.props.products.pageCount;
            let startIndex = this.props.products.startIndex;
            let currentPage = this.props.products.currentPage;
            this.setState({
                products: productArr,
                productImports: productImport,
                pageCount: pageCount,
                startIndex: startIndex,
                page: currentPage
            })
        }
    }

    handlePageClick = (e) => {
        let page = e.selected + 1;
        this.props.fetchProductsRedux(page);
    }

    render() {
        let language = this.props.language;
        let products = [];
        products = this.state.products;
        if (!products) { products = []; }
        let productImports = [];
        productImports = this.state.productImports;
        if (!productImports) { productImports = []; }
        let pageCount = this.state.pageCount;
        // let startIndex = this.state.startIndex;
        let importArr = {};
        let nameArr = {};
        let rowSpanImport = products.reduce((result, item, key) => {
            if (importArr[item.importId] === undefined) {
                importArr[item.importId] = key;
                result[key] = 1;
            } else {
                let firstIndex = importArr[item.importId];
                if (
                    firstIndex === key - 1 ||
                    (item.importId === products[key - 1].importId && result[key - 1] === 0)
                ) {
                    result[firstIndex]++;
                    result[key] = 0;
                } else {
                    result[key] = 1;
                    importArr[item.importId] = key;
                }
            }
            return result;
        }, []);
        let rowSpanProName = products.reduce((result1, item1, key1) => {
            if (nameArr[item1.productId] === undefined) {
                nameArr[item1.productId] = key1;
                result1[key1] = 1;
            } else {
                let firstIndex = nameArr[item1.productId];
                if (
                    firstIndex === key1 - 1 ||
                    (item1.productId === products[key1 - 1].productId && result1[key1 - 1] === 0)
                ) {
                    result1[firstIndex]++;
                    result1[key1] = 0;
                } else {
                    result1[key1] = 1;
                    nameArr[item1.productId] = key1;
                }
            }
            return result1;
        }, []);
        return (
            <div className="container">
                <form className="row g-3">
                    <div className='col-lg-8 col-md-8 col-xs-auto text-search'>
                        <FormattedMessage id="manage-user.search" />
                    </div>
                    <div className='col-lg-4 col-md-4 col-xs-auto search'>
                        <input
                            type="text"
                            className="form-control"
                            name="search"
                            value={this.state.search}
                            onChange={(event) => { this.handleOnChangeInput(event, "search") }}
                        />
                    </div>
                </form>
                <div className='users-table mt-4 mb-4 table-responsive'>
                    <table className='table table-bordered' id="customers">
                        <thead>
                            <tr>
                                <th className='import'><FormattedMessage id="manage-user.action" /></th>
                                <th><FormattedMessage id="manage-product.productName" /></th>
                                <th><FormattedMessage id="manage-product.importDate" /></th>
                                <th><FormattedMessage id="manage-product.quantity" /></th>
                                <th><FormattedMessage id="manage-product.unit" /></th>
                                <th><FormattedMessage id="manage-product.price" /></th>
                                <th className='import'><FormattedMessage id="manage-user.action" /></th>
                                <th><FormattedMessage id="manage-product.exportDate" /></th>
                                <th><FormattedMessage id="manage-product.nowQuantity" /></th>
                                <th><FormattedMessage id="manage-product.exportQuantity" /></th>
                                <th><FormattedMessage id="manage-product.remainQuantity" /></th>
                                <th><FormattedMessage id="manage-product.description" /></th>
                                {/* <th><FormattedMessage id="manage-user.action" /></th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {products.length === 0 &&
                                <tr>
                                    <td className='text-center' colSpan={12}>
                                        <FormattedMessage id="manage-user.dataEmpty" />
                                    </td>
                                </tr>

                            }
                            {products.length !== 0 &&
                                products.map((item, index) => {
                                    let importDate = moment(item.importDate).format("MM-DD-YYYY");
                                    let exportDate = item.exportDate
                                    if (exportDate) {
                                        exportDate = moment(item.exportDate).format("MM-DD-YYYY");
                                    }
                                    return (
                                        <tr key={index}>
                                            {rowSpanProName[index] > 0 && <td className={rowSpanProName[index] > 1 ? 'styleRow' : ''} rowSpan={rowSpanProName[index]}><span className={rowSpanProName[index] > 1 ? 'spanRow' : ''}>
                                                <button type='button' className='btn btn-import'
                                                    onClick={(e) => this.handleImportProduct(item)}>
                                                    <span>Import</span>
                                                </button>
                                                <button type='button' className='btn btn-delete-import'
                                                    onClick={(e) => {
                                                        window.confirm('Are you sure you want to delete it?',)
                                                            && this.handleDeleteProduct(item)
                                                    }}>Delete
                                                    {/* <i className="fas fa-trash-alt"></i> */}
                                                </button>
                                            </span>
                                            </td>}
                                            {rowSpanProName[index] > 0 &&
                                                <td className={rowSpanProName[index] > 1 ? 'styleRow' : ''}
                                                    rowSpan={rowSpanProName[index]}>
                                                    <span className={rowSpanProName[index] > 1 ? 'spanRow' : ''}>
                                                        {item.productName}
                                                    </span></td>}
                                            {rowSpanImport[index] > 0 &&
                                                <td className={rowSpanImport[index] > 1 ? 'styleRow' : ''}
                                                    rowSpan={rowSpanImport[index]}>
                                                    <span className={rowSpanImport[index] > 1 ? 'spanRow' : ''}>
                                                        {importDate}
                                                    </span></td>}
                                            {rowSpanImport[index] > 0 &&
                                                <td className={rowSpanImport[index] > 1 ? 'styleRow' : ''}
                                                    rowSpan={rowSpanImport[index]}>
                                                    <span className={rowSpanImport[index] > 1 ? 'spanRow' : ''}>
                                                        {item.importQuantity}
                                                    </span></td>}
                                            {rowSpanImport[index] > 0 &&
                                                <td className={rowSpanImport[index] > 1 ? 'styleRow' : ''}
                                                    rowSpan={rowSpanImport[index]}>
                                                    <span className={rowSpanImport[index] > 1 ? 'spanRow' : ''}>
                                                        {language === LANGUAGES.VI ? item.unit.valueVI : item.unit.valueEN}
                                                    </span></td>}
                                            {rowSpanImport[index] > 0 &&
                                                <td className={rowSpanImport[index] > 1 ? 'styleRow' : ''}
                                                    rowSpan={rowSpanImport[index]}>
                                                    <span className={rowSpanImport[index] > 1 ? 'spanRow' : ''}>
                                                        {item.price}
                                                    </span></td>}
                                            {rowSpanImport[index] > 0 &&
                                                <td className={rowSpanImport[index] > 1 ? 'styleRow' : ''}
                                                    rowSpan={rowSpanImport[index]}>

                                                    {productImports && productImports.length !== 0 &&
                                                        productImports.map((iPro) => {
                                                            {
                                                                if (iPro.maxId === item.importId) {
                                                                    return (
                                                                        <span className={rowSpanImport[index] > 1 ? 'spanRow' : ''}>
                                                                            {item.nowQuantity !== 0 &&
                                                                                <button type='button' className='btn btn-export'
                                                                                    onClick={(e) => this.handleExportProduct(item)}>
                                                                                    Export
                                                                                </button>
                                                                            }
                                                                            <button type='button' className='btn btn-delete-import'
                                                                                onClick={(e) => {
                                                                                    window.confirm('Are you sure you want to delete it?',)
                                                                                        && this.handleDeleteImportProduct(item)
                                                                                }}>Delete
                                                                                {/* <i className="fas fa-trash-alt"></i> */}
                                                                            </button>
                                                                        </span>
                                                                    )
                                                                }
                                                            }
                                                        })
                                                    }
                                                </td>}
                                            <td>{exportDate}</td>
                                            <td>{productImports && productImports.length !== 0 &&
                                                productImports.map((iPro) => {
                                                    {
                                                        if (iPro.maxId === item.importId) {
                                                            return (item.nowQuantity)
                                                        }
                                                    }
                                                })}</td>
                                            {/* <td>{item.nowQuantity}</td> */}
                                            <td>{item.exportQuantity}</td>
                                            <td>{item.remainQuantity}</td>
                                            <td>{item.exportNote}</td>
                                            {/* <td>
                                                <button className='btn-detail'
                                                    onClick={(e) => this.handleUpdateProduct(item)}>
                                                    <i className="fas fa-exchange-alt"></i>
                                                </button>
                                                <button className='btn-edit'
                                                    onClick={(e) => this.handleEditProduct(item)}>
                                                    <i className="fas fa-pencil-alt"></i>
                                                </button>
                                                <button className='btn-detail'
                                                    onClick={(e) => this.handleDetailUpdate(item)}>
                                                    <i className="fas fa-info-circle"></i>
                                                </button>
                                                {item.proExport.id &&
                                                    <button className='btn-delete'
                                                        onClick={(e) => {
                                                            window.confirm('Are you sure you want to delete it?',)
                                                                && this.handleDeleteExportProduct(item)
                                                        }}>
                                                        <i className="fas fa-trash-alt"></i>
                                                    </button>}
                                            </td> */}
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    {pageCount <= 1 &&
                        <div className='mt-5'></div>
                    }
                    {pageCount > 1 &&
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel=">>"
                            onPageChange={this.handlePageClick}
                            renderOnZeroPageCount={null}
                            pageRangeDisplayed={5}
                            pageCount={pageCount}
                            previousLabel="<<"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            containerClassName="pagination"
                            activeClassName="active"
                            forcePage={parseInt(this.state.page - 1)}
                        />
                    }
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        language: state.app.language,
        products: state.product.products
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProductsRedux: (currentPage) => dispatch(actions.fetchAllProductsStart(currentPage)),
        deleteProductRedux: (id, productId, currentPage) => dispatch(actions.deleteProduct(id, productId, currentPage)),
        deleteImportProductRedux: (id, currentPage, nowQuantity, idPro) => dispatch(actions.deleteImportProduct(id, currentPage, nowQuantity, idPro)),
        editProductRedux: (user) => dispatch(actions.editProduct(user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageProduct);