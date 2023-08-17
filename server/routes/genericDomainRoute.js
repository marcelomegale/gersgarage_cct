const express = require('express');
const router = express.Router();
const genericDomain = require('../services/genericDomainService');

const {success} = require("../helpers");
const {verifyToken} = require("../middleware/auth");

module.exports = function (tableName, tableDescription) {
    const getRouter = () => {
        router.get('/', async function (req, res, next) {
            try {
                res.json(
                    success(
                        await genericDomain.getAll(tableName, req.query.page)
                    )
                )
            } catch (err) {
                console.error(`Error while getting ${tableDescription} `, err.message);
                next(err);
            }
        });

        router.get('/paged', verifyToken, async function (req, res, next) {
            try {
                res.json(
                    success(
                        await genericDomain.getPaged(tableName, req.query.page)
                    )
                )
            } catch (err) {
                console.error(`Error while getting ${tableDescription} `, err.message);
                next(err);
            }
        });

        router.post('/', verifyToken, async function (req, res, next) {
            try {
                const {name} = req.body;
                res.json(success(await genericDomain.create(tableName, name)))
            } catch (err) {
                console.error(`Error while creating ${tableDescription} `, err.message);
                next(err);
            }
        });

        router.put('/:id', verifyToken, async function (req, res, next) {
            try {
                const {name} = req.body;
                res.json(await genericDomain.update(req.params.id, tableName, name));
            } catch (err) {
                console.error(`Error while updating ${tableDescription} `, err.message);
                next(err);
            }
        });

        router.delete('/:id', verifyToken, async function (req, res, next) {
            try {
                res.json(await genericDomain.remove(req.params.id, tableName));
            } catch (err) {
                console.error(`Error while removing ${tableDescription} `, err.message);
                next(err);
            }
        });

        return router;
    }

    return getRouter();
}


