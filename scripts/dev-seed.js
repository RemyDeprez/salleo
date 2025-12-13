#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'src', 'assets');
const outFile = path.join(outDir, 'mock-data.json');

const data = {
  users: [
    {
      id: 'dev-user',
      name: 'Utilisateur de test',
      email: 'test@example.com',
      roles: ['admin'],
      plan: 'pro'
    }
  ],
  rooms: [
    { id: 'room-1', name: 'Salle Alpha', capacity: 8, public: true },
    { id: 'room-2', name: 'Salle Beta', capacity: 16, public: false },
    { id: 'room-3', name: 'Salle Gamma', capacity: 4, public: true }
  ],
  reservations: [
    {
      id: 'res-1',
      roomId: 'room-1',
      title: 'Réunion produit',
      start: new Date(Date.now() + 3600 * 1000).toISOString(),
      end: new Date(Date.now() + 7200 * 1000).toISOString(),
      userId: 'dev-user'
    }
  ]
};

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

fs.writeFileSync(outFile, JSON.stringify(data, null, 2), 'utf8');
console.log('Wrote mock data to', outFile);
console.log('Users: ', data.users.map(u => u.email).join(', '));
console.log('Rooms: ', data.rooms.map(r => r.name).join(', '));

// Helpful hint: you can load this file in the app or use it to seed a mock API.
