import { ArrowUp } from "lucide-react";
import React from "react";

const WhatsAppButton = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="fixed gap-4 flex flex-col justify-center items-center bottom-20 lg:bottom-20 right-10 lg:right-20 lg:w-16 lg:h-16 h-14 w-14 z-50">
      <a
        href="https://wa.me/919314346148"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="/whatsapp2.png"
          alt="WhatsApp"
          className="w-full h-full rounded-xl shadow-lg transition-transform transform hover:scale-110"
        />
      </a>

      <button
        onClick={scrollToTop}
        className=" bg-cyan-600  text-sm h-6 text- w-32 text-white rounded-lg hover:bg-cyan-700 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
        aria-label="Back to top"
      >
        Back to Top
      </button>
    </div>
  );
};

export default WhatsAppButton;
