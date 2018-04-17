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
// @element : 'rating';
// 
// @import (multiple) '../../theme.config';
// 
// /*******************************
//            Rating
// *******************************/
// 
// .ui.rating {
//   display: inline-flex;
//   white-space: @whiteSpace;
//   vertical-align: @verticalAlign;
// }
// .ui.rating:last-child {
//   margin-right: 0em;
// }
// 
// /* Icon */
// .ui.rating .icon {
//   padding: 0em;
//   margin: 0em;
//   text-align: center;
//   font-weight: @normal;
//   font-style: normal;
//   flex: 1 0 auto;
//   cursor: @iconCursor;
//   width: @iconWidth;
//   height: @iconHeight;
//   transition: @iconTransition;
// }
// 
// 
// /*******************************
//              Types
// *******************************/
// 
// 
// /*-------------------
//       Standard
// --------------------*/
// 
// /* Inactive Icon */
// .ui.rating .icon {
//   background: @inactiveBackground;
//   color: @inactiveColor;
// }
// 
// /* Active Icon */
// .ui.rating .active.icon {
//   background: @activeBackground;
//   color: @activeColor;
// }
// 
// /* Selected Icon */
// .ui.rating .icon.selected,
// .ui.rating .icon.selected.active {
//   background: @selectedBackground;
//   color: @selectedColor;
// }
// 
// 
// /*-------------------
//         Star
// --------------------*/
// 
// /* Inactive */
// .ui.star.rating .icon {
//   width: @starIconWidth;
//   height: @starIconHeight;
//   background: @starInactiveBackground;
//   color: @starInactiveColor;
//   text-shadow: @starInactiveTextShadow;
// }
// 
// /* Active Star */
// .ui.star.rating .active.icon {
//   background: @starActiveBackground !important;
//   color: @starActiveColor !important;
//   text-shadow: @starActiveTextShadow !important;
// }
// 
// /* Selected Star */
// .ui.star.rating .icon.selected,
// .ui.star.rating .icon.selected.active {
//   background: @starSelectedBackground !important;
//   color: @starSelectedColor !important;
//   text-shadow: @starSelectedTextShadow !important;
// }
// 
// 
// /*-------------------
//         Heart
// --------------------*/
// 
// .ui.heart.rating .icon {
//   width: @heartIconWidth;
//   height: @heartIconHeight;
//   background: @heartInactiveBackground;
//   color: @heartInactiveColor;
//   text-shadow: @heartInactiveTextShadow !important;
// }
// 
// /* Active Heart */
// .ui.heart.rating .active.icon {
//   background: @heartActiveBackground !important;
//   color: @heartActiveColor !important;
//   text-shadow: @heartActiveTextShadow !important;
// }
// 
// /* Selected Heart */
// .ui.heart.rating .icon.selected,
// .ui.heart.rating .icon.selected.active {
//   background: @heartSelectedBackground !important;
//   color: @heartSelectedColor !important;
//   text-shadow: @heartSelectedTextShadow !important;
// }
// 
// 
// /*******************************
//              States
// *******************************/
// 
// /*-------------------
//        Disabled
// --------------------*/
// 
// /* disabled rating */
// .ui.disabled.rating .icon {
//   cursor: default;
// }
// 
// 
// /*-------------------
//    User Interactive
// --------------------*/
// 
// /* Selected Rating */
// .ui.rating.selected .active.icon {
//   opacity: @interactiveActiveIconOpacity;
// }
// .ui.rating.selected .icon.selected,
// .ui.rating .icon.selected {
//   opacity: @interactiveSelectedIconOpacity;
// }
// 
// 
// 
// /*******************************
//           Variations
// *******************************/
// 
// .ui.mini.rating {
//   font-size: @mini;
// }
// .ui.tiny.rating {
//   font-size: @tiny;
// }
// .ui.small.rating {
//   font-size: @small;
// }
// .ui.rating {
//   font-size: @medium;
// }
// .ui.large.rating {
//   font-size: @large;
// }
// .ui.huge.rating {
//   font-size: @huge;
// }
// .ui.massive.rating {
//   font-size: @massive;
// }
// 
// 
// .loadUIOverrides();
// 
