const db = require('./db');
const helpers = require('../helpers')
const config = require('../config')
async function getById(id) {
    const query = `
        select u.id, firstname, surname, phone, email
        FROM USER_PROFILE u        
        WHERE id = ?
    `;

    const rows = await db.query(query, [id]);
    const data = helpers.emptyOrRows(rows);

    return data[0];
}

async function update(id, firstName, lastName, phone) {
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

module.exports = {
    getById,
    update
}

