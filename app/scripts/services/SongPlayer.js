(function() {
    function SongPlayer(Fixtures) {
        var SongPlayer = {};
        
        /** (private)
        * @desc Stores album information
        * @type {Object}
        */
        var currentAlbum = Fixtures.getAlbum();
        
        /** (private)
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;
        
        /** (private)
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }
                
                currentBuzzObject = new buzz.sound(song.audioUrl, {
                    formats: ['mp3'],
                    preload: true
                });
            
            SongPlayer.currentSong = song;
        };
        
        /** (private)
        * @function playSong
        * @desc Play the current Buzz object
        * @param {Object} song
        */
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
            SongPlayer.currentAlbum = currentAlbum;
        };
        
        /** (private)
        * @function stopSong
        * @desc Stop the current Buzz object
        * @param {Object} song
        */
        var stopSong = function(song) {
            currentBuzzObject.stop();
            song.playing = null;
        };
        
        /** (private)
        * @function getSongIndex
        * @desc Gets song index
        * @param {Object} song
        */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
        
        /** (public)
        * @desc Current song variable
        * @type {Object}
        */
        SongPlayer.currentSong = null;
        
        /** (public)
        * @desc Current album variable
        * @type {Object}
        */
        SongPlayer.currentAlbum = null;
            
        /** (public)
        * @function SongPlayer.play
        * @desc Establishes conditions for play button and when to play music
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    currentBuzzObject.play();
                }
            }   
        };
        
        /** (public)
        * @function SongPlayer.pause
        * @desc Calls pause method when user clicks pause button; pauses music
        * @param {Object} song 
        */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        /** (public)
        * @function SongPlayer.previous
        * @desc Change to previous song
        * @param {Object} song
        */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        
        /** (public)
        * @function SongPlayer.next
        * @desc Change to next song
        * @param {Object} song 
        */
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            if (currentSongIndex >= currentAlbum.songs.length) {
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();