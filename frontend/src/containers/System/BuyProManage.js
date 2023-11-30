import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
// import moment from 'moment';
// import { emitter } from '../../utils/emitter';
import * as actions from '../../store/actions';
import { LANGUAGES, CRUD_ACTIONS } from "../../utils";
import ReactPaginate from 'react-paginate';

class BuyProManage extends Component {
    /*  Life cycle
    * Run component
    * 1. Run construc -> init state
    * 2. Did mount (set state)
    * 3. Render
    * */

    constructor(props) {
        super(props);
        this.state = {
            buyProArr: [],
            note: '',
            page: 1
        }
    }

    async componentDidMount() {
        this.props.getBuyProStart(this.state.page);
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        //after run render => run didUpdate
        if (prevProps.productRedux !== this.props.productRedux) {
            let arrProducts = this.props.productRedux.buyProArr;
            // let unit = arrUnits && arrUnits.length > 0 ? arrUnits[0].key : '';
            this.setState({
                buyProArr: arrProducts
                // unit: unit
            })
        }
    }

    handlePageClick = (e) => {
        let page = e.selected + 1;
        this.props.fetchServicesTypeRedux(page);
        this.setState({
            page: page
        })
    }


    render() {
        let language = this.props.language;
        let products = this.state.buyProArr;
        if (!products) { products = []; }
        let { note, disabled }
            = this.state;
        let pageCount = this.props.productRedux.pageCount;
        // let startIndex = this.props.productRedux.startIndex;
        return (
            <div className="overflow-auto user-redux-container">
                <div className="title py-3">
                    <FormattedMessage id="manage-product.buyPro" />
                </div>
                <div className="user-redux-body">
                    <div className="container">
                        <form className="row g-3">
                            {/* <div className="col-12">{isLoadingGender ? 'Loading genders' : ''}</div> */}
                            <div className="col-lg-12 col-md-12 col-xs-auto">
                                <label className="form-label">
                                    <FormattedMessage id="manage-product.description" />
                                </label>
                                <textarea
                                    aria-disabled={disabled}
                                    className={disabled === true ? "form-control is-disabled note-buy" : "form-control note-buy"}
                                    name="note"
                                    value={note}
                                    onChange={(event) => { this.handleOnChangeInput(event, "note") }}
                                ></textarea>
                            </div>
                        </form>
                    </div>
                    <div className="container">
                        <div className='users-table mt-4 mb-4 table-responsive'>
                            <table className='table table-bordered' id="customers">
                                <thead>
                                    <tr>
                                        <th><FormattedMessage id="manage-product.productName" /></th>
                                        <th><FormattedMessage id="manage-product.nowQuantity" /></th>
                                        <th><FormattedMessage id="manage-product.unit" /></th>
                                        <th className='title-quantity'><FormattedMessage id="manage-product.importQuantity" /></th>
                                        <th className='title-note'><FormattedMessage id="manage-product.description" /></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.length === 0 &&
                                        <tr>
                                            <td className='text-center' colSpan={6}>
                                                <FormattedMessage id="manage-user.dataEmpty" />
                                            </td>
                                        </tr>
                                    }
                                    {products.length !== 0 && products.map((item, index) => {
                                        return (
                                            <tr key={item.id}>
                                                <td>{item.productName}</td>
                                                <td>{item.nowQuantity}</td>
                                                <td>{language === LANGUAGES.VI ? item.unitPro.valueVI : item.unitPro.valueEN}</td>
                                                <td><input className='input-quantity' /></td>
                                                <td><input type="text" className='input-note' /></td>
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
                </div>
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        productRedux: state.product.buyPro
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getBuyProStart: (page) => dispatch(actions.fetchBuyProStart(page))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BuyProManage);
