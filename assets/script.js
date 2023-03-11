const audio = document.getElementById('audio');
const lyricsDiv = document.getElementById('lyrics');
const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');
const stopBtn = document.getElementById('stop-btn');
const progressBar = document.querySelector('#progress-bar span');
const progress = document.getElementById("progress-bar");
const time = document.getElementById("time");
const title = document.getElementById("title");
const author = document.getElementById("author");
const select = document.getElementById("song-select");
const music = document.getElementById("music");
const info = document.getElementById("song-info");

const songTitles = {
    "song1": "酔いどれ知らず(on-vocal)",
    "song2": "酔いどれ知らず",
};
const songAuthors = {
    "song1": "Kanaria",
    "song2": "Kanaria",
};

playBtn.addEventListener('click', () => {
    audio.play();
    playBtn.setAttribute("hidden", "hidden");
    stopBtn.removeAttribute("hidden");
    pauseBtn.removeAttribute("hidden");
    select.setAttribute("hidden", "hidden");
    music.setAttribute("hidden", "hidden");
    info.removeAttribute("hidden");	
    progress.removeAttribute("hidden");		
});

pauseBtn.addEventListener('click', () => {
    audio.pause();
    pauseBtn.setAttribute("hidden", "hidden");
    playBtn.removeAttribute("hidden");
});

stopBtn.addEventListener('click', () => {
    audio.pause();
    progressBar.style.width = '0';
    audio.currentTime = 0;
    stopBtn.setAttribute("hidden", "hidden");
    playBtn.removeAttribute("hidden");
    pauseBtn.setAttribute("hidden", "hidden");
    info.setAttribute("hidden", "hidden");
    progress.setAttribute("hidden", "hidden");
    select.removeAttribute("hidden");
    music.removeAttribute("hidden");
});

audio.addEventListener('timeupdate', () => {
const currentTime = audio.currentTime;
const duration = audio.duration;
const progress = (currentTime / duration) * 100;

progressBar.style.width = `${progress}%`;
if (!isNaN(duration)) {
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        const formattedCurrentTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;

        const remainingTime = duration - currentTime;
        const remainingMinutes = Math.floor(remainingTime / 60);
        const remainingSeconds = Math.floor(remainingTime % 60);
        const formattedRemainingTime = `${remainingMinutes}:${remainingSeconds.toString().padStart(2, "0")}`;

        time.innerHTML = `${formattedRemainingTime}` + 'ㅤ';
    }
});
var songs = {
    'song1': {
        'audio': './assets/songs/on.mp3',
        'lyrics': ['♪', '夢が覚めた　酔いどれ知らず', '争いごとは　夜が明けるまで', 'くたびれては　酷く見える', '一千の声は　声が枯れるまで', 'うっちゃる幸せ　ずっと醒めないで', 'あなたの声に耳を貸す時まで', '屈する態度で　言葉さえなくて', '体を染めて', 'そして', '泥泥 　はられあられ　ホウライ　そう　悪くないわ', '屈する　先まで　ミリグラム', '酩酩　重ね重ね　存外　そう　悪くないわ', '酔いどれ知らずの恋敵　だから', '♪', 'ウタの声は　数知らず', '迷い込んだら　そこは君の××', 'ねぇ見てきれい　白昼夢ロンド', '一千を隠して　十を吐けるだけ', 'いっかの幸せ　きっと晴れないで', 'あなたのそばに　耳を貸す時まで', '屈する態度で　言葉さえなくて', '心を染めて', 'それは', '泥泥 　はられあられ　将来像　悪くないわ', '屈する　私は　生きている', '酩酩　　重ね重ね　存外　そう　悪くないわ', '酔いどれ知らずの物語', '♪', '(end)']
    },
    'song2': {
        'audio': './assets/songs/off.mp3',
        'lyrics': ['♪', '夢が覚めた　酔いどれ知らず', '争いごとは　夜が明けるまで', 'くたびれては　酷く見える', '一千の声は　声が枯れるまで', 'うっちゃる幸せ　ずっと醒めないで', 'あなたの声に耳を貸す時まで', '屈する態度で　言葉さえなくて', '体を染めて', 'そして', '泥泥 　はられあられ　ホウライ　そう　悪くないわ', '屈する　先まで　ミリグラム', '酩酩　重ね重ね　存外　そう　悪くないわ', '酔いどれ知らずの恋敵　だから', '♪', 'ウタの声は　数知らず', '迷い込んだら　そこは君の××', 'ねぇ見てきれい　白昼夢ロンド', '一千を隠して　十を吐けるだけ', 'いっかの幸せ　きっと晴れないで', 'あなたのそばに　耳を貸す時まで', '屈する態度で　言葉さえなくて', '心を染めて', 'それは', '泥泥 　はられあられ　将来像　悪くないわ', '屈する　私は　生きている', '酩酩　　重ね重ね　存外　そう　悪くないわ', '酔いどれ知らずの物語', '♪', '(end)']
    }
};

