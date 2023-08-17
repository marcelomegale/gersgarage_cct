const db = require('./db');
const helpers = require('../helpers')
const config = require('../config')

async function getAllByUser(userId) {
    const query = `
        select v.id,
               register,
               concat(manuf.name, ' - ', model.name) as manufacturer
        FROM VEHICLE v
                 join VEHICLE_MANUFACTURER_MODEL model
        on v.manufacturer_model_id = model.id
            join VEHICLE_MANUFACTURER manuf on model.manufacturer_id = manuf.id
        Where user_profile_id = ? `;

    const rows = await db.query(query, [userId]);
    const data = helpers.emptyOrRows(rows);

    return {
        items: data,
    }
}

async function getById(id) {
    const query = `
        select v.id,
               m.manufacturer_id as manufacturer,
               manufacturer_model_id as model,
               vehicle_type_id as vehicleType,
               engine_type_id as engineType,                       
               transmission_type_id as transmissionType,
               register,
               user_profile_id as userProfileId,
               year_of_make as yearOfMake
        FROM VEHICLE v       
        inner join VEHICLE_MANUFACTURER_MODEL m on v.manufacturer_model_id = m.id
        WHERE v.id = ?
    `;

    const rows = await db.query(query, [id]);
    const data = helpers.emptyOrRows(rows);

    return data[0];
}

async function create(engineType, vehicleType, manufacturerModel, transmissionType, register, userId, yearOfManufacture) {
    const query = `
        INSERT INTO VEHICLE (engine_type_id,
                             vehicle_type_id,
                             manufacturer_model_id,
                             transmission_type_id,
                             register,
                             user_profile_id,
                             year_of_make)
        VALUES (?, ?, ?, ?, ?, ?, ?);
    `;

    const result = await db.query(query, [engineType, vehicleType, manufacturerModel, transmissionType, register, userId, yearOfManufacture]);

    let message = `Error creating record on table: VEHICLE`;

    if(result.affectedRows) {
        message = 'Record successfully created!';
    }

    return { message };
}
async function update(id, engineType, vehicleType, manufacturerModel, transmissionType, register, userId, yearOfMake) {
    const query = `
        update VEHICLE
        set engine_type_id = ?,
            vehicle_type_id = ?,
            manufacturer_model_id = ?,
            transmission_type_id = ?,
            register = ?,
            year_of_make = ?
        where id = ?
        AND   user_profile_id = ?
    `;

    const result = await db.query(query, [engineType, vehicleType, manufacturerModel, transmissionType, register, yearOfMake, id, userId]);

    let message = `Error updating record on table: VEHICLE`;

    if(result.affectedRows) {
        message = 'Record successfully updated!';
    }

    return { message };
}

async function remove(id) {
    const query = `
        DELETE FROM VEHICLE
        where id = ?        
    `;

    const result = await db.query(query, [id]);

    let message = `Error deleting record on table: VEHICLE`;

    if(result.affectedRows) {
        message = 'Record successfully removed!';
    }

    return { message };
}

module.exports = {
    getAllByUser,
    getById,
    create,
    update,
    remove,
}

