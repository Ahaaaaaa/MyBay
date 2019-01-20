module.exports = {
    insert:'INSERT INTO User(uid,nickname,avatarUrl,phone,namespace) VALUES(?,?,?,?,?)',
    queryAllByNamespace:'SELECT * FROM User WHERE namespace = ? ',
    getUserById:'SELECT * FROM User WHERE uid = ? ',
};