// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [emails, setEmails] = useState([]);
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/email/history', { withCredentials: true })
      .then(res => setEmails(res.data))
      .catch(err => console.error(err));
  }, []);

  const sendEmail = () => {
    axios.post('http://localhost:5000/email/send', { to, subject, text }, { withCredentials: true })
      .then(() => {
        setTo('');
        setSubject('');
        setText('');
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Communication History</h2>
      <ul>
        {emails.map(email => (
          <li key={email._id}>
            {email.subject} - {email.to}
          </li>
        ))}
      </ul>
      <h2>Compose Email</h2>
      <form onSubmit={e => { e.preventDefault(); sendEmail(); }}>
        <input type="email" placeholder="To" value={to} onChange={e => setTo(e.target.value)} required />
        <input type="text" placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} required />
        <textarea placeholder="Text" value={text} onChange={e => setText(e.target.value)} required />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Dashboard;
