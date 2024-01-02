const Modal = ({ isOpen, onClose, children }) => {
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="absolute top-[40%] right-[50%] bg-white p-4 rounded-lg z-10 text-right">
                        <button
                            className="text-purple-700 font-bold  focus:outline-none mr-2 px-2 py-0 bg-white border border-purple-600 
                            rounded-sm hover:bg-red-600 hover:text-white hover:border-white "
                            onClick={onClose}
                        >
                            X
                        </button>
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
