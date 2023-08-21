const db = require('./db');
const helpers = require('../helpers')
const config = require('../config')

const fullGetQuery = `
        select b.id,
               DATE_FORMAT(b.date, '%d/%m/%Y') as formatedDate,
               b.date as date,
               concat(client.firstname, ' ', client.surname) as clientName,
               concat(vm.name, ' - ', vmn.name) as vehicleModel,
               v.register as vehicleRegister,
               bt.name as bookingType,
               concat(staff.firstname, ' ', staff.surname) as staffName,
               bs.name as bookingStatus,
               bts.name as bookingTimeSlot,
               vehicle_id,
               booking_type_id,
               staff_id,
               booking_status_id,
               b.description,
            (select sum(price) from BOOKING_ITEM bi where bi.booking_id = b.id) as tPrice
        from BOOKING b
                 inner join VEHICLE v on b.vehicle_id = v.id
                 inner join VEHICLE_MANUFACTURER_MODEL vmn on v.manufacturer_model_id = vmn.id
                 inner join VEHICLE_MANUFACTURER vm on vmn.manufacturer_id = vm.id
                 inner join USER_PROFILE client on v.user_profile_id = client.id
                 inner join BOOKING_TYPE bt on b.booking_type_id = bt.id
                 inner join BOOKING_STATUS bs on b.booking_status_id = bs.id
                 inner join BOOKING_TIME_SLOT bts on b.booking_time_slot_id = bts.id
                 left join USER_PROFILE staff on b.staff_id = staff.id `

async function getAllByClient(userId) {
    const query = `
        ${fullGetQuery}
        where client.id = ?
        ORDER BY b.date 
    `;

    const rows = await db.query(query, [userId]);
    const data = helpers.emptyOrRows(rows);

    return {
        items: data,
    }
}

async function getDetails() {
    const query = `
        select id, name, price, description, timeslot_size as serviceSize  from BOOKING_TYPE        
    `;

    const rows = await db.query(query, []);
    const data = helpers.emptyOrRows(rows);

    return {
        items: data,
    }
}

async function getAll(status, staff, initialDate, finalDate) {
    let statusFilter = status ? ' and bs.id = ' + status : '';
    let staffFilter = staff ? ' and staff_id = ' + staff : '';
    let initialDateFilter = initialDate ? ` and date >=  '${initialDate}'` : '';
    let finalDateFilter = finalDate ? ` and date <=  '${finalDate}'` : '';

    const query = `
        ${fullGetQuery}
        where 1=1
        ${statusFilter} 
        ${staffFilter} 
        ${initialDateFilter} 
        ${finalDateFilter} 
        
        order by b.date
    `;

    const rows = await db.query(query);
    const data = helpers.emptyOrRows(rows);

    return {
        items: data,
    }
}

async function getAllStaffOrders() {
    const query = `
        select up.id, up.firstname as name, count(staff_id) as count
        from USER_PROFILE up 
        left join BOOKING b on b.staff_id = up.id
        where up.profile_type_id = 2
        group by up.id, up.username
    `;

    const rows = await db.query(query, []);
    const data = helpers.emptyOrRows(rows);

    return {
        items: data,
    }
}

async function getAllByStaff(userId) {
    const query = `
        ${fullGetQuery}
        where staff.id = ?
    `;

    const rows = await db.query(query, [userId]);
    const data = helpers.emptyOrRows(rows);

    return {
        items: data,
    }
}
async function getAllByStatus() {
    const query = `
        select  bs.id, bs.name
             , (select count(*) from BOOKING b where b.booking_status_id = bs.id ) as count
        from BOOKING_STATUS bs
    `;

    const rows = await db.query(query, []);
    const data = helpers.emptyOrRows(rows);

    return {
        items: data,
    }
}
async function getById(id) {
    const query = `
        ${fullGetQuery} 
        WHERE b.id = ?
    `;

    const rows = await db.query(query, [id]);
    const data = helpers.emptyOrRows(rows);

    return data[0];
}

async function getItemsById(id) {
    const query = `
        SELECT id,
               booking_id,
               category_name as categoryName,
               name,
               price
        FROM BOOKING_ITEM
        WHERE booking_id = ?
    `;

    const rows = await db.query(query, [id]);
    const data = helpers.emptyOrRows(rows);

    return {
        items: data,
    }
}

