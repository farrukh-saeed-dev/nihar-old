var cookieName = 'recently_viewed_product';
  
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function checkCookie() {
    let cookie = getCookie(cookieName);
    if (cookie != "") {
        return true;
    } else {
       return false;
    }
}

function createProductItemHTMLString(sectionId, forloopIndex, product, outOfStock) {
    let productLink =  window.Shopify.routes.root+'products/'+product.handle;
    let show_secondary_image = '';
    let show_compare_at_price = '';
    let badge_tag = '';
    let sustainable = '';
    let cardClass = '';
    let buttonClass = '';
    let discount = 0;
    let buttonText = "addToCart";
    let soldOutText = `<span class="sold-out-message hidden">${ "soldOut" }</span>`; 
    if (outOfStock) {
        cardClass = ' price--sold-out';
        buttonClass = ' notify_me klaviyo-bis-trigger';
        buttonText = "notify_me";
        soldOutText = '';
    }
    if (product.variants[0].compare_at_price > product.variants[0].price) {
        cardClass = ' price--on-sale';
    }
    /*
        Ticket: FTC-2197
        Task: if discount available it will show percentage discount on top priority for recently viewed carousel.
    */
    let discount_price = product.price;
    let original_price = product.compare_at_price;
    let discount_percentage_rough = ((original_price - discount_price) / original_price) * 100;
    let discount_percentage = Math.round(discount_percentage_rough)
    if (discount_percentage  > 0) {
        badge_tag = '<div class="badge badge-last-chance off">' + discount_percentage + '%</div>'
    }
    if (product.tags.includes('Label:LBL_NEW_IN')) badge_tag = '<div class="badge badge-new-in">New In</div>'
    else if (product.tags.includes('Label:LBL_LAST_CHANCE')) {
        if (discount_percentage  > 0) {
        } else {
            badge_tag = '<div class="badge badge-last-chance">Last Chance</div>'
        }
    }
    else if (product.tags.includes('Label:LBL_BESTSELLER')) badge_tag = '<div class="badge badge-best-seller">best_seller</div>'
    else if (product.tags.includes('Label:LBL_ONLINE_EXCLUSIVE')) badge_tag = '<div class="badge badge-online-exclusive">online_exclusive</div>'
    else if (product.tags.includes('Label:LBL_-50%')) badge_tag = '<div class="badge badge-fifty-percent-off">fifty_percent_off</div>'
    else if (product.tags.includes('Label:LBL_PRODUCT_OF_THE_WEEK')) badge_tag = '<div class="badge badge-product-of-the-week">product_of_the_week</div>'

    if (product.tags.includes('Sustainable:true') && theme.settings.ecoconscious_enabled) {
        sustainable = `
        <tool-tip class="tooltip eco-conscious">
        <svg class="icon icon-eco-friendly" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><style>.cls-1{fill:#228848;}</style></defs><path class="cls-1" d="M779.68,212.65,478.78,81.41,228,205.11,70.81,500.38,219.87,836.9,441.7,919.06H622.37L844.46,787.45l85.43-312.16Zm-532.19,12.6,97.05-47.86L384,190.68l-8.38,77.54h83.72l27.76-75.64L516.07,237V303.6l-84.59,36.13L365.7,365.05l-29.52,47.12H217.63l25.28,81.47,55.65,17.89,23.3,72.24,81.57-57.32,83.82,44v56.88h60l14.81,130.06H474.24l18.44,67.63-76.17,10.26-18.59-76.07V680L266.53,633.5l-26.76-93.68-49.32-53.26L166.33,377.74ZM615.05,892.36H446.49L239.72,815.78,100.49,501.45,147,414,166,499.4l49.9,53.89,28.79,100.78,126.58,44.79v63.61L396.28,865l130.19-17.52-17.28-63.33H592L571.1,600.67H514v-46.3L401.42,495.23l-65.27,45.86L319.77,490.3,264.3,472.47l-10.43-33.61H351l32.64-52.09,57.69-22.22,101.48-43.32V229.08l-62.34-95.7-39.7,108.14H405.39l7.49-69.3-34.39-11.57,101-49.81L760.9,233.59l91.92,160.72H732.47l-21.78-47.93L591.15,400.05l17.17,68.7L578.5,514.63l79.82,53.21H761.4l6.43,64.23L744.33,694l68.33,81.26Zm211.8-141.71-52-61.84L795,635.66l-9.45-94.52H666.41l-51.14-34.09L637,473.56l-14.57-58.3,74.91-33.64L715.28,421H866.82v-2.23l34.4,60.15Z"/></svg>
            <div class="tooltip-wrapper">
                <div class="icon-wrapper">
                <svg class="icon icon-eco-friendly" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><style>.cls-1{fill:#228848;}</style></defs><path class="cls-1" d="M779.68,212.65,478.78,81.41,228,205.11,70.81,500.38,219.87,836.9,441.7,919.06H622.37L844.46,787.45l85.43-312.16Zm-532.19,12.6,97.05-47.86L384,190.68l-8.38,77.54h83.72l27.76-75.64L516.07,237V303.6l-84.59,36.13L365.7,365.05l-29.52,47.12H217.63l25.28,81.47,55.65,17.89,23.3,72.24,81.57-57.32,83.82,44v56.88h60l14.81,130.06H474.24l18.44,67.63-76.17,10.26-18.59-76.07V680L266.53,633.5l-26.76-93.68-49.32-53.26L166.33,377.74ZM615.05,892.36H446.49L239.72,815.78,100.49,501.45,147,414,166,499.4l49.9,53.89,28.79,100.78,126.58,44.79v63.61L396.28,865l130.19-17.52-17.28-63.33H592L571.1,600.67H514v-46.3L401.42,495.23l-65.27,45.86L319.77,490.3,264.3,472.47l-10.43-33.61H351l32.64-52.09,57.69-22.22,101.48-43.32V229.08l-62.34-95.7-39.7,108.14H405.39l7.49-69.3-34.39-11.57,101-49.81L760.9,233.59l91.92,160.72H732.47l-21.78-47.93L591.15,400.05l17.17,68.7L578.5,514.63l79.82,53.21H761.4l6.43,64.23L744.33,694l68.33,81.26Zm211.8-141.71-52-61.84L795,635.66l-9.45-94.52H666.41l-51.14-34.09L637,473.56l-14.57-58.3,74.91-33.64L715.28,421H866.82v-2.23l34.4,60.15Z"/></svg>
                </div>
                <div class="content-wrapper">
                <h6>eco_conscious_title</h6>
                <p>eco_conscious_text</p>
                </div>
            </div>
        </tool-tip>`
        ;
    }

    let isInWishlist = checkProductIsInWishlist(product);
    let wishlistAddedClass = isInWishlist ? ' wishlist-added': '';
    if (product.images[1] != null) show_secondary_image = `<img src="${ product.images[1] }&width=700" alt="${ product.title }" class="motion-reduce" loading="lazy" width="700" height="700">`;
    if (product.variants[0].compare_at_price != null) show_compare_at_price = product.variants[0].compare_at_price;
    if (product.price == 0)
      cardClass = ' zero-price';
      if (product.variants[0].compare_at_price != null){
          if (product.variants[0].compare_at_price > product.variants[0].price)
               discount = product.variants[0].compare_at_price - product.variants[0].price ;
      }
            
    let html = 
        `<li id="Slide-${ sectionId }-${ forloopIndex }" class="grid__item slider__slide">
            <div class="card-wrapper">
                <div class="card card--standard card--media" style="--ratio-percent: 139%;" product-price= "${ product.variants[0].price/100.0}" discount="${ discount/100.0}">
                    <div class="card__inner color-background-2 gradient ratio" style="--ratio-percent: 139%;">
                        <div class="card__media">
                            <a href="${ product.url }" class="media media--transparent media--hover-effect">
                                <img src="${ product.images[0] }&width=700" alt="${ product.title }" class="motion-reduce" loading="lazy" width="700" height="700"> 
                                 ${ show_secondary_image }                               
                            </a>
                        </div>
                        <div class="card__content">
                            <div class="card__information">
                                <h4 class="card__heading">
                                    <a href="${productLink}" class="card__information--title recently-viewed-product ${product.handle}" title="${ product.title }">${ product.title }</a>
                                </h4>
                            </div>
                            <modal-opener class="card-quick-add-modal" data-modal="#QuickAdd-${ product.id }">
                                <button
                                    id="quick-add-${ sectionId }${ product.id }-submit"
                                    type="submit"
                                    name="add"
                                    class="quick-add__submit button-bold"
                                    aria-haspopup="dialog"
                                    aria-labelledby="quick-add-${ sectionId }${ product.id }-submit title-${ sectionId }-${ product.id }"
                                    data-product-url="${ productLink }"
                                >
                                    <a class="quick-add__inner" href="javascript:void(0)">
                                    <span class="quick-add__label--text">
                                        choose_options
                                    </span>
                                    </a>
                                </button>
                            </modal-opener>
                            <quick-add-modal id="QuickAdd-${ product.id }" class="quick-add-modal modal">
                                <div role="dialog" aria-label="choose_product_options" aria-modal="true" class="quick-add-modal__content global-settings-popup modal__large" tabindex="-1">
                                    <button id="ModalClose-${ product.id }" type="button" class="quick-add-modal__toggle" aria-label="close">
                                        <svg class="icon icon-close" viewBox="0 0 15 15"><g><path d="M1.636 13.864L14.364 1.136M1.636 1.136l12.728 12.728"></path></g></svg>
                                    </button>
                                    <div id="QuickAddInfo-${ product.id }" class="quick-add-modal__content-info">
                                    </div>
                                </div>
                            </quick-add-modal>
                            <div class="card__wishlist-icon ${wishlistAddedClass}" data-wishlist="" data-product-handle="${ product.handle }" data-product-id="${ product.id }"  data-variant-id="${ product.variants[0].id }" wishlist-id="${ product.id }" aria-label="Wishlist" title="Wishlist">
                                <span class="card__icon-heart-empty"><svg class="icon icon-heart-empty" viewBox="0 0 19 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <title>Wishlist</title>
                                <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="Desktop_Double_Label" transform="translate(-217.000000, -17.000000)" fill="#707070" fill-rule="nonzero" stroke="#707070" stroke-width="0.3">
                                        <g id="noun_Heart_249778" transform="translate(218.000000, 17.000000)">
                                            <path d="M8.52858851,15.7668437 C8.53122701,15.764959 13.4588198,12.1213748 15.4199814,9.36074683 C19.0281343,4.27748233 15.8408227,0.251692143 12.3169134,0.251692143 C10.9859771,0.251692143 9.60754777,0.825566546 8.52840005,2.13313325 C7.44925232,0.825566546 6.07006911,0.251880607 4.73950973,0.251692143 C1.21484665,0.251126749 -1.97246498,4.2771054 1.63625327,9.36074683 C3.59741486,12.1213748 8.52858851,15.7668437 8.52858851,15.7668437 Z M1.41198052,3.20775783 C2.04409045,1.98424629 3.34977251,1.19363771 4.7391328,1.19382615 C4.7391328,1.19382615 4.73932127,1.19382615 4.73950973,1.19382615 C5.89517405,1.19382615 6.98261422,1.74037323 7.80168093,2.73282729 L8.52840005,3.6135219 L9.25511916,2.73282729 C10.0741859,1.74018477 11.1612491,1.19382615 12.316725,1.19382615 C13.7057083,1.19382615 15.0117673,1.98443476 15.6436888,3.20813476 C16.4552169,4.77917483 16.1027883,6.77049074 14.6514232,8.81495364 C13.1759346,10.8920209 9.85274009,13.558982 8.52840005,14.5827212 C7.20292922,13.5576628 3.87558846,10.8865554 2.40424611,8.8151421 C0.95306946,6.77030228 0.600640845,4.7787979 1.41198052,3.20775783 Z" id="Shape"></path>
                                        </g>
                                    </g>
                                </g>
                                </svg></span>
                                <span class="card__icon-heart-filled"><svg class="icon icon-heart-filled" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 19 16" style="enable-background:new 0 0 19 16;" xml:space="preserve">
                                <title>Wishlist</title>
                                <style type="text/css">.st0{fill:#e31b23;stroke:#e31b23;stroke-width:0.3;}</style>
                                <path class="st0" d="M9.5,15.8c0,0,4.9-3.6,6.9-6.4c3.6-5.1,0.4-9.1-3.1-9.1c-1.3,0-2.7,0.6-3.8,1.9C8.4,0.8,7.1,0.3,5.7,0.3
                                    c-3.5,0-6.7,4-3.1,9.1C4.6,12.1,9.5,15.8,9.5,15.8z"></path>
                                </svg></span>
                            </div>
                        </div>
                        <div class="card__badge--wrapper">
                            ${ badge_tag }
                        </div>
                        ${ sustainable }
                    </div>
                    <div class="card__content">
                        <div class="card__information">
                            <h4 class="card__heading h5" id="title-template--${ sectionId }">
                                <a href="${ productLink }" class="card__information--title recently-viewed-product ${product.handle}" title="${ product.title }">${ product.title }</a>
                            </h4>
                            <div class="card-information">
                                <span class="caption-large light"></span>
                                <div class="price ff-price${ cardClass }">
                                    <div class="price__container">
                                        <div class="price__regular">
                                            <span class="visually-hidden visually-hidden--inline">Regular price</span>
                                            <span class="subtitle--s price-item price-item--regular" data-js-price="${ product.variants[0].price }">
                                            ${ product.variants[0].price }
                                            </span>
                                        </div>
                                        <div class="price__sale">
                                            <span class="visually-hidden visually-hidden--inline">Regular price</span>
                                            <span>
                                                <s class="subtitle--s price-item price-item--regular" data-js-price="${ show_compare_at_price }">${ show_compare_at_price }</s>
                                            </span>
                                            <span class="visually-hidden visually-hidden--inline">Sale price</span>
                                            <span class="subtitle--s price-item price-item--sale price-item--last" data-js-price="${ product.variants[0].price }">
                                            ${ product.variants[0].price }
                                            </span>                        
                                        </div>
                                        <small class="unit-price caption hidden">
                                        <span class="visually-hidden">Unit price</span>
                                        <span class="subtitle--s price-item price-item--last">
                                            <span></span>
                                            <span aria-hidden="true">/</span>
                                            <span class="visually-hidden">&nbsp;per&nbsp;</span>
                                            <span>
                                            </span>
                                        </span>
                                        </small>
                                    </div>
                                </div>
                            </div>
                            <div class="quick-add-to-cart">`
                           if (outOfStock)
                               html+=`
                                             <div class="klaviyo-product-container" id='klaviyo-data-handle-${ product.handle }' data-klaviyo-handle="${ product.handle }" >
                                               <div class="klaviyo-button-container">
                                                  <a class="quick-add__submit button button—-notify-me klaviyo-bis-trigger" href="#" data-klaviyo-handle="${ product.handle }" tabindex="0">${ buttonText  }</a>
                                               </div>
                                              </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>`
                           else if (product.price > 0) 
                            html+=`
                                <product-form>
                                    <form method="post" action="/cart/add" id="quick-add-template--${ sectionId }" accept-charset="UTF-8" class="form" enctype="multipart/form-data" novalidate="novalidate" data-type="add-to-cart-form">
                                        <input type="hidden" name="form_type" value="product">
                                        <input type="hidden" name="utf8" value="✓"><input type="hidden" name="id" value="${ product.variants[0].id }">
                                        <button id="quick-add-template--${ sectionId }-submit" type="submit" name="add" class="quick-add__submit button button--full-width button--add-to-cart${ buttonClass}" aria-haspopup="dialog" aria-labelledby="quick-add-template--15985987322007__featured_collection7688095432855-submit title-template--15985987322007__featured_collection-7688095432855" aria-live="polite" data-sold-out-message="true">
                                            <span class="atc-text">${ buttonText }</span>
                                            ${ soldOutText }
                                            <div class="loading-overlay__spinner hidden">
                                                <svg aria-hidden="true" focusable="false" role="presentation" class="spinner" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                                                    <circle class="path" fill="none" stroke-width="6" cx="33" cy="33" r="30"></circle>
                                                </svg>
                                            </div>
                                        </button>
                                    </form>
                                </product-form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>`
        
    return html;
}

