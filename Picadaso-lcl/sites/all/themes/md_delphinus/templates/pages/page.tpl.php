<div class="page-loading-wrapper">
    <div class="progress-bar-loading">
        <div class="back-loading progress-bar-inner">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
                <path d="M3.7,12h10.6l15.1,54.6c0.4,1.6,1.9,2.7,3.6,2.7h46.4c1.5,0,2.8-0.9,3.4-2.2l16.9-38.8c0.5-1.2,0.4-2.5-0.3-3.5
                    c-0.7-1-1.8-1.7-3.1-1.7H45c-2,0-3.7,1.7-3.7,3.7s1.7,3.7,3.7,3.7h45.6L76.9,62H35.8L20.7,7.3c-0.4-1.6-1.9-2.7-3.6-2.7H3.7
                    C1.7,4.6,0,6.3,0,8.3S1.7,12,3.7,12z"/>
                <path d="M29.5,95.4c4.6,0,8.4-3.8,8.4-8.4s-3.8-8.4-8.4-8.4s-8.4,3.8-8.4,8.4C21.1,91.6,24.8,95.4,29.5,95.4z"/>
                <path d="M81.9,95.4c0.2,0,0.4,0,0.6,0c2.2-0.2,4.3-1.2,5.7-2.9c1.5-1.7,2.2-3.8,2-6.1c-0.3-4.6-4.3-8.1-8.9-7.8s-8.1,4.4-7.8,8.9
                    C73.9,91.9,77.5,95.4,81.9,95.4z"/>
            </svg>
        </div>
        <div class="front-loading progress-bar-inner">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
                <path d="M3.7,12h10.6l15.1,54.6c0.4,1.6,1.9,2.7,3.6,2.7h46.4c1.5,0,2.8-0.9,3.4-2.2l16.9-38.8c0.5-1.2,0.4-2.5-0.3-3.5
                    c-0.7-1-1.8-1.7-3.1-1.7H45c-2,0-3.7,1.7-3.7,3.7s1.7,3.7,3.7,3.7h45.6L76.9,62H35.8L20.7,7.3c-0.4-1.6-1.9-2.7-3.6-2.7H3.7
                    C1.7,4.6,0,6.3,0,8.3S1.7,12,3.7,12z"/>
                <path d="M29.5,95.4c4.6,0,8.4-3.8,8.4-8.4s-3.8-8.4-8.4-8.4s-8.4,3.8-8.4,8.4C21.1,91.6,24.8,95.4,29.5,95.4z"/>
                <path d="M81.9,95.4c0.2,0,0.4,0,0.6,0c2.2-0.2,4.3-1.2,5.7-2.9c1.5-1.7,2.2-3.8,2-6.1c-0.3-4.6-4.3-8.1-8.9-7.8s-8.1,4.4-7.8,8.9
                    C73.9,91.9,77.5,95.4,81.9,95.4z"/>
            </svg>
        </div>
        <div class="progress-bar-number">0%</div>
    </div>
</div>

<div id="search-fullwidth" class="mfp-hide mfp-with-anim">
  <?php
		$block = module_invoke('search', 'block_view', 'form');
		print render($block['content']);
	?>
</div><!-- #search-fullwidth -->

<?php if(isset($awecontent)) : ?>
<div id="page-wrapper">
    <div id="page">
      <?php if($page['header']):?>
        <?php print render($page['header']);?>
      <?php endif; ?>

	    <?php if($page['banner']):?>
          <div class="page-section no-padding" >
              <?php print render($page['banner']);?>
          </div><!-- .page-section -->
       <?php endif; ?>
       <div id="main">
          <?php if($messages && $user->uid == 1) : ?>
            <div class="page-section">
              <div class="container">
                <?php print $messages; ?>
              </div>
            </div>
          <?php endif; ?>

          <?php if ($tabs): ?><div class="config-tool"><?php print render($tabs); ?></div><?php endif; ?>

          <?php print render($page['content']);?>
       </div><!-- #main -->

       <?php if (!isset($_GET['ac_layout'])) : ?>
           <div id="footer">

              <?php if($page['footer_top']):?>
                <div id="footer-top">
                    <div class="container">
                        <?php print render($page['footer_top']);?>
                    </div>
                </div>
              <?php endif; ?>

              <?php if($page['footer']):?>
                <?php print render($page['footer']);?>
              <?php endif; ?>
           </div><!-- #footer -->
      <?php endif; ?>

    </div><!-- #page -->
