import React, { useState, useEffect } from 'react';

export default function App() {
  const [volunteers, setVolunteers] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [name, setName] = useState('');
  const [skills, setSkills] = useState('');
  const [opName, setOpName] = useState('');
  const [opSkills, setOpSkills] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [donationAmount, setDonationAmount] = useState('');

  useEffect(() => {
    fetch('/volunteers').then(r => r.json()).then(setVolunteers);
    fetch('/opportunities').then(r => r.json()).then(setOpportunities);
  }, []);

  function addVolunteer() {
    fetch('/volunteers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: Date.now(), name, zipcode, skills: skills.split(',') })
    }).then(r => r.json()).then(v => setVolunteers([...volunteers, v]));
  }

  function addOpportunity() {
    fetch('/opportunities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: Date.now(), name: opName, zipcode, skills: opSkills.split(',') })
    }).then(r => r.json()).then(o => setOpportunities([...opportunities, o]));
  }

  function donateCommunity() {
    fetch('/donate/community', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ zipcode, amount: parseFloat(donationAmount) })
    });
  }

  return (
    <div>
      <h1>HelpingCircle</h1>
      <div>
        <h2>Add Volunteer</h2>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Zipcode" value={zipcode} onChange={e => setZipcode(e.target.value)} />
        <input placeholder="Skills comma separated" value={skills} onChange={e => setSkills(e.target.value)} />
        <button onClick={addVolunteer}>Add Volunteer</button>
      </div>
      <div>
        <h2>Add Opportunity</h2>
        <input placeholder="Name" value={opName} onChange={e => setOpName(e.target.value)} />
        <input placeholder="Zipcode" value={zipcode} onChange={e => setZipcode(e.target.value)} />
        <input placeholder="Skills comma separated" value={opSkills} onChange={e => setOpSkills(e.target.value)} />
        <button onClick={addOpportunity}>Add Opportunity</button>
      </div>
      <div>
        <h2>Donate to Community</h2>
        <input placeholder="Zipcode" value={zipcode} onChange={e => setZipcode(e.target.value)} />
        <input placeholder="Amount" value={donationAmount} onChange={e => setDonationAmount(e.target.value)} />
        <button onClick={donateCommunity}>Donate</button>
      </div>
      <h2>Volunteers</h2>
      <ul>
        {volunteers.map(v => <li key={v.id}>{v.name} - {v.skills.join(', ')}</li>)}
      </ul>
      <h2>Opportunities</h2>
      <ul>
        {opportunities.map(o => <li key={o.id}>{o.name} - {o.skills.join(', ')}</li>)}
      </ul>
    </div>
  );
}