async function validateCanSchedule(date, bookingSize) {
    const query = `
    select coalesce(total_time_available, 0)  - coalesce(total_time_occupied, 0) as availableTime
    from (select coalesce(sum(bt.timeslot_size), 0) as total_time_occupied,
                 coalesce((select count(*) * 4 from USER_PROFILE where profile_type_id = 2),0) as total_time_available
          from BOOKING b
       inner join BOOKING_TYPE bt on b.booking_type_id = bt.id
          where date = ? and b.booking_status_id <> 6) t

`;

    const rows = await db.query(query, [date]);
    const data = helpers.emptyOrRows(rows);

    const totalTimeAvailable = +data[0].availableTime;

    console.log(data, +totalTimeAvailable)


    return (+totalTimeAvailable + +bookingSize) >= 0;
}

async function create(vehicleId, serviceType, bookingDate, timeslot, description) {
    const query = `
        INSERT INTO BOOKING (vehicle_id, booking_type_id, date, booking_time_slot_id, description, booking_status_id)
        VALUES (?, ?, ?, ?, ?, 1);
    `;

    const result = await db.query(query, [vehicleId, serviceType, bookingDate, timeslot, description]);

    const query2 = `
        INSERT INTO BOOKING_ITEM(booking_id, category_name, name, price)
        SELECT (select max(id) from booking), 'Service', name, price
        FROM BOOKING_TYPE WHERE id = ?;
    `;

    const result2 = await db.query(query2, [serviceType]);

    let message = `Error creating record on table: BOOKING`;

    if(result.affectedRows) {
        message = 'Record successfully created!';
    }

    return { message };
}


async function createItem(bookingId, categoryName, name, price) {
    const query = `
        INSERT INTO BOOKING_ITEM (booking_id, category_name, name, price)
        VALUES (?, ?, ?, ? );
    `;

    const result = await db.query(query, [bookingId, categoryName, name, price]);

    let message = `Error creating record on table: BOOKING_ITEM`;

    if(result.affectedRows) {
        message = 'Record successfully created!';
    }

    return { message };
}

async function removeItem(id) {
    const query = `
        DELETE FROM BOOKING_ITEM WHERE id = ?;
    `;

    const result = await db.query(query, [id]);

    let message = `Error removing record on table: BOOKING_ITEM`;

    if(result.affectedRows) {
        message = 'Record successfully created!';
    }

    return { message };
}

async function getBookingItemByCategoryId(categoryName, itemId) {
    const query = `
        select price, name
        FROM ${categoryName}
        WHERE id = ?
    `;

    const rows = await db.query(query, [itemId]);
    const data = helpers.emptyOrRows(rows);

    return data[0];
}

async function updateStatus(id, bookingStatusId) {
    const query = `
        update BOOKING
        SET booking_status_id = ?
        WHERE id = ?
    `;

    const result = await db.query(query, [bookingStatusId, id]);

    let message = `Error creating record on table: booking`;

    if(result.affectedRows) {
        message = 'Record successfully created!';
    }

    return { message };
}

async function assignStaff(id, staffId) {
    const query = `
        update BOOKING
        SET staff_id = ?
        WHERE id = ?
    `;

    const result = await db.query(query, [staffId, id]);

    let message = `Error creating record on table: booking`;

    if(result.affectedRows) {
        message = 'Record successfully created!';
    }

    return { message };
}

async function validateCanAssign(staffId) {
    const query = `
        select
            CASE
                WHEN COUNT(0) = 0 THEN 4
                ELSE 4 - COUNT(0) END as availableTime
        from BOOKING where staff_id = ?
    `;

    const rows = await db.query(query, [staffId]);
    const data = helpers.emptyOrRows(rows);

    const totalTimeAvailable = +data[0].availableTime;

    console.log(data, +totalTimeAvailable)


    return (+totalTimeAvailable) > 0;
}

module.exports = {
    getAll,
    getDetails,
    getAllByClient,
    getAllStaffOrders,
    getAllByStaff,
    getById,
    create,
    validateCanSchedule,
    getItemsById,
    createItem,
    removeItem,
    getBookingItemByCategoryId,
    updateStatus,
    assignStaff,
    validateCanAssign,
    getAllByStatus
}

