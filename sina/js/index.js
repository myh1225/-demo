let $oul = $('.ulBox'),
    $listBox = $('.listBox');

function bannerFn() {
    let mySwiper = new Swiper('.bannerBox', {
        autoplay: {
            disableOnInteraction: false, //用户操作后仍然自动播放
            delay: 1000, //一张图在当前窗口的等待时间
        },
        loop: true, //是否无缝滚动
        pagination: {
            el: '.pageBox', //分页器的盒子
            type: 'fraction', //分页器的类型
            // type: 'bullets',
            //type : 'progressbar',
            //type : 'custom',
            currentClass: 'currentPage', //变动数字的盒子的类名
            totalClass: 'totalPage', //总共数字盒子的类名
        },
    });
}


function getData() {
    $.ajax({
        type: 'POST', //请求方式
        url: './data/banner.json', //请求路径
        data: {t: 123, q: 234}, //发送给后台的数据
        success: function (d) {
            //请求成功吼执行的函数
            giveHtml(d);
            bannerFn();
        },
        error: function () {
            //请求失败后执行的函数
        }
    })
}

// getData();

function giveHtml(data) {
    data = data || [];
    let str = '';
    data.forEach(({title, img}) => {
        str += `<li class="swiper-slide">
                    <a href="##">
                       <img src="${img}" alt="">
                       <div>${title}</div>
                    </a>
                </li>`;
    });
    $oul.html(str);
}

let p = new Promise((resolve, reject) => {
    $.ajax({
        type: 'GET',
        url: './data/banner.json',
        success: function (data) {
            resolve(data)
        },
        error: function (res) {
            reject(res)
        }
    });
});
p.then((data) => {
    //promise执行的成功函数
    // console.log(data);
    giveHtml(data);
    return data
}, () => {
    //promise执行的失败函数
}).then((data) => {
    console.log(data);
    bannerFn();
}, () => {
});
let listPro = new Promise((resolve, reject) => {
    $.ajax({
        type: 'POST',
        url: './data/list.json',
        data: {t: 1},
        success: function (data) {
            resolve(data);
        },
        error: function (res) {
            reject(res);
        }
    });
});

function giveListHtml(data) {
    data = data || [];
    let str = '';
    data.forEach(({img, num, type, title}) => {
        switch (type) {
            case 0:
                str += `<a href="##">
            <div class="text_box">
                <p>${title}</p>
                <div class="comment_box">
                    <em class="">
                        <span class="">${num}</span>
                        <span class="icon_com"></span>
                    </em>
                </div>
            </div>
        </a>`;
                break;
            case 1:
                str += `<a href="##">
            <div class="img_box">
                <img src="${img}"
                     alt="">
            </div>
            <div class="text_box">
                <p>${title}</p>
                <div class="comment_box">
                    <em class="">
                        <span class="">${num}</span>
                        <span class="icon_com"></span>
                    </em>
                </div>
            </div>
        </a>`;
                break;
            case 3:
                str += `<a href="##" class="three_box">
            <p>${title}</p>
            <div class="three_pic">
                <div><img
                        src="${img[0]}"
                        alt=""></div>
                <div><img
                        src="${img[1]}"
                        alt=""></div>
                <div><img
                        src="${img[2]}"
                        alt=""></div>
            </div>
            <div class="comment_box">
                <em class="">
                    <span class="">${num}</span>
                    <span class="icon_com"></span>
                </em>
            </div>
        </a>`;
                break;
        }
    });
    $listBox.html(str);
}

listPro.then(giveListHtml);