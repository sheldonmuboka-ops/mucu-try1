import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { resourceService } from '../../services/resourceService';
import { adminService } from '../../services/adminService';
import { ResourcesDto } from '../../types';
import ErrorMessage from '../../components/ErrorMessage';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function ResourceManagement() {
  const [resources, setResources] = useState<ResourcesDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingResource, setEditingResource] = useState<ResourcesDto | null>(null);
  const [formData, setFormData] = useState({
    resourcesName: '',
    resourcesDescription: '',
    resourcesUrl: '',
    thumbnail: null as File | null,
  });

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const data = await resourceService.getAllResources();
      setResources(data);
    } catch (err) {
      setError('Failed to fetch resources');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const data = new FormData();
    data.append('resourceName', formData.resourcesName);
    data.append('resourcesDescription', formData.resourcesDescription);
    data.append('resourcesUrl', formData.resourcesUrl);
    if (formData.thumbnail) {
      data.append('Thumbnail', formData.thumbnail);
    }

    try {
      if (editingResource) {
        await adminService.updateResource(editingResource.id, data);
      } else {
        await adminService.createResource(data);
      }
      setShowModal(false);
      resetForm();
      fetchResources();
    } catch (err) {
      setError('Failed to save resource');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this resource?')) return;

    try {
      await adminService.deleteResource(id);
      fetchResources();
    } catch (err) {
      setError('Failed to delete resource');
    }
  };

  const handleEdit = (resource: ResourcesDto) => {
    setEditingResource(resource);
    setFormData({
      resourcesName: resource.resourcesName,
      resourcesDescription: resource.resourcesDescription,
      resourcesUrl: resource.resourcesUrl,
      thumbnail: null,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      resourcesName: '',
      resourcesDescription: '',
      resourcesUrl: '',
      thumbnail: null,
    });
    setEditingResource(null);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Resource Management</h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Add Resource
        </button>
      </div>

      {error && <ErrorMessage message={error} />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <div key={resource.id} className="bg-white rounded-lg shadow overflow-hidden">
            <img
              src={resource.thumbnail}
              alt={resource.resourcesName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {resource.resourcesName}
              </h3>
              <p className="text-sm text-gray-600 mb-4">{resource.resourcesDescription}</p>
              <a
                href={resource.resourcesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm mb-4 block truncate"
              >
                {resource.resourcesUrl}
              </a>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(resource)}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-100 text-blue-700 px-3 py-2 rounded hover:bg-blue-200 transition-colors"
                >
                  <Edit size={16} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(resource.id)}
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
              {editingResource ? 'Edit Resource' : 'Add Resource'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Resource Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.resourcesName}
                  onChange={(e) => setFormData({ ...formData, resourcesName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  required
                  value={formData.resourcesDescription}
                  onChange={(e) =>
                    setFormData({ ...formData, resourcesDescription: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Resource URL
                </label>
                <input
                  type="url"
                  required
                  value={formData.resourcesUrl}
                  onChange={(e) => setFormData({ ...formData, resourcesUrl: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com/resource"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail</label>
                <input
                  type="file"
                  accept="image/*"
                  required={!editingResource}
                  onChange={(e) =>
                    setFormData({ ...formData, thumbnail: e.target.files?.[0] || null })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingResource ? 'Update' : 'Create'}
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
