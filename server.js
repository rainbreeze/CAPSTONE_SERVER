const express = require('express');
const cors = require('cors');
const { initializeDatabase } = require('./models/musicModel');  // music.js에서 함수 불러오기
const musicRoutes = require('./routes/musicRoutes');  // routes/musicRoutes 불러오기

const app = express();

// 미들웨어 설정
app.use(cors());
app.use(express.json());  // POST 요청에서 JSON 바디를 처리하기 위한 미들웨어

// 데이터베이스 초기화 (테이블 생성 및 데이터 삽입)
initializeDatabase();

// 라우팅 설정
app.use('/api/musics', musicRoutes);  // '/api/musics' 경로에서 음악 관련 API 처리

// 서버 시작
app.listen(() => {
    console.log(`서버가 실행 중입니다.`);
});
