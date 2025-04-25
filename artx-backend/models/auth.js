import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET   

const authUser = async (req, res, next) => {
  const { token } = req.headers 
  if (!token) {
    return res.status(401).json({ status: "failed",message: 'No token provided' });
  }

  try {
    const tokenData = jwt.verify(token, JWT_SECRET);
    if (tokenData.id) { 
        req.user = { userId: tokenData.id }; 
        next();
    } else {
        return res.status(401).json({ status: "failed", message: 'Invalid token' });
    }
        
  } catch (error) {
    console.log('Error in authUser:', error.message);
    return res.status(401).json({ status: "failed", message: 'Invalid token' });
  }
} 

export default authUser