//CÁC Class trong file này:
// - MusicPlayer: Class chính, quản lý các bài hát, chơi nhạc, tạm dừng, chuyển bài, chỉnh âm lượng, chỉnh thời gian, cập nhật thông tin bài hát
// - Song: Class chứa thông tin của bài hát
// - Audio: Class kế thừa từ Audio của HTML, thêm một số phương thức để quản lý bài hát

//các class dùng trong HTML, gắn sự kiện vào các button, slider, progress bar:
// - .player_pp: nút play/pause
// - .player_next: nút next
// - .player_prev: nút previous
// - .player_stop: nút stop
// - .player_volume_range: slider âm lượng
// - .player_seek_range: slider thời gian (dạng input)
// - .player_progress: progress bar của bài hát (dạng div có div trong là thanh fill)
// - .player_duration: hiển thị thời gian tổng của bài hát
// - .player_currentTime: hiển thị thời gian hiện tại của bài hát
// - .player_title: hiển thị title của bài hát
// - .player_artist: hiển thị artist của bài hát
// - .player_cover: hiển thị cover của bài hát (cho thẻ IMG)
// - .player_bg_cover: hiển thị cover của bài hát làm background (CSS)

//Các phương thức trong MusicPlayer:
// CHÚ Ý CHẠY ÍT NHẤT 2 PHƯƠNG THỨC SAU KHI KHỞI TẠO PLAYER:
// - setSongs(playlist): đặt playlist cho player
// Trong đó playlist là mảng các bài hát Song, mỗi Song có các thuộc tính: title, artist, src, cover
// - init(): khởi tạo player, gắn sự kiện cho các button, slider, progress bar 

// Các phương thức khác:
// - isPlaying(): trả về trạng thái đang chơi hay không 
// - playIndex(index): chơi bài hát ở vị trí index trong playlist
// - addSong(song): thêm một bài hát vào playlist
// - play(): chơi bài hát
// - pause(): tạm dừng bài hát
// - stop(): dừng bài hát
// - next(): chuyển bài tiếp theo
// - previous(): chuyển bài trước đó
// - updateInfo(): cập nhật thông tin bài hát

// Các sự kiện:
// - ready: sẵn sàng chơi nhạc
// - play: bắt đầu chơi nhạc
// - pause: tạm dừng nhạc
// - stop: dừng nhạc
// - next: chuyển bài tiếp theo
// - previous: chuyển bài trước đó
// - update: cập nhật thông tin bài hát

// Các bắt sự kiện:
// Obj.on('eventName', callback): bắt sự kiện eventName, gọi callback khi sự kiện xảy ra

class MusicPlayer extends Audio {
    constructor(){
        super()
        this.songs = []
        this.currentSong = null
        this.isPlaying = false  
        this.volume = 0.5
        this.display = null
    }

    isPlaying(){
        return this.isPlaying
    }

    playIndex(index = 0) {
        if (index < this.songs.length && index >= 0) {
            this.currentSong = this.songs[index]
            this.src = this.currentSong.src
            this.play()
            this.updateInfo()
        } else {
            console.error("Index out of range")
        }
        
    }

    updateInfo() {
        const title = document.querySelectorAll('.player_title')
        title.forEach(t => {
            t.textContent = this.currentSong.title
        })

        const artist = document.querySelectorAll('.player_artist')
        artist.forEach(a => {
            a.textContent = this.currentSong.artist
        })

        const cover = document.querySelectorAll('.player_cover')
        cover.forEach(c => {
            c.src = this.currentSong.cover
        })

        const bgCover = document.querySelectorAll('.player_bg_cover')
        bgCover.forEach(c => {
            c.style.backgroundImage = `url(${this.currentSong.cover})` 
        })
        this.trigger('update')
    }

    setSongs(playlist) {
        if (playlist.length > 0){
            this.songs = playlist            
        }else{
            console.error("Playlist is empty")
        }
    }

    addSong(...song){
        this.songs.push(song)
    }

