# nxt-content-blocker
An extension for the Gutenberg editor for WordPress. It allows you on a Gutenberg block basis to block the respective contents and only render them if the user agrees to it (great for GDPR purposes; you can hide Google Maps, YouTube videos, etc.)

# Installation
- Download the repository as a .zip file and save it on your local computer.
- Go to your WordPress installation, select "Plugins" -> "Add New" ->  "Upload Plugin"
- Upload the file you saved and activate the plugin

# How to use
Once the plugin has been activated, in the settings of any given Gutenberg block, you'll find a new section "Content Blocker Settings". If you toggle the button to "Block Content", whatever is inside the block will no longer render on the frontend unless the user explicitly opts in to see contents from third party sources.

You can define a "Notice Text" and also assign "Additional Classes". This should help you with the styling of the content blocker preview.

Here is some CSS code to get you started when it comes to styling the box that will be displayed instead of the Gutenberg block:

``` CSS
.agreement-box {
  background: #fff;
  border-radius: 0;
  box-shadow: 0 0 6px 2px #0001;
  padding: 1.5rem;
  text-align: center;
}
```

# FAQ
## Does this mean I no longer need a Cookie Notice?
No. In fact, the plugin also sets a cookie to remember the choice of a website visitor that wanted to see the contents that were blocked by the plugin.

## Does this plugin work together with any Cookie Notice plugin?
Yes. It is compatible with "Cookie Notice & Compliance for GDPR / CCPA" by Hu-manity.co. It was the first cookie notice plugin we used when the GDPR came into effect and while we don't think it's the best cookie notice plugin out there, it does its job relatively reliably and together with this content blocker, it can completely replace premium solutions that tend to put you down 50 EUR per year (or more).
Just make sure to hide the "x" button in the cookie notice with CSS as the default behavior of the plugin is that a website visitor will *agree* to the use of cookies (and load third party scripts) when someone clicks on the "x", which is clearly not in line with GDPR regulations.

``` CSS
#cn-close-notice {
    display: none;
}
```

## Is there a video explaining this plugin?
Yes. It's in German, though. It will go live on our YouTube channel soon.
