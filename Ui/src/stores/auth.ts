import { atom } from 'jotai'

import { validateSession } from '../lib/api'
import type { User } from '../types'

type UserAtom = User | null

export const userAtom = atom<UserAtom | Promise<UserAtom>>(validateSession())
