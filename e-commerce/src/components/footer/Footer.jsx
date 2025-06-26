const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white py-4 mt-8">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} PKG IT. All rights reserved.
        </p>
        <p className="text-xs mt-2">Made with ❤️ by Rudresh Vyas</p>
      </div>
    </footer>
  );
};

export default Footer;
