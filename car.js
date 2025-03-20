// car.js
const db = require('./database'); // db 연결

// 테이블 생성 쿼리
const createTableQuery = `
    CREATE TABLE IF NOT EXISTS cars (
        id INT AUTO_INCREMENT PRIMARY KEY,
        make VARCHAR(100) NOT NULL,
        model VARCHAR(100) NOT NULL,
        year INT NOT NULL,
        image VARCHAR(255) NOT NULL,
        price VARCHAR(100) NOT NULL,
        UNIQUE(make, model, year)  -- make, model, year 조합에 대한 고유 제약 추가
    );
`;

// 초기 데이터 삽입 쿼리
const insertDataQueries = [
    `
    INSERT INTO cars (make, model, year, image, price)
    SELECT * FROM (SELECT 'benz', 'S', 2015, 'https://picsum.photos/64?random=1', '30000$') AS tmp
    WHERE NOT EXISTS (
        SELECT 1 FROM cars WHERE make = 'benz' AND model = 'S' AND year = 2015
    ) LIMIT 1;
    `,
    `
    INSERT INTO cars (make, model, year, image, price)
    SELECT * FROM (SELECT 'audi', 'A4', 2018, 'https://picsum.photos/64?random=2', '35000$') AS tmp
    WHERE NOT EXISTS (
        SELECT 1 FROM cars WHERE make = 'audi' AND model = 'A4' AND year = 2018
    ) LIMIT 1;
    `,
    `
    INSERT INTO cars (make, model, year, image, price)
    SELECT * FROM (SELECT 'bmw', 'X5', 2020, 'https://picsum.photos/64?random=3', '45000$') AS tmp
    WHERE NOT EXISTS (
        SELECT 1 FROM cars WHERE make = 'bmw' AND model = 'X5' AND year = 2020
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
        console.log('cars 테이블이 성공적으로 생성되었습니다.');
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

// car.js에서 함수 내보내기
module.exports = {
    initializeDatabase,
};
