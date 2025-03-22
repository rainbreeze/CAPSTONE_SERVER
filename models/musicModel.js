const db = require('../config/database');  // MySQL 연결 설정

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

// 초기 데이터 삽입 함수
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

// 모든 음악 데이터를 가져오는 함수
exports.getAllMusics = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM musics', (err, results) => {
            if (err) {
                return reject(err);  // 에러가 발생하면 reject
            }
            resolve(results);  // 성공적으로 데이터 가져오면 results 반환
        });
    });
};

// 특정 음악을 ID로 가져오는 함수
exports.getMusicById = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM musics WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return reject(err);  // 에러가 발생하면 reject
            }
            if (results.length === 0) {
                return resolve(null);  // 음악이 없으면 null 반환
            }
            resolve(results[0]);  // 음악 데이터를 반환
        });
    });
};

// 새로운 음악을 추가하는 함수
exports.addMusic = (musicData) => {
    return new Promise((resolve, reject) => {
        const { title, artist, album, image, price } = musicData;
        const query = `
            INSERT INTO musics (title, artist, album, image, price)
            VALUES (?, ?, ?, ?, ?)
        `;
        db.query(query, [title, artist, album, image, price], (err, result) => {
            if (err) {
                return reject(err);  // 에러가 발생하면 reject
            }
            // 추가된 음악 데이터를 반환
            resolve({
                id: result.insertId,  // 자동 생성된 id
                title,
                artist,
                album,
                image,
                price
            });
        });
    });
};

// 특정 음악을 ID로 삭제하는 함수
exports.deleteMusicById = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM musics WHERE id = ?';
        db.query(query, [id], (err, result) => {
            if (err) {
                return reject(err);  // 에러가 발생하면 reject
            }
            // 삭제된 음악이 없으면 null 반환
            if (result.affectedRows === 0) {
                return resolve(null);  // 삭제된 음악이 없으면 null 반환
            }
            resolve({ id });  // 삭제된 음악의 ID를 반환
        });
    });
};

// 데이터베이스 초기화 함수 내보내기
exports.initializeDatabase = initializeDatabase;
