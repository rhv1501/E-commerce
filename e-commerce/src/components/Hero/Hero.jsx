const Hero = () => {
  return (
    <>
      <div className="h-screen w-full flex justify-center items-center bg-gray-200">
        <video
          src="/assets/hero.mp4"
          autoPlay
          muted
          loop
          className="w-[50%] object-cover rounded-3xl z-10 shadow-2xl shadow-[#94bbe9]"
        />
      </div>
    </>
  );
};
export default Hero;