</div>
<?php if (!isset($_GET['ac_layout'])) : ?>
	<script type="text/javascript">
        jQuery(document).ready(function() {
            jQuery("#rev_slider_1").show().revolution({
                sliderType:"carousel",
                sliderLayout:"fullwidth",
                dottedOverlay:"none",
                delay:1000,
                carousel: {
                    maxRotation: 0,
                    minScale: 65,
                    maxVisibleItems: 3,
                    infinity: "on",
                    space: -50,
                    vary_fade: "on",
                    stretch: "off"
                },
                gridwidth:450,
                gridheight: 540,
                stopAfterLoops:0,
                stopAtSlide:1,
                disableProgressBar:"on"
            });
        }); /*ready*/

    </script>
<?php endif; ?>
<?php else : ?>
<div id="page-wrapper">
    <div id="page">

        <?php if($page['header']):?>
            <?php print render($page['header']);?>
        <?php endif; ?>

        <?php if($page['banner']):?>
            <div class="page-section no-padding" >
                <?php print render($page['banner']);?>
            </div><!-- .page-section -->
        <?php endif; ?>
           <div id="main">
                <div class="page-section">
                  <div class="container">
                    <div class="row">
                    <?php if (!empty($page['sidebar'])) : ?>
						<?php if(theme_get_setting('sidebar_position') == 'left') : ?>
                          <div class="col-md-3 col-sm-3">
                            <aside class="side-bar">
                              <?php print render($page['sidebar']); ?>
                            </aside>
                          </div>
                        <?php endif; ?>
                        <?php if(theme_get_setting('sidebar_position') == 'no') : ?>
                          <div class="col-md-12 col-sm-12">
                            <?php print $messages; ?>
                            <?php if ($tabs): ?><div class="tab-tool"><?php print render($tabs); ?></div><?php endif; ?>
                            <?php print render($page['content']); ?>
                          </div>
                        <?php else: ?>
                          <div class="col-md-9 col-sm-9">
                            <?php print $messages; ?>
                            <?php if ($tabs): ?><div class="tab-tool"><?php print render($tabs); ?></div><?php endif; ?>
                            <?php print render($page['content']); ?>
                          </div>
                        <?php endif; ?>
                        <?php if(theme_get_setting('sidebar_position') == 'right' || theme_get_setting('sidebar_position') == "") : ?>
                          <div class="col-md-3 col-sm-3">
                            <aside class="side-bar">
                              <?php print render($page['sidebar']); ?>
                            </aside>
                          </div>
                        <?php endif; ?>
                        <?php else: ?>
                          <div class="col-md-12 col-sm-12">
                              <?php print $messages; ?>
                              <?php if ($tabs): ?><div class="tab-tool"><?php print render($tabs); ?></div><?php endif; ?>
                              <h2><?php print ($title);?></h2>
                              <?php print render($page['content']);?>
                          </div>
                        <?php endif; ?>
                    </div>
                  </div>
                </div>

           </div><!-- #main -->


           <div id="footer">

			  <?php if($page['footer_top']):?>
                <div id="footer-top">
                    <div class="container">
                        <?php print render($page['footer_top']);?>
                    </div>
                </div>
              <?php endif; ?>

              <?php if($page['footer']):?>
                <?php print render($page['footer']);?>
              <?php endif; ?>
           </div><!-- #footer -->

    </div><!-- #page -->
</div>
<?php endif; ?>