import React, { useState, useEffect } from 'react';
import './LogStatistics.css';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || "https://api.example.com/logs";

const LogStatistics: React.FC = () => {
    const [logs, setLogs] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(API_ENDPOINT);
            if (!response.ok) {
                throw new Error('Failed to fetch logs');
            }
            const data = await response.json();
            setLogs(data);
        } catch (err) {
            setError(err.message || 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    const calculateErrorRate = () => {
        const errorLogs = logs.filter(log => log.type === 'error').length;
        const totalLogs = logs.length;
        return totalLogs > 0 ? ((errorLogs / totalLogs) * 100).toFixed(2) + '%' : '0%';
    };

    return (
        <div className="log-statistics">
            <h2>Log Statistics and Analytics</h2>
            {isLoading ? (
                <div>Loading...</div>
            ) : error ? (
                <div className="error">{error}</div>
            ) : (
                <div>
                    <div>Total Logs: {logs.length}</div>
                    <div>Error Rate: {calculateErrorRate()}</div>
                </div>
            )}
        </div>
    );
};

export default LogStatistics;