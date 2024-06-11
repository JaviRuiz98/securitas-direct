import { Router } from 'express';

const router = Router();

// Define tus rutas aquí
router.get('/', (req, res) => {
  res.send('Hello World!');
});

export default router;
