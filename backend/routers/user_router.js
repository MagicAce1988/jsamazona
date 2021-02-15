/* eslint-disable camelcase */
import express from 'express';

const user_router = express.Router();

// user_router.get('/create_admin', async (req, res) => {
//   try {
//     const user = new User({
//       name: 'admin',
//       email: 'magicace1988@gmail.com',
//       password: 'jsamazona',
//       isAdmin: true,
//     });
//     const createdUser = await user.save();
//     res.send(createdUser);
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// });

export default user_router;
