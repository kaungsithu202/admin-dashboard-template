import { z } from "zod";

export const MAX_FILE_SIZE = 500 * 1024; // 500KB

export const imageFileSchema = z
	.instanceof(File)
	.refine((file) => file.size <= MAX_FILE_SIZE, {
		message: "Max file size is 500KB",
	})
	.optional()
	.nullable();
