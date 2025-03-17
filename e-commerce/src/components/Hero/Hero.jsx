const Hero = () => {
  return (
    <>
      <div className="h-screen w-full flex justify-center items-center ">
        <video
          src="/assets/hero.mp4"
          autoPlay
          muted
          loop
          className="w-[90%] object-cover rounded-3xl z-10 shadow-2xl shadow-[#94bbe9] md:w-[50%]"
        />
      </div>
    </>
  );
};
export default Hero;
