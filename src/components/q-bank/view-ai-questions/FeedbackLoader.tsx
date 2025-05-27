import { useState, useEffect } from "react";

const TypewriterText = ({ message }: { message: string }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setDisplayedText("");
    setCurrentIndex(0);
  }, [message]);

  useEffect(() => {
    if (currentIndex < message.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + message[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 50);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, message]);

  return (
    <span>
      {displayedText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const FeedbackLoader = () => {
  const loadingMessages = [
    "Submitting your feedback...",
    "Processing your suggestions...",
    "Improving our questions...",
    "Almost there...",
    "Your input is valuable to us...",
    "Making our platform better...",
  ];

  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const messageTimeout = setTimeout(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
    }, 4000);

    return () => clearTimeout(messageTimeout);
  }, [messageIndex]);

  return (
    <div className="flex flex-col items-center justify-center py-4 space-y-4">
      {/* Spinner */}
      <div className="relative flex items-center justify-center h-20 w-20">
        <div className="absolute h-full w-full rounded-full p-[2px] animate-spin-slow">
          <div className="h-full w-full rounded-full bg-white dark:bg-[#0E0E0E]"></div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#4285f4] via-[#8a4bd1] to-[#eb504f] opacity-80 blur-sm"></div>
        </div>

        <div className="relative z-10 flex space-x-1">
          <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
          <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
          <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
        </div>
      </div>

      {/* Typewriter Message */}
      <div className="text-center space-y-1">
        <h3 className="text-base font-medium animate-pulse bg-gradient-to-r from-[#4285f4] via-[#8a4bd1] to-[#eb504f] bg-clip-text text-transparent">
          Please wait
        </h3>
        <p className="text-sm font-medium animate-pulse bg-gradient-to-r from-[#4285f4] via-[#8a4bd1] to-[#eb504f] bg-clip-text text-transparent">
          <TypewriterText message={loadingMessages[messageIndex]} />
        </p>
      </div>
    </div>
  );
};

export default FeedbackLoader;
