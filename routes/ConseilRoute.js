import express from 'express';
import {
    getContents,
    getContentById,
    saveContent,
    updateContent,
    deleteContent
} from '../controllers/ConseilController.js';

const router = express.Router();

router.get('/conseil', getContents);
router.get('/conseil/:id', getContentById);
router.post('/conseil', saveContent);
router.put('/conseil/:id', updateContent);
router.delete('/conseil/:id', deleteContent);

export default router;
