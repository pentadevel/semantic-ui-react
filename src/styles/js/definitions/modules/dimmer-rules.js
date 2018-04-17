/**
 * This file began as a direct copy of the less definition file.
 * The original LESS was left above each section as it was ported to JS.
 * This helps to see the logic behind how we could port styles to JS.
 */

// /*******************************
//             Theme
// *******************************/
// 
// @type    : 'module';
// @element : 'dimmer';
// 
// @import (multiple) '../../theme.config';
// 
// /*******************************
//             Dimmer
// *******************************/
// 
// .dimmable:not(body) {
//   position: @dimmablePosition;
// }
// 
// .ui.dimmer {
//   display: none;
//   position: @dimmerPosition;
//   top: 0em !important;
//   left: 0em !important;
// 
//   width: 100%;
//   height: 100%;
// 
//   text-align: @textAlign;
//   vertical-align: @verticalAlign;
//   padding: @padding;
// 
//   background-color: @backgroundColor;
//   opacity: @hiddenOpacity;
//   line-height: @lineHeight;
// 
//   animation-fill-mode: both;
//   animation-duration: @duration;
//   transition: @transition;
// 
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
// 
//   user-select: none;
//   will-change: opacity;
//   z-index: @zIndex;
// }
// 
// /* Dimmer Content */
// .ui.dimmer > .content {
//   user-select: text;
//   color: @textColor;
// }
// 
// 
// /* Loose Coupling */
// .ui.segment > .ui.dimmer {
//   border-radius: inherit !important;
// }
// 
// /* Scrollbars */
// .addScrollbars() when (@useCustomScrollbars) {
//   .ui.dimmer:not(.inverted)::-webkit-scrollbar-track {
//     background: @trackInvertedBackground;
//   }
//   .ui.dimmer:not(.inverted)::-webkit-scrollbar-thumb {
//     background: @thumbInvertedBackground;
//   }
//   .ui.dimmer:not(.inverted)::-webkit-scrollbar-thumb:window-inactive {
//     background: @thumbInvertedInactiveBackground;
//   }
//   .ui.dimmer:not(.inverted)::-webkit-scrollbar-thumb:hover {
//     background: @thumbInvertedHoverBackground;
//   }
// }
// .addScrollbars();
// 
// /*******************************
//             States
// *******************************/
// 
// /* Animating */
// .animating.dimmable:not(body),
// .dimmed.dimmable:not(body) {
//   overflow: @overflow;
// }
// 
// /* Animating / Active / Visible */
// .dimmed.dimmable > .ui.animating.dimmer,
// .dimmed.dimmable > .ui.visible.dimmer,
// .ui.active.dimmer {
//   display: flex;
//   opacity: @visibleOpacity;
// }
// 
// /* Disabled */
// .ui.disabled.dimmer {
//   width: 0 !important;
//   height: 0 !important;
// }
// 
// 
// /*******************************
//            Variations
// *******************************/
// 
// /*--------------
//     Alignment
// ---------------*/
// 
// .ui[class*="top aligned"].dimmer {
//   justify-content: flex-start;
// }
// .ui[class*="bottom aligned"].dimmer {
//   justify-content: flex-end;
// }
// 
// /*--------------
//       Page
// ---------------*/
// 
// .ui.page.dimmer {
//   position: @pageDimmerPosition;
//   transform-style: @transformStyle;
//   perspective: @perspective;
//   transform-origin: center center;
// }
// 
// body.animating.in.dimmable,
// body.dimmed.dimmable {
//   overflow: hidden;
// }
// 
// body.dimmable > .dimmer {
//   position: fixed;
// }
// 
// /*--------------
//     Blurring
// ---------------*/
// 
// .blurring.dimmable > :not(.dimmer) {
//   filter: @blurredStartFilter;
//   transition: @blurredTransition;
// }
// .blurring.dimmed.dimmable > :not(.dimmer) {
//   filter: @blurredEndFilter;
// }
// 
// /* Dimmer Color */
// .blurring.dimmable > .dimmer {
//   background-color: @blurredBackgroundColor;
// }
// .blurring.dimmable > .inverted.dimmer {
//   background-color: @blurredInvertedBackgroundColor;
// }
// 
// /*--------------
//     Aligned
// ---------------*/
// 
// .ui.dimmer > .top.aligned.content > * {
//   vertical-align: top;
// }
// .ui.dimmer > .bottom.aligned.content > * {
//   vertical-align: bottom;
// }
// 
// /*--------------
//     Inverted
// ---------------*/
// 
// .ui.inverted.dimmer {
//   background-color: @invertedBackgroundColor;
// }
// .ui.inverted.dimmer > .content > * {
//   color: @invertedTextColor;
// }
// 
// /*--------------
//      Simple
// ---------------*/
// 
// /* Displays without javascript */
// .ui.simple.dimmer {
//   display: block;
//   overflow: hidden;
//   opacity: 1;
//   width: 0%;
//   height: 0%;
//   z-index: -100;
//   background-color: @simpleStartBackgroundColor;
// }
// .dimmed.dimmable > .ui.simple.dimmer {
//   overflow: visible;
//   opacity: 1;
//   width: 100%;
//   height: 100%;
//   background-color: @simpleEndBackgroundColor;
//   z-index: @simpleZIndex;
// }
// 
// .ui.simple.inverted.dimmer {
//   background-color: @simpleInvertedStartBackgroundColor;
// }
// .dimmed.dimmable > .ui.simple.inverted.dimmer {
//   background-color: @simpleInvertedEndBackgroundColor;
// }
// 
// .loadUIOverrides();
// 
