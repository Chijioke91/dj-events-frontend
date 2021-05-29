const { events } = require('./data.json');

export default (req, res) => {
  const { slug } = req.query;
  const evt = events.find((evt) => evt.slug === slug);
  if (req.method === 'GET') {
    res.status(200).json(evt);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `method: ${req.method} is not allowed` });
  }
};
