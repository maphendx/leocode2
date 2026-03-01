/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { google } from 'googleapis'

// Define proper types for form data
interface FormData {
  name: string
  phone: string
  email?: string
  message?: string
  course?: string
  childName?: string
  childAge?: number | string
  location?: string
  source?: string
  isSummerCamp?: boolean
  [key: string]: string | number | boolean | undefined // For additional dynamic fields
}

// Type for validation errors
interface ValidationErrors {
  [key: string]: string
}

// Type for API response
interface ApiResponse {
  success: boolean
  message: string
  errors?: ValidationErrors
  data?: Record<string, unknown>
}

// Google Sheets connection setup
const setupGoogleSheets = async () => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth })
    return { sheets, auth }
  } catch (error) {
    console.error('Помилка налаштування Google Sheets:', error)
    throw new Error('Не вдалося ініціалізувати Google Sheets')
  }
}

// Apply nice formatting to the table with Ukrainian colors and headers
const applyTableFormatting = async (
  sheets: any,
  spreadsheetId: string,
  sheetId: number
) => {
  try {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            repeatCell: {
              range: {
                sheetId: sheetId,
                startRowIndex: 0,
                endRowIndex: 1,
              },
              cell: {
                userEnteredFormat: {
                  backgroundColor: {
                    red: 0,
                    green: 0.34,
                    blue: 0.72,
                  },
                  horizontalAlignment: 'CENTER',
                  textFormat: {
                    fontFamily: 'Arial',
                    fontSize: 12,
                    bold: true,
                    foregroundColor: {
                      red: 1,
                      green: 1,
                      blue: 1,
                    },
                  },
                },
              },
              fields:
                'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment)',
            },
          },
          {
            addConditionalFormatRule: {
              rule: {
                ranges: [
                  {
                    sheetId: sheetId,
                    startRowIndex: 1,
                  },
                ],
                booleanRule: {
                  condition: {
                    type: 'CUSTOM_FORMULA',
                    values: [{ userEnteredValue: '=MOD(ROW(),2)=0' }],
                  },
                  format: {
                    backgroundColor: {
                      red: 1,
                      green: 0.96,
                      blue: 0.85,
                    },
                  },
                },
              },
              index: 0,
            },
          },
          {
            addConditionalFormatRule: {
              rule: {
                ranges: [
                  {
                    sheetId: sheetId,
                    startRowIndex: 1,
                  },
                ],
                booleanRule: {
                  condition: {
                    type: 'CUSTOM_FORMULA',
                    values: [{ userEnteredValue: '=MOD(ROW(),2)=1' }],
                  },
                  format: {
                    backgroundColor: {
                      red: 0.95,
                      green: 0.97,
                      blue: 1,
                    },
                  },
                },
              },
              index: 1,
            },
          },
          {
            updateBorders: {
              range: {
                sheetId: sheetId,
                startRowIndex: 0,
                endRowIndex: 1000,
                startColumnIndex: 0,
                endColumnIndex: 8,
              },
              top: {
                style: 'SOLID',
                width: 1,
                color: { red: 0, green: 0.34, blue: 0.72 },
              },
              bottom: {
                style: 'SOLID',
                width: 1,
                color: { red: 0, green: 0.34, blue: 0.72 },
              },
              left: {
                style: 'SOLID',
                width: 1,
                color: { red: 0, green: 0.34, blue: 0.72 },
              },
              right: {
                style: 'SOLID',
                width: 1,
                color: { red: 0, green: 0.34, blue: 0.72 },
              },
              innerHorizontal: {
                style: 'SOLID',
                width: 1,
                color: { red: 0, green: 0.34, blue: 0.72 },
              },
              innerVertical: {
                style: 'SOLID',
                width: 1,
                color: { red: 0, green: 0.34, blue: 0.72 },
              },
            },
          },
          {
            autoResizeDimensions: {
              dimensions: {
                sheetId: sheetId,
                dimension: 'COLUMNS',
                startIndex: 0,
                endIndex: 8,
              },
            },
          },
          {
            updateSheetProperties: {
              properties: {
                sheetId: sheetId,
                gridProperties: {
                  frozenRowCount: 1,
                },
              },
              fields: 'gridProperties.frozenRowCount',
            },
          },
        ],
      },
    })
  } catch (error) {
    console.error('Помилка форматування таблиці:', error)
  }
}

