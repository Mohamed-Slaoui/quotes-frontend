import { useState } from 'react';

export default function App() {
  const [quote, setQuote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showQuote, setShowQuote] = useState(false);

  const fetchQuote = async () => {
    setLoading(true);
    setError('');
    setShowQuote(false);
    
    try {
      // Since the actual API endpoint isn't available, we'll simulate with a demo quote
      // Replace 'https://YOUR_BACKEND_URL/quote' with your actual endpoint
      
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      
      // Uncomment this section and comment out the demo code above when you have your API ready:
      
      const response = await fetch(`${process.env.REACT_APP_API_URL}/quote`);
      if (!response.ok) {
        throw new Error('Failed to fetch quote');
      }
      
      const data = await response.json();
      const randomQuote = data.quote || data.text || data; // Adjust based on your API response structure
      
      
      setQuote(randomQuote);
      
      // Small delay before showing the quote for smooth animation
      setTimeout(() => {
        setShowQuote(true);
      }, 100);
      
    } catch (err) {
      setError('Failed to fetch quote. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full transform hover:scale-105 transition-all duration-300 ease-in-out">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Motivational Quotes 🚀
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
        </div>

        {/* Get Quote Button */}
        <div className="text-center mb-8">
          <button
            onClick={fetchQuote}
            disabled={loading}
            className={`
              px-8 py-4 rounded-xl font-semibold text-white text-lg
              bg-gradient-to-r from-purple-500 to-pink-500
              hover:from-purple-600 hover:to-pink-600
              transform hover:scale-105 hover:-translate-y-1
              transition-all duration-300 ease-in-out
              shadow-lg hover:shadow-xl
              disabled:opacity-50 disabled:cursor-not-allowed
              disabled:transform-none disabled:shadow-lg
              focus:outline-none focus:ring-4 focus:ring-purple-300
            `}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </div>
            ) : (
              'Get Quote'
            )}
          </button>
        </div>

        {/* Quote Display */}
        <div className="min-h-[200px] flex items-center justify-center">
          {error ? (
            <div className="text-center">
              <p className="text-red-500 text-lg mb-4">❌ {error}</p>
              <p className="text-gray-500 text-sm">Please check your connection and try again.</p>
            </div>
          ) : quote ? (
            <div 
              className={`
                text-center transform transition-all duration-700 ease-out
                ${showQuote 
                  ? 'translate-y-0 opacity-100 scale-100' 
                  : 'translate-y-8 opacity-0 scale-95'
                }
              `}
            >
              <blockquote className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-700 leading-relaxed italic">
                "{quote}"
              </blockquote>
              <div className="mt-6 w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
            </div>
          ) : (
            <div className="text-center text-gray-400">
              <div className="text-6xl mb-4">💭</div>
              <p className="text-lg">Click the button above to get inspired!</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pt-6 border-t border-gray-100">
          <p className="text-gray-400 text-sm">
            Get motivated with inspiring quotes ✨
          </p>
        </div>
      </div>
    </div>
  );
}