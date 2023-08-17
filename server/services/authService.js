const db = require('./db');
const helpers = require('../helpers')
const config = require('../config')

async function getByUserName(userName) {
    const query = `
        select u.id, profile_type_id, p.name, username, firstname, surname, phone, email, password
        FROM USER_PROFILE u
        INNER JOIN USER_PROFILE_TYPE p on u.profile_type_id = p.id
        WHERE username = ?
    `;

    const rows = await db.query(query, [userName]);
    const data = helpers.emptyOrRows(rows);

    return data[0];
}

async function getByUserById(id) {
    const query = `
        select u.id, firstname, surname, phone, email
        FROM USER_PROFILE u        
        WHERE id = ?
    `;

    const rows = await db.query(query, [id]);
    const data = helpers.emptyOrRows(rows);

    return data[0];
}

async function updateProfile(id, firstName, lastName, phone) {
    const query = `
        update USER_PROFILE
        set firstName = ?,
            surname = ?,            
            phone = ?
        where id = ?
    `;

    const result = await db.query(query, [firstName, lastName, phone, id]);

    let message = `Error creating record on table: USER_PROFILE`;

    if(result.affectedRows) {
        message = 'Record successfully created!';
    }

    return { message };
}

async function createUser(
    profile_type_id, username, firstname, surname, phone, email, password
) {
    const result = await db.query(
        "INSERT INTO `USER_PROFILE` (`profile_type_id`, `username`, `firstname`, `surname`, `phone`, `email`, `password`) VALUES ( ?, ?, ?, ?, ?, ?, ?) ",
        [profile_type_id, username, firstname, surname, phone, email, password]);

    let message = `Error creating record on table: USER_PROFILE`;

    if(result.affectedRows) {
        message = 'Record successfully created!';
    }

    return { message };
}

module.exports = {
    createUser,
    getByUserName,
    getByUserById,
    updateProfile
}

