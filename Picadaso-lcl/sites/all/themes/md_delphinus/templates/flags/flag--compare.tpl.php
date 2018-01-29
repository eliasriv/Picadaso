<?php

/**
 * @file
 * Default theme implementation to display a flag link, and a message after the
 * action is carried out.
 *
 * Available variables:
 *
 * - $flag: The flag object itself. You will only need to use it when the
 *   following variables don't suffice.
 * - $flag_name_css: The flag name, with all "_" replaced with "-". For use in
 *   'class' attributes.
 * - $flag_classes: A space-separated list of CSS classes that should be applied
 *   to the link.
 *
 * - $action: The action the link is about to carry out, either "flag" or
 *   "unflag".
 * - $status: The status of the item; either "flagged" or "unflagged".
 * - $entity_id: The id of the entity item.
 *
 * - $link['href']: The path for the flag link.
 * - $link['query']: Array of query string parameters, such as "destination".
 * - $link_href: The URL for the flag link, query string included.
 * - $link_text: The text to show for the link.
 * - $link_title: The title attribute for the link.
 *
 * - $message_text: The long message to show after a flag action has been
 *   carried out.
 * - $message_classes: A space-separated list of CSS classes that should be
 *   applied to
 *   the message.
 * - $after_flagging: This template is called for the link both before and after
 *   being
 *   flagged. If displaying to the user immediately after flagging, this value
 *   will be boolean TRUE. This is usually used in conjunction with immedate
 *   JavaScript-based toggling of flags.
 * - $needs_wrapping_element: Determines whether the flag displays a wrapping
 *   HTML DIV element.
 * - $errors: An array of error messages.
 *
 * Template suggestions available, listed from the most specific template to
 * the least. Drupal will use the most specific template it finds:
 * - flag--name.tpl.php
 * - flag--link-type.tpl.php
 *
 * NOTE: This template spaces out the <span> tags for clarity only. When doing
 * some advanced theming you may have to remove all the whitespace.
 */
?>
<?php if ($link_href): ?>
  <a href="<?php print $link_href; ?>" data-toggle="tooltip" data-placement="top" title="<?php print $link_text; ?>" class="<?php print $flag_classes ?> add_to_compare" rel="nofollow"><?php (strpos($flag_classes, 'unflag-action') !== FALSE) ? print '<i class="fa fa-times"></i>' : print '<i class="fa fa-exchange"></i>'; ?></a>
<?php else: ?>
  <span class="<?php print $flag_classes ?>"><?php print $link_text; ?></span>
<?php endif; ?>
<?php if ($after_flagging): ?>
  <span class="<?php print $message_classes; ?>">
    <?php print $message_text; ?>
  </span>
<?php endif; ?>