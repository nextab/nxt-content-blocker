const { createHigherOrderComponent } = wp.compose;
const { Fragment, createElement } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, ToggleControl, TextControl } = wp.components;

const withInspectorControls = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		const { attributes, setAttributes } = props;
		const { isContentBlocked, blockNotice, customClass } = attributes;
		
		return createElement(
			Fragment,
			{},
			createElement(BlockEdit, props),
			createElement(
				InspectorControls,
				{},
				createElement(
					PanelBody,
					{ title: "Content Blocker Settings" },
					createElement(ToggleControl, {
						label: "Block Content",
						checked: isContentBlocked,
						onChange: (newValue) => setAttributes({ isContentBlocked: newValue })
					}),
					isContentBlocked && createElement(
						Fragment,
						{},
						createElement(TextControl, {
							label: "Notice Text",
							value: blockNotice || '',
							onChange: (newNotice) => setAttributes({ blockNotice: newNotice })
						}),
						createElement(TextControl, {
							label: "Additional Classes",
							value: customClass || '',
							onChange: (newClass) => setAttributes({ customClass: newClass })
						})
					)
				)
			)
		);
	};
}, 'withInspectorControls');

wp.hooks.addFilter('editor.BlockEdit', 'nxt-extensions/nxt-content-blocker', withInspectorControls);

// Add custom attributes to all blocks
function addCustomAttributes(settings, name) {
	if (!settings.attributes) {
		settings.attributes = {};
	}
	
	settings.attributes.isContentBlocked = {
		type: 'boolean',
		default: false
	};
	
	settings.attributes.blockNotice = {
		type: 'string',
		default: ''
	};
	
	settings.attributes.customClass = {
		type: 'string',
		default: ''
	};
	
	return settings;
}

wp.hooks.addFilter('blocks.registerBlockType', 'nxt-extensions/add-custom-attributes', addCustomAttributes);
