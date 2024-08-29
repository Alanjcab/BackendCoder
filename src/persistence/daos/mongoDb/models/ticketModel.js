import { Schema, model } from 'mongoose';

export const ticketSchema = new Schema({
  Code: { type: String, required: true },
  Purchase_datetime: { type: String, required: true },
  Amount: { type: Number, required: true },
  Purchaser: { type: String, required: true },
});

export const TicketModel = model(
  'ticket',
  ticketSchema
);