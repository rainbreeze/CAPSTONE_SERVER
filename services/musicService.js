// services/musicService.js
const musicModel = require('../models/musicModel');

exports.getAllMusics = async () => {
    try {
        const musics = await musicModel.getAllMusics();
        return musics;
    } catch (error) {
        throw new Error('음악 목록을 가져오는 데 실패했습니다.');
    }
};

exports.addNewMusic = async (musicData) => {
    try {
        const newMusic = await musicModel.addMusic(musicData);
        return newMusic;
    } catch (error) {
        throw new Error('음악 추가 실패');
    }
};
