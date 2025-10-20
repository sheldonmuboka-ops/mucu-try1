import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { mediaService } from '../../services/mediaService';
import { adminService } from '../../services/adminService';
import { MediaDto } from '../../types';
import ErrorMessage from '../../components/ErrorMessage';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function MediaManagement() {
  const [mediaList, setMediaList] = useState<MediaDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingMedia, setEditingMedia] = useState<MediaDto | null>(null);
  const [formData, setFormData] = useState({
    mediaName: '',
    description: '',
    mediaUrl: '',
    mediaThumbnail: null as File | null,
  });

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const data = await mediaService.getAllMedia();
      setMediaList(data);
    } catch (err) {
      setError('Failed to fetch media');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const data = new FormData();
    data.append('mediaName', formData.mediaName);
    data.append('description', formData.description);
    data.append('mediaUrl', formData.mediaUrl);
    if (formData.mediaThumbnail) {
      data.append('mediaThumbnail', formData.mediaThumbnail);
    }

    try {
      if (editingMedia) {
        await adminService.updateMedia(editingMedia.id, data);
      } else {
        await adminService.createMedia(data);
      }
      setShowModal(false);
      resetForm();
      fetchMedia();
    } catch (err) {
      setError('Failed to save media');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this media?')) return;

    try {
      await adminService.deleteMedia(id);
      fetchMedia();
    } catch (err) {
      setError('Failed to delete media');
    }
  };

  const handleEdit = (media: MediaDto) => {
    setEditingMedia(media);
    setFormData({
      mediaName: media.mediaName,
      description: media.description,
      mediaUrl: media.mediaUrl,
      mediaThumbnail: null,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      mediaName: '',
      description: '',
      mediaUrl: '',
      mediaThumbnail: null,
    });
    setEditingMedia(null);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Media Management</h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Add Media
        </button>
      </div>

      {error && <ErrorMessage message={error} />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mediaList.map((media) => (
          <div key={media.id} className="bg-white rounded-lg shadow overflow-hidden">
            <img
              src={media.mediaThumbnail}
              alt={media.mediaName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{media.mediaName}</h3>
              <p className="text-sm text-gray-600 mb-4">{media.description}</p>
              <a
                href={media.mediaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm mb-4 block truncate"
              >
                {media.mediaUrl}
              </a>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(media)}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-100 text-blue-700 px-3 py-2 rounded hover:bg-blue-200 transition-colors"
                >
                  <Edit size={16} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(media.id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-100 text-red-700 px-3 py-2 rounded hover:bg-red-200 transition-colors"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">
              {editingMedia ? 'Edit Media' : 'Add Media'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Media Name</label>
                <input
                  type="text"
                  required
                  value={formData.mediaName}
                  onChange={(e) => setFormData({ ...formData, mediaName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Media URL</label>
                <input
                  type="url"
                  required
                  value={formData.mediaUrl}
                  onChange={(e) => setFormData({ ...formData, mediaUrl: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com/media"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail</label>
                <input
                  type="file"
                  accept="image/*"
                  required={!editingMedia}
                  onChange={(e) =>
                    setFormData({ ...formData, mediaThumbnail: e.target.files?.[0] || null })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingMedia ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
