import React, { FC, useState } from 'react';

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

interface LogFilterProps {
  logs: LogEntry[];
  onFilter: (level: string) => void;
}

interface LogsViewerState {
  logs: LogEntry[];
  filteredLogs: LogEntry[];
}

const LogDetails: FC<LogDetailsProps> = ({ logEntry }) => {
  const displayMetadata = (metadata: Record<string, any>) =>
    Object.entries(metadata).map(([key, value], index) => (
      <div key={index}>
        <strong>{key}:</strong> {JSON.stringify(value)}
      </div>
    ));

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

const LogFilter: FC<LogFilterProps> = ({ logs, onFilter }) => {
  const [selectedLevel, setSelectedLevel] = useState('');

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const level = event.target.value;
    setSelectedLevel(level);
    onFilter(level);
  };

  const logLevels = Array.from(new Set(logs.map(log => log.level)));

  return (
    <div>
      <select value={selectedLevel} onChange={handleFilterChange}>
        <option value="">Select Log Level</option>
        {logLevels.map((level) => (
          <option key={level} value={level}>{level}</option>
        ))}
      </select>
    </div>
  );
};

class LogsViewer extends React.Component<{}, LogsViewerState> {
  state: LogsViewerState = {
    logs: [],
    filteredLogs: [],
  };

  componentDidMount() {
  }

  filterLogsByLevel = (level: string) => {
    this.setState({
      filteredLogs: level === '' ? this.state.logs : this.state.logs.filter(log => log.level === level)
    });
  };

  render() {
    const { filteredLogs, logs } = this.state;
    const logsToDisplay = filteredLogs.length > 0 ? filteredLogs : logs;

    return (
      <div>
        <LogFilter logs={logs} onFilter={this.filterLogsByLevel} />
        {logsToDisplay.map((logEntry) => (
          <LogDetails key={logEntry.id} logEntry={logEntry} />
        ))}
      </div>
    );
  }
}

export default LogsViewer;