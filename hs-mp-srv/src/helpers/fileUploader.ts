import { existsSync, mkdirSync, rename } from 'fs'
import type { Request } from 'express'
import path from 'path'
import { diskStorage } from 'multer'

import { PRODUCTS_IMAGES_FOLDER_PATH } from '../consts/storagePaths'

export const ensureProductImagesDir = () => {
  if (!existsSync(PRODUCTS_IMAGES_FOLDER_PATH)) {
    mkdirSync(PRODUCTS_IMAGES_FOLDER_PATH, { recursive: true })
  }
}

const changeFilenameSafe = (origFilename: string) => {
  const ext = path.extname(origFilename)
  const base = path.basename(origFilename, ext)
  const sanitizedBase = base.replace(/\s/g, '-').replace(/[^a-zA-Z0-9-_]/g, '')
  return `${Date.now()}-${sanitizedBase}${ext}`
}

export const makeSafeFilename = (origFilename: string) =>
  changeFilenameSafe(origFilename)

export const getMulterOptions = (relativePath = '') => {
  return {
    limits: {
      fileSize: 1024 * 1024 * 3,
    },
    storage: diskStorage({
      destination: (
        _req: Request,
        _file: Express.Multer.File,
        cb: (error: Error | null, destination: string) => void
      ) => {
        const storagePath = path.join(process.cwd(), 'storage')
        const splittedRelativePath = relativePath.split('/').filter(Boolean)
        let incrementalPath = storagePath
        if (!existsSync(storagePath)) {
          mkdirSync(storagePath, { recursive: true })
        }
        splittedRelativePath.forEach((folder) => {
          if (!existsSync(incrementalPath + path.sep + folder)) {
            mkdirSync(incrementalPath + path.sep + folder)
          }
          incrementalPath = incrementalPath + path.sep + folder
        })
        cb(null, incrementalPath)
      },
      filename: (
        _req: Request,
        file: Express.Multer.File,
        cb: (error: Error | null, filename: string) => void
      ) => {
        const safe = makeSafeFilename(file.originalname)
        cb(null, safe)
      },
    }),
  }
}

export const renameUploadedFile = (
  filename: string,
  directory = PRODUCTS_IMAGES_FOLDER_PATH
) => {
  ensureProductImagesDir()
  const updatedFilename = changeFilenameSafe(filename)
  const fromPath = path.join(directory, filename)
  const toPath = path.join(directory, updatedFilename)
  rename(fromPath, toPath, (err) => {
    if (err) {
      console.error('Failed to rename uploaded file', err)
    }
  })
  return updatedFilename
}
