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

export interface ValidationResult {
  valid: boolean
  errors: Record<string, string>
}

export interface ApiResponse {
  success: boolean
  message: string
  errors?: Record<string, string>
  data?: Record<string, unknown>
}
