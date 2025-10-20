import { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { adminService } from '../../services/adminService';
import ErrorMessage from '../../components/ErrorMessage';

export default function EmailBroadcast() {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await adminService.broadcastEmail({ subject, body });
      setSuccess(response);
      setSubject('');
      setBody('');
    } catch (err) {
      setError('Failed to send broadcast email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <Mail size={32} />
          Email Broadcast
        </h1>
        <p className="text-gray-600 mt-2">
          Send newsletters and announcements to all verified users
        </p>
      </div>

      {error && <ErrorMessage message={error} />}

      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          {success}
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Subject
            </label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter email subject..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Body
            </label>
            <textarea
              required
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Enter your message..."
              rows={12}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
            />
            <p className="mt-2 text-sm text-gray-500">
              This message will be sent to all verified users in the system.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <Send size={20} />
              {loading ? 'Sending...' : 'Send Broadcast'}
            </button>
            <button
              type="button"
              onClick={() => {
                setSubject('');
                setBody('');
                setError('');
                setSuccess('');
              }}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Clear
            </button>
          </div>
        </form>
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Important Notes</h3>
        <ul className="list-disc list-inside text-blue-800 space-y-1 text-sm">
          <li>Emails will be queued and sent asynchronously</li>
          <li>Only verified users will receive the broadcast</li>
          <li>Double-check your content before sending - this action cannot be undone</li>
          <li>Consider testing with a small group before sending to all users</li>
        </ul>
      </div>
    </div>
  );
}
