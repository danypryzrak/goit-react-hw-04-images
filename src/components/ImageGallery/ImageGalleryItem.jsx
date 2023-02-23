import css from './ImageGallery.module.css'
import { useState } from 'react'
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({webformatURL, largeImageURL}) => {

    const [isShowModal, setIsShowModal] = useState(false)

    function toggleModal() {
    setIsShowModal(prevState => {return !prevState})}

    function closeModal() {
    setIsShowModal(false);
    };

    return (
        <li className={css.li}>
            <img onClick={toggleModal} className={css.image} src={webformatURL} alt="" />
            {isShowModal && (
            <Modal
                largeImageURL={largeImageURL}
                toggleModal={toggleModal}
                closeModal={closeModal}
            >
                <img src={largeImageURL} alt="" />
            </Modal>
            )}
        </li>
    )  
}

ImageGalleryItem.propTypes = {
webformatURL: PropTypes.string.isRequired,
largeImageURL: PropTypes.string.isRequired,
};