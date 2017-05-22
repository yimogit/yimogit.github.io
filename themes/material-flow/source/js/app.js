/* eslint-disable */
var customSearch;
(function ($) {

	"use strict";
	const scrollCorrection = 70; // (header height = 50px) + (gap = 20px)
	function scrolltoElement(elem, correction) {
		correction = correction || scrollCorrection;
		const $elem = elem.href ? $(elem.getAttribute('href')) : $(elem);
		$('html, body').animate({ 'scrollTop': $elem.offset().top - correction }, 400);
	};

	function setHeader() {
		if (!window.subData) return;
		const $wrapper = $('header .wrapper');
		const $comment = $('.s-comment', $wrapper);
		const $toc = $('.s-toc', $wrapper);
		const $top = $('.s-top',$wrapper);

		$wrapper.find('.nav-sub .logo').text(window.subData.title);
		let pos = document.body.scrollTop;
		$(document, window).scroll(() => {
			const scrollTop = $(window).scrollTop();
			const del = scrollTop - pos;
			if (del >= 20) {
				pos = scrollTop;
				$wrapper.addClass('sub');
			} else if (del <= -20) {
				pos = scrollTop;
				$wrapper.removeClass('sub');
			}
		});
		// bind events to every btn
		const $commentTarget = $('#comments');
		if ($commentTarget.length) {
			$comment.click(e => { e.preventDefault(); e.stopPropagation(); scrolltoElement($commentTarget); });
		} else $comment.remove();

		const $tocTarget = $('.toc-wrapper');
		if ($tocTarget.length && $tocTarget.children().length) {
			$toc.click((e) => { e.stopPropagation(); $tocTarget.toggleClass('active'); });
		} else $toc.remove();

		$top.click(()=>scrolltoElement(document.body));

	}
	function setHeaderMenu() {
		var $headerMenu = $('header .menu');
		var $underline = $headerMenu.find('.underline');
		function setUnderline($item, transition) {
			$item = $item || $headerMenu.find('li a.active');//get instant
			transition = transition === undefined ? true : !!transition;
			if (!transition) $underline.addClass('disable-trans');
			if ($item && $item.length) {
				$item.addClass('active').siblings().removeClass('active');
				$underline.css({
					left: $item.position().left,
					width: $item.innerWidth()
				});
			} else {
				$underline.css({
					left: 0,
					width: 0
				});
			}
			if (!transition) {
				setTimeout(function () { $underline.removeClass('disable-trans') }, 0);//get into the queue.
			}
		}
		$headerMenu.on('mouseenter', 'li', function (e) {
			setUnderline($(e.currentTarget));
		});
		$headerMenu.on('mouseout', function () {
			setUnderline();
		});
		//set current active nav
		var $active_link = null;
		if (location.pathname === '/' || location.pathname.startsWith('/page/')) {
			$active_link = $('.nav-home', $headerMenu);
		} else {
			var name = location.pathname.match(/\/(.*?)\//);
			if (name.length > 1) {
				$active_link = $('.nav-' + name[1], $headerMenu);
			}
		}
		setUnderline($active_link, false);
	}
	function setHeaderMenuPhone() {
		var $switcher = $('.l_header .switcher .s-menu');
		$switcher.click(function (e) {
			e.stopPropagation();
			$('body').toggleClass('z_menu-open');
			$switcher.toggleClass('active');
		});
		$(document).click(function (e) {
			$('body').removeClass('z_menu-open');
			$switcher.removeClass('active');
		});
	}
	function setHeaderSearch() {
		var $switcher = $('.l_header .switcher .s-search');
		var $header = $('.l_header');
		var $search = $('.l_header .m_search');
		if ($switcher.length === 0) return;
		$switcher.click(function (e) {
			e.stopPropagation();
			$header.toggleClass('z_search-open');
			$search.find('input').focus();
		});
		$(document).click(function (e) {
			$header.removeClass('z_search-open');
		});
		$search.click(function (e) {
			e.stopPropagation();
		})
	}
	function setWaves() {
		Waves.attach('.flat-btn', ['waves-button']);
		Waves.attach('.float-btn', ['waves-button', 'waves-float']);
		Waves.attach('.float-btn-light', ['waves-button', 'waves-float', 'waves-light']);
		Waves.attach('.flat-box', ['waves-block']);
		Waves.attach('.float-box', ['waves-block', 'waves-float']);
		Waves.attach('.waves-image');
		Waves.init();
	}
	function setScrollReveal() {
		const $reveal = $('.reveal');
		if ($reveal.length === 0) return;
		const sr = ScrollReveal({ distance: 0 });
		sr.reveal('.reveal');
	}
	function setTocToggle() {
		const $toc = $('.toc-wrapper');
		if ($toc.length === 0) return;
		$toc.click((e) => { e.stopPropagation(); $toc.addClass('active'); });
		$(document).click(() => $toc.removeClass('active'));

		$toc.on('click', 'a', (e) => {
			e.preventDefault();
			e.stopPropagation();
			scrolltoElement(e.target.tagName.toLowerCase === 'a' ? e.target : e.target.parentElement);
		});

		const liElements = Array.from($toc.find('li a'));
		//function animate above will convert float to int.
		const getAnchor = () => liElements.map(elem => Math.floor($(elem.getAttribute('href')).offset().top - scrollCorrection));

		let anchor = getAnchor();
		const scrollListener = () => {
			const scrollTop = $('html').scrollTop() || $('body').scrollTop();
			if (!anchor) return;
			//binary search.
			let l = 0, r = anchor.length - 1, mid;
			while (l < r) {
				mid = (l + r + 1) >> 1;
				if (anchor[mid] === scrollTop) l = r = mid;
				else if (anchor[mid] < scrollTop) l = mid;
				else r = mid - 1;
			}
			$(liElements).removeClass('active').eq(l).addClass('active');
		}
		$(window)
			.resize(() => {
				anchor = getAnchor();
				scrollListener();
			})
			.scroll(() => {
				scrollListener()
			});
		scrollListener();
	}
    /**
	 * 渲染时间轴
	 * 渲染条件
	 * <timeline></timeline>
	 * ## 标题
	 * 内容
	 */
	function renderTimeline(){
		var html='<ul class="ant-timeline">';
		if($("timeline").length>0){
			var arr=$(".article-entry h2")
			for(var i=arr.length-1;i>=0;i--){
				html+=('<li class="ant-timeline-item"><div class="ant-timeline-item-tail"></div><div class="ant-timeline-item-head ant-timeline-item-head-blue"></div><div class="ant-timeline-item-content"><span>'+$(arr[i]).text()+'</span><br><div class="post-title">'+$(arr[i]).next().html()+'</div></div></li>');
			}
				
			html+='</ul>';
			setTimeout(function(){
				$("timeline").siblings().html("")
				$("timeline").html(html);
			},1);
		}
	}
	function InitTongJi(){
		if(location.hostname=='localhost'){
			return;
		}
        var _hmt = _hmt || [];
        (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?298d27b32ab956da6c429baf431a993d";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
        })();
	}

	$(function () {
		//set header
		setHeader();
		setHeaderMenu();
		setHeaderMenuPhone();
		setHeaderSearch();
		renderTimeline();
		setWaves();
    	InitTongJi();
		setScrollReveal();
		setTocToggle();
		// getHitokoto();
		// getPicture();
		InitCloudTags();

		$(".article .video-container").fitVids();

		setTimeout(function () {
			$('#loading-bar-wrapper').fadeOut(500);
		}, 300);

		if (SEARCH_SERVICE === 'google') {
			customSearch = new GoogleCustomSearch({
				apiKey: GOOGLE_CUSTOM_SEARCH_API_KEY,
				engineId: GOOGLE_CUSTOM_SEARCH_ENGINE_ID,
				imagePath: "/images/"
			});
		}
		else if (SEARCH_SERVICE === 'algolia') {
			customSearch = new AlgoliaSearch({
				apiKey: ALGOLIA_API_KEY,
				appId: ALGOLIA_APP_ID,
				indexName: ALGOLIA_INDEX_NAME,
				imagePath: "/images/"
			});
		}
		else if (SEARCH_SERVICE === 'hexo') {
			customSearch = new HexoSearch({
				imagePath: "/images/"
			});
		}
		else if (SEARCH_SERVICE === 'azure') {
			customSearch = new AzureSearch({
				serviceName: AZURE_SERVICE_NAME,
				indexName: AZURE_INDEX_NAME,
				queryKey: AZURE_QUERY_KEY,
				imagePath: "/images/"
			});
		}
		else if (SEARCH_SERVICE === 'baidu') {
			customSearch = new BaiduSearch({
				apiId: BAIDU_API_ID,
				imagePath: "/images/"
			});
		}

	});
})(jQuery);

