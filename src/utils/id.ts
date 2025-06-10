import { nanoid } from "nanoid";

/**
 * 创建一个唯一的节点 ID（适用于 React Flow）
 * @param length 可选，自定义 ID 长度，默认 8
 * @returns 唯一字符串 ID
 */
export function createNanoId(length = 8): string {
	return nanoid(length);
}

export function createNodeId(length = 8): string {
	return `node-${nanoid(length)}`;
}
