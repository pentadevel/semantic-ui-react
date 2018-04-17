/**
 * This file began as a direct copy of the less definition file.
 * The original LESS was left above each section as it was ported to JS.
 * This helps to see the logic behind how we could port styles to JS.
 */

// /*******************************
//             Theme
// *******************************/
// 
// @type    : 'view';
// @element : 'ad';
// 
// @import (multiple) '../../theme.config';
// 
// /*******************************
//          Advertisement
// *******************************/
// 
// .ui.ad {
//   display: block;
//   overflow: @overflow;
//   margin: @margin;
// }
// 
// .ui.ad:first-child {
//   margin: 0em;
// }
// 
// .ui.ad:last-child {
//   margin: 0em;
// }
// 
// .ui.ad iframe {
//   margin: 0em;
//   padding: 0em;
//   border: none;
//   overflow: hidden;
// }
// 
// /*--------------
//      Common
// ---------------*/
// 
// /* Leaderboard */
// .ui.leaderboard.ad {
//   width: 728px;
//   height: 90px;
// }
// 
// /* Medium Rectangle */
// .ui[class*="medium rectangle"].ad {
//   width: 300px;
//   height: 250px;
// }
// 
// /* Large Rectangle */
// .ui[class*="large rectangle"].ad {
//   width: 336px;
//   height: 280px;
// }
// /* Half Page */
// .ui[class*="half page"].ad {
//   width: 300px;
//   height: 600px;
// }
// 
// /*--------------
//      Square
// ---------------*/
// 
// /* Square */
// .ui.square.ad {
//   width: 250px;
//   height: 250px;
// }
// 
// /* Small Square */
// .ui[class*="small square"].ad {
//   width: 200px;
//   height: 200px;
// }
// 
// /*--------------
//     Rectangle
// ---------------*/
// 
// /* Small Rectangle */
// .ui[class*="small rectangle"].ad {
//   width: 180px;
//   height: 150px;
// }
// 
// /* Vertical Rectangle */
// .ui[class*="vertical rectangle"].ad {
//   width: 240px;
//   height: 400px;
// }
// 
// /*--------------
//      Button
// ---------------*/
// 
// .ui.button.ad {
//   width: 120px;
//   height: 90px;
// }
// .ui[class*="square button"].ad {
//   width: 125px;
//   height: 125px;
// }
// .ui[class*="small button"].ad {
//   width: 120px;
//   height: 60px;
// }
// 
// /*--------------
//    Skyscrapers
// ---------------*/
// 
// /* Skyscraper */
// .ui.skyscraper.ad {
//   width: 120px;
//   height: 600px;
// }
// 
// /* Wide Skyscraper */
// .ui[class*="wide skyscraper"].ad {
//   width: 160px;
// }
// 
// /*--------------
//      Banners
// ---------------*/
// 
// /* Banner */
// .ui.banner.ad {
//   width: 468px;
//   height: 60px;
// }
// 
// /* Vertical Banner */
// .ui[class*="vertical banner"].ad {
//   width: 120px;
//   height: 240px;
// }
// 
// /* Top Banner */
// .ui[class*="top banner"].ad {
//   width: 930px;
//   height: 180px;
// }
// 
// /* Half Banner */
// .ui[class*="half banner"].ad {
//   width: 234px;
//   height: 60px;
// }
// 
// /*--------------
//     Boards
// ---------------*/
// 
// /* Leaderboard */
// .ui[class*="large leaderboard"].ad {
//   width: 970px;
//   height: 90px;
// }
// 
// /* Billboard */
// .ui.billboard.ad {
//   width: 970px;
//   height: 250px;
// }
// 
// /*--------------
//     Panorama
// ---------------*/
// 
// /* Panorama */
// .ui.panorama.ad {
//   width: 980px;
//   height: 120px;
// }
// 
// /*--------------
//      Netboard
// ---------------*/
// 
// /* Netboard */
// .ui.netboard.ad {
//   width: 580px;
//   height: 400px;
// }
// 
// 
// 
// /*--------------
//      Mobile
// ---------------*/
// 
// /* Large Mobile Banner */
// .ui[class*="large mobile banner"].ad {
//   width: 320px;
//   height: 100px;
// }
// 
// /* Mobile Leaderboard */
// .ui[class*="mobile leaderboard"].ad {
//   width: 320px;
//   height: 50px;
// }
// 
// /*******************************
//              Types
// *******************************/
// 
// /* Mobile Sizes */
// .ui.mobile.ad {
//   display: none;
// }
// 
// @media only screen and (max-width : @largestMobileScreen) {
//   .ui.mobile.ad {
//     display: block;
//   }
// }
// 
// 
// /*******************************
//            Variations
// *******************************/
// 
// .ui.centered.ad {
//   margin-left: auto;
//   margin-right: auto;
// }
// 
// .ui.test.ad {
//   position: relative;
//   background: @testBackground;
// }
// .ui.test.ad:after {
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   width: 100%;
//   text-align: center;
//   transform: translateX(-50%) translateY(-50%);
// 
//   content: @testText;
//   color: @testColor;
//   font-size: @testFontSize;
//   font-weight: @testFontWeight;
// }
// .ui.mobile.test.ad:after {
//   font-size: @testMobileFontSize;
// }
// .ui.test.ad[data-text]:after {
//   content: attr(data-text);
// }
// 
// .loadUIOverrides();
