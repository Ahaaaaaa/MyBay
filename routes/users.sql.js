// param.id,
//     param.accountName,
//     param.nickname,
//     param.avatarUrl,
//     param.phones[0],
//     param.communityName

module.exports = {
    insert:'INSERT INTO user(id,accountName,nickname,avatarUrl,phone,communityName,address) VALUES(?,?,?,?,?,?,?)',
    queryAll:'SELECT * FROM user WHERE address = ? ',
    getUserById:'SELECT * FROM user WHERE id = ? ',
};