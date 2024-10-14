import React, { FC } from 'react';

interface LogEntry {
  id: string;
  timestamp: string;
  level: string;
  message: string;
  metadata?: Record<string, any>;
}

interface LogDetailsProps {
  logEntry: LogEntry;
}

const LogDetails: FC<LogDetailsProps> = ({ logEntry }) => {
  const displayMetadata = (metadata: Record<string, any>) => {
    return Object.entries(metadata).map(([key, value], index) => (
      <div key={index}>
        <strong>{key}:</strong> {JSON.stringify(value)}
      </div>
    ));
  };

  return (
    <div>
      <h2>Log Details</h2>
      <p><strong>ID:</strong> {logEntry.id}</p>
      <p><strong>Timestamp:</strong> {logEntry.timestamp}</p>
      <p><strong>Level:</strong> {logEntry.level}</p>
      <p><strong>Message:</strong> {logEntry.message}</p>
      {logEntry.metadata && (
        <div>
          <h3>Metadata</h3>
          {displayMetadata(logEntry.metadata)}
        </div>
      )}
    </div>
  );
};

export default LogDetails;