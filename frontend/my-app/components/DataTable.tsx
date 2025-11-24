"use client";

import React from "react";

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface Action {
  label: string;
  onClick: (row: any) => void;
  className?: string;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  actions?: Action[] | ((row: any) => Action[]);
}

export default function DataTable({ columns, data, actions }: DataTableProps) {
  const getRowActions = (row: any) => {
    if (!actions) return null;
    if (typeof actions === 'function') {
      return actions(row);
    }
    return actions;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {col.label}
                </th>
              ))}
              {actions && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="px-6 py-12 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            ) : (
              data.map((row, i) => {
                const rowActions = getRowActions(row);
                return (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    {columns.map((col) => (
                      <td key={col.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {col.render ? col.render(row[col.key], row) : row[col.key]}
                      </td>
                    ))}
                    {rowActions && rowActions.length > 0 && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        {rowActions.map((action: Action, j: number) => (
                          <button
                            key={j}
                            onClick={() => action.onClick(row)}
                            className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium transition-colors ${action.className || 'bg-blue-100 text-blue-800 hover:bg-blue-200'}`}
                          >
                            {action.label}
                          </button>
                        ))}
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
