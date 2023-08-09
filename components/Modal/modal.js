import React from "react";

const Modal = ({close, isVisible, children}) => {
    if(!isVisible) return null
  return (
    <div
      className="overflow-x-auto fixed mt-20 top-0 left-0 right-0 z-50 w-full p-4 md:inset-0 h-modal md:h-full bg-tranparent bg-black bg-opacity-50"
    >
      <div className="flex lg:h-auto w-auto justify-center ">
        <div className="relative bg-white rounded-lg shadow dark:bg-white w-1/3">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            onClick={() => close()}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Tutup modal</span>
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
