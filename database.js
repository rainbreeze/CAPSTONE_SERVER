// database.js
const mysql = require('mysql2');

// MySQL 데이터베이스 연결 설정
const db = mysql.createConnection({
    host: 'maglev.proxy.rlwy.net',
    user: 'root',
    password: 'XKgncJXdXqGqAwJTOaPBAuSLxpZRYGqG',
    database: 'railway',
    port: 30153
});

// 데이터베이스 연결
db.connect((err) => {
    if (err) {
        console.error('MySQL 연결 실패:', err);
        return;
    }
    console.log('MySQL 데이터베이스에 연결되었습니다.');
});

// MySQL 데이터베이스 연결 객체 내보내기
module.exports = db;
