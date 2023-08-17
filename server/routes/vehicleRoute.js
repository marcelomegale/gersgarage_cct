const express = require('express');
const router = express.Router();

const db = require("../services/vehicleService");
const {verifyToken} = require("../middleware/auth");
const {success} = require("../helpers");

router.get("/profile/:id", verifyToken, async (req, res, next) => {
    try {
        res.json(
            success(
                await db.getAllByUser(req.params.id)
            )
        )
    } catch (err) {
        console.error(`Error while getting vehicle Data for profile `, err.message);
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
        console.error(`Error while getting vehicle Data `, err.message);
        next(err);
    }
});

router.post("/profile/:id/", verifyToken, async (req, res, next) => {
    try {
        console.log('req - body', req.body);
        const {engineType, model, vehicleType, transmissionType, register, yearOfMake} = req.body;
        let returnData = await db.create(engineType, vehicleType, model, transmissionType, register, req.params.id, yearOfMake);
        res.json(success(returnData.message));
    } catch (err) {
        console.error(`Error while creating vehicle `, err.message);
        next(err);
    }
});

router.put("/:id/profile/:profileId", verifyToken, async (req, res, next) => {
    try {
        const {engineType, model, vehicleType, transmissionType, register, yearOfMake} = req.body;
        let returnData = await db.update(req.params.id, engineType, vehicleType, model, transmissionType, register, req.params.profileId, yearOfMake);
        res.json((success(
            await db.getById(req.params.id),
            returnData.message
        )));
    } catch (err) {
        console.error(`Error while updating vehicle `, err.message);
        next(err);
    }
});

router.delete("/:id", verifyToken, async (req, res, next) => {
    try {
        const id = req.params.id;
        if(!id) throw new Error("Could not find id to remove");
        let returnData = await db.remove(req.params.id);
        res.json(success(returnData.message));
    } catch (err) {
        console.error(`Error while removing vehicle `, err.message);
        next(err);
    }
})

module.exports = router;


