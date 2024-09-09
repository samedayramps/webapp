import React from 'react';
import { BaseEntity } from '../../types/common';

export interface Column<T> {
  label: string;
  render: (item: T) => React.ReactNode;
}

interface DataTableProps<T extends BaseEntity> {
  items: T[];
  columns: Column<T>[];
  onEdit: (item: T) => void;
  onDelete: (id: string) => Promise<void>;
  additionalAction?: {
    label: string;
    action: (item: T) => void;
    showIf?: (item: T) => boolean;
  };
}

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '20px',
};

const thStyle: React.CSSProperties = {
  backgroundColor: '#f2f2f2',
  color: '#333',
  fontWeight: 'bold',
  padding: '12px',
  textAlign: 'left',
  borderBottom: '2px solid #ddd',
};

const tdStyle: React.CSSProperties = {
  padding: '12px',
  borderBottom: '1px solid #ddd',
};

function DataTable<T extends BaseEntity>({ items, columns, onEdit, onDelete, additionalAction }: DataTableProps<T>) {
  const handleDelete = async (item: T) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      await onDelete(item.id);
    }
  };

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index} style={thStyle}>{column.label}</th>
          ))}
          <th style={thStyle}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id} style={tdStyle}>
            {columns.map((column, colIndex) => (
              <td key={colIndex} style={tdStyle}>{column.render(item)}</td>
            ))}
            <td style={tdStyle}>
              <button onClick={() => onEdit(item)}>Edit</button>
              <button onClick={() => handleDelete(item)}>Delete</button>
              {additionalAction && (!additionalAction.showIf || additionalAction.showIf(item)) && (
                <button onClick={() => additionalAction.action(item)}>{additionalAction.label}</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;