// Check if the sheet exists and create it if it doesn't
const ensureSheetExists = async (
  sheets: any,
  spreadsheetId: string,
  sheetName: string,
  headerRow: string[]
) => {
  try {
    const response = await sheets.spreadsheets.get({ spreadsheetId })
    let sheetId = null

    const sheetExists = response.data.sheets.some((sheet: any) => {
      if (sheet.properties.title === sheetName) {
        sheetId = sheet.properties.sheetId
        return true
      }
      return false
    })

    if (!sheetExists) {
      console.log(`Аркуш "${sheetName}" не існує. Створюємо його...`)

      const addSheetResponse = await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: sheetName,
                },
              },
            },
          ],
        },
      })

      sheetId = addSheetResponse.data.replies[0].addSheet.properties.sheetId

      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${sheetName}!A1:${String.fromCharCode(
          65 + headerRow.length - 1
        )}1`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [headerRow],
        },
      })

      await applyTableFormatting(sheets, spreadsheetId, sheetId)

      console.log(
        `Аркуш "${sheetName}" створено успішно з українськими заголовками`
      )
    } else if (sheetId) {
      await applyTableFormatting(sheets, spreadsheetId, sheetId)
    }

    return sheetId
  } catch (error) {
    console.error(`Помилка створення аркуша "${sheetName}":`, error)
    throw error
  }
}

export async function POST(request: Request): Promise<any> {
  try {
    const formData: FormData = await request.json()
    const {
      parentName,
      childName,
      childAge,
      direction,
      location,
      phone,
      isSummerCamp,
    } = formData

    const validation = validateFormData(formData)

    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          message: 'Будь ласка, перевірте правильність заповнення форми',
          errors: validation.errors,
        },
        { status: 400 }
      )
    }

    const submissionDate = new Date().toLocaleString('uk-UA', {
      timeZone: 'Europe/Kiev',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })

    const spreadsheetId = process.env.GOOGLE_SHEET_ID
    if (!spreadsheetId) {
      return NextResponse.json(
        {
          success: false,
          message:
            'GOOGLE_SHEET_ID не налаштовано. Додайте змінні середовища для Google Sheets.',
        },
        { status: 500 }
      )
    }

    if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      return NextResponse.json(
        {
          success: false,
          message:
            'GOOGLE_CLIENT_EMAIL або GOOGLE_PRIVATE_KEY не налаштовані.',
        },
        { status: 500 }
      )
    }

    const { sheets } = await setupGoogleSheets()

    console.log(
      `Використовується сервісний акаунт: ${process.env.GOOGLE_CLIENT_EMAIL}`
    )
    console.log(`Спроба доступу до таблиці: ${spreadsheetId}`)

    const formResponsesHeaders = [
      'Дата і час',
      'Батько/мама',
      'Дитина',
      'Вік дитини',
      'Напрямок',
      'Локація',
      'Телефон',
    ]
    await ensureSheetExists(
      sheets,
      spreadsheetId,
      'Відповіді форми',
      formResponsesHeaders
    )

    const dataRowFormResponses = [
      submissionDate,
      parentName || '',
      childName || '',
      childAge || '',
      direction || '',
      location || '',
      `'${phone.replace(/^\+/, '+')}`,
    ]

    const responseForm = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Відповіді форми!A:G',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [dataRowFormResponses],
      },
    })

    // Add to either standard registrations or summer camp registrations based on form type
    if (isSummerCamp) {
      // Summer Camp sheet
      const summerCampHeaders = [
        'Дата і час',
        'Батько/мама',
        'Дитина',
        'Вік дитини',
        'Телефон',
        'Напрямок табору',
      ]
      await ensureSheetExists(
        sheets,
        spreadsheetId,
        'Літній табір',
        summerCampHeaders
      )

      const summerCampRow = [
        submissionDate,
        parentName || '',
        childName || '',
        childAge || '',
        `'${phone.replace(/^\+/, '+')}`,
        direction || '',
      ]

      const responseSummerCamp = await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'Літній табір!A:F',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [summerCampRow],
        },
      })

      console.log('Форма успішно відправлена на аркуш Літній табір:', {
        summerCampResponse: responseSummerCamp.data,
      })
    } else {
      // Regular registrations sheet
      const registrationsHeaders = [
        'Дата і час',
        'Батько/мама',
        'Телефон',
        'Вік дитини',
        'Локація',
      ]
      await ensureSheetExists(
        sheets,
        spreadsheetId,
        'Реєстрації',
        registrationsHeaders
      )

      const dataRowRegistrations = [
        submissionDate,
        parentName || '',
        `'${phone.replace(/^\+/, '+')}`,
        childAge || '',
        location || '',
      ]

      const responseRegistration = await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'Реєстрації!A:E',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [dataRowRegistrations],
        },
      })

      console.log('Форма успішно відправлена на аркуш Реєстрації:', {
        registrationResponse: responseRegistration.data,
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Форма успішно відправлена',
    })
  } catch (error: any) {
    console.error('Помилка відправки форми:', error)

    if (
      error.message?.includes('parse range') ||
      error.message?.includes('Unable to parse range')
    ) {
      return NextResponse.json(
        {
          success: false,
          message: 'Аркуш не знайдено',
          details:
            'Аркуш потрібно спочатку створити. Будь ласка, оновіть сторінку і спробуйте знову.',
        },
        { status: 400 }
      )
    }

    if (
      error.response?.status === 403 ||
      error.message?.includes('permission')
    ) {
      const errorDetails = error.response?.data?.error || {}

      return NextResponse.json(
        {
          success: false,
          message: 'Відмовлено в доступі до Google таблиці',
          details: `Будь ласка, перевірте, що ваша Google таблиця (${process.env.GOOGLE_SHEET_ID}) має спільний доступ з ${process.env.GOOGLE_CLIENT_EMAIL} та має права редактора`,
          error: errorDetails,
        },
        { status: 403 }
      )
    }

    if (error.response) {
      return NextResponse.json(
        {
          success: false,
          message: `Помилка Google API: ${error.message}`,
          details: error.response.data?.error || {},
        },
        { status: error.response.status || 500 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Не вдалося відправити форму',
      },
      { status: 500 }
    )
  }
}

const validateFormData = (
  data: FormData
): { valid: boolean; errors: ValidationErrors } => {
  const errors: ValidationErrors = {}

  // Handle both name and parentName fields
  const nameField = data.name || data.parentName
  if (!nameField || nameField.toString().trim().length < 2) {
    errors.name = "Ім'я повинно містити не менше 2 символів"
  }

  const normalizedPhone = (data.phone || '').toString().replace(/[^\d+]/g, '')
  if (!normalizedPhone || !/^\+\d{8,15}$/.test(normalizedPhone)) {
    errors.phone = 'Введіть коректний номер телефону'
  }

  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Введіть коректну електронну адресу'
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  }
}

const sendNotification = (
  recipient: string,
  message: string,
  data: Record<string, unknown>
): Promise<void> => {
  return Promise.resolve()
}

const logActivity = (
  actionType: string,
  data: Record<string, unknown>
): void => {
  const timestamp = new Date().toISOString()
  const logData = {
    timestamp,
    actionType,
    ...data,
  }

  console.log(`[${actionType}] ${timestamp}:`, JSON.stringify(logData))
}
