import Hero from './components/Hero';
import ChatInterface from './components/ChatInterface';

function App() {
  return (
    <div className="flex h-screen bg-chat-dark text-chat-text">
      <Hero />
      <ChatInterface />
    </div>
  );
}

export default App;
