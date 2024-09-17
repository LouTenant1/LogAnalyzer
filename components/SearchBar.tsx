import React, { useState, useEffect } from 'react';

interface LogEntry {
  timestamp: string;
  level: string;
  source: string;
  message: string;
}

const LogSearchComponent: React.FC = () => {
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);
  const [visibleLogEntries, setVisibleLogEntries] = useState<LogEntry[]>([]);
  const [timestampFilterText, setTimestampFilterText] = useState<string>('');
  const [logLevelFilterText, setLogLevelFilterText] = useState<string>('');
  const [sourceFilterText, setSourceFilterText] = useState<string>('');
  const [keywordSearchText, setKeywordSearchText] = useState<string>('');

  useEffect(() => {
    fetchLogEntries();
  }, []);

  async function fetchLogEntries() {
    const apiEndpoint = process.env.REACT_APP_LOGS_API_URL;
    const response = await fetch(apiEndpoint!);
    const fetchedLogEntries = await response.json();
    setLogEntries(fetchedLogEntries);
    setVisibleLogEntries(fetchedLogEntries);
  }

  useEffect(() => {
    applyFiltersToLogEntries();
  }, [timestampFilterText, logLevelFilterText, sourceFilterText, keywordSearchText, logEntries]);

  function applyFiltersToLogEntries() {
    const lowercasedKeyword = keywordSearchText.toLowerCase();
    const filteredLogs = logEntries.filter(log =>
      matchesTimestamp(log) &&
      matchesLogLevel(log) &&
      matchesSource(log) &&
      containsKeyword(log, lowercasedKeyword)
    );
    setVisibleLogEntries(filteredLogs);
  }

  function matchesTimestamp(log: LogEntry): boolean {
    return log.timestamp.includes(timestampFilterText) || timestampFilterText === '';
  }

  function matchesLogLevel(log: LogEntry): boolean {
    return log.level.includes(logLevelFilterText) || logLevelFilterText === '';
  }

  function matchesSource(log: LogEntry): boolean {
    return log.source.includes(sourceFilterText) || sourceFilterText === '';
  }

  function containsKeyword(log: LogEntry, keyword: string): boolean {
    return log.message.toLowerCase().includes(keyword) || keyword === '';
  }
  
  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Filter by timestamp"
          value={timestampFilterText}
          onChange={(e) => setTimestampFilterText(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by log level"
          value={logLevelFilterText}
          onChange={(e) => setLogLevelFilterText(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by source"
          value={sourceFilterText}
          onChange={(e) => setSourceFilterText(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search keywords"
          value={keywordSearchText}
          onChange={(e) => setKeywordSearchText(e.target.value)}
        />
      </div>
      <div>
        {visibleLogEntries.map((log, index) => (
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