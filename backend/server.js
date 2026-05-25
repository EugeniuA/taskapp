const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let tasks = [
  { id: 1, title: 'Learn Docker', done: false },
  { id: 2, title: 'Learn Kubernetes', done: false },
  { id: 3, title: 'Deploy on GCP', done: false }
];

app.get('/api/tasks', (req, res) => res.json(tasks));

app.post('/api/tasks', (req, res) => {
  const task = { id: Date.now(), title: req.body.title, done: false };
  tasks.push(task);
  res.status(201).json(task);
});

app.put('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  if (!task) return res.status(404).json({ error: 'Not found' });
  task.done = !task.done;
  res.json(task);
});

app.delete('/api/tasks/:id', (req, res) => {
  tasks = tasks.filter(t => t.id != req.params.id);
  res.status(204).send();
});

app.get('/health', (req, res) => res.json({ status: 'ok', hostname: require('os').hostname() }));

app.listen(3000, () => console.log('Backend running on port 3000'));
