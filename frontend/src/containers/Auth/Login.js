import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
import { handleLoginApi } from '../../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isShowPassword: false,
            errMessage: ''
        }
    }

    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value,
        })
    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value,
        })
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            // console.log('email: ', this.state.email)
            let data = await handleLoginApi(this.state.email, this.state.password);

            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.errMessage
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user);
                // console.log("Login succeed!")
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
        }

    }

    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-center text-login'>ĐĂNG NHẬP</div>
                        <div className='col-12 form-group'>
                            <label>Email</label>
                            <input type="text"
                                className='form-control login-input email'
                                value={this.state.email}
                                placeholder='Hãy nhập email của bạn'
                                onChange={(event) => this.handleOnChangeEmail(event)} />
                        </div>
                        <div className='col-12 form-group'>
                            <label>Mật khẩu</label>
                            <div className='custom-input-password'>
                                <input type={this.state.isShowPassword ? 'text' : 'password'}
                                    className='form-control login-input password'
                                    placeholder='Hãy nhập mật khẩu của bạn'
                                    value={this.state.password}
                                    onChange={(event) => this.handleOnChangePassword(event)} />
                                <span
                                    onClick={() => this.handleShowHidePassword()}>
                                    <i className={this.state.isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                                </span>
                            </div>
                        </div>
                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12'>
                            <button className='btn-login' onClick={() => this.handleLogin()}>Đăng nhập</button>
                        </div>
                        {/* <div className='col-12 text-center mt-2'>
                            <span className='forgot-password'>Forgot your password?</span>
                        </div>
                        <div className='col-12 text-center mt-2 mb-2'>
                            <span className='login-with'>Or login with:</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className='fab fa-google-plus-g social-icon google'></i>
                            <i className='fab fa-facebook-f social-icon facebook'></i>
                        </div> */}
                        <div className='col-12 text-center mt-4 mb-4'>
                            <span className='login-with'>CHÀO MỪNG ĐẾN VỚI PHẦN MỀM NHẮC VIỆC!</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
