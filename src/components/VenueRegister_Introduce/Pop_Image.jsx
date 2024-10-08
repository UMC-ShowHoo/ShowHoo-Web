//Pop_Image.jsx
/* image panel 등록 로직에 대한 이해 매우 부족 ==> 겨우 구현해놓은 상태 건들면 안됨.. */
// 이미지 로딩 구현해놓음
import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/VenueRegisterPage_Introduce/Pop_Image.css';
import image_register_panel1 from '../../assets/images/venueregisterpage_introduce/image_register_panel1.svg';
import image_register_panel2 from '../../assets/images/venueregisterpage_introduce/image_register_panel2.svg';
import more_image_panel from '../../assets/images/venueregisterpage_introduce/more_image_panel.svg';
import delete_icon from '../../assets/images/venuedetailpage/delete_btn.svg';

const Pop_Image = ({ isOpen, onClose, onConfirm }) => {
  const [images, setImages] = useState(Array(5).fill(null)); // 처음에 5개의 패널로 시작
  const [panelCount, setPanelCount] = useState(6); // 더하기 패널 포함해서 6개로 시작
  const [isLoading, setIsLoading] = useState(false);


  const handleImageUpload = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImages = [...images];
        // newImages[index] = e.target.result;
        newImages[index] = file; // 파일 저장
        setImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  // 이미지를 삭제하는 함수 수정
  const handleImageDelete = (index) => {
    const newImages = images.filter((_, i) => i !== index); // 삭제된 이미지 제외하고 배열 재구성
    while (newImages.length < 5) {
      newImages.push(null); // 배열의 길이가 5가 될 때까지 null 추가
    }
    setImages(newImages);
  };

  const handleImageDrop = (index, event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImages = [...images];
        newImages[index] = e.target.result;
        setImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPanel = () => {
    setPanelCount(panelCount + 1); // 패널 수 증가
    setImages([...images, null]); // 새로운 이미지 슬롯 추가
  };

  const handleConfirm = async () => {
    try {
      setIsLoading(true);  // 로딩 시작
      const formData = new FormData();
      images.forEach((image) => {
        if (image) {
          formData.append('photos', image);
        }
      });

      const response = await axios.post(
        'https://showhoo.site/spaces/photos',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.data.isSuccess) {
        const imageUrls = response.data.result; // URL 배열
        // console.log("이미지 URL 배열 확인:", imageUrls);
        onConfirm(imageUrls);
      }
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
    } finally {
      setIsLoading(false);  // 로딩 종료
      onClose();
    }
  };


  if (!isOpen) return null;

  return (
    <div className="modal-overlay3">
        <div className={`modal-container3 ${isLoading ? 'loading' : ''}`}>
            <h2 style={{ margin: '30px 20px 15px 0px' }}>사진 등록하기</h2>
            <p className='p'>사진은 최소 6개 등록해주세요</p>
            <div className="image-grid3">
                {Array(panelCount).fill(null).map((_, index) => (
                    <div
                        key={index}
                        className="image-panel33"
                        onDrop={(event) => index < images.length && handleImageDrop(index, event)}
                        onDragOver={(event) => event.preventDefault()}
                        onClick={() => index === images.length && handleAddPanel()}
                    >
                        {images[index] ? (
                            <div className="image-container319">
                                <img src={URL.createObjectURL(images[index])} alt={`Uploaded ${index + 1}`} />
                                <img
                                    src={delete_icon}
                                    alt="Delete"
                                    className="delete-icon"
                                    onClick={() => handleImageDelete(index)}
                                />
                            </div>
                        ) : (
                            <>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) => index < images.length && handleImageUpload(index, event)}
                                    style={{ display: 'none' }}
                                    id={`image-upload-${index}`}
                                />
                                <label htmlFor={`image-upload-${index}`} className="upload-label">
                                    {index === 0 ? (
                                        <img src={image_register_panel1} alt="Upload" />
                                    ) : index < images.length ? (
                                        <img src={image_register_panel2} alt="Upload" />
                                    ) : (
                                        <img src={more_image_panel} alt="More" />
                                    )}
                                </label>
                            </>
                        )}
                    </div>
                ))}
            </div>

            <div className="modal-buttons">
                <button className="cancel-button" onClick={onClose}>취소</button>
                <button className="confirm-button" onClick={handleConfirm}>등록</button>
            </div>
            {isLoading && <div className="spinner-overlay1"><div className="spinner_image_register"></div></div>}
        </div>
    </div>
);
  
};

export default Pop_Image;
