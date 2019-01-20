// param.id,
//     param.accountName,
//     param.nickname,
//     param.avatarUrl,
//     param.phones[0],
//     param.communityName

module.exports = {
    insert:'INSERT INTO User(id,accountName,nickname,avatarUrl,phone,communityName,address) VALUES(?,?,?,?,?,?,?)',
    queryAll:'SELECT * FROM User WHERE address = ? ',
    getUserById:'SELECT * FROM User WHERE id = ? ',
};