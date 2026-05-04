/**
 * Common types for API routes
 */

export interface FormData {
  name: string
  phone: string
  email?: string
  message?: string
  course?: string
  childName?: string
  childAge?: number | string
  source?: string
  [key: string]: string | number | undefined
}

export interface ValidationErrors {
  [key: string]: string
}

export interface ValidationResult {
  valid: boolean
  errors: ValidationErrors
}

export interface ApiResponse {
  success: boolean
  message: string
  errors?: ValidationErrors
  data?: Record<string, unknown>
}

export type NotificationData = Record<string, unknown>
export type ActivityLogData = Record<string, unknown>
