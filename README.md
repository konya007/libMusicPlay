# MusicPlayer

MusicPlayer là một ứng dụng phát nhạc đơn giản được xây dựng bằng JavaScript. Ứng dụng này cho phép bạn phát, tạm dừng, dừng, chuyển bài hát và hiển thị thông tin bài hát lên thanh phương tiện.

[Demo](https://konya007.github.io/libMusicPlay/)

## Tính năng

- Phát, tạm dừng và dừng nhạc.
- Chuyển bài hát tiếp theo và bài hát trước đó.
- Hiển thị thông tin bài hát lên thanh phương tiện.
- Điều chỉnh âm lượng và thanh trượt thời gian.

## Cài đặt

1. Clone repository này về máy của bạn:
    ```sh
    git clone https://github.com/yourusername/MusicPlayer.git
    ```

2. Dán thẳng vào đầu trang chính
    ```html
    <script src="https://raw.githubusercontent.com/konya007/libMusicPlay/refs/heads/main/MusicPlayer.js"></script>
    ```

3. Mở tệp `index.html` trong trình duyệt của bạn để chạy ứng dụng.

## Sử dụng

### Tạo các đối tượng Song

Đầu tiên, bạn cần tạo các đối tượng `Song` chứa thông tin về các bài hát. Mỗi bài hát sẽ có các thuộc tính: `title`, `artist`, `src`, và `cover`.

```js
class Song {
    constructor(title, artist, src, cover) {
        this.title = title;
        this.artist = artist;
        this.src = src;
        this.cover = cover;
    }
}

// Ví dụ tạo các bài hát
const song1 = new Song("Song Title 1", "Artist 1", "path/to/song1.mp3", "path/to/cover1.jpg");
const song2 = new Song("Song Title 2", "Artist 2", "path/to/song2.mp3", "path/to/cover2.jpg");
```
### Khởi tạo MusicPlayer và thiết lập danh sách bài hát
Tiếp theo, bạn cần khởi tạo đối tượng MusicPlayer và thiết lập danh sách bài hát cho nó.

```js
const player = new MusicPlayer();

// Thiết lập danh sách bài hát
player.setSongs([song1, song2]);

// Khởi tạo player
player.init();
```

### Gắn sự kiện cho các nút điều khiển
Bạn cần gắn sự kiện cho các nút điều khiển như play/pause, next, previous, stop, volume slider, và seek slider.

```html
<!-- HTML -->
<button class="player_pp">Play/Pause</button>
<button class="player_next">Next</button>
<button class="player_prev">Previous</button>
<button class="player_stop">Stop</button>
<input type="range" class="player_volume_range" min="0" max="100" value="50">
<input type="range" class="player_seek_range" min="0" max="100" value="0">
<div class="player_progress"><div></div></div>
<div class="player_duration"></div>
<div class="player_currentTime"></div>
<div class="player_title"></div>
<div class="player_artist"></div>
<img class="player_cover" src="">
<div class="player_bg_cover"></div>
```

### Cập nhật thông tin bài hát
Phương thức `updateInfo` sẽ tự động cập nhật thông tin bài hát khi bài hát thay đổi.

```js
player.updateInfo();
```

### Sử dụng các phương thức điều khiển
Bạn có thể sử dụng các phương thức điều khiển của MusicPlayer như `play`, `pause`, `stop`, `next`, `previous`, và `playIndex`.

```js
// Chơi bài hát đầu tiên
player.playIndex(0);

// Chơi bài hát tiếp theo
player.next();

// Chơi bài hát trước đó
player.previous();

// Tạm dừng bài hát
player.pause();

// Dừng bài hát
player.stop();
```

### Ví dụ hoàn chỉnh
Dưới đây là ví dụ hoàn chỉnh về cách sử dụng `MusicPlayer` và `Song`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Music Player</title>
    <style>
        .player_progress {
            width: 100%;
            height: 5px;
            background-color: #ccc;
            position: relative;
            border: 1px solid #000;
        }
        .player_progress div {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 0;
            background-color: #ff0000;
        }
    </style>
</head>
<body>
    <button class="player_pp">Play/Pause</button>
    <button class="player_next">Next</button>
    <button class="player_prev">Previous</button>
    <button class="player_stop">Stop</button>
    <input type="range" class="player_volume_range" min="0" max="100" value="50">
    <input type="range" class="player_seek_range" min="0" max="100" value="0">
    <div class="player_progress"><div></div></div>
    <div class="player_duration"></div>
    <div class="player_currentTime"></div>
    <div class="player_title"></div>
    <div class="player_artist"></div>
    <img class="player_cover" src="">
    <div class="player_bg_cover"></div>

    <script src="./MusicPlayer.js"></script>
    <script>
        class Song {
            constructor(title, artist, src, cover) {
                this.title = title;
                this.artist = artist;
                this.src = src;
                this.cover = cover;
            }
        }

        const song1 = new Song("Song Title 1", "Artist 1", "path/to/song1.mp3", "path/to/cover1.jpg");
        const song2 = new Song("Song Title 2", "Artist 2", "path/to/song2.mp3", "path/to/cover2.jpg");

        const player = new MusicPlayer();
        player.setSongs([song1, song2]);
        player.init();
    </script>

    
</body>
</html>
```

