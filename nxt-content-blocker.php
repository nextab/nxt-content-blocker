<?php
/**
* Plugin Name: nexTab Content Blocker
* Description: This plugin allows you to block the content of any Gutenberg block (for GDPR purposes).
* Version: 1.0
* Author: nexTab - Oliver Gehrmann
*/

// Enqueue the Gutenberg editor assets
function nxt_content_blocker_enqueue_block_editor_assets() {
	wp_enqueue_script('nxt-content-blocker', plugin_dir_url(__FILE__) . 'js/nxt-content-blocker-script.js', array('wp-blocks','wp-components','wp-compose','wp-editor','wp-element','wp-i18n'), '1.0', true);
}
add_action('enqueue_block_editor_assets', 'nxt_content_blocker_enqueue_block_editor_assets');

// Enqueue the JavaScript for the frontend
function nxt_content_blocker_enqueue_frontend_scripts() {
	wp_enqueue_script('nxt-content-blocker', plugin_dir_url(__FILE__) . 'js/nxt-content-blocker-frontend.js', array(), '1.0', true);
}
add_action('wp_enqueue_scripts', 'nxt_content_blocker_enqueue_frontend_scripts');


// Adjust the rendering of blocks on the frontend
function nxt_content_blocker_render($block_content, $block) {
	if (isset($block['attrs']['isContentBlocked']) && $block['attrs']['isContentBlocked']) {
		// Check both the cookies
		if (
			(isset($_COOKIE['nxt-content-agreement']) && $_COOKIE['nxt-content-agreement'] == 'true') ||
			(isset($_COOKIE['cookie_notice_accepted']) && $_COOKIE['cookie_notice_accepted'] == 'true')
		) {
			return $block_content;
		} else {
			$notice = isset($block['attrs']['blockNotice']) ? $block['attrs']['blockNotice'] : 'Default notice message here.';
			$customClass = isset($block['attrs']['customClass']) ? $block['attrs']['customClass'] : '';
			
			// Store the actual content as a data attribute
			return '<div class="agreement-overlay ' . esc_attr($customClass) . '" data-content="' . esc_attr($block_content) . '">
			<div class="agreement-box">
			<p>' . esc_html($notice) . '</p>
			<button class="et_pb_button agreement-button">Zustimmen</button>
			</div>
			</div>';
		}
	}
	return $block_content;
}
add_filter('render_block', 'nxt_content_blocker_render', 10, 2);
