import React from 'react'
import ReactToPdf from "react-to-pdf";
import ReactPlayer from 'react-player/youtube'

const YoutubeNotes = () => {

  const ref = React.createRef();
  const options = {
    orientation: 'portrait',
    unit: 'cm',
    format: [10,10.6]
  };
  const url = "https://www.youtube.com/watch?v=ysz5S6PUM-U"
  return (
    <div ref={ref}>
                  <div className='Subtitle_Name'>
                    Subtitle Name
                  </div>
                  <form className='youtubedisplay'>
                      <textarea className="inputnotes" placeholder="write your notes here" maxlength="950" max-lines="10"></textarea>
                      <div>
                        <ReactPlayer url={url} controls={true} width={980} height={630}/>
                        <div className='short_description'>
                          In this video, I'm going to show you how to compute the theory of relativity.
                          This includes the equation E=mc^2, which is also known as the mass-energy equivalence formula.
                        </div>
                      </div>
                        
                  </form>
            <ReactToPdf targetRef={ref} filename="notes.pdf" options={options}>
                {({toPdf}) => (
                  <button className="buttonnotes" onClick={toPdf}>Download notes as pdf</button>
                )}
            </ReactToPdf>
    </div>
  )
}

export default YoutubeNotes
