// server.js
const express = require('express');
const cors = require('cors');
const { initializeDatabase } = require('./car');
const db = require('./database');
const app = express();
const port = 5000;

// 미들웨어 설정
app.use(cors());
app.use(express.json());  // POST 요청에서 JSON 바디를 처리하기 위한 미들웨어

// 데이터베이스 초기화 (테이블 생성 및 데이터 삽입)
initializeDatabase();

// 자동차 데이터를 클라이언트에 전달하는 API 엔드포인트
app.get('/api/cars', (req, res) => {
    db.query('SELECT * FROM cars', (err, results) => {
        if (err) {
            console.error('데이터베이스 쿼리 실패:', err);
            return res.status(500).json({ error: '데이터베이스 쿼리 실패' });
        }
        res.json(results);  // 자동차 데이터 응답
    });
});

// 자동차 추가 API (POST)
app.post('/api/cars', (req, res) => {
    const { make, model, year, image, price } = req.body;
    const query = `
        INSERT INTO cars (make, model, year, image, price)
        VALUES (?, ?, ?, ?, ?)
    `;
    db.query(query, [make, model, year, image, price], (err, result) => {
        if (err) {
            console.error('자동차 추가 실패:', err);
            return res.status(500).json({ error: '자동차 추가 실패' });
        }
        res.status(201).json({ message: '자동차가 추가되었습니다.' });
    });
});

// 자동차 삭제 API (DELETE)
app.delete('/api/cars/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM cars WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('자동차 삭제 실패:', err);
            return res.status(500).json({ error: '자동차 삭제 실패' });
        }
        res.status(200).json({ message: '자동차가 삭제되었습니다.' });
    });
});

// 서버 시작
app.listen(port, () => {
    console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
