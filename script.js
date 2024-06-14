async function getSongs(){
    const a = await fetch('http://127.0.0.1:3000/songs/');
    let response = await a.text();
    let div = document.createElement('div');
    div.innerHTML = response;
    let anchors = div.getElementsByTagName('a');
    let songs=[];
    for (let index = 0; index < anchors.length; index++) {
        const element = anchors[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split("/songs/")[1]);
        }
        
    }
    return songs
}
async function main(){
    let songs = await getSongs();
    console.log(songs)
    let songOL = document.querySelector('.playlists>ol');
    for (const song of songs) {
        let li = document.createElement('li');
        li.innerHTML = song.replaceAll('%20',' ');
        songOL.appendChild(li);
    }
    var audio  = new Audio(songs[0]);
    // audio.play();
    audio.addEventListener('loadeddata',()=>{
        let duration = audio.duration;
        console.log(duration)    
    })
}

main();