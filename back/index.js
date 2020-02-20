const express = require('express');

const db = require('./models');
const userAPIRouter = require('./routes/user');
const postAPIRouter = require('./routes/post');
const postsAPIRouter = require('./routes/posts');
const port = process.env.PORT;

const app = express();
db.sequelize.sync();

// API 는 다른 서비스가 내 서비스의 기능을 실행 할 수 있게 열어둔 창구
app.use('/api/user', userAPIRouter);
app.use('/api/post', postAPIRouter);
app.use('/api/posts', postsAPIRouter);

app.listen(port, () => {
    console.log(`server is running on localhost:${port}`);
});