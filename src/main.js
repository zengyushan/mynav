let urlLS = localStorage.getItem('urlTxt');
let srchTxt = document.querySelector('.srch > .txt > input');
let srchBtn = document.querySelector('.srch > .btn > button');
let lastli = document.querySelector('.list li.last');
let arr = []
//数组去重
Array.prototype.duplicate = function () {
    let newArr = []
    for (let i = 0; i < this.length; i++) {
        if (newArr.indexOf(this[i]) === -1) {
            newArr.push(this[i])
        }
    }
    return newArr
}
//如果已经存过localStorage了
if (urlLS) {
    arr = arr.concat(JSON.parse(urlLS)).duplicate()
} else {
    arr = ['baidu.com', 'google.com', 'bilibili.com', 'zhihu.com', 'segmentfault.com', 'developer.mozilla.org/zh-CN/', 'juejin.im', 'time.geekbang.org', 'taobao.com']
    localStorage.setItem('urlTxt', JSON.stringify(arr))
}
defaultItems(urlLS) //渲染默认的网址

function defaultItems(urlLS) {
    let html = ''
    for (let i = 0; i < arr.length; i++) {
        console.log(arr)
        html += setLiHtml(arr[i])
    }
    $(lastli).before($(html))
}

srchBtn.addEventListener('click', () => {
    console.log(srchTxt.value)
    location.href = '//www.baidu.com/s?wd=' + srchTxt.value
})
document.onkeydown = ((e) => {
    if (e.keyCode === 13 && srchTxt === document.activeElement) {
        location.href = '//www.baidu.com/s?wd=' + srchTxt.value
    }
    let letters = document.querySelectorAll('.list .upper-letter span')
    console.log(letters)
    for (let i = 0; i < letters.length; i++) {
        let txt = letters[i].textContent
        console.log(txt.toLowerCase())
        console.log(typeof e.key)
        if (txt.toLowerCase() === e.key) {
            let url = $(letters[i]).parent().parent().find('.net font').text()
            console.log(url)
            location.href = '//' + url
            break
        }

    }
})
lastli.addEventListener('click', () => {
    let urlTxt = prompt('请输入您要添加的网址', '')
    if (urlTxt && arr.indexOf(urlTxt) === -1) {
        let html = setLiHtml(urlTxt)
        $(lastli).before($(html))
        arr.push(urlTxt)
        localStorage.setItem('urlTxt', JSON.stringify(arr.duplicate())) //将网址数组存进缓存
    } else if (arr.indexOf(urlTxt) === 1) {
        alert('此网址已经存在了！')
    }
})
//点击X
$(document).on('click', '.list li em', function () {
    let li = $(this).parent()
    let url = li.find('a').attr('href').substring(2) //获取a标签的href，并截取url
    li.remove()
    //删掉数组中对应的这一个
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === url) {
            arr.splice(i, 1)
        }
    }
    localStorage.setItem('urlTxt', JSON.stringify(arr.duplicate())) //将网址数组存进缓存
})
function setLiHtml(urlTxt) {
    let html = ''
    let firstLetter = urlTxt.substring(0, 1)
    html += '<li>'
    html += '<a href="//' + urlTxt + '">'
    html += ' <div class="upper-letter">'
    html += '<span>' + firstLetter.toUpperCase() + '</span>'
    html += '</div>'
    html += '<div class="net">'
    html += '<font>' + urlTxt + '</font>'
    html += '</div>'
    html += '</a>'
    html += '<em><svg t="1598655174110" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2808" width="32" height="32"><path d="M572.16 512l183.466667-183.04a42.666667 42.666667 0 1 0-60.586667-60.586667L512 451.84l-183.04-183.466667a42.666667 42.666667 0 0 0-60.586667 60.586667l183.466667 183.04-183.466667 183.04a42.666667 42.666667 0 0 0 0 60.586667 42.666667 42.666667 0 0 0 60.586667 0l183.04-183.466667 183.04 183.466667a42.666667 42.666667 0 0 0 60.586667 0 42.666667 42.666667 0 0 0 0-60.586667z" fill="#231F20" p-id="2809"></path></svg></em>'
    html += '</li>'
    return html
}