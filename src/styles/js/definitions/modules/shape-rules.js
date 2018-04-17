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
// @element : 'shape';
// 
// @import (multiple) '../../theme.config';
// 
// /*******************************
//               Shape
// *******************************/
// 
// .ui.shape {
//   position: relative;
//   vertical-align: top;
//   display: @display;
//   perspective: @perspective;
//   transition: @transition;
// }
// 
// .ui.shape .sides {
//   transform-style: preserve-3d;
// }
// 
// .ui.shape .side {
//   opacity: 1;
//   width: 100%;
// 
//   margin: @sideMargin !important;
//   backface-visibility: @backfaceVisibility;
// }
// 
// .ui.shape .side {
//   display: none;
// }
// 
// .ui.shape .side * {
//   backface-visibility: visible !important;
// }
// 
// /*******************************
//              Types
// *******************************/
// 
// .ui.cube.shape .side {
//   min-width: @cubeSize;
//   height: @cubeSize;
// 
//   padding: @cubePadding;
// 
//   background-color: @cubeBackground;
//   color: @cubeTextColor;
//   box-shadow: @cubeBoxShadow;
// }
// .ui.cube.shape .side > .content {
//   width: 100%;
//   height: 100%;
//   display: table;
// 
//   text-align: @cubeTextAlign;
//   user-select: text;
// }
// .ui.cube.shape .side > .content > div {
//   display: table-cell;
//   vertical-align: middle;
//   font-size: @cubeFontSize;
// }
// 
// /*******************************
//           Variations
// *******************************/
// 
// .ui.text.shape.animating .sides {
//   position: static;
// }
// .ui.text.shape .side {
//   white-space: nowrap;
// }
// .ui.text.shape .side > * {
//   white-space: normal;
// }
// 
// 
// /*******************************
//              States
// *******************************/
// 
// /*--------------
//     Loading
// ---------------*/
// 
// .ui.loading.shape {
//   position: absolute;
//   top: -9999px;
//   left: -9999px;
// }
// 
// 
// /*--------------
//     Animating
// ---------------*/
// 
// .ui.shape .animating.side {
//   position: absolute;
//   top: 0px;
//   left: 0px;
//   display: block;
//   z-index: @animatingZIndex;
// }
// .ui.shape .hidden.side {
//   opacity: @hiddenSideOpacity;
// }
// 
// 
// /*--------------
//       CSS
// ---------------*/
// 
// .ui.shape.animating .sides {
//   position: absolute;
// }
// .ui.shape.animating .sides {
//   transition: @transition;
// }
// .ui.shape.animating .side {
//   transition: @sideTransition;
// }
// 
// /*--------------
//      Active
// ---------------*/
// 
// .ui.shape .active.side {
//   display: block;
// }
// 
// .loadUIOverrides();
// 
