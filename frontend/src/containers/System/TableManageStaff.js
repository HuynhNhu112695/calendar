import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
// import { emitter } from '../../utils/emitter';
import * as actions from '../../store/actions';
// import { constant } from 'lodash';
import ReactPaginate from 'react-paginate';
import { LANGUAGES } from '../../utils';
// import { curry } from 'lodash';

class TableManageStaff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMenu: this.props.isMenu,
            usersRedux: [],
            pageCount: 0,
            page: null,
            search: '',
            currentPage: this.props.currentPage
        }
    }

    componentDidMount() {
        this.props.fetchUsersRedux(this.state.isMenu, this.state.currentPage);
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        if (this.state.search !== copyState['search']) {
            let key = copyState['search'];
            let arrUserFind = [];
            let users = this.props.users.users;
            users.filter((item) => {
                if (key && item && item.email && item.email.toLowerCase().includes(key)) {
                    arrUserFind.push(item)
                }
            })
            if (copyState['search'] !== "") {
                copyState['usersRedux'] = arrUserFind;
            } else {
                copyState['usersRedux'] = users;
            }
        }
        this.setState({
            ...copyState
        });
    }

    handleDeleteUser = (user) => {
        this.props.deleteUserRedux(user.id, this.state.isMenu, this.state.page);
    }

    handleEditUser = (user) => {
        this.props.handleEditUserFromParent(user, this.state.page);
    }

    handleDetailUser = (user) => {
        this.props.handleDetailUserFromParent(user, this.state.page);
    }

    componentDidUpdate = async (prevProps, prevState, snapshot) => {
        //after run render => run didUpdate 
        if (prevProps.users !== this.props.users) {
            let use = await this.props.users;
            let userArr = use.users;
            let pageCount = use.pageCount;
            let startIndex = use.startIndex;
            let currentPage = use.currentPage;
            this.setState({
                usersRedux: userArr,
                pageCount: pageCount,
                startIndex: startIndex,
                page: currentPage
            })
        }
    }

    handlePageClick = (e) => {
        let page = e.selected + 1;
        this.props.fetchUsersRedux(this.state.isMenu, page);
    }

    render() {
        let language = this.props.language;
        let users = this.state.usersRedux;
        if (!users) { users = []; }
        let pageCount = this.state.pageCount;
        let startIndex = this.state.startIndex;
        // console.log('state: ', this.state)
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
                                <th></th>
                                <th><FormattedMessage id="manage-user.email" /></th>
                                <th><FormattedMessage id="manage-user.firstname" /></th>
                                <th><FormattedMessage id="manage-user.lastname" /></th>
                                <th><FormattedMessage id="manage-user.gender" /></th>
                                <th><FormattedMessage id="manage-user.role" /></th>
                                <th><FormattedMessage id="manage-user.action" /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users && users.length <= 0 &&
                                <tr>
                                    <td className='text-center' colSpan={6}>
                                        <FormattedMessage id="manage-user.dataEmpty" />
                                    </td>
                                </tr>
                            }
                            {users.length !== 0 && users.map((item, index) => {
                                // console.log('check map: ', item, index)
                                return (
                                    <tr key={item.id}>
                                        <td>{startIndex + index + 1}</td>
                                        <td>{item.email}</td>
                                        <td>{item.firstname}</td>
                                        <td>{item.lastname}</td>
                                        <td>{language === LANGUAGES.VI ? item.genderData.valueVi : item.genderData.valueEn}</td>
                                        <td>{language === LANGUAGES.VI ? item.roleData.valueVi : item.roleData.valueEn}</td>
                                        <td>
                                            <button className='btn-detail' value={item.id}
                                                onClick={(e) => this.handleDetailUser(item)}>
                                                <i className="fas fa-info-circle"></i>
                                            </button>
                                            <button className='btn-edit' value={item.id}
                                                onClick={(e) => this.handleEditUser(item)}>
                                                <i className="fas fa-pencil-alt"></i>
                                            </button>
                                            <button className='btn-delete' value={item.id}
                                                onClick={(e) => {
                                                    window.confirm('Are you sure you want to delete it?',)
                                                        && this.handleDeleteUser(item)
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
        users: state.user.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUsersRedux: (isMenu, currentPage) => dispatch(actions.fetchAllUsersStart(isMenu, currentPage)),
        deleteUserRedux: (id, isMenu, currentPage) => dispatch(actions.deleteUser(id, isMenu, currentPage)),
        editUserRedux: (user) => dispatch(actions.editUser(user)),
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getRoleStart: (isMenu) => dispatch(actions.fetchRoleStart(isMenu)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageStaff);