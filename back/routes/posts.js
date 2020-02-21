const express = require('express');
const db = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => { // GET /api/posts
    try {
        const posts = await db.Post.findAll({
            include: [{
                model: db.User,
                attributes: ['id', 'nickname'],
            }],
            order: [['createdAt', 'DESC']], // 조건이 여러개 가능해서 2차원 배열
        });
        res.json(posts);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;