import axios from 'axios';
export default async function handler(req, res) {
  if (!process.env.API_TOKEN) return res.status(500).json({error:'API_TOKEN missing'});
  return res.status(200).json({ok:true});
}
