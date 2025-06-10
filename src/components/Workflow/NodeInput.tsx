import type { DataPayload } from "./dataPaylaod";

interface NodeInputProps {
	input: DataPayload;
}

const NodeInput: React.FC<NodeInputProps> = ({ input }) => {
	if (input.kind === "Single") {
		const single = input.data;

		switch (single.type) {
			case "Text":
				return <div>{single.value}</div>;
			case "FilePath":
				return (
					<div>
						<p>File Path: {single.value.path}</p>
						<p>Type: {single.value.file_type}</p>
					</div>
				);
			case "ImageMatrix":
			case "AudioFeatures":
				return (
					<p>
						{single.type} length: {single.value.length}
					</p>
				);
			case "VideoFrames":
				return (
					<p>
						{single.type} frame count: {single.value.length}
					</p>
				);
			default:
				return <p>Unsupported single data type</p>;
		}
	}

	if (input.kind === "Collection") {
		const c = input.data;
		return (
			<div>
				<p>Texts: {c.texts.length}</p>
				<p>Files: {c.files.length}</p>
				<p>Image Matrices: {c.image_matrices.length}</p>
				<p>Audio Features: {c.audio_features.length}</p>
				<p>Video Frames: {c.video_frames.length}</p>
			</div>
		);
	}

	return <p>Unknown input</p>;
};

export default NodeInput;
