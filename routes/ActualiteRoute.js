import express from 'express';
import {
    getContents,
    getContentById,
    saveContent,
    updateContent,
    deleteContent
} from '../controllers/ActualiteController.js';

const router = express.Router();

router.get('/actu', getContents);
router.get('/actu/:id', getContentById);
router.post('/actu', saveContent);
router.put('/actu/:id', updateContent);
router.delete('/actu/:id', deleteContent);

export default router;
