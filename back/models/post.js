module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
      content: {
          type: DataTypes.TEXT,
          allowNull: false,
      },
  }, {
      charset: 'utf8mb4', // 한글 + 이모티콘
      collate: 'utf8mb4_general_ci',
  });

  Post.associate = (db) => {
    db.Post.belongsTo(db.User); // 테이블에 userid 컬럼이 생김
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.belongsTo(db.Post, { as: 'Retweet' }); // RetweetId 컬럼이 생김
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Liker' });
  };

  return Post;
};