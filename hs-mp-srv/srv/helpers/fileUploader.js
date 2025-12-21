"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renameUploadedFile = exports.getMulterOptions = exports.makeSafeFilename = exports.ensureProductImagesDir = void 0;
const fs_1 = require("fs");
const path = require("path");
const multer_1 = require("multer");
const storagePaths_1 = require("../consts/storagePaths");
const ensureProductImagesDir = () => {
    if (!(0, fs_1.existsSync)(storagePaths_1.PRODUCTS_IMAGES_FOLDER_PATH)) {
        (0, fs_1.mkdirSync)(storagePaths_1.PRODUCTS_IMAGES_FOLDER_PATH, { recursive: true });
    }
};
exports.ensureProductImagesDir = ensureProductImagesDir;
const changeFilenameSafe = (origFilename) => {
    const ext = path.extname(origFilename);
    const base = path.basename(origFilename, ext);
    const sanitizedBase = base
        .replace(/\s/g, '-')
        .replace(/[^a-zA-Z0-9-_]/g, '');
    return `${Date.now()}-${sanitizedBase}${ext}`;
};
const makeSafeFilename = (origFilename) => changeFilenameSafe(origFilename);
exports.makeSafeFilename = makeSafeFilename;
const getMulterOptions = (relativePath = '') => {
    return {
        limits: {
            fileSize: 1024 * 1024 * 3,
        },
        storage: (0, multer_1.diskStorage)({
            destination: (_req, _file, cb) => {
                const storagePath = path.join(process.cwd(), 'storage');
                const splittedRelativePath = relativePath.split('/').filter(Boolean);
                let incrementalPath = storagePath;
                if (!(0, fs_1.existsSync)(storagePath)) {
                    (0, fs_1.mkdirSync)(storagePath, { recursive: true });
                }
                splittedRelativePath.forEach((folder) => {
                    if (!(0, fs_1.existsSync)(incrementalPath + path.sep + folder)) {
                        (0, fs_1.mkdirSync)(incrementalPath + path.sep + folder);
                    }
                    incrementalPath = incrementalPath + path.sep + folder;
                });
                cb(null, incrementalPath);
            },
            filename: (_req, file, cb) => {
                const safe = (0, exports.makeSafeFilename)(file.originalname);
                cb(null, safe);
            },
        }),
    };
};
exports.getMulterOptions = getMulterOptions;
const renameUploadedFile = (filename, directory = storagePaths_1.PRODUCTS_IMAGES_FOLDER_PATH) => {
    (0, exports.ensureProductImagesDir)();
    const updatedFilename = changeFilenameSafe(filename);
    const fromPath = path.join(directory, filename);
    const toPath = path.join(directory, updatedFilename);
    (0, fs_1.rename)(fromPath, toPath, (err) => {
        if (err) {
            console.error('Failed to rename uploaded file', err);
        }
    });
    return updatedFilename;
};
exports.renameUploadedFile = renameUploadedFile;
//# sourceMappingURL=fileUploader.js.map