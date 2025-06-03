export function getInitialNodeData(type?: string): any {
  switch (type) {
    case "text":
      return {
        label: "文本节点",
        text: "",
      };
    case "if":
      return {
        label: "条件判断",
        condition: "",
      };
    case "start":
      return {
        label: "开始节点",
      };
    default:
      return {
        label: `${type} 节点`,
      };
  }
}
