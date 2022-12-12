import React from 'react';
import { Container } from 'react-bootstrap';
import ReactToPdf from "react-to-pdf";
import certificate from '../assets/certificate.JPG'


const ref = React.createRef();
const options = {
    orientation: 'landscape',
    unit: 'in',
    format: [14.5,6]
};
const current = new Date();
const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
const PDF = (props) => {
  return (
    <>
      <div className="Post" ref={ref}>
            <div className='head-text'>
                    <Container>
                        <img style={{ width: 1400, height: 600 }} src={certificate} alt="logo" />
                    </Container>
                        <div className='center__text'>
                            <h3>{props.title}</h3>
                        </div>
            </div>
                    <div className='head-date'>
                            <div className='center__date'>
                                <h3> {date}</h3>
                            </div>
                    </div>
                </div>
            <div>
                            <ReactToPdf targetRef={ref} filename="Certificate.pdf" options={options}>
                                    {({toPdf}) => (
                                        <button onClick={toPdf}>Generate pdf</button>
                                                                                        )}
                            </ReactToPdf>

        </div>
    </>
  );
}

export default PDF;