import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import Toast from '../components/Toast';
import Loader from '../components/Loader';
import { getRecordByIndex, updateRecord } from '../services/googleSheetsService';
import { validateForm, isFormValid } from '../utils/validation';
import { useToast } from '../hooks/useToast';

const EditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast, showToast, hideToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    srNo: '',
    company: '',
    l1: '',
    l2: '',
    l3: '',
    mr: '',
    location: '',
    mode: '',
    details: ''
  });

  useEffect(() => {
    fetchRecord();
  }, [id]);

  const fetchRecord = async () => {
    try {
      setLoading(true);
      const record = await getRecordByIndex(parseInt(id));
      setFormData(record);
    } catch (error) {
      showToast('Failed to fetch record', 'error');
      console.error('Error:', error);
      setTimeout(() => navigate('/'), 2000);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const requiredFields = ['company', 'l1', 'location'];
    const validationErrors = validateForm(formData, requiredFields);

    if (!isFormValid(validationErrors)) {
      setErrors(validationErrors);
      showToast('Please fill in all required fields', 'error');
      return;
    }

    setSubmitting(true);

    try {
      await updateRecord(parseInt(id), formData);
      showToast('Record updated successfully!', 'success');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      showToast('Failed to update record. Please try again.', 'error');
      console.error('Error:', error);
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader size="xl" text="Loading record..." />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Edit Record</h1>
        <p className="text-gray-600 mt-1">Update existing entry in your Google Sheet</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Sr No"
            name="srNo"
            value={formData.srNo}
            onChange={handleChange}
            disabled
          />

          <FormInput
            label="Company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            error={errors.company}
            placeholder="Enter company name"
          />

          <FormInput
            label="L1"
            name="l1"
            value={formData.l1}
            onChange={handleChange}
            required
            error={errors.l1}
            placeholder="Enter L1"
          />

          <FormInput
            label="L2"
            name="l2"
            value={formData.l2}
            onChange={handleChange}
            error={errors.l2}
            placeholder="Enter L2"
          />

          <FormInput
            label="L3"
            name="l3"
            value={formData.l3}
            onChange={handleChange}
            error={errors.l3}
            placeholder="Enter L3"
          />

          <FormInput
            label="MR"
            name="mr"
            value={formData.mr}
            onChange={handleChange}
            error={errors.mr}
            placeholder="Enter MR"
          />

          <FormInput
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            error={errors.location}
            placeholder="Enter location"
          />

          <FormInput
            label="Mode"
            name="mode"
            type="select"
            value={formData.mode}
            onChange={handleChange}
            error={errors.mode}
            options={['Remote', 'Hybrid', 'On-site']}
          />
        </div>

        <div className="mt-4">
          <FormInput
            label="Details"
            name="details"
            type="textarea"
            value={formData.details}
            onChange={handleChange}
            error={errors.details}
            placeholder="Enter additional details..."
          />
        </div>

        {/* Form Actions */}
        <div className="flex gap-4 mt-6 pt-6 border-t border-gray-200">
          <Button
            type="submit"
            variant="primary"
            disabled={submitting}
            fullWidth
          >
            {submitting ? 'Updating...' : '💾 Update Record'}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={handleCancel}
            disabled={submitting}
            fullWidth
          >
            ✕ Cancel
          </Button>
        </div>
      </form>

      {/* Help Text */}
      <div className="card bg-gray-50">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Note</h3>
        <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
          <li>Fields marked with <span className="text-red-500">*</span> are required</li>
          <li>Sr No cannot be modified</li>
          <li>Changes will be saved directly to your Google Sheet</li>
        </ul>
      </div>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
          duration={toast.duration}
        />
      )}
    </div>
  );
};

export default EditPage;
