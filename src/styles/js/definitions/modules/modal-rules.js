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
// @element : 'modal';
// 
// @import (multiple) '../../theme.config';
// 
// /*******************************
//              Modal
// *******************************/
// 
// .ui.modal {
//   display: none;
//   z-index: @zIndex;
//   text-align: left;
// 
//   background: @background;
//   border: @border;
//   box-shadow: @boxShadow;
//   transform-origin: @transformOrigin;
// 
//   flex: 0 0 auto;
// 
//   border-radius: @borderRadius;
//   user-select: text;
//   will-change: top, left, margin, transform, opacity;
// }
// 
// .ui.modal > :first-child:not(.icon),
// .ui.modal > .icon:first-child + * {
//   border-top-left-radius: @borderRadius;
//   border-top-right-radius: @borderRadius;
// }
// 
// .ui.modal > :last-child {
//   border-bottom-left-radius: @borderRadius;
//   border-bottom-right-radius: @borderRadius;
// }
// 
// /*******************************
//             Content
// *******************************/
// 
// /*--------------
//      Close
// ---------------*/
// 
// .ui.modal > .close {
//   cursor: pointer;
//   position: absolute;
//   top: @closeTop;
//   right: @closeRight;
//   z-index: 1;
// 
//   opacity: @closeOpacity;
//   font-size: @closeSize;
//   color: @closeColor;
// 
//   width: @closeHitbox;
//   height: @closeHitbox;
//   padding: @closePadding;
// }
// .ui.modal > .close:hover {
//   opacity: 1;
// }
// 
// /*--------------
//      Header
// ---------------*/
// 
// .ui.modal > .header {
//   display: block;
//   font-family: @headerFontFamily;
//   background: @headerBackground;
//   margin: @headerMargin;
//   padding: @headerPadding;
//   box-shadow: @headerBoxShadow;
// 
//   color: @headerColor;
//   border-bottom: @headerBorder;
// }
// .ui.modal > .header:not(.ui) {
//   font-size: @headerFontSize;
//   line-height: @headerLineHeight;
//   font-weight: @headerFontWeight;
// }
// 
// /*--------------
//      Content
// ---------------*/
// 
// .ui.modal > .content {
//   display: block;
//   width: 100%;
//   font-size: @contentFontSize;
//   line-height: @contentLineHeight;
//   padding: @contentPadding;
//   background: @contentBackground;
// }
// .ui.modal > .image.content {
//   display: flex;
//   flex-direction: row;
// }
// 
// /* Image */
// .ui.modal > .content > .image {
//   display: block;
//   flex: 0 1 auto;
//   width: @imageWidth;
//   align-self: @imageVerticalAlign;
// }
// .ui.modal > [class*="top aligned"] {
//   align-self: top;
// }
// .ui.modal > [class*="middle aligned"] {
//   align-self: middle;
// }
// .ui.modal > [class*="stretched"] {
//   align-self: stretch;
// }
// 
// /* Description */
// .ui.modal > .content > .description {
//   display: block;
//   flex: 1 0 auto;
//   min-width: 0px;
//   align-self: @descriptionVerticalAlign;
// }
// 
// .ui.modal > .content > .icon + .description,
// .ui.modal > .content > .image + .description {
//   flex: 0 1 auto;
//   min-width: @descriptionMinWidth;
//   width: @descriptionWidth;
//   padding-left: @descriptionDistance;
// }
// 
// /*rtl:ignore*/
// .ui.modal > .content > .image > i.icon {
//   margin: 0em;
//   opacity: 1;
//   width: auto;
//   line-height: 1;
//   font-size: @imageIconSize;
// }
// 
// /*--------------
//      Actions
// ---------------*/
// 
// .ui.modal > .actions {
//   background: @actionBackground;
//   padding: @actionPadding;
//   border-top: @actionBorder;
//   text-align: @actionAlign;
// }
// .ui.modal .actions > .button {
//   margin-left: @buttonDistance;
// }
// 
// /*-------------------
//        Responsive
// --------------------*/
// 
// /* Modal Width */
// @media only screen and (max-width : @largestMobileScreen) {
//   .ui.modal {
//     width: @mobileWidth;
//     margin: @mobileMargin;
//   }
// }
// @media only screen and (min-width : @tabletBreakpoint) {
//   .ui.modal {
//     width: @tabletWidth;
//     margin: @tabletMargin;
//   }
// }
// @media only screen and (min-width : @computerBreakpoint) {
//   .ui.modal {
//     width: @computerWidth;
//     margin: @computerMargin;
//   }
// }
// @media only screen and (min-width : @largeMonitorBreakpoint) {
//   .ui.modal {
//     width: @largeMonitorWidth;
//     margin: @largeMonitorMargin;
//   }
// }
// @media only screen and (min-width : @widescreenMonitorBreakpoint) {
//   .ui.modal {
//     width: @widescreenMonitorWidth;
//     margin: @widescreenMonitorMargin;
//   }
// }
// 
// /* Tablet and Mobile */
// @media only screen and (max-width : @largestTabletScreen) {
//   .ui.modal > .header {
//     padding-right: @closeHitbox;
//   }
//   .ui.modal > .close {
//     top: @innerCloseTop;
//     right: @innerCloseRight;
//     color: @innerCloseColor;
//   }
// }
// 
// /* Mobile */
// @media only screen and (max-width : @largestMobileScreen) {
// 
//   .ui.modal > .header {
//     padding: @mobileHeaderPadding !important;
//     padding-right: @closeHitbox !important;
//   }
//   .ui.modal > .content {
//     display: block;
//     padding: @mobileContentPadding !important;
//   }
//   .ui.modal > .close {
//     top: @mobileCloseTop !important;
//     right: @mobileCloseRight !important;
//   }
// 
//   /*rtl:ignore*/
//   .ui.modal .image.content {
//     flex-direction: column;
//   }
//   .ui.modal .content > .image {
//     display: block;
//     max-width: 100%;
//     margin: 0em auto !important;
//     text-align: center;
//     padding: @mobileImagePadding !important;
//   }
//   .ui.modal > .content > .image > i.icon {
//     font-size: @mobileImageIconSize;
//     text-align: center;
//   }
// 
//   /*rtl:ignore*/
//   .ui.modal .content > .description {
//     display: block;
//     width: 100% !important;
//     margin: 0em !important;
//     padding: @mobileDescriptionPadding !important;
//     box-shadow: none;
//   }
// 
//   /* Let Buttons Stack */
//   .ui.modal > .actions {
//     padding: @mobileActionPadding !important;
//   }
//   .ui.modal .actions > .buttons,
//   .ui.modal .actions > .button {
//     margin-bottom: @mobileButtonDistance;
//   }
// }
// 
// /*--------------
//     Coupling
// ---------------*/
// 
// .ui.inverted.dimmer > .ui.modal {
//   box-shadow: @invertedBoxShadow;
// }
// 
// /*******************************
//              Types
// *******************************/
// 
// .ui.basic.modal {
//   background-color: transparent;
//   border: none;
//   border-radius: 0em;
//   box-shadow: none !important;
//   color: @basicModalColor;
// }
// .ui.basic.modal > .header,
// .ui.basic.modal > .content,
// .ui.basic.modal > .actions {
//   background-color: transparent;
// }
// .ui.basic.modal > .header {
//   color: @basicModalHeaderColor;
// }
// .ui.basic.modal > .close {
//   top: @basicModalCloseTop;
//   right: @basicModalCloseRight;
// }
// 
// .ui.inverted.dimmer > .basic.modal {
//   color: @basicInvertedModalColor;
// }
// .ui.inverted.dimmer > .ui.basic.modal > .header {
//   color: @basicInvertedModalHeaderColor;
// }
// 
// /* Tablet and Mobile */
// @media only screen and (max-width : @largestTabletScreen) {
//   .ui.basic.modal > .close {
//     color: @basicInnerCloseColor;
//   }
// }
// 
// 
// /*******************************
//              States
// *******************************/
// 
// .ui.loading.modal {
//   display: block;
//   visibility: hidden;
//   z-index: @loadingZIndex;
// }
// 
// .ui.active.modal {
//   display: block;
// }
// 
// /*******************************
//            Variations
// *******************************/
// 
// /*--------------
//    Top Aligned
// ---------------*/
// 
// /* Top Aligned Modal */
// .modals.dimmer[class*="top aligned"] .modal {
//   margin: @topAlignedMargin auto;
// }
// 
// /*--------------
//     Scrolling
// ---------------*/
// 
// /* Scrolling Dimmer */
// .scrolling.dimmable.dimmed {
//   overflow: hidden;
// }
// .scrolling.dimmable > .dimmer {
//   justify-content: flex-start;
// }
// .scrolling.dimmable.dimmed > .dimmer {
//   overflow: auto;
//   -webkit-overflow-scrolling: touch;
// }
// .scrolling.dimmable > .dimmer {
//   position: fixed;
// }
// .modals.dimmer .ui.scrolling.modal {
//   margin: @scrollingMargin auto !important;
// }
// 
// /* Undetached Scrolling */
// .scrolling.undetached.dimmable.dimmed {
//   overflow: auto;
//   -webkit-overflow-scrolling: touch;
// }
// .scrolling.undetached.dimmable.dimmed > .dimmer {
//   overflow: hidden;
// }
// .scrolling.undetached.dimmable .ui.scrolling.modal {
//   position: absolute;
//   left: 50%;
//   margin-top: @scrollingMargin !important;
// }
// 
// /* Scrolling Content */
// .ui.modal .scrolling.content {
//   max-height: @scrollingContentMaxHeight;
//   overflow: auto;
// }
// 
// /*--------------
//    Full Screen
// ---------------*/
// 
// .ui.fullscreen.modal {
//   width: @fullScreenWidth !important;
//   left: @fullScreenOffset !important;
//   margin: @fullScreenMargin;
// }
// .ui.fullscreen.scrolling.modal {
//   left: 0em !important;
// }
// .ui.fullscreen.modal > .header {
//   padding-right: @closeHitbox;
// }
// .ui.fullscreen.modal > .close {
//   top: @innerCloseTop;
//   right: @innerCloseRight;
//   color: @innerCloseColor;
// }
// 
// 
// /*--------------
//       Size
// ---------------*/
// 
// .ui.modal {
//   font-size: @medium;
// }
// 
// /* Mini */
// .ui.mini.modal > .header:not(.ui) {
//   font-size: @miniHeaderSize;
// }
// 
// /* Mini Modal Width */
// @media only screen and (max-width : @largestMobileScreen) {
//   .ui.mini.modal {
//     width: @miniMobileWidth;
//     margin: @miniMobileMargin;
//   }
// }
// @media only screen and (min-width : @tabletBreakpoint) {
//   .ui.mini.modal {
//     width: @miniTabletWidth;
//     margin: @miniTabletMargin;
//   }
// }
// @media only screen and (min-width : @computerBreakpoint) {
//   .ui.mini.modal {
//     width: @miniComputerWidth;
//     margin: @miniComputerMargin;
//   }
// }
// @media only screen and (min-width : @largeMonitorBreakpoint) {
//   .ui.mini.modal {
//     width: @miniLargeMonitorWidth;
//     margin: @miniLargeMonitorMargin;
//   }
// }
// @media only screen and (min-width : @widescreenMonitorBreakpoint) {
//   .ui.mini.modal {
//     width: @miniWidescreenMonitorWidth;
//     margin: @miniWidescreenMonitorMargin;
//   }
// }
// 
// /* mini */
// .ui.small.modal > .header:not(.ui) {
//   font-size: @miniHeaderSize;
// }
// 
// /* Tiny Modal Width */
// @media only screen and (max-width : @largestMobileScreen) {
//   .ui.tiny.modal {
//     width: @tinyMobileWidth;
//     margin: @tinyMobileMargin;
//   }
// }
// @media only screen and (min-width : @tabletBreakpoint) {
//   .ui.tiny.modal {
//     width: @tinyTabletWidth;
//     margin: @tinyTabletMargin;
//   }
// }
// @media only screen and (min-width : @computerBreakpoint) {
//   .ui.tiny.modal {
//     width: @tinyComputerWidth;
//     margin: @tinyComputerMargin;
//   }
// }
// @media only screen and (min-width : @largeMonitorBreakpoint) {
//   .ui.tiny.modal {
//     width: @tinyLargeMonitorWidth;
//     margin: @tinyLargeMonitorMargin;
//   }
// }
// @media only screen and (min-width : @widescreenMonitorBreakpoint) {
//   .ui.tiny.modal {
//     width: @tinyWidescreenMonitorWidth;
//     margin: @tinyWidescreenMonitorMargin;
//   }
// }
// 
// /* Small */
// .ui.small.modal > .header:not(.ui) {
//   font-size: @smallHeaderSize;
// }
// 
// /* Small Modal Width */
// @media only screen and (max-width : @largestMobileScreen) {
//   .ui.small.modal {
//     width: @smallMobileWidth;
//     margin: @smallMobileMargin;
//   }
// }
// @media only screen and (min-width : @tabletBreakpoint) {
//   .ui.small.modal {
//     width: @smallTabletWidth;
//     margin: @smallTabletMargin;
//   }
// }
// @media only screen and (min-width : @computerBreakpoint) {
//   .ui.small.modal {
//     width: @smallComputerWidth;
//     margin: @smallComputerMargin;
//   }
// }
// @media only screen and (min-width : @largeMonitorBreakpoint) {
//   .ui.small.modal {
//     width: @smallLargeMonitorWidth;
//     margin: @smallLargeMonitorMargin;
//   }
// }
// @media only screen and (min-width : @widescreenMonitorBreakpoint) {
//   .ui.small.modal {
//     width: @smallWidescreenMonitorWidth;
//     margin: @smallWidescreenMonitorMargin;
//   }
// }
// 
// /* Large Modal Width */
// .ui.large.modal > .header {
//   font-size: @largeHeaderSize;
// }
// @media only screen and (max-width : @largestMobileScreen) {
//   .ui.large.modal {
//     width: @largeMobileWidth;
//     margin: @largeMobileMargin;
//   }
// }
// @media only screen and (min-width : @tabletBreakpoint) {
//   .ui.large.modal {
//     width: @largeTabletWidth;
//     margin: @largeTabletMargin;
//   }
// }
// @media only screen and (min-width : @computerBreakpoint) {
//   .ui.large.modal {
//     width: @largeComputerWidth;
//     margin: @largeComputerMargin;
//   }
// }
// @media only screen and (min-width : @largeMonitorBreakpoint) {
//   .ui.large.modal {
//     width: @largeLargeMonitorWidth;
//     margin: @largeLargeMonitorMargin;
//   }
// }
// @media only screen and (min-width : @widescreenMonitorBreakpoint) {
//   .ui.large.modal {
//     width: @largeWidescreenMonitorWidth;
//     margin: @largeWidescreenMonitorMargin;
//   }
// }
// 
// 
// .loadUIOverrides();
// 
