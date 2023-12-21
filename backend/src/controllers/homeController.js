import db from '../models/index';
let getHomePage = async (req, res) => {
    try {
        let data = await db.Users.findAll();
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e)
    }

    return res.render('homepage.ejs');
}

let getCRUD = (req, res) => {
    // return res.render('crud.ejs');
}

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);

    return res.send('post crud from server');
}

let getDisplayCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();

    return res.render('displaycrud.ejs', {
        dataTable: data
    });
}

let getEditUser = async (req, res) => {
    let userId = req.query.id;
    let userData = await CRUDService.getUserInfoById(userId);

    return res.render('editUser.ejs', { userData: userData });
}

let postUpdateUser = async (req, res) => {
    let message = await CRUDService.updateUser(req.body);

    return res.send('update user success');
}

let deleteUser = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        await CRUDService.deleteUserById(userId);

        return res.send('Delete user succeed!');
    } else {
        return res.send('User not found!');
    }

    return res.send('delete user');
}

module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    getDisplayCRUD: getDisplayCRUD,
    getEditUser: getEditUser,
    postUpdateUser: postUpdateUser,
    deleteUser: deleteUser,
}