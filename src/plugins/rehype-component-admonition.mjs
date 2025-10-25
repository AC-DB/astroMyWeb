/// <reference types="mdast" />
import { h } from "hastscript";

/**
* 创建一个警告组件。
*
* @param {Object} properties - 组件的属性。
* @param {string} [properties.title] - 可选标题。
* @param {('tip'|'note'|'important'|'caution'|'warning')} type - 警告类型。
* @param {import('mdast').RootContent[]} children - 组件的子元素。
* @returns {import('mdast').Parent} 已创建的警告组件。
*/
export function AdmonitionComponent(properties, children, type) {
	if (!Array.isArray(children) || children.length === 0)
		return h(
			"div",
			{ class: "hidden" },
			'Invalid admonition directive. (Admonition directives must be of block type ":::note{name="name"} <content> :::")',
		);

	let label = null;
	if (properties?.["has-directive-label"]) {
		label = children[0]; // The first child is the label
		// biome-ignore lint/style/noParameterAssign: <check later>
		children = children.slice(1);
		label.tagName = "div"; // Change the tag <p> to <div>
	}

	return h("blockquote", { class: `admonition bdm-${type}` }, [
		h("span", { class: "bdm-title" }, label ? label : type.toUpperCase()),
		...children,
	]);
}
