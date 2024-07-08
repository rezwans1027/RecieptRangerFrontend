import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { formatDistanceToNow } from 'date-fns'

export const formatTimeAgo = (date: Date | string | number) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatRole = (role: string) => {
  return role.charAt(0).toUpperCase() + role.slice(1)
}

export const formatManager = (manager: string | null) => {
  return manager ? (manager.trim().length !== 0 ? manager : 'None') : 'None'
}

export const roleMapping: { [key: string]: number } = {
  manager: 2,
  employee: 3,
};