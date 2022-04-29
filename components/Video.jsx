import BackgroundVideo from "../background.mp4"

export const Header = (props) => {
	function makeURL(object) {
    return (window.URL) ? window.URL.createObjectURL(object) :    
    window.webkitURL.createObjectURL(object);
  }

	useEffect(() => {
		async function display(videoStream){
			var myvideo = document.getElementById('ForcePlay');
			let blob = await fetch(videoStream).then(r => r.blob());
			var videoUrl= makeURL(blob);
			myvideo.src = videoUrl;
		}
	
		display(BackgroundVideo);
		// или display("../background.mp4");
	}, [])
	

  return (
    <header id='header'>
      <div className='intro'>
        <video id="ForcePlay" className='videoTag' autoPlay loop muted playsinline style={{objectFit: 'cover', width: '100vw', height: '100vh'}} preload="none">
            <source src={"../background.mp4"} type='video/mp4' />
        </video>
      </div>
    </header>
  )
}