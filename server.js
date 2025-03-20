// server.js
const express = require('express');
const cors = require('cors');
const { initializeDatabase } = require('./music');  // music.js에서 함수 불러오기
const db = require('./database');
const app = express();
const port = 5000;

// 미들웨어 설정
app.use(cors());
app.use(express.json());  // POST 요청에서 JSON 바디를 처리하기 위한 미들웨어

// 데이터베이스 초기화 (테이블 생성 및 데이터 삽입)
initializeDatabase();

// 음악 데이터를 클라이언트에 전달하는 API 엔드포인트
app.get('/api/musics', (req, res) => {
    db.query('SELECT * FROM musics', (err, results) => {
        if (err) {
            console.error('데이터베이스 쿼리 실패:', err);
            return res.status(500).json({ error: '데이터베이스 쿼리 실패' });
        }
        res.json(results);  // 음악 데이터 응답
    });
});

// 음악 추가 API (POST)
app.post('/api/musics', (req, res) => {
    const { title, artist, album, image, price } = req.body;
    const query = `
        INSERT INTO musics (title, artist, album, image, price)
        VALUES (?, ?, ?, ?, ?)
    `;
    db.query(query, [title, artist, album, image, price], (err, result) => {
        if (err) {
            console.error('음악 추가 실패:', err);
            return res.status(500).json({ error: '음악 추가 실패' });
        }
        res.status(201).json({ message: '음악이 추가되었습니다.' });
    });
});

// 음악 삭제 API (DELETE)
app.delete('/api/musics/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM musics WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('음악 삭제 실패:', err);
            return res.status(500).json({ error: '음악 삭제 실패' });
        }
        res.status(200).json({ message: '음악이 삭제되었습니다.' });
    });
});

// 서버 시작
app.listen(port, () => {
    console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
