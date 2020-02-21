const passport = require('passport');
const db = require('../models');
const local = require('./local');

module.exports = () => {

    passport.serializeUser((user, done) => { // 서버 쪽에 [{id: 3, cookie: 'asdf'}] 이런식의 배열로 보냄
        return done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await db.User.findOne({
                where: { id },
                include: [{
                    model: db.Post,
                    as: 'Posts',
                    attributes: ['id'],
                }, {
                    model: db.User,
                    as: 'Followings',
                    attributes: ['id'],
                }, {
                    model: db.User,
                    as: 'Followers',
                    attributes: ['id'],
                }],
            });

            return done(null, user); // req.user
        } catch (e) {
            console.error(e);
            return done(e);
        }
    });

    local();
};

// 프론트에서 서버로는 cookie 만 보냄
// 서버가 cookie-parser, express-session 으로 쿠키 검사 후 id: 3 발견
// id: 3 이 deserializeUser 에 들어감.
// req.user 로 사용자 정보가 들어감

// 요청 보낼 때마다 deserializeUser 가 실행 됨 (db 요청 1번씩 실행)
// 실무에서는 deserializeUser 결과물 캐싱 (한번 찾은 유저는 다시 찾지 않음)