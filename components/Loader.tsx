import Image from "next/image";
const Loader = () => {
  return (
    <div className="flex-center h-screen w-full">
      <Image alt="Loading"
        height={50}
        src="/icons/loading-circle.svg"
        width={50}/>
    </div>
  );
};

export default Loader;