function InitCloudTags(){
    var radius = 90;
    var d = 200;
    var dtr = Math.PI / 180;
    var mcList = [];
    var lasta = 1;
    var lastb = 1;
    var distr = true;
    var tspeed = 11;
    var size = 200;
    var mouseX = 0;
    var mouseY = 10;
    var howElliptical = 1;
    var aA = null;
    var oDiv = null;
    window.onload=function ()
    {
        var i=0;
        var oTag=null;
        oDiv=document.getElementById('tagscloud');
        aA=oDiv.getElementsByTagName('a');
		oDiv.style.display='block';
        for(i=0;i<aA.length;i++)
        {
            oTag={};		
            aA[i].onmouseover = (function (obj) {
                return function () {
                    obj.on = true;
                    this.style.zIndex = 9999;
                    this.style.color = '#fff';
                    this.style.padding = '5px 5px';
                    this.style.filter = "alpha(opacity=100)";
                    this.style.opacity = 1;
                }
            })(oTag)
            aA[i].onmouseout = (function (obj) {
                return function () {
                    obj.on = false;
                    this.style.zIndex = obj.zIndex;
                    this.style.color = '#fff';
                    this.style.padding = '5px';
                    this.style.filter = "alpha(opacity=" + 100 * obj.alpha + ")";
                    this.style.opacity = obj.alpha;
                    this.style.zIndex = obj.zIndex;
                }
            })(oTag)
            oTag.offsetWidth = aA[i].offsetWidth;
            oTag.offsetHeight = aA[i].offsetHeight;
            mcList.push(oTag);
        }
        sineCosine( 0,0,0 );
        positionAll();
        (function () {
                update();
                setTimeout(arguments.callee, 40);
            })();
    };
    function update()
    {
        var a, b, c = 0;
            a = (Math.min(Math.max(-mouseY, -size), size) / radius) * tspeed;
            b = (-Math.min(Math.max(-mouseX, -size), size) / radius) * tspeed;
            lasta = a;
            lastb = b;
            if (Math.abs(a) <= 0.01 && Math.abs(b) <= 0.01) {
                return;
            }
            sineCosine(a, b, c);
            for (var i = 0; i < mcList.length; i++) {
                if (mcList[i].on) {
                    continue;
                }
                var rx1 = mcList[i].cx;
                var ry1 = mcList[i].cy * ca + mcList[i].cz * (-sa);
                var rz1 = mcList[i].cy * sa + mcList[i].cz * ca;

                var rx2 = rx1 * cb + rz1 * sb;
                var ry2 = ry1;
                var rz2 = rx1 * (-sb) + rz1 * cb;

                var rx3 = rx2 * cc + ry2 * (-sc);
                var ry3 = rx2 * sc + ry2 * cc;
                var rz3 = rz2;

                mcList[i].cx = rx3;
                mcList[i].cy = ry3;
                mcList[i].cz = rz3;

                per = d / (d + rz3);

                mcList[i].x = (howElliptical * rx3 * per) - (howElliptical * 2);
                mcList[i].y = ry3 * per;
                mcList[i].scale = per;
                var alpha = per;
                alpha = (alpha - 0.6) * (10 / 6);
                mcList[i].alpha = alpha * alpha * alpha - 0.2;
                mcList[i].zIndex = Math.ceil(100 - Math.floor(mcList[i].cz));
            }
            doPosition();
    }
    function positionAll()
    {
        var phi = 0;
        var theta = 0;
        var max = mcList.length;
        for (var i = 0; i < max; i++) {
            if (distr) {
                phi = Math.acos(-1 + (2 * (i + 1) - 1) / max);
                theta = Math.sqrt(max * Math.PI) * phi;
            } else {
                phi = Math.random() * (Math.PI);
                theta = Math.random() * (2 * Math.PI);
            }
            mcList[i].cx = radius * Math.cos(theta) * Math.sin(phi);
            mcList[i].cy = radius * Math.sin(theta) * Math.sin(phi);
            mcList[i].cz = radius * Math.cos(phi);

            aA[i].style.left = mcList[i].cx + oDiv.offsetWidth / 2 - mcList[i].offsetWidth / 2 + 'px';
            aA[i].style.top = mcList[i].cy + oDiv.offsetHeight / 2 - mcList[i].offsetHeight / 2 + 'px';
        }
    }
    function doPosition()
    {
        var l = oDiv.offsetWidth / 2;
            var t = oDiv.offsetHeight / 2;
            for (var i = 0; i < mcList.length; i++) {
                if (mcList[i].on) {
                    continue;
                }
                var aAs = aA[i].style;
                if (mcList[i].alpha > 0.1) {
                    if (aAs.display != '')
                        aAs.display = '';
                } else {
                    if (aAs.display != 'none')
                        aAs.display = 'none';
                    continue;
                }
                aAs.left = mcList[i].cx + l - mcList[i].offsetWidth / 2 + 'px';
                aAs.top = mcList[i].cy + t - mcList[i].offsetHeight / 2 + 'px';
                //aAs.fontSize=Math.ceil(12*mcList[i].scale/2)+8+'px';
                //aAs.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+100*mcList[i].alpha+")";
                aAs.filter = "alpha(opacity=" + 100 * mcList[i].alpha + ")";
                aAs.zIndex = mcList[i].zIndex;
                aAs.opacity = mcList[i].alpha;
            }
    }
    function sineCosine( a, b, c)
    {
        sa = Math.sin(a * dtr);
        ca = Math.cos(a * dtr);
        sb = Math.sin(b * dtr);
        cb = Math.cos(b * dtr);
        sc = Math.sin(c * dtr);
        cc = Math.cos(c * dtr);
    }   
}