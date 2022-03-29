import { v4 } from 'uuid'

export const generateUid = () => `xx${v4().slice(0, 8)}`