    init(){
        this.volume = 0.5        
        this.currentSong = this.songs[0]
        this.src = this.currentSong.src
        this.currentTime = 0
        this.updateInfo()

        const playButton = document.querySelectorAll('.player_pp')
        playButton.forEach(button => {
            button.innerHTML = '<i class="fas fa-play"></i>'
            button.addEventListener('click', () => {
                if (this.isPlaying) {
                    this.pause()
                } else {
                    this.play()
                }
            })
        })

        const nextButton = document.querySelectorAll('.player_next')
        nextButton.forEach(button => {
            button.addEventListener('click', () => {
                this.next()
            })
        })

        const prevButton = document.querySelectorAll('.player_prev')
        prevButton.forEach(button => {
            button.addEventListener('click', () => {
                this.previous()
            })
        })

        const stopButton = document.querySelectorAll('.player_stop')
        stopButton.forEach(button => {
            button.addEventListener('click', () => {
                this.stop()
            })
        })

        const volumeSlider = document.querySelectorAll('.player_volume_range')
        
        volumeSlider.forEach(slider => {
            slider.max = 1
            slider.step = 0.01
            slider.value = this.volume
            slider.addEventListener('input', () => {
                this.volume = slider.value 
                this.volume = this.volume.toFixed(2)
            })
        })
        

        const seekSlider = document.querySelectorAll('.player_seek_range')
        seekSlider.forEach(slider => {
            slider.max = this.duration*10
            slider.value = this.currentTime*10
            slider.addEventListener('input', () => {
                this.currentTime = slider.value/10
            })
            slider.addEventListener('mousemove', (e) => {
                let s = (e.offsetX / slider.offsetWidth)*this.duration
                slider.title = new Date(s*1000).toUTCString().slice(17,25)
            })
        })
        const duration = document.querySelectorAll('.player_duration')
        const currentTime = document.querySelectorAll('.player_currentTime')
        const progress = document.querySelectorAll('.player_progress')
        progress.forEach(p => {
            const fill = p.querySelector('div')
            fill.style.width = '0%'
            p.addEventListener('click', (e) => {
                let percent = e.offsetX / p.offsetWidth
                this.currentTime = this.duration * percent
            })

            p.addEventListener('mousemove', (e) => {
                let s = (e.offsetX / p.offsetWidth)*this.duration
                p.title = new Date(s*1000).toUTCString().slice(17,25)
            })
        })


        this.loop = setInterval(() => {
            if (this.currentTime >= this.duration-0.2 && this.isPlaying){
                this.next()
            }

            seekSlider.forEach(slider => { 
                slider.max = this.duration*10
                slider.value = this.currentTime*10
            })
           
            duration.forEach((d )=> {
                d.textContent = new Date(this.duration*1000).toUTCString().slice(17,25)
            })
            currentTime.forEach((c) => {
                c.textContent = new Date(this.currentTime*1000).toUTCString().slice(17,25)
            })
            progress.forEach(p => {
                const fill = p.querySelector('div')
                fill.style.width = `${(this.currentTime / this.duration) * 100}%`
            })
        },100)
        this.trigger('ready')
    }

    play(){
        if(this.currentSong){
            super.play()
            const playButton = document.querySelectorAll('.player_pp')
            playButton.forEach(button => {
                button.innerHTML = '<i class="fas fa-pause"></i>'
            })
        } 
        this.isPlaying = true  
        // this.updateInfo()
        if ('mediaSession' in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: this.currentSong.title,
                artist: this.currentSong.artist,
                album: 'Riikon Music Player',
                artwork: [
                    { src: this.currentSong.cover, sizes: '512x512', type: 'image/jpeg' }
                ]
            });

            navigator.mediaSession.setActionHandler('play', () => this.play());
            navigator.mediaSession.setActionHandler('pause', () => this.pause());
            navigator.mediaSession.setActionHandler('previoustrack', () => this.previous());
            navigator.mediaSession.setActionHandler('nexttrack', () => this.next());
            navigator.mediaSession.setActionHandler('stop', () => this.stop);
        }
        this.trigger('play')
    }

    pause(){
        super.pause()
        this.isPlaying = false
        const playButton = document.querySelectorAll('.player_pp')
        playButton.forEach(button => {
            button.innerHTML = '<i class="fas fa-play"></i>'
        })
        this.trigger('pause')
    }

    stop(){
        this.pause()
        this.currentTime = 0
        this.isPlaying = false
        this.trigger('stop')
    }

    next(){
        let index = this.songs.indexOf(this.currentSong)
        if(index < this.songs.length - 1){
            this.currentSong = this.songs[index + 1]
            this.src = this.currentSong.src
            this.play()
        } else {
            this.currentSong = this.songs[0]
            this.src = this.currentSong.src
            this.play()
        }
        this.updateInfo()
        this.trigger('next')
    }

    previous(){
        let index = this.songs.indexOf(this.currentSong)
        if(index > 0){
            this.currentSong = this.songs[index - 1]
            this.src = this.currentSong.src
            this.play()
        } else {
            this.currentSong = this.songs[this.songs.length - 1]
            this.src = this.currentSong.src
            this.play()
        }
        this.updateInfo()
        this.trigger('previous')
    }

    addSong(...song){
        this.songs.push(song)
    }

    on(ev, callback) {
        if (!this.events) {
            this.events = {};
        }
        this.events[ev] = callback;
    }
    
    trigger(ev) {
        if (this.events && typeof this.events[ev] === 'function') {
            this.events[ev]();
        }
    }
    
}

class Song{
    constructor(id, title, artist, url, cover){
        this.title = title ?? "Unknown"
        this.artist = artist ?? "Unknown"
        this.src = url ?? null
        this.cover = cover ?? "https://png.pngtree.com/png-vector/20231016/ourmid/pngtree-vinyl-disc-png-image_10188179.png",
        this.id = id ?? "0"
    }

}


