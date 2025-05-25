import { useState } from 'react';
import axios from 'axios';

function App() {
  const [activity, setActivity] = useState('');
  const [loading, setLoading] = useState(false);

  const getActivity = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/generate');
      setActivity(response.data.activity);
    } catch (error) {
      setActivity("Couldn't generate activity. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Need an Idea?</h1>
      <button
        onClick={getActivity}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl shadow-md"
      >
        {loading ? "Thinking..." : "Surprise Me 🎲"}
      </button>
      {activity && (
        <div className="mt-6 bg-white p-6 rounded-xl shadow-lg max-w-md text-center">
          <p className="text-lg text-gray-700">{activity}</p>
        </div>
      )}
    </div>
  );
}

export default App;
