import demoImage from "../src/assets/demo.png"

function Loader() {
  return (
    <div className="mt-6 relative">
      <div className="w-fit h-fit flex justify-center items-center border-2 border-dashed border-gray-300 bg-gray-100 rounded-lg">
        <img src={demoImage} alt="demoImage" className="opacity-0 w-fit max-h-[400px] object-contain rounded-lg" />
        <div className="absolute flex space-x-1">
          <div className="w-2 h-8 bg-indigo-500 animate-pulse [animation-delay:-0.3s]" />
          <div className="w-2 h-8 bg-purple-500 animate-pulse [animation-delay:-0.15s]" />
          <div className="w-2 h-8 bg-blue-500 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default Loader;
