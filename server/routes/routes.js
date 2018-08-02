
import userController from '../controllers/userController';
import validation from '../middleware/validation';
import authenticate from '../middleware/authenticate';
import entryController from '../controllers/entryController';

const router = (app) => {
  app.get('/', (req, res) => {
    res.status(200)
      .send('Welcome to My Diary App');
  });
  app.get('/v1/api/entries', authenticate.checkToken, entryController.getAll);
  app.get('/v1/api/entries/:id', authenticate.checkToken, entryController.getOne);
  app.post('/v1/api/entries', authenticate.checkToken, entryController.addNew);
  app.put('/v1/api/entries/:id', authenticate.checkToken, entryController.updateEntry);
  app.delete('/v1/api/entries/:id', authenticate.checkToken, entryController.deleteEntry);
    
  /** Auth routes */
  app.post('/v1/api/auth/signup', validation.userSignupValidation, userController.findUser, userController.createUser);
  app.post('/v1/api/auth/login', userController.loginUser);
};


export default router;
