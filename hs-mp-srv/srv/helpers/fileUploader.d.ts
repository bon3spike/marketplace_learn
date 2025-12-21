export declare const ensureProductImagesDir: () => void;
export declare const makeSafeFilename: (origFilename: string) => string;
export declare const getMulterOptions: (relativePath?: string) => {
    limits: {
        fileSize: number;
    };
    storage: any;
};
export declare const renameUploadedFile: (filename: string, directory?: string) => string;
