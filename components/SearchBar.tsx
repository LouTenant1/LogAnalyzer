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
    fetchLogs();
  }, []);

  async function fetchLogs() {
    const logsUrl = process.env.REACT_APP_LOGS_API_URL;
    const response = await fetch(logsUrl!);
    const data = await response.json();
    setLogs(data);
    setFilteredLogs(data);
  }

  useEffect(() => {
    filterLogs();
  }, [timestampFilter, logLevelFilter, sourceFilter, keywordFilter, logs]);

  function filterLogs() {
    const lowercasedKeyword = keywordFilter.toLowerCase();
    const result = logs.filter(log =>
      filterByTimestamp(log) &&
      filterByLogLevel(log) &&
      filterBySource(log) &&
      filterByKeyword(log, lowercasedKeyword)
    );
    setFilteredLogs(result);
  }

  function filterByTimestamp(log: LogEntry): boolean {
    return log.timestamp.includes(timestampFilter) || timestampFilter === '';
  }

  function filterByLogLevel(log: LogEntry): boolean {
    return log.level.includes(logLevelFilter) || logLevelFilter === '';
  }

  function filterBySource(log: LogEntry): boolean {
    return log.source.includes(sourceFilter) || sourceFilter === '';
  }

  function filterByKeyword(log: LogEntry, keyword: string): boolean {
    return log.message.toLowerCase().includes(keyword) || keyword === '';
  }
  
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