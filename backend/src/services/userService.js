import db from "../models/index";
import bcrypt from "bcryptjs";
import express from 'express';
import { Promise } from 'sequelize';
const salt = bcrypt.genSaltSync(10);

let handleUserLogin = async (email, password) => {
    try {
        let isExist = await checkEmail(email);
        let userData = {};
        if (isExist) {
            // user already exist
            let user = await db.Users.findOne({
                // attributes: ['id', 'email', 'password', 'roleIdId'],
                where: { email: email }
            });

            if (user) {
                //compare password
                let check = await bcrypt.compareSync(password, user.password);

                if (check) {
                    userData.errCode = 0;
                    userData.errMessage = 'Ok!';
                    delete user.password;
                    userData.user = user;
                } else {
                    userData.errCode = 3;
                    userData.errMessage = 'Mật khẩu không đúng!';
                }
            } else {
                userData.errCode = 2;
                userData.errMessage = `Không tìm thấy thông tin tài khoản!`;
            }
        } else {
            //return error
            userData.errCode = 1;
            userData.errMessage = `Tài khoản của bạn không tồn tại trong hệ thống. Vui lòng kiểm tra lại!`;
        }
        return userData;
    } catch (e) {
        return e;
    }
}

let checkEmail = async (email) => {
    try {
        let user = await db.Users.findOne({
            where: {
                email: email,
                action: 1
            }
        })
        if (user) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        return e;
    }
}

let getAllUsers = async (userId) => {
    try {
        let users = '';
        if (userId === 'USER') {
            users = await db.Users.findAll({
                attributes: {
                    exclude: ['password']
                }, order: [
                    ['createdAt', 'DESC']
                ],
                where: {
                    roleId: ['R1', 'R2', 'R5'],
                    action: 1
                },
                include: [
                    { model: db.Allcodes, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcodes, as: 'roleData', attributes: ['valueEn', 'valueVi'] }
                ],
                raw: true,
                nest: true
            });
        }
        if (userId === 'STAFF') {
            users = await db.Users.findAll({
                attributes: {
                    exclude: ['password']
                }, order: [
                    ['createdAt', 'DESC']
                ],
                where: {
                    roleId: ['R3', 'R6'],
                    action: 1
                },
                include: [
                    { model: db.Allcodes, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcodes, as: 'roleData', attributes: ['valueEn', 'valueVi'] }
                ],
                raw: true,
                nest: true
            });
        }
        if (userId === 'CUSTOMER') {
            users = await db.Users.findAll({
                attributes: {
                    exclude: ['password']
                },
                order: [
                    ['createdAt', 'DESC']
                ],
                where: {
                    roleId: ['R4', 'R7'],
                    action: 1
                },
                include: [
                    { model: db.Allcodes, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcodes, as: 'roleData', attributes: ['valueEn', 'valueVi'] }
                ],
                raw: true,
                nest: true
            });
        }
        // if (userId && userId !== 'ALL') {
        //     users = await db.Users.findOne({
        //         where: { id: userId },
        //         attributes: {
        //             exclude: ['password']
        //         }
        //     });
        // }
        return users;
    } catch (e) {
        return e;
    }
}

let hashUserPassword = async (password) => {
    try {
        let hashPassword = await bcrypt.hashSync(password, salt);
        return hashPassword;
    } catch (e) {
        return e;
    }
}

let addNewUser = async (data) => {
    try {
        let check = await checkEmail(data.email);
        if (check === true) {
            return ({
                errCode: 1,
                errMessage: "Email đã tồn tại, vui lòng sử dụng email khác!"
            })
        } else {
            if (data.isMenu === 'USER') {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.Users.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    roleId: data.roleId,
                    firstname: data.firstname,
                    lastname: data.lastname,
                    birthday: data.birthday,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender,
                    percentOfStaff: 0,
                    note: data.note,
                    action: data.action
                })
            } else if (data.isMenu === "STAFF") {
                await db.Users.create({
                    email: data.email,
                    roleId: data.roleId,
                    firstname: data.firstname,
                    lastname: data.lastname,
                    birthday: data.birthday,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    percentOfStaff: data.percentOfStaff,
                    gender: data.gender,
                    note: data.note,
                    action: data.action
                })
            } else {
                await db.Users.create({
                    email: data.email,
                    roleId: data.roleId,
                    firstname: data.firstname,
                    lastname: data.lastname,
                    birthday: data.birthday,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    percentOfStaff: 0,
                    note: data.note,
                    gender: data.gender,
                    action: data.action
                })
            }

            return ({
                errCode: 0,
                errMessage: "Tạo tài khoản mới thành công!"
            })
        }
    } catch (e) {
        return e;
    }
}

