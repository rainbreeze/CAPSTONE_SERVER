const express = require('express');
const musicController = require('../controllers/musicController');  // 컨트롤러 불러오기
const router = express.Router();

// 음악 데이터를 클라이언트에 전달하는 API 엔드포인트 (GET 요청)
router.get('/', musicController.getMusics);

// 음악 추가 API (POST 요청)
router.post('/', musicController.addMusic);

// 음악 삭제 API (DELETE 요청)
router.delete('/:id', musicController.deleteMusic);

module.exports = router;
