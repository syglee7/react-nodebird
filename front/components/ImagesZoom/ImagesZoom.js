import React, {useState} from 'react';
import PropTypes from "prop-types";
import Slick from 'react-slick';
import { Overlay, Header, CloseBtn, ImgWrapper, SlickWrapper} from './ImagesZoomStyle';
import {backUrl} from "../../config/config";

const ImagesZoom = ({ images, onClose }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    return (
      <Overlay>
          <Header>
              <h1>상세 이미지</h1>
              <CloseBtn type="close" onClick={onClose} />
          </Header>
          <SlickWrapper>
              <div>
                  <Slick
                    initialSlide={0}
                    afterChange={(slide) => setCurrentSlide(slide)}
                    infinite={false}
                    arrows
                    slidesToShow={1}
                    slidesToScroll={1}
                  >
                      {images.map((v) => {
                          return (
                              <ImgWrapper>
                                  <img src={v.src} />
                              </ImgWrapper>
                          );
                      })}
                  </Slick>
                  <div style={{ textAlign: 'center' }}>
                      <div style={{ width: 75, height: 30, lineHeight: '30px', borderRadius: 15, background: '#313131', display: 'inline-block',  textAlign: 'center', color: 'white', fontSize: '15px'}}>
                          {currentSlide + 1} / {images.length}
                      </div>
                  </div>
              </div>
          </SlickWrapper>
      </Overlay>
    );
};

ImagesZoom.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        src:PropTypes.string,
    })).isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;