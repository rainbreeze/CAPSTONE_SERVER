const musicService = require('../services/musicService');  // 서비스에서 음악 관련 로직 호출

// 모든 음악 목록을 가져오는 함수 (GET 요청)
exports.getMusics = async (req, res, next) => {
    try {
        const musics = await musicService.getAllMusics();  // 서비스에서 음악 목록을 가져옴
        res.status(200).json(musics);  // 클라이언트에게 음악 목록 응답
    } catch (err) {
        next(err);  // 에러가 발생하면 미들웨어로 전달
    }
};

// 특정 음악을 추가하는 함수 (POST 요청)
exports.addMusic = async (req, res, next) => {
    const { title, artist, album, image, price } = req.body;

    // 입력 값 검증
    if (!title || !artist || !album || !image || !price) {
        return res.status(400).json({ error: '모든 필드를 채워야 합니다.' });
    }

    try {
        const newMusic = await musicService.addNewMusic({ title, artist, album, image, price });
        res.status(201).json({
            message: '음악이 성공적으로 추가되었습니다.',
            music: newMusic  // 추가된 음악 정보 응답
        });
    } catch (err) {
        next(err);  // 에러가 발생하면 미들웨어로 전달
    }
};

// 특정 음악을 삭제하는 함수 (DELETE 요청)
exports.deleteMusic = async (req, res, next) => {
    const { id } = req.params;

    // 유효한 ID인지 확인
    if (!id) {
        return res.status(400).json({ error: '음악 ID가 필요합니다.' });
    }

    try {
        const deletedMusic = await musicService.deleteMusicById(id);
        if (deletedMusic) {
            res.status(200).json({ message: '음악이 성공적으로 삭제되었습니다.' });
        } else {
            res.status(404).json({ error: '음악을 찾을 수 없습니다.' });
        }
    } catch (err) {
        next(err);  // 에러가 발생하면 미들웨어로 전달
    }
};
