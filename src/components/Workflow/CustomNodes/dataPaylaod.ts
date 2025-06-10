// FileType 枚举
export type FileType = "Image" | "Audio" | "Video";

// File 数据
export interface FileData {
	path: string;
	file_type: FileType;
}

// SingleData 单一数据类型
export type SingleData =
	| { type: "Text"; value: string }
	| { type: "FilePath"; value: FileData }
	| { type: "ImageMatrix"; value: number[] }
	| { type: "AudioFeatures"; value: number[] }
	| { type: "VideoFrames"; value: number[][] };

// Collection 数据结构
export interface DataCollection {
	texts: string[];
	files: FileData[];
	image_matrices: number[][];
	audio_features: number[][];
	video_frames: number[][][];
}

// DataPayload 类型：单一或集合
export type DataPayload =
	| { kind: "Single"; data: SingleData }
	| { kind: "Collection"; data: DataCollection };
