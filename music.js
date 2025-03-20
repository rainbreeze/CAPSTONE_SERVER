// music.js
const db = require('./database'); // db 연결

// 테이블 생성 쿼리
const createTableQuery = `
    CREATE TABLE IF NOT EXISTS musics (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        artist VARCHAR(100) NOT NULL,
        album VARCHAR(100) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price VARCHAR(100) NOT NULL,
        UNIQUE(title, artist, album)  -- title, artist, album 조합에 대한 고유 제약 추가
    );
`;

// 초기 데이터 삽입 쿼리
const insertDataQueries = [
    `
    INSERT INTO musics (title, artist, album, image, price)
    SELECT * FROM (SELECT 'Shape of You', 'Ed Sheeran', 'Divide', 'https://picsum.photos/64?random=1', '10$') AS tmp
    WHERE NOT EXISTS (
        SELECT 1 FROM musics WHERE title = 'Shape of You' AND artist = 'Ed Sheeran' AND album = 'Divide'
    ) LIMIT 1;
    `,
    `
    INSERT INTO musics (title, artist, album, image, price)
    SELECT * FROM (SELECT 'Blinding Lights', 'The Weeknd', 'After Hours', 'https://picsum.photos/64?random=2', '12$') AS tmp
    WHERE NOT EXISTS (
        SELECT 1 FROM musics WHERE title = 'Blinding Lights' AND artist = 'The Weeknd' AND album = 'After Hours'
    ) LIMIT 1;
    `,
    `
    INSERT INTO musics (title, artist, album, image, price)
    SELECT * FROM (SELECT 'Levitating', 'Dua Lipa', 'Future Nostalgia', 'https://picsum.photos/64?random=3', '9$') AS tmp
    WHERE NOT EXISTS (
        SELECT 1 FROM musics WHERE title = 'Levitating' AND artist = 'Dua Lipa' AND album = 'Future Nostalgia'
    ) LIMIT 1;
    `
];

// 테이블 생성 함수
const createTable = () => {
    db.query(createTableQuery, (err, results) => {
        if (err) {
            console.error('테이블 생성 실패:', err);
            return;
        }
        console.log('musics 테이블이 성공적으로 생성되었습니다.');
    });
};

// 데이터 삽입 함수
const insertData = () => {
    insertDataQueries.forEach((query) => {
        db.query(query, (err, results) => {
            if (err) {
                console.error('레코드 삽입 실패:', err);
                return;
            }
            console.log('중복 없이 레코드가 삽입되었습니다.');
        });
    });
};

// 데이터베이스 초기화 (테이블 생성 및 데이터 삽입)
const initializeDatabase = () => {
    createTable();
    insertData();
};

// music.js에서 함수 내보내기
module.exports = {
    initializeDatabase,
};
