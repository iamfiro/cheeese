export enum UploadStateType {
    WAITING = "WAITING",
    UPLOADING = "UPLOADING",
    DONE = "DONE",
    ERROR = "ERROR"
}

export interface UploadState {
    id: string;
    state: UploadStateType;
    name: string;
    size: number;
    extension: string;
    file?: File;
    progress: number;
}