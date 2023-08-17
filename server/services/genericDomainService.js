const db = require('./db');
const helpers = require('../helpers')
const config = require('../config')

async function getAll(table) {
    const query = ` select id, name FROM ${table.toUpperCase()} order by name `;

    console.log(query)

    const rows = await db.query(query);
    const data = helpers.emptyOrRows(rows);

    return {
        items: data,

    }
}

async function getFiltered(tableName, id) {
    let filterField = ``;

    let idName = 'id';
    let textName = 'name';

    switch(tableName) {
        case 'VEHICLE_MANUFACTURER_MODEL':
            filterField = `manufacturer_id`;
            break;
        case 'VIEW_VEHICLES_BY_PROFILE':
            filterField = `user_profile_id`;
            textName = `register`;
            break;
    }

    if(!filterField) throw new Error('Could not get a valid query from the tableName option');

    const query = ` 
        select ${idName} as id, ${textName} as name 
        FROM ${tableName.toUpperCase()} 
        where ${filterField} = ? 
        Order by ${textName}`;


    console.log(query)

    const rows = await db.query(query, [id]);
    const data = helpers.emptyOrRows(rows);

    return {
        items: data,

    }
}

async function getPaged(table, page = 1) {
    const offset = helpers.getOffset(page, config.itemsPerPage);
    const rows = await db.query(`
        select id, name 
        FROM ${table.toUpperCase()} LIMIT ?, ${config.itemsPerPage}
    `, offset);

    const data = helpers.emptyOrRows(rows);
    const meta = {page};

    return {
        meta,
        items: data,

    }
}

async function getOne(id, table,  page = 1) {
    const rows = await db.query(`
        select id, name 
        FROM ${table.toUpperCase()} 
        WHERE id = '?';
    `, id);

    const data = helpers.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta
    }
}

async function create(table, value) {
    const result = await db.query(`
        INSERT INTO ${table.toUpperCase()} 
        (name) 
        VALUES 
        ('?')
    `, value);

    let message = `Error creating record on table: [${table.toUpperCase()}]`;

    if(result.affectedRows) {
        message = 'Record successfully created!';
    }

    return { message };
}

async function update(id, table, value){
    const result = await db.query(`
        UPDATE ${table.toUpperCase()} 
        SET name="?"
        WHERE id= ${id}
    `, value);

    let message = `Error updating record id: ${id} on table: [${table.toUpperCase()}]`;

    if (result.affectedRows) {
        message = 'Record successfully updated!';
    }

    return {message};
}

async function remove(id, table){
    const result = await db.query(
        `DELETE FROM ${table.toUpperCase()} WHERE id=${id}`
    );

    let message = `Error deleting id: ${id} on table: ${table}`;

    if (result.affectedRows) {
        message = 'Record successfully removed!';
    }

    return {message};
}

module.exports = {
    getAll,
    getFiltered,
    getPaged,
    getOne,
    create,
    update,
    remove
}

