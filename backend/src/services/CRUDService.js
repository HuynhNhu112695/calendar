import bcrypt from 'bcryptjs';
import e from 'express';
import { Promise } from 'sequelize';
import db from '../models/index';
const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    // return new Promise((resolve, reject) => {
    try {
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
        await db.User.create({
            email: data.email,
            password: hashPasswordFromBcrypt,
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            phonenumber: data.phonenumber,
            gender: data.gender === '1' ? true : false,
            roleId: data.roleId
        })

        return 'ok! create a new user succeed';
    } catch (e) {
        return e;
    }
    // })

}

let hashUserPassword = async (password) => {
    // return new Promise((resolve, reject) => {
    try {
        let hashPassword = await bcrypt.hashSync(password, salt);
        return hashPassword;
    } catch (e) {
        return e;
    }
    // })
}

let getAllUser = async () => {
    try {
        let users = await db.User.findAll({ raw: true, });
        return users;
    } catch (e) {
        return e;
    }

}

let getUserInfoById = async (id) => {
    try {
        let userData = await db.User.findOne({
            where: { id: id },
            raw: true,
        });

        return userData;
    } catch (e) {
        return e;
    }
}

let updateUser = async (data) => {
    try {
        await db.User.update({
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            phonenumber: data.phonenumber,
            gender: data.gender === '1' ? true : false,
            roleId: data.roleId
        }, { where: { id: data.id } })

        return 'update user succeed';
    } catch (e) {
        return e;
    }

}

let deleteUserById = async (userId) => {
    try {
        let user = await db.User.findOne({
            where: { id: userId }
        });
        if (user) {
            await user.destroy();
        }

        return "Delete user succeed!";
    } catch (e) {
        return e;
    }
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUser: updateUser,
    deleteUserById: deleteUserById,
}