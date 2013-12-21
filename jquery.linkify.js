;(function($) {
    'use strict';

    jQuery.fn.linkify = function(options) {
        var config = $.extend({
            extraClass: false,
            callback: false
        }, options);

        return this.each(function() {
            var $obj = $(this),
                $objContainer = $obj.parent(),
                currentLink = null,
                frag = document.createDocumentFragment(),
                ul = document.createElement('ul'),
                li, anchor;
            $objContainer.addClass('linkify');
            if(config.extraClass) {
                $objContainer.addClass(config.extraClass);
            }
            ul.className = 'linkify-list';
            frag.appendChild(ul);
            $obj.find('option').each(function(i, el) {
                li = document.createElement('li');
                anchor = document.createElement('a');
                anchor.href = '#' + $(el).val();
                anchor.appendChild(document.createTextNode(el.text));
                if($(el).attr('selected')) {
                    anchor.className = 'is-selected';
                    currentLink = $(anchor);
                }
                li.appendChild(anchor);
                ul.appendChild(li);
            });

            $(ul).on('click', 'a', function(evt) {
                evt.preventDefault();
                var $this = $(this),
                    $opts = $obj.find('option'),
                    linkHref = $this.attr('href').split('#')[1];
                currentLink.removeClass('is-selected');
                currentLink = $this;
                currentLink.addClass('is-selected');
                $opts.filter(':selected').prop('selected', false).end()
                .filter(function() {
                    return $(this).val() === linkHref;
                }).prop('selected', true);
                if(config.callback) {
                    config.callback(linkHref);
                }
            });

            $objContainer[0].insertBefore(frag, $obj[0]);
        });
    };
})(jQuery);
