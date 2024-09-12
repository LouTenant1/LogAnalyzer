import React, { useState, useEffect } from 'react';

interface LogEntry {
  timestamp: string;
  level: string;
  source: string;
  message: string;
}

const LogSearchComponent: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<LogEntry[]>([]);
  const [timestampFilter, setTimestampFilter] = useState<string>('');
  const [logLevelFilter, setLogLevelFilter] = useState<string>('');
  const [sourceFilter, setSourceFilter] = useState<string>('');
  const [keywordFilter, setKeywordFilter] = useState<string>('');

  useEffect(() => {
    async function fetchLogs() {
      const logsUrl = process.env.REACT_APP_LOGS_API_URL;
      const response = await fetch(logsUrl!);
      const data = await response.json();
      setLogs(data);
      setFilteredLogs(data);
    }
    fetchLogs();
  }, []);

  useEffect(() => {
    const search = () => {
      const lowercasedKeyword = keywordFilter.toLowerCase();
      const result = logs.filter(log =>
        (log.timestamp.includes(timestampFilter) || timestampFilter === '') &&
        (log.level.includes(logLevelFilter) || logLevelFilter === '') &&
        (log.source.includes(sourceFilter) || sourceFilter === '') &&
        (log.message.toLowerCase().includes(lowercasedKeyword) || lowercasedKeyword === '')
      );
      setFilteredLogs(result);
    };
    search();
  }, [timestampFilter, logLevelFilter, sourceFilter, keywordFilter, logs]);

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Filter by timestamp"
          value={timestampFilter}
          onChange={(e) => setTimestampFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by log level"
          value={logLevelFilter}
          onChange={(e) => setLogLevelFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by source"
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search keywords"
          value={keywordFilter}
          onChange={(e) => setKeywordFilter(e.target.value)}
        />
      </div>
      <div>
        {filteredLogs.map((log, index) => (
          <div key={index}>
            <p>{log.timestamp}: {log.level} - {log.source}</p>
            <p>{log.message}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default LogSearchComponent;