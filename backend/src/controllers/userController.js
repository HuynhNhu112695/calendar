import userService from "../services/userService";
import scheduleService from "../services/scheduleService";
import { createJWT, verifyToken } from '../middleware/JWTAction';

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing inputs parameter!"
        })
    } else {
        let userData = await userService.handleUserLogin(email, password);
        // check email exist
        // compare password
        //acess_token: JWT (json web token)
        // return user infomation
        return res.status(200).json({
            errCode: userData.errCode,
            errMessage: userData.errMessage,
            user: userData.user ? userData.user : {}
        })
    }
}

let countStaff = async (req, res) => {
    let staffs = await userService.getAllUsers('STAFF');
    return res.status(200).json({
        errCode: 0,
        errMessage: "Count staff succeed!",
        totalStaff: staffs.length
    })
}

let handleGetAllUser = async (req, res) => {
    let id = req.query.id;
    let page = req.query.page;
    let users = [];
    let allUser = [];
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing inputs parameter! ',
            users: []
        })
    }

    users = await userService.getAllUsers(id);
    allUser = users;
    if (page !== '0') {
        let limit = 30;
        let startIndex = (page - 1) * limit
        let endIndex = page * limit
        let totalUser = users.length;
        let pageCount = Math.ceil(totalUser / limit);

        if (endIndex < totalUser) {
            users.next = {
                page: page + 1,
                limit: limit
            }

        }
        if (startIndex > 0) {
            users.prev = {
                page: page - 1,
                limit: limit
            }
        }
        if (users) {
            users = users.slice(startIndex, endIndex);
        }

        return res.status(200).json({
            errCode: 0,
            errMessage: 'Ok',
            users: users,
            currentPage: page,
            pageCount: pageCount,
            allUser: allUser,
            startIndex: startIndex,
            totalUser: totalUser
        })
    } else {
        return res.status(200).json({
            errCode: 0,
            errMessage: 'Ok',
            users: users,
            allUser: allUser,
            totalUser: users.length
        })
    }
}

let handleGetAllStaffsWorking = async (req, res) => {
    let date = req.query.date;
    if (!date) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing inputs parameter! ',
            users: []
        })
    }
    let staffRest = [];
    let allStaffs = [];
    let arrStaffWorking = [];
    allStaffs = await userService.getAllUsers("STAFF");
    staffRest = await scheduleService.getStaffRest(date);
    if (staffRest.length > 0) {
        allStaffs.forEach(arr1 => {
            staffRest.forEach(arr2 => {
                if (arr1.id !== arr2.staffId) {
                    arrStaffWorking.push(arr1)
                }
            })
        });
    } else {
        arrStaffWorking = allStaffs;
    }
    return res.status(200).json({
        errCode: 0,
        errMessage: "Ok!",
        listStaff: arrStaffWorking
    })
}

// let getAddNewUser = (req, res) => {
//     return res.render('addUser.ejs');
// }

let handleAddNewUser = async (request, res) => {
    let data = request.body;
    if (!data.email || !data.roleId || !data.gender || !data.firstname || !data.lastname
        || !data.phonenumber || !data.address) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing inputs paramater!'
        })
    }
    let message = await userService.addNewUser(data);
    return res.status(200).json({
        errCode: message.errCode,
        errMessage: message.errMessage
    })
}

let handleDeleteUser = async (req, res) => {
    let userId = req.query.id;
    let isMenu = req.query.isMenu;

    if (!userId) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing inputs paramater!'
        })
    }
    if (userId) {
        let message = await userService.deleteUser(userId, isMenu);
        return res.status(200).json({
            errCode: message.errCode,
            errMessage: message.errMessage
        });
    }
}

let handleEditUser = async (req, res) => {
    let data = req.body;
    if (!data.id || !data.email || !data.roleId || !data.gender || !data.firstname || !data.lastname
        || !data.phonenumber || !data.address) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing inputs paramater!'
        })
    }
    let message = await userService.editUser(data);
    return res.status(200).json({
        errCode: message.errCode,
        errMessage: message.errMessage
    });
}

let getAllcode = async (req, res) => {
    try {
        let data = await userService.getAllcodeService(req.query.type);
        return res.status(200).json(data);
    } catch (e) { //e: exception
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
module.exports = {
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser,
    handleGetAllStaffsWorking: handleGetAllStaffsWorking,
    // getAddNewUser: getAddNewUser,
    handleAddNewUser: handleAddNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
    getAllcode: getAllcode,
    countStaff: countStaff
}