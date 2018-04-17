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
// @element : 'comment';
// 
// @import (multiple) '../../theme.config';
// 
// /*******************************
//             Standard
// *******************************/
// 
// 
// /*--------------
//     Comments
// ---------------*/
// 
// .ui.comments {
//   margin: @margin;
//   max-width: @maxWidth;
// }
// 
// .ui.comments:first-child {
//   margin-top: 0em;
// }
// .ui.comments:last-child {
//   margin-bottom: 0em;
// }
// 
// /*--------------
//      Comment
// ---------------*/
// 
// .ui.comments .comment {
//   position: relative;
//   background: @commentBackground;
//   margin: @commentMargin;
//   padding: @commentPadding;
//   border: @commentBorder;
//   border-top: @commentDivider;
//   line-height: @commentLineHeight;
// }
// .ui.comments .comment:first-child {
//   margin-top: @firstCommentMargin;
//   padding-top: @firstCommentPadding;
// }
// 
// 
// /*--------------------
//     Nested Comments
// ---------------------*/
// 
// .ui.comments .comment .comments {
//   margin: @nestedCommentsMargin;
//   padding: @nestedCommentsPadding;
// }
// .ui.comments .comment .comments:before{
//   position: absolute;
//   top: 0px;
//   left: 0px;
// }
// .ui.comments .comment .comments .comment {
//   border: @nestedCommentBorder;
//   border-top: @nestedCommentDivider;
//   background: @nestedCommentBackground;
// }
// 
// /*--------------
//      Avatar
// ---------------*/
// 
// .ui.comments .comment .avatar {
//   display: @avatarDisplay;
//   width: @avatarWidth;
//   height: @avatarHeight;
//   float: @avatarFloat;
//   margin: @avatarMargin;
// }
// .ui.comments .comment img.avatar,
// .ui.comments .comment .avatar img {
//   display: block;
//   margin: 0em auto;
//   width: 100%;
//   height: 100%;
//   border-radius: @avatarBorderRadius;
// }
// 
// /*--------------
//      Content
// ---------------*/
// 
// .ui.comments .comment > .content {
//   display: block;
// }
// /* If there is an avatar move content over */
// .ui.comments .comment > .avatar ~ .content {
//   margin-left: @contentMargin;
// }
// 
// /*--------------
//      Author
// ---------------*/
// 
// .ui.comments .comment .author {
//   font-size: @authorFontSize;
//   color: @authorColor;
//   font-weight: @authorFontWeight;
// }
// .ui.comments .comment a.author {
//   cursor: pointer;
// }
// .ui.comments .comment a.author:hover {
//   color: @authorHoverColor;
// }
// 
// /*--------------
//      Metadata
// ---------------*/
// 
// .ui.comments .comment .metadata {
//   display: @metadataDisplay;
//   margin-left: @metadataSpacing;
//   color: @metadataColor;
//   font-size: @metadataFontSize;
// }
// .ui.comments .comment .metadata > * {
//   display: inline-block;
//   margin: 0em @metadataContentSpacing 0em 0em;
// }
// .ui.comments .comment .metadata > :last-child {
//   margin-right: 0em;
// }
// 
// /*--------------------
//      Comment Text
// ---------------------*/
// 
// .ui.comments .comment .text {
//   margin: @textMargin;
//   font-size: @textFontSize;
//   word-wrap: @textWordWrap;
//   color: @textColor;
//   line-height: @textLineHeight;
// }
// 
// 
// /*--------------------
//      User Actions
// ---------------------*/
// 
// .ui.comments .comment .actions {
//   font-size: @actionFontSize;
// }
// .ui.comments .comment .actions a {
//   cursor: pointer;
//   display: inline-block;
//   margin: 0em @actionContentDistance 0em 0em;
//   color: @actionLinkColor;
// }
// .ui.comments .comment .actions a:last-child {
//   margin-right: 0em;
// }
// .ui.comments .comment .actions a.active,
// .ui.comments .comment .actions a:hover {
//   color: @actionLinkHoverColor;
// }
// 
// /*--------------------
//       Reply Form
// ---------------------*/
// 
// .ui.comments > .reply.form {
//   margin-top: @replyDistance;
// }
// .ui.comments .comment .reply.form {
//   width: 100%;
//   margin-top: @commentReplyDistance;
// }
// .ui.comments .reply.form textarea {
//   font-size: @replyFontSize;
//   height: @replyHeight;
// }
// 
// /*******************************
//             State
// *******************************/
// 
// .ui.collapsed.comments,
// .ui.comments .collapsed.comments,
// .ui.comments .collapsed.comment {
//   display: none;
// }
// 
// 
// /*******************************
//            Variations
// *******************************/
// 
// /*--------------------
//         Threaded
// ---------------------*/
// 
// .ui.threaded.comments .comment .comments {
//   margin: @threadedCommentMargin;
//   padding: @threadedCommentPadding;
//   box-shadow: @threadedCommentBoxShadow;
// }
// 
// /*--------------------
//         Minimal
// ---------------------*/
// 
// .ui.minimal.comments .comment .actions {
//   opacity: 0;
//   position: @minimalActionPosition;
//   top: @minimalActionTop;
//   right: @minimalActionRight;
//   left: @minimalActionLeft;
//   transition: @minimalTransition;
//   transition-delay: @minimalTransitionDelay;
// }
// .ui.minimal.comments .comment > .content:hover > .actions {
//   opacity: 1;
// }
// 
// 
// /*-------------------
//         Sizes
// --------------------*/
// 
// .ui.mini.comments {
//   font-size: @mini;
// }
// .ui.tiny.comments {
//   font-size: @tiny;
// }
// .ui.small.comments {
//   font-size: @small;
// }
// .ui.comments {
//   font-size: @medium;
// }
// .ui.large.comments {
//   font-size: @large;
// }
// .ui.big.comments {
//   font-size: @big;
// }
// .ui.huge.comments {
//   font-size: @huge;
// }
// .ui.massive.comments {
//   font-size: @massive;
// }
// 
// 
// .loadUIOverrides();
// 