audio.addEventListener("ended", () => {
    progressBar.style.width = '0';
    audio.currentTime = 0;
    stopBtn.setAttribute("hidden", "hidden");
    playBtn.removeAttribute("hidden");
    pauseBtn.setAttribute("hidden", "hidden");
    info.setAttribute("hidden", "hidden");
    progress.setAttribute("hidden", "hidden");
    select.removeAttribute("hidden");
    music.removeAttribute("hidden");
});

$(document).ready(function(){
    // Play the audio of the selected song
    $('#song-select').on('change', function(){
        var song = $('#song-select').val();
        var audio = $('#audio').get(0);
        const selectedSong = document.getElementById("song-select").value;
        playBtn.removeAttribute("hidden");
        title.innerHTML = songTitles[selectedSong];
        author.innerHTML = songAuthors[selectedSong];
        audio.src = songs[song].audio;
        audio.load();
        // Display the lyrics
        var lyrics = songs[song].lyrics;
        var html = '';
        for(var i=0; i<lyrics.length; i++){
            html += '<p>'+lyrics[i]+'</p>';
        }
        $('#lyrics').html(html);
    });
    // Change the color of the lyrics according to the time difference
    $('#audio').on('timeupdate', function(){
        var audio = $('#audio').get(0);
        var duration = audio.duration;
        var currentTime = audio.currentTime;
        // Change the color of the lyrics
        if(currentTime >= 0.01 && currentTime < 7.9){
            $('#lyrics p:nth-child(1)').css({'color': 'red'});
            $('#lyrics p:nth-child(1)').css({'font-size': '20px'});
        } else if(currentTime >= 8.5 && currentTime < 12.5){
            $('#lyrics').scrollTop(53);
            $('#lyrics p:nth-child(2)').css({'color': 'red'});
            $('#lyrics p:nth-child(2)').css({'font-size': '20px'});
        } else if(currentTime >= 12.7 && currentTime < 16.5){
            $('#lyrics').scrollTop(53);
            $('#lyrics p:nth-child(3)').css({'color': 'red'});
            $('#lyrics p:nth-child(3)').css({'font-size': '20px'});
        } else if(currentTime >= 17 && currentTime < 20.8){
            $('#lyrics').scrollTop(53);
            $('#lyrics p:nth-child(4)').css({'color': 'red'});
            $('#lyrics p:nth-child(4)').css({'font-size': '20px'});
        } else if(currentTime >= 21 && currentTime < 24.7){
            $('#lyrics').scrollTop(53);
            $('#lyrics p:nth-child(5)').css({'color': 'red'});
            $('#lyrics p:nth-child(5)').css({'font-size': '20px'});
        } else if(currentTime >= 25 && currentTime < 28.8){
            $('#lyrics').scrollTop(53);
            $('#lyrics p:nth-child(6)').css({'color': 'red'});
            $('#lyrics p:nth-child(6)').css({'font-size': '20px'});
        } else if(currentTime >= 29 && currentTime < 32.9){
            $('#lyrics').scrollTop(53);
            $('#lyrics p:nth-child(7)').css({'color': 'red'});
            $('#lyrics p:nth-child(7)').css({'font-size': '20px'});
        } else if(currentTime >= 33.2 && currentTime < 37.4){
            $('#lyrics').scrollTop(53);
            $('#lyrics p:nth-child(8)').css({'color': 'red'});
            $('#lyrics p:nth-child(8)').css({'font-size': '20px'});
        } else if(currentTime >= 37.6 && currentTime < 40.3){
            $('#lyrics').scrollTop(53);
            $('#lyrics p:nth-child(9)').css({'color': 'red'});
            $('#lyrics p:nth-child(9)').css({'font-size': '20px'});
        } else if(currentTime >= 40.5 && currentTime < 41.75){
            $('#lyrics').scrollTop(53);
            $('#lyrics p:nth-child(10)').css({'color': 'red'});
            $('#lyrics p:nth-child(10)').css({'font-size': '20px'});
        } else if(currentTime >= 41.9 && currentTime < 45.7){
            $('#lyrics').scrollTop(53);
            $('#lyrics p:nth-child(11)').css({'color': 'red'});
            $('#lyrics p:nth-child(11)').css({'font-size': '20px'});
        } else if(currentTime >= 46 && currentTime < 49.7){
            $('#lyrics').scrollTop(53);
            $('#lyrics p:nth-child(12)').css({'color': 'red'});
            $('#lyrics p:nth-child(12)').css({'font-size': '20px'});
        } else if(currentTime >= 50 && currentTime < 54.3){
            $('#lyrics').scrollTop(53);
            $('#lyrics p:nth-child(13)').css({'color': 'red'});
            $('#lyrics p:nth-child(13)').css({'font-size': '20px'});
        } else if(currentTime >= 54.5 && currentTime < 60.5){
            $('#lyrics').scrollTop(53);
            $('#lyrics p:nth-child(14)').css({'color': 'red'});
            $('#lyrics p:nth-child(14)').css({'font-size': '20px'});
        } else if(currentTime >= 60.8 && currentTime < 67.5){
            $('#lyrics').scrollTop(53);
            $('#lyrics p:nth-child(15)').css({'color': 'red'});
            $('#lyrics p:nth-child(15)').css({'font-size': '20px'});
        } else if(currentTime >= 67.9 && currentTime < 71.7){
            $('#lyrics').scrollTop(53);
            $('#lyrics p:nth-child(16)').css({'color': 'red'});
            $('#lyrics p:nth-child(16)').css({'font-size': '20px'});
        } else if(currentTime >= 72 && currentTime < 75.7){
            $('#lyrics').scrollTop(53);
            $('#lyrics p:nth-child(17)').css({'color': 'red'});
            $('#lyrics p:nth-child(17)').css({'font-size': '20px'});
        } else if(currentTime >= 76 && currentTime < 79.8){
            $('#lyrics').scrollTop(53);
            $('#lyrics p:nth-child(18)').css({'color': 'red'});
            $('#lyrics p:nth-child(18)').css({'font-size': '20px'});
        } else if(currentTime >= 80.2 && currentTime < 84.8){
            $('#lyrics').scrollTop(53);
            $('#lyrics p:nth-child(19)').css({'color': 'red'});
            $('#lyrics p:nth-child(19)').css({'font-size': '20px'});
        } else if(currentTime >= 85 && currentTime < 88.8){
            $('#lyrics').scrollTop(53);
            $('#lyrics p:nth-child(20)').css({'color': 'red'});
            $('#lyrics p:nth-child(20)').css({'font-size': '20px'});
        } else if(currentTime >= 89.1 && currentTime < 91.9){
            $('#lyrics').scrollTop(53);
            $('#lyrics p:nth-child(21)').css({'color': 'red'});
            $('#lyrics p:nth-child(21)').css({'font-size': '20px'});
        } else if(currentTime >= 92.4 && currentTime < 97.2){
            $('#lyrics').scrollTop(53);
            $('#lyrics p:nth-child(22)').css({'color': 'red'});
            $('#lyrics p:nth-child(22)').css({'font-size': '20px'});
        } else if(currentTime >= 97.4 && currentTime < 99.8){
            $('#lyrics').scrollTop(53);
            $('#lyrics p:nth-child(23)').css({'color': 'red'});
            $('#lyrics p:nth-child(23)').css({'font-size': '20px'});
        } else if(currentTime >= 100 && currentTime < 100.9){
            $('#lyrics').scrollTop(53);
            $('#lyrics p:nth-child(24)').css({'color': 'red'});
            $('#lyrics p:nth-child(24)').css({'font-size': '20px'});
        } else if(currentTime >= 101 && currentTime < 105.3){
            $('#lyrics').scrollTop(53);
            $('#lyrics p:nth-child(25)').css({'color': 'red'});
            $('#lyrics p:nth-child(25)').css({'font-size': '20px'});
        } else if(currentTime >= 105.5 && currentTime < 109.3){
            $('#lyrics').scrollTop(53);
            $('#lyrics p:nth-child(26)').css({'color': 'red'});
            $('#lyrics p:nth-child(26)').css({'font-size': '20px'});
        } else if(currentTime >= 109.5 && currentTime < 113.8){
            $('#lyrics').scrollTop(53);
            $('#lyrics p:nth-child(27)').css({'color': 'red'});
            $('#lyrics p:nth-child(27)').css({'font-size': '20px'});
        } else if(currentTime >= 114 && currentTime < 117.8){
            $('#lyrics').scrollTop(53);
            $('#lyrics p:nth-child(28)').css({'color': 'red'});
            $('#lyrics p:nth-child(28)').css({'font-size': '20px'});
        } else if(currentTime >= 118 && currentTime < 131){
            $('#lyrics').scrollTop(53);
            $('#lyrics p:nth-child(29)').css({'color': 'red'});
            $('#lyrics p:nth-child(29)').css({'font-size': '20px'});
        } else if(currentTime >= 131.5 && currentTime < 133){
            $('#lyrics').scrollTop(53);
            $('#lyrics p:nth-child(30)').css({'color': 'black'});
            $('#lyrics p:nth-child(30)').css({'font-size': '20px'});
        } else {
            $('#lyrics p:nth-child(1), #lyrics p:nth-child(2), #lyrics p:nth-child(3), #lyrics p:nth-child(4), #lyrics p:nth-child(5), #lyrics p:nth-child(6), #lyrics p:nth-child(7), #lyrics p:nth-child(8), #lyrics p:nth-child(9), #lyrics p:nth-child(10), #lyrics p:nth-child(11), #lyrics p:nth-child(12), #lyrics p:nth-child(13), #lyrics p:nth-child(14), #lyrics p:nth-child(15), #lyrics p:nth-child(16), #lyrics p:nth-child(17), #lyrics p:nth-child(18), #lyrics p:nth-child(19), #lyrics p:nth-child(20), #lyrics p:nth-child(21), #lyrics p:nth-child(22), #lyrics p:nth-child(23), #lyrics p:nth-child(24), #lyrics p:nth-child(25), #lyrics p:nth-child(26), #lyrics p:nth-child(27), #lyrics p:nth-child(28), #lyrics p:nth-child(29), #lyrics p:nth-child(30)').css({'color': 'gray'});
            $('#lyrics p:nth-child(1), #lyrics p:nth-child(2), #lyrics p:nth-child(3), #lyrics p:nth-child(4), #lyrics p:nth-child(5), #lyrics p:nth-child(6), #lyrics p:nth-child(7), #lyrics p:nth-child(8), #lyrics p:nth-child(9), #lyrics p:nth-child(10), #lyrics p:nth-child(11), #lyrics p:nth-child(12), #lyrics p:nth-child(13), #lyrics p:nth-child(14), #lyrics p:nth-child(15), #lyrics p:nth-child(16), #lyrics p:nth-child(17), #lyrics p:nth-child(18), #lyrics p:nth-child(19), #lyrics p:nth-child(20), #lyrics p:nth-child(21), #lyrics p:nth-child(22), #lyrics p:nth-child(23), #lyrics p:nth-child(24), #lyrics p:nth-child(25), #lyrics p:nth-child(26), #lyrics p:nth-child(27), #lyrics p:nth-child(28), #lyrics p:nth-child(29), #lyrics p:nth-child(30)').css({'font-size': '15px'})
        }
    });
});
