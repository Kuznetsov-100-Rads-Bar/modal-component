import ReactDOM from 'react-dom';
import React, { useEffect } from 'react';

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".modal-display{align-items:center;display:flex;justify-content:center;left:0;min-height:100vh;position:fixed;top:0;width:100%;z-index:100}.modal-overlay{background-color:rgba(0,0,0,.5)}.modal-container{background-color:#fff;border-radius:5px;display:flex;flex-direction:column;gap:16px;margin:0 16px;padding:16px;width:300px}.modal-header{color:#000;display:grid;grid-template-columns:repeat(2,1fr);row-gap:16px}.modal-close_cross{background-color:transparent!important;border:none;color:#000;cursor:pointer;font-size:26px;font-weight:500;line-height:22px;margin-left:auto;padding:0}.modal-close_cross:hover{background-color:transparent!important;color:rgba(0,0,0,.5)}.modal-title{color:#000;font-family:sans-serif;font-weight:500;gap:16px;margin:0}.modal-header:after{background-color:rgba(0,0,0,.25);content:\"\";display:block;height:1px;width:100%}.modal-body{color:#2c2c2c;font-family:sans-serif;margin:0}.modal-close_button{align-self:flex-end;background-color:#0070f3;border:none;border-radius:5px;cursor:pointer;font-family:sans-serif;padding:8px 12px;width:fit-content}.modal-close_button:hover{background-color:#0055d4}";
styleInject(css_248z);

function Modal({
  closeButton,
  overlay = true,
  visible,
  title,
  content,
  onClose
}) {
  const escapeCloseModal = event => {
    if (event.charcode === 27 || event.keyCode === 27) {
      onClose();
    }
  };
  useEffect(() => {
    document.body.addEventListener("keydown", escapeCloseModal);
    return () => {
      document.body.removeEventListener("keydown", escapeCloseModal);
    };
  }, []);
  const handleClose = () => {
    return onClose(true);
  };
  if (!title || !content) {
    return console.warn('Attention, le composant <Modal /> doit contenir un props : `title={\'modalTitle\'}, content={\'modalContent\'}`.');
  }
  if (!visible) {
    return /*#__PURE__*/React.createElement(React.Fragment, null);
  }
  return /*#__PURE__*/ReactDOM.createPortal( /*#__PURE__*/React.createElement("div", {
    className: `modal-display ${overlay ? 'modal-overlay' : ''}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-header"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "modal-title"
  }, title), /*#__PURE__*/React.createElement("button", {
    className: "modal-close_cross",
    onClick: () => handleClose()
  }, "x")), /*#__PURE__*/React.createElement("div", {
    className: "modal-content"
  }, /*#__PURE__*/React.createElement("p", {
    className: "modal-body"
  }, content)), closeButton ? /*#__PURE__*/React.createElement("button", {
    onClick: () => handleClose(),
    className: "modal-close_button"
  }, "Fermer") : null)), document.body);
}

export { Modal };
