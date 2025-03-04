import { FiMessageSquare, FiInfo, FiUser } from 'react-icons/fi';

function Hero() {
  return (
    <div className="w-1/4 bg-chat-darker p-6 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-chat-accent mb-2">NIOS AI Assistant</h1>
        <p className="text-chat-text-secondary">Your intelligent conversation partner</p>
      </div>

      <div className="flex-grow">
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <FiMessageSquare className="mr-2 text-chat-accent" />
            <h2 className="text-lg font-semibold">Smart Conversations</h2>
          </div>
          <p className="text-chat-text-secondary text-sm">
            Ask any queries related to the NIOS website
          </p>
        </div>

        <div className="mb-6">
          <div className="flex items-center mb-2">
            <FiInfo className="mr-2 text-chat-accent" />
            <h2 className="text-lg font-semibold">24/7 Availability</h2>
          </div>
          <p className="text-chat-text-secondary text-sm">
            Get answers anytime, day or night
          </p>
        </div>

        <div className="mb-6">
          <div className="flex items-center mb-2">
            <FiUser className="mr-2 text-chat-accent" />
            <h2 className="text-lg font-semibold">Ask your Doubts</h2>
          </div>
          <p className="text-chat-text-secondary text-sm">
            Ask doubts regarding any subject for any class. For now, this MVP supports only class 10th science subject.
          </p>
        </div>
      </div>

      <div className="mt-auto text-center text-chat-text-secondary text-xs">
        © 2025 NIOS x Exthalpy AI assistant
      </div>
    </div>
  );
}

export default Hero;
