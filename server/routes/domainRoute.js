const express = require('express');
const router = express.Router();

const db = require("../services/genericDomainService");
const {verifyToken} = require("../middleware/auth");
const {success} = require("../helpers");
const genericDomain = require("../services/genericDomainService");

router.get('/combo/:name', async function (req, res, next) {
    const tableName = req.params.name;
    try {
        const data = await genericDomain.getAll(tableName);

        console.log(data);

        res.json(
            success(
                data.items
            )
        )
    } catch (err) {
        console.error(`Error while getting ${tableName} `, err.message);
        next(err);
    }
});

router.get('/filtered/:tableName/:filterId', async function (req, res, next) {
    const {tableName, filterId} = req.params;

    try {
        const data = await genericDomain.getFiltered(tableName, filterId);

        console.log(data);

        res.json(
            success(
                data.items
            )
        )
    } catch (err) {
        console.error(`Error while getting ${tableName} `, err.message);
        next(err);
    }
});

module.exports = router;


