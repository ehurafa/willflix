  import React, {useRef} from 'react'
import ReactPlayer from 'react-player'


const ShakaPlayer = ({ src }) => {
  const playerRef = useRef(null)
  
 return <><ReactPlayer
 ref={playerRef}
 url={src}
 playing
 controls
 onProgress={({ playedSeconds }) => console.log('Current Time:', playedSeconds)}
/>

</>
};

export default ShakaPlayer;
