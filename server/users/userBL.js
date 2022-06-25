const User = require('./userModel');

exports.getAllUsers = function () {
    return new Promise((resolve, reject) => {
        User.find({}, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    })
}


exports.getUser = function (id) {
    return new Promise((resolve, reject) => {
        User.findById(id, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    })
}


exports.addUser = function (obj) {

    return new Promise((resolve, reject) => {

        const timestamp = new Date().getTime();
        const date = new Date(timestamp);
        let user = new User({
            username: obj.userName,
            password: "",
            fname: obj.fname,
            lname: obj.lname,
            createdDate: date.toLocaleDateString('es-SV'),
            permissions: obj.permissions,
            sysAdmin : obj.sysAdmin,
            SessionTimeOut: obj.sessionTimeOut
        });

        user.save(err => {
            if (err) {
                reject(err);
            }
            else {
                resolve(`${user.username} added successfully!`);
            }
        })
    })
}

exports.updateUserPassword = async function (obj) {
    const { username , password } = obj
    let data = await this.getAllUsers();
    let userData = data.find(user => user.username == username);
    User.findByIdAndUpdate(userData._id,
        {
            password: password
        }, function (err) {

        if (err) {
            return(err);
        }
        else {
            return "Updted";
        }
    });

}

exports.updateUser = function (id, obj) {
    return new Promise((resolve, reject) => {
        User.findByIdAndUpdate(id,
            {
                username: obj.userName,
                fname: obj.fname,
                lname: obj.lname,
                sysAdmin : obj.sysAdmin,
                permissions: obj.permissions,
                SessionTimeOut: obj.sessionTimeOut

            }, function (err) {

            if (err) {
                reject(err);
            }
            else {
                resolve('Updated');
            }
        });
    })
}


exports.deleteUser = function (id) {
    return new Promise((resolve, reject) => {
        User.findByIdAndDelete(id, function (err) {

            if (err) {
                reject(err);
            }
            else {
                resolve('Deleted !');
            }
        });
    })
}