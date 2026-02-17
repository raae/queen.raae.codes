import { visit } from "unist-util-visit";
import { toString } from "hast-util-to-string";

const SHORT_THRESHOLD = 100;

export default function rehypeBlockquoteClass() {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName !== "blockquote") return;

      // Get text content excluding <cite> elements
      const textContent = node.children
        .filter(
          (child) => !(child.type === "element" && child.tagName === "cite"),
        )
        .map((child) => toString(child))
        .join("")
        .trim();

      const className =
        textContent.length <= SHORT_THRESHOLD ? "quote--short" : "quote--long";

      node.properties = node.properties || {};
      const existing = node.properties.className || [];
      node.properties.className = Array.isArray(existing)
        ? [...existing, className]
        : [existing, className];
    });
  };
}
