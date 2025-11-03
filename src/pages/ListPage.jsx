import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../components/Table';
import Button from '../components/Button';
import Toast from '../components/Toast';
import { getAllRecords, deleteRecord } from '../services/googleSheetsService';
import { useToast } from '../hooks/useToast';

const ListPage = () => {
  const navigate = useNavigate();
  const { toast, showToast, hideToast } = useToast();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const isLoaded = useRef();

  isLoaded.current = false;

  const columns = [
    { key: 'srNo', label: 'Sr No' },
    { key: 'company', label: 'Company' },
    { key: 'l1', label: 'L1' },
    { key: 'l2', label: 'L2' },
    { key: 'l3', label: 'L3' },
    { key: 'mr', label: 'MR' },
    { key: 'location', label: 'Location' },
    { key: 'mode', label: 'Mode' },
    { 
      key: 'details', 
      label: 'Details',
      render: (value) => (
        <div className="max-w-xs truncate" title={value}>
          {value}
        </div>
      )
    }
  ];

  useEffect(() => {
    if (!isLoaded.current) {
      fetchRecords();
      isLoaded.current = true;
    }
  }, []);

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const data = await getAllRecords();
      setRecords(data);
    } catch (error) {
      showToast('Failed to fetch records. Please check your Google Sheets configuration.', 'error');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (row) => {
    navigate(`/edit/${row.rowIndex}`);
  };

  const handleDelete = async (row) => {
    if (!window.confirm(`Are you sure you want to delete the record for "${row.company}"?`)) {
      return;
    }

    try {
      await deleteRecord(row.rowIndex);
      showToast('Record deleted successfully', 'success');
      fetchRecords(); // Refresh the list
    } catch (error) {
      showToast('Failed to delete record', 'error');
      console.error('Error:', error);
    }
  };

  const handleRefresh = () => {
    fetchRecords();
    showToast('Records refreshed', 'info');
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Records</h1>
          <p className="text-gray-600 mt-1">Manage your Google Sheets data</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={handleRefresh}>
            🔄 Refresh
          </Button>
          <Button variant="primary" onClick={() => navigate('/create')}>
            ➕ Create New
          </Button>
        </div>
      </div>

      {/* Table Section */}
      <div className="card">
        {!loading && records.length > 0 && (
          <div className="mb-4 text-sm text-gray-600">
            Showing {records.length} record{records.length !== 1 ? 's' : ''}
          </div>
        )}
        <Table 
          data={records}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
        />
      </div>

      {/* Instructions */}
      {!loading && records.length === 0 && (
        <div className="card bg-blue-50 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Getting Started</h3>
          <p className="text-blue-700 mb-4">
            No records found. Click the "Create New" button to add your first record to the Google Sheet.
          </p>
          <ul className="list-disc list-inside text-blue-700 space-y-1">
            <li>Make sure your Google Sheets API is properly configured</li>
            <li>Verify the spreadsheet ID in your .env file</li>
            <li>Ensure you have the necessary permissions</li>
          </ul>
        </div>
      )}

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

export default ListPage;
