const UpdateModal = ({ closeModal }) => {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-lg bg-opacity-50 z-50">
        <div className="bg-amber-100 dark:bg-[#111827] h-[70%] w-[80%] sm:w-[50%] sm:h-[50%] rounded-lg shadow-lg relative flex flex-col">
          <button
            onClick={closeModal}
            className="cursor-pointer absolute right-0 p-2 font-extrabold text-red-700 text-2xl animate-pulse hover:animate-none z-60"
          >
            X
          </button>
          <div className="text-2xl font-bold text-center rounded-t-lg py-4">
            <h2 className="bg-clip-text  bg-gradient-to-r from-indigo-500 to-purple-600  text-transparent animate-pulse">
              Update Product
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateModal;
