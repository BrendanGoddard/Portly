import { useState } from 'react';
import axios from 'axios';

export default function SummaryGenerator() {
  const [notes, setNotes] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const generateSummary = async () => {
    setLoading(true);
    try {
      const res = await axios.post('https://portly.up.railway.app/api/generate-summary', { notes });

      setSummary(res.data.summary);
    } catch (err) {
      alert("Failed to generate summary.");
    }
    setLoading(false);
  };

  return (
    <div className="p-4">
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Enter your raw notes here..."
        className="w-full border p-2"
      />
      <button onClick={generateSummary} disabled={loading} className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
        {loading ? "Generating..." : "Generate Summary"}
      </button>
      {summary && (
        <div className="mt-4 p-4 bg-gray-100 border rounded">
          <h3 className="font-bold mb-2">AI Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}
