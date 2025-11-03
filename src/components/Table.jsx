import React from 'react';
import Button from './Button';

const Table = ({ data, columns, onEdit, onDelete, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="loader"></div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No records found</p>
        <p className="text-gray-400 text-sm mt-2">Create your first record to get started</p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead className="table-header">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="table-header-cell">
                {column.label}
              </th>
            ))}
            <th className="table-header-cell">Actions</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50 transition-colors">
              {columns.map((column) => (
                <td key={column.key} className="table-cell">
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
              <td className="table-cell">
                <div className="flex gap-2">
                  <Button 
                    variant="secondary" 
                    onClick={() => onEdit(row, index)}
                    className="text-xs py-1 px-3"
                  >
                    Edit
                  </Button>
                  {onDelete && (
                    <Button 
                      variant="danger" 
                      onClick={() => onDelete(row, index)}
                      className="text-xs py-1 px-3"
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
