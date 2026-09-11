import express from "express"
import { index, store, show, update, destroy} from '../controllers/noteController.js'
import authCheck from "../middleware/authCheck.js"
import isOwner from "../middleware/isOwner.js"
const router = express.Router()

router.get('/notes', index)
router.post('/notes', authCheck, store)
router.get('/notes/:id', show)
router.put('/notes/:id', authCheck, isOwner, update)
router.delete('/notes/:id', authCheck, isOwner, destroy)


export default router
