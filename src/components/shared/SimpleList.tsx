import React from 'react';

export interface Column<T> {
  label: string;
  render: (item: T) => React.ReactNode;
}

interface SimpleListProps<T> {
  items: T[];
  columns: Column<T>[];
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

const trHoverStyle: React.CSSProperties = {
  backgroundColor: '#f5f5f5',
};

function SimpleList<T>({ items, columns }: SimpleListProps<T>) {
  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index} style={thStyle}>{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item, rowIndex) => (
          <tr
            key={rowIndex}
            style={{ ...tdStyle }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = trHoverStyle.backgroundColor || '#f5f5f5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '';
            }}
          >
            {columns.map((column, colIndex) => (
              <td key={colIndex} style={tdStyle}>{column.render(item)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SimpleList;