let deleteUser = async (userId, isMenu) => {
    try {
        let user = await db.Users.findOne({
            where: { id: userId }
        });
        if (!user) {
            return ({
                errCode: 1,
                errMessage: "Tài khoản không tồn tại!"
            })
        }

        if (user) {
            if (isMenu === "USER") {
                let allUser = await db.Users.findAll({
                    where: {
                        roleId: ['R1', 'R2', 'R5'],
                        action: 1
                    },
                });
                let count = allUser.length;
                if (count === 1) {
                    return ({
                        errCode: 1,
                        errMessage: "Xóa tài khoản không thành công!!"
                    })
                } else {
                    await db.Users.destroy({
                        where: { id: userId }
                    });
                    return ({
                        errCode: 0,
                        errMessage: "Xóa tài khoản thành công!"
                    })
                }
            }
            if (isMenu === "STAFF") {
                let staffBooking = [];
                staffBooking = await db.Bookings.findAll({
                    where: {
                        action: 1,
                        staffId: userId
                    }
                });
                let staffSalary = [];
                staffSalary = await db.Salary.findAll({
                    where: {
                        action: 1,
                        staffId: userId
                    }
                });
                if (staffBooking.length === 0 && staffSalary.length === 0) {
                    await db.Users.destroy({
                        where: { id: userId }
                    });
                }
                if (staffBooking.length !== 0) {
                    await db.Users.update({
                        action: 0
                    }, {
                        where: { id: userId }
                    });
                    await db.Bookings.update({
                        action: 0
                    }, {
                        where: { staffId: userId }
                    });
                }
                if (staffSalary.length !== 0) {
                    await db.Users.update({
                        action: 0
                    }, {
                        where: { id: userId }
                    });
                    await db.Salary.update({
                        action: 0
                    }, {
                        where: { staffId: userId }
                    });
                }

                return ({
                    errCode: 0,
                    errMessage: "Xóa tài khoản thành công!"
                })
            }
            if (isMenu === "CUSTOMER") {
                let cusBooking = [];
                cusBooking = await db.Bookings.findAll({
                    where: {
                        action: 1,
                        customerId: userId
                    }
                });
                if (cusBooking.length === 0) {
                    await db.Users.destroy({
                        where: { id: userId }
                    });
                }
                if (cusBooking.length !== 0) {
                    await db.Users.update({
                        action: 0
                    }, {
                        where: { id: userId }
                    });
                    await db.Bookings.update({
                        action: 0
                    }, {
                        where: { customerId: userId }
                    });
                }

                return ({
                    errCode: 0,
                    errMessage: "Xóa tài khoản thành công!"
                })
            }
        }
    } catch (e) {
        return e;
    }
}

let editUser = async (data) => {
    try {
        let user = await db.Users.findOne({
            where: { id: data.id }
        })
        if (user) {
            if (data.email !== user.email) {
                let check = await checkEmail(data.email);
                if (check === true) {
                    return ({
                        errCode: 1,
                        errMessage: "Email đã tồn tại, vui lòng sử dụng email khác!"
                    })
                }
            }
            await db.Users.update({
                email: data.email,
                roleId: data.roleId,
                firstname: data.firstname,
                lastname: data.lastname,
                birthday: data.birthday,
                address: data.address,
                phonenumber: data.phonenumber,
                percentOfStaff: data.percentOfStaff,
                gender: data.gender,
                note: data.note,
                action: data.action
            }, { where: { id: data.id } })
            return ({
                errCode: 0,
                errMessage: "Cập nhật thành công!"
            })
        } else {
            return ({
                errCode: 1,
                errMessage: "Tài khoản không tồn tại!"
            })
        }
    } catch (e) {
        return e;
    }
}

let getAllcodeService = async (typeInput) => {
    try {
        if (!typeInput) {
            return ({
                errCode: 1,
                errMessage: 'Dữ liệu đầu vào rỗng!'
            });
        } else {
            let res = {};
            let allcode = await db.Allcodes.findAll({
                where: { type: typeInput }
            });
            res.errCode = 0;
            res.data = allcode;
            return res;
        }
    } catch (e) {
        return e;
    }
}

module.exports = {
    handleUserLogin: handleUserLogin,
    checkEmail: checkEmail,
    getAllUsers: getAllUsers,
    hashUserPassword: hashUserPassword,
    addNewUser: addNewUser,
    deleteUser: deleteUser,
    editUser: editUser,
    getAllcodeService: getAllcodeService,
}