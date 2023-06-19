import express from 'express';
import { auth } from '../middleware/auth.ts';
import {
  handleGetTickets,
  handleGetTicketDetails,
  handleCreateTicket,
  handleUpdateTicket,
  handleDeleteTicket
} from '../controllers/tickets.ts';

const router = express.Router();
router.get('/', auth, handleGetTickets as any);

router.get('/:ticketId', auth, handleGetTicketDetails);

router.post('/', auth, handleCreateTicket as any);

router.put('/:ticketId', auth, handleUpdateTicket as any);

router.delete('/:ticketId', auth, handleDeleteTicket as any);

export default router;