function getAllProductDetailsData() {

    let cookieProducts = JSON.parse(getCookie(cookieName));
    let cookieProductsReverse = cookieProducts.reverse();
    let carrousel =  document.querySelector('.recently-viewed-carousel');
    let sectionId = 'recently-viewed';
    
    if (cookieProducts.length > 0) {

        let productsShown = 0;
        let forloopIndex = 0;
        let productsThatExist = cookieProductsReverse.length;
        let productsToShow = carrousel.dataset.products_to_show;
        if (productsToShow > cookieProductsReverse.length) productsToShow = cookieProductsReverse.length; 
        
        let carouselWithItems = false;
        let closedTag = false;

        let productHtml = '';
        productHtml += `<slider-component class="slider-mobile-gutter slider-component-full-width page-width slider-component-desktop"><ul id="Slider-template--15921418109108d__featured_collection" class="featured-collection-carousel grid product-grid contains-card contains-card--standard slider slider--desktop slider--tablet grid--peek" role="list" aria-label="Slider">`;
        
        cookieProductsReverse.forEach((productHandle) => {   
            let productUrl = window.Shopify.routes.root+'products/'+productHandle+'.js';    
            
            async function fetchData(){
                try {
                    const response = await fetch(productUrl);
                    const data = await response.json();
                    
                    if (productsShown < productsToShow) {
                        if (data.available) {
                            productsShown++;
                            productHtml += createProductItemHTMLString(sectionId, productsShown, data, false);
                            carouselWithItems = true;
                        }
                        else if (data.tags.includes('Tag:showOutOfStock')) {
                            productsShown++;
                            productHtml += createProductItemHTMLString(sectionId, productsShown, data, true);
                            carouselWithItems = true;
                        }
                                    
                        forloopIndex++;
                        if (carouselWithItems && closedTag == false) { 
                            if (productsShown == productsToShow || forloopIndex == productsThatExist ){ 
                                productHtml +=
                                    `</ul>
                                    <div class="slider-buttons no-js-hidden" bis_skin_checked="1">
                                        <button type="button" class="slider-button slider-button--prev" name="previous" aria-label="Slide left" aria-controls="Slider-recently-viewed_products">
                                            <svg class="icon icon-arrow-left" viewBox="-5 0 23 23" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">    
                                            <g id="icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                <g transform="translate(-614.000000, -159.000000)" fill="#252528" fill-rule="nonzero">
                                                    <g id="square-filled" transform="translate(50.000000, 120.000000)">
                                                        <path d="M565.76062,39.2902857 L576.638635,49.7417043 L576.699713,49.7959169 C576.885605,49.9745543 576.985701,50.2044182 577,50.4382227 L577,50.5617773 C576.985701,50.7955818 576.885605,51.0254457 576.699713,51.2040831 L576.646163,51.2479803 L565.76062,61.7097143 C565.357854,62.0967619 564.704841,62.0967619 564.302075,61.7097143 C563.899308,61.3226668 563.899308,60.6951387 564.302075,60.3080911 L574.451352,50.5617773 L564.302075,40.6919089 C563.899308,40.3048613 563.899308,39.6773332 564.302075,39.2902857 C564.704841,38.9032381 565.357854,38.9032381 565.76062,39.2902857 Z" id="left" transform="translate(570.500000, 50.500000) scale(-1, 1) translate(-570.500000, -50.500000) "></path>
                                                    </g>
                                                </g>
                                            </g>
                                            </svg>
                                            </button>
                                            <button type="button" class="slider-button slider-button--next" name="next" aria-label="Slide right" aria-controls="Slider-recently-viewed_products">
                                                <svg class="icon icon-arrow-right" viewBox="-5 0 23 23" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                <g id="icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                    <g transform="translate(-484.000000, -159.000000)" fill="#252528" fill-rule="nonzero">
                                                        <g id="square-filled" transform="translate(50.000000, 120.000000)">
                                                            <path d="M435.76062,39.2902857 L446.638635,49.7417043 L446.699713,49.7959169 C446.885605,49.9745543 446.985701,50.2044182 447,50.4382227 L447,50.5617773 C446.985701,50.7955818 446.885605,51.0254457 446.699713,51.2040831 L446.646163,51.2479803 L435.76062,61.7097143 C435.357854,62.0967619 434.704841,62.0967619 434.302075,61.7097143 C433.899308,61.3226668 433.899308,60.6951387 434.302075,60.3080911 L444.451352,50.5617773 L434.302075,40.6919089 C433.899308,40.3048613 433.899308,39.6773332 434.302075,39.2902857 C434.704841,38.9032381 435.357854,38.9032381 435.76062,39.2902857 Z" id="right"></path>
                                                        </g>
                                                    </g>
                                                </g>
                                                </svg>
                                            </button> 
                                        </div>
                                    </slider-component>`;
                                closedTag = true;
                                if (productsShown >= carrousel.dataset.minimum_products_to_show) {
                                    carrousel.classList.remove('hidden');
                                    carrousel.insertAdjacentHTML('beforeend', productHtml);
                                }
                            }
                        }
                    }

                } catch (error) {
                    productsThatExist--;
                    console.error(error);
                }
            }

            fetchData();
        });    
    }
}

function getItemFromLocalStorage(key) {
    let retrievedValue = localStorage.getItem(key);
    if(retrievedValue) {
        return retrievedValue;
    } else {
        return '';
    }
}

function checkProductIsInWishlist(product) {
    let wishlistItems = this.getItemFromLocalStorage('_ftcWishlist') ? JSON.parse(this.getItemFromLocalStorage('_ftcWishlist')) : [];
    let prodItem = product.id + ',' + product.handle;
    return wishlistItems.includes(prodItem);
}

if (checkCookie()) {
    getAllProductDetailsData();
}