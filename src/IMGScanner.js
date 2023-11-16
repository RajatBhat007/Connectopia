import React, { useEffect, useRef, useState } from 'react';
import { MindARThree } from 'mind-ar/dist/mindar-image-three.prod.js';
import * as THREE from 'three';
import './IMGScanner.css';
import { useNavigate } from 'react-router-dom';

const MindARComponent = (props) => {
  const containerRef = useRef(null);
  const mindarThreeRef = useRef(null);

  const [currentImage, setCurrentImage] = useState(null);
  const [currentTextImage, setCurrentTextImage] = useState(null);

  const navigate = useNavigate();
  const [data1, setData1] = useState(props.apiData);

  useEffect(() => {
    if (props.pageNo === "1") {
      localStorage.setItem('level-cleared', 0);
    }
    setData1(props.apiData);

    return () => {
      setData1(null);
    };
  }, [props.apiData]);

  const girlImage = data1 && data1['24'] ? data1['24'].find((image) => image.key.replace(/\.(jpeg|jpg|png)$/, '') === 'Level Completion Thought') : null;
  const boyImage = data1 && data1['44'] ? data1['44'].find((image) => image.key.replace(/\.(jpeg|jpg|png)$/, '') === 'Level Completion Thought') : null;

  const textPromtAfterSuccessfulScan1 = data1 && data1['23'] ? data1['23'].find((image) => image.key.replace(/\.(jpeg|jpg|png)$/, '') === 'Text Promt After Successful Scan') : null;
  const textPromtAfterSuccessfulScan2 = data1 && data1['43'] ? data1['43'].find((image) => image.key.replace(/\.(jpeg|jpg|png)$/, '') === 'Text Promt After Successful Scan') : null;
  const textPromtAfterSuccessfulScan3 = data1 && data1['63'] ? data1['63'].find((image) => image.key.replace(/\.(jpeg|jpg|png)$/, '') === 'Text Promt After Successful Scan') : null;
  const textPromtAfterSuccessfulScan4 = data1 && data1['83'] ? data1['83'].find((image) => image.key.replace(/\.(jpeg|jpg|png)$/, '') === 'Text Promt After Successful Scan') : null;
  const textPromtAfterSuccessfulScan5 = data1 && data1['103'] ? data1['103'].find((image) => image.key.replace(/\.(jpeg|jpg|png)$/, '') === 'Text Promt After Successful Scan') : null;

  const imageMap = {
    1: girlImage?.value || null,
    2: boyImage?.value || null,
    3: girlImage?.value || null,
    4: boyImage?.value || null,
    5: girlImage?.value || null,
  };

  const textImageMap = {
    1: textPromtAfterSuccessfulScan1?.value || null,
    2: textPromtAfterSuccessfulScan2?.value || null,
    3: textPromtAfterSuccessfulScan3?.value || null,
    4: textPromtAfterSuccessfulScan4?.value || null,
    5: textPromtAfterSuccessfulScan5?.value || null,
  };

  const pages = props.pageNo;

  const getImageUrlForKey = (key, data) => {
    const imageObj = data && data['0'] ? data['0'].find(img => img.key === key) : null;
    return imageObj ? imageObj.value : null;
  }

  const imageKeysSequence = ['ImageScan1.mind', 'ImageScan2.mind', 'ImageScan3.mind', 'ImageScan4.mind', 'ImageScan5.mind'];
  const apiData = props.apiData;

  const imageTargets = imageKeysSequence.map((key, index) => {
    return {
      page: (index + 1).toString(),
      imageUrl: getImageUrlForKey(key, apiData)
    };
  });

  const navigationActions = {
    "1": { navigateTo: "/levelmap2", levelCleared: '1', nextNavigate: "/begin-2" },
    "2": { navigateTo: "/levelmap3", levelCleared: '2', nextNavigate: "/begin-3" },
    "3": { navigateTo: "/levelmap4", levelCleared: '3', nextNavigate: "/begin-4" },
    "4": { navigateTo: "/levelmap5", levelCleared: '4', nextNavigate: "/begin-5" },
    "5": { navigateTo: "/winner", levelCleared: '5' },
  };

  const initializeOrUpdateMindAR = (imageTargetSrc) => {

    if (!mindarThreeRef.current) {
      mindarThreeRef.current = new MindARThree({
        container: containerRef.current,
        imageTargetSrc: imageTargetSrc,
        uiScanning: 'no'
      });
      const { renderer, scene, camera } = mindarThreeRef.current;
      const anchor = mindarThreeRef.current.addAnchor(0);
      anchor.onTargetFound = () => {
        handleNavigation(pages);
      }

      const textureLoader = new THREE.TextureLoader();
      textureLoader.load('https://cdn.glitch.global/94fdf1ba-415a-4780-93b7-aeb171b0a962/banner.png?v=1695800216998', (texture) => {
        texture.minFilter = THREE.LinearFilter;
        const geometry = new THREE.PlaneGeometry(1, 0.55);
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          opacity: 0.5
        });
        const plane = new THREE.Mesh(geometry, material);
      });
      mindarThreeRef.current.start();
      renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
      });
      return () => {
        renderer.setAnimationLoop(null);
        mindarThreeRef.current.stop();
      }
    } else {
      mindarThreeRef.current.imageTargetSrc = imageTargetSrc;
    }
  };

  const handleNavigation = (page) => {
    const action = navigationActions[page];
    if (action) {
      setCurrentTextImage(textImageMap[page]);
      setTimeout(() => {
        setCurrentImage(imageMap[page]);
        setTimeout(() => {
          navigate(action.navigateTo);
          localStorage.setItem('level-cleared', action.levelCleared);
          if (action.nextNavigate) {
            setTimeout(() => {
              setCurrentImage(null);
              navigate(action.nextNavigate);
            }, 4000);
          }
        }, 3000);
      }, 4000);
    }
  };


  useEffect(() => {
    const currentPage = props.pageNo;
    const matchingTarget = imageTargets.find(target => target.page === currentPage);
    if (matchingTarget && matchingTarget.imageUrl) {
      initializeOrUpdateMindAR(matchingTarget.imageUrl);
    }
  }, [props.pageNo, imageTargets]);

  return (
    <div className='container'>
      <div style={{ width: "100%", height: "100%" }} ref={containerRef}>
      </div>
      {!currentImage ? <div className="charater-container4">
        {currentTextImage && (
          <img src={currentTextImage} alt="Verification Successful" />
        )}
      </div> : null}
      <div className="charater-container3">
        {currentImage && (
          <img src={currentImage} alt="Verification Successful" />
        )}
      </div>
    </div>
  )
}

export default MindARComponent;