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
  const [logsPerPage] = useState(10);

  useEffect(() => {
    fetchLogs().then((fetchedLogs) => {
      setLogs(fetchedLogs);
      setFilteredLogs(fetchedLogs);
    });
  }, []);

  useEffect(() => {
    const filtered = logs.filter((log) =>
      log.message.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredLogs(filtered);
    setCurrentPage(1); 
  }, [filter, logs]);

  const lastLogIndex = currentPage * logsPerPage;
  const firstLogIndex = lastLogIndex - logsPerPage;
  const currentLogs = filteredLogs.slice(firstLogIndex, lastLogIndex);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <input
        type="text"
        placeholder="Filter logs..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <div>
        {currentLogs.map((log) => (
          <div key={log.id}>
            <p>{log.message}</p>
            <p>
              Level: {log.level} - Date: {log.timestamp.toString()}
            </p>
          </div>
        ))}
      </div>
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
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalLogs / logsPerPage); i++) {
    pageNumbers.push(i);
  }

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

async function fetchLogs(): Promise<LogEntry[]> {
  return Promise.resolve([
    { id: '1', message: 'User logged in', level: 'info', timestamp: new Date() },
    { id: '2', message: 'Database connection successful', level: 'debug', timestamp: new Date() },
  ]);
}

export default LogViewer;