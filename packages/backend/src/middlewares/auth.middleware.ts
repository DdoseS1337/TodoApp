import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Request, Response, NextFunction } from 'express';
import { User } from '../entities/User';

const jwtSecret = process.env.JWT_SECRET;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const user = await User.findOneBy({ id: payload.id, email: payload.email });
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (error: Error, user: User | undefined) => {
    if (error || !user) {
      return res.status(401).json({
        error,
        data: { isAuthenticated: false },
        message: 'Authentication failed'
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};
