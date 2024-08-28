import React, { useState, useEffect } from 'react';

interface LogEntry {
  id: string;
  message: string;
  level: 'debug' | 'info' | 'warning' | 'error';
  timestamp: Date;
}

const LogViewer: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<LogEntry[]>([]);
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 10;

  useEffect(() => {
    fetchLogs().then(setFetchedLogs);
  }, []);

  useEffect(() => {
    filterLogsAndUpdate();
  }, [filter, logs]);

  const setFetchedLogs = (fetchedLogs: LogEntry[]) => {
    setLogs(fetchedLogs);
    setFilteredLogs(fetchedLogs);
  };

  const filterLogsAndUpdate = () => {
    const filtered = logs.filter((log) =>
      log.message.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredLogs(filtered);
    resetToFirstPage();
  };

  const resetToFirstPage = () => setCurrentPage(1);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const currentLogs = getCurrentLogs(filteredLogs, currentPage, logsPerPage);

  return (
    <div>
      <LogFilter filter={filter} setFilter={setFilter} />
      <LogEntries entries={currentLogs} />
      <Pagination
        logsPerPage={logsPerPage}
        totalLogs={filteredLogs.length}
        paginate={paginate}
      />
    </div>
  );
};

interface PaginationProps {
  logsPerPage: number;
  totalLogs: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  logsPerPage,
  totalLogs,
  paginate,
}) => {
  const pageNumbers = computePageNumbers(totalLogs, logsPerPage);

  return (
    <nav>
      <ul>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button onClick={() => paginate(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const computePageNumbers = (totalLogs: number, logsPerPage: number) => {
  let pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalLogs / logsPerPage); i++) {
    pageNumbers.push(i);
  }
  return pageNumbers;
};

const getCurrentLogs = (logs: LogEntry[], currentPage: number, logsPerPage: number) => {
  const lastLogIndex = currentPage * logsPerPage;
  const firstLogIndex = lastLogIndex - logsPerPage;
  return logs.slice(firstLogIndex, lastLogIndex);
};

const LogFilter: React.FC<{ filter: string; setFilter: React.Dispatch<React.SetStateAction<string>> }> = ({ filter, setFilter }) => (
  <input
    type="text"
    placeholder="Filter logs..."
    value={filter}
    onChange={(e) => setFilter(e.target.value)}
  />
);

const LogEntries: React.FC<{ entries: LogEntry[] }> = ({ entries }) => (
  <div>
    {entries.map((log) => (
      <div key={log.id}>
        <p>{log.message}</p>
        <p>
          Level: {log.level} - Date: {log.timestamp.toString()}
        </p>
      </div>
    ))}
  </div>
);

async function fetchLogs(): Promise<LogEntry[]> {
  return Promise.resolve([
    { id: '1', message: 'User logged in', level: 'info', timestamp: new Date() },
    { id: '2', message: 'Database connection successful', level: 'debug', timestamp: new Date() },
  ]);
}

export default LogViewer;