const linkPrefix = "<a href='https://github.com/ytlw/leetcode-playground-local/blob/master/solutions/leetcode/";
const linkMiddle = "' target='_blank'>"
const linkSuffix = "</a>"

function loadXMLDoc(id, fileName) {
    let xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            document.getElementById(id).innerHTML=getIndices(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET",fileName,true);
    xmlhttp.send();
}

function getIndices(items) {
    // store every line in links
    let links = items.split(/[\n]/);
    let n = links.length
    // parse links[i] to get a href and replace links[i] by this href
    for (let i = 0; i < n; i++) {
        let link = links[i].split(/[\s]+/);
        if (link.length != 2) {
            continue
        }
        links[i] = linkPrefix + link[1] + '.cpp' + linkMiddle + numberWidth(link[0], 4) + ' ' + titleCase(link[1]) + linkSuffix
    }
    return links.join('<br/>')
}

// right align `n`
// for example, is width === 4
// 1
// 3637
// will be
//    1
// 3637
function numberWidth(n, width) {
    let l = n.length
    if (l >= width) {
        return n
    }
    let result = ""
    for (let i = 0, end = width - l; i < end; i++) {
        result += "&ensp;"
    }
    return result + n
}

// convert title to first letter Upper
// for example, tow-sum --> Two Sum
function titleCase(s) {
    let i, ss = s.toLowerCase().split(/[\s-]+/);
    for (let i = 0; i < ss.length; i++) {
        ss[i] = ss[i].slice(0, 1).toUpperCase() + ss[i].slice(1);
    }
    return ss.join(' ');
}

