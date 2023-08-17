const express = require('express');
const router = express.Router();

const db = require("../services/bookingService");
const {verifyToken} = require("../middleware/auth");
const {success, failure} = require("../helpers");

router.get("/", verifyToken, async (req, res, next) => {
    try {
        res.json(
            success(
                await db.getAll()
            )
        )
    } catch (err) {
        console.error(`Error while getting bookings by profile Data `, err.message);
        next(err);
    }
});
router.get("/details", verifyToken, async (req, res, next) => {
    try {
        res.json(
            success(
                await db.getDetails()
            )
        )
    } catch (err) {
        console.error(`Error while getting bookings princing `, err.message);
        next(err);
    }
});
router.get("/client/:id", verifyToken, async (req, res, next) => {
    try {
        res.json(
            success(
                await db.getAllByClient(req.params.id)
            )
        )
    } catch (err) {
        console.error(`Error while getting bookings by client Data `, err.message);
        next(err);
    }
});
router.get("/staff/orders", verifyToken, async (req, res, next) => {
    try {
        res.json(
            success(
                await db.getAllStaffOrders()
            )
        )
    } catch (err) {
        console.error(`Error while getting bookings by staff Data `, err.message);
        next(err);
    }
});
router.get("/staff/:id", verifyToken, async (req, res, next) => {
    try {
        res.json(
            success(
                await db.getAllByStaff(req.params.id)
            )
        )
    } catch (err) {
        console.error(`Error while getting bookings by staff Data `, err.message);
        next(err);
    }
});

router.get("/:id", verifyToken, async (req, res, next) => {
    try {
        res.json(
            success(
                await db.getById(req.params.id)
            )
        )
    } catch (err) {
        console.error(`Error while getting booking for id ${req.params.id} `, err.message);
        next(err);
    }
});

router.get("/:id/items", verifyToken, async (req, res, next) => {
    try {
        res.json(
            success(
                await db.getItemsById(req.params.id)
            )
        )
    } catch (err) {
        console.error(`Error while getting booking for id ${req.params.id} `, err.message);
        next(err);
    }
});

router.post("/:id/items", verifyToken, async (req, res, next) => {
    try {
        console.log('req - body', req.body);
        const { bookingId, categoryName, itemId} = req.body;

        const { price, name } = await db.getBookingItemByCategoryId(categoryName, itemId);

        let returnData = await db.createItem(bookingId, categoryName, name, price);
        res.json(success(returnData.message));


    } catch (err) {
        console.error(`Error while creating booking `, err.message);
        next(err)
    }
});

router.delete("/:id/items/:itemId", verifyToken, async (req, res, next) => {
    try {
        console.log('req - body', req.body);

        let returnData = await db.removeItem(req.params.itemId);
        res.json(success(returnData.message));
    } catch (err) {
        console.error(`Error while creating booking `, err.message);
        next(err)
    }
});

router.post("/client/:id/", verifyToken, async (req, res, next) => {
    try {
        console.log('req - body', req.body);
        const { vehicleId, serviceType, serviceSize, bookingDate, timeslot, description} = req.body;

        const canSchedule = await db.validateCanSchedule(bookingDate, serviceSize);

        if(canSchedule) {
            let returnData = await db.create(vehicleId, serviceType, bookingDate, timeslot, description);
            res.json(success(returnData.message));
        } else {
            res.status(400).json(failure(null, 'This day is fully scheduled'));
        }

    } catch (err) {
        console.error(`Error while creating booking `, err.message);
        next(err)
    }
});

// router.put("/:id/profile/:profileId", verifyToken, async (req, res, next) => {
//     try {
//         const {engineType, model, vehicleType, transmissionType, register, yearOfMake} = req.body;
//         let returnData = await db.update(req.params.id, engineType, vehicleType, model, transmissionType, register, req.params.profileId, yearOfMake);
//         res.json((success(
//             await db.getById(req.params.id),
//             returnData.message
//         )));
//     } catch (err) {
//         console.error(`Error while updating profile `, err.message);
//         next(err);
//     }
// });

router.put("/:id/status", verifyToken, async (req, res, next) => {
    try {
        const {statusId} = req.body;
        let returnData = await db.updateStatus(req.params.id, statusId);
        res.json(success(null, returnData.message));
    } catch (err) {
        console.error(`Error while updating profile `, err.message);
        next(err);
    }
});

router.put("/:id/staff", verifyToken, async (req, res, next) => {
    try {
        const {staffId} = req.body;

        const canAssign = await db.validateCanAssign(staffId);

        if(canAssign) {
            let returnData = await db.assignStaff(req.params.id, staffId);
            res.json(success(null, returnData.message));
        } else {
            res.status(400).json(failure(null, 'This staff member is fully scheduled'));
        }
    } catch (err) {
        console.error(`Error while updating profile `, err.message);
        next(err);
    }
});

router.get

module.exports = router;


