const express = require('express');
const router = express.Router();

const db = require("../services/profileService");
const {verifyToken} = require("../middleware/auth");
const {success} = require("../helpers");

router.get("/:id", verifyToken, async (req, res, next) => {
    try {
        res.json(
            success(
                await db.getById(req.params.id)
            )
        )
    } catch (err) {
        console.error(`Error while getting profile Data `, err.message);
        next(err);
    }
});

router.put("/:id", verifyToken, async (req, res, next) => {
    try {
        const {firstName, surName, phone} = req.body;
        let returnData =await db.update(req.params.id, firstName, surName, phone);
        res.json((success(
            await db.getById(req.params.id),
            returnData.message
        )));
    } catch (err) {
        console.error(`Error while updating profile `, err.message);
        next(err);
    }
});

module.exports = router;


