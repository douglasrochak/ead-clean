import dotenv from 'dotenv';
dotenv.config();

import app from './external/api/config';

import UserRepositoryPrisma from './external/db/UserRepositoryPrisma';
import BcryptCryptoProvider from './external/auth/BcryptCryptoProvider';
import JWTProvider from './external/auth/JWTProvider';
import RegisterUserController from './adapters/RegisterUserController';
import LoginUserController from './adapters/LoginUserController';

// ------------- Dependency

if(!process.env.JWT_SECRET) throw new Error('JWT_SECRET not found')
const jwtProvider = new JWTProvider(process.env.JWT_SECRET)
const userRepository = new UserRepositoryPrisma()
const cryptoProvider = new BcryptCryptoProvider()

// ------------- Open Routes
new RegisterUserController(app, userRepository, cryptoProvider)

// ------------- Close Routes
new LoginUserController(app, userRepository, cryptoProvider, jwtProvider)
