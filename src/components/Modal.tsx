import ReactDOM from "react-dom";

import style from "./Modal.module.scss";

type BackdropProps = {
  closeModal: () => void;
};

type ModalOverlayProps = {
  children: JSX.Element;
};

type ModalProps = {
  children: JSX.Element;
  closeModal: () => void;
};

const Backdrop = (props: BackdropProps) => {
  function handleClickBackdrop() {
    props.closeModal();
  }

  return <div onClick={handleClickBackdrop} className={style.backdrop} />;
};

const ModalOverlay = (props: ModalOverlayProps) => {
  return (
    <div className={style.modal}>
      <div className={style.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props: ModalProps) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop closeModal={props.closeModal} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
