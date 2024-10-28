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

interface LogFilterProps {
  logs: LogEntry[];
  onFilter: (level: string) => void;
}

const LogFilter: FC<LogFilterProps> = ({ logs, onFilter }) => {
  const [selectedLevel, setSelectedLevel] = useState("");

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
        {logLevels.map((level, index) => (
          <option key={index} value={level}>
            {level}
          </option>
        ))}
      </select>
    </div>
  );
};

class LogsViewer extends React.Component<{}, LogsViewerState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      logs: [], // You need to populate this array with your log entries
      filteredLogs: [],
    };
  }

  componentDidMount() {}

  filterLogsByLevel = (level: string) => {
    if (level === '') {
      this.setState({ filteredLogs: this.state.logs });
    } else {
      const filteredLogs = this.state.logs.filter(log => log.level === level);
      this.setState({ filteredLogs });
    }
  };

  render() {
    const { filteredLogs, logs } = this.state;
    const logsToDisplay = filteredLogs.length > 0 ? filteredLogs : logs;

    return (
      <div>
        <LogFilter logs={logs} onFilter={this.filterLogsByLevel} />
        {logsToDisplay.map((logEntry, index) => (
          <LogDetails key={index} logEntry={logEntry} />
        ))}
      </div>
    );
  }
}

export default LogsViewer;