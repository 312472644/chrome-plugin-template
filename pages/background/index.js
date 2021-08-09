import '../styles/common.css';
import '../../lib/jquery.js';
import '../../lib/chrome_utils.min.js';

const background = () => {
    console.log('background');
    console.log('chrome_utils', chromeUtils);
}

$(function () {
    console.log('load success');
})

background();