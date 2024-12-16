import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'villagaleon-jwt-secret-key-2024';

export const verifyAdminToken = (req: any, res: any, next: any) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Access denied' });
    }

    const verified = jwt.verify(token, JWT_SECRET);
    req.admin = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};