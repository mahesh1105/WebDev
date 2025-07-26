import { Router } from 'express'
import { createSong, deleteSong, createAlbum, deleteAlbum, checkAdmin } from '../controller/admin.controller.js';
import { protectRoute, requireAdmin } from '../middleware/auth.middleware.js';

const router = Router();

// Middleware to check user is authenticated and is admin then it will proceed to next functions
router.use(protectRoute, requireAdmin);

router.get('/check', checkAdmin);

// That's how middleware works
// First it will check user authentication
// Then user is admin or not and
// then call the function createSong and other functions - makes sense !!
router.post('/songs', createSong);
router.delete('/songs/:id', deleteSong);

router.post('/albums', createAlbum);
router.delete('/albums/:id', deleteAlbum);

export default router;