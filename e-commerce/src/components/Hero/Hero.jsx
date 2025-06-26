const Hero = () => {
  return (
    <>
      <div className="h-[50vh] md:h-screen w-full flex justify-center items-center flex-col gap-10">
        <video
          src="/assets/hero.mp4"
          autoPlay
          muted
          loop
          className="w-[90%] object-cover rounded-3xl z-10 shadow-2xl shadow-[#94bbe9] md:w-[50%] mt-30"
        />
        <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-950 to-purple-500 text-center text-4xl animate-pulse">Delivering Sustainable packaging at your doorstep</h2>
      </div>
    </>
  );
};
export default Hero;
