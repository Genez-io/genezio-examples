import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({
  id: String,
  name: String,
  parameters: Map,
  blockNumber: Number,
  logIndex: Number,
});

export const EventModel = mongoose.models.Event || mongoose.model('Event', eventSchema);
