import $ from 'jquery';
import 'foundation-sites/js/foundation/foundation';
import 'foundation-sites/js/foundation/foundation.dropdown';
import utils from '@bigcommerce/stencil-utils';
import ProductDetails from '../common/product-details';
import { defaultModal } from './modal';
import modalFactory from '../global/modal';
import 'slick-carousel';

export default function (context) {
    const modal = defaultModal();

    $('body').on('click', '.quickview', (event) => {
        event.preventDefault();

        const productId = $(event.currentTarget).data('product-id');

        modal.open({ size: 'large' });

        utils.api.product.getById(productId, { template: 'products/quick-view' }, (err, response) => {
            modal.updateContent(response);

            modal.$content.find('.productView').addClass('productView--quickView');

            modal.$content.find('[data-slick]').slick();

            return new ProductDetails(modal.$content.find('.quickView'), context);
        });
    });

    $('body').on('click', '.quickviewvideo', (event) => {
        event.preventDefault();

        let videoId = $(event.currentTarget).data('video-id');

        const modalVideo = modalFactory('#previewModalVideo')[0];

        if (!modalVideo.$content.find('iframe[src]').attr('opened')) {
            videoId = ('?d=').concat(videoId, '&');
            videoId = modalVideo.$content.find('iframe[src]').attr('src').replace('?', videoId);
            modalVideo.$content.find('iframe[src]').attr('src', videoId).attr('opened', '1');
        }

        modalVideo.open({ size: 'large', pending: false, clearContent: false });
    });